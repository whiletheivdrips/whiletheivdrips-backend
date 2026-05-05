/**
 * Symptom Mapper Service
 * Maps patient symptoms to whiletheivdrips guides
 * Handles priority ranking and bundle offers
 */

const symptomMapping = {
  // Physical Symptoms
  'nausea': {
    guides: [
      { priority: 1, id: 9, title: 'Nutrition During Treatment', url: 'https://whitetheivdrips.etsy.com/listing/4490807039', price: 22 },
      { priority: 2, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ]
  },

  'appetite loss': {
    guides: [
      { priority: 1, id: 9, title: 'Nutrition During Treatment', url: 'https://whitetheivdrips.etsy.com/listing/4490807039', price: 22 },
      { priority: 2, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ]
  },

  'taste changes': {
    guides: [
      { priority: 1, id: 9, title: 'Nutrition During Treatment', url: 'https://whitetheivdrips.etsy.com/listing/4490807039', price: 22 },
      { priority: 2, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ]
  },

  'fatigue': {
    guides: [
      { priority: 1, id: 4, title: 'Stage 4 - The Renewal Rhythm', url: 'https://whitetheivdrips.etsy.com/listing/4495687930', price: 27 },
      { priority: 2, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ]
  },

  'low energy': {
    guides: [
      { priority: 1, id: 4, title: 'Stage 4 - The Renewal Rhythm', url: 'https://whitetheivdrips.etsy.com/listing/4495687930', price: 27 },
      { priority: 2, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ]
  },

  'hair loss': {
    guides: [
      { priority: 1, id: 7, title: 'Hair Loss During Treatment', url: 'https://whitetheivdrips.etsy.com/listing/4495687913', price: 17 },
      { priority: 2, id: 8, title: 'My Breast Cancer Journal', url: 'https://whitetheivdrips.etsy.com/listing/4495687914', price: 17 },
      { priority: 3, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 }
    ]
  },

  'appearance changes': {
    guides: [
      { priority: 1, id: 7, title: 'Hair Loss During Treatment', url: 'https://whitetheivdrips.etsy.com/listing/4495687913', price: 17 },
      { priority: 2, id: 8, title: 'My Breast Cancer Journal', url: 'https://whitetheivdrips.etsy.com/listing/4495687914', price: 17 },
      { priority: 3, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 }
    ]
  },

  'sleep problems': {
    guides: [
      { priority: 1, id: 4, title: 'Stage 4 - The Renewal Rhythm', url: 'https://whitetheivdrips.etsy.com/listing/4495687930', price: 27 },
      { priority: 2, id: 1, title: 'Stage 1 - The Steady Foundation', url: 'https://whitetheivdrips.etsy.com/listing/4495687881', price: 27 },
      { priority: 3, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 }
    ]
  },

  'insomnia': {
    guides: [
      { priority: 1, id: 4, title: 'Stage 4 - The Renewal Rhythm', url: 'https://whitetheivdrips.etsy.com/listing/4495687930', price: 27 },
      { priority: 2, id: 1, title: 'Stage 1 - The Steady Foundation', url: 'https://whitetheivdrips.etsy.com/listing/4495687881', price: 27 },
      { priority: 3, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 }
    ]
  },

  'pain': {
    guides: [
      { priority: 1, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 },
      { priority: 2, id: 4, title: 'Stage 4 - The Renewal Rhythm', url: 'https://whitetheivdrips.etsy.com/listing/4495687930', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ]
  },

  'discomfort': {
    guides: [
      { priority: 1, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 },
      { priority: 2, id: 4, title: 'Stage 4 - The Renewal Rhythm', url: 'https://whitetheivdrips.etsy.com/listing/4495687930', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ]
  },

  'mouth sores': {
    guides: [
      { priority: 1, id: 9, title: 'Nutrition During Treatment', url: 'https://whitetheivdrips.etsy.com/listing/4490807039', price: 22 },
      { priority: 2, id: 12, title: 'Hospital Bag & Treatment Day Checklist', url: 'https://whitetheivdrips.etsy.com/listing/4495687912', price: 9 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ]
  },

  'chemo brain': {
    guides: [
      { priority: 1, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 },
      { priority: 2, id: 4, title: 'Stage 4 - The Renewal Rhythm', url: 'https://whitetheivdrips.etsy.com/listing/4495687930', price: 27 }
    ]
  },

  'cognitive changes': {
    guides: [
      { priority: 1, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 },
      { priority: 2, id: 4, title: 'Stage 4 - The Renewal Rhythm', url: 'https://whitetheivdrips.etsy.com/listing/4495687930', price: 27 }
    ]
  },

  'hot flashes': {
    guides: [
      { priority: 1, id: 11, title: 'Fertility & Early Menopause Guide', url: 'https://whitetheivdrips.etsy.com/listing/4495687911', price: 27 },
      { priority: 2, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 }
    ]
  },

  'menopause symptoms': {
    guides: [
      { priority: 1, id: 11, title: 'Fertility & Early Menopause Guide', url: 'https://whitetheivdrips.etsy.com/listing/4495687911', price: 27 },
      { priority: 2, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 }
    ]
  },

  // Emotional & Mental Health
  'anxiety': {
    guides: [
      { priority: 1, id: 8, title: 'My Breast Cancer Journal', url: 'https://whitetheivdrips.etsy.com/listing/4495687914', price: 17 },
      { priority: 2, id: 1, title: 'Stage 1 - The Steady Foundation', url: 'https://whitetheivdrips.etsy.com/listing/4495687881', price: 27 },
      { priority: 3, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 }
    ]
  },

  'emotional distress': {
    guides: [
      { priority: 1, id: 8, title: 'My Breast Cancer Journal', url: 'https://whitetheivdrips.etsy.com/listing/4495687914', price: 17 },
      { priority: 2, id: 1, title: 'Stage 1 - The Steady Foundation', url: 'https://whitetheivdrips.etsy.com/listing/4495687881', price: 27 },
      { priority: 3, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 }
    ]
  },

  'emotional overwhelm': {
    guides: [
      { priority: 1, id: 8, title: 'My Breast Cancer Journal', url: 'https://whitetheivdrips.etsy.com/listing/4495687914', price: 17 },
      { priority: 2, id: 1, title: 'Stage 1 - The Steady Foundation', url: 'https://whitetheivdrips.etsy.com/listing/4495687881', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ],
    bundle_option: { id: 6, title: 'Stage Path Framework (All 5 Stages)', url: 'https://whitetheivdrips.etsy.com/listing/4495687940', price: 97, message: 'Comprehensive support through all phases' }
  },

  'overwhelm': {
    guides: [
      { priority: 1, id: 8, title: 'My Breast Cancer Journal', url: 'https://whitetheivdrips.etsy.com/listing/4495687914', price: 17 },
      { priority: 2, id: 1, title: 'Stage 1 - The Steady Foundation', url: 'https://whitetheivdrips.etsy.com/listing/4495687881', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ],
    bundle_option: { id: 6, title: 'Stage Path Framework (All 5 Stages)', url: 'https://whitetheivdrips.etsy.com/listing/4495687940', price: 97, message: 'Comprehensive support through all phases' }
  },

  'communication challenges': {
    guides: [
      { priority: 1, id: 13, title: 'What to Say - and What Not to Say', url: 'https://whitetheivdrips.etsy.com/listing/4495687915', price: 12 },
      { priority: 2, id: 14, title: 'The Caregiver\'s Companion', url: 'https://whitetheivdrips.etsy.com/listing/4495687916', price: 22 },
      { priority: 3, id: 11, title: 'Fertility & Early Menopause Guide', url: 'https://whitetheivdrips.etsy.com/listing/4495687911', price: 27 }
    ]
  },

  'relationship challenges': {
    guides: [
      { priority: 1, id: 13, title: 'What to Say - and What Not to Say', url: 'https://whitetheivdrips.etsy.com/listing/4495687915', price: 12 },
      { priority: 2, id: 14, title: 'The Caregiver\'s Companion', url: 'https://whitetheivdrips.etsy.com/listing/4495687916', price: 22 },
      { priority: 3, id: 11, title: 'Fertility & Early Menopause Guide', url: 'https://whitetheivdrips.etsy.com/listing/4495687911', price: 27 }
    ]
  },

  'fear of recurrence': {
    guides: [
      { priority: 1, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 },
      { priority: 2, id: 5, title: 'Stage 5 - The Rooted Presence', url: 'https://whitetheivdrips.etsy.com/listing/4495687932', price: 27 }
    ],
    bundle_option: { id: 6, title: 'Stage Path Framework (All 5 Stages)', url: 'https://whitetheivdrips.etsy.com/listing/4495687940', price: 97, message: 'Build confidence moving forward' }
  },

  'mid-treatment support': {
    guides: [
      { priority: 1, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 },
      { priority: 2, id: 2, title: 'Stage 3 - The Open Space', url: 'https://whitetheivdrips.etsy.com/listing/4495687899', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ],
    bundle_option: { id: 6, title: 'Stage Path Framework (All 5 Stages)', url: 'https://whitetheivdrips.etsy.com/listing/4495687940', price: 97, message: 'Get all 5 stages to guide you from now through recovery' }
  },

  // Medical & Practical
  'newly diagnosed': {
    guides: [
      { priority: 1, id: 15, title: 'The Diagnosis Preparation Kit', url: 'https://whitetheivdrips.etsy.com/listing/4495687917', price: 27 },
      { priority: 2, id: 16, title: 'An Oncology Nurse\'s Guide', url: 'https://whitetheivdrips.etsy.com/listing/4495687918', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ],
    bundle_option: { id: 6, title: 'Stage Path Framework (All 5 Stages)', url: 'https://whitetheivdrips.etsy.com/listing/4495687940', price: 97, message: 'Start your journey with all 5 stages' }
  },

  'need guidance': {
    guides: [
      { priority: 1, id: 15, title: 'The Diagnosis Preparation Kit', url: 'https://whitetheivdrips.etsy.com/listing/4495687917', price: 27 },
      { priority: 2, id: 16, title: 'An Oncology Nurse\'s Guide', url: 'https://whitetheivdrips.etsy.com/listing/4495687918', price: 27 },
      { priority: 3, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 }
    ],
    bundle_option: { id: 6, title: 'Stage Path Framework (All 5 Stages)', url: 'https://whitetheivdrips.etsy.com/listing/4495687940', price: 97, message: 'Start your journey with all 5 stages' }
  },

  'port questions': {
    guides: [
      { priority: 1, id: 17, title: 'Central Lines & Implanted Ports', url: 'https://whitetheivdrips.etsy.com/listing/4495687919', price: 17 },
      { priority: 2, id: 12, title: 'Hospital Bag & Treatment Day Checklist', url: 'https://whitetheivdrips.etsy.com/listing/4495687912', price: 9 }
    ]
  },

  'central line care': {
    guides: [
      { priority: 1, id: 17, title: 'Central Lines & Implanted Ports', url: 'https://whitetheivdrips.etsy.com/listing/4495687919', price: 17 },
      { priority: 2, id: 12, title: 'Hospital Bag & Treatment Day Checklist', url: 'https://whitetheivdrips.etsy.com/listing/4495687912', price: 9 }
    ]
  },

  'treatment day preparation': {
    guides: [
      { priority: 1, id: 12, title: 'Hospital Bag & Treatment Day Checklist', url: 'https://whitetheivdrips.etsy.com/listing/4495687912', price: 9 },
      { priority: 2, id: 18, title: 'Chemotherapy: What to Expect (FREE)', url: 'https://whiletheivdrips.com', price: 0 },
      { priority: 3, id: 1, title: 'Stage 1 - The Steady Foundation', url: 'https://whitetheivdrips.etsy.com/listing/4495687881', price: 27 }
    ]
  },

  'fertility concerns': {
    guides: [
      { priority: 1, id: 11, title: 'Fertility & Early Menopause Guide', url: 'https://whitetheivdrips.etsy.com/listing/4495687911', price: 27 }
    ]
  },

  // Support & Caregiver
  'caregiver support': {
    guides: [
      { priority: 1, id: 14, title: 'The Caregiver\'s Companion', url: 'https://whitetheivdrips.etsy.com/listing/4495687916', price: 22 },
      { priority: 2, id: 13, title: 'What to Say - and What Not to Say', url: 'https://whitetheivdrips.etsy.com/listing/4495687915', price: 12 },
      { priority: 3, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 }
    ]
  },

  'help needed': {
    guides: [
      { priority: 1, id: 14, title: 'The Caregiver\'s Companion', url: 'https://whitetheivdrips.etsy.com/listing/4495687916', price: 22 },
      { priority: 2, id: 13, title: 'What to Say - and What Not to Say', url: 'https://whitetheivdrips.etsy.com/listing/4495687915', price: 12 },
      { priority: 3, id: 3, title: 'Stage 2 - The Gentle Release', url: 'https://whitetheivdrips.etsy.com/listing/4495687898', price: 27 }
    ]
  },

  // Journey-Based (Post-Treatment)
  'life after treatment': {
    guides: [
      { priority: 1, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 },
      { priority: 2, id: 5, title: 'Stage 5 - The Rooted Presence', url: 'https://whitetheivdrips.etsy.com/listing/4495687932', price: 27 }
    ],
    bundle_option: { id: 6, title: 'Stage Path Framework (All 5 Stages)', url: 'https://whitetheivdrips.etsy.com/listing/4495687940', price: 97, message: 'Look back on your entire journey with all 5 stages' }
  },

  'recovery': {
    guides: [
      { priority: 1, id: 10, title: 'Post-Treatment Recovery', url: 'https://whitetheivdrips.etsy.com/listing/4490807040', price: 27 },
      { priority: 2, id: 5, title: 'Stage 5 - The Rooted Presence', url: 'https://whitetheivdrips.etsy.com/listing/4495687932', price: 27 }
    ],
    bundle_option: { id: 6, title: 'Stage Path Framework (All 5 Stages)', url: 'https://whitetheivdrips.etsy.com/listing/4495687940', price: 97, message: 'Look back on your entire journey with all 5 stages' }
    }
};

/**
 * Get guides by symptom
 * @param {string} symptom - Patient's symptom
 * @returns {object|null} - Recommended guides or null if not found
 */
function getGuidesBySymptom(symptom) {
  const normalized = symptom.toLowerCase().trim();
  return symptomMapping[normalized] || null;
}

/**
 * Get all supported symptoms
 * @returns {array} - List of supported symptoms
 */
function getSupportedSymptoms() {
  return Object.keys(symptomMapping).sort();
}

module.exports = {
  getGuidesBySymptom,
  getSupportedSymptoms
};
