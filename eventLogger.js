const fs = require('fs').promises;
const path = require('path');

// Use in-memory storage + file persistence
const DATA_FILE = path.join(__dirname, './data/events.json');

let eventsCache = [];
let cacheInitialized = false;

/**
 * Initialize event cache from file
 */
async function initializeCache() {
  try {
    if (cacheInitialized) return;

    // Ensure data directory exists
    const dataDir = path.dirname(DATA_FILE);
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Try to load existing events
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      eventsCache = JSON.parse(data);
      console.log(`✓ Loaded ${eventsCache.length} existing events from file`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        eventsCache = [];
        console.log('✓ Starting with empty events cache (new file)');
      } else {
        throw err;
      }
    }

    cacheInitialized = true;
  } catch (error) {
    console.error('Failed to initialize cache:', error.message);
    throw error;
  }
}

/**
 * Persist cache to file
 */
async function persistCache() {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(eventsCache, null, 2));
  } catch (error) {
    console.error('Failed to persist cache:', error.message);
    throw error;
  }
}

/**
 * Log an analytics event
 * @param {object} event - Event data
 */
async function logEvent(event) {
  await initializeCache();

  const enrichedEvent = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...event,
    created_at: event.timestamp || new Date().toISOString()
  };

  eventsCache.push(enrichedEvent);

  // Persist to file
  await persistCache();

  console.log(`✓ Logged event: ${enrichedEvent.symptom} -> ${enrichedEvent.guides_recommended.length} guides`);
  return enrichedEvent;
}

/**
 * Get analytics dashboard
 * @param {object} options - Filter options
 */
async function getDashboard(options = {}) {
  await initializeCache();

  const { limit = 30, symptom = null } = options;

  // Calculate date range
  const now = new Date();
  const cutoffDate = new Date(now.getTime() - limit * 24 * 60 * 60 * 1000);

  // Filter events
  let filteredEvents = eventsCache.filter(event => {
    const eventDate = new Date(event.created_at);
    const dateInRange = eventDate >= cutoffDate;
    const symptomMatches = !symptom || event.symptom === symptom;
    return dateInRange && symptomMatches;
  });

  // Build dashboard stats
  const dashboard = {
    period: {
      days: limit,
      start: cutoffDate.toISOString(),
      end: now.toISOString()
    },
    total_events: filteredEvents.length,
    total_symptoms_logged: new Set(filteredEvents.map(e => e.symptom)).size,
    total_emails_sent: filteredEvents.filter(e => e.email_sent).length,
    symptoms: {}
  };

  // Aggregate by symptom
  for (const event of filteredEvents) {
    if (!dashboard.symptoms[event.symptom]) {
      dashboard.symptoms[event.symptom] = {
        times_logged: 0,
        emails_sent: 0,
        guides_recommended: {}
      };
    }

    const symptomData = dashboard.symptoms[event.symptom];
    symptomData.times_logged += 1;

    if (event.email_sent) {
      symptomData.emails_sent += 1;
    }

    // Track guides
    if (Array.isArray(event.guides_recommended)) {
      for (const guideId of event.guides_recommended) {
        if (!symptomData.guides_recommended[guideId]) {
          symptomData.guides_recommended[guideId] = {
            times: 0
          };
        }
        symptomData.guides_recommended[guideId].times += 1;
      }
    }
  }

  return dashboard;
}

/**
 * Get raw events (for debugging)
 * @param {number} limit - Max events to return
 */
async function getEvents(limit = 100) {
  await initializeCache();
  return eventsCache.slice(-limit).reverse();
}

/**
 * Clear all events (dangerous, use with caution)
 */
async function clearAllEvents() {
  eventsCache = [];
  await persistCache();
  console.warn('⚠ All analytics events cleared');
  return { cleared: true };
}

module.exports = {
  logEvent,
  getDashboard,
  getEvents,
  clearAllEvents,
  initializeCache
};
