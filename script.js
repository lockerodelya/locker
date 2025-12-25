// script.js - Main JavaScript for Odelya Locker System

document.addEventListener('DOMContentLoaded', function() {
    // ====== IMPORT QA DATABASE ======
    // Ensure qa-data.js is loaded before this file
    // The qaDatabase variable should be available globally from qa-data.js
    
    // ====== VARIABLE DECLARATIONS ======
    const hamburger = document.getElementById('hamburger');
    const dropdown = document.getElementById('dropdown');
    const paymentDropdown = document.getElementById('payment-dropdown');
    const paymentSection = document.getElementById('payment-section');
    const closePaymentBtn = document.getElementById('close-payment');
    const proceedToFormBtn = document.getElementById('proceed-to-form');
    const backToTermsBtn = document.getElementById('back-to-terms');
    const clientForm = document.getElementById('client-form');
    const submitFormBtn = document.getElementById('submit-form');
    const confirmTerminateBtn = document.getElementById('confirm-terminate');
    const cancelTerminateBtn = document.getElementById('cancel-terminate');
    const storageCard = document.querySelector('.storage-card');
    const panInput = document.getElementById('pan');
    const panError = document.getElementById('pan-error');
    
    const steps = document.querySelectorAll('.payment-step');
    let currentStep = 1;
    
    // ====== PLAN SELECTION VARIABLES ======
    let selectedPlan = null;
    const planModal = document.getElementById('plan-confirm-modal');
    const planModalText = document.getElementById('plan-confirm-text');
    const planConfirmYes = document.getElementById('plan-confirm-yes');
    const planConfirmNo = document.getElementById('plan-confirm-no');
    const modalOverlay = document.getElementById('modal-overlay');
    
    // ====== STORAGE GB FIELD VARIABLES ======
    const cloudServiceRadio = document.getElementById('cloud-service');
    const itServiceRadio = document.getElementById('it-service');
    const storageGbGroup = document.getElementById('storage-gb-group');
    const storageGbInput = document.getElementById('storage-gb');
    const storageGbError = document.getElementById('storage-gb-error');
    const storageDetails = document.getElementById('storage-details');
    
    // ====== FORM VALIDATION VARIABLES ======
    const termsAgree = document.getElementById('agree-terms');
    const termsDisagree = document.getElementById('disagree-terms');
    const finalAgree = document.getElementById('final-agree');
    const finalDisagree = document.getElementById('final-disagree');
    const proceedToPaymentBtn = document.getElementById('proceed-to-payment');
    const disagreeConfirmation = document.getElementById('disagree-confirmation');
    
    // ====== CONTACT FORM VARIABLES ======
    const contactForm = document.getElementById('contactForm');
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactPhone = document.getElementById('contact-phone');
    const contactSubject = document.getElementById('contact-subject');
    const contactMessage = document.getElementById('contact-message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const subjectCount = document.getElementById('subject-count');
    const messageCount = document.getElementById('message-count');
    
    // ====== OTHER VARIABLES ======
    const dobInput = document.getElementById('dob');
    const aadhaarInput = document.getElementById('aadhaar');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('client-name');

    // Initialize Step 2 agreement
    setupStep2Agreement();

    // Initialize duration validation
    setupDurationValidation();
    
    // ====== LOADING FUNCTIONS ======
    function showLoading() {
        submitFormBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitFormBtn.disabled = true;
    }

    function hideLoading() {
        submitFormBtn.innerHTML = 'Submit';
        submitFormBtn.disabled = false;
    }
    
    // ====== FUNCTION DEFINITIONS ======
    if (panInput) {
        panInput.addEventListener('input', function(e) {
            // Convert to uppercase and remove non-alphanumeric characters
            let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            
            // Limit to 10 characters
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            // Format: First 5 letters, next 4 numbers, last 1 letter
            if (value.length > 5) {
                const firstPart = value.substring(0, 5);
                const secondPart = value.substring(5, 9).replace(/[^0-9]/g, '');
                const thirdPart = value.substring(9).replace(/[^A-Z]/g, '');
                value = firstPart + secondPart + thirdPart;
            }
            
            e.target.value = value;
            
            // Clear error when user types
            if (panError) panError.style.display = 'none';
            this.classList.remove('error');
        });
        
        panInput.addEventListener('blur', function() {
            validatePAN();
        });
    }

    function validatePAN() {
        if (!panInput) return true;
        
        const value = panInput.value.trim();
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        
        if (value === '') {
            if (panError) {
                panError.textContent = 'PAN Number is required';
                panError.style.display = 'block';
            }
            panInput.classList.add('error');
            return false;
        } else if (!panRegex.test(value)) {
            if (panError) {
                panError.textContent = 'Invalid PAN format. Use format: ABCDE1234F';
                panError.style.display = 'block';
            }
            panInput.classList.add('error');
            return false;
        } else {
            if (panError) panError.style.display = 'none';
            panInput.classList.remove('error');
            return true;
        }
    }
    
    // Function to load terms and conditions
    function loadTermsAndConditions() {
        const termsContent = document.getElementById('terms-content');
        fetch('agreement.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                const paragraphs = text.split('\n').filter(line => line.trim());
                const formattedText = paragraphs.map(para => `<p>${para}</p>`).join('');
                termsContent.innerHTML = formattedText;
            })
            .catch(error => {
                console.error('Error loading terms:', error);
                termsContent.innerHTML = `
                    <p style="color: #e74c3c; text-align: center;">
                        <i class="fas fa-exclamation-triangle"></i><br>
                        Unable to load terms and conditions.<br>
                        Please contact support:<br>
                        Email: care.ompl@gmail.com<br>
                        Phone: +91-96741 30001
                    </p>
                `;
            });
    }

// Function to handle Step 2 agreement
function setupStep2Agreement() {
    if (!finalAgree || !finalDisagree || !proceedToPaymentBtn) return;
    
    // Enable/disable proceed button based on selection
    [finalAgree, finalDisagree].forEach(radio => {
        radio.addEventListener('change', function() {
            proceedToPaymentBtn.disabled = !finalAgree.checked;
            
            // Handle disagree selection immediately
            if (finalDisagree.checked) {
                showMessage('Thanks. Your transaction process is being terminated.', 3000);
                // Reset form after message
                setTimeout(() => {
                    paymentSection.style.display = 'none';
                    const homeSection = document.querySelector('#home');
                    const headerHeight = document.querySelector('header').offsetHeight;
                    window.scrollTo({
                        top: homeSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }, 3000);
            }
        });
    });
    
    // Initialize button state
    proceedToPaymentBtn.disabled = true;
}

// Handle proceed to payment button
if (proceedToPaymentBtn) {
    proceedToPaymentBtn.addEventListener('click', function() {
        if (finalAgree.checked) {
            // Validate form first
            if (!validateAllFormFields()) {
                alert('Please fill all required fields correctly.');
                return;
            }
            
            showStep(3);
        }
    });
}
    
    // Show step function
    function showStep(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        const stepToShow = document.querySelector(`.step-${stepNumber}`);
        if (stepToShow) {
            stepToShow.classList.add('active');
            currentStep = stepNumber;
            
            // Scroll to top of payment section
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: paymentSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    }
    
    // Show message box
    function showMessage(message, duration = 3000) {
        const messageBox = document.getElementById('message-box');
        const messageText = document.getElementById('message-text');
        const headerHeight = document.querySelector('header').offsetHeight;
        
        messageText.textContent = message;
        messageBox.classList.add('show');
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'message-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
        `;
        document.body.appendChild(overlay);
        
        // Remove after duration
        setTimeout(() => {
            messageBox.classList.remove('show');
            overlay.remove();
            
            // If it's a termination message, go to home
            if (message.includes('terminated')) {
                paymentSection.style.display = 'none';
                const homeSection = document.querySelector('#home');
                window.scrollTo({
                    top: homeSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }, duration);
    }
    
    // ====== PLAN SELECTION FROM PRICING TABLE ======
    
    // Function to show modal
    function showPlanModal(plan) {
        planModalText.textContent = `Confirm ${plan.storageGB}GB Storage Plan?\n${plan.type}: ₹${plan.amount}`;
        planModal.classList.add('show');
        modalOverlay.classList.add('show');
        selectedPlan = plan;
    }
    
    // Function to hide modal
    function hidePlanModal() {
        planModal.classList.remove('show');
        modalOverlay.classList.remove('show');
    }
    
    // Add click handlers to all Buy buttons
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the table row
            const row = this.closest('tr');
            
            // Extract plan details from the row
            const storageGB = row.querySelector('.storage-size').textContent.trim();
            const users = row.cells[1].textContent.trim();
            
            // Determine if this is Monthly or Yearly button
            // Check which cell contains the button
            const cellIndex = this.parentElement.cellIndex;
            let amount = '';
            let type = '';
            
            if (cellIndex === 3) { // Monthly button (in 4th cell)
                amount = row.cells[2].textContent.trim();
                type = 'Monthly';
            } else { // Yearly button (in 6th cell)
                amount = row.cells[4].textContent.trim();
                type = 'Yearly';
            }
            
            // Remove 'Rs. ' if present and convert to number
            amount = amount.replace('Rs. ', '').replace(/[,]/g, '');
            
            // Create plan object
            const plan = {
                storageGB: parseInt(storageGB),
                users: parseInt(users),
                amount: parseFloat(amount),
                type: type, // 'Monthly' or 'Yearly'
                duration: type === 'Monthly' ? 1 : 12 // months
            };
            
            // Show confirmation modal
            showPlanModal(plan);
        });
    });
    
    // Handle modal Yes button
    planConfirmYes.addEventListener('click', function() {
        hidePlanModal();
        
        // Show payment section
        paymentSection.style.display = 'block';
        showStep(1);
        loadTermsAndConditions();
        
        // Scroll to payment section
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
            top: paymentSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
    
    // Handle modal No button - UPDATED to go to Cloud Storage Pricing section
    planConfirmNo.addEventListener('click', function() {
        hidePlanModal();
        
        // Redirect to Cloud Storage Pricing section
        const storageSection = document.querySelector('#cloud-storage-details');
        const headerHeight = document.querySelector('header').offsetHeight;
        if (storageSection) {
            window.scrollTo({
                top: storageSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        } else {
            // Fallback to home if section not found
            const homeSection = document.querySelector('#home');
            window.scrollTo({
                top: homeSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', hidePlanModal);
    
    // ====== PRE-FILL FORM WITH SELECTED PLAN ======
    
    // Function to pre-fill form with plan data
    function prefillFormWithPlan(plan) {
        if (!plan) return;
        
        // Set Cloud Storage Service as selected
        if (cloudServiceRadio) {
            cloudServiceRadio.checked = true;
            // Trigger change event to show storage fields
            const event = new Event('change');
            cloudServiceRadio.dispatchEvent(event);
        }
        
        // Pre-fill storage GB (make it readonly)
        if (storageGbInput) {
            storageGbInput.value = plan.storageGB;
            storageGbInput.readOnly = true;
            storageGbInput.title = 'Storage size is fixed for this plan';
            
            // Add a lock icon visual indicator
            const storageGroup = document.getElementById('storage-gb-group');
            if (storageGroup) {
                const lockIcon = document.createElement('span');
                lockIcon.innerHTML = ' <i class="fas fa-lock" style="color: #27ae60;"></i>';
                lockIcon.style.fontSize = '0.9rem';
                storageGroup.querySelector('label').appendChild(lockIcon);
            }
        }
        
        // Pre-fill duration based on plan type
        if (plan.type === 'Monthly') {
            const monthsInput = document.getElementById('months');
            if (monthsInput) {
                monthsInput.value = 1;
                monthsInput.readOnly = true;
                monthsInput.classList.add('disabled-field');
            }
            const yearsInput = document.getElementById('years');
            if (yearsInput) {
                yearsInput.value = 0;
                yearsInput.readOnly = true;
                yearsInput.classList.add('disabled-field');
            }
            
            // Update duration labels
            const durationLabels = document.querySelectorAll('.duration-input label');
            durationLabels.forEach(label => {
                label.style.color = '#666';
                label.innerHTML = label.textContent + ' <i class="fas fa-lock" style="font-size: 0.8rem; color: #27ae60;"></i>';
            });
        } else if (plan.type === 'Yearly') {
            const monthsInput = document.getElementById('months');
            if (monthsInput) {
                monthsInput.value = 0;
                monthsInput.readOnly = true;
                monthsInput.classList.add('disabled-field');
            }
            const yearsInput = document.getElementById('years');
            if (yearsInput) {
                yearsInput.value = 1;
                yearsInput.readOnly = true;
                yearsInput.classList.add('disabled-field');
            }
            
            // Update duration labels
            const durationLabels = document.querySelectorAll('.duration-input label');
            durationLabels.forEach(label => {
                label.style.color = '#666';
                label.innerHTML = label.textContent + ' <i class="fas fa-lock" style="font-size: 0.8rem; color: #27ae60;"></i>';
            });
        }
        
        // Pre-fill amount (make it readonly)
        const amountInput = document.getElementById('amount');
        if (amountInput) {
            amountInput.value = plan.amount;
            amountInput.readOnly = true;
            amountInput.title = 'Amount is fixed for this plan';
            amountInput.classList.add('disabled-field');
            
            // Add a lock icon to amount label
            const amountLabel = amountInput.parentElement.querySelector('label');
            if (amountLabel) {
                const lockIcon = document.createElement('span');
                lockIcon.innerHTML = ' <i class="fas fa-lock" style="color: #27ae60;"></i>';
                lockIcon.style.fontSize = '0.9rem';
                amountLabel.appendChild(lockIcon);
            }
        }
        
        // Pre-select UPI as default
        const upiRadio = document.getElementById('upi');
        if (upiRadio) {
            upiRadio.checked = true;
        }
    }
    
    // ====== STORAGE GB FIELD HANDLING ======
    
    if (cloudServiceRadio && storageGbGroup) {
        // Initially check if cloud service is selected
        if (cloudServiceRadio.checked) {
            storageGbGroup.style.display = 'block';
            if (storageGbInput) storageGbInput.required = true;
        }
        
        cloudServiceRadio.addEventListener('change', function() {
            if (this.checked) {
                storageGbGroup.style.display = 'block';
                if (storageGbInput) storageGbInput.required = true;
            }
        });
        
        itServiceRadio.addEventListener('change', function() {
            if (this.checked) {
                storageGbGroup.style.display = 'none';
                if (storageGbInput) {
                    storageGbInput.required = false;
                    storageGbInput.value = '';
                    if (storageGbError) storageGbError.style.display = 'none';
                }
            }
        });
    }
    
    // Storage GB input validation
    function validateStorageGB() {
        if (!storageGbInput || storageGbGroup.style.display === 'none') {
            return true; // Not required if not visible
        }
        
        const value = storageGbInput.value.trim();
        
        if (value === '') {
            if (storageGbError) {
                storageGbError.textContent = 'Please enter required storage amount';
                storageGbError.style.display = 'block';
            }
            storageGbInput.classList.add('error');
            return false;
        } else if (isNaN(value) || value.length > 4) {
            if (storageGbError) {
                storageGbError.textContent = 'Storage must be 1-4 digits (1-9999 GB)';
                storageGbError.style.display = 'block';
            }
            storageGbInput.classList.add('error');
            return false;
        } else if (parseInt(value) > 9999) {
            if (storageGbError) {
                storageGbError.textContent = 'Maximum storage is 9999 GB';
                storageGbError.style.display = 'block';
            }
            storageGbInput.classList.add('error');
            return false;
        } else if (parseInt(value) < 1) {
            if (storageGbError) {
                storageGbError.textContent = 'Minimum storage is 1 GB';
                storageGbError.style.display = 'block';
            }
            storageGbInput.classList.add('error');
            return false;
        } else {
            if (storageGbError) storageGbError.style.display = 'none';
            storageGbInput.classList.remove('error');
            return true;
        }
    }
    
    if (storageGbInput) {
        // Restrict to numbers only and max 4 digits
        storageGbInput.addEventListener('input', function(e) {
            // Remove non-numeric characters
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limit to 4 digits
            if (this.value.length > 4) {
                this.value = this.value.slice(0, 4);
            }
            
            // Clear error when user types
            if (storageGbError) storageGbError.style.display = 'none';
            this.classList.remove('error');
        });
        
        // Validate on blur
        storageGbInput.addEventListener('blur', validateStorageGB);
    }
    
    // ====== BLUR EFFECT FOR PAYMENT OPTIONS ======
    function setupPaymentBlurEffects() {
        const upiColumn = document.querySelector('.upi-payment');
        const accountColumn = document.querySelector('.account-transfer');
        const upiRadio = document.getElementById('upi');
        const accountRadio = document.getElementById('account');
        
        if (!upiColumn || !accountColumn || !upiRadio || !accountRadio) return;
        
        // Function to apply blur effects based on selection
        function updateBlurEffects() {
            if (upiRadio.checked) {
                // UPI selected - blur bank details
                accountColumn.classList.add('blurred');
                upiColumn.classList.remove('blurred');
            } else if (accountRadio.checked) {
                // Account Transfer selected - blur UPI QR
                upiColumn.classList.add('blurred');
                accountColumn.classList.remove('blurred');
            }
        }
        
        // Add click listeners to remove blur when clicked
        upiColumn.addEventListener('click', function() {
            if (this.classList.contains('blurred')) {
                this.classList.remove('blurred');
                // Auto-select the corresponding radio button
                if (accountRadio) accountRadio.checked = true;
                updateBlurEffects();
            }
        });
        
        accountColumn.addEventListener('click', function() {
            if (this.classList.contains('blurred')) {
                this.classList.remove('blurred');
                // Auto-select the corresponding radio button
                if (upiRadio) upiRadio.checked = true;
                updateBlurEffects();
            }
        });
        
        // Update blur effects when payment mode changes
        if (upiRadio && accountRadio) {
            upiRadio.addEventListener('change', updateBlurEffects);
            accountRadio.addEventListener('change', updateBlurEffects);
        }
        
        // Initialize blur effects
        setTimeout(updateBlurEffects, 100);
    }
    
    // ====== FORM VALIDATION ======
    function validateAllFormFields() {
        let isValid = true;
        
        // Validate required fields
        const requiredFields = [
        'client-name', 'phone', 'email', 'pan', 'aadhaar', 
        'dob', 'amount'
        ];
        
        requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.required && !field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        }
    });
        
        // Validate gender selection
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
        isValid = false;
    }
    
    // Validate service selection
    const serviceSelected = document.querySelector('input[name="service"]:checked');
    if (!serviceSelected) {
        isValid = false;
    }
    
    // Validate mode of transaction
    const modeSelected = document.querySelector('input[name="mode"]:checked');
    if (!modeSelected) {
        isValid = false;
    }
        
        // Validate storage GB if visible
    if (storageGbGroup && storageGbGroup.style.display !== 'none') {
        if (!validateStorageGB()) {
            isValid = false;
        }
    }

        // Validate storage duration if Cloud Storage Service is selected
    if (cloudServiceRadio && cloudServiceRadio.checked) {
        const monthsInput = document.getElementById('months');
        const yearsInput = document.getElementById('years');
        
        // At least one duration field must be filled
        if ((!monthsInput.value || monthsInput.value === '0') && 
            (!yearsInput.value || yearsInput.value === '0')) {
            isValid = false;
            
            // Highlight both fields with error
            if (monthsInput) {
                monthsInput.classList.add('error');
                monthsInput.style.borderColor = '#e74c3c';
            }
            if (yearsInput) {
                yearsInput.classList.add('error');
                yearsInput.style.borderColor = '#e74c3c';
            }
            
            // Show error message
            const durationGroup = document.querySelector('.duration-group');
            if (durationGroup && !document.getElementById('duration-error')) {
                const errorDiv = document.createElement('div');
                errorDiv.id = 'duration-error';
                errorDiv.className = 'error-message';
                errorDiv.textContent = 'Please enter storage duration (months or years)';
                errorDiv.style.display = 'block';
                errorDiv.style.marginTop = '5px';
                durationGroup.parentNode.insertBefore(errorDiv, durationGroup.nextSibling);
            }
        } else {
            // Clear errors if at least one field has value
            const monthsInput = document.getElementById('months');
            const yearsInput = document.getElementById('years');
            if (monthsInput) {
                monthsInput.classList.remove('error');
                monthsInput.style.borderColor = '';
            }
            if (yearsInput) {
                yearsInput.classList.remove('error');
                yearsInput.style.borderColor = '';
            }
            
            // Remove error message if it exists
            const durationError = document.getElementById('duration-error');
            if (durationError) {
                durationError.remove();
            }
        }
    }
        
       // Validate PAN number
    if (!validatePAN()) {
        isValid = false;
    }
    
    // Check Step 2 agreement
    if (finalAgree && !finalAgree.checked) {
        isValid = false;
    }
    
    return isValid;
}

    // Add this function to validate duration fields
function validateDurationFields() {
    if (!cloudServiceRadio || !cloudServiceRadio.checked) {
        return true; // Not required if not cloud service
    }
    
    const monthsInput = document.getElementById('months');
    const yearsInput = document.getElementById('years');
    
    if (!monthsInput || !yearsInput) return true;
    
    const monthsValue = monthsInput.value.trim();
    const yearsValue = yearsInput.value.trim();
    
    // At least one field must have a value greater than 0
    const monthsValid = monthsValue && parseInt(monthsValue) > 0;
    const yearsValid = yearsValue && parseInt(yearsValue) > 0;
    
    if (!monthsValid && !yearsValid) {
        // Highlight both fields with error
        monthsInput.classList.add('error');
        monthsInput.style.borderColor = '#e74c3c';
        yearsInput.classList.add('error');
        yearsInput.style.borderColor = '#e74c3c';
        
        // Show error message if not already shown
        const durationGroup = document.querySelector('.duration-group');
        if (durationGroup && !document.getElementById('duration-error')) {
            const errorDiv = document.createElement('div');
            errorDiv.id = 'duration-error';
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'Please enter storage duration (months or years)';
            errorDiv.style.display = 'block';
            errorDiv.style.marginTop = '5px';
            durationGroup.parentNode.insertBefore(errorDiv, durationGroup.nextSibling);
        }
        
        return false;
    } else {
        // Clear errors
        monthsInput.classList.remove('error');
        monthsInput.style.borderColor = '';
        yearsInput.classList.remove('error');
        yearsInput.style.borderColor = '';
        
        // Remove error message if it exists
        const durationError = document.getElementById('duration-error');
        if (durationError) {
            durationError.remove();
        }
        
        return true;
    }
}

// Add event listeners for duration fields
function setupDurationValidation() {
    const monthsInput = document.getElementById('months');
    const yearsInput = document.getElementById('years');
    
    if (monthsInput) {
        monthsInput.addEventListener('input', function() {
            // Clear the other field if both are filled (optional logic)
            const yearsInput = document.getElementById('years');
            if (this.value && this.value !== '0' && yearsInput.value && yearsInput.value !== '0') {
                // You can choose to clear one or keep both - here we keep both
            }
            validateDurationFields();
        });
    }
    
    if (yearsInput) {
        yearsInput.addEventListener('input', function() {
            // Clear the other field if both are filled (optional logic)
            const monthsInput = document.getElementById('months');
            if (this.value && this.value !== '0' && monthsInput.value && monthsInput.value !== '0') {
                // You can choose to clear one or keep both - here we keep both
            }
            validateDurationFields();
        });
    }
}
    
    // ====== EVENT LISTENERS ======
    
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
            if (this.id !== 'payment-dropdown') {
                dropdown.classList.remove('show');
            }
        });
    });
    
    // Handle Payment dropdown click
    if (paymentDropdown) {
        paymentDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.remove('show');
            paymentSection.style.display = 'block';
            showStep(1);
            loadTermsAndConditions();
            
            // Clear any selected plan if coming from menu (not from pricing table)
            selectedPlan = null;
        });
    }
    
    // Terms agreement handling
    if (termsAgree && termsDisagree) {
        // Enable/disable proceed button based on selection
        [termsAgree, termsDisagree].forEach(radio => {
            radio.addEventListener('change', function() {
                proceedToFormBtn.disabled = !termsAgree.checked;
            });
        });
        
        // Handle disagree selection immediately
        termsDisagree.addEventListener('change', function() {
            if (this.checked) {
                showMessage('Thanks. Your transaction process is being terminated.', 3000);
            }
        });
    }
    
    // Continue
    if (proceedToFormBtn) {
        proceedToFormBtn.addEventListener('click', function() {
            if (termsAgree.checked) {
                showStep(2);
                
                // Pre-fill form if a plan was selected
                if (selectedPlan) {
                    prefillFormWithPlan(selectedPlan);
                }
            }
        });
    }
    
    // Back to terms
    if (backToTermsBtn) {
        backToTermsBtn.addEventListener('click', function() {
            showStep(1);
        });
    }
    
    // Service selection toggles storage details
    if (cloudServiceRadio && storageDetails) {
        cloudServiceRadio.addEventListener('change', function() {
            if (this.checked) {
                storageDetails.style.display = 'block';
            }
        });
        
        itServiceRadio.addEventListener('change', function() {
            if (this.checked) {
                storageDetails.style.display = 'none';
            }
        });
    }
    
    // Real-time form validation
    clientForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('error');
            } else {
                this.classList.add('error');
            }
        });
    });
    
    // Final agreement handling
    if (finalDisagree) {
        finalDisagree.addEventListener('change', function() {
            if (this.checked) {
                disagreeConfirmation.style.display = 'block';
                submitFormBtn.disabled = true;
            }
        });
    }
    
    if (finalAgree) {
        finalAgree.addEventListener('change', function() {
            if (this.checked) {
                disagreeConfirmation.style.display = 'none';
                submitFormBtn.disabled = false;
            }
        });
    }
    
    // Terminate confirmation
    if (confirmTerminateBtn) {
        confirmTerminateBtn.addEventListener('click', function() {
            showMessage('Thanks. Your transaction process is being terminated.', 3000);
        });
    }
    
    if (cancelTerminateBtn) {
        cancelTerminateBtn.addEventListener('click', function() {
            disagreeConfirmation.style.display = 'none';
            if (finalDisagree) finalDisagree.checked = false;
            if (finalAgree) finalAgree.checked = true;
            submitFormBtn.disabled = false;
        });
    }
    
    // Form submission
   
clientForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateAllFormFields()) {
        // Check specifically for duration validation
        if (cloudServiceRadio && cloudServiceRadio.checked) {
            if (!validateDurationFields()) {
                alert('Please enter storage duration (months or years) for cloud storage service.');
                return;
            }
        }
        
        alert('Please fill all required fields correctly.');
        return;
    }
    
    // Check if Step 2 agreement is accepted
    if (!finalAgree || !finalAgree.checked) {
        alert('Please agree to the terms to proceed.');
        return;
    }
    
    showLoading();
    
    // Collect form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Add selected plan data if available
    if (selectedPlan) {
        data['selected_plan_storage_gb'] = selectedPlan.storageGB;
        data['selected_plan_type'] = selectedPlan.type;
        data['selected_plan_amount'] = selectedPlan.amount;
        data['selected_plan_users'] = selectedPlan.users;
    }
    
    // Add timestamp and other metadata
    data['timestamp'] = new Date().toISOString();
    data['source'] = selectedPlan ? 'pricing_table' : 'manual_entry';
    
    // Send to Formspree
    const formspreeEndpoint = 'https://formspree.io/f/mdkqvook';
    
    fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        hideLoading();
        if (response.ok) {
            // Clear selected plan after successful submission
            selectedPlan = null;
            
            // Show step 3 (payment options)
            showStep(3);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Error:', error);
        // Still show payment options even if email fails
        showStep(3);
    });
});
    
    // Handle Close/Home button
    if (closePaymentBtn) {
        closePaymentBtn.addEventListener('click', function() {
            paymentSection.style.display = 'none';
            
            // Reset form
            if (clientForm) {
                clientForm.reset();
                
                // Remove readonly attributes
                const readonlyInputs = clientForm.querySelectorAll('input[readonly]');
                readonlyInputs.forEach(input => {
                    input.readOnly = false;
                    input.classList.remove('disabled-field');
                });
                
                // Remove lock icons
                const lockIcons = clientForm.querySelectorAll('.fa-lock');
                lockIcons.forEach(icon => icon.remove());
                
                // Reset duration labels
                const durationLabels = document.querySelectorAll('.duration-input label');
                durationLabels.forEach(label => {
                    label.style.color = '';
                    label.innerHTML = label.textContent;
                });
            }
            
            // Reset storage details display
            if (storageDetails) {
                storageDetails.style.display = 'none';
            }
            
            // Clear selected plan
            selectedPlan = null;
            
            // Reset to step 1
            showStep(1);
            
            // Scroll to home
            const homeSection = document.querySelector('#home');
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: homeSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Storage card click handler
    if (storageCard) {
        storageCard.addEventListener('click', function() {
            const storageSection = document.querySelector('#cloud-storage-details');
            if (storageSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: storageSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#payment-section') {
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
    
    // Format numbers in pricing table
    function formatNumber(num) {
        return Number(num).toLocaleString('en-IN');
    }
    
    document.querySelectorAll('.pricing-table tbody tr').forEach(row => {
        const monthlyCell = row.children[2];
        const yearlyCell = row.children[4];
        
        if (monthlyCell && !isNaN(monthlyCell.innerText)) {
            monthlyCell.innerText = formatNumber(monthlyCell.innerText);
        }
        
        if (yearlyCell && !isNaN(yearlyCell.innerText)) {
            yearlyCell.innerText = formatNumber(yearlyCell.innerText);
        }
    });
    
    // ====== CONTACT FORM VALIDATION ======
    
    // Name validation (full name check)
    if (contactName) {
        contactName.addEventListener('input', function() {
            const name = this.value.trim();
            const words = name.split(/\s+/).filter(word => word.length > 0);
            
            // Remove non-alphabetic characters except spaces and dots
            this.value = this.value.replace(/[^A-Za-z\s\.]/g, '');
            
            if (words.length < 2 && name.length > 0) {
                if (nameError) nameError.style.display = 'block';
            } else {
                if (nameError) nameError.style.display = 'none';
            }
        });
    }
    
    // Email validation
    if (contactEmail) {
        contactEmail.addEventListener('input', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email.length > 0 && !emailRegex.test(email)) {
                if (emailError) emailError.style.display = 'block';
            } else {
                if (emailError) emailError.style.display = 'none';
            }
        });
    }
    
    // Phone validation (only numbers)
    if (contactPhone) {
        contactPhone.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/\D/g, '');
            
            if (this.value.length !== 10 && this.value.length > 0) {
                if (phoneError) phoneError.style.display = 'block';
            } else {
                if (phoneError) phoneError.style.display = 'none';
            }
        });
    }
    
    // Subject character count
    if (contactSubject) {
        contactSubject.addEventListener('input', function() {
            const count = this.value.length;
            if (subjectCount) subjectCount.textContent = `${count}/20 characters`;
            
            if (count > 20) {
                this.value = this.value.substring(0, 20);
                if (subjectCount) subjectCount.textContent = '20/20 characters';
            }
        });
    }
    
    // Message character count
    if (contactMessage) {
        contactMessage.addEventListener('input', function() {
            const count = this.value.length;
            if (messageCount) messageCount.textContent = `${count}/200 characters`;
            
            if (count > 200) {
                this.value = this.value.substring(0, 200);
                if (messageCount) messageCount.textContent = '200/200 characters';
            }
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate full name
            const name = contactName.value.trim();
            const words = name.split(/\s+/).filter(word => word.length > 0);
            if (words.length < 2) {
                if (nameError) {
                    nameError.style.display = 'block';
                    nameError.textContent = 'Please type your full name';
                }
                return;
            }
            
            // Validate email
            const email = contactEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (emailError) {
                    emailError.style.display = 'block';
                    emailError.textContent = 'Please enter a valid email address';
                }
                return;
            }
            
            // Validate phone
            if (contactPhone.value.length !== 10) {
                if (phoneError) {
                    phoneError.style.display = 'block';
                    phoneError.textContent = 'Please enter a 10-digit phone number';
                }
                return;
            }
            
            // Validate subject
            if (contactSubject.value.trim().length === 0) {
                alert('Please enter a subject');
                return;
            }
            
            // Validate message
            if (contactMessage.value.trim().length === 0) {
                alert('Please enter your message');
                return;
            }
            
            // Submit the form
            this.submit();
            alert('Thank you for your message! We will get back to you soon.');
        });
    }
    
    // ====== DOB FORMAT UPDATE ======
    if (dobInput) {
        dobInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 8) {
                value = value.substr(0, 8);
            }
            
            // Format: DD-MM-YYYY
            if (value.length >= 7) {
                value = value.substr(0, 2) + '-' + value.substr(2, 2) + '-' + value.substr(4, 4);
            } else if (value.length >= 5) {
                value = value.substr(0, 2) + '-' + value.substr(2, 2) + '-' + value.substr(4);
            } else if (value.length >= 3) {
                value = value.substr(0, 2) + '-' + value.substr(2);
            }
            
            e.target.value = value;
        });
        
        // Update the small text
        const dobSmall = dobInput.parentElement.querySelector('small');
        if (dobSmall) {
            dobSmall.textContent = 'Format: DD-MM-YYYY (8 numeric digits)';
        }
    }
    
    // Validate Aadhaar input (only numbers)
    if (aadhaarInput) {
        aadhaarInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // Validate Phone input (only numbers)
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // Validate Name input (only letters, spaces, dots)
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^A-Za-z\s\.]/g, '');
        });
    }
    
    // Initialize character counters
    if (subjectCount) subjectCount.textContent = `0/20 characters`;
    if (messageCount) messageCount.textContent = `0/200 characters`;
    
    // Initialize form fields
    if (storageDetails) {
        storageDetails.style.display = 'none';
    }
    if (storageGbGroup) {
        storageGbGroup.style.display = 'none';
    }
    
    // Initialize payment blur effects
    setupPaymentBlurEffects();
    
    // ====== AI CHAT FUNCTIONALITY ======
    (function() {
        // Chat elements
        const chatToggle = document.getElementById('chat-toggle-btn');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const suggestedQuestions = document.getElementById('suggested-questions');
        
        // Q&A database - Now using the external qaDatabase variable
        // This should be loaded from qa-data.js file
        let qaPairs = [];
        
        // Inactivity timer
        let inactivityTimer;
        const INACTIVITY_TIME = 60000; // 60 seconds
        
        // Typing debounce timer
        let typingTimer;
        const TYPING_DEBOUNCE = 300; // 300ms
        
        // Mobile keyboard detection
        function setupMobileKeyboardHandling() {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            if (!isMobile) return;
            
            let originalHeight = window.innerHeight;
            
            function handleResize() {
                const currentHeight = window.innerHeight;
                const isKeyboardOpen = currentHeight < originalHeight;
                
                if (chatWindow.style.display === 'flex') {
                    if (isKeyboardOpen) {
                        chatWindow.classList.add('keyboard-open');
                        
                        // Scroll to bottom when keyboard opens
                        setTimeout(() => {
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }, 100);
                    } else {
                        chatWindow.classList.remove('keyboard-open');
                    }
                }
                
                originalHeight = currentHeight;
            }
            
            // Listen for resize events (keyboard triggers resize on mobile)
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(handleResize, 100);
            });
            
            // Prevent body scroll when chat input is focused
            chatInput.addEventListener('focus', () => {
                if (isMobile && chatWindow.style.display === 'flex') {
                    document.body.classList.add('chat-open');
                }
            });
            
            chatInput.addEventListener('blur', () => {
                document.body.classList.remove('chat-open');
                chatWindow.classList.remove('keyboard-open');
            });
            
            // Close keyboard when clicking outside on mobile
            document.addEventListener('touchstart', (e) => {
                if (chatWindow.style.display === 'flex' && 
                    !chatWindow.contains(e.target) && 
                    !chatToggle.contains(e.target)) {
                    chatInput.blur();
                }
            });
        }
        
        // Load Q&A pairs from external database
        function loadQADatabase() {
            // Check if qaDatabase is available globally
            if (typeof qaDatabase !== 'undefined') {
                qaPairs = qaDatabase.map(item => ({
                    question: item.question,
                    answer: item.answer,
                    keywords: extractKeywords(item.question)
                }));
                console.log('Loaded', qaPairs.length, 'Q&A pairs from external database');
            } else {
                console.error('qaDatabase not found. Make sure qa-data.js is loaded before script.js');
                // Fallback to minimal questions if database not available
                qaPairs = getFallbackQuestions();
            }
        }
        
        // Fallback questions in case external database fails to load
        function getFallbackQuestions() {
            return [
                {
                    question: "What is Odelya Management?",
                    answer: "Odelya Management Pvt. Ltd. is a Kolkata-based company specializing in secure cloud storage solutions.",
                    keywords: ["odelya", "company", "what"]
                },
                {
                    question: "What services do you offer?",
                    answer: "We offer secure cloud storage with end-to-end encryption and event guest photo storage services.",
                    keywords: ["services", "offer", "what"]
                },
                {
                    question: "How can I contact you?",
                    answer: "Call us at +91-96741 30001 or email care.ompl@gmail.com. Our office is in Kolkata.",
                    keywords: ["contact", "call", "email", "phone"]
                },
                {
                    question: "What are your prices?",
                    answer: "Prices start from Rs. 18/month for 10GB. Check our pricing table for complete details.",
                    keywords: ["price", "cost", "how much"]
                }
            ];
        }
        
        // Extract keywords from questions
        function extractKeywords(text) {
            const stopWords = ['what', 'where', 'when', 'who', 'whom', 'which', 'whose', 'why', 'how', 
                              'is', 'are', 'was', 'were', 'do', 'does', 'did', 'the', 'a', 'an', 'and',
                              'or', 'but', 'if', 'then', 'else', 'when', 'at', 'from', 'by', 'with',
                              'about', 'against', 'between', 'into', 'through', 'during', 'before',
                              'after', 'above', 'below', 'to', 'of', 'in', 'for', 'on', 'off', 'over',
                              'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
                              'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
                              'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
                              'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just',
                              'don', 'should', 'now'];
            
            const words = text.toLowerCase()
                .replace(/[^\w\s]/g, ' ')
                .split(/\s+/)
                .filter(word => word.length > 2 && !stopWords.includes(word));
            
            return [...new Set(words)]; // Remove duplicates
        }
        
        // Initialize chat
        function initializeChat() {
            loadQADatabase();
            startInactivityTimer();
            setupEventListeners();
            setupMobileKeyboardHandling();
        }
        
        // Setup event listeners
        function setupEventListeners() {
            chatToggle.addEventListener('click', toggleChat);
            closeChat.addEventListener('click', closeChatWindow);
            
            // Send message on button click
            sendBtn.addEventListener('click', handleSendMessage);
            
            // Send message on Enter key
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSendMessage();
                }
            });
            
            // Show suggestions while typing
            chatInput.addEventListener('input', function() {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    showDynamicSuggestions(this.value.trim());
                }, TYPING_DEBOUNCE);
                
                // Reset inactivity timer on typing
                resetInactivityTimer();
            });
            
            // Clear suggestions when input is cleared
            chatInput.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    hideSuggestions();
                }
            });
            
            // Reset inactivity timer on any interaction
            document.addEventListener('click', resetInactivityTimer);
            document.addEventListener('keypress', resetInactivityTimer);
            document.addEventListener('scroll', resetInactivityTimer);
        }
        
        // Toggle chat window
        function toggleChat() {
            if (chatWindow.style.display === 'flex') {
                closeChatWindow();
            } else {
                openChatWindow();
            }
        }
        
        // Open chat window
        function openChatWindow() {
            chatWindow.style.display = 'flex';
            chatToggle.style.display = 'none';
            resetInactivityTimer();
            showGreeting();
            setTimeout(() => {
                chatInput.focus();
            }, 300);
        }
        
        // Close chat window
        function closeChatWindow() {
            chatWindow.style.display = 'none';
            chatToggle.style.display = 'flex';
            clearChat();
            hideSuggestions();
            chatInput.value = '';
        }
        
        // Show dynamic suggestions based on typing
        function showDynamicSuggestions(inputText) {
            if (!inputText) {
                hideSuggestions();
                return;
            }
            
            const normalizedInput = inputText.toLowerCase().trim();
            
            // Filter questions that match the input
            const matchedQuestions = qaPairs
                .filter(qa => {
                    // Check if input matches question or keywords
                    const questionLower = qa.question.toLowerCase();
                    return questionLower.includes(normalizedInput) ||
                           qa.keywords.some(keyword => keyword.includes(normalizedInput)) ||
                           normalizedInput.split(' ').some(word => 
                               word.length > 2 && questionLower.includes(word)
                           );
                })
                .slice(0, 5); // Show max 5 suggestions
            
            // Also check for category matches
            const categoryMatches = getCategorySuggestions(normalizedInput);
            const allSuggestions = [...matchedQuestions, ...categoryMatches].slice(0, 5);
            
            if (allSuggestions.length > 0) {
                displaySuggestions(allSuggestions);
            } else {
                hideSuggestions();
            }
        }
        
        // Get category-based suggestions
        function getCategorySuggestions(input) {
            const categories = {
                'price': ['how much', 'cost', 'price', 'rate', 'charges'],
                'contact': ['contact', 'call', 'email', 'phone', 'number', 'reach'],
                'service': ['service', 'offer', 'provide', 'storage', 'cloud'],
                'location': ['location', 'address', 'office', 'where'],
                'founder': ['founder', 'owner', 'director', 'chairman', 'who'],
                'time': ['time', 'hour', 'when', 'available', 'schedule'],
                'payment': ['payment', 'pay', 'buy', 'purchase', 'transfer', 'upi']
            };
            
            const matched = [];
            
            for (const [category, keywords] of Object.entries(categories)) {
                if (keywords.some(keyword => input.includes(keyword))) {
                    // Get 2 questions related to this category
                    const categoryQuestions = qaPairs.filter(qa => 
                        qa.question.toLowerCase().includes(category) ||
                        keywords.some(keyword => qa.question.toLowerCase().includes(keyword))
                    ).slice(0, 2);
                    
                    matched.push(...categoryQuestions);
                }
            }
            
            return [...new Set(matched)]; // Remove duplicates
        }
        
        // Display suggestions
        function displaySuggestions(suggestions) {
            suggestedQuestions.innerHTML = '';
            
            suggestions.forEach(qa => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question-item';
                questionDiv.textContent = qa.question;
                questionDiv.addEventListener('click', () => {
                    chatInput.value = qa.question;
                    hideSuggestions();
                    handleSendMessage();
                });
                suggestedQuestions.appendChild(questionDiv);
            });
            
            suggestedQuestions.classList.add('show');
        }
        
        // Hide suggestions
        function hideSuggestions() {
            suggestedQuestions.classList.remove('show');
            suggestedQuestions.innerHTML = '';
        }
        
        // Handle send message
        function handleSendMessage() {
            const question = chatInput.value.trim();
            
            if (!question) {
                return;
            }
            
            // Add user message
            addUserMessage(question);
            hideSuggestions();
            chatInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate processing delay
            setTimeout(() => {
                removeTypingIndicator();
                
                // Find answer
                const answer = searchAnswer(question);
                
                // Add bot answer
                setTimeout(() => {
                    addBotMessage(answer);
                    scrollToBottom();
                    resetInactivityTimer();
                }, 500);
            }, 1000);
        }
        
        // Show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatMessages.appendChild(typingDiv);
            scrollToBottom();
        }
        
        // Remove typing indicator
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
        
        // Search for answer
        function searchAnswer(question) {
            const normalizedQuestion = question.toLowerCase().trim();
            
            // First, try exact match
            for (const qa of qaPairs) {
                if (qa.question.toLowerCase() === normalizedQuestion) {
                    return qa.answer;
                }
            }
            
            // Then try partial match
            for (const qa of qaPairs) {
                if (normalizedQuestion.includes(qa.question.toLowerCase()) || 
                    qa.question.toLowerCase().includes(normalizedQuestion)) {
                    return qa.answer;
                }
            }
            
            // Then try keyword matching
            const matchedByKeywords = [];
            const inputWords = normalizedQuestion.split(/\s+/).filter(word => word.length > 2);
            
            for (const qa of qaPairs) {
                const matchScore = qa.keywords.filter(keyword => 
                    inputWords.some(word => keyword.includes(word) || word.includes(keyword))
                ).length;
                
                if (matchScore > 0) {
                    matchedByKeywords.push({ qa, score: matchScore });
                }
            }
            
            if (matchedByKeywords.length > 0) {
                // Sort by match score and return the best match
                matchedByKeywords.sort((a, b) => b.score - a.score);
                return matchedByKeywords[0].qa.answer;
            }
            
            // If not found, check for common keywords/phrases
            if (normalizedQuestion.includes('price') || normalizedQuestion.includes('cost') || 
                normalizedQuestion.includes('how much')) {
                return "Our prices start from Rs. 18 per month for 10GB storage. Please check our pricing table for detailed rates or ask about a specific storage size.";
            } else if (normalizedQuestion.includes('contact') || normalizedQuestion.includes('call') || 
                      normalizedQuestion.includes('phone') || normalizedQuestion.includes('email')) {
                return "You can contact us at:<br>📞 +91-96741 30001<br>✉️ care.ompl@gmail.com<br>⏰ Mon-Sat 9 AM - 8 PM";
            } else if (normalizedQuestion.includes('location') || normalizedQuestion.includes('address') || 
                      normalizedQuestion.includes('where')) {
                return "Our office is located at:<br>44E, 2nd Floor, Nandalalmitra Lane, Kolkata-700040, India";
            } else if (normalizedQuestion.includes('service') || normalizedQuestion.includes('offer') || 
                      normalizedQuestion.includes('provide')) {
                return "We offer:<br>1. Secure Cloud Storage with End-to-End Encryption<br>2. Event Guest Photo Storage";
            } else if (normalizedQuestion.includes('founder') || normalizedQuestion.includes('owner') || 
                      normalizedQuestion.includes('director') || normalizedQuestion.includes('who runs')) {
                return "Our company is led by:<br>1. Mr. Aniruddha Ghosh - Chairman<br>2. Mr. Shyamal Sen - Director";
            } else if (normalizedQuestion.includes('time') || normalizedQuestion.includes('hour') || 
                      normalizedQuestion.includes('available') || normalizedQuestion.includes('when')) {
                return "Our business hours are Monday to Saturday, 9 AM to 8 PM.";
            } else if (normalizedQuestion.includes('storage') || normalizedQuestion.includes('cloud')) {
                return "We provide secure cloud storage solutions with end-to-end encryption. You can store files, photos, and documents securely.";
            } else if (normalizedQuestion.includes('payment') || normalizedQuestion.includes('pay') || 
                      normalizedQuestion.includes('buy')) {
                return "You can make payment via:<br>1. UPI Payment (Scan QR code)<br>2. Bank Transfer to State Bank of India";
            }
            
            // Default response for unknown questions
            return "Sorry. I couldn't find an exact answer to your question. Kindly feel free to call us at +91-96741 30001 for further assistance. Alternatively, you can try asking about:<br><br>" +
                   "• Services we offer<br>" +
                   "• Pricing and storage plans<br>" +
                   "• Contact information<br>" +
                   "• Office location<br>" +
                   "• Payment methods";
        }
        
        // Add message to chat
        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.innerHTML = message;
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
        }
        
        // Add user message
        function addUserMessage(message) {
            addMessage(message, true);
        }
        
        // Add bot message
        function addBotMessage(message) {
            addMessage(message, false);
        }
        
        // Scroll to bottom of chat
        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Clear chat
        function clearChat() {
            chatMessages.innerHTML = '';
        }
        
        // Inactivity timer functions
        function startInactivityTimer() {
            resetInactivityTimer();
        }
        
        function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                handleInactivity();
            }, INACTIVITY_TIME);
        }
        
        function handleInactivity() {
            if (chatWindow.style.display === 'flex') {
                addBotMessage("It seems you're inactive. Chat history will be cleared in 5 seconds.");
                
                setTimeout(() => {
                    clearChat();
                    closeChatWindow();
                    showGreeting();
                }, 5000);
            }
        }
        
        // Initialize chat when DOM is loaded
        initializeChat();
    })();
});
