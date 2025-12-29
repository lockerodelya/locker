// script.js - Main JavaScript for Odelya Locker System

document.addEventListener('DOMContentLoaded', function() {
    // ====== VARIABLE DECLARATIONS ======
    const hamburger = document.getElementById('hamburger');
    const dropdown = document.getElementById('dropdown');
    
    // ====== DROPDOWN MENU FUNCTIONALITY ======
    
    // Toggle dropdown when hamburger is clicked
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !hamburger.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Close dropdown when a menu item is clicked
    dropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            dropdown.classList.remove('show');
        });
    });
    
    // ====== SMOOTH SCROLLING FOR ANCHOR LINKS ======
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ====== STORAGE CARD CLICK HANDLER ======
    
    // Storage card click handler - redirects to cloud-storage.html
    const storageCard = document.querySelector('.storage-card');
    if (storageCard) {
        storageCard.addEventListener('click', function() {
            window.location.href = 'cloud-storage.html';
        });
    }
    
    // ====== RESPONSIVE BEHAVIOR ======
    
    // Adjust hero text wrapping on mobile
    function adjustHeroForMobile() {
        const heroParagraph = document.querySelector('.hero p');
        if (window.innerWidth <= 768) {
            // On mobile, ensure text wraps properly
            if (heroParagraph) {
                heroParagraph.style.whiteSpace = 'normal';
                heroParagraph.style.padding = '0 15px';
            }
        } else {
            // On desktop, keep original
            if (heroParagraph) {
                heroParagraph.style.whiteSpace = 'nowrap';
                heroParagraph.style.padding = '0 30px';
            }
        }
    }
    
    // Initial adjustment
    adjustHeroForMobile();
    
    // Adjust on resize
    window.addEventListener('resize', adjustHeroForMobile);
    
    // ====== BASIC FORM VALIDATION FOR ANY FORMS ON PAGE ======
    
    // Function to validate name (only letters, spaces, dots)
    function validateNameInput(input) {
        if (input) {
            input.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^A-Za-z\s\.]/g, '');
            });
        }
    }
    
    // Function to validate phone (only numbers)
    function validatePhoneInput(input) {
        if (input) {
            input.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }
    }
    
    // Function to validate Aadhaar (only numbers)
    function validateAadhaarInput(input) {
        if (input) {
            input.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }
    }
    
    // Function to validate PAN number format
    function validatePANInput(input) {
        if (input) {
            input.addEventListener('input', function(e) {
                // Convert to uppercase and remove non-alphanumeric characters
                let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                
                // Limit to 10 characters
                if (value.length > 10) {
                    value = value.substring(0, 10);
                }
                
                e.target.value = value;
            });
        }
    }
    
    // ====== INITIALIZE ANY FORM VALIDATIONS IF FORMS EXIST ======
    
    // Check if we're on a page with forms and initialize validations
    const nameInput = document.getElementById('client-name');
    const phoneInput = document.getElementById('phone');
    const aadhaarInput = document.getElementById('aadhaar');
    const panInput = document.getElementById('pan');
    
    validateNameInput(nameInput);
    validatePhoneInput(phoneInput);
    validateAadhaarInput(aadhaarInput);
    validatePANInput(panInput);
    
    // ====== ENHANCED SERVICE CARDS ======
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('storage-card')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('storage-card')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (this.classList.contains('storage-card')) {
                    window.location.href = 'cloud-storage.html';
                }
            }
        });
    });
    
    // ====== FOOTER YEAR AUTO-UPDATE ======
    
    // Update copyright year automatically
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace(/\d{4}/, currentYear);
    }
    
    // ====== BASIC PAGE LOAD ANIMATIONS ======
    
    // Add fade-in animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // ====== FIXED HEADER SCROLL BEHAVIOR ======
    
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ====== TOUCH DEVICE SUPPORT ======
    
    // Improve touch experience for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll('.service-card, .home-nav, .dropdown a');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            });
            
            element.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }
    
    // ====== CONSOLE MESSAGE ======
    
    console.log('Odelya Locker System loaded successfully!');
    console.log('Features available:');
    console.log('- Responsive dropdown menu');
    console.log('- Smooth scrolling');
    console.log('- Mobile-friendly layout');
    console.log('- Service card interactions');
    console.log('- Form validations');
});
