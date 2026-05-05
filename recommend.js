const express = require('express');
const router = express.Router();
const symptomMapper = require('./symptomMapper');
const mailerliteService = require('./mailerlite');
const eventLogger = require('./eventLogger');
const authMiddleware = require('./auth');

/**
 * POST /api/recommend
 * Receives symptom data from Glide app
 * Returns matched guides and triggers MailerLite email
 */
router.post('/recommend', authMiddleware, async (req, res) => {
  try {
    const { symptom, patient_email, patient_id, patient_name } = req.body;

    // Validation
    if (!symptom) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: symptom'
      });
    }

    if (!patient_email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: patient_email'
      });
    }

    if (!patient_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: patient_id'
      });
    }

    // Normalize symptom input (lowercase, trim)
    const normalizedSymptom = symptom.toLowerCase().trim();

    // Get guide recommendations
    const recommendations = symptomMapper.getGuidesBySymptom(normalizedSymptom);

    if (!recommendations) {
      return res.status(400).json({
        success: false,
        error: `Symptom "${normalizedSymptom}" not found in mapping. Please check the symptom list.`,
        supportedSymptoms: symptomMapper.getSupportedSymptoms()
      });
    }

    // Prepare response
    const response = {
      success: true,
      symptom: normalizedSymptom,
      guides: recommendations.guides,
      bundle_option: recommendations.bundle_option || null
    };

    // Send email via MailerLite (async, don't block response)
    if (process.env.MAILERLITE_API_KEY) {
      mailerliteService.sendRecommendationEmail(
        patient_email,
        patient_name || 'Patient',
        normalizedSymptom,
        recommendations.guides
      ).catch(err => {
        console.error('MailerLite error (non-blocking):', err.message);
      });
    } else {
      console.warn('⚠ MailerLite not configured - email not sent');
    }

    // Log analytics event (async)
    eventLogger.logEvent({
      patient_id,
      patient_email,
      symptom: normalizedSymptom,
      guides_recommended: recommendations.guides.map(g => g.id),
      email_sent: !!process.env.MAILERLITE_API_KEY,
      timestamp: new Date().toISOString()
    }).catch(err => {
      console.error('Analytics error (non-blocking):', err.message);
    });

    res.status(200).json(response);

  } catch (error) {
    console.error('Recommend endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process recommendation'
    });
  }
});

module.exports = router;
