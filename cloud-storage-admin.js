// ====== ADMIN FUNCTIONALITY FOR CLOUD-STORAGE.HTML ======

// ====== CONFIGURATION ======
const ADMIN_CONFIG = {
    isVisible: false,
    localStorageKey: 'odelya_admin_visible',
    sessionKey: 'admin_logged_in'
};

// ====== CREATE ADMIN LINK ======
function createAdminLink() {
    // Remove if already exists
    const existingLink = document.getElementById('adminFloatingLink');
    if (existingLink) {
        existingLink.remove();
    }
    
    // Create new admin link container
    const adminContainer = document.createElement('div');
    adminContainer.id = 'adminFloatingLink';
    adminContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 10000;';
    
    // Create admin link button (HIDDEN by default)
    const adminLink = document.createElement('a');
    adminLink.id = 'adminLinkBtn';
    adminLink.href = 'price-admin.html';
    adminLink.innerHTML = '<i class="fas fa-cog"></i> Admin';
    adminLink.style.cssText = `
        background: #1a237e;
        color: white;
        padding: 12px 20px;
        border-radius: 50px;
        text-decoration: none;
        font-size: 0.9rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: none; /* HIDDEN BY DEFAULT */
        transition: all 0.3s ease;
    `;
    
    // Add hover effect
    adminLink.addEventListener('mouseenter', () => {
        adminLink.style.transform = 'translateY(-2px)';
        adminLink.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    adminLink.addEventListener('mouseleave', () => {
        adminLink.style.transform = 'translateY(0)';
        adminLink.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    // Add to container
    adminContainer.appendChild(adminLink);
    document.body.appendChild(adminContainer);
    
    return adminLink;
}

// ====== LOAD PRICE CONFIGURATION ======
function loadPriceConfig() {
    try {
        const savedConfig = localStorage.getItem('odelyaPriceConfig');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            
            // Update global pricingConfig
            if (typeof pricingConfig !== 'undefined') {
                pricingConfig.dataRate = config.dataRate || 1.5;
                pricingConfig.gstRate = config.gstRate || 18;
                pricingConfig.specialDiscount = config.specialDiscount || 0;
                
                console.log(`✅ Loaded price config: ${config.dataRate}/GB, GST: ${config.gstRate}%, Discount: ${config.specialDiscount}%`);
            }
            
            return config;
        }
    } catch (error) {
        console.error('❌ Error loading price config:', error);
    }
    
    return {
        dataRate: 1.5,
        gstRate: 18,
        specialDiscount: 0
    };
}

// ====== CHECK AND SET VISIBILITY ======
function updateAdminVisibility() {
    const adminLink = document.getElementById('adminLinkBtn');
    if (!adminLink) return;
    
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const urlAdminParam = urlParams.get('admin');
    
    // Check localStorage
    const storedVisible = localStorage.getItem(ADMIN_CONFIG.localStorageKey);
    
    // Check session
    const sessionActive = sessionStorage.getItem(ADMIN_CONFIG.sessionKey);
    
    // Determine visibility
    let shouldBeVisible = false;
    
    // Priority 1: URL parameter
    if (urlAdminParam === 'true') {
        shouldBeVisible = true;
        localStorage.setItem(ADMIN_CONFIG.localStorageKey, 'true');
    } else if (urlAdminParam === 'false') {
        shouldBeVisible = false;
        localStorage.removeItem(ADMIN_CONFIG.localStorageKey);
    }
    // Priority 2: Local storage
    else if (storedVisible === 'true') {
        shouldBeVisible = true;
    }
    // Priority 3: Active session
    else if (sessionActive === 'true') {
        shouldBeVisible = true;
    }
    
    // Update visibility
    ADMIN_CONFIG.isVisible = shouldBeVisible;
    adminLink.style.display = shouldBeVisible ? 'block' : 'none';
    
    // Log for debugging (remove in production)
    console.log(`🔧 Admin link: ${shouldBeVisible ? 'VISIBLE' : 'HIDDEN'}`, {
        urlParam: urlAdminParam,
        stored: storedVisible,
        session: sessionActive
    });
}

// ====== KEYBOARD SHORTCUT ======
function setupKeyboardShortcut() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + Alt + A to toggle
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            
            const adminLink = document.getElementById('adminLinkBtn');
            if (!adminLink) return;
            
            const isCurrentlyVisible = adminLink.style.display === 'block';
            const newVisibility = !isCurrentlyVisible;
            
            // Update display
            adminLink.style.display = newVisibility ? 'block' : 'none';
            
            // Update storage
            if (newVisibility) {
                localStorage.setItem(ADMIN_CONFIG.localStorageKey, 'true');
            } else {
                localStorage.removeItem(ADMIN_CONFIG.localStorageKey);
            }
            
            ADMIN_CONFIG.isVisible = newVisibility;
            
            // Show notification
            alert(`Admin link ${newVisibility ? 'shown' : 'hidden'}`);
            
            console.log(`🔧 Admin link toggled: ${newVisibility ? 'VISIBLE' : 'HIDDEN'}`);
        }
        
        // Ctrl + Alt + S to show status
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 's') {
            const adminLink = document.getElementById('adminLinkBtn');
            if (adminLink) {
                const status = adminLink.style.display === 'block' ? 'VISIBLE' : 'HIDDEN';
                alert(`Admin Status:\n\n• Link: ${status}\n• URL: ${window.location.href}\n• Storage: ${localStorage.getItem(ADMIN_CONFIG.localStorageKey) || 'not set'}`);
            }
        }
    });
}

// ====== SHOW UPDATE NOTIFICATION ======
function showUpdateNotification() {
    const savedConfig = localStorage.getItem('odelyaPriceConfig');
    if (!savedConfig) return;
    
    try {
        const config = JSON.parse(savedConfig);
        if (!config.lastUpdated) return;
        
        const lastUpdated = new Date(config.lastUpdated);
        const now = new Date();
        const minutesSinceUpdate = (now - lastUpdated) / (1000 * 60);
        
        // Show notification if updated in last 2 minutes
        if (minutesSinceUpdate < 2) {
            // Remove existing notification
            const existingNotif = document.getElementById('priceUpdateNotification');
            if (existingNotif) existingNotif.remove();
            
            // Create new notification
            const notification = document.createElement('div');
            notification.id = 'priceUpdateNotification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 10001;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
            `;
            
            notification.innerHTML = `
                <i class="fas fa-sync-alt"></i>
                <span>Prices updated successfully!</span>
                <button onclick="this.parentElement.remove()" 
                        style="background: transparent; border: none; color: white; 
                               margin-left: 15px; cursor: pointer; font-size: 1.1rem;">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            document.body.appendChild(notification);
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Auto-remove after 8 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.style.animation = 'slideOut 0.3s ease forwards';
                    setTimeout(() => notification.remove(), 300);
                }
            }, 8000);
        }
    } catch (error) {
        console.error('Error showing update notification:', error);
    }
}

// ====== MONITOR STORAGE CHANGES ======
function setupStorageMonitor() {
    window.addEventListener('storage', function(e) {
        if (e.key === 'odelyaPriceConfig') {
            console.log('🔄 Price configuration updated from another tab');
            
            // Reload price config
            loadPriceConfig();
            
            // Re-render pricing table if function exists
            if (typeof renderPricingTable === 'function') {
                renderPricingTable();
            }
            
            // Show update notification
            showUpdateNotification();
        }
        
        if (e.key === ADMIN_CONFIG.localStorageKey) {
            console.log('🔄 Admin visibility changed from another tab');
            updateAdminVisibility();
        }
    });
}

// ====== INITIALIZE ADMIN SYSTEM ======
function initializeAdminSystem() {
    console.log('🚀 Initializing admin system...');
    
    // 1. Create admin link (hidden by default)
    createAdminLink();
    
    // 2. Load price configuration
    loadPriceConfig();
    
    // 3. Set initial visibility
    updateAdminVisibility();
    
    // 4. Setup keyboard shortcuts
    setupKeyboardShortcut();
    
    // 5. Monitor storage changes
    setupStorageMonitor();
    
    // 6. Check for recent updates
    setTimeout(showUpdateNotification, 1000);
    
    console.log('✅ Admin system initialized');
    
    // Export visibility function
    window.toggleAdminLink = function() {
        const adminLink = document.getElementById('adminLinkBtn');
        if (!adminLink) return;
        
        const newVisibility = adminLink.style.display !== 'block';
        adminLink.style.display = newVisibility ? 'block' : 'none';
        
        if (newVisibility) {
            localStorage.setItem(ADMIN_CONFIG.localStorageKey, 'true');
        } else {
            localStorage.removeItem(ADMIN_CONFIG.localStorageKey);
        }
        
        ADMIN_CONFIG.isVisible = newVisibility;
        alert(`Admin link ${newVisibility ? 'shown' : 'hidden'}`);
    };
}

// ====== AUTO-INITIALIZE ======
// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdminSystem);
} else {
    initializeAdminSystem();
}

// ====== EXPORT FOR MODULE SYSTEMS ======
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createAdminLink,
        loadPriceConfig,
        updateAdminVisibility,
        initializeAdminSystem,
        toggleAdminLink: window.toggleAdminLink
    };
}
