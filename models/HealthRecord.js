import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  vitals: {
    heartRate: {
      value: Number,
      unit: { type: String, default: 'bpm' },
      timestamp: { type: Date, default: Date.now }
    },
    bloodPressure: {
      systolic: Number,
      diastolic: Number,
      unit: { type: String, default: 'mmHg' },
      timestamp: { type: Date, default: Date.now }
    },
    temperature: {
      value: Number,
      unit: { type: String, default: 'celsius' },
      timestamp: { type: Date, default: Date.now }
    },
    oxygenSaturation: {
      value: Number,
      unit: { type: String, default: '%' },
      timestamp: { type: Date, default: Date.now }
    },
    weight: {
      value: Number,
      unit: { type: String, default: 'kg' },
      timestamp: { type: Date, default: Date.now }
    },
    height: {
      value: Number,
      unit: { type: String, default: 'cm' },
      timestamp: { type: Date, default: Date.now }
    }
  },
  symptoms: [{
    name: {
      type: String,
      required: true
    },
    severity: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    description: String,
    duration: String // e.g., "2 hours", "3 days"
  }],
  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date,
    notes: String
  }],
  activities: [{
    type: {
      type: String,
      enum: ['exercise', 'sleep', 'meal', 'water', 'other'],
      required: true
    },
    name: String,
    duration: Number, // in minutes
    intensity: {
      type: String,
      enum: ['low', 'moderate', 'high']
    },
    calories: Number,
    notes: String,
    timestamp: { type: Date, default: Date.now }
  }],
  mood: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    notes: String,
    factors: [String] // e.g., ['stress', 'weather', 'work']
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  attachments: [{
    filename: String,
    url: String,
    type: {
      type: String,
      enum: ['image', 'document', 'audio']
    },
    uploadDate: { type: Date, default: Date.now }
  }],
  isPrivate: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
healthRecordSchema.index({ userId: 1, date: -1 });
healthRecordSchema.index({ userId: 1, 'vitals.heartRate.timestamp': -1 });
healthRecordSchema.index({ userId: 1, 'activities.type': 1 });

// Calculate BMI if height and weight are available
healthRecordSchema.virtual('bmi').get(function() {
  if (this.vitals.height?.value && this.vitals.weight?.value) {
    const heightInMeters = this.vitals.height.value / 100;
    return (this.vitals.weight.value / (heightInMeters * heightInMeters)).toFixed(1);
  }
  return null;
});

// Ensure virtual fields are serialized
healthRecordSchema.set('toJSON', { virtuals: true });

export default mongoose.model('HealthRecord', healthRecordSchema);