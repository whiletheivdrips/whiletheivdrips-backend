/**
 * Auth Middleware
 * Validates incoming requests with API key
 * Required header: Authorization: Bearer {API_KEY}
 */

const authMiddleware = (req, res, next) => {
  // Skip auth for health check and root
  if (req.path === '/health' || req.path === '/') {
    return next();
  }

  const authHeader = req.headers.authorization;

  // Check if authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Missing authorization header. Use: Authorization: Bearer {API_KEY}'
    });
  }

  // Extract token
  const token = authHeader.replace('Bearer ', '');

  // Validate token against environment variable
  const validApiKey = process.env.API_KEY;

  if (!validApiKey) {
    console.error('⚠ API_KEY not set in environment variables');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error'
    });
  }

  if (token !== validApiKey) {
    return res.status(401).json({
      success: false,
      error: 'Invalid API key'
    });
  }

  // Valid token, continue
  next();
};

module.exports = authMiddleware;
