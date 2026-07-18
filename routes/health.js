import express from 'express';
import { body, validationResult, query } from 'express-validator';
import HealthRecord from '../models/HealthRecord.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/health/records
// @desc    Create a new health record
// @access  Private
router.post('/records', [
  auth,
  body('date').optional().isISO8601().withMessage('Invalid date format'),
  body('vitals.heartRate.value').optional().isFloat({ min: 30, max: 300 }).withMessage('Heart rate must be between 30 and 300 bpm'),
  body('vitals.temperature.value').optional().isFloat({ min: 30, max: 50 }).withMessage('Temperature must be between 30 and 50 degrees'),
  body('vitals.oxygenSaturation.value').optional().isFloat({ min: 70, max: 100 }).withMessage('Oxygen saturation must be between 70 and 100%')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const healthRecord = new HealthRecord({
      userId: req.user.userId,
      ...req.body
    });

    await healthRecord.save();

    res.status(201).json({
      success: true,
      message: 'Health record created successfully',
      record: healthRecord
    });
  } catch (error) {
    console.error('Create health record error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/health/records
// @desc    Get user's health records
// @access  Private
router.get('/records', [
  auth,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('startDate').optional().isISO8601().withMessage('Invalid start date format'),
  query('endDate').optional().isISO8601().withMessage('Invalid end date format')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { userId: req.user.userId };
    
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) query.date.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.date.$lte = new Date(req.query.endDate);
    }

    const records = await HealthRecord.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await HealthRecord.countDocuments(query);

    res.json({
      success: true,
      records,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get health records error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/health/records/:id
// @desc    Get a specific health record
// @access  Private
router.get('/records/:id', auth, async (req, res) => {
  try {
    const record = await HealthRecord.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found'
      });
    }

    res.json({
      success: true,
      record
    });
  } catch (error) {
    console.error('Get health record error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/health/records/:id
// @desc    Update a health record
// @access  Private
router.put('/records/:id', auth, async (req, res) => {
  try {
    const record = await HealthRecord.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found'
      });
    }

    res.json({
      success: true,
      message: 'Health record updated successfully',
      record
    });
  } catch (error) {
    console.error('Update health record error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/health/records/:id
// @desc    Delete a health record
// @access  Private
router.delete('/records/:id', auth, async (req, res) => {
  try {
    const record = await HealthRecord.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found'
      });
    }

    res.json({
      success: true,
      message: 'Health record deleted successfully'
    });
  } catch (error) {
    console.error('Delete health record error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/health/analytics
// @desc    Get health analytics
// @access  Private
router.get('/analytics', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get recent records for analytics
    const records = await HealthRecord.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: -1 });

    // Calculate averages and trends
    const analytics = {
      totalRecords: records.length,
      averages: {},
      trends: {},
      lastRecord: records[0] || null
    };

    if (records.length > 0) {
      // Calculate heart rate average
      const heartRates = records
        .filter(r => r.vitals.heartRate?.value)
        .map(r => r.vitals.heartRate.value);
      
      if (heartRates.length > 0) {
        analytics.averages.heartRate = Math.round(
          heartRates.reduce((sum, hr) => sum + hr, 0) / heartRates.length
        );
      }

      // Calculate temperature average
      const temperatures = records
        .filter(r => r.vitals.temperature?.value)
        .map(r => r.vitals.temperature.value);
      
      if (temperatures.length > 0) {
        analytics.averages.temperature = (
          temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
        ).toFixed(1);
      }

      // Calculate mood trends
      const moods = records
        .filter(r => r.mood?.rating)
        .map(r => r.mood.rating);
      
      if (moods.length > 0) {
        analytics.averages.mood = (
          moods.reduce((sum, mood) => sum + mood, 0) / moods.length
        ).toFixed(1);
      }
    }

    res.json({
      success: true,
      analytics
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;