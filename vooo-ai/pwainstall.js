// Vooo AI PWA Installer - Enhanced Version
// Shows fullscreen welcome after 5 minutes
// Remembers installation per device

class VoooPWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.hasShownWelcome = false;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.initialDelay = 6000; // 6 seconds for first time
        this.reminderDelay = 5 * 60 * 1000; // 5 minutes for reminders after decline
        this.welcomeTimer = null;
        this.init();
    }

    init() {
        console.log('Vooo AI PWA: Initializing...');
        
        // Check if already installed
        if (this.isPWAInstalled()) {
            console.log('Vooo AI PWA: Already installed');
            return;
        }
        
        // Listen for beforeinstallprompt event (Chrome/Edge/Android)
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('Vooo AI PWA: Install prompt event captured');
            e.preventDefault();
            this.deferredPrompt = e;
        });

        // Listen for successful installation
        window.addEventListener('appinstalled', () => {
            console.log('Vooo AI PWA: App installed successfully');
            this.markAsInstalled();
            this.clearWelcomeTimer();
        });

        // Check if running in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('Vooo AI PWA: Running in standalone mode');
            this.markAsInstalled();
            return;
        }
        
        // Schedule welcome screen after 5 minutes
        this.scheduleWelcomeScreen();
    }

    isPWAInstalled() {
        // Check multiple indicators
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInstalledFlag = localStorage.getItem('vooo_pwa_installed') === 'true';
        
        return isStandalone || isInstalledFlag;
    }

    markAsInstalled() {
        localStorage.setItem('vooo_pwa_installed', 'true');
        this.clearWelcomeTimer();
    }

    scheduleWelcomeScreen() {
        // Check if user has declined before
        const lastDeclined = localStorage.getItem('vooo_pwa_declined');
        
        if (lastDeclined) {
            // User declined before - check if 5 minutes have passed
            const timeSinceDecline = Date.now() - parseInt(lastDeclined);
            
            if (timeSinceDecline >= this.reminderDelay) {
                // 5 minutes have passed, show immediately
                console.log('Vooo AI PWA: 5 minutes passed since decline, showing reminder');
                setTimeout(() => {
                    if (!this.isPWAInstalled() && !this.hasShownWelcome) {
                        this.showWelcomeScreen();
                    }
                }, 6000); // Still wait 6 seconds on page load
            } else {
                // Wait for remaining time
                const remainingTime = this.reminderDelay - timeSinceDecline;
                console.log(`Vooo AI PWA: Reminder scheduled in ${Math.round(remainingTime/1000)} seconds`);
                
                this.welcomeTimer = setTimeout(() => {
                    if (!this.isPWAInstalled() && !this.hasShownWelcome) {
                        this.showWelcomeScreen();
                    }
                }, remainingTime);
            }
        } else {
            // First time - show after 6 seconds
            console.log('Vooo AI PWA: First time - welcome screen scheduled in 6 seconds');
            
            this.welcomeTimer = setTimeout(() => {
                if (!this.isPWAInstalled() && !this.hasShownWelcome) {
                    this.showWelcomeScreen();
                }
            }, this.initialDelay);
        }
    }

    clearWelcomeTimer() {
        if (this.welcomeTimer) {
            clearTimeout(this.welcomeTimer);
            this.welcomeTimer = null;
        }
    }

    showWelcomeScreen() {
        this.hasShownWelcome = true;
        console.log('Vooo AI PWA: Showing welcome screen');

        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.id = 'vooo-pwa-welcome';
        overlay.innerHTML = `
            <div class="vooo-welcome-content">
                <button class="vooo-welcome-close" id="vooo-close-welcome" aria-label="Close">×</button>
                
                <div class="vooo-welcome-logo-container">
                    <img src="/vooo-ai/images/vooo-logo.jpg" alt="Vooo AI Logo" class="vooo-welcome-logo">
                </div>
                
                <h1 class="vooo-welcome-title">Odelya Vooo AI</h1>
                <p class="vooo-welcome-subtitle">Endless Logic Puzzles</p>
                
                <div class="vooo-welcome-features">
                    <div class="vooo-feature">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Install as App</span>
                    </div>
                    <div class="vooo-feature">
                        <i class="fas fa-bolt"></i>
                        <span>Faster Access</span>
                    </div>
                    <div class="vooo-feature">
                        <i class="fas fa-brain"></i>
                        <span>Play Offline</span>
                    </div>
                </div>
                
                <button class="vooo-install-button" id="vooo-install-now">
                    <i class="fas fa-download"></i> Install Now
                </button>
                
                <button class="vooo-maybe-later" id="vooo-maybe-later">Maybe Later</button>
            </div>
        `;
        
        // Add styles
        const styles = `
            #vooo-pwa-welcome {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #4361ee 100%);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: voooFadeIn 0.5s ease;
            }
            
            .vooo-welcome-content {
                text-align: center;
                color: white;
                padding: 40px 20px;
                max-width: 500px;
                width: 100%;
                position: relative;
            }
            
            .vooo-welcome-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 2rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                line-height: 1;
                padding: 0;
            }
            
            .vooo-welcome-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
            
            .vooo-welcome-logo-container {
                margin-bottom: 30px;
                animation: voooScaleIn 0.6s ease 0.2s both;
            }
            
            .vooo-welcome-logo {
                width: 150px;
                height: 150px;
                border-radius: 30px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                object-fit: cover;
            }
            
            .vooo-welcome-title {
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 10px;
                animation: voooSlideUp 0.6s ease 0.3s both;
            }
            
            .vooo-welcome-subtitle {
                font-size: 1.2rem;
                margin-bottom: 40px;
                opacity: 0.9;
                animation: voooSlideUp 0.6s ease 0.4s both;
            }
            
            .vooo-welcome-features {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin-bottom: 40px;
                flex-wrap: wrap;
                animation: voooSlideUp 0.6s ease 0.5s both;
            }
            
            .vooo-feature {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            
            .vooo-feature i {
                font-size: 2rem;
                background: rgba(255, 255, 255, 0.2);
                padding: 15px;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .vooo-feature span {
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .vooo-install-button {
                background: white;
                color: #0D47A1;
                border: none;
                border-radius: 50px;
                padding: 18px 40px;
                font-size: 1.2rem;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 20px;
                animation: voooSlideUp 0.6s ease 0.6s both;
            }
            
            .vooo-install-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            }
            
            .vooo-install-button i {
                font-size: 1.3rem;
            }
            
            .vooo-maybe-later {
                background: transparent;
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 50px;
                padding: 12px 30px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                animation: voooSlideUp 0.6s ease 0.7s both;
            }
            
            .vooo-maybe-later:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: white;
            }
            
            @keyframes voooFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes voooScaleIn {
                from { 
                    opacity: 0; 
                    transform: scale(0.5); 
                }
                to { 
                    opacity: 1; 
                    transform: scale(1); 
                }
            }
            
            @keyframes voooSlideUp {
                from { 
                    opacity: 0; 
                    transform: translateY(30px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            /* Mobile Responsive */
            @media (max-width: 480px) {
                .vooo-welcome-title {
                    font-size: 2rem;
                }
                
                .vooo-welcome-subtitle {
                    font-size: 1rem;
                }
                
                .vooo-welcome-logo {
                    width: 120px;
                    height: 120px;
                }
                
                .vooo-welcome-features {
                    gap: 20px;
                }
                
                .vooo-feature i {
                    width: 50px;
                    height: 50px;
                    font-size: 1.5rem;
                    padding: 12px;
                }
                
                .vooo-install-button {
                    font-size: 1.1rem;
                    padding: 16px 35px;
                }
            }
        `;
        
        // Inject styles
        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);
        
        // Append to body
        document.body.appendChild(overlay);
        
        // Add event listeners
        document.getElementById('vooo-close-welcome').addEventListener('click', () => {
            this.closeWelcomeScreen();
        });
        
        document.getElementById('vooo-maybe-later').addEventListener('click', () => {
            this.closeWelcomeScreen();
        });
        
        document.getElementById('vooo-install-now').addEventListener('click', () => {
            this.installPWA();
        });
        
        // Auto-close after 30 seconds if no action
        setTimeout(() => {
            if (document.getElementById('vooo-pwa-welcome')) {
                this.closeWelcomeScreen();
            }
        }, 30000);
    }

    closeWelcomeScreen() {
        const overlay = document.getElementById('vooo-pwa-welcome');
        if (overlay) {
            // Save decline timestamp for 5-minute reminder
            localStorage.setItem('vooo_pwa_declined', Date.now().toString());
            console.log('Vooo AI PWA: User declined, will remind in 5 minutes');
            
            overlay.style.animation = 'voooFadeOut 0.3s ease';
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                
                // Schedule next reminder after 5 minutes
                this.scheduleWelcomeScreen();
            }, 300);
        }
    }

    async installPWA() {
        console.log('Vooo AI PWA: Install button clicked');
        
        // For browsers that support beforeinstallprompt
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log(`Vooo AI PWA: User choice: ${outcome}`);
            
            if (outcome === 'accepted') {
                this.markAsInstalled();
                this.closeWelcomeScreen();
            }
            
            this.deferredPrompt = null;
        }
        // For iOS Safari
        else if (this.isIOS && this.isSafari) {
            this.closeWelcomeScreen();
            this.showIOSInstructions();
        }
        // For other browsers
        else {
            this.closeWelcomeScreen();
            this.showBrowserInstructions();
        }
    }

    showIOSInstructions() {
        const instructions = document.createElement('div');
        instructions.id = 'vooo-ios-instructions';
        instructions.innerHTML = `
            <div class="vooo-instructions-overlay">
                <div class="vooo-instructions-content">
                    <button class="vooo-instructions-close" id="close-ios-inst">×</button>
                    
                    <div class="vooo-instructions-header">
                        <i class="fas fa-mobile-alt"></i>
                        <h2>Install Vooo AI on iOS</h2>
                    </div>
                    
                    <div class="vooo-instructions-steps">
                        <div class="vooo-step">
                            <div class="vooo-step-number">1</div>
                            <div class="vooo-step-text">
                                <p>Tap the <i class="fas fa-share"></i> <strong>Share</strong> button at the bottom of Safari</p>
                            </div>
                        </div>
                        
                        <div class="vooo-step">
                            <div class="vooo-step-number">2</div>
                            <div class="vooo-step-text">
                                <p>Scroll down and tap <strong>"Add to Home Screen"</strong></p>
                            </div>
                        </div>
                        
                        <div class="vooo-step">
                            <div class="vooo-step-number">3</div>
                            <div class="vooo-step-text">
                                <p>Tap <strong>"Add"</strong> in the top-right corner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const styles = `
            .vooo-instructions-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: voooFadeIn 0.3s ease;
            }
            
            .vooo-instructions-content {
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 400px;
                width: 90%;
                position: relative;
            }
            
            .vooo-instructions-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: #f0f0f0;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
                padding: 0;
            }
            
            .vooo-instructions-header {
                text-align: center;
                margin-bottom: 25px;
            }
            
            .vooo-instructions-header i {
                font-size: 3rem;
                color: #0D47A1;
                margin-bottom: 10px;
            }
            
            .vooo-instructions-header h2 {
                color: #333;
                font-size: 1.5rem;
                margin: 0;
            }
            
            .vooo-step {
                display: flex;
                gap: 15px;
                margin-bottom: 20px;
                align-items: flex-start;
            }
            
            .vooo-step-number {
                background: #0D47A1;
                color: white;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 1.2rem;
                flex-shrink: 0;
            }
            
            .vooo-step-text {
                flex: 1;
            }
            
            .vooo-step-text p {
                margin: 0;
                color: #555;
                line-height: 1.6;
            }
            
            .vooo-step-text strong {
                color: #0D47A1;
            }
        `;
        
        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);
        
        document.body.appendChild(instructions);
        
        document.getElementById('close-ios-inst').addEventListener('click', () => {
            instructions.remove();
        });
        
        // Auto-close after 20 seconds
        setTimeout(() => {
            if (instructions.parentNode) {
                instructions.remove();
            }
        }, 20000);
    }

    showBrowserInstructions() {
        const instructions = document.createElement('div');
        instructions.id = 'vooo-browser-instructions';
        instructions.innerHTML = `
            <div class="vooo-instructions-overlay">
                <div class="vooo-instructions-content">
                    <button class="vooo-instructions-close" id="close-browser-inst">×</button>
                    
                    <div class="vooo-instructions-header">
                        <i class="fas fa-download"></i>
                        <h2>Install Vooo AI</h2>
                    </div>
                    
                    <p style="text-align: center; color: #555; margin: 0;">
                        Look for the <strong>install icon</strong> in your browser's menu (usually ⋮ or ⋯) 
                        and select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(instructions);
        
        document.getElementById('close-browser-inst').addEventListener('click', () => {
            instructions.remove();
        });
        
        setTimeout(() => {
            if (instructions.parentNode) {
                instructions.remove();
            }
        }, 10000);
    }
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes voooFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Vooo AI PWA: DOM loaded, initializing...');
        new VoooPWAInstaller();
    });
} else {
    console.log('Vooo AI PWA: DOM already loaded, initializing...');
    new VoooPWAInstaller();
}
