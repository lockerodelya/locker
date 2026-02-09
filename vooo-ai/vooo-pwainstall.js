// vooo-pwainstall.js - Vooo AI PWA Installer
// Version: 1.0 - Vooo AI Specific

class VoooPWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = null;
        this.hasShownPrompt = false;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.reminderInterval = 10 * 60 * 1000; // 10 minutes for Vooo AI
        this.reminderTimer = null;
        this.maxAttempts = 2; // Fewer reminders for games
        this.attemptCount = 0;
        this.init();
    }

    init() {
        // Check if PWA is already installed
        if (this.isPWAInstalled()) {
            console.log('Vooo AI PWA: Already installed');
            return;
        }
        
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('Vooo AI PWA: Install prompt available');
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Show prompt after delay for Vooo AI
            this.scheduleVoooPrompt();
        });

        // Listen for app installed
        window.addEventListener('appinstalled', () => {
            console.log('Vooo AI PWA: App installed successfully');
            localStorage.setItem('vooo_pwa_installed', 'true');
            this.clearReminderTimer();
            this.hideInstallButton();
        });

        // Check if already standalone
        if (window.matchMedia('(display-mode: standalone)').matches) {
            localStorage.setItem('vooo_pwa_installed', 'true');
            this.clearReminderTimer();
            return;
        }
        
        // Check if we should show reminder
        this.checkReminderStatus();
        
        // Mobile fallback
        if (this.isMobile && !this.deferredPrompt) {
            console.log('Vooo AI PWA: Mobile device detected');
            this.scheduleMobileReminder();
        }
    }

    scheduleVoooPrompt() {
        // Show first prompt after 2 puzzles or 30 seconds
        setTimeout(() => {
            if (!this.hasShownPrompt && !this.isPWAInstalled()) {
                this.showVoooInstallButton();
            }
        }, 30000);
    }

    scheduleMobileReminder() {
        setTimeout(() => {
            if (!this.isPWAInstalled() && this.attemptCount < this.maxAttempts) {
                this.showVoooInstallButton();
                this.attemptCount++;
            }
        }, 45000); // 45 seconds for Vooo AI
    }

    isPWAInstalled() {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInstalled = localStorage.getItem('vooo_pwa_installed') === 'true';
        
        if (isStandalone || isInstalled) {
            this.clearReminderTimer();
            return true;
        }
        
        return false;
    }

    checkReminderStatus() {
        const lastDeclined = localStorage.getItem('vooo_pwa_declined');
        if (lastDeclined) {
            const timeSince = Date.now() - parseInt(lastDeclined);
            
            if (timeSince >= this.reminderInterval) {
                this.scheduleReminder();
            } else {
                const timeRemaining = this.reminderInterval - timeSince;
                this.reminderTimer = setTimeout(() => {
                    this.showVoooInstallButton();
                }, timeRemaining);
            }
        } else {
            this.scheduleReminder();
        }
    }

    scheduleReminder() {
        this.clearReminderTimer();
        this.reminderTimer = setTimeout(() => {
            this.showVoooInstallButton();
        }, this.reminderInterval);
    }

    clearReminderTimer() {
        if (this.reminderTimer) {
            clearTimeout(this.reminderTimer);
            this.reminderTimer = null;
        }
    }

    showVoooInstallButton() {
        if (this.isPWAInstalled() || this.hasShownPrompt || this.installButton) return;
        
        // Create Vooo AI specific button
        this.installButton = document.createElement('button');
        this.installButton.id = 'vooo-pwa-install-btn';
        this.installButton.innerHTML = `
            <i class="fas fa-brain" style="margin-right: 8px;"></i> 
            Install Odelya Vooo AI
        `;
        
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
            animation: voooSlideIn 0.5s ease;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 250px;
            text-align: center;
            white-space: nowrap;
            max-width: 90%;
        `;
        
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
        
        // Add click handler for Vooo AI
        this.installButton.addEventListener('click', () => {
            this.installVoooPWA();
        });
        
        // Close button for Vooo AI
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
            localStorage.setItem('vooo_pwa_declined', Date.now());
            this.scheduleReminder();
        });
        
        this.installButton.appendChild(closeBtn);
        document.body.appendChild(this.installButton);
        this.hasShownPrompt = true;
        
        // Auto-hide after 20 seconds for Vooo AI
        setTimeout(() => {
            this.hideInstallButton();
        }, 20000);
    }

    hideInstallButton() {
        if (this.installButton && this.installButton.parentNode) {
            this.installButton.style.opacity = '0';
            setTimeout(() => {
                if (this.installButton.parentNode) {
                    this.installButton.parentNode.removeChild(this.installButton);
                }
                this.installButton = null;
                this.hasShownPrompt = false;
            }, 300);
        }
    }

    async installVoooPWA() {
        if (!this.deferredPrompt) {
            this.showVoooInstructions();
            return;
        }
        
        try {
            this.deferredPrompt.prompt();
            const choiceResult = await this.deferredPrompt.userChoice;
            
            if (choiceResult.outcome === 'accepted') {
                console.log('Vooo AI PWA: User accepted install');
                localStorage.removeItem('vooo_pwa_declined');
            } else {
                localStorage.setItem('vooo_pwa_declined', Date.now());
                this.scheduleReminder();
            }
            
            this.deferredPrompt = null;
            this.hideInstallButton();
        } catch (error) {
            console.error('Vooo AI PWA install error:', error);
            this.showVoooInstructions();
        }
    }

    showVoooInstructions() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #0D47A1, #4361ee);
                color: white;
                padding: 20px;
                border-radius: 15px;
                width: 300px;
                text-align: center;
                position: relative;
            ">
                <button id="close-vooo-hint" style="
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
                    <i class="fas fa-brain" style="font-size: 1.5rem;"></i>
                    <strong style="font-size: 1.1rem;">Install Vooo AI</strong>
                </div>
                
                <div style="font-size: 0.9rem; margin-bottom: 15px;">
                    <p style="margin: 0 0 10px 0; text-align: left;">
                        <i class="fas fa-mobile-alt"></i> <strong>Mobile:</strong> Use browser menu → "Add to Home Screen"
                    </p>
                    <p style="margin: 0 0 10px 0; text-align: left;">
                        <i class="fas fa-desktop"></i> <strong>Desktop:</strong> Click install button in address bar
                    </p>
                    <p style="margin: 0; font-size: 0.85rem; color: #e2e8f0;">
                        Play offline • No downloads • Instant access
                    </p>
                </div>
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            animation: voooSlideIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        document.getElementById('close-vooo-hint').addEventListener('click', () => {
            message.style.opacity = '0';
            setTimeout(() => {
                if (message.parentNode) message.parentNode.removeChild(message);
                localStorage.setItem('vooo_pwa_declined', Date.now());
                this.scheduleReminder();
            }, 300);
        });
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.opacity = '0';
                setTimeout(() => {
                    if (message.parentNode) message.parentNode.removeChild(message);
                    localStorage.setItem('vooo_pwa_declined', Date.now());
                    this.scheduleReminder();
                }, 300);
            }
        }, 15000);
    }
}

// Add Vooo AI specific styles
if (!document.querySelector('#vooo-pwa-styles')) {
    const style = document.createElement('style');
    style.id = 'vooo-pwa-styles';
    style.textContent = `
        @keyframes voooSlideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -40%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        #vooo-pwa-install-btn:hover {
            transform: translate(-50%, -50%) scale(1.05) !important;
            box-shadow: 0 6px 25px rgba(13, 71, 161, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize Vooo AI PWA
document.addEventListener('DOMContentLoaded', () => {
    new VoooPWAInstaller();
});
