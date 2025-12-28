// ====== ADMIN FUNCTIONALITY FOR CLOUD-STORAGE.HTML ======

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
                
                console.log(`Loaded price config: ${config.dataRate}/GB, GST: ${config.gstRate}%, Discount: ${config.specialDiscount}%`);
            }
            
            return config;
        }
    } catch (error) {
        console.error('Error loading price config:', error);
    }
    
    return {
        dataRate: 1.5,
        gstRate: 18,
        specialDiscount: 0
    };
}

// ====== SHOW/HIDE ADMIN LINK ======
function setupAdminLink() {
    // Create admin link if it doesn't exist
    if (!document.getElementById('adminFloatingLink')) {
        const adminLink = document.createElement('div');
        adminLink.id = 'adminFloatingLink';
        adminLink.innerHTML = `
            <a href="price-admin.html" 
               style="position: fixed; bottom: 20px; right: 20px; background: #1a237e; 
                      color: white; padding: 12px 20px; border-radius: 50px; 
                      text-decoration: none; font-size: 0.9rem; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                      display: none; z-index: 10000;" 
               id="adminLinkBtn">
                <i class="fas fa-cog"></i> Admin
            </a>
        `;
        document.body.appendChild(adminLink);
    }
    
    // Check if admin link should be shown
    checkAdminAccess();
}

// ====== CHECK ADMIN ACCESS ======
function checkAdminAccess() {
    const adminLinkBtn = document.getElementById('adminLinkBtn');
    if (!adminLinkBtn) return;
    
    // Method 1: Check for special flag in localStorage
    if (localStorage.getItem('showAdminLink') === 'true') {
        adminLinkBtn.style.display = 'block';
        return;
    }
    
    // Method 2: Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('admin')) {
        const adminParam = urlParams.get('admin');
        
        if (adminParam === 'true') {
            adminLinkBtn.style.display = 'block';
            localStorage.setItem('showAdminLink', 'true');
        } else if (adminParam === 'false') {
            adminLinkBtn.style.display = 'none';
            localStorage.removeItem('showAdminLink');
        }
    }
    
    // Method 3: Check for admin session
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        adminLinkBtn.style.display = 'block';
    }
}

// ====== SHOW ADMIN NOTIFICATION ======
function showAdminNotification() {
    // Check if config was recently updated
    const savedConfig = localStorage.getItem('odelyaPriceConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        if (config.lastUpdated) {
            const lastUpdated = new Date(config.lastUpdated);
            const now = new Date();
            const hoursSinceUpdate = (now - lastUpdated) / (1000 * 60 * 60);
            
            // Show notification if updated in last 5 minutes
            if (hoursSinceUpdate < 0.083) { // 5 minutes
                const notification = document.createElement('div');
                notification.id = 'priceUpdateNotification';
                notification.innerHTML = `
                    <div style="position: fixed; top: 20px; right: 20px; background: #4caf50; 
                                color: white; padding: 15px 25px; border-radius: 10px; 
                                box-shadow: 0 5px 20px rgba(0,0,0,0.2); z-index: 10001;
                                display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-sync-alt"></i>
                        <span>Prices updated successfully!</span>
                        <button onclick="this.parentElement.remove()" 
                                style="background: transparent; border: none; color: white; 
                                       margin-left: 15px; cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                document.body.appendChild(notification);
                
                // Auto-remove after 10 seconds
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 10000);
            }
        }
    }
}

// ====== INITIALIZE ADMIN FEATURES ======
function initializeAdminFeatures() {
    // Load price configuration
    const priceConfig = loadPriceConfig();
    
    // Setup admin link
    setupAdminLink();
    
    // Show update notification if applicable
    showAdminNotification();
    
    // Add keyboard shortcut for admin (Ctrl+Alt+A)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.key === 'a') {
            const adminLinkBtn = document.getElementById('adminLinkBtn');
            if (adminLinkBtn) {
                if (adminLinkBtn.style.display === 'block') {
                    adminLinkBtn.style.display = 'none';
                    localStorage.removeItem('showAdminLink');
                    alert('Admin link hidden');
                } else {
                    adminLinkBtn.style.display = 'block';
                    localStorage.setItem('showAdminLink', 'true');
                    alert('Admin link shown');
                }
            }
        }
    });
    
    // Monitor localStorage changes for price updates
    window.addEventListener('storage', function(e) {
        if (e.key === 'odelyaPriceConfig') {
            console.log('Price configuration updated remotely');
            loadPriceConfig();
            
            // Re-render pricing table if function exists
            if (typeof renderPricingTable === 'function') {
                renderPricingTable();
            }
            
            // Show notification
            showAdminNotification();
        }
    });
    
    console.log('Admin features initialized');
}

// ====== EXPORT FUNCTIONS ======
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadPriceConfig,
        setupAdminLink,
        checkAdminAccess,
        showAdminNotification,
        initializeAdminFeatures
    };
}
