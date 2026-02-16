// ============================================
// VOOO Usage Tracker - Daily MCQ Limit System
// Tracks 30 MCQ limit for free users
// ============================================

class VoooUsageTracker {
    static async init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(VOOO_CONFIG.firebase);
        }
        this.db = firebase.firestore();
    }
    
    /**
     * Check if user has reached daily limit
     * @param {string} userId - Firebase user ID
     * @param {string} tier - 'free' or 'paid'
     * @returns {object} Usage information
     */
    static async checkDailyUsage(userId, tier) {
        await this.init();
        
        // Paid users have unlimited access
        if (tier === 'paid') {
            return {
                limitReached: false,
                used: -1,
                limit: -1,
                remaining: -1,
                tier: 'paid',
                message: 'Unlimited access'
            };
        }
        
        // Get today's date in IST
        const today = this.getTodayDateIST();
        
        try {
            const userDoc = await this.db.collection('users').doc(userId).get();
            const userData = userDoc.data();
            
            if (!userData) {
                throw new Error('User data not found');
            }
            
            // Check if usage data exists and is from today
            let dailyUsage = userData.dailyUsage || { date: today, count: 0 };
            
            // Reset counter if it's a new day
            if (dailyUsage.date !== today) {
                dailyUsage = { date: today, count: 0 };
                await this.db.collection('users').doc(userId).update({
                    dailyUsage: dailyUsage
                });
            }
            
            const limit = VOOO_CONFIG.limits.free_user_daily_mcq;
            const used = dailyUsage.count;
            const remaining = Math.max(0, limit - used);
            const limitReached = used >= limit;
            
            return {
                limitReached: limitReached,
                used: used,
                limit: limit,
                remaining: remaining,
                tier: 'free',
                message: limitReached ? 
                    `Daily limit reached! Used ${used}/${limit} MCQs.` :
                    `${used}/${limit} MCQs used today. ${remaining} remaining.`
            };
            
        } catch (error) {
            console.error('Error checking usage:', error);
            return {
                limitReached: true,
                used: 0,
                limit: VOOO_CONFIG.limits.free_user_daily_mcq,
                remaining: 0,
                tier: 'free',
                message: 'Error checking usage',
                error: error.message
            };
        }
    }
    
    /**
     * Increment usage counter when user generates MCQ
     * @param {string} userId - Firebase user ID
     * @returns {object} Updated usage info
     */
    static async incrementUsage(userId) {
        await this.init();
        
        const today = this.getTodayDateIST();
        
        try {
            const userRef = this.db.collection('users').doc(userId);
            const userDoc = await userRef.get();
            const userData = userDoc.data();
            
            // Check if user is paid (unlimited)
            if (userData.tier === 'paid') {
                return {
                    success: true,
                    limitReached: false,
                    message: 'Unlimited access'
                };
            }
            
            let dailyUsage = userData.dailyUsage || { date: today, count: 0 };
            
            // Reset if new day
            if (dailyUsage.date !== today) {
                dailyUsage = { date: today, count: 0 };
            }
            
            // Increment count
            dailyUsage.count++;
            
            // Update Firestore
            await userRef.update({
                dailyUsage: dailyUsage,
                totalMCQsAttempted: firebase.firestore.FieldValue.increment(1)
            });
            
            const limit = VOOO_CONFIG.limits.free_user_daily_mcq;
            const remaining = Math.max(0, limit - dailyUsage.count);
            
            return {
                success: true,
                used: dailyUsage.count,
                limit: limit,
                remaining: remaining,
                limitReached: dailyUsage.count >= limit,
                message: `${dailyUsage.count}/${limit} MCQs used today`
            };
            
        } catch (error) {
            console.error('Error incrementing usage:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Get today's date in IST timezone (DD-MM-YYYY format)
     */
    static getTodayDateIST() {
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istDate = new Date(now.getTime() + istOffset);
        
        const day = String(istDate.getUTCDate()).padStart(2, '0');
        const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
        const year = istDate.getUTCFullYear();
        
        return `${day}-${month}-${year}`;
    }
    
    /**
     * Get usage statistics for dashboard
     * @param {string} userId - Firebase user ID
     */
    static async getUsageStats(userId) {
        await this.init();
        
        try {
            const userDoc = await this.db.collection('users').doc(userId).get();
            const userData = userDoc.data();
            
            if (!userData) {
                throw new Error('User not found');
            }
            
            const today = this.getTodayDateIST();
            let dailyUsage = userData.dailyUsage || { date: today, count: 0 };
            
            // Reset if new day
            if (dailyUsage.date !== today) {
                dailyUsage = { date: today, count: 0 };
            }
            
            const limit = userData.tier === 'paid' ? 
                -1 : VOOO_CONFIG.limits.free_user_daily_mcq;
            
            return {
                tier: userData.tier,
                todayUsed: dailyUsage.count,
                todayLimit: limit,
                totalAttempted: userData.totalMCQsAttempted || 0,
                dailyStreak: userData.dailyStreak || 0,
                accuracyScore: userData.accuracyScore || 0,
                badges: userData.badges || []
            };
            
        } catch (error) {
            console.error('Error getting usage stats:', error);
            return null;
        }
    }
    
    /**
     * Reset all users' daily usage (called automatically at midnight IST)
     * Admin function - should be run via Cloud Function or manually
     */
    static async resetAllDailyUsage() {
        await this.init();
        
        const today = this.getTodayDateIST();
        
        try {
            const usersSnapshot = await this.db.collection('users').get();
            const batch = this.db.batch();
            
            usersSnapshot.docs.forEach(doc => {
                const userRef = this.db.collection('users').doc(doc.id);
                batch.update(userRef, {
                    dailyUsage: { date: today, count: 0 }
                });
            });
            
            await batch.commit();
            console.log(`✅ Reset daily usage for ${usersSnapshot.size} users`);
            
            return {
                success: true,
                usersReset: usersSnapshot.size
            };
            
        } catch (error) {
            console.error('Error resetting daily usage:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoooUsageTracker;
}

console.log('✅ VOOO Usage Tracker loaded');
