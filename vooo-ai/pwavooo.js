// ============================================
// VOOO AI PWA INSTALLER — Clean & Reliable
// Version: 6.0
// ============================================

(function () {

    // ── Config ──
    const SHOW_DELAY_MS      = 6000;   // Show button 6 seconds after page load
    const AUTO_HIDE_MS       = 30000;  // Auto-hide button after 30 seconds
    const DECLINED_WAIT_MS   = 5 * 60 * 1000; // Wait 5 min after user closes

    // ── State ──
    let deferredPrompt  = null;  // Holds the browser install event
    let buttonVisible   = false; // Is the install button currently showing?
    let installButton   = null;  // Reference to the DOM button

    const isIOS    = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // ── Already installed? Do nothing ──
    function isInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               navigator.standalone === true ||
               localStorage.getItem('vooo_pwa_installed') === 'true';
    }

    // ── Can we show the button right now? ──
    function canShow() {
        if (isInstalled()) return false;
        if (buttonVisible)  return false;

        const lastDeclined = localStorage.getItem('vooo_pwa_declined');
        if (lastDeclined) {
            const elapsed = Date.now() - parseInt(lastDeclined);
            if (elapsed < DECLINED_WAIT_MS) return false;
        }
        return true;
    }

    // ════════════════════════════════════════
    // CAPTURE THE INSTALL PROMPT
    // This is the KEY event — must be captured before calling prompt()
    // ════════════════════════════════════════
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();                // Stop browser's default mini-infobar
        deferredPrompt = e;                // Save it — this is what makes Install work
        console.log('✅ Vooo PWA: Install prompt captured');

        // Schedule showing the button
        setTimeout(() => {
            if (canShow()) showInstallButton();
        }, SHOW_DELAY_MS);
    });

    // ── App installed successfully ──
    window.addEventListener('appinstalled', () => {
        console.log('✅ Vooo PWA: Installed successfully');
        localStorage.setItem('vooo_pwa_installed', 'true');
        hideInstallButton();
    });

    // ── Standalone check on load ──
    window.addEventListener('load', () => {
        if (isInstalled()) {
            console.log('✅ Vooo PWA: Already installed');
            return;
        }

        // iOS Safari — show manual instructions after delay (no beforeinstallprompt on iOS)
        if (isIOS && isSafari && canShow()) {
            setTimeout(() => {
                if (canShow()) showIOSHint();
            }, SHOW_DELAY_MS);
        }
    });

    // ════════════════════════════════════════
    // SHOW INSTALL BUTTON
    // ════════════════════════════════════════
    function showInstallButton() {
        if (!canShow()) return;
        if (buttonVisible)  return;

        buttonVisible   = true;
        installButton   = document.createElement('div');

        installButton.id        = 'vooo-pwa-btn-wrapper';
        installButton.innerHTML = `
            <button id="vooo-pwa-install" title="Install Vooo AI App">
                ⬇ Install Vooo AI
            </button>
            <button id="vooo-pwa-close" title="Close">✕</button>
        `;

        // Styles
        installButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 6px;
            animation: voooFadeUp 0.4s ease;
        `;

        // Inject CSS once
        if (!document.getElementById('vooo-pwa-style')) {
            const style       = document.createElement('style');
            style.id          = 'vooo-pwa-style';
            style.textContent = `
                @keyframes voooFadeUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
                }
                #vooo-pwa-install {
                    background: linear-gradient(135deg, #0D47A1, #4361ee);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    padding: 14px 28px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(13,71,161,0.45);
                    white-space: nowrap;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                #vooo-pwa-install:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 24px rgba(13,71,161,0.55);
                }
                #vooo-pwa-close {
                    background: #c62828;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    transition: background 0.2s;
                }
                #vooo-pwa-close:hover { background: #b71c1c; }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(installButton);

        // ── Install click ──
        document.getElementById('vooo-pwa-install').addEventListener('click', triggerInstall);

        // ── Close click ──
        document.getElementById('vooo-pwa-close').addEventListener('click', () => {
            localStorage.setItem('vooo_pwa_declined', Date.now().toString());
            hideInstallButton();
        });

        // ── Auto-hide after 30 seconds ──
        setTimeout(() => {
            if (buttonVisible) {
                localStorage.setItem('vooo_pwa_declined', Date.now().toString());
                hideInstallButton();
            }
        }, AUTO_HIDE_MS);

        console.log('✅ Vooo PWA: Install button shown');
    }

    // ════════════════════════════════════════
    // TRIGGER INSTALL
    // ════════════════════════════════════════
    async function triggerInstall() {
        if (!deferredPrompt) {
            // No prompt available — show manual instructions
            console.warn('⚠️ Vooo PWA: No deferred prompt — showing manual instructions');
            hideInstallButton();
            showManualInstructions();
            return;
        }

        try {
            // Show browser's native install dialog
            deferredPrompt.prompt();

            const { outcome } = await deferredPrompt.userChoice;
            console.log('Vooo PWA: User choice:', outcome);

            if (outcome === 'accepted') {
                localStorage.setItem('vooo_pwa_installed', 'true');
                console.log('✅ Vooo PWA: User accepted install');
            } else {
                localStorage.setItem('vooo_pwa_declined', Date.now().toString());
                console.log('ℹ️ Vooo PWA: User dismissed install');
            }
        } catch (err) {
            console.error('❌ Vooo PWA: prompt() error:', err);
            showManualInstructions();
        } finally {
            deferredPrompt = null; // Can only be used once
            hideInstallButton();
        }
    }

    // ════════════════════════════════════════
    // HIDE BUTTON
    // ════════════════════════════════════════
    function hideInstallButton() {
        if (installButton && installButton.parentNode) {
            installButton.style.opacity    = '0';
            installButton.style.transition = 'opacity 0.3s';
            setTimeout(() => {
                if (installButton && installButton.parentNode) {
                    installButton.parentNode.removeChild(installButton);
                }
                installButton = null;
                buttonVisible = false;
            }, 300);
        } else {
            installButton = null;
            buttonVisible = false;
        }
    }

    // ════════════════════════════════════════
    // iOS HINT (Safari doesn't support beforeinstallprompt)
    // ════════════════════════════════════════
    function showIOSHint() {
        if (!canShow()) return;

        const hint    = document.createElement('div');
        hint.id       = 'vooo-ios-hint';
        hint.innerHTML = `
            <div style="
                background: linear-gradient(135deg,#0D47A1,#4361ee);
                color: white;
                padding: 22px 24px;
                border-radius: 16px;
                max-width: 300px;
                text-align: center;
                position: relative;
                box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            ">
                <button id="vooo-ios-close" style="
                    position:absolute; top:-8px; right:-8px;
                    background:#c62828; color:white; border:none;
                    border-radius:50%; width:26px; height:26px;
                    font-size:1rem; cursor:pointer; line-height:1;
                ">✕</button>
                <div style="font-size:1.6rem; margin-bottom:10px;">📲</div>
                <strong style="font-size:1.05rem; display:block; margin-bottom:12px;">Install Vooo AI</strong>
                <p style="font-size:0.88rem; margin:0 0 8px; text-align:left;">1. Tap the <strong>Share</strong> button (↑) at the bottom</p>
                <p style="font-size:0.88rem; margin:0 0 8px; text-align:left;">2. Scroll and tap <strong>"Add to Home Screen"</strong></p>
                <p style="font-size:0.88rem; margin:0; text-align:left;">3. Tap <strong>"Add"</strong> to install</p>
            </div>
        `;

        hint.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            animation: voooFadeUp 0.4s ease;
        `;

        document.body.appendChild(hint);

        document.getElementById('vooo-ios-close').addEventListener('click', () => {
            localStorage.setItem('vooo_pwa_declined', Date.now().toString());
            hint.style.opacity = '0';
            setTimeout(() => { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 300);
        });

        // Auto-hide after 30 seconds
        setTimeout(() => {
            if (hint.parentNode) {
                hint.style.opacity = '0';
                setTimeout(() => { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 300);
                localStorage.setItem('vooo_pwa_declined', Date.now().toString());
            }
        }, AUTO_HIDE_MS);
    }

    // ════════════════════════════════════════
    // MANUAL INSTRUCTIONS (Android Chrome fallback)
    // ════════════════════════════════════════
    function showManualInstructions() {
        const box    = document.createElement('div');
        box.id       = 'vooo-manual-hint';
        box.innerHTML = `
            <div style="
                background: linear-gradient(135deg,#0D47A1,#4361ee);
                color: white;
                padding: 22px 24px;
                border-radius: 16px;
                max-width: 300px;
                text-align: center;
                position: relative;
                box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            ">
                <button id="vooo-manual-close" style="
                    position:absolute; top:-8px; right:-8px;
                    background:#c62828; color:white; border:none;
                    border-radius:50%; width:26px; height:26px;
                    font-size:1rem; cursor:pointer; line-height:1;
                ">✕</button>
                <div style="font-size:1.6rem; margin-bottom:10px;">📲</div>
                <strong style="font-size:1.05rem; display:block; margin-bottom:12px;">Install Vooo AI</strong>
                <p style="font-size:0.88rem; margin:0 0 8px; text-align:left;">1. Tap the browser menu <strong>(⋮)</strong> top-right</p>
                <p style="font-size:0.88rem; margin:0 0 8px; text-align:left;">2. Tap <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong></p>
                <p style="font-size:0.88rem; margin:0; text-align:left;">3. Follow the prompts to install</p>
            </div>
        `;

        box.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            animation: voooFadeUp 0.4s ease;
        `;

        document.body.appendChild(box);

        document.getElementById('vooo-manual-close').addEventListener('click', () => {
            box.style.opacity = '0';
            setTimeout(() => { if (box.parentNode) box.parentNode.removeChild(box); }, 300);
        });

        setTimeout(() => {
            if (box.parentNode) {
                box.style.opacity = '0';
                setTimeout(() => { if (box.parentNode) box.parentNode.removeChild(box); }, 300);
            }
        }, 15000);
    }

    console.log('✅ Vooo PWA installer ready');

})();
