import mongoose from 'mongoose';

const dailyTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
  },
  water: {
    target: { type: Number, default: 2000 }, // ml
    consumed: { type: Number, default: 0 },
    logs: [{
      amount: Number,
      timestamp: { type: Date, default: Date.now }
    }]
  },
  steps: {
    target: { type: Number, default: 10000 },
    count: { type: Number, default: 0 },
    distance: Number, // in km
    calories: Number
  },
  sleep: {
    target: { type: Number, default: 8 }, // hours
    duration: Number, // actual sleep in hours
    bedtime: Date,
    wakeTime: Date,
    quality: {
      type: Number,
      min: 1,
      max: 5
    },
    notes: String
  },
  meals: [{
    type: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      required: true
    },
    name: String,
    calories: Number,
    nutrients: {
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
      sugar: Number
    },
    timestamp: { type: Date, default: Date.now },
    notes: String
  }],
  exercise: [{
    name: String,
    type: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'sports', 'other']
    },
    duration: Number, // minutes
    intensity: {
      type: String,
      enum: ['low', 'moderate', 'high']
    },
    calories: Number,
    notes: String,
    timestamp: { type: Date, default: Date.now }
  }],
  mood: {
    morning: {
      rating: { type: Number, min: 1, max: 10 },
      notes: String
    },
    evening: {
      rating: { type: Number, min: 1, max: 10 },
      notes: String
    },
    factors: [String] // stress, weather, work, etc.
  },
  goals: [{
    name: String,
    target: Number,
    current: Number,
    unit: String,
    completed: { type: Boolean, default: false }
  }],
  overallRating: {
    type: Number,
    min: 1,
    max: 10
  },
  notes: String
}, {
  timestamps: true
});

// Compound index to ensure one record per user per day
dailyTrackingSchema.index({ userId: 1, date: 1 }, { unique: true });

// Calculate daily progress percentages
dailyTrackingSchema.virtual('progress').get(function() {
  return {
    water: this.water.target > 0 ? Math.min((this.water.consumed / this.water.target) * 100, 100) : 0,
    steps: this.steps.target > 0 ? Math.min((this.steps.count / this.steps.target) * 100, 100) : 0,
    sleep: this.sleep.target > 0 && this.sleep.duration ? Math.min((this.sleep.duration / this.sleep.target) * 100, 100) : 0
  };
});

// Calculate total calories consumed
dailyTrackingSchema.virtual('totalCalories').get(function() {
  return this.meals.reduce((total, meal) => total + (meal.calories || 0), 0);
});

// Calculate total exercise duration
dailyTrackingSchema.virtual('totalExerciseTime').get(function() {
  return this.exercise.reduce((total, ex) => total + (ex.duration || 0), 0);
});

// Ensure virtual fields are serialized
dailyTrackingSchema.set('toJSON', { virtuals: true });

export default mongoose.model('DailyTracking', dailyTrackingSchema);