// ============================================
// VOOO AI PAGE TRACKER
// Tracks: page views (5 sec minimum), PWA installs, visitor country
// Collection: vooo_analytics (independent — delete anytime)
// Version: 1.4
// ============================================
(function () {

    // Wait for Firebase app to be ready
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
    function getPageKey() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/vooo-ai/blog/voooblog'))    return 'blog_home';
        if (path.includes('/vooo-ai/blog/vooo-'))        return 'blog_total';
        if (path.includes('vooopricing'))                return 'pricing';
        if (path === '/vooo-ai' || path === '/vooo-ai/') return 'main';
        return null;
    }

    // Get visitor country using free IP geolocation API
    function getCountry(callback) {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const country = data.country_name || 'Unknown';
                callback(country);
            })
            .catch(() => {
                callback('Unknown');
            });
    }

    // Get Firestore db — waits for voooDbReady if available, else loads directly
    async function getDb() {
        if (typeof voooDbReady !== 'undefined') {
            return await voooDbReady;
        }
        // Fallback for pages without voooDbReady
        let attempts = 0;
        while (typeof firebase.firestore !== 'function' && attempts < 50) {
            await new Promise(r => setTimeout(r, 100));
            attempts++;
        }
        if (typeof firebase.firestore !== 'function') {
            throw new Error('Firestore not available');
        }
        return firebase.firestore();
    }

    // Main tracking logic
    async function initTracker() {
        const pageKey = getPageKey();
        if (!pageKey) return;

        let db;
        try {
            db = await getDb();
        } catch (err) {
            console.warn('Vooo Tracker: Firestore not ready', err);
            return;
        }

        const today  = getTodayIST();
        const docRef = db.collection('vooo_analytics').doc(today);
        let tracked  = false;

        setTimeout(() => {
            if (tracked) return;
            tracked = true;

            getCountry(function(country) {

                const updateData = { date: today };

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

    // PWA Install Tracking
    async function initPWATracking() {
        window.addEventListener('appinstalled', async () => {
            let db;
            try {
                db = await getDb();
            } catch (err) {
                console.warn('Vooo Tracker: Firestore not ready for PWA tracking', err);
                return;
            }

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

    console.log('Vooo Page Tracker v1.4 loaded');

})();
