const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check (required for Vercel)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'whiletheivdrips Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      recommend: 'POST /api/recommend',
      analytics: {
        log: 'POST /api/analytics',
        dashboard: 'GET /api/analytics/dashboard'
      }
    }
  });
});

// Import routes
const recommendRoutes = require('./routes/recommend');
const analyticsRoutes = require('./routes/analytics');

// Use routes
app.use('/api', recommendRoutes);
app.use('/api', analyticsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
