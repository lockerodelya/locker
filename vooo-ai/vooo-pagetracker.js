// ============================================
// VOOO AI PAGE TRACKER
// Tracks: page views (5 sec minimum), PWA installs
// Collection: vooo_analytics (independent — delete anytime)
// Version: 1.0
// ============================================
// HOW TO USE:
//   Add this ONE line to any page you want to track:
//   <script src="/vooo-ai/vooo-pagetracker.js"></script>
//   Remove it anytime — zero effect on your website.
// ============================================

(function () {

    // ── Wait for Firebase to be ready ──
    function waitForFirebase(callback) {
        if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
            callback();
        } else {
            setTimeout(() => waitForFirebase(callback), 200);
        }
    }

    // ── Get today's date string in IST (YYYY-MM-DD) ──
    function getTodayIST() {
        return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    }

    // ── Identify which page we are on ──
    function getPageKey() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('vooopricing')) return 'pricing';
        if (path.includes('vooo-ai') || path === '/vooo-ai' || path === '/vooo-ai/') return 'main';
        return null; // not a tracked page
    }

    // ── Main tracking logic ──
    function initTracker() {
        const pageKey = getPageKey();
        if (!pageKey) return; // not a tracked page — do nothing

        const db      = firebase.firestore();
        const today   = getTodayIST();
        const docRef  = db.collection('vooo_analytics').doc(today);

        let tracked   = false; // prevent double-counting
        let startTime = Date.now();

        // ── Count view after 5 seconds on page ──
        setTimeout(() => {
            if (tracked) return;
            tracked = true;

            // Use Firestore atomic increment — safe for concurrent users
            const updateData = {
                date: today
            };

            if (pageKey === 'main') {
                updateData['views_main']    = firebase.firestore.FieldValue.increment(1);
            } else if (pageKey === 'pricing') {
                updateData['views_pricing'] = firebase.firestore.FieldValue.increment(1);
            }

            docRef.set(updateData, { merge: true })
                .then(() => console.log('✅ Vooo Tracker: page view counted (' + pageKey + ')'))
                .catch(err => console.warn('⚠️ Vooo Tracker: write failed', err));

        }, 5000); // 5 second minimum

    }

    // ── PWA Install Tracking ──
    function initPWATracking() {
        window.addEventListener('appinstalled', () => {
            const db     = firebase.firestore();
            const today  = getTodayIST();
            const docRef = db.collection('vooo_analytics').doc(today);

            docRef.set({
                date:          today,
                pwa_installs:  firebase.firestore.FieldValue.increment(1)
            }, { merge: true })
                .then(() => console.log('✅ Vooo Tracker: PWA install counted'))
                .catch(err => console.warn('⚠️ Vooo Tracker: PWA install write failed', err));
        });
    }

    // ── Start everything ──
    waitForFirebase(() => {
        initTracker();
        initPWATracking();
    });

    console.log('✅ Vooo Page Tracker loaded');

})();
