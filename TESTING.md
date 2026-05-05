# Testing Guide for whiletheivdrips Backend

This guide shows how to test all API endpoints using curl or Postman.

---

## Setup

1. **Get your API key:**
   - Vercel: Settings → Environment Variables → Copy `API_KEY`
   - Local: Check your `.env` file

2. **Get your deployment URL:**
   - Vercel: Copy from deployment page (e.g., `https://your-project.vercel.app`)
   - Local: Use `http://localhost:3000`

3. **Set environment variables (optional, for easier testing):**
   ```bash
   export API_URL="https://your-project.vercel.app"
   export API_KEY="your-api-key-here"
   ```

---

## Health Check

**Test that your backend is running:**

```bash
curl $API_URL/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

---

## Get Supported Symptoms

**View all symptoms the backend recognizes:**

```bash
curl $API_URL/
```

**Response:**
```json
{
  "message": "whiletheivdrips Backend API",
  "version": "1.0.0",
  "endpoints": { ... },
  "supportedSymptoms": [
    "anxiety",
    "appearance changes",
    "appetite loss",
    ...
  ]
}
```

---

## Test 1: Basic Recommendation (Nausea)

```bash
curl -X POST $API_URL/api/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "symptom": "nausea",
    "patient_email": "patient@example.com",
    "patient_id": "test_patient_001",
    "patient_name": "Test Patient"
  }'
```

**Success Response (200):**
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

---

## Test 2: Recommendation with Bundle Option (Emotional Overwhelm)

```bash
curl -X POST $API_URL/api/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "symptom": "emotional overwhelm",
    "patient_email": "patient@example.com",
    "patient_id": "test_patient_002",
    "patient_name": "Emily Johnson"
  }'
```

**Response includes bundle option:**
```json
{
  "success": true,
  "symptom": "emotional overwhelm",
  "guides": [ ... ],
  "bundle_option": {
    "id": 6,
    "title": "Stage Path Framework (All 5 Stages)",
    "url": "https://whitetheivdrips.etsy.com/listing/4495687940",
    "price": 97,
    "message": "Comprehensive support through all phases"
  }
}
```

---

## Test 3: Invalid Symptom

```bash
curl -X POST $API_URL/api/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "symptom": "invalid_symptom_xyz",
    "patient_email": "patient@example.com",
    "patient_id": "test_patient_003"
  }'
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Symptom \"invalid_symptom_xyz\" not found in mapping. Please check the symptom list.",
  "supportedSymptoms": [ ... ]
}
```

---

## Test 4: Missing Required Fields

```bash
curl -X POST $API_URL/api/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "symptom": "nausea"
    // missing patient_email and patient_id
  }'
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Missing required field: patient_email"
}
```

---

## Test 5: Invalid API Key

```bash
curl -X POST $API_URL/api/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer wrong_api_key" \
  -d '{
    "symptom": "nausea",
    "patient_email": "patient@example.com",
    "patient_id": "test_patient_004"
  }'
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid API key"
}
```

---

## Test 6: Missing Authorization Header

```bash
curl -X POST $API_URL/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "symptom": "nausea",
    "patient_email": "patient@example.com",
    "patient_id": "test_patient_005"
  }'
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Missing authorization header. Use: Authorization: Bearer {API_KEY}"
}
```

---

## Test 7: Log Analytics Event

```bash
curl -X POST $API_URL/api/analytics \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "patient_id": "test_patient_001",
    "patient_email": "patient@example.com",
    "symptom": "nausea",
    "guides_recommended": [9, 3, 18],
    "email_sent": true,
    "timestamp": "2025-05-04T10:30:00Z"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "event_logged": true
}
```

---

## Test 8: View Analytics Dashboard

```bash
curl "$API_URL/api/analytics/dashboard" \
  -H "Authorization: Bearer $API_KEY"
```

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

## Test 9: Analytics Dashboard with Filters

```bash
# Last 7 days, only nausea symptom
curl "$API_URL/api/analytics/dashboard?limit=7&symptom=nausea" \
  -H "Authorization: Bearer $API_KEY"
```

```bash
# Last 90 days, all symptoms
curl "$API_URL/api/analytics/dashboard?limit=90" \
  -H "Authorization: Bearer $API_KEY"
```

---

## Test Symptoms (Copy-Paste Ready)

Use these symptoms for testing. They all have guides configured:

**Physical Symptoms:**
- `nausea`
- `fatigue`
- `hair loss`
- `sleep problems`
- `pain`
- `mouth sores`
- `chemo brain`
- `hot flashes`

**Emotional:**
- `anxiety`
- `emotional overwhelm`
- `communication challenges`
- `fear of recurrence`

**Medical:**
- `newly diagnosed`
- `port questions`
- `treatment day preparation`
- `fertility concerns`

**Caregiver:**
- `caregiver support`
- `help needed`

**Journey:**
- `life after treatment`
- `recovery`

---

## Postman Collection

### Import Instructions

1. **Copy the JSON below**
2. **In Postman:**
   - Click **Import** (top left)
   - Click **Raw text**
   - Paste the JSON
   - Click **Import**
3. **Configure environment:**
   - Click the gear icon (top right)
   - Add variables:
     - `api_url`: Your Vercel URL or `http://localhost:3000`
     - `api_key`: Your API key

### Postman Collection JSON

```json
{
  "info": {
    "name": "whiletheivdrips Backend",
    "description": "API endpoints for symptom recommendation engine",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{api_url}}/health",
          "host": ["{{api_url}}"],
          "path": ["health"]
        }
      }
    },
    {
      "name": "Get Supported Symptoms",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{api_url}}/",
          "host": ["{{api_url}}"],
          "path": [""]
        }
      }
    },
    {
      "name": "Recommend - Nausea",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{api_key}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"symptom\": \"nausea\", \"patient_email\": \"patient@example.com\", \"patient_id\": \"test_001\", \"patient_name\": \"Test Patient\"}"
        },
        "url": {
          "raw": "{{api_url}}/api/recommend",
          "host": ["{{api_url}}"],
          "path": ["api", "recommend"]
        }
      }
    },
    {
      "name": "Recommend - Emotional Overwhelm",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{api_key}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"symptom\": \"emotional overwhelm\", \"patient_email\": \"patient@example.com\", \"patient_id\": \"test_002\", \"patient_name\": \"Emily Johnson\"}"
        },
        "url": {
          "raw": "{{api_url}}/api/recommend",
          "host": ["{{api_url}}"],
          "path": ["api", "recommend"]
        }
      }
    },
    {
      "name": "Log Analytics Event",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{api_key}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"patient_id\": \"test_001\", \"patient_email\": \"patient@example.com\", \"symptom\": \"nausea\", \"guides_recommended\": [9, 3, 18], \"email_sent\": true}"
        },
        "url": {
          "raw": "{{api_url}}/api/analytics",
          "host": ["{{api_url}}"],
          "path": ["api", "analytics"]
        }
      }
    },
    {
      "name": "Analytics Dashboard",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{api_key}}"
          }
        ],
        "url": {
          "raw": "{{api_url}}/api/analytics/dashboard",
          "host": ["{{api_url}}"],
          "path": ["api", "analytics", "dashboard"]
        }
      }
    },
    {
      "name": "Analytics Dashboard - Last 7 Days",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{api_key}}"
          }
        ],
        "url": {
          "raw": "{{api_url}}/api/analytics/dashboard?limit=7",
          "host": ["{{api_url}}"],
          "path": ["api", "analytics", "dashboard"],
          "query": [
            {
              "key": "limit",
              "value": "7"
            }
          ]
        }
      }
    }
  ]
}
```

---

## Troubleshooting

### curl: command not found
- **Mac/Linux:** curl is built-in
- **Windows:** Install [Git Bash](https://git-scm.com/downloads) or use PowerShell's `Invoke-WebRequest`

### "Connection refused"
- Backend not running
- Wrong URL (check `$API_URL`)
- Vercel deployment failed (check Vercel logs)

### "Invalid API key"
- Copy/paste API key again (watch for spaces)
- Confirm `API_KEY` environment variable is set
- Generate a new key if needed

### No JSON response
- Check `Content-Type: application/json` header
- Verify request body is valid JSON
- Check backend logs (Vercel or local console)

---

## Test Coverage Checklist

- [ ] Health check returns 200
- [ ] Get supported symptoms works
- [ ] Basic recommendation returns guides
- [ ] Bundle option appears when relevant
- [ ] Invalid symptom returns error
- [ ] Missing fields returns error
- [ ] Invalid API key returns 401
- [ ] Log analytics works
- [ ] Dashboard shows aggregated data
- [ ] Dashboard filters by limit and symptom work

---

**All tests passing? You're ready to connect Glide!**
