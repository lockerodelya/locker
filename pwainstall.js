// pwainstall.js - Fixed for Mobile Reliability
// Version: 4.2 - Mobile Fix

class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = null;
        this.hasShownPrompt = false;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.reminderInterval = 5 * 60 * 1000; // 5 minutes
        this.reminderTimer = null;
        this.maxAttempts = 3; // Max reminders per session
        this.attemptCount = 0;
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
            
            // Show button after delay
            this.scheduleInitialPrompt();
        });

        // Listen for app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA: App installed successfully');
            localStorage.setItem('pwa_installed', 'true');
            this.clearReminderTimer();
            this.hideInstallButton();
        });

        // Check if already standalone
        if (window.matchMedia('(display-mode: standalone)').matches) {
            localStorage.setItem('pwa_installed', 'true');
            this.clearReminderTimer();
            return;
        }
        
        // Check if we should show reminder based on last declined time
        this.checkReminderStatus();
        
        // For mobile devices (iOS/Android), show custom prompt even without beforeinstallprompt
        if (this.isMobile && !this.deferredPrompt) {
            console.log('PWA: Mobile device detected, setting up alternative reminders');
            this.scheduleMobileReminder();
        }
    }

    scheduleInitialPrompt() {
        // Show first prompt after 3 seconds
        setTimeout(() => {
            if (!this.hasShownPrompt && !this.isPWAInstalled()) {
                this.showInstallButton();
            }
        }, 3000);
    }

    scheduleMobileReminder() {
        // For mobile devices that don't fire beforeinstallprompt reliably
        setTimeout(() => {
            if (!this.isPWAInstalled() && this.attemptCount < this.maxAttempts) {
                console.log('PWA: Mobile fallback reminder');
                this.showMobileInstallPrompt();
                this.attemptCount++;
            }
        }, 10000); // Wait 10 seconds for mobile
    }

    isPWAInstalled() {
        // Check multiple indicators
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInstalled = localStorage.getItem('pwa_installed') === 'true';
        
        if (isStandalone || isInstalled) {
            console.log('PWA: Already installed or in standalone mode');
            this.clearReminderTimer();
            return true;
        }
        
        return false;
    }

    checkReminderStatus() {
        const lastDeclined = localStorage.getItem('pwa_declined');
        if (lastDeclined) {
            const timeSince = Date.now() - parseInt(lastDeclined);
            
            // If 5 minutes have passed since last decline, show reminder
            if (timeSince >= this.reminderInterval) {
                console.log('PWA: 5 minutes passed, showing reminder');
                this.scheduleReminder();
            } else {
                // Schedule reminder for when 5 minutes are complete
                const timeRemaining = this.reminderInterval - timeSince;
                console.log(`PWA: Remaining time until next reminder: ${Math.round(timeRemaining/1000)} seconds`);
                
                this.reminderTimer = setTimeout(() => {
                    this.showReminder();
                }, timeRemaining);
            }
        } else {
            // No previous decline, schedule first reminder after 5 minutes
            this.scheduleReminder();
        }
    }

    scheduleReminder() {
        // Clear any existing timer
        this.clearReminderTimer();
        
        // Schedule reminder after 5 minutes
        this.reminderTimer = setTimeout(() => {
            this.showReminder();
        }, this.reminderInterval);
        
        console.log('PWA: Next reminder scheduled in 5 minutes');
    }

    showReminder() {
        if (this.isPWAInstalled() || this.hasShownPrompt) return;
        
        console.log('PWA: Showing reminder');
        
        // For Android/Chrome, show install button
        if (!this.isIOS && !this.isSafari && this.deferredPrompt) {
            this.showInstallButton();
        }
        // For iOS Safari, show custom hint
        else if (this.isIOS && this.isSafari) {
            this.showIOSInstallHint();
        }
        // For other browsers
        else {
            this.showInstallButton();
        }
        
        // Schedule next reminder
        this.scheduleReminder();
    }

    clearReminderTimer() {
        if (this.reminderTimer) {
            clearTimeout(this.reminderTimer);
            this.reminderTimer = null;
        }
    }

    showInstallButton() {
        if (this.isPWAInstalled() || this.hasShownPrompt || this.installButton) return;
        
        // Create the button
        this.installButton = document.createElement('button');
        this.installButton.id = 'pwa-install-btn';
        this.installButton.innerHTML = `
            <i class="fas fa-download" style="margin-right: 8px;"></i> 
            Install Odelya Locker
        `;
        
        // Common styling for both mobile and desktop - CENTERED
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
            /* ALWAYS CENTERED */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 220px;
            text-align: center;
            white-space: nowrap;
            /* Add some responsive adjustments */
            max-width: 90%;
        `;
        
        // Add responsive font size
        if (this.isMobile) {
            styles += `
                font-size: 1.1rem;
                padding: 18px 32px;
            `;
        } else {
            styles += `
                font-size: 1.2rem;
                padding: 20px 36px;
            `;
        }
        
        this.installButton.style.cssText = styles;
        
        // Add click handler
        this.installButton.addEventListener('click', () => {
            this.installPWA();
        });
        
        // Add close button (small X in top-right corner)
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
            this.scheduleReminder();
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

    showMobileInstallPrompt() {
        if (this.isPWAInstalled() || this.hasShownPrompt || this.installButton) return;
        
        this.installButton = document.createElement('button');
        this.installButton.id = 'pwa-install-btn';
        this.installButton.innerHTML = `
            <i class="fas fa-download" style="margin-right: 8px;"></i> 
            Install Odelya Locker
        `;
        
        let styles = `
            position: fixed;
            background: linear-gradient(135deg, #0D47A1, #4361ee);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 18px 32px;
            font-size: 1.1rem;
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
            max-width: 90%;
        `;
        
        this.installButton.style.cssText = styles;
        
        // Different click handler for mobile fallback
        this.installButton.addEventListener('click', () => {
            if (this.deferredPrompt) {
                this.installPWA();
            } else {
                // Show platform-specific instructions
                if (this.isIOS) {
                    this.showIOSInstallHint();
                } else {
                    this.showAndroidInstructions();
                }
                this.hideInstallButton();
            }
        });
        
        // Add close button
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
            this.scheduleReminder();
        });
        
        this.installButton.appendChild(closeBtn);
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
                this.hasShownPrompt = false;
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
                localStorage.removeItem('pwa_declined'); // Clear declined history
            } else {
                localStorage.setItem('pwa_declined', Date.now());
                // Schedule next reminder
                this.scheduleReminder();
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
            
            localStorage.setItem('pwa_declined', Date.now());
            this.scheduleReminder();
        });
        
        setTimeout(() => {
            if (hint.parentNode) {
                hint.style.opacity = '0';
                setTimeout(() => {
                    if (hint.parentNode) hint.parentNode.removeChild(hint);
                    localStorage.setItem('pwa_declined', Date.now());
                    this.scheduleReminder();
                }, 300);
            }
        }, 30000);
    }

    showAndroidInstructions() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                background: #0D47A1;
                color: white;
                padding: 20px;
                border-radius: 15px;
                width: 280px;
                text-align: center;
                position: relative;
            ">
                <button id="close-android-hint" style="
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
                
                <i class="fas fa-android" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                <strong style="display: block; margin-bottom: 10px;">Android Installation</strong>
                <p style="margin: 0 0 10px 0; font-size: 0.9rem; text-align: left;">
                    1. Tap Chrome menu (⋮) in top-right
                </p>
                <p style="margin: 0 0 10px 0; font-size: 0.9rem; text-align: left;">
                    2. Select "Install app" or "Add to Home screen"
                </p>
                <p style="margin: 0; font-size: 0.9rem; text-align: left;">
                    3. Follow the prompts to install
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
        
        document.getElementById('close-android-hint').addEventListener('click', () => {
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
        }, 10000);
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
            
            localStorage.setItem('pwa_declined', Date.now());
            this.scheduleReminder();
        });
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.opacity = '0';
                setTimeout(() => {
                    if (message.parentNode) message.parentNode.removeChild(message);
                    localStorage.setItem('pwa_declined', Date.now());
                    this.scheduleReminder();
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
