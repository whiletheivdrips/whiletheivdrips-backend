const express = require('express');
const router = express.Router();
const eventLogger = require('./eventLogger');
const authMiddleware = require('./auth');

/**
 * POST /api/analytics
 * Log analytics event (symptom logged, guides recommended, email sent)
 */
router.post('/analytics', authMiddleware, async (req, res) => {
  try {
    const {
      patient_id,
      patient_email,
      symptom,
      guides_recommended,
      email_sent,
      timestamp
    } = req.body;

    // Validation
    if (!patient_id || !symptom || !guides_recommended) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: patient_id, symptom, guides_recommended'
      });
    }

    // Log event
    await eventLogger.logEvent({
      patient_id,
      patient_email: patient_email || null,
      symptom: symptom.toLowerCase().trim(),
      guides_recommended: Array.isArray(guides_recommended) ? guides_recommended : [guides_recommended],
      email_sent: email_sent || false,
      timestamp: timestamp || new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      event_logged: true
    });

  } catch (error) {
    console.error('Analytics log error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to log analytics event'
    });
  }
});

/**
 * GET /api/analytics/dashboard
 * View analytics dashboard (symptom → guide recommendations → clicks)
 * Optional query params:
 *   - limit=30 (days back)
 *   - symptom=nausea (filter by symptom)
 */
router.get('/analytics/dashboard', authMiddleware, async (req, res) => {
  try {
    const { limit = 30, symptom } = req.query;

    // Get analytics data
    const dashboard = await eventLogger.getDashboard({
      limit: parseInt(limit),
      symptom: symptom ? symptom.toLowerCase().trim() : null
    });

    res.status(200).json(dashboard);

  } catch (error) {
    console.error('Analytics dashboard error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve analytics'
    });
  }
});

module.exports = router;
