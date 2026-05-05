# Flat File Structure - Updated

## What Changed

The backend files have been reorganized into a **flat structure** (all files in the root directory) instead of subdirectories. This is simpler for deployment and easier to manage.

## File Structure

```
backend/
├── 📄 server.js              ← Main Express app (entry point)
├── 📄 recommend.js           ← POST /api/recommend endpoint
├── 📄 analytics.js           ← Analytics endpoints
├── 📄 auth.js                ← API key authentication middleware
├── 📄 eventLogger.js         ← Analytics event logging & dashboard
├── 📄 symptomMapper.js       ← 50+ symptom-to-guide mapping
├── 📄 mailerlite.js          ← MailerLite email integration
├── 📄 server.js              ← Express app
├── 📄 package.json           ← Node dependencies
├── 📄 vercel.json            ← Vercel config
├── 📄 .env.example           ← Configuration template
├── 📄 .gitignore             ← Git configuration
├── 📁 data/                  ← Auto-created for analytics
│   └── events.json
├── 📁 routes/ (old)          ← Can be deleted
├── 📁 middleware/ (old)      ← Can be deleted
├── 📁 services/ (old)        ← Can be deleted
└── 📚 Documentation
    ├── README.md
    ├── DEPLOY.md
    └── TESTING.md
```

## Import Changes

### Old Structure
```javascript
// server.js
const recommendRoutes = require('./routes/recommend');
const analyticsRoutes = require('./routes/analytics');

// recommend.js
const authMiddleware = require('../middleware/auth');
const symptomMapper = require('../services/symptomMapper');
const analyticsService = require('../services/analytics');
```

### New Structure (Flat)
```javascript
// server.js
const recommendRoutes = require('./recommend');
const analyticsRoutes = require('./analytics');

// recommend.js
const authMiddleware = require('./auth');
const symptomMapper = require('./symptomMapper');
const eventLogger = require('./eventLogger');
```

## Key Changes

1. **analytics.js → eventLogger.js**
   - Renamed `services/analytics.js` to `eventLogger.js` to avoid naming conflict
   - Routes file `routes/analytics.js` keeps the name `analytics.js`
   - All imports updated to use `eventLogger`

2. **All imports use relative paths**
   - `require('./filename')` instead of `require('./folder/filename')`
   - `require('./subfolder/filename')` no longer needed

3. **Data directory path updated**
   - `eventLogger.js` now uses `./data/events.json`
   - Previously used `../data/events.json`

## What You Need to Do

### Option 1: Use the Flat Structure (Recommended)
1. Delete the `routes/`, `middleware/`, and `services/` folders
2. Keep all `.js` files in the root directory
3. Ensure the `data/` folder exists for analytics

### Option 2: Keep Both
- Keep the old folder structure for reference
- Use the root files for deployment
- No conflicts (files are copied, not moved)

## Files to Keep in Root

✅ **Always keep these files:**
- server.js
- package.json
- vercel.json
- .env.example
- .gitignore
- README.md
- DEPLOY.md
- TESTING.md

✅ **Core application files (all in root):**
- recommend.js
- analytics.js
- auth.js
- eventLogger.js
- symptomMapper.js
- mailerlite.js

## Files to Delete (Optional)

❌ **Can delete these (old structure):**
- routes/ (folder)
- middleware/ (folder)
- services/ (folder)

## Testing the Flat Structure

```bash
# Install dependencies
npm install

# Start the server
npm start

# Test health check
curl http://localhost:3000/health

# Test recommendation
curl -X POST http://localhost:3000/api/recommend \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"symptom": "nausea", "patient_email": "test@example.com", "patient_id": "test_001"}'
```

## Troubleshooting

### "Cannot find module './recommend'"
- Make sure `recommend.js` is in the same directory as `server.js`
- Check that you're in the correct directory: `ls *.js`

### "Cannot find module './eventLogger'"
- Verify that `eventLogger.js` exists in the root directory
- Make sure `analytics.js` and `recommend.js` are requiring `./eventLogger`, not `./analytics`

### "Cannot find module './data/events.json'" (not an error, file auto-creates)
- The `data/` directory is created automatically on first run
- Check permissions if it's not being created

## Deployment

The flat structure works perfectly with Vercel:

1. Push all files to GitHub (root level)
2. Deploy to Vercel
3. Add environment variables
4. Done!

No changes needed for deployment. Everything is already configured.

## Why the Flat Structure?

✅ **Simpler structure** - fewer folders to manage  
✅ **Easier deployment** - all files at root level  
✅ **Clearer imports** - no deep relative paths like `../../../services`  
✅ **Less confusion** - no accidental path mistakes  
✅ **Same functionality** - everything works exactly the same  

## Summary

- All `.js` files are now in the root directory
- `services/analytics.js` renamed to `eventLogger.js`
- All imports updated automatically
- Old folder structure can be deleted
- Deployment process unchanged
- Everything else works exactly the same

---

**Ready to deploy?** See `DEPLOY.md` for 5-minute Vercel setup.
