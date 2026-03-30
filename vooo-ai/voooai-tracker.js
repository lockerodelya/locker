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
                        // First time login — register this device
                        transaction.set(deviceRef, {
                            registeredDevice: fingerprint,
                            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        return;
                    }

                    const data = deviceDoc.data();
                    const registeredDevice = data.registeredDevice || '';

                    if (registeredDevice === '') {
                        // No device registered yet — register this one
                        transaction.update(deviceRef, {
                            registeredDevice: fingerprint,
                            lastActive: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        return;
                    }

                    if (registeredDevice === fingerprint) {
                        // Same device — allow, update last active
                        transaction.update(deviceRef, {
                            lastActive: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        return;
                    }

                    // Different device — block and logout
                    setTimeout(() => {
                        firebase.auth().signOut().then(() => {
                            alert('⚠️ This account is already active on another device.\n\nThis username can only be used on one device.\n\nPlease logout from your other device first.');
                            window.location.href = '/vooo-ai/vooologin.html';
                        }).catch(() => {
                            window.location.href = '/vooo-ai/vooologin.html';
                        });
                    }, DEVICE_CONFIG.LOGOUT_TIMER_SECONDS * 1000);
                });

            } catch (error) {
                console.error('Device tracker error:', error);
            }
        });
    }

// Generate permanent device ID stored in localStorage
    async function generateFingerprint() {
        const storageKey = 'vooo_device_id';
        let deviceId = localStorage.getItem(storageKey);
        if (!deviceId) {
            deviceId = 'dev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem(storageKey, deviceId);
        }
        return deviceId;
    }

// Only run tracker on main MCQ page — not on dashboard or payment pages
    const currentPath = window.location.pathname;
    const skipPages   = ['/vooo-ai/vooodashboard', '/vooo-ai/vooonusrpy', '/vooo-ai/voooexusrpy', '/vooo-ai/vooologin', '/vooo-ai/vooosignup'];
    const shouldSkip  = skipPages.some(p => currentPath.includes(p));
    if (!shouldSkip) {
        initDeviceTracker();
    }
})();
