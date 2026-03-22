// ============================================
// VOOO AI DEVICE TRACKER
// Tracks multiple device logins and enforces single device policy
// Created: 2025
// ============================================

(function() {
    // ============================================
    // CONFIGURATION - YOU CAN EDIT THIS BLOCK
    // ============================================
    const DEVICE_CONFIG = {
        MAX_DEVICES_ALLOWED: 1,        // ⭐ Change this to 2 when you want to allow 2 devices
        LOGOUT_TIMER_SECONDS: 15,      // ⭐ Timer before logout when limit exceeded
        COLLECTION_NAME: 'device_tracking'  // ⭐ Firestore collection name
    };
    // ============================================
    // END OF CONFIGURATION - DO NOT EDIT BELOW
    // ============================================

    // Wait for Firebase + Firestore to be ready
    async function initDeviceTracker() {
        if (typeof firebase === 'undefined' || !firebase.apps || !firebase.apps.length) {
            setTimeout(initDeviceTracker, 100);
            return;
        }

        // Wait for voooDbReady promise (set in main page script)
        let db;
        if (typeof voooDbReady !== 'undefined') {
            db = await voooDbReady;
        } else {
            // Fallback — wait for firebase.firestore to exist
            let attempts = 0;
            while (typeof firebase.firestore !== 'function' && attempts < 50) {
                await new Promise(r => setTimeout(r, 100));
                attempts++;
            }
            if (typeof firebase.firestore !== 'function') {
                console.warn('Device tracker: Firestore not available');
                return;
            }
            db = firebase.firestore();
        }

        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) return;

            try {
                const uid = user.uid;
                const fingerprint = await generateFingerprint();
                const deviceRef = db.collection(DEVICE_CONFIG.COLLECTION_NAME).doc(uid);

                await db.runTransaction(async (transaction) => {
                    const deviceDoc = await transaction.get(deviceRef);

                    if (!deviceDoc.exists) {
                        transaction.set(deviceRef, {
                            count: 1,
                            lastFingerprint: fingerprint,
                            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        return;
                    }

                    const data = deviceDoc.data();
                    const currentCount = data.count || 0;
                    const lastFingerprint = data.lastFingerprint || '';

                    if (lastFingerprint !== fingerprint) {
                        const newCount = currentCount + 1;

                        transaction.update(deviceRef, {
                            count: newCount,
                            lastFingerprint: fingerprint,
                            lastActive: firebase.firestore.FieldValue.serverTimestamp()
                        });

                        if (newCount > DEVICE_CONFIG.MAX_DEVICES_ALLOWED) {
                            setTimeout(() => {
                                firebase.auth().signOut().then(() => {
                                    alert("Username only for one device only");
                                }).catch(() => {
                                    alert("Username only for one device only");
                                    window.location.reload();
                                });
                            }, DEVICE_CONFIG.LOGOUT_TIMER_SECONDS * 1000);
                        }
                    } else {
                        transaction.update(deviceRef, {
                            lastActive: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                });

            } catch (error) {
                console.error('Device tracker error:', error);
            }
        });
    }

    // Generate simple but effective fingerprint
    async function generateFingerprint() {
        const components = [
            navigator.userAgent,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            navigator.language,
            !!window.chrome,
            navigator.hardwareConcurrency || 'unknown'
        ];

        const fingerprint = components.join('|');

        try {
            return btoa(encodeURIComponent(fingerprint)).substring(0, 50);
        } catch (e) {
            let hash = 0;
            for (let i = 0; i < fingerprint.length; i++) {
                hash = ((hash << 5) - hash) + fingerprint.charCodeAt(i);
                hash |= 0;
            }
            return String(Math.abs(hash));
        }
    }

    // Start the tracker
    initDeviceTracker();
})();
