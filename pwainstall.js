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
            <i class="fas fa-download" style="margin-right: 8px;"></i> 
            Install Odelya Locker
        `;
        
        // Styling for mobile - centered
        let styles = `
            position: fixed;
            background: linear-gradient(135deg, #0D47A1, #4361ee);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 16px 30px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(13, 71, 161, 0.4);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            animation: slideIn 0.5s ease;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 220px;
            text-align: center;
            white-space: nowrap;
        `;
        
        this.installButton.style.cssText = styles;
        
        // Add click handler
        this.installButton.addEventListener('click', () => {
            this.installPWA();
        });
        
        // Add close button for mobile
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            line-height: 1;
        `;
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideInstallButton();
            localStorage.setItem('pwa_declined', Date.now());
        });
        
        this.installButton.appendChild(closeBtn);
        
        // Add to page
        document.body.appendChild(this.installButton);
        this.hasShownPrompt = true;
        
        // Auto-hide after 30 seconds
        setTimeout(() => {
            this.hideInstallButton();
        }, 30000);
    }

    hideInstallButton() {
        if (this.installButton && this.installButton.parentNode) {
            this.installButton.style.opacity = '0';
            this.installButton.style.transform = 'translate(-50%, -50%) scale(0.9)';
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
                padding: 20px;
                border-radius: 15px;
                margin: 0;
                width: 280px;
                box-shadow: 0 4px 25px rgba(0,0,0,0.3);
                text-align: center;
                position: relative;
            ">
                <button id="close-ios-hint" style="
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    line-height: 1;
                ">×</button>
                
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px;">
                    <i class="fas fa-mobile-alt" style="font-size: 1.5rem;"></i>
                    <strong style="font-size: 1.1rem;">Install Odelya Locker</strong>
                </div>
                <div style="font-size: 0.9rem; margin-bottom: 15px;">
                    <p style="margin: 0 0 10px 0;">1. Tap <i class="fas fa-share"></i> Share button</p>
                    <p style="margin: 0 0 10px 0;">2. Select "Add to Home Screen"</p>
                    <p style="margin: 0;">3. Tap "Add" to install</p>
                </div>
            </div>
        `;
        
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9997;
            animation: slideIn 0.5s ease;
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
        }, 30000);
    }

    showManualInstructions() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                background: #0D47A1;
                color: white;
                padding: 20px;
                border-radius: 15px;
                width: 250px;
                text-align: center;
                position: relative;
            ">
                <button id="close-manual-hint" style="
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    line-height: 1;
                ">×</button>
                
                <i class="fas fa-info-circle" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                <p style="margin: 0; font-size: 0.9rem;">
                    Use browser menu → "Install App" or "Add to Home Screen"
                </p>
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        document.getElementById('close-manual-hint').addEventListener('click', () => {
            message.style.opacity = '0';
            setTimeout(() => {
                if (message.parentNode) message.parentNode.removeChild(message);
            }, 300);
        });
        
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
                transform: translate(-50%, -40%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        #pwa-install-btn:hover {
            transform: translate(-50%, -50%) scale(1.05) !important;
            box-shadow: 0 6px 25px rgba(13, 71, 161, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PWAInstaller();
});
