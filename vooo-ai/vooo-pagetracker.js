// ============================================
// VOOO AI PAGE TRACKER
// Tracks: page views (5 sec minimum), PWA installs, visitor country
// Collection: vooo_analytics (independent — delete anytime)
// Version: 1.3
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
    function getPageKey() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/vooo-ai/blog/voooblog'))    return 'blog_home';
        if (path.includes('/vooo-ai/blog/vooo-'))        return 'blog_total';
        if (path.includes('vooopricing'))                return 'pricing';
        if (path === '/vooo-ai' || path === '/vooo-ai/') return 'main';
        return null;
    }

    // Get visitor country using free IP geolocation API
    // Only country name is fetched — IP address is never stored
    function getCountry(callback) {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const country = data.country_name || 'Unknown';
                callback(country);
            })
            .catch(() => {
                // If API fails — use Unknown — never break the tracker
                callback('Unknown');
            });
    }

    // Main tracking logic
    function initTracker() {
        const pageKey = getPageKey();
        if (!pageKey) return;

        const db     = firebase.firestore();
        const today  = getTodayIST();
        const docRef = db.collection('vooo_analytics').doc(today);
        let tracked  = false;

        setTimeout(() => {
            if (tracked) return;
            tracked = true;

            // Get country first — then save everything together
            getCountry(function(country) {

                const updateData = { date: today };

                // Page view count — same as before
                if (pageKey === 'main') {
                    updateData['views_main'] = firebase.firestore.FieldValue.increment(1);
                    updateData['countries_main.' + country] = firebase.firestore.FieldValue.increment(1);
                } else if (pageKey === 'pricing') {
                    updateData['views_pricing'] = firebase.firestore.FieldValue.increment(1);
                    updateData['countries_pricing.' + country] = firebase.firestore.FieldValue.increment(1);
                } else if (pageKey === 'blog_home') {
                    updateData['views_blog_home'] = firebase.firestore.FieldValue.increment(1);
                    updateData['countries_blog_home.' + country] = firebase.firestore.FieldValue.increment(1);
                } else if (pageKey === 'blog_total') {
                    updateData['views_blog_total'] = firebase.firestore.FieldValue.increment(1);
                    updateData['countries_blog_total.' + country] = firebase.firestore.FieldValue.increment(1);
                }

                docRef.set(updateData, { merge: true })
                    .then(() => console.log('Vooo Tracker: page view counted (' + pageKey + ') from ' + country))
                    .catch(err => console.warn('Vooo Tracker: write failed', err));

            });

        }, 5000);
    }

    // PWA Install Tracking — with country
    function initPWATracking() {
        window.addEventListener('appinstalled', () => {
            const db     = firebase.firestore();
            const today  = getTodayIST();
            const docRef = db.collection('vooo_analytics').doc(today);

            getCountry(function(country) {
                docRef.set({
                    date:         today,
                    pwa_installs: firebase.firestore.FieldValue.increment(1),
                    ['countries_pwa.' + country]: firebase.firestore.FieldValue.increment(1)
                }, { merge: true })
                    .then(() => console.log('Vooo Tracker: PWA install counted from ' + country))
                    .catch(err => console.warn('Vooo Tracker: PWA install write failed', err));
            });
        });
    }

    waitForFirebase(() => {
        initTracker();
        initPWATracking();
    });

    console.log('Vooo Page Tracker v1.3 loaded');

})();
