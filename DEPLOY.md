# Deployment Checklist: 5-Minute Setup

Follow these steps in order. Each step takes ~1 minute.

---

## Step 1: Generate API Key (1 min)

Generate a secure random key. Use ONE of these methods:

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes(32))
```

**Online:** [random.org/strings](https://www.random.org/strings/) (pick 32+ random chars)

**Save this key somewhere safe.** You'll need it in Step 2.

---

## Step 2: Deploy to Vercel (2 min)

1. **Create GitHub account** (if you don't have one)
2. **Fork or clone this repo to GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Create repo name: `whiletheivdrips-backend`
   - Copy code from this backend folder into it
3. **Go to [vercel.com](https://vercel.com)**
4. **Sign in with GitHub**
5. **Click "New Project"**
6. **Select the `whiletheivdrips-backend` repo**
7. **Click "Deploy"** (takes 30-60 seconds)

✅ **You now have a live URL!** Copy it. It looks like: `https://whiletheivdrips-backend-xyz.vercel.app`

---

## Step 3: Add Environment Variables (1 min)

1. **In Vercel dashboard:**
   - Click your project
   - Go to **Settings** → **Environment Variables**

2. **Add three variables:**

   | Name | Value | Example |
   |------|-------|---------|
   | `API_KEY` | Your key from Step 1 | `abc123xyz...` |
   | `MAILERLITE_API_KEY` | Your MailerLite API key | From MailerLite settings |
   | `MAILERLITE_GROUP_ID` | Your MailerLite group ID | `12345` |

3. **Click "Save"**
4. **Redeploy:** Deployments → Select latest → **Redeploy** (top right)

✅ **Environment variables are now live!**

---

## Step 4: Test Your Backend (1 min)

Replace `YOUR_URL` and `YOUR_API_KEY` below:

```bash
# Health check
curl https://YOUR_URL/health

# Test recommendation
curl -X POST https://YOUR_URL/api/recommend \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "symptom": "nausea",
    "patient_email": "test@example.com",
    "patient_id": "test_001"
  }'
```

✅ **You should get back a JSON response with guides!**

If you get an error, see **Troubleshooting** below.

---

## Step 5: Connect Glide (Already done, but here's the reminder)

When you're ready, add a webhook in your Glide app:

1. **In Glide:**
   - Add action: **"Send to webhook"**
   - URL: Your Vercel URL + `/api/recommend`
   - Method: `POST`
   - Headers: `Authorization: Bearer YOUR_API_KEY`
   - Body:
     ```json
     {
       "symptom": "{{symptom_field}}",
       "patient_email": "{{email_field}}",
       "patient_id": "{{user_id}}"
     }
     ```

2. **Test:** Submit a symptom check-in in Glide
3. **Check:** View analytics dashboard in your backend

---

## MailerLite Setup (Optional)

1. **Get API key:**
   - Go to [MailerLite integrations](https://app.mailerlite.com/integrations/api)
   - Copy your API key
   - Find your Group ID in MailerLite

2. **Add to Vercel** (Step 3 above)

3. **Emails will now send automatically** when patients log symptoms!

---

## Troubleshooting Quick Fix

| Problem | Solution |
|---------|----------|
| "Invalid API key" | Copy/paste your key again. Watch for extra spaces. |
| "Connection refused" | Check your URL. Make sure you're using HTTPS. |
| "Symptom not found" | Use a symptom from the supported list (e.g., `nausea`, not `nauseum`) |
| Vercel deployment failed | Check build logs. Make sure `package.json` and `server.js` are in root. |
| No emails sending | Add `MAILERLITE_API_KEY` to Vercel environment variables. |

---

## What's Next?

- [ ] **Monitor:** Check analytics dashboard daily
- [ ] **Test:** Send a few test symptoms through Glide
- [ ] **Verify:** Confirm MailerLite emails arrive
- [ ] **Optimize:** Review data, adjust guide prioritization if needed
- [ ] **Scale:** As you get more data, consider upgrading to a database

---

## Helpful Links

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **MailerLite API:** [mailerlite.com/integrations](https://app.mailerlite.com/integrations/api)
- **Testing Guide:** See `TESTING.md` for detailed curl examples
- **Full README:** See `README.md` for complete documentation

---

## Success Checklist

- [ ] Vercel shows "Ready" (green)
- [ ] `/health` returns `{"status": "ok"}`
- [ ] `/api/recommend` returns guides for `nausea`
- [ ] Authorization header works
- [ ] Invalid API key returns 401 error
- [ ] Analytics dashboard accessible
- [ ] Glide webhook configured (if applicable)

✅ **You're live!** Your backend is now running and ready to serve your patients.

---

**Stuck?** See README.md Troubleshooting section or check Vercel logs (Deployments → Logs).

**Built with ❤️ by Jenny for cancer patients and their caregivers.**
