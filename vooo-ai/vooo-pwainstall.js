// vooo-pwainstall.js - SIMPLE VERSION
console.log('Vooo AI PWA installer loading...');

let deferredPrompt;
const installButton = document.createElement('button');

// Create and style the button
function createInstallButton() {
    installButton.id = 'vooo-install-btn';
    installButton.innerHTML = '📱 Install Vooo AI';
    installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0D47A1;
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: none;
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(installButton);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Button click handler
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('Vooo AI installed');
            installButton.style.display = 'none';
        }
        
        deferredPrompt = null;
    });
}

// Check if already installed
function isPWAInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone ||
           document.referrer.includes('android-app://');
}

// Show button after delay
function showButtonWithDelay() {
    if (isPWAInstalled()) {
        console.log('Vooo AI PWA already installed');
        return;
    }
    
    setTimeout(() => {
        installButton.style.display = 'block';
        console.log('Showing install button');
        
        // Auto-hide after 30 seconds
        setTimeout(() => {
            installButton.style.display = 'none';
        }, 30000);
    }, 10000); // Show after 10 seconds
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking PWA...');
    
    if (isPWAInstalled()) {
        console.log('Already in PWA mode');
        return;
    }
    
    // Create button
    createInstallButton();
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt event fired');
        e.preventDefault();
        deferredPrompt = e;
        
        // Show button
        showButtonWithDelay();
    });
    
    // Check if user just visited (show button anyway after delay)
    showButtonWithDelay();
    
    // Also listen for app installed
    window.addEventListener('appinstalled', () => {
        console.log('Vooo AI PWA was installed');
        installButton.style.display = 'none';
        localStorage.setItem('vooo_pwa_installed', 'true');
    });
});
