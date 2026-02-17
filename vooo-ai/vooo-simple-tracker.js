// ============================================
// VOOO SMART MCQ TRACKER
// For GUESTS: localStorage, 20 MCQ limit
// For LOGGED-IN: Firebase tracks, 40 MCQ limit
// ============================================

const VOOO_SIMPLE_TRACKER = {
    GUEST_LIMIT: 20,
    STORAGE_KEY: 'vooo_mcq_count',
    
    // Check if user is logged in
    async isUserLoggedIn() {
        return new Promise((resolve) => {
            if (typeof firebase === 'undefined' || !firebase.auth) {
                resolve(false);
                return;
            }
            
            firebase.auth().onAuthStateChanged((user) => {
                resolve(!!user);
            });
        });
    },
    
    // Get count for GUESTS only (localStorage)
    getGuestCount() {
        const count = localStorage.getItem(this.STORAGE_KEY);
        return count ? parseInt(count) : 0;
    },
    
    // Increment for GUESTS only
    incrementGuestCount() {
        const current = this.getGuestCount();
        const newCount = current + 1;
        localStorage.setItem(this.STORAGE_KEY, newCount);
        return newCount;
    },
    
    // Check if GUEST limit reached
    isGuestLimitReached() {
        return this.getGuestCount() >= this.GUEST_LIMIT;
    },
    
    // Show login prompt for GUESTS
    showLoginPrompt() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 99999;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        overlay.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            ">
                <h2 style="color: #2563eb; font-size: 2em; margin-bottom: 20px;">
                    🎓 You've used your 20 free MCQs!
                </h2>
                <p style="font-size: 1.3em; margin-bottom: 30px; line-height: 1.6;">
                    <strong>Sign up to get 40 free MCQs daily and pay to get guaranteed millions of unique MCQs for all time</strong>
                </p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <a href="/vooo-ai/vooosignup.html" style="
                        background: #2563eb;
                        color: white;
                        padding: 15px 40px;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        font-size: 1.2em;
                    ">Sign Up Free</a>
                    <a href="/vooo-ai/vooologin.html" style="
                        background: white;
                        color: #2563eb;
                        border: 3px solid #2563eb;
                        padding: 15px 40px;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        font-size: 1.2em;
                    ">Login</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    },
    
    // Main tracking function - SMART!
    async trackMCQ() {
        const isLoggedIn = await this.isUserLoggedIn();
        
        if (isLoggedIn) {
            // User is logged in - Firebase handles everything, don't block!
            console.log('✅ Logged-in user - Firebase tracking active');
            return true; // Allow generation
        } else {
            // Guest user - check localStorage limit
            const count = this.incrementGuestCount();
            console.log(`Guest MCQ ${count}/${this.GUEST_LIMIT} used`);
            
            if (count >= this.GUEST_LIMIT) {
                this.showLoginPrompt();
                return false; // Block generation
            }
            
            return true; // Allow generation
        }
    }
};

console.log('✅ VOOO Smart Tracker loaded');
