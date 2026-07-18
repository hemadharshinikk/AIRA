# Health Tracker Backend API

A comprehensive Node.js backend API for the Health Tracker application with MongoDB integration.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Health Records**: Store and manage detailed health information
- **Daily Tracking**: Track daily activities like water intake, steps, meals, and sleep
- **Analytics**: Generate insights and trends from health data
- **Security**: Rate limiting, input validation, and secure password hashing
- **Age-Specific**: Support for kids, adults, and elderly user groups

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security headers
- **cors** for cross-origin requests

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/account` - Deactivate account
- `GET /api/users/stats` - Get user statistics

### Health Records
- `POST /api/health/records` - Create health record
- `GET /api/health/records` - Get health records
- `GET /api/health/records/:id` - Get specific record
- `PUT /api/health/records/:id` - Update health record
- `DELETE /api/health/records/:id` - Delete health record
- `GET /api/health/analytics` - Get health analytics

### Daily Tracking
- `POST /api/tracking/daily` - Create/update daily tracking
- `GET /api/tracking/daily` - Get daily tracking records
- `GET /api/tracking/daily/today` - Get today's tracking
- `POST /api/tracking/water` - Log water intake
- `POST /api/tracking/meal` - Log meals
- `GET /api/tracking/analytics` - Get tracking analytics

## Data Models

### User
- Personal information (name, email, age, etc.)
- Age group classification (kids/adults/elderly)
- Medical conditions and emergency contacts
- Preferences and settings

### Health Record
- Vital signs (heart rate, blood pressure, temperature, etc.)
- Symptoms and medications
- Activities and mood tracking
- File attachments support

### Daily Tracking
- Water intake with target goals
- Step counting and distance
- Sleep duration and quality
- Meal logging with nutrition info
- Exercise tracking
- Mood monitoring

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet
- Environment variable protection

## Error Handling

- Comprehensive error responses
- Validation error details
- Development vs production error messages
- Graceful database connection handling

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables (see .env.example)
3. Start MongoDB service
4. Run development server: `npm run dev`
5. API will be available at `http://localhost:5000`

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS