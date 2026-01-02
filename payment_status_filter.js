/**
 * Payment Status Filter System
 * Only allows users with "successful" or "cancelled" payment status to be fetched into user.html
 * Saves eligible user data to permanent storage independent of admin.html
 */

const PaymentStatusFilter = {
    // Allowed payment statuses
    ALLOWED_STATUSES: ['successful', 'cancelled'],
    
    // Permanent storage key
    PERMANENT_STORAGE_KEY: 'odelya_permanent_user_data',
    
    // Encryption key (same as your existing one)
    ENCRYPTION_KEY: 'odelya-secure-admin-key-2024!@#$',
    
    /**
     * Initialize the filter system
     */
    init() {
        this.ensurePermanentStorage();
        console.log('Payment Status Filter initialized');
    },
    
    /**
     * Ensure permanent storage exists
     */
    ensurePermanentStorage() {
        if (!localStorage.getItem(this.PERMANENT_STORAGE_KEY)) {
            localStorage.setItem(this.PERMANENT_STORAGE_KEY, JSON.stringify({}));
        }
    },
    
    /**
     * Decrypt data (same as your existing function)
     */
    decryptData(encryptedData) {
        try {
            const decoded = atob(encryptedData);
            let decrypted = '';
            for (let i = 0; i < decoded.length; i++) {
                const charCode = decoded.charCodeAt(i) ^ this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length);
                decrypted += String.fromCharCode(charCode);
            }
            return decrypted;
        } catch (error) {
            console.error('Decryption error:', error);
            return encryptedData;
        }
    },
    
    /**
     * Extract payment status from user data
     * Looks for payment status in multiple possible locations
     */
    extractPaymentStatus(userData) {
        // Priority 1: Check direct payment status fields
        const paymentFields = [
            'paymentStatus', 'payment_status', 'status', 
            'payment', 'paymentState', 'transactionStatus'
        ];
        
        for (const field of paymentFields) {
            if (userData[field]) {
                const status = String(userData[field]).toLowerCase().trim();
                if (status.includes('success')) return 'successful';
                if (status.includes('cancel')) return 'cancelled';
                return status;
            }
        }
        
        // Priority 2: Check encrypted data
        if (userData.encryptedData) {
            try {
                const decrypted = JSON.parse(this.decryptData(userData.encryptedData));
                
                // Check payment fields in decrypted data
                for (const field of paymentFields) {
                    if (decrypted[field]) {
                        const status = String(decrypted[field]).toLowerCase().trim();
                        if (status.includes('success')) return 'successful';
                        if (status.includes('cancel')) return 'cancelled';
                        return status;
                    }
                }
                
                // Check transaction section
                if (decrypted.transaction && decrypted.transaction.status) {
                    const status = String(decrypted.transaction.status).toLowerCase().trim();
                    if (status.includes('success')) return 'successful';
                    if (status.includes('cancel')) return 'cancelled';
                    return status;
                }
            } catch (e) {
                console.error('Error decrypting payment status:', e);
            }
        }
        
        // Priority 3: Check amount field (if amount exists, assume payment was made)
        if (userData.amount || userData.paymentAmount || userData.amountPaid) {
            return 'successful'; // Assume successful if amount is recorded
        }
        
        return null;
    },
    
    /**
     * Check if user is eligible based on payment status
     */
    isUserEligible(userData) {
        const paymentStatus = this.extractPaymentStatus(userData);
        
        if (!paymentStatus) {
            console.log('User rejected: No payment status found');
            return false;
        }
        
        const isEligible = this.ALLOWED_STATUSES.includes(paymentStatus);
        
        if (!isEligible) {
            console.log(`User rejected: Payment status "${paymentStatus}" not in allowed list`);
        }
        
        return isEligible;
    },
    
    /**
     * Save eligible user to permanent storage
     */
    saveToPermanentStorage(userId, userData) {
        try {
            const storage = JSON.parse(localStorage.getItem(this.PERMANENT_STORAGE_KEY)) || {};
        const paymentStatus = this.extractPaymentStatus(userData);
        
        // Extract essential user data
        const userToSave = {
            // Basic info
            userId: userId,
            email: this.extractEmail(userData),
            fullName: userData.fullName || '',
            phone: this.extractPhone(userData),
            
            // Plan info
            planName: userData.serviceType || '',
            planGB: userData.planGB || '',
            planDuration: userData.duration || '',
            amountPaid: userData.amount || 0,
            
            // Payment info
            paymentStatus: paymentStatus,
            lastFetched: new Date().toISOString(),
            savedAt: new Date().toISOString(),
            
            // Original data backup (encrypted)
            originalData: userData.encryptedData || '',
            
            // Metadata
            isPermanent: true,
            source: 'payment_status_filter'
        };
        
        // Save to storage
        storage[userId] = userToSave;
        localStorage.setItem(this.PERMANENT_STORAGE_KEY, JSON.stringify(storage));
        
        console.log(`User ${userId} saved to permanent storage with status: ${paymentStatus}`);
        return true;
        } catch (error) {
            console.error('Error saving to permanent storage:', error);
            return false;
        }
    },
    
    /**
     * Get user from permanent storage
     */
    getFromPermanentStorage(userId) {
        try {
            const storage = JSON.parse(localStorage.getItem(this.PERMANENT_STORAGE_KEY)) || {};
            return storage[userId] || null;
        } catch (error) {
            console.error('Error getting from permanent storage:', error);
            return null;
        }
    },
    
    /**
     * Extract email from user data
     */
    extractEmail(userData) {
        try {
            if (userData.encryptedData) {
                const decrypted = JSON.parse(this.decryptData(userData.encryptedData));
                return decrypted.personalInfo?.email || decrypted.email || '';
            }
        } catch (e) {
            console.error('Error extracting email:', e);
        }
        return userData.email || '';
    },
    
    /**
     * Extract phone from user data
     */
    extractPhone(userData) {
        try {
            if (userData.encryptedData) {
                const decrypted = JSON.parse(this.decryptData(userData.encryptedData));
                return decrypted.personalInfo?.phone || decrypted.phone || '';
            }
        } catch (e) {
            console.error('Error extracting phone:', e);
        }
        return userData.phone || '';
    },
    
    /**
     * Filter and process user data
     * Returns user data ONLY if payment status is successful/cancelled
     */
    filterUserData(userId, userData) {
        // Step 1: Check if user is already in permanent storage
        const permanentData = this.getFromPermanentStorage(userId);
        if (permanentData) {
            console.log(`User ${userId} found in permanent storage`);
            return permanentData;
        }
        
        // Step 2: Check payment status eligibility
        if (!this.isUserEligible(userData)) {
            console.log(`User ${userId} not eligible - payment status not successful/cancelled`);
            return null;
        }
        
        // Step 3: Save to permanent storage
        this.saveToPermanentStorage(userId, userData);
        
        // Step 4: Return the filtered data
        return this.getFromPermanentStorage(userId);
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    PaymentStatusFilter.init();
});

// Make available globally
window.PaymentStatusFilter = PaymentStatusFilter;
