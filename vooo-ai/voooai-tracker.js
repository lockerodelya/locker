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

    // Wait for Firebase to be ready
    function initDeviceTracker() {
        if (!firebase || !firebase.auth() || !firebase.firestore()) {
            setTimeout(initDeviceTracker, 100);
            return;
        }

        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) return; // User not logged in, do nothing

            try {
                const uid = user.uid;
                const fingerprint = await generateFingerprint();
                const deviceRef = firebase.firestore().collection(DEVICE_CONFIG.COLLECTION_NAME).doc(uid);
                
                // Use transaction to prevent race conditions
                await firebase.firestore().runTransaction(async (transaction) => {
                    const deviceDoc = await transaction.get(deviceRef);
                    
                    if (!deviceDoc.exists) {
                        // First time this user anywhere
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
                        // New device detected
                        const newCount = currentCount + 1;
                        
                        transaction.update(deviceRef, {
                            count: newCount,
                            lastFingerprint: fingerprint,
                            lastActive: firebase.firestore.FieldValue.serverTimestamp()
                        });

                        // Check if this new device exceeds limit
                        if (newCount > DEVICE_CONFIG.MAX_DEVICES_ALLOWED) {
                            // Start logout timer
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
                        // Same device, just update timestamp
                        transaction.update(deviceRef, {
                            lastActive: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                });

            } catch (error) {
                console.error('Device tracker error:', error);
                // Fail silently - don't block user
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
        
        // Create a simple hash
        const fingerprint = components.join('|');
        
        // Return as base64 to keep it clean
        try {
            return btoa(encodeURIComponent(fingerprint)).substring(0, 50);
        } catch (e) {
            // Fallback if btoa fails
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
