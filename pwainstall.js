// pwainstall.js - PWA Install Prompt with Smart Features
// Version: 4.0

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
        // ====== SMART DISPLAY LOGIC ======
        // Don't show if already installed or user declined recently
        if (this.shouldNotShowPrompt()) return;
        
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
            localStorage.setItem('pwa_installed', 'true');
        });

        // Auto update check every 24 hours
        this.setupAutoUpdate();
        
        // ====== iOS SAFARI SUPPORT ======
        // iOS Safari needs special handling
        if (this.isIOS && this.isSafari) {
            this.showIOSInstallHint();
        }
    }

    // ====== 1. SMART DISPLAY LOGIC ======
    shouldNotShowPrompt() {
        // Don't show if already in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('PWA: Already in standalone mode');
            return true;
        }
        
        // Don't show if user already installed
        if (localStorage.getItem('pwa_installed') === 'true') {
            console.log('PWA: Already installed');
            return true;
        }
        
        // Check if user declined recently (7 days)
        const lastDeclined = localStorage.getItem('pwa_declined');
        if (lastDeclined) {
            const daysSince = (Date.now() - parseInt(lastDeclined)) / (1000 * 60 * 60 * 24);
            if (daysSince < 7) {
                console.log('PWA: User declined recently');
                return true;
            }
        }
        
        // Check if "never show" is set
        if (localStorage.getItem('pwa_never_show') === 'true') {
            console.log('PWA: User chose "never show"');
            return true;
        }
        
        return false;
    }

    // ====== 2. iOS SAFARI SUPPORT ======
    showIOSInstallHint() {
        // iOS Safari doesn't support beforeinstallprompt
        // Show manual instructions
        setTimeout(() => {
            if (!document.getElementById('ios-install-hint')) {
                const iosHint = document.createElement('div');
                iosHint.id = 'ios-install-hint';
                iosHint.innerHTML = `
                    <div style="
                        background: linear-gradient(135deg, #0D47A1, #4361ee);
                        color: white;
                        padding: 15px;
                        border-radius: 10px;
                        margin: 15px;
                        max-width: 300px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                        font-size: 0.9rem;
                    ">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <i class="fas fa-mobile-alt" style="font-size: 1.2rem;"></i>
                            <strong>Install Odelya App</strong>
                        </div>
                        <ol style="margin: 0; padding-left: 20px;">
                            <li>Tap <i class="fas fa-share"></i> Share button</li>
                            <li>Select "Add to Home Screen"</li>
                            <li>Tap "Add" to install</li>
                        </ol>
                        <button id="close-ios-hint" style="
                            background: rgba(255,255,255,0.2);
                            border: 1px solid rgba(255,255,255,0.3);
                            color: white;
                            padding: 5px 15px;
                            border-radius: 15px;
                            margin-top: 10px;
                            cursor: pointer;
                            font-size: 0.8rem;
                        ">Got it</button>
                    </div>
                `;
                
                iosHint.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9997;
                    animation: slideIn 0.3s ease;
                `;
                
                document.body.appendChild(iosHint);
                
                // Close button
                document.getElementById('close-ios-hint').addEventListener('click', () => {
                    iosHint.style.opacity = '0';
                    iosHint.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        if (iosHint.parentNode) iosHint.parentNode.removeChild(iosHint);
                    }, 300);
                });
                
                // Auto-remove after 20 seconds
                setTimeout(() => {
                    if (iosHint.parentNode && document.getElementById('ios-install-hint')) {
                        iosHint.style.opacity = '0';
                        setTimeout(() => {
                            if (iosHint.parentNode) iosHint.parentNode.removeChild(iosHint);
                        }, 300);
                    }
                }, 20000);
            }
        }, 3000);
    }

    showInstallButton() {
        // Apply smart logic
        if (this.shouldNotShowPrompt()) return;
        
        // Only show once per session
        if (this.hasShownPrompt || this.installButton) return;
        
        // ====== 4. OPTIMIZE FOR DIFFERENT DEVICES ======
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Create install button
        this.installButton = document.createElement('button');
        this.installButton.id = 'pwa-install-btn';
        this.installButton.innerHTML = `
            <i class="fas fa-download"></i> Install App
            ${isMobile ? '<br><small style="font-size: 0.7rem; opacity: 0.8;">Works offline</small>' : ''}
        `;
        
        // Base styles
        let buttonStyles = `
            position: fixed;
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
            text-align: center;
        `;
        
        // Device-specific positioning
        if (isMobile) {
            // Mobile: Bottom center, larger for touch
            buttonStyles += `
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 15px 25px;
                font-size: 1rem;
                min-width: 160px;
                justify-content: center;
            `;
        } else {
            // Desktop: Bottom right
            buttonStyles += `
                bottom: 30px;
                right: 30px;
                left: auto;
            `;
        }
        
        this.installButton.style.cssText = buttonStyles;
        
        // Hover effect (desktop only)
        if (!isMobile) {
            this.installButton.addEventListener('mouseenter', () => {
                this.installButton.style.transform = 'translateX(-50%) scale(1.05)';
            });
            
            this.installButton.addEventListener('mouseleave', () => {
                this.installButton.style.transform = 'translateX(-50%) scale(1)';
            });
        }
        
        // Click event
        this.installButton.addEventListener('click', () => {
            this.installPWA();
        });
        
        // Add optional "Don't show again" for desktop
        if (!isMobile) {
            setTimeout(() => {
                if (this.installButton && !this.installButton.querySelector('#dont-show-again')) {
                    const dontShowBtn = document.createElement('button');
                    dontShowBtn.id = 'dont-show-again';
                    dontShowBtn.innerHTML = '<small>Don\'t show again</small>';
                    dontShowBtn.style.cssText = `
                        position: absolute;
                        top: -20px;
                        right: 0;
                        background: transparent;
                        border: none;
                        color: #666;
                        font-size: 0.7rem;
                        cursor: pointer;
                        padding: 2px 8px;
                    `;
                    dontShowBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        localStorage.setItem('pwa_never_show', 'true');
                        this.hideInstallButton();
                    });
                    this.installButton.style.position = 'relative';
                    this.installButton.appendChild(dontShowBtn);
                }
            }, 5000);
        }
        
        // Add to page
        document.body.appendChild(this.installButton);
        this.hasShownPrompt = true;
        
        // Auto hide after device-specific time
        const hideTime = isMobile ? 15000 : 30000; // 15s mobile, 30s desktop
        setTimeout(() => {
            this.hideInstallButton();
        }, hideTime);
    }

    hideInstallButton() {
        if (this.installButton && this.installButton.parentNode) {
            this.installButton.style.opacity = '0';
            this.installButton.style.transform = this.installButton.style.transform.includes('translateX')
                ? 'translateX(-50%) translateY(20px)'
                : 'translateY(20px)';
            setTimeout(() => {
                if (this.installButton.parentNode) {
                    this.installButton.parentNode.removeChild(this.installButton);
                }
                this.installButton = null;
            }, 300);
        }
    }

    // ====== 3. ERROR HANDLING & FALLBACKS ======
    async installPWA() {
        if (!this.deferredPrompt) {
            console.log('PWA: No install prompt available');
            this.showFallbackInstructions();
            return;
        }
        
        try {
            // Show install prompt
            this.deferredPrompt.prompt();
            
            // Wait for user choice with timeout
            const choiceResult = await Promise.race([
                this.deferredPrompt.userChoice,
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Install timeout')), 10000)
                )
            ]);
            
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA: User accepted install');
                // Success vibration if supported
                if (navigator.vibrate) navigator.vibrate(50);
            } else {
                console.log('PWA: User declined install');
                localStorage.setItem('pwa_declined', Date.now());
                // Show again after 1 hour
                setTimeout(() => {
                    this.hasShownPrompt = false;
                }, 3600000);
            }
            
            this.deferredPrompt = null;
            this.hideInstallButton();
            
        } catch (error) {
            console.error('PWA Install error:', error);
            
            // ====== ERROR HANDLING ======
            if (error.message === 'Install timeout') {
                console.log('PWA: Install prompt timeout');
                this.showManualInstallGuide();
            } else if (error.name === 'NotAllowedError') {
                console.log('PWA: Install blocked by browser');
                this.showInstallBlockedMessage();
            } else {
                console.log('PWA: Unknown error, showing fallback');
                this.showFallbackInstructions();
            }
        }
    }

    showFallbackInstructions() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            this.showMobileFallback();
        } else {
            this.showDesktopFallback();
        }
    }

    showMobileFallback() {
        const fallback = document.createElement('div');
        fallback.innerHTML = `
            <div style="
                background: #4CAF50;
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 10px;
                max-width: 280px;
                text-align: center;
            ">
                <i class="fas fa-info-circle" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                <p style="margin: 0; font-size: 0.9rem;">
                    Use browser menu → "Add to Home Screen"
                </p>
                <button style="
                    background: white;
                    color: #4CAF50;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 15px;
                    margin-top: 10px;
                    cursor: pointer;
                    font-weight: bold;
                ">OK</button>
            </div>
        `;
        
        this.showTemporaryMessage(fallback, 8000);
    }

    showDesktopFallback() {
        const fallback = document.createElement('div');
        fallback.innerHTML = `
            <div style="
                background: #FF9800;
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 10px;
                max-width: 300px;
            ">
                <strong><i class="fas fa-exclamation-triangle"></i> Manual Install Needed</strong>
                <p style="margin: 10px 0 0 0; font-size: 0.9rem;">
                    Click the install icon in your browser's address bar
                </p>
            </div>
        `;
        
        this.showTemporaryMessage(fallback, 5000);
    }

    showInstallBlockedMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                background: #F44336;
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 10px;
                max-width: 300px;
                text-align: center;
            ">
                <i class="fas fa-ban" style="font-size: 1.5rem;"></i>
                <p style="margin: 10px 0 0 0; font-size: 0.9rem;">
                    Install blocked by browser settings
                </p>
            </div>
        `;
        
        this.showTemporaryMessage(message, 5000);
    }

    showManualInstallGuide() {
        const guide = document.createElement('div');
        guide.innerHTML = `
            <div style="
                background: #2196F3;
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 10px;
                max-width: 320px;
            ">
                <strong><i class="fas fa-graduation-cap"></i> How to Install:</strong>
                <ol style="margin: 10px 0 0 0; padding-left: 20px; font-size: 0.9rem;">
                    <li>Look for the install icon (📥) in address bar</li>
                    <li>Or use browser menu → "Install App"</li>
                    <li>Follow the on-screen instructions</li>
                </ol>
            </div>
        `;
        
        this.showTemporaryMessage(guide, 10000);
    }

    showTemporaryMessage(element, duration = 5000) {
        element.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            if (element.parentNode) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (element.parentNode) element.parentNode.removeChild(element);
                }, 300);
            }
        }, duration);
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

// Add CSS animation for messages
if (!document.querySelector('#pwa-animations')) {
    const style = document.createElement('style');
    style.id = 'pwa-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}
