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
                amount:       200,          // ⭐ Change plan price here
                duration_days: 30,          // ⭐ Change plan duration here
                display_name: '1 Month'
            },
            '3month': {
                amount:       550,          // ⭐ Change plan price here
                duration_days: 90,          // ⭐ Change plan duration here
                display_name: '3 Months',
                badge: 'MOST POPULAR'
            },
            '6month': {
                amount:       1000,         // ⭐ Change plan price here
                duration_days: 180,         // ⭐ Change plan duration here
                display_name: '6 Months',
                badge: 'BEST VALUE'
            },
            '1year': {
                amount:       1800,         // ⭐ Change plan price here
                duration_days: 365,         // ⭐ Change plan duration here
                display_name: '1 Year',
                savings: 'Save ₹600!'
            }
        },

        // GST Rates (Government of India)
        // All plan amounts above are already GST inclusive
        // These rates are used only for generating GST invoices/breakdown
        gst: {
            cgst: 9,   // Central GST %
            sgst: 9    // State GST %
        }
    },


    // ============================================
    // PAYMENT GATEWAY SETTINGS
    // ============================================
    payment: {
        // 'razorpay'  = Razorpay live payments (current mode)
        // 'qr_manual' = Manual QR code payments
        // 'cashfree'  = Cashfree gateway
        mode: 'razorpay',   // ⭐ CURRENT MODE

        // QR Code Payment Settings (backup / manual mode)
        qr_manual: {
            enabled: false,
            qr_image_path: '/vooo-ai/assets/sbiqr.jpg',
            upi_id: '9874295005@sbi',
            contact_phone: '+91-9674130001',
            contact_whatsapp: '+91-9674130001',
            payment_instructions: 'Scan QR code, pay exact amount, then call/WhatsApp us with screenshot'
        },

        // Razorpay Settings — LIVE MODE
        razorpay: {
            enabled: true,
            key_id: 'rzp_live_SHcVTeQa9FBPZT',  // ⭐ Your Live Key ID
            key_secret: '',                        // Never put secret in frontend
            webhook_secret: ''
        },

        // Cashfree Settings (backup gateway)
        cashfree: {
            enabled: false,
            app_id: '',
            secret_key: ''
        }
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
    // SECURITY QUESTIONS
    // ============================================
    securityQuestions: [
        'In which city were you born?',
        'What is your favourite subject?',
        'Which color do you like most?'
    ],


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
            trigger: (stats) => stats.daily_usage >= 30,
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
// Returns fee in INR rounded to nearest rupee
VOOO_CONFIG.calculateGatewayFee = function(amount) {
    const feePercent = this.gateway_fee_percent / 100;
    return Math.ceil(amount * feePercent);
};

// Get total amount user needs to pay (plan amount + gateway fee)
// planKey = '1month', '3month', '6month', '1year'
// Returns object: { planAmount, gatewayFee, totalAmount, totalPaise }
VOOO_CONFIG.getTotalPayable = function(planKey) {
    const plan = this.pricing.plans[planKey];
    if (!plan) return { planAmount: 0, gatewayFee: 0, totalAmount: 0, totalPaise: 0 };

    const planAmount  = plan.amount;
    let   gatewayFee  = 0;

    if (this.payment.mode === 'razorpay' || this.payment.mode === 'cashfree') {
        gatewayFee = this.calculateGatewayFee(planAmount);
    }

    const totalAmount = planAmount + gatewayFee;
    const totalPaise  = totalAmount * 100;   // Razorpay needs paise

    return {
        planAmount:  planAmount,
        gatewayFee:  gatewayFee,
        totalAmount: totalAmount,
        totalPaise:  totalPaise
    };
};

// Get plan duration days by planKey
VOOO_CONFIG.getDurationDays = function(planKey) {
    const plan = this.pricing.plans[planKey];
    return plan ? plan.duration_days : 30;
};

// Calculate expiry date from today + duration days
// Returns date string YYYY-MM-DD
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
console.log('Payment Mode:',      VOOO_CONFIG.payment.mode);
console.log('Gateway Fee:',       VOOO_CONFIG.gateway_fee_percent + '%');
console.log('Plans:',             Object.keys(VOOO_CONFIG.pricing.plans));
console.log('Plan Amounts (INR):', Object.values(VOOO_CONFIG.pricing.plans).map(p => p.amount));
