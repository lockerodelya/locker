// ============================================
// VOOO AI EDUCATION - MAIN CONFIGURATION
// ============================================
// ⭐⭐⭐ EASY EDIT SECTION — CHANGE PRICES, DURATION, FEE HERE ⭐⭐⭐
// ============================================

const VOOO_CONFIG = {

    // ============================================
    // ⭐ RAZORPAY GATEWAY FEE % — EDIT HERE
    // Current: 2% (Razorpay standard UPI/Card rate)
    // If Razorpay changes your rate, update ONLY this number
    // Example: 2 means 2%, 2.5 means 2.5%, 1.8 means 1.8%
    // ============================================
    gateway_fee_percent: 2,   // ⭐ CHANGE THIS IF RAZORPAY RATE CHANGES
    free_daily_limit: 30,     // ⭐ CHANGE THIS TO SET FREE USER DAILY MCQ LIMIT


    // ============================================
    // ⭐⭐ INTERNATIONAL PRICING SETTINGS — EDIT HERE
    //
    // international_factor_higher_currencies
    //   → STRONG currencies higher in value than INR (USD, GBP, EUR, AUD, CAD etc)
    //   → Formula: INR → convert → multiply by this factor → whole number
    //   → Example: 10 means ₹120 → $1.44 × 10 = $14
    //
    // international_factor_lower_currencies
    //   → WEAK currencies lower in value than INR (BDT, NPR, LKR, PKR etc)
    //   → Formula: INR → convert → multiply by this factor → whole number
    //   → Example: 2 means ₹120 → ৳160 × 2 = ৳320
    //
    // Change ONLY these two numbers = ALL prices update automatically
    // INR prices stay unchanged for Indian users
    // ============================================
    international_factor_higher_currencies: 10,  // ⭐ CHANGE THIS FOR USD, GBP, EUR etc
    international_factor_lower_currencies:   2,  // ⭐ CHANGE THIS FOR BDT, NPR, LKR etc

    // ============================================
    // SUPPORTED INTERNATIONAL CURRENCIES
    // strong = true  → apply international_factor multiplier
    // strong = false → direct INR conversion, whole number only (weak currencies)
    // symbol = currency symbol shown on pricing page
    // name   = full currency name
    // ============================================
    international_currencies: {
        // --- STRONG CURRENCIES (factor applied) ---
        'USD': { symbol: '$',   name: 'US Dollar',           strong: true  },
        'GBP': { symbol: '£',   name: 'British Pound',        strong: true  },
        'EUR': { symbol: '€',   name: 'Euro',                 strong: true  },
        'AUD': { symbol: 'A$',  name: 'Australian Dollar',    strong: true  },
        'CAD': { symbol: 'C$',  name: 'Canadian Dollar',      strong: true  },
        'SGD': { symbol: 'S$',  name: 'Singapore Dollar',     strong: true  },
        'CHF': { symbol: 'CHF', name: 'Swiss Franc',          strong: true  },
        'NZD': { symbol: 'NZ$', name: 'New Zealand Dollar',   strong: true  },
        'HKD': { symbol: 'HK$', name: 'Hong Kong Dollar',     strong: true  },
        'JPY': { symbol: '¥',   name: 'Japanese Yen',         strong: false },  // weaker per unit
        'MYR': { symbol: 'RM',  name: 'Malaysian Ringgit',    strong: true  },
        'AED': { symbol: 'AED', name: 'UAE Dirham',           strong: true  },
        'SAR': { symbol: 'SAR', name: 'Saudi Riyal',          strong: true  },

        // --- WEAK CURRENCIES (direct conversion, no factor) ---
        'BDT': { symbol: '৳',   name: 'Bangladeshi Taka',     strong: false },
        'NPR': { symbol: 'Rs',  name: 'Nepali Rupee',         strong: false },
        'LKR': { symbol: 'Rs',  name: 'Sri Lankan Rupee',     strong: false },
        'PKR': { symbol: 'Rs',  name: 'Pakistani Rupee',      strong: false },
        'IDR': { symbol: 'Rp',  name: 'Indonesian Rupiah',    strong: false },
        'VND': { symbol: '₫',   name: 'Vietnamese Dong',      strong: false },
        'MMK': { symbol: 'K',   name: 'Myanmar Kyat',         strong: false },
        'KHR': { symbol: '៛',   name: 'Cambodian Riel',       strong: false },
        'PHP': { symbol: '₱',   name: 'Philippine Peso',      strong: false },
    },


    // ============================================
    // ⭐⭐ PLAN PRICES & DURATIONS — EDIT HERE
    // amount       = your plan price (INR), GST inclusive
    // duration_days = number of days the plan is valid
    // display_name = shown on pricing page cards
    // badge        = optional label on card (or remove the line)
    // savings      = optional savings label (or remove the line)
    // ============================================
    pricing: {
        plans: {
            '1month': {
                amount:       120,
                duration_days: 30,
                display_name: '1 Month'
            },
            '3month': {
                amount:       350,
                duration_days: 90,
                display_name: '3 Months',
            },
            '6month': {
                amount:       700,
                duration_days: 180,
                display_name: '6 Months',
            },
            '1year': {
                amount:       1200,
                duration_days: 365,
                display_name: '1 Year',
            }
        },

        // GST Rates (Government of India)
        // All plan amounts above are already GST inclusive
        // These rates are used only for generating GST invoices/breakdown
        gst: {
            cgst: 9,
            sgst: 9
        }
    },


    // ============================================
    // PAYMENT GATEWAY SETTINGS
    // ============================================
    payment: {
        mode: 'razorpay',

        razorpay: {
            enabled: true,
            key_id: 'rzp_live_SHcVTeQa9FBPZT',
            key_secret: '',
            webhook_secret: ''
        },
    },


    // ============================================
    // FIREBASE CONFIGURATION
    // ============================================
    firebase: {
        apiKey:            "AIzaSyCrJ1KVJA0v2-2ARZmY69IzdUmekAXz4xI",
        authDomain:        "odelya-vooo-ai.firebaseapp.com",
        projectId:         "odelya-vooo-ai",
        storageBucket:     "odelya-vooo-ai.firebasestorage.app",
        messagingSenderId: "860643335615",
        appId:             "1:860643335615:web:9a78cba9f96fb557df150a",
        measurementId:     "G-D5T0JW4W21"
    },


    // ============================================
    // BUSINESS INFORMATION
    // ============================================
    business: {
        name:           'Odelya Management Pvt. Ltd.',
        brand_name:     'Vooo AI Education',
        gstin:          '19AADCO2829F1ZF',
        address:        '44E, 2nd Floor, Nanadalal Mitra Lane, Tollygunge, Kudghat, Kolkata - 700040, West Bengal, India',
        email:          'care.ompl@gmail.com',
        phone:          '+91-9674130001',
        whatsapp:       '+91-9674130001',
        business_hours: '9 AM - 8 PM IST',
        timezone:       'Asia/Kolkata'
    },

    // ============================================
    // GAMIFICATION SETTINGS
    // ============================================
    gamification: {
        badges: {
            first_login:  { name: 'Welcome!',        emoji: '👋', description: 'Created your account' },
            streak_3:     { name: '3-Day Streak',    emoji: '🔥', description: 'Logged in 3 days in a row' },
            streak_7:     { name: 'Week Warrior',    emoji: '⚡', description: 'Logged in 7 days in a row' },
            streak_30:    { name: 'Monthly Master',  emoji: '🏆', description: 'Logged in 30 days in a row' },
            mcq_50:       { name: 'Question Solver', emoji: '📝', description: 'Attempted 50 MCQs' },
            mcq_100:      { name: 'Question Master', emoji: '🎯', description: 'Attempted 100 MCQs' },
            mcq_500:      { name: 'Quiz Legend',     emoji: '🌟', description: 'Attempted 500 MCQs' },
            accuracy_80:  { name: 'Precision Pro',   emoji: '🎖️', description: '80%+ accuracy' },
            accuracy_90:  { name: 'Near Perfect',    emoji: '💎', description: '90%+ accuracy' }
        }
    },


    // ============================================
    // SMART UPGRADE PROMPTS
    // ============================================
    upgradePrompts: {
        high_performer: {
            trigger: (stats) => stats.accuracy >= 80,
            message: '🌟 Excellent! You\'re clearly serious about learning. Unlimited access = faster progress. Upgrade?'
        },
        consistent_user: {
            trigger: (stats) => stats.daily_streak >= 5,
            message: 'You\'re dedicated! Students like you improve 3x faster with unlimited practice. Try 1 month for ₹200?'
        },
        limit_reached: {
            trigger: (stats) => stats.daily_usage >= VOOO_CONFIG.free_daily_limit,
            message: 'You\'re on fire today! 🔥 Don\'t let daily limits slow you down. Continue learning?'
        },
        category_explorer: {
            trigger: (stats) => stats.categories_tried >= 4,
            message: 'Curious mind! 🧠 Explore ALL categories unlimited. Plans start at ₹200/month.'
        }
    },


    // ============================================
    // MESSAGES & RESPONSES
    // ============================================
    messages: {
        landing_free:        'Free signup to get access unique 30 MCQs daily',
        landing_upgrade:     'Buy our service to get truly unlimited unique questions from all categories',
        no_refund:           'No refunds under any circumstances - All sales are final',
        payment_processing:  'Processing your payment...',
        payment_success:     'Payment successful! Your account is now active.',
        payment_failed:      'Payment failed. Please try again or contact support.',
        daily_limit_reached: '🔒 Daily limit reached! Subscribe to continue learning without limits.',
        device_limit_reached:'Maximum device limit reached. Please logout from another device first.'
    }
};


// ============================================
// HELPER FUNCTIONS — DO NOT EDIT BELOW
// These use your settings above automatically
// ============================================

// Calculate base price and GST from all-inclusive amount
VOOO_CONFIG.calculateGST = function(totalAmount) {
    const gstRate    = (this.pricing.gst.cgst + this.pricing.gst.sgst) / 100;
    const basePrice  = totalAmount / (1 + gstRate);
    const cgstAmount = basePrice * (this.pricing.gst.cgst / 100);
    const sgstAmount = basePrice * (this.pricing.gst.sgst / 100);
    return {
        basePrice: parseFloat(basePrice.toFixed(2)),
        cgst:      parseFloat(cgstAmount.toFixed(2)),
        sgst:      parseFloat(sgstAmount.toFixed(2)),
        total:     parseFloat(totalAmount.toFixed(2))
    };
};

// Calculate gateway fee using gateway_fee_percent set at top
VOOO_CONFIG.calculateGatewayFee = function(amount) {
    const feePercent = this.gateway_fee_percent / 100;
    return Math.ceil(amount * feePercent);
};

// Get total amount user needs to pay (plan amount + gateway fee)
VOOO_CONFIG.getTotalPayable = function(planKey) {
    const plan = this.pricing.plans[planKey];
    if (!plan) return { planAmount: 0, gatewayFee: 0, totalAmount: 0, totalPaise: 0 };

    const planAmount  = plan.amount;
    let   gatewayFee  = 0;

    if (this.payment.mode === 'razorpay' || this.payment.mode === 'cashfree') {
        gatewayFee = this.calculateGatewayFee(planAmount);
    }

    const totalAmount = planAmount + gatewayFee;
    const totalPaise  = totalAmount * 100;

    return {
        planAmount:  planAmount,
        gatewayFee:  gatewayFee,
        totalAmount: totalAmount,
        totalPaise:  totalPaise
    };
};

// ============================================
// ⭐ INTERNATIONAL PRICING HELPER
// Fetches live exchange rates and calculates
// international price for a given INR amount.
//
// Usage:
//   const result = await VOOO_CONFIG.getInternationalPrice(120, 'USD');
//   // result = { amount: 14, symbol: '$', currency: 'USD', display: '$14' }
//
// How it works:
//   - Detects user country via IP
//   - Fetches live exchange rate from free API
//   - Strong currency (USD/GBP/EUR etc) → convert → multiply by international_factor_higher_currencies → whole number
//   - Weak currency (BDT/NPR/LKR etc)   → convert → multiply by international_factor_lower_currencies → whole number
//   - India (INR)     → return INR amount as-is
// ============================================
VOOO_CONFIG.getInternationalPrice = async function(inrAmount, currencyCode) {
    try {
        // Fetch live exchange rate: INR → target currency (5 sec timeout)
        const rateController = new AbortController();
        const rateTimeout    = setTimeout(() => rateController.abort(), 5000);
        const rateRes        = await fetch('https://api.exchangerate-api.com/v4/latest/INR', { signal: rateController.signal });
        clearTimeout(rateTimeout);
        const rateData = await rateRes.json();
        const rate     = rateData.rates[currencyCode];

        if (!rate) return null;

        const currencyInfo = this.international_currencies[currencyCode];
        if (!currencyInfo) return null;

        let convertedAmount;

        if (currencyInfo.strong) {
            // Strong currency (higher than INR): convert then multiply by higher factor
            convertedAmount = Math.round(inrAmount * rate * this.international_factor_higher_currencies);
        } else {
            // Weak currency (lower than INR): convert then multiply by lower factor
            convertedAmount = Math.round(inrAmount * rate * this.international_factor_lower_currencies);
        }

        return {
            amount:   convertedAmount,
            symbol:   currencyInfo.symbol,
            currency: currencyCode,
            display:  currencyInfo.symbol + convertedAmount,
            strong:   currencyInfo.strong
        };
    } catch (err) {
        console.error('International price fetch failed:', err);
        return null;
    }
};

// ============================================
// ⭐ DETECT USER COUNTRY & CURRENCY
// Tries multiple APIs in order — if one fails,
// automatically tries the next one.
// Falls back to India/INR if ALL fail.
// ============================================
VOOO_CONFIG.detectUserCurrency = async function() {

    // ── API 1: ipapi.co ──
    try {
        const controller = new AbortController();
        const timeout    = setTimeout(() => controller.abort(), 4000); // 4 sec timeout
        const res        = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeout);
        const data = await res.json();

        if (data && data.country_code && !data.error) {
            console.log('✅ Location detected via ipapi.co:', data.country_code);
            return {
                countryCode:  data.country_code  || 'IN',
                currencyCode: data.currency       || 'INR',
                isIndia:      data.country_code   === 'IN',
                countryName:  data.country_name   || 'India'
            };
        }
    } catch (err) {
        console.warn('ipapi.co failed, trying next API...', err.message);
    }

    // ── API 2: ip-api.com (free, no key needed) ──
    try {
        const controller = new AbortController();
        const timeout    = setTimeout(() => controller.abort(), 4000);
        const res        = await fetch('https://ip-api.com/json/?fields=status,country,countryCode,currency', { signal: controller.signal });
        clearTimeout(timeout);
        const data = await res.json();

        if (data && data.status === 'success' && data.countryCode) {
            console.log('✅ Location detected via ip-api.com:', data.countryCode);
            return {
                countryCode:  data.countryCode || 'IN',
                currencyCode: data.currency    || 'INR',
                isIndia:      data.countryCode === 'IN',
                countryName:  data.country     || 'India'
            };
        }
    } catch (err) {
        console.warn('ip-api.com failed, trying next API...', err.message);
    }

    // ── API 3: freeipapi.com ──
    try {
        const controller = new AbortController();
        const timeout    = setTimeout(() => controller.abort(), 4000);
        const res        = await fetch('https://freeipapi.com/api/json', { signal: controller.signal });
        clearTimeout(timeout);
        const data = await res.json();

        if (data && data.countryCode) {
            console.log('✅ Location detected via freeipapi.com:', data.countryCode);
            // freeipapi doesn't return currency — map from country
            const currencyMap = { IN:'INR', US:'USD', GB:'GBP', EU:'EUR', BD:'BDT', NP:'NPR', AU:'AUD', CA:'CAD', SG:'SGD' };
            const currency    = currencyMap[data.countryCode] || 'USD';
            return {
                countryCode:  data.countryCode,
                currencyCode: currency,
                isIndia:      data.countryCode === 'IN',
                countryName:  data.countryName || 'Unknown'
            };
        }
    } catch (err) {
        console.warn('freeipapi.com failed too.', err.message);
    }

    // ── All APIs failed — default to India ──
    console.error('⚠️ All location APIs failed. Defaulting to India/INR.');
    return {
        countryCode:  'IN',
        currencyCode: 'INR',
        isIndia:      true,
        countryName:  'India'
    };
};

// ============================================
// ⭐ GET PLAN PRICE FOR USER (ALL-IN-ONE)
// Detects country, fetches rate, returns display price
//
// Usage in your pricing page:
//   const price = await VOOO_CONFIG.getPlanPriceForUser('1month');
//   // India user    → { display: '₹120',  currency: 'INR', isIndia: true  }
//   // US user       → { display: '$14',   currency: 'USD', isIndia: false }
//   // BD user       → { display: '৳143',  currency: 'BDT', isIndia: false }
// ============================================
VOOO_CONFIG.getPlanPriceForUser = async function(planKey, userCurrencyInfo) {
    const plan = this.pricing.plans[planKey];
    if (!plan) return null;

    // If India → return INR directly
    if (userCurrencyInfo.isIndia || userCurrencyInfo.currencyCode === 'INR') {
        return {
            amount:      plan.amount,
            symbol:      '₹',
            currency:    'INR',
            display:     '₹' + plan.amount,
            isIndia:     true
        };
    }

    // Check if we support this currency
    const currencyCode = userCurrencyInfo.currencyCode;
    const supported    = this.international_currencies[currencyCode];

    if (!supported) {
        // Unsupported currency → fallback to USD
        const usdPrice = await this.getInternationalPrice(plan.amount, 'USD');
        return usdPrice ? { ...usdPrice, isIndia: false } : null;
    }

    // Get international price
    const intlPrice = await this.getInternationalPrice(plan.amount, currencyCode);
    return intlPrice ? { ...intlPrice, isIndia: false } : null;
};


// Get plan duration days by planKey
VOOO_CONFIG.getDurationDays = function(planKey) {
    const plan = this.pricing.plans[planKey];
    return plan ? plan.duration_days : 30;
};

// Calculate expiry date from today + duration days
VOOO_CONFIG.getExpiryDate = function(planKey) {
    const days = this.getDurationDays(planKey);
    const d    = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
};

// Get today's date as YYYY-MM-DD
VOOO_CONFIG.getTodayDate = function() {
    return new Date().toISOString().split('T')[0];
};

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VOOO_CONFIG;
}

// Startup confirmation in browser console
console.log('✅ VOOO Configuration loaded');
console.log('Payment Mode:',        VOOO_CONFIG.payment.mode);
console.log('Gateway Fee:',         VOOO_CONFIG.gateway_fee_percent + '%');
console.log('Higher Currency Factor:', VOOO_CONFIG.international_factor_higher_currencies + 'x (USD, GBP, EUR etc)');
console.log('Lower Currency Factor:',  VOOO_CONFIG.international_factor_lower_currencies  + 'x (BDT, NPR, LKR etc)');
console.log('Plans:',               Object.keys(VOOO_CONFIG.pricing.plans));
console.log('Plan Amounts (INR):',  Object.values(VOOO_CONFIG.pricing.plans).map(p => p.amount));
