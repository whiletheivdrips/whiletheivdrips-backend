const https = require('https');

/**
 * MailerLite Service
 * Handles API calls to MailerLite for sending recommendation emails
 */

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID || '12345'; // Default group, can be customized

/**
 * Send recommendation email via MailerLite
 * @param {string} email - Patient email
 * @param {string} name - Patient name
 * @param {string} symptom - The symptom logged
 * @param {array} guides - Recommended guides
 * @returns {Promise}
 */
async function sendRecommendationEmail(email, name, symptom, guides) {
  return new Promise((resolve, reject) => {
    if (!MAILERLITE_API_KEY) {
      return reject(new Error('MailerLite API key not configured'));
    }

    // Build email content
    const guideLinks = guides
      .map(g => `${g.title}: ${g.url} (${g.price === 0 ? 'FREE' : `$${g.price}`})`)
      .join('\n');

    const guideUrls = guides.map(g => g.url).join(',');

    // Prepare MailerLite API payload
    const payload = {
      email: email,
      name: name,
      fields: {
        symptom: symptom,
        guides_recommended: guides.map(g => g.title).join(', '),
        guide_urls: guideUrls
      },
      groups: [parseInt(MAILERLITE_GROUP_ID)],
      tags: ['symptom_recommendation']
    };

    const data = JSON.stringify(payload);

    const options = {
      hostname: 'api.mailerlite.com',
      port: 443,
      path: '/api/v2/subscribers',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log(`✓ Email sent to ${email} for symptom: ${symptom}`);
          resolve({
            success: true,
            email: email,
            status: res.statusCode
          });
        } else {
          console.error(`MailerLite error (${res.statusCode}):`, responseData);
          reject(new Error(`MailerLite API error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('MailerLite request error:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Validate MailerLite configuration
 * @returns {boolean}
 */
function isConfigured() {
  return !!MAILERLITE_API_KEY;
}

module.exports = {
  sendRecommendationEmail,
  isConfigured
};
