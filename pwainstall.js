// pwainstall.js - Fixed and Optimized PWA Install Prompt
// Version: 4.1

class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = null;
        this.hasShownPrompt = false;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        // Check if PWA is already installed
        if (this.isPWAInstalled()) return;
        
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA: Install prompt available');
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Show button after 3 seconds delay
            setTimeout(() => {
                if (!this.hasShownPrompt) {
                    this.showInstallButton();
                }
            }, 3000);
        });

        // Listen for app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA: App installed successfully');
            localStorage.setItem('pwa_installed', 'true');
            this.hideInstallButton();
        });

        // Check if already standalone
        if (window.matchMedia('(display-mode: standalone)').matches) {
            localStorage.setItem('pwa_installed', 'true');
            return;
        }
        
        // For iOS Safari, show custom prompt
        if (this.isIOS && this.isSafari) {
            setTimeout(() => {
                this.showIOSInstallHint();
            }, 5000);
        }
    }

    isPWAInstalled() {
        // Check multiple indicators
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInstalled = localStorage.getItem('pwa_installed') === 'true';
        
        if (isStandalone || isInstalled) {
            console.log('PWA: Already installed or in standalone mode');
            return true;
        }
        
        // Check if user declined recently (24 hours)
        const lastDeclined = localStorage.getItem('pwa_declined');
        if (lastDeclined) {
            const hoursSince = (Date.now() - parseInt(lastDeclined)) / (1000 * 60 * 60);
            if (hoursSince < 24) {
                console.log('PWA: User declined recently');
                return true;
            }
        }
        
        return false;
    }

    showInstallButton() {
        if (this.isPWAInstalled() || this.hasShownPrompt || this.installButton) return;
        
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        this.installButton = document.createElement('button');
        this.installButton.id = 'pwa-install-btn';
        this.installButton.innerHTML = `
            <i class="fas fa-download"></i> 
            ${isMobile ? 'Install Odelya App' : 'Install App'}
            ${isMobile ? '<br><small>Works offline</small>' : ''}
        `;
        
        // Styling
        let styles = `
            position: fixed;
            background: linear-gradient(135deg, #0D47A1, #4361ee);
            color: white;
            border: none;
            border-radius: 25px;
            padding: ${isMobile ? '15px 25px' : '12px 20px'};
            font-size: ${isMobile ? '1rem' : '0.9rem'};
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(13, 71, 161, 0.4);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
            animation: slideIn 0.5s ease;
        `;
        
        if (isMobile) {
            styles += `
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                min-width: 200px;
                text-align: center;
            `;
        } else {
            styles += `
                bottom: 30px;
                right: 30px;
            `;
        }
        
        this.installButton.style.cssText = styles;
        
        // Add click handler
        this.installButton.addEventListener('click', () => {
            this.installPWA();
        });
        
        // Add to page
        document.body.appendChild(this.installButton);
        this.hasShownPrompt = true;
        
        // Auto-hide after 15 seconds
        setTimeout(() => {
            this.hideInstallButton();
        }, 15000);
    }

    hideInstallButton() {
        if (this.installButton && this.installButton.parentNode) {
            this.installButton.style.opacity = '0';
            this.installButton.style.transform = 'translateX(-50%) translateY(20px)';
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
            this.showManualInstructions();
            return;
        }
        
        try {
            this.deferredPrompt.prompt();
            const choiceResult = await this.deferredPrompt.userChoice;
            
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted install');
            } else {
                localStorage.setItem('pwa_declined', Date.now());
            }
            
            this.deferredPrompt = null;
            this.hideInstallButton();
        } catch (error) {
            console.error('Install error:', error);
            this.showManualInstructions();
        }
    }

    showIOSInstallHint() {
        if (document.getElementById('ios-install-hint') || this.isPWAInstalled()) return;
        
        const hint = document.createElement('div');
        hint.id = 'ios-install-hint';
        hint.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #0D47A1, #4361ee);
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 0;
                width: 280px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            ">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <i class="fas fa-mobile-alt" style="font-size: 1.2rem;"></i>
                    <strong>Install Odelya Locker</strong>
                </div>
                <ol style="margin: 0; padding-left: 20px; font-size: 0.85rem;">
                    <li>Tap <i class="fas fa-share"></i> Share button</li>
                    <li>Select "Add to Home Screen"</li>
                    <li>Tap "Add" to install</li>
                </ol>
                <button id="close-ios-hint" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 5px 15px;
                    border-radius: 15px;
                    margin-top: 10px;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">OK</button>
            </div>
        `;
        
        hint.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9997;
        `;
        
        document.body.appendChild(hint);
        
        document.getElementById('close-ios-hint').addEventListener('click', () => {
            hint.style.opacity = '0';
            setTimeout(() => {
                if (hint.parentNode) hint.parentNode.removeChild(hint);
            }, 300);
        });
        
        setTimeout(() => {
            if (hint.parentNode) {
                hint.style.opacity = '0';
                setTimeout(() => {
                    if (hint.parentNode) hint.parentNode.removeChild(hint);
                }, 300);
            }
        }, 10000);
    }

    showManualInstructions() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                background: #0D47A1;
                color: white;
                padding: 15px;
                border-radius: 10px;
                width: 250px;
                text-align: center;
            ">
                <i class="fas fa-info-circle" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                <p style="margin: 0; font-size: 0.9rem;">
                    Use browser menu → "Install App" or "Add to Home Screen"
                </p>
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.opacity = '0';
                setTimeout(() => {
                    if (message.parentNode) message.parentNode.removeChild(message);
                }, 300);
            }
        }, 5000);
    }
}

// Add CSS animations
if (!document.querySelector('#pwa-styles')) {
    const style = document.createElement('style');
    style.id = 'pwa-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        #pwa-install-btn:hover {
            transform: translateX(-50%) scale(1.05) !important;
            box-shadow: 0 6px 25px rgba(13, 71, 161, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PWAInstaller();
});
