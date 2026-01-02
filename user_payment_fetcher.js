/**
 * Payment Status-Based User Data Fetcher
 * Only fetches user data when payment status is "successful" or "cancelled"
 * Saves data permanently to user_log storage independent of admin.html
 */

class PaymentBasedUserFetcher {
    constructor() {
        this.USER_LOG_STORAGE_KEY = 'odelya_user_log_permanent';
        this.PAYMENT_STATUS_FILTER = ['successful', 'cancelled'];
        this.init();
    }

    init() {
        console.log('Payment-Based User Fetcher initialized');
        this.ensureLogStorage();
    }

    /**
     * Ensures user log storage exists
     */
    ensureLogStorage() {
        if (!localStorage.getItem(this.USER_LOG_STORAGE_KEY)) {
            localStorage.setItem(this.USER_LOG_STORAGE_KEY, JSON.stringify([]));
        }
    }

    /**
     * Checks if payment status is valid for fetching
     */
    isValidPaymentStatus(status) {
        return this.PAYMENT_STATUS_FILTER.includes(status?.toLowerCase());
    }

    /**
     * Extracts payment status from user data
     */
    getPaymentStatus(userData) {
        // Check various possible locations for payment status
        const possibleKeys = [
            'paymentStatus', 'payment_status', 'status', 
            'payment', 'paymentStatus', 'transactionStatus'
        ];
        
        for (const key of possibleKeys) {
            if (userData[key]) {
                const status = String(userData[key]).toLowerCase();
                if (status.includes('success') || status.includes('cancel')) {
                    return status.includes('success') ? 'successful' : 'cancelled';
                }
                return status;
            }
        }
        
        // Check encrypted data
        if (userData.encryptedData) {
            try {
                const decrypted = JSON.parse(decryptData(userData.encryptedData));
                for (const key of possibleKeys) {
                    if (decrypted[key]) {
                        const status = String(decrypted[key]).toLowerCase();
                        if (status.includes('success') || status.includes('cancel')) {
                            return status.includes('success') ? 'successful' : 'cancelled';
                        }
                        return status;
                    }
                }
            } catch (e) {
                console.error('Error decrypting payment status:', e);
            }
        }
        
        return null;
    }

    /**
     * Fetches user data only if payment status is successful or cancelled
     */
    fetchUserDataByPaymentStatus(userId, userData) {
        const paymentStatus = this.getPaymentStatus(userData);
        
        if (!paymentStatus || !this.isValidPaymentStatus(paymentStatus)) {
            console.log(`Skipping user ${userId}: Payment status "${paymentStatus}" not in allowed list`);
            return null;
        }

        console.log(`Fetching user ${userId}: Payment status "${paymentStatus}" is valid`);
        
        // Extract and prepare user data for permanent storage
        const userDataForStorage = this.prepareUserDataForStorage(userId, userData, paymentStatus);
        
        // Save to permanent storage
        this.saveToUserLog(userDataForStorage);
        
        return userDataForStorage;
    }

    /**
     * Prepares user data for permanent storage
     */
    prepareUserDataForStorage(userId, userData, paymentStatus) {
        const timestamp = new Date().toISOString();
        const storageId = `user_log_${userId}_${Date.now()}`;
        
        // Extract essential information
        const extractedData = {
            storageId: storageId,
            userId: userId,
            originalId: userData.userId || userData.id || '',
            email: this.extractEmail(userData),
            fullName: userData.fullName || userData.name || '',
            phone: this.extractPhone(userData),
            planName: userData.serviceType || userData.planName || '',
            planGB: userData.planGB || '',
            planDuration: userData.duration || userData.planDuration || '',
            amountPaid: userData.amount || userData.amountPaid || 0,
            paymentStatus: paymentStatus,
            paymentDate: userData.paymentDate || userData.transactionDate || timestamp,
            fetchedAt: timestamp,
            source: 'payment_filtered_fetch',
            isPermanent: true,
            metadata: {
                originalDataExists: true,
                fetchCriteria: 'payment_status_successful_or_cancelled',
                fetchTimestamp: timestamp
            }
        };

        // Add encrypted data if available (for backup)
        if (userData.encryptedData) {
            extractedData.encryptedDataBackup = userData.encryptedData;
        }

        return extractedData;
    }

    /**
     * Extracts email from user data
     */
    extractEmail(userData) {
        try {
            if (userData.encryptedData) {
                const decrypted = JSON.parse(decryptData(userData.encryptedData));
                return decrypted.personalInfo?.email || decrypted.email || '';
            }
        } catch (e) {
            console.error('Error extracting email:', e);
        }
        
        return userData.email || '';
    }

    /**
     * Extracts phone from user data
     */
    extractPhone(userData) {
        try {
            if (userData.encryptedData) {
                const decrypted = JSON.parse(decryptData(userData.encryptedData));
                return decrypted.personalInfo?.phone || decrypted.phone || '';
            }
        } catch (e) {
            console.error('Error extracting phone:', e);
        }
        
        return userData.phone || '';
    }

    /**
     * Saves user data to permanent user log
     */
    saveToUserLog(userData) {
        try {
            const log = JSON.parse(localStorage.getItem(this.USER_LOG_STORAGE_KEY)) || [];
            
            // Check if this user already exists in log
            const existingIndex = log.findIndex(item => 
                item.userId === userData.userId && 
                item.paymentStatus === userData.paymentStatus &&
                Math.abs(new Date(item.paymentDate) - new Date(userData.paymentDate)) < 86400000 // Same day
            );
            
            if (existingIndex === -1) {
                // Add new entry
                log.push(userData);
                
                // Limit log size (keep last 1000 entries)
                if (log.length > 1000) {
                    log.splice(0, log.length - 1000);
                }
                
                localStorage.setItem(this.USER_LOG_STORAGE_KEY, JSON.stringify(log));
                console.log(`User ${userData.userId} saved to permanent log with payment status: ${userData.paymentStatus}`);
                return true;
            } else {
                // Update existing entry
                log[existingIndex] = {
                    ...log[existingIndex],
                    ...userData,
                    updatedAt: new Date().toISOString(),
                    updateCount: (log[existingIndex].updateCount || 0) + 1
                };
                
                localStorage.setItem(this.USER_LOG_STORAGE_KEY, JSON.stringify(log));
                console.log(`User ${userData.userId} updated in permanent log`);
                return true;
            }
        } catch (error) {
            console.error('Error saving to user log:', error);
            return false;
        }
    }

    /**
     * Retrieves user data from permanent log by userId
     */
    getUserFromLog(userId) {
        try {
            const log = JSON.parse(localStorage.getItem(this.USER_LOG_STORAGE_KEY)) || [];
            const userEntries = log.filter(item => item.userId === userId);
            
            // Return most recent entry
            if (userEntries.length > 0) {
                return userEntries.sort((a, b) => 
                    new Date(b.fetchedAt) - new Date(a.fetchedAt)
                )[0];
            }
            
            return null;
        } catch (error) {
            console.error('Error retrieving from user log:', error);
            return null;
        }
    }

    /**
     * Gets all users from log with specific payment status
     */
    getUsersByPaymentStatus(status) {
        try {
            const log = JSON.parse(localStorage.getItem(this.USER_LOG_STORAGE_KEY)) || [];
            return log.filter(item => item.paymentStatus === status);
        } catch (error) {
            console.error('Error filtering by payment status:', error);
            return [];
        }
    }

    /**
     * Checks if user exists in log (permanent storage)
     */
    isUserInLog(userId) {
        const user = this.getUserFromLog(userId);
        return user !== null;
    }

    /**
     * Deletes a user from admin storage but keeps in log
     * (This simulates the requirement that data persists even if deleted from admin)
     */
    deleteFromAdminButKeepInLog(userId) {
        // This function would be called when admin deletes user data
        // For now, we just ensure the user remains in log
        console.log(`User ${userId} deleted from admin but preserved in permanent log`);
        return true;
    }

    /**
     * Scans all admin users and fetches those with valid payment status
     */
    scanAndFetchAllEligibleUsers() {
        const eligibleUsers = [];
        
        try {
            // Scan localStorage for user data
            const keys = Object.keys(localStorage);
            
            for (const key of keys) {
                if (key.startsWith('user_')) {
                    try {
                        const userData = JSON.parse(localStorage.getItem(key));
                        const userId = userData.userId || key.replace('user_', '');
                        const paymentStatus = this.getPaymentStatus(userData);
                        
                        if (this.isValidPaymentStatus(paymentStatus)) {
                            const fetchedData = this.fetchUserDataByPaymentStatus(userId, userData);
                            if (fetchedData) {
                                eligibleUsers.push(fetchedData);
                            }
                        }
                    } catch (parseError) {
                        console.error(`Error parsing user data from key ${key}:`, parseError);
                    }
                }
            }
            
            console.log(`Scanned and fetched ${eligibleUsers.length} eligible users`);
            return eligibleUsers;
        } catch (error) {
            console.error('Error scanning users:', error);
            return [];
        }
    }

    /**
     * Gets statistics about the user log
     */
    getLogStatistics() {
        try {
            const log = JSON.parse(localStorage.getItem(this.USER_LOG_STORAGE_KEY)) || [];
            
            const stats = {
                totalEntries: log.length,
                byPaymentStatus: {},
                byDate: {},
                uniqueUsers: new Set(log.map(item => item.userId)).size
            };
            
            // Count by payment status
            log.forEach(item => {
                const status = item.paymentStatus || 'unknown';
                stats.byPaymentStatus[status] = (stats.byPaymentStatus[status] || 0) + 1;
                
                // Count by date
                const date = item.fetchedAt ? item.fetchedAt.substring(0, 10) : 'unknown';
                stats.byDate[date] = (stats.byDate[date] || 0) + 1;
            });
            
            return stats;
        } catch (error) {
            console.error('Error getting log statistics:', error);
            return null;
        }
    }
}

// Decryption function (same as in your original code)
function decryptData(encryptedData) {
    const ENCRYPTION_KEY = 'odelya-secure-admin-key-2024!@#$';
    try {
        const decoded = atob(encryptedData);
        let decrypted = '';
        for (let i = 0; i < decoded.length; i++) {
            const charCode = decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
            decrypted += String.fromCharCode(charCode);
        }
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return encryptedData;
    }
}

// Initialize the fetcher
const paymentUserFetcher = new PaymentBasedUserFetcher();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.PaymentBasedUserFetcher = paymentUserFetcher;
}

// Auto-scan on page load (optional)
document.addEventListener('DOMContentLoaded', function() {
    // You can enable this to automatically scan on page load
    // paymentUserFetcher.scanAndFetchAllEligibleUsers();
    
    // Display log statistics in console
    const stats = paymentUserFetcher.getLogStatistics();
    if (stats) {
        console.log('User Log Statistics:', stats);
    }
});
