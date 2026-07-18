import express from 'express';
import { body, validationResult, query } from 'express-validator';
import DailyTracking from '../models/DailyTracking.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/tracking/daily
// @desc    Create or update daily tracking
// @access  Private
router.post('/daily', [
  auth,
  body('date').optional().isISO8601().withMessage('Invalid date format'),
  body('water.consumed').optional().isFloat({ min: 0 }).withMessage('Water consumed must be a positive number'),
  body('steps.count').optional().isInt({ min: 0 }).withMessage('Steps count must be a positive integer'),
  body('sleep.duration').optional().isFloat({ min: 0, max: 24 }).withMessage('Sleep duration must be between 0 and 24 hours')
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

    const userId = req.user.userId;
    const date = req.body.date ? new Date(req.body.date) : new Date();
    date.setHours(0, 0, 0, 0); // Set to start of day

    // Find existing record or create new one
    let tracking = await DailyTracking.findOne({ userId, date });

    if (tracking) {
      // Update existing record
      Object.keys(req.body).forEach(key => {
        if (key !== 'date') {
          if (typeof req.body[key] === 'object' && !Array.isArray(req.body[key])) {
            tracking[key] = { ...tracking[key].toObject(), ...req.body[key] };
          } else {
            tracking[key] = req.body[key];
          }
        }
      });
      await tracking.save();
    } else {
      // Create new record
      tracking = new DailyTracking({
        userId,
        date,
        ...req.body
      });
      await tracking.save();
    }

    res.json({
      success: true,
      message: tracking.isNew ? 'Daily tracking created successfully' : 'Daily tracking updated successfully',
      tracking
    });
  } catch (error) {
    console.error('Create/Update daily tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/tracking/daily
// @desc    Get daily tracking records
// @access  Private
router.get('/daily', [
  auth,
  query('date').optional().isISO8601().withMessage('Invalid date format'),
  query('startDate').optional().isISO8601().withMessage('Invalid start date format'),
  query('endDate').optional().isISO8601().withMessage('Invalid end date format'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
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

    const userId = req.user.userId;
    const query = { userId };

    if (req.query.date) {
      const date = new Date(req.query.date);
      date.setHours(0, 0, 0, 0);
      query.date = date;
    } else if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) {
        const startDate = new Date(req.query.startDate);
        startDate.setHours(0, 0, 0, 0);
        query.date.$gte = startDate;
      }
      if (req.query.endDate) {
        const endDate = new Date(req.query.endDate);
        endDate.setHours(23, 59, 59, 999);
        query.date.$lte = endDate;
      }
    }

    const limit = parseInt(req.query.limit) || 30;

    const trackingRecords = await DailyTracking.find(query)
      .sort({ date: -1 })
      .limit(limit);

    res.json({
      success: true,
      tracking: trackingRecords
    });
  } catch (error) {
    console.error('Get daily tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/tracking/daily/today
// @desc    Get today's tracking record
// @access  Private
router.get('/daily/today', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let tracking = await DailyTracking.findOne({ userId, date: today });

    if (!tracking) {
      // Create a new record for today with default values
      tracking = new DailyTracking({
        userId,
        date: today
      });
      await tracking.save();
    }

    res.json({
      success: true,
      tracking
    });
  } catch (error) {
    console.error('Get today tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/tracking/water
// @desc    Log water intake
// @access  Private
router.post('/water', [
  auth,
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be a positive number'),
  body('date').optional().isISO8601().withMessage('Invalid date format')
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

    const userId = req.user.userId;
    const { amount } = req.body;
    const date = req.body.date ? new Date(req.body.date) : new Date();
    date.setHours(0, 0, 0, 0);

    let tracking = await DailyTracking.findOne({ userId, date });

    if (!tracking) {
      tracking = new DailyTracking({ userId, date });
    }

    // Add water log
    tracking.water.logs.push({ amount, timestamp: new Date() });
    tracking.water.consumed += amount;

    await tracking.save();

    res.json({
      success: true,
      message: 'Water intake logged successfully',
      waterData: tracking.water
    });
  } catch (error) {
    console.error('Log water error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/tracking/meal
// @desc    Log a meal
// @access  Private
router.post('/meal', [
  auth,
  body('type').isIn(['breakfast', 'lunch', 'dinner', 'snack']).withMessage('Invalid meal type'),
  body('name').trim().isLength({ min: 1 }).withMessage('Meal name is required'),
  body('calories').optional().isFloat({ min: 0 }).withMessage('Calories must be a positive number'),
  body('date').optional().isISO8601().withMessage('Invalid date format')
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

    const userId = req.user.userId;
    const { type, name, calories, nutrients, notes } = req.body;
    const date = req.body.date ? new Date(req.body.date) : new Date();
    date.setHours(0, 0, 0, 0);

    let tracking = await DailyTracking.findOne({ userId, date });

    if (!tracking) {
      tracking = new DailyTracking({ userId, date });
    }

    // Add meal
    tracking.meals.push({
      type,
      name,
      calories,
      nutrients,
      notes,
      timestamp: new Date()
    });

    await tracking.save();

    res.json({
      success: true,
      message: 'Meal logged successfully',
      meals: tracking.meals
    });
  } catch (error) {
    console.error('Log meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/tracking/analytics
// @desc    Get tracking analytics
// @access  Private
router.get('/analytics', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trackingRecords = await DailyTracking.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: -1 });

    // Calculate analytics
    const analytics = {
      totalDays: trackingRecords.length,
      averages: {
        water: 0,
        steps: 0,
        sleep: 0,
        calories: 0,
        mood: 0
      },
      streaks: {
        water: 0,
        steps: 0,
        exercise: 0
      },
      trends: []
    };

    if (trackingRecords.length > 0) {
      // Calculate averages
      const totals = trackingRecords.reduce((acc, record) => {
        acc.water += record.water.consumed || 0;
        acc.steps += record.steps.count || 0;
        acc.sleep += record.sleep.duration || 0;
        acc.calories += record.totalCalories || 0;
        
        const avgMood = ((record.mood.morning?.rating || 0) + (record.mood.evening?.rating || 0)) / 2;
        acc.mood += avgMood || 0;
        
        return acc;
      }, { water: 0, steps: 0, sleep: 0, calories: 0, mood: 0 });

      analytics.averages = {
        water: Math.round(totals.water / trackingRecords.length),
        steps: Math.round(totals.steps / trackingRecords.length),
        sleep: (totals.sleep / trackingRecords.length).toFixed(1),
        calories: Math.round(totals.calories / trackingRecords.length),
        mood: (totals.mood / trackingRecords.length).toFixed(1)
      };

      // Calculate streaks (simplified)
      let waterStreak = 0;
      let stepsStreak = 0;
      let exerciseStreak = 0;

      for (const record of trackingRecords) {
        if (record.water.consumed >= record.water.target) waterStreak++;
        else break;
      }

      for (const record of trackingRecords) {
        if (record.steps.count >= record.steps.target) stepsStreak++;
        else break;
      }

      for (const record of trackingRecords) {
        if (record.exercise.length > 0) exerciseStreak++;
        else break;
      }

      analytics.streaks = { water: waterStreak, steps: stepsStreak, exercise: exerciseStreak };
    }

    res.json({
      success: true,
      analytics
    });
  } catch (error) {
    console.error('Get tracking analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;