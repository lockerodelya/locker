// ====== STATE MANAGEMENT ======
const paymentState = {
    currentStep: 1,
    agreedToTerms: false,
    selectedService: null,
    paymentMode: null,
    totalAmount: 0,
    isFromCloudStorage: false,
    cloudStorageData: null,
    userId: '',
    dataSent: false,
    formData: {},
    registrationDate: null,
    planStartMonth: 0, // Current month offset
    itPlanStartMonth: 0 // For IT services
};

// ====== MONTH SELECTION FUNCTIONS ======
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function changeMonth(direction) {
    const isCloud = paymentState.selectedService === 'cloud';
    const monthDisplay = isCloud ? 'selectedMonth' : 'itSelectedMonth';
    const startDateDisplay = isCloud ? 'planStartDate' : 'itPlanStartDate';
    
    if (isCloud) {
        paymentState.planStartMonth += direction;
        updateMonthDisplay(monthDisplay, startDateDisplay, paymentState.planStartMonth);
        updatePlanEndDate();
    } else {
        paymentState.itPlanStartMonth += direction;
        updateMonthDisplay(monthDisplay, startDateDisplay, paymentState.itPlanStartMonth);
    }
}

function updateMonthDisplay(elementId, dateElementId, monthOffset) {
    const displayDate = new Date();
    displayDate.setMonth(currentMonth + monthOffset);
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    const monthName = monthNames[displayDate.getMonth()];
    const year = displayDate.getFullYear();
    
    document.getElementById(elementId).textContent = `${monthName} ${year}`;
    
    // Set start date as 1st of month
    const startDate = `01-${String(displayDate.getMonth() + 1).padStart(2, '0')}-${year}`;
    document.getElementById(dateElementId).textContent = startDate;
    
    return { month: displayDate.getMonth(), year: year };
}

function updatePlanEndDate() {
    if (paymentState.selectedService !== 'cloud') return;
    
    const duration = document.getElementById('duration').value;
    if (!duration) return;
    
    const displayDate = new Date();
    displayDate.setMonth(currentMonth + paymentState.planStartMonth);
    
    let endMonth = displayDate.getMonth();
    let endYear = displayDate.getFullYear();
    
    if (duration === 'monthly') {
        endMonth += 1;
        if (endMonth > 11) {
            endMonth = 0;
            endYear += 1;
        }
    } else if (duration === 'yearly') {
        endYear += 1;
    }
    
    // Get last day of month
    const lastDay = new Date(endYear, endMonth + 1, 0).getDate();
    const endDate = `${String(lastDay).padStart(2, '0')}-${String(endMonth + 1).padStart(2, '0')}-${endYear}`;
    
    document.getElementById('planEndDate').textContent = endDate;
}

// ====== DASHBOARD INTEGRATION ======
async function captureToDashboard(formData) {
    try {
        // Generate User ID (6 digits, 2-9, no zeros)
        function generateUserId() {
            let userId = '';
            const digits = '23456789';
            for (let i = 0; i < 6; i++) {
                userId += digits.charAt(Math.floor(Math.random() * digits.length));
            }
            return userId;
        }

        paymentState.userId = generateUserId();
        
        // Set registration date (FIRST TIME ONLY - never changes)
        if (!paymentState.registrationDate) {
            paymentState.registrationDate = new Date().toISOString().split('T')[0];
        }
        
        // Calculate plan dates based on selected month
        function calculatePlanDates(monthOffset, duration) {
            const today = new Date();
            const startDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
            
            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth();
            
            // Start date is always 1st of month
            const planStart = `01-${String(startMonth + 1).padStart(2, '0')}-${startYear}`;
            
            // Calculate end date based on duration
            let endMonth = startMonth;
            let endYear = startYear;
            
            if (duration === 'monthly') {
                endMonth += 1;
                if (endMonth > 11) {
                    endMonth = 0;
                    endYear += 1;
                }
            } else if (duration === 'yearly') {
                endYear += 1;
            }
            
            // End date is last day of month
            const lastDay = new Date(endYear, endMonth + 1, 0).getDate();
            const planEnd = `${String(lastDay).padStart(2, '0')}-${String(endMonth + 1).padStart(2, '0')}-${endYear}`;
            
            return { start: planStart, end: planEnd };
        }
        
        // Get month offset based on service type
        const monthOffset = paymentState.selectedService === 'cloud' ? 
            paymentState.planStartMonth : paymentState.itPlanStartMonth;
        
        // Calculate plan dates
        const planDates = calculatePlanDates(monthOffset, formData.Duration);
        
        // Prepare data for dashboard
        const dashboardData = {
            userId: paymentState.userId,
            registrationDate: paymentState.registrationDate, // NEVER CHANGES
            timestamp: new Date().toISOString(),
            personalInfo: {
                fullName: `${formData.First_Name} ${formData.Second_Name || ''} ${formData.Third_Name}`.trim(),
                dob: formData.Date_of_Birth,
                phone: formData.Phone_Number,
                email: formData.Email_ID,
                gender: formData.Gender,
                pan: formData.PAN_Number,
                aadhaar: formData.Aadhaar_Number
            },
            serviceInfo: {
                planGB: formData.Plan_GB || 'N/A',
                duration: formData.Duration || 'N/A',
                amountPaid: formData.Total_Amount,
                serviceType: formData.Selected_Service === 'it' ? formData.Service_Type : 'Cloud Storage',
                startDate: planDates.start,
                endDate: planDates.end
            },
            paymentInfo: {
                mode: "", // LEFT BLANK for admin to fill
                status: "", // LEFT BLANK for admin to fill
                passwordChangeAttempts: 0 // NEW FIELD
            }
        };

        console.log('Dashboard Data:', dashboardData);
        
        // Save to localStorage
        const existingUsers = JSON.parse(localStorage.getItem('odelya_users_raw') || '[]');
        existingUsers.push(dashboardData);
        localStorage.setItem('odelya_users_raw', JSON.stringify(existingUsers));
        
        // Sync across tabs
        syncDataToAllTabs(dashboardData);
        
        return paymentState.userId;
        
    } catch (error) {
        console.error('Dashboard capture error:', error);
        return null;
    }
}

// ====== SYNC DATA ACROSS TABS ======
function syncDataToAllTabs(userData) {
    try {
        localStorage.setItem('odelya_latest_user', JSON.stringify(userData));
        
        if (typeof BroadcastChannel !== 'undefined') {
            const channel = new BroadcastChannel('odelya_dashboard_channel');
            channel.postMessage({
                type: 'NEW_USER',
                data: userData
            });
        }
    } catch (error) {
        console.error('Sync error:', error);
    }
}

// ====== FORMSPREE SUBMISSION ======
async function sendDataToFormspree() {
    if (paymentState.dataSent) return;
    
    try {
        const formData = {
            'USER_ID': paymentState.userId,
            'First_Name': document.getElementById('firstName').value,
            'Second_Name': document.getElementById('secondName').value,
            'Third_Name': document.getElementById('thirdName').value,
            'Date_of_Birth': document.getElementById('dob').value,
            'Phone_Number': document.getElementById('phone').value,
            'Email_ID': document.getElementById('email').value,
            'Gender': document.getElementById('gender').value,
            'PAN_Number': document.getElementById('pan').value,
            'Aadhaar_Number': document.getElementById('aadhaar').value,
            'Selected_Service': paymentState.selectedService,
            'Total_Amount': paymentState.totalAmount,
            'Plan_GB': paymentState.selectedService === 'cloud' ? document.getElementById('planGB').value : '',
            'Duration': paymentState.selectedService === 'cloud' ? document.getElementById('duration').value : '',
            'Service_Type': paymentState.selectedService === 'it' ? document.getElementById('serviceType').value : '',
            'Payment_Mode': paymentState.paymentMode,
            'Registration_Date': paymentState.registrationDate,
            'Terms_Agreed': document.getElementById('termsConfirmed').checked,
            'Final_Agreement': document.getElementById('finalAgreement').checked,
            'Submission_Timestamp': new Date().toISOString()
        };
        
        const response = await fetch('https://formspree.io/f/mdkqvook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            paymentState.dataSent = true;
            console.log(`Formspree email sent! User ID: ${paymentState.userId}`);
        }
    } catch (error) {
        console.error('Formspree error:', error);
    }
}

// ====== DOM ELEMENTS ======
const elements = {
    termsModal: document.getElementById('termsModal'),
    disagreeConfirm: document.getElementById('disagreeConfirm'),
    closeTerms: document.getElementById('closeTerms'),
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3'),
    paymentForm: document.getElementById('paymentForm'),
    paymentDetailsSection: document.getElementById('paymentDetailsSection'),
    btnAgree: document.getElementById('btnAgree'),
    btnDisagree: document.getElementById('btnDisagree'),
    btnDisagreeNo: document.getElementById('btnDisagreeNo'),
    btnDisagreeYes: document.getElementById('btnDisagreeYes'),
    btnFinalDisagree: document.getElementById('btnFinalDisagree'),
    btnContinue: document.getElementById('btnContinue'),
    btnCompleted: document.getElementById('btnCompleted'),
    firstName: document.getElementById('firstName'),
    secondName: document.getElementById('secondName'),
    thirdName: document.getElementById('thirdName'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email'),
    aadhaar: document.getElementById('aadhaar'),
    pan: document.getElementById('pan'),
    dob: document.getElementById('dob'),
    gender: document.getElementById('gender'),
    cloudService: document.getElementById('cloudService'),
    itService: document.getElementById('itService'),
    cloudOptions: document.getElementById('cloudOptions'),
    itOptions: document.getElementById('itOptions'),
    planGB: document.getElementById('planGB'),
    duration: document.getElementById('duration'),
    cloudAmount: document.getElementById('cloudAmount'),
    serviceType: document.getElementById('serviceType'),
    itAmount: document.getElementById('itAmount'),
    modeUPI: document.getElementById('modeUPI'),
    modeBank: document.getElementById('modeBank'),
    upiDetails: document.getElementById('upiDetails'),
    bankDetails: document.getElementById('bankDetails'),
    termsConfirmed: document.getElementById('termsConfirmed'),
    finalAgreement: document.getElementById('finalAgreement'),
    totalAmountDisplay: document.getElementById('totalAmount'),
    finalAmountDisplay: document.getElementById('finalAmount'),
    transferAmount: document.getElementById('transferAmount')
};

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    loadTermsAndConditions();
    checkCloudStorageRedirect();
    
    setTimeout(() => {
        document.getElementById('userTypeSelection').style.display = 'block';
    }, 300);
    
    setupEventListeners();
    setupDOBAutoFormat();
    
    // Initialize month display
    updateMonthDisplay('selectedMonth', 'planStartDate', 0);
    updateMonthDisplay('itSelectedMonth', 'itPlanStartDate', 0);
});

// ====== USER TYPE SELECTION ======
let isNewUser = true;

function selectUserType(type) {
    const options = document.querySelectorAll('.user-type-option');
    options.forEach(opt => {
        opt.style.borderColor = 'transparent';
        opt.style.transform = 'scale(1)';
    });
    
    if (type === 'new') {
        isNewUser = true;
        options[0].style.borderColor = '#2196f3';
        options[0].style.transform = 'scale(1.02)';
        showNewUserFlow();
    } else {
        isNewUser = false;
        options[1].style.borderColor = '#4caf50';
        options[1].style.transform = 'scale(1.02)';
        showExistingUserLogin();
    }
}

function showNewUserFlow() {
    document.getElementById('userTypeSelection').style.display = 'none';
    elements.termsModal.style.display = 'flex';
}

function showExistingUserLogin() {
    document.getElementById('userTypeSelection').style.display = 'none';
    alert('Existing user login would be implemented here. For now, please select "New User"');
    document.getElementById('userTypeSelection').style.display = 'block';
}

// ====== DATE OF BIRTH AUTO-FORMAT ======
function setupDOBAutoFormat() {
    const dobInput = elements.dob;
    
    dobInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 2 && value.length < 4) {
            value = value.slice(0, 2) + '-' + value.slice(2);
        } else if (value.length >= 4 && value.length < 8) {
            value = value.slice(0, 2) + '-' + value.slice(2, 4) + '-' + value.slice(4);
        } else if (value.length >= 8) {
            value = value.slice(0, 2) + '-' + value.slice(2, 4) + '-' + value.slice(4, 8);
        }
        
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        dobInput.value = value;
    });
    
    dobInput.addEventListener('blur', function() {
        const error = document.getElementById('dobError');
        if (!validateDOB(dobInput.value)) {
            dobInput.classList.add('error');
            error.style.display = 'block';
        } else {
            dobInput.classList.remove('error');
            error.style.display = 'none';
        }
        updateContinueButton();
    });
}

// ====== LOAD TERMS ======
async function loadTermsAndConditions() {
    try {
        const response = await fetch('terms.html');
        if (response.ok) {
            const html = await response.text();
            document.getElementById('termsBody').innerHTML = html;
        }
    } catch (error) {
        document.getElementById('termsBody').innerHTML = `<h3>Terms & Conditions</h3><p>Please read and agree to the terms.</p>`;
    }
}

// ====== CHECK CLOUD STORAGE REDIRECT ======
function checkCloudStorageRedirect() {
    const selectedPlan = sessionStorage.getItem('selectedPlan');
    const selectedPeriod = sessionStorage.getItem('selectedPeriod');
    
    if (selectedPlan && selectedPeriod) {
        paymentState.isFromCloudStorage = true;
        paymentState.cloudStorageData = {
            plan: selectedPlan,
            period: selectedPeriod
        };
    }
}

// ====== SETUP EVENT LISTENERS ======
function setupEventListeners() {
    elements.btnAgree.addEventListener('click', agreeToTerms);
    elements.btnDisagree.addEventListener('click', showDisagreeConfirmation);
    elements.btnDisagreeNo.addEventListener('click', hideDisagreeConfirmation);
    elements.btnDisagreeYes.addEventListener('click', disagreeAndRedirect);
    elements.closeTerms.addEventListener('click', showDisagreeConfirmation);
    
    elements.cloudService.addEventListener('click', () => selectService('cloud'));
    elements.itService.addEventListener('click', () => selectService('it'));
    
    elements.planGB.addEventListener('change', updateCloudAmount);
    elements.duration.addEventListener('change', function() {
        updateCloudAmount();
        updatePlanEndDate();
    });
    elements.itAmount.addEventListener('input', updateITAmount);
    
    setupFormValidation();
    
    elements.termsConfirmed.addEventListener('change', updateContinueButton);
    elements.finalAgreement.addEventListener('change', updateContinueButton);
    
    elements.btnContinue.addEventListener('click', proceedToPayment);
    elements.btnFinalDisagree.addEventListener('click', showDisagreeConfirmation);
    
    elements.modeUPI.addEventListener('click', () => selectPaymentMode('upi'));
    elements.modeBank.addEventListener('click', () => selectPaymentMode('bank'));
    
    elements.btnCompleted.addEventListener('click', () => {
        sendDataToFormspree();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });
}

// ====== TERMS AGREEMENT ======
function agreeToTerms() {
    paymentState.agreedToTerms = true;
    elements.step1.classList.remove('active');
    elements.step1.classList.add('completed');
    elements.step2.classList.add('active');
    elements.termsModal.style.display = 'none';
    elements.paymentForm.style.display = 'block';
    elements.termsConfirmed.checked = true;
    
    if (paymentState.isFromCloudStorage && paymentState.cloudStorageData) {
        prefillCloudStorageData();
    }
}

function showDisagreeConfirmation() {
    elements.disagreeConfirm.style.display = 'flex';
}

function hideDisagreeConfirmation() {
    elements.disagreeConfirm.style.display = 'none';
}

function disagreeAndRedirect() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// ====== SERVICE SELECTION ======
function selectService(serviceType) {
    paymentState.selectedService = serviceType;
    
    elements.cloudService.classList.remove('selected');
    elements.itService.classList.remove('selected');
    elements.cloudOptions.classList.remove('active');
    elements.itOptions.classList.remove('active');
    
    if (serviceType === 'cloud') {
        elements.cloudService.classList.add('selected');
        elements.cloudOptions.classList.add('active');
        updatePlanEndDate();
        
        if (paymentState.isFromCloudStorage && paymentState.cloudStorageData) {
            prefillCloudStorageData();
        }
    } else {
        elements.itService.classList.add('selected');
        elements.itOptions.classList.add('active');
    }
    
    updateContinueButton();
}

function prefillCloudStorageData() {
    if (!paymentState.cloudStorageData) return;
    
    const data = paymentState.cloudStorageData;
    elements.planGB.value = data.plan;
    elements.duration.value = data.period;
    updateCloudAmount();
    updatePlanEndDate();
    
    elements.planGB.disabled = true;
    elements.duration.disabled = true;
    elements.planGB.style.backgroundColor = '#f5f5f5';
    elements.duration.style.backgroundColor = '#f5f5f5';
}

// ====== AMOUNT CALCULATIONS ======
function updateCloudAmount() {
    const plan = elements.planGB.value;
    const duration = elements.duration.value;
    
    if (plan && duration) {
        const basePrice = parseInt(plan) * 1.5;
        const multiplier = duration === 'yearly' ? 12 : 1;
        const discount = duration === 'yearly' ? 0.1 : 0;
        
        let amount = basePrice * multiplier;
        amount = amount - (amount * discount);
        amount = amount + (amount * 0.18);
        
        paymentState.totalAmount = Math.round(amount);
        elements.cloudAmount.value = `₹ ${paymentState.totalAmount.toLocaleString()}`;
        updateAmountDisplay();
    }
    
    updateContinueButton();
}

function updateITAmount() {
    const amount = parseFloat(elements.itAmount.value) || 0;
    paymentState.totalAmount = amount;
    updateAmountDisplay();
    updateContinueButton();
}

function updateAmountDisplay() {
    elements.totalAmountDisplay.textContent = `₹ ${paymentState.totalAmount.toLocaleString()}`;
    elements.finalAmountDisplay.textContent = `₹ ${paymentState.totalAmount.toLocaleString()}`;
    elements.transferAmount.textContent = `₹ ${paymentState.totalAmount.toLocaleString()}`;
}

// ====== FORM VALIDATION ======
function setupFormValidation() {
    const validateFields = [
        { id: 'firstName', validate: validateName, errorId: 'firstNameError' },
        { id: 'thirdName', validate: validateName, errorId: 'thirdNameError' },
        { id: 'phone', validate: validatePhone, errorId: 'phoneError' },
        { id: 'email', validate: validateEmail, errorId: 'emailError' },
        { id: 'aadhaar', validate: validateAadhaar, errorId: 'aadhaarError' },
        { id: 'pan', validate: validatePAN, errorId: 'panError' }
    ];
    
    validateFields.forEach(field => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);
        
        input.addEventListener('blur', () => {
            if (!field.validate(input.value)) {
                input.classList.add('error');
                error.style.display = 'block';
            } else {
                input.classList.remove('error');
                error.style.display = 'none';
            }
            updateContinueButton();
        });
    });
    
    elements.gender.addEventListener('change', updateContinueButton);
    elements.planGB.addEventListener('change', updateContinueButton);
    elements.duration.addEventListener('change', updateContinueButton);
    elements.serviceType.addEventListener('input', updateContinueButton);
    elements.itAmount.addEventListener('input', updateContinueButton);
}

function validateName(name) {
    return name.trim().length > 0 && name.trim().length <= 15;
}

function validatePhone(phone) {
    return /^[6-9]\d{9}$/.test(phone);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 40;
}

function validateAadhaar(aadhaar) {
    return /^\d{12}$/.test(aadhaar);
}

function validatePAN(pan) {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
}

function validateDOB(dob) {
    return /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(dob);
}

function validateAllFields() {
    const validations = [
        validateName(elements.firstName.value),
        validateName(elements.thirdName.value),
        validatePhone(elements.phone.value),
        validateEmail(elements.email.value),
        validateAadhaar(elements.aadhaar.value),
        validatePAN(elements.pan.value),
        validateDOB(elements.dob.value),
        elements.gender.value !== ''
    ];
    
    if (paymentState.selectedService === 'cloud') {
        validations.push(elements.planGB.value !== '');
        validations.push(elements.duration.value !== '');
        validations.push(paymentState.totalAmount > 0);
    } else if (paymentState.selectedService === 'it') {
        validations.push(elements.serviceType.value.trim().length > 0);
        validations.push(parseFloat(elements.itAmount.value) > 0);
    }
    
    validations.push(elements.termsConfirmed.checked);
    validations.push(elements.finalAgreement.checked);
    
    return validations.every(v => v === true);
}

// ====== CONTINUE BUTTON ======
function updateContinueButton() {
    elements.btnContinue.disabled = !validateAllFields();
}

function proceedToPayment() {
    if (!validateAllFields()) {
        alert('Please fill all required fields correctly.');
        return;
    }

    // Prepare data for dashboard
    const formData = {
        First_Name: elements.firstName.value,
        Second_Name: elements.secondName.value,
        Third_Name: elements.thirdName.value,
        Date_of_Birth: elements.dob.value,
        Phone_Number: elements.phone.value,
        Email_ID: elements.email.value,
        Gender: elements.gender.value,
        PAN_Number: elements.pan.value,
        Aadhaar_Number: elements.aadhaar.value,
        Selected_Service: paymentState.selectedService,
        Total_Amount: paymentState.totalAmount,
        Plan_GB: paymentState.selectedService === 'cloud' ? elements.planGB.value : '',
        Duration: paymentState.selectedService === 'cloud' ? elements.duration.value : '',
        Service_Type: paymentState.selectedService === 'it' ? elements.serviceType.value : '',
        Payment_Mode: paymentState.paymentMode
    };
    
    // Capture to dashboard (silently)
    captureToDashboard(formData);
    
    // Update steps
    elements.step2.classList.remove('active');
    elements.step2.classList.add('completed');
    elements.step3.classList.add('active');
    
    // Show payment section
    elements.paymentForm.style.display = 'none';
    elements.paymentDetailsSection.style.display = 'block';
    
    // Default to UPI
    selectPaymentMode('upi');
}

// ====== PAYMENT MODE SELECTION ======
function selectPaymentMode(mode) {
    paymentState.paymentMode = mode;
    
    elements.modeUPI.classList.remove('selected');
    elements.modeBank.classList.remove('selected');
    elements.upiDetails.classList.remove('active');
    elements.bankDetails.classList.remove('active');
    
    if (mode === 'upi') {
        elements.modeUPI.classList.add('selected');
        elements.upiDetails.classList.add('active');
    } else {
        elements.modeBank.classList.add('selected');
        elements.bankDetails.classList.add('active');
    }
}

// ====== AUTO-SAVE TO ADMIN DATABASE ======
function autoSaveToAdminDB(formData) {
    try {
        // Generate User ID (6 digits, 2-9, no zeros)
        function generateUserId() {
            let userId = '';
            const digits = '23456789';
            for (let i = 0; i < 6; i++) {
                userId += digits.charAt(Math.floor(Math.random() * digits.length));
            }
            return userId;
        }

        // Get User ID (generate new or use existing)
        if (!paymentState.userId) {
            paymentState.userId = generateUserId();
        }
        
        // Set registration date (FIRST TIME ONLY - never changes)
        if (!paymentState.registrationDate) {
            paymentState.registrationDate = new Date().toISOString().split('T')[0];
        }
        
        // Prepare user data
        const userData = {
            userId: paymentState.userId,
            registrationDate: paymentState.registrationDate,
            timestamp: new Date().toISOString(),
            personalInfo: {
                fullName: `${formData.First_Name} ${formData.Second_Name || ''} ${formData.Third_Name}`.trim(),
                dob: formData.Date_of_Birth,
                phone: formData.Phone_Number,
                email: formData.Email_ID,
                gender: formData.Gender,
                pan: formData.PAN_Number,
                aadhaar: formData.Aadhaar_Number
            },
            serviceInfo: {
                planGB: formData.Plan_GB || 'N/A',
                duration: formData.Duration || 'N/A',
                amountPaid: formData.Total_Amount,
                serviceType: formData.Selected_Service === 'it' ? formData.Service_Type : 'Cloud Storage',
                startDate: formData.Plan_Start_Date || formData.Service_Start_Date,
                endDate: formData.Plan_End_Date || 'Ongoing'
            }
        };
        
        // Encrypt sensitive data (simple XOR encryption)
        function encryptData(data, key = 'odelya-secure-admin-key-2024!@#$') {
            let encrypted = '';
            for (let i = 0; i < data.length; i++) {
                const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
                encrypted += String.fromCharCode(charCode);
            }
            return btoa(encrypted); // Base64 encode
        }
        
        // Prepare encrypted data for admin panel
        const encryptedUser = {
            userId: paymentState.userId,
            fullName: userData.personalInfo.fullName,
            email: encryptData(userData.personalInfo.email),
            phone: encryptData(userData.personalInfo.phone),
            amount: userData.serviceInfo.amountPaid,
            encryptedData: encryptData(JSON.stringify(userData)),
            paymentMode: '', // LEFT BLANK for admin to fill
            paymentStatus: 'Not Paid', // Default status
            passwordAttempts: 0, // NEW FIELD
            registrationDate: paymentState.registrationDate,
            planStart: userData.serviceInfo.startDate,
            planEnd: userData.serviceInfo.endDate,
            serviceType: userData.serviceInfo.serviceType,
            planGB: userData.serviceInfo.planGB,
            duration: userData.serviceInfo.duration
        };
        
        // Save to localStorage (admin database)
        localStorage.setItem(`user_${paymentState.userId}`, JSON.stringify(encryptedUser));
        
        console.log('User data auto-saved to admin database:', {
            userId: paymentState.userId,
            status: 'encrypted and stored',
            timestamp: new Date().toLocaleString()
        });
        
        return paymentState.userId;
        
    } catch (error) {
        console.error('Auto-save error:', error);
        return null;
    }
}

// ====== MODIFY THE proceedToPayment FUNCTION ======
// Find this function in your payment-script.js and add the auto-save call:

// Look for this function in your existing code:
function proceedToPayment() {
    if (!validateAllFields()) {
        alert('Please fill all required fields correctly.');
        return;
   }

    // Prepare data for dashboard (existing code)
    const formData = {
        First_Name: elements.firstName.value,
        Second_Name: elements.secondName.value,
        Third_Name: elements.thirdName.value,
        Date_of_Birth: elements.dob.value,
        Phone_Number: elements.phone.value,
        Email_ID: elements.email.value,
        Gender: elements.gender.value,
        PAN_Number: elements.pan.value,
        Aadhaar_Number: elements.aadhaar.value,
        Selected_Service: paymentState.selectedService,
        Total_Amount: paymentState.totalAmount,
        Plan_GB: paymentState.selectedService === 'cloud' ? elements.planGB.value : '',
        Duration: paymentState.selectedService === 'cloud' ? elements.duration.value : '',
        Service_Type: paymentState.selectedService === 'it' ? elements.serviceType.value : '',
        Payment_Mode: paymentState.paymentMode,
        Plan_Start_Date: paymentState.selectedService === 'cloud' ? document.getElementById('planStartDate').textContent : '',
        Plan_End_Date: paymentState.selectedService === 'cloud' ? document.getElementById('planEndDate').textContent : '',
        Service_Start_Date: paymentState.selectedService === 'it' ? document.getElementById('itPlanStartDate').textContent : ''
    };
    
    // === ADD THIS LINE: Auto-save to admin database ===
    autoSaveToAdminDB(formData);
    
    // Continue with existing code...
    // Capture to dashboard (silently)
    captureToDashboard(formData);
    
    // Update steps
    elements.step2.classList.remove('active');
    elements.step2.classList.add('completed');
    elements.step3.classList.add('active');
    
    // Show payment section
    elements.paymentForm.style.display = 'none';
    elements.paymentDetailsSection.style.display = 'block';
    
    // Default to UPI
    selectPaymentMode('upi');
}
// ====== AUTO-SAVE TO ADMIN DATABASE ======
function autoSaveToAdminDB(formData) {
    try {
        // Generate User ID (6 digits, 2-9, no zeros)
        function generateUserId() {
            let userId = '';
            const digits = '23456789';
            for (let i = 0; i < 6; i++) {
                userId += digits.charAt(Math.floor(Math.random() * digits.length));
            }
            return userId;
        }

        // Get User ID (generate new or use existing)
        if (!paymentState.userId) {
            paymentState.userId = generateUserId();
        }
        
        // Set registration date (FIRST TIME ONLY - never changes)
        if (!paymentState.registrationDate) {
            paymentState.registrationDate = new Date().toISOString().split('T')[0];
        }
        
        // Prepare user data
        const userData = {
            userId: paymentState.userId,
            registrationDate: paymentState.registrationDate,
            timestamp: new Date().toISOString(),
            personalInfo: {
                fullName: `${formData.First_Name} ${formData.Second_Name || ''} ${formData.Third_Name}`.trim(),
                dob: formData.Date_of_Birth,
                phone: formData.Phone_Number,
                email: formData.Email_ID,
                gender: formData.Gender,
                pan: formData.PAN_Number,
                aadhaar: formData.Aadhaar_Number
            },
            serviceInfo: {
                planGB: formData.Plan_GB || 'N/A',
                duration: formData.Duration || 'N/A',
                amountPaid: formData.Total_Amount,
                serviceType: formData.Selected_Service === 'it' ? formData.Service_Type : 'Cloud Storage',
                startDate: formData.Plan_Start_Date || formData.Service_Start_Date,
                endDate: formData.Plan_End_Date || 'Ongoing'
            }
        };
        
        // Encrypt sensitive data (simple XOR encryption)
        function encryptData(data, key = 'odelya-secure-admin-key-2024!@#$') {
            let encrypted = '';
            for (let i = 0; i < data.length; i++) {
                const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
                encrypted += String.fromCharCode(charCode);
            }
            return btoa(encrypted); // Base64 encode
        }
        
        // Prepare encrypted data for admin panel
        const encryptedUser = {
            userId: paymentState.userId,
            fullName: userData.personalInfo.fullName,
            email: encryptData(userData.personalInfo.email),
            phone: encryptData(userData.personalInfo.phone),
            amount: userData.serviceInfo.amountPaid,
            encryptedData: encryptData(JSON.stringify(userData)),
            paymentMode: '', // LEFT BLANK for admin to fill
            paymentStatus: 'Not Paid', // Default status
            passwordAttempts: 0, // NEW FIELD
            registrationDate: paymentState.registrationDate,
            planStart: userData.serviceInfo.startDate,
            planEnd: userData.serviceInfo.endDate,
            serviceType: userData.serviceInfo.serviceType,
            planGB: userData.serviceInfo.planGB,
            duration: userData.serviceInfo.duration
        };
        
        // Save to localStorage (admin database)
        localStorage.setItem(`user_${paymentState.userId}`, JSON.stringify(encryptedUser));
        
        console.log('User data auto-saved to admin database:', {
            userId: paymentState.userId,
            status: 'encrypted and stored',
            timestamp: new Date().toLocaleString()
        });
        
        return paymentState.userId;
        
    } catch (error) {
        console.error('Auto-save error:', error);
        return null;
    }
}
