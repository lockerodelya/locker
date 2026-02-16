// ============================================
// VOOO AI EDUCATION - MAIN CONFIGURATION
// Edit this file to change prices, GST rates, and enable Razorpay
// ============================================

const VOOO_CONFIG = {
    
    // ============================================
    // PAYMENT GATEWAY SETTINGS
    // ============================================
    payment: {
        // Set to 'qr_manual' for QR code payments
        // Set to 'razorpay' when Razorpay is activated
        // Set to 'cashfree' for Cashfree
        mode: 'qr_manual',  // ⭐ CHANGE THIS TO 'razorpay' WHEN READY
        
        // QR Code Payment Settings
        qr_manual: {
            enabled: true,
            qr_image_path: '/vooo-ai/assets/sbiqr.jpg',  // Your SBI QR code
            upi_id: '9874295005@sbi',
            contact_phone: '+91-9674130001',
            contact_whatsapp: '+91-9674130001',
            payment_instructions: 'Scan QR code, pay exact amount, then call/WhatsApp us with screenshot'
        },
        
        // Razorpay Settings (will be activated later)
        razorpay: {
            enabled: false,  // ⭐ SET TO true WHEN RAZORPAY IS READY
            key_id: '',      // Add your Razorpay Key ID here
            key_secret: '',  // Add your Razorpay Key Secret here (backend only)
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
    // PLAN PRICING (All-Inclusive Amounts)
    // ============================================
    pricing: {
        plans: {
            '1month': {
                amount: 200,        // All-inclusive price
                duration_days: 30,
                display_name: '1 Month'
            },
            '3month': {
                amount: 550,
                duration_days: 90,
                display_name: '3 Months',
                badge: 'MOST POPULAR'
            },
            '6month': {
                amount: 1000,
                duration_days: 180,
                display_name: '6 Months',
                badge: 'BEST VALUE'
            },
            '1year': {
                amount: 1800,
                duration_days: 365,
                display_name: '1 Year',
                savings: 'Save ₹600!'
            }
        },
        
        // GST Rates (Government of India)
        gst: {
            cgst: 9,  // Central GST in percentage
            sgst: 9   // State GST in percentage
        }
    },
    
    // ============================================
    // USAGE LIMITS
    // ============================================
    limits: {
        free_user_daily_mcq: 30,    // Total MCQs per day for free users
        paid_user_daily_mcq: -1,    // -1 means unlimited
        max_devices_free: 1,        // Free users: 1 device
        max_devices_paid: 2         // Paid users: 2 devices
    },
    
    // ============================================
    // FIREBASE CONFIGURATION
    // ============================================
    firebase: {
        apiKey: "AIzaSyCrJ1KVJA0v2-2ARZmY69IzdUmekAXz4xI",
        authDomain: "odelya-vooo-ai.firebaseapp.com",
        projectId: "odelya-vooo-ai",
        storageBucket: "odelya-vooo-ai.firebasestorage.app",
        messagingSenderId: "860643335615",
        appId: "1:860643335615:web:9a78cba9f96fb557df150a",
        measurementId: "G-D5T0JW4W21"
    },
    
    // ============================================
    // BUSINESS INFORMATION
    // ============================================
    business: {
        name: 'Odelya Management Pvt. Ltd.',
        brand_name: 'Vooo AI Education',
        gstin: '19AADCO2829F1ZF',
        address: '44E, 2nd Floor, Nanadalal Mitra Lane, Tollygunge, Kudghat, Kolkata - 700040, West Bengal, India',
        email: 'care.ompl@gmail.com',
        phone: '+91-9674130001',
        whatsapp: '+91-9674130001',
        business_hours: '9 AM - 8 PM IST',
        timezone: 'Asia/Kolkata'
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
            first_login: { name: 'Welcome!', emoji: '👋', description: 'Created your account' },
            streak_3: { name: '3-Day Streak', emoji: '🔥', description: 'Logged in 3 days in a row' },
            streak_7: { name: 'Week Warrior', emoji: '⚡', description: 'Logged in 7 days in a row' },
            streak_30: { name: 'Monthly Master', emoji: '🏆', description: 'Logged in 30 days in a row' },
            mcq_50: { name: 'Question Solver', emoji: '📝', description: 'Attempted 50 MCQs' },
            mcq_100: { name: 'Question Master', emoji: '🎯', description: 'Attempted 100 MCQs' },
            mcq_500: { name: 'Quiz Legend', emoji: '🌟', description: 'Attempted 500 MCQs' },
            accuracy_80: { name: 'Precision Pro', emoji: '🎖️', description: '80%+ accuracy' },
            accuracy_90: { name: 'Near Perfect', emoji: '💎', description: '90%+ accuracy' }
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
        landing_free: 'Free signup to get access unique 30 MCQs daily',
        landing_upgrade: 'Buy our service to get truly unlimited unique questions from all categories',
        no_refund: 'No refunds under any circumstances - All sales are final',
        payment_processing: 'Processing your payment...',
        payment_success: 'Payment successful! Your account is now active.',
        payment_failed: 'Payment failed. Please try again or contact support.',
        daily_limit_reached: '🔒 Daily limit reached! Subscribe to continue learning without limits.',
        device_limit_reached: 'Maximum device limit reached. Please logout from another device first.'
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Calculate base price and GST from all-inclusive amount
VOOO_CONFIG.calculateGST = function(totalAmount) {
    const gstRate = (this.pricing.gst.cgst + this.pricing.gst.sgst) / 100;
    const basePrice = totalAmount / (1 + gstRate);
    const cgstAmount = basePrice * (this.pricing.gst.cgst / 100);
    const sgstAmount = basePrice * (this.pricing.gst.sgst / 100);
    
    return {
        basePrice: parseFloat(basePrice.toFixed(2)),
        cgst: parseFloat(cgstAmount.toFixed(2)),
        sgst: parseFloat(sgstAmount.toFixed(2)),
        total: parseFloat(totalAmount.toFixed(2))
    };
};

// Calculate Razorpay gateway fee (2%)
VOOO_CONFIG.calculateGatewayFee = function(amount) {
    return parseFloat((amount * 0.02).toFixed(2));
};

// Get total amount user needs to pay (including gateway fee if Razorpay)
VOOO_CONFIG.getTotalPayable = function(planKey) {
    const plan = this.pricing.plans[planKey];
    if (!plan) return 0;
    
    if (this.payment.mode === 'razorpay' || this.payment.mode === 'cashfree') {
        const gatewayFee = this.calculateGatewayFee(plan.amount);
        return parseFloat((plan.amount + gatewayFee).toFixed(2));
    }
    
    return plan.amount;  // QR code payments: no gateway fee
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VOOO_CONFIG;
}

console.log('✅ VOOO Configuration loaded');
console.log('Payment Mode:', VOOO_CONFIG.payment.mode);
console.log('Plans:', Object.keys(VOOO_CONFIG.pricing.plans));
