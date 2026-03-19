// ============================================
// VOOO AI PAGE TRACKER
// Tracks: page views (5 sec minimum), PWA installs
// Collection: vooo_analytics (independent — delete anytime)
// Version: 1.2
// ============================================
// HOW TO USE:
//   Add this ONE line to any page you want to track:
//   <script src="/vooo-ai/vooo-pagetracker.js"></script>
//   Remove it anytime — zero effect on your website.
// ============================================
(function () {
    // Wait for Firebase to be ready
    function waitForFirebase(callback) {
        if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
            callback();
        } else {
            setTimeout(() => waitForFirebase(callback), 200);
        }
    }
    // Get today's date string in IST (YYYY-MM-DD)
    function getTodayIST() {
        return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    }
    // Identify which page we are on
    // IMPORTANT: most specific checks must come first
    // All blog pages contain 'vooo-ai' so 'main' check must be last
    function getPageKey() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/vooo-ai/blog/voooblog'))     return 'blog_home';
        if (path.includes('/vooo-ai/blog/vooo-'))         return 'blog_total';
        if (path.includes('vooopricing'))                 return 'pricing';
        if (path === '/vooo-ai' || path === '/vooo-ai/')  return 'main';
        return null;
    }
    // Main tracking logic
    function initTracker() {
        const pageKey = getPageKey();
        if (!pageKey) return;
        const db      = firebase.firestore();
        const today   = getTodayIST();
        const docRef  = db.collection('vooo_analytics').doc(today);
        let tracked   = false;
        setTimeout(() => {
            if (tracked) return;
            tracked = true;
            const updateData = { date: today };
            if (pageKey === 'main') {
                updateData['views_main']       = firebase.firestore.FieldValue.increment(1);
            } else if (pageKey === 'pricing') {
                updateData['views_pricing']    = firebase.firestore.FieldValue.increment(1);
            } else if (pageKey === 'blog_home') {
                updateData['views_blog_home']  = firebase.firestore.FieldValue.increment(1);
            } else if (pageKey === 'blog_total') {
                updateData['views_blog_total'] = firebase.firestore.FieldValue.increment(1);
            }
            docRef.set(updateData, { merge: true })
                .then(() => console.log('Vooo Tracker: page view counted (' + pageKey + ')'))
                .catch(err => console.warn('Vooo Tracker: write failed', err));
        }, 5000);
    }
    // PWA Install Tracking
    function initPWATracking() {
        window.addEventListener('appinstalled', () => {
            const db     = firebase.firestore();
            const today  = getTodayIST();
            const docRef = db.collection('vooo_analytics').doc(today);
            docRef.set({
                date:         today,
                pwa_installs: firebase.firestore.FieldValue.increment(1)
            }, { merge: true })
                .then(() => console.log('Vooo Tracker: PWA install counted'))
                .catch(err => console.warn('Vooo Tracker: PWA install write failed', err));
        });
    }
    waitForFirebase(() => {
        initTracker();
        initPWATracking();
    });
    console.log('Vooo Page Tracker v1.2 loaded');
})();
