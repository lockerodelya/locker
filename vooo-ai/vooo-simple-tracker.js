// ============================================
// VOOO SIMPLE MCQ TRACKER (localStorage only)
// Tracks 10 free MCQs before showing login prompt
// ============================================

const VOOO_SIMPLE_TRACKER = {
    FREE_MCQ_LIMIT: 20,
    STORAGE_KEY: 'vooo_mcq_count',
    
    // Get current count
    getCount() {
        const count = localStorage.getItem(this.STORAGE_KEY);
        return count ? parseInt(count) : 0;
    },
    
    // Increment count
    increment() {
        const current = this.getCount();
        const newCount = current + 1;
        localStorage.setItem(this.STORAGE_KEY, newCount);
        return newCount;
    },
    
    // Check if limit reached
    isLimitReached() {
        return this.getCount() >= this.FREE_MCQ_LIMIT;
    },
    
    // Show login prompt
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
    
    // Track MCQ generation
    trackMCQ() {
        const count = this.increment();
        console.log(`MCQ ${count}/${this.FREE_MCQ_LIMIT} used`);
        
        if (count >= this.FREE_MCQ_LIMIT) {
            this.showLoginPrompt();
            return false; // Stop further generation
        }
        
        return true; // Allow generation
    }
};

console.log('✅ VOOO Simple Tracker loaded');
