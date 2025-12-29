// ====== DROPDOWN MENU FUNCTIONALITY ======
const hamburger = document.getElementById('hamburger');
const dropdown = document.getElementById('dropdown');

// Toggle dropdown menu
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !hamburger.contains(e.target)) {
        dropdown.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close dropdown when clicking on a link
dropdown.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        dropdown.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ====== SMOOTH SCROLL FOR HOME LINK ======
const homeNav = document.querySelector('.home-nav');
homeNav.addEventListener('click', (e) => {
    e.preventDefault();
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// ====== SERVICE CARDS HOVER EFFECTS ======
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    // Add click effect
    card.addEventListener('click', function() {
        if (this.classList.contains('storage-card')) {
            // For storage card, redirect to cloud-storage.html
            window.location.href = 'cloud-storage.html';
        } else {
            // For photo card, add a visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }
    });
    
    // Keyboard navigation
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// ====== RESPONSIVE HEADER BEHAVIOR ======
function updateHeaderForMobile() {
    const homeNav = document.querySelector('.home-nav');
    if (window.innerWidth <= 768) {
        homeNav.style.display = 'block';
    } else {
        homeNav.style.display = 'inline-block';
    }
}

// Initial check
updateHeaderForMobile();

// Update on resize
window.addEventListener('resize', updateHeaderForMobile);

// ====== AI CHAT FUNCTIONALITY (Basic) ======
const chatToggle = document.getElementById('chat-toggle-btn');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');

// Toggle chat window
if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });
}

// Close chat window
if (closeChat && chatWindow) {
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
}

// ====== PAGE LOAD ANIMATIONS ======
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add staggered animation to service cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    
    // Set focus to first interactive element for accessibility
    setTimeout(() => {
        const firstFocusable = document.querySelector('.home-nav') || 
                              document.querySelector('.hamburger');
        if (firstFocusable) {
            firstFocusable.setAttribute('tabindex', '0');
        }
    }, 1000);
});

// ====== SCROLL TO TOP FUNCTION ======
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ====== TOUCH DEVICE SUPPORT ======
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeLength = touchStartY - touchEndY;
    
    // If swiping up significantly on mobile, close dropdown
    if (swipeLength > 50 && window.innerWidth <= 768) {
        dropdown.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// ====== KEYBOARD NAVIGATION ======
document.addEventListener('keydown', (e) => {
    // Close dropdown with Escape key
    if (e.key === 'Escape' && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Navigate dropdown with arrow keys when open
    if (dropdown.classList.contains('active')) {
        const dropdownLinks = dropdown.querySelectorAll('a');
        const focusedElement = document.activeElement;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            for (let i = 0; i < dropdownLinks.length; i++) {
                if (dropdownLinks[i] === focusedElement) {
                    if (i < dropdownLinks.length - 1) {
                        dropdownLinks[i + 1].focus();
                    }
                    break;
                }
            }
        }
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            for (let i = 0; i < dropdownLinks.length; i++) {
                if (dropdownLinks[i] === focusedElement) {
                    if (i > 0) {
                        dropdownLinks[i - 1].focus();
                    }
                    break;
                }
            }
        }
    }
});

// ====== PERFORMANCE OPTIMIZATION ======
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateHeaderForMobile, 250);
});

// ====== ACCESSIBILITY ENHANCEMENTS ======
// Add ARIA labels
if (hamburger) {
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'dropdown');
}

// Update aria-expanded attribute when dropdown toggles
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isExpanded = dropdown.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded.toString());
        }
    });
});

if (dropdown) {
    observer.observe(dropdown, { attributes: true });
}

// Make service cards keyboard accessible
serviceCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    
    // Add ARIA labels based on card type
    if (card.classList.contains('storage-card')) {
        card.setAttribute('aria-label', 'Secure Cloud Storage - Click to view details');
    } else if (card.classList.contains('photo-card')) {
        card.setAttribute('aria-label', 'Event Guest Photo Storage');
    }
});

console.log('Odelya website script loaded successfully!');
