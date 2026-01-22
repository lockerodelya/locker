// pwainstall.js - PWA Install Prompt with Auto Update
// Version: 3.5

class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = null;
        this.hasShownPrompt = false;
        this.init();
    }

    init() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA: Install prompt available');
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        // Listen for app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA: App installed successfully');
            this.hideInstallButton();
            this.deferredPrompt = null;
        });

        // Auto update check every 24 hours
        this.setupAutoUpdate();
    }

    showInstallButton() {
        // Only show once per session
        if (this.hasShownPrompt || this.installButton) return;
        
        // Create install button
        this.installButton = document.createElement('button');
        this.installButton.id = 'pwa-install-btn';
        this.installButton.innerHTML = `
            <i class="fas fa-download"></i> Install App
        `;
        
        // Button styles
        this.installButton.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: linear-gradient(135deg, #0D47A1, #4361ee);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 12px 20px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(13, 71, 161, 0.3);
            z-index: 9998;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;
        
        // Hover effect
        this.installButton.addEventListener('mouseenter', () => {
            this.installButton.style.transform = 'scale(1.05)';
        });
        
        this.installButton.addEventListener('mouseleave', () => {
            this.installButton.style.transform = 'scale(1)';
        });
        
        // Click event - One Click Install
        this.installButton.addEventListener('click', () => {
            this.installPWA();
        });
        
        // Add to page
        document.body.appendChild(this.installButton);
        this.hasShownPrompt = true;
        
        // Auto hide after 30 seconds
        setTimeout(() => {
            this.hideInstallButton();
        }, 30000);
    }

    hideInstallButton() {
        if (this.installButton && this.installButton.parentNode) {
            this.installButton.style.opacity = '0';
            this.installButton.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (this.installButton.parentNode) {
                    this.installButton.parentNode.removeChild(this.installButton);
                }
                this.installButton = null;
            }, 300);
        }
    }

    async installPWA() {
        if (!this.deferredPrompt) {
            console.log('PWA: No install prompt available');
            return;
        }
        
        try {
            // Show install prompt
            this.deferredPrompt.prompt();
            
            // Wait for user choice
            const choiceResult = await this.deferredPrompt.userChoice;
            
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA: User accepted install');
            } else {
                console.log('PWA: User declined install');
                // Show again after 1 hour
                setTimeout(() => {
                    this.hasShownPrompt = false;
                }, 3600000);
            }
            
            this.deferredPrompt = null;
            this.hideInstallButton();
            
        } catch (error) {
            console.error('PWA Install error:', error);
        }
    }

    setupAutoUpdate() {
        // Check for updates when coming online
        window.addEventListener('online', () => {
            this.checkForUpdates();
        });
        
        // Check for updates every 24 hours
        setInterval(() => {
            this.checkForUpdates();
        }, 24 * 60 * 60 * 1000);
        
        // Initial check
        setTimeout(() => {
            this.checkForUpdates();
        }, 5000);
    }

    checkForUpdates() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then(registration => {
                if (registration) {
                    registration.update();
                    console.log('PWA: Checking for updates...');
                }
            });
        }
    }
}

// Auto-clear cache on new version
if ('serviceWorker' in navigator) {
    // Clear old caches
    caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
            if (cacheName.startsWith('odelya-cache-') && 
                cacheName !== 'odelya-cache-v3') {
                caches.delete(cacheName);
                console.log('PWA: Cleared old cache:', cacheName);
            }
        });
    });
}

// Initialize PWA Installer
document.addEventListener('DOMContentLoaded', () => {
    new PWAInstaller();
});
