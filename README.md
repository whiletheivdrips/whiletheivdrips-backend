# whiletheivdrips Backend API

Smart symptom-to-guide recommendation engine for breast cancer patients. Connects your Glide app to MailerLite email automation and tracks conversions.

**Built for:** whiletheivdrips by Jenny, RN, OCN

---

## Quick Start (5 Minutes to Deployment)

### Step 1: Deploy to Vercel
1. Fork or clone this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
3. Click **"Import Project"** → Select this repo
4. Vercel auto-detects it's a Node.js project
5. Click **Deploy**

### Step 2: Add Environment Variables
1. After deployment, go to **Settings → Environment Variables**
2. Add:
   - `API_KEY`: Generate with `openssl rand -base64 32` (or any 32+ character random string)
   - `MAILERLITE_API_KEY`: From [MailerLite API Settings](https://app.mailerlite.com/integrations/api)
   - `MAILERLITE_GROUP_ID`: Your MailerLite group ID (default: 12345)
3. Click **Save**

### Step 3: Test Your Deployment
Copy your Vercel deployment URL (e.g., `https://your-project.vercel.app`)

```bash
# Health check
curl https://your-project.vercel.app/health

# Test recommendation endpoint
curl -X POST https://your-project.vercel.app/api/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "symptom": "nausea",
    "patient_email": "patient@example.com",
    "patient_id": "glide_user_123",
    "patient_name": "John Doe"
  }'
```

✅ **You're live!** Move to Step 4 to connect Glide.

---

## Local Development

### Prerequisites
- Node.js v18+
- npm (comes with Node)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Fill in your environment variables
# Edit .env with your API_KEY and MailerLite credentials
nano .env

# 4. Start the server
npm start

# Server runs on http://localhost:3000
```

### Testing Locally

```bash
# Health check
curl http://localhost:3000/health

# Get supported symptoms
curl http://localhost:3000/

# Test recommendation (replace YOUR_API_KEY)
curl -X POST http://localhost:3000/api/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "symptom": "nausea",
    "patient_email": "test@example.com",
    "patient_id": "patient_123",
    "patient_name": "Test Patient"
  }'

# View analytics dashboard
curl http://localhost:3000/api/analytics/dashboard \
  -H "Authorization: Bearer YOUR_API_KEY"

# View analytics for last 7 days, filtered by symptom
curl "http://localhost:3000/api/analytics/dashboard?limit=7&symptom=nausea" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## API Endpoints

### 1. Health Check
```
GET /health
```
Always returns 200. Use to verify the backend is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

### 2. Recommend Guides
```
POST /api/recommend
Headers: Authorization: Bearer {API_KEY}
```

**Request Body:**
```json
{
  "symptom": "nausea",
  "patient_email": "patient@example.com",
  "patient_id": "glide_user_123",
  "patient_name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "symptom": "nausea",
  "guides": [
    {
      "priority": 1,
      "id": 9,
      "title": "Nutrition During Treatment",
      "url": "https://whitetheivdrips.etsy.com/listing/4490807039",
      "price": 22
    },
    {
      "priority": 2,
      "id": 3,
      "title": "Stage 2 - The Gentle Release",
      "url": "https://whitetheivdrips.etsy.com/listing/4495687898",
      "price": 27
    },
    {
      "priority": 3,
      "id": 18,
      "title": "Chemotherapy: What to Expect (FREE)",
      "url": "https://whiletheivdrips.com",
      "price": 0
    }
  ],
  "bundle_option": null
}
```

### 3. Log Analytics Event
```
POST /api/analytics
Headers: Authorization: Bearer {API_KEY}
```

**Request Body:**
```json
{
  "patient_id": "glide_user_123",
  "patient_email": "patient@example.com",
  "symptom": "nausea",
  "guides_recommended": [9, 3, 18],
  "email_sent": true,
  "timestamp": "2025-05-04T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "event_logged": true
}
```

### 4. Analytics Dashboard
```
GET /api/analytics/dashboard?limit=30&symptom=nausea
Headers: Authorization: Bearer {API_KEY}
```

**Query Parameters:**
- `limit`: Days back to retrieve (default: 30)
- `symptom`: Filter by specific symptom (optional)

**Response:**
```json
{
  "period": {
    "days": 30,
    "start": "2025-04-04T10:30:00Z",
    "end": "2025-05-04T10:30:00Z"
  },
  "total_events": 150,
  "total_symptoms_logged": 8,
  "total_emails_sent": 142,
  "symptoms": {
    "nausea": {
      "times_logged": 35,
      "emails_sent": 35,
      "guides_recommended": {
        "9": { "times": 35 },
        "3": { "times": 34 }
      }
    }
  }
}
```

---

## Supported Symptoms

The backend recognizes 50+ symptoms across physical, emotional, medical, and caregiver categories.

**Get full list:**
```bash
curl http://localhost:3000/
```

**Common symptoms:**
- Physical: `nausea`, `appetite loss`, `fatigue`, `hair loss`, `sleep problems`, `pain`, `mouth sores`, `chemo brain`, `hot flashes`
- Emotional: `anxiety`, `emotional overwhelm`, `fear of recurrence`, `communication challenges`
- Medical: `newly diagnosed`, `port questions`, `treatment day preparation`, `fertility concerns`
- Caregiver: `caregiver support`, `help needed`
- Journey: `life after treatment`, `recovery`

---

## Glide Integration

### Setup (5 minutes)

1. **In Glide App:**
   - Open your app editor
   - Go to the symptom check-in form/screen
   - Add an action: **"Send to webhook"**

2. **Configure Webhook:**
   - URL: `https://your-project.vercel.app/api/recommend`
   - Method: `POST`
   - Headers:
     ```
     Authorization: Bearer YOUR_API_KEY
     Content-Type: application/json
     ```
   - Body (map to your Glide columns):
     ```json
     {
       "symptom": "{{symptom_column_name}}",
       "patient_email": "{{email_column_name}}",
       "patient_id": "{{user_id}}",
       "patient_name": "{{name_column_name}}"
     }
     ```

3. **Test:**
   - Submit a symptom check-in in your Glide app
   - Go to backend analytics dashboard to see the event logged
   - Check patient's inbox for MailerLite email

---

## MailerLite Setup

### Prerequisites
- MailerLite account (free tier works)
- API key from [MailerLite Integrations](https://app.mailerlite.com/integrations/api)

### Configure Automation (optional but recommended)

1. **Create automation in MailerLite:**
   - Go to **Automations → Create New**
   - Name: `Symptom-Based Recommendations`
   - Trigger: **Tag added** → `symptom_recommendation`

2. **Add email action:**
   - Use template: Include guide links from the recommendation
   - Subject: `Based on your symptoms, we recommend these guides...`
   - Body can reference these fields from the API:
     - `{{fields.symptom}}`
     - `{{fields.guides_recommended}}`
     - `{{fields.guide_urls}}`

**Note:** The backend automatically tags subscribers with `symptom_recommendation` when recommendations are sent.

---

## File Structure

```
backend/
├── server.js                 # Express app & routing
├── routes/
│   ├── recommend.js          # POST /api/recommend endpoint
│   └── analytics.js          # Analytics endpoints
├── middleware/
│   └── auth.js              # API key authentication
├── services/
│   ├── symptomMapper.js      # Symptom → guide logic
│   ├── mailerlite.js         # MailerLite API client
│   └── analytics.js          # Event logging & dashboard
├── data/
│   └── events.json           # Analytics events (auto-created)
├── package.json              # Dependencies
├── .env.example              # Configuration template
└── README.md                 # This file
```

---

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Deployment environment | No | `production` |
| `PORT` | Server port | No | `3000` |
| `API_KEY` | Authentication key for API requests | **Yes** | `openssl rand -base64 32` |
| `MAILERLITE_API_KEY` | MailerLite API key | No* | From MailerLite settings |
| `MAILERLITE_GROUP_ID` | MailerLite group ID | No | `12345` |

*Email sending works without it, but no emails will be delivered.

### Generating a Secure API Key

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes(32))
```

**Or use an online generator:** [random.org](https://www.random.org/strings/)

---

## Troubleshooting

### "Invalid API key" error
- Verify your `Authorization` header is correctly formatted: `Bearer YOUR_API_KEY`
- Check that `API_KEY` is set in environment variables (Vercel: Settings → Environment Variables)
- Make sure there are no extra spaces before/after the key

### "Symptom not found"
- The symptom might not be in the mapping
- Get list of supported symptoms: `curl http://localhost:3000/`
- Example typo: Use `nausea` not `nauseum`

### MailerLite emails not sending
- Check that `MAILERLITE_API_KEY` is set
- Verify the API key is valid in MailerLite settings
- Check the console logs for errors (Vercel: Deployments → Logs)
- Ensure patient email is valid and not on your MailerLite blocklist

### Analytics dashboard empty
- Make sure you're using the same `API_KEY` when logging events
- Check the timestamp filters with `?limit=30` parameter
- Events are stored in `data/events.json` (file-based, persists across restarts)

### Vercel deployment stuck
- Clear cache: Vercel dashboard → Settings → Git → Redeploy
- Check build logs: Deployments → Failed deployment → View logs
- Ensure all environment variables are set

---

## Performance & Scaling

### Current Architecture
- **Database:** File-based JSON (suitable for MVP)
- **Requests per second:** ~100-1000 (depends on instance)
- **Storage:** ~1KB per event (analytics)

### For Production Scale
Upgrade to:
- **MongoDB Atlas** (free tier: 512MB)
- **PostgreSQL on Railway** (free tier)
- **Redis** for caching (optional)

Contact if you need migration help.

---

## Security Notes

1. **API Key:** Keep your API key secret. Don't commit `.env` to git.
2. **HTTPS:** Vercel provides free HTTPS on all deployments.
3. **CORS:** Currently allows all origins. Restrict if needed:
   ```javascript
   app.use(cors({ origin: ['https://your-glide-app.com'] }));
   ```
4. **Rate Limiting:** Add if you get high traffic (not needed for MVP).

---

## Monitoring & Logs

### View Logs on Vercel
1. Go to your Vercel project
2. **Deployments** → Select active deployment → **Logs**
3. See all API requests and errors in real-time

### Local Development Logging
```bash
# Run with verbose logging
NODE_ENV=development npm start
```

---

## Common Workflow

### Week 1: Launch
1. Deploy to Vercel (5 min)
2. Set environment variables (2 min)
3. Connect Glide webhook (5 min)
4. Test with sample patient (5 min)

### Week 2-4: Monitor
1. Check analytics dashboard daily
2. Monitor MailerLite delivery
3. Adjust guide recommendations based on data

### Month 2+: Optimize
1. Review symptom-to-guide conversions
2. Add new symptoms as needed
3. Tweak prioritization based on patient feedback

---

## Support & Next Steps

### Questions?
- Check the **Troubleshooting** section above
- Review the **API Endpoints** documentation
- Check Vercel logs for error messages

### Want to Extend?
- Add new symptoms to `services/symptomMapper.js`
- Integrate payment tracking (Etsy API)
- Add patient journey tracking
- Build admin dashboard (separate app)

### Ready to Scale?
- Upgrade database to MongoDB or PostgreSQL
- Add caching layer (Redis)
- Implement rate limiting
- Set up monitoring/alerting (e.g., Sentry)

---

## License

MIT License - This backend is open source and free to use.

---

**Built with ❤️ for breast cancer patients and their caregivers.**

whiletheivdrips | [etsy.com/shop/whitetheivdrips](https://www.etsy.com/shop/whitetheivdrips)
