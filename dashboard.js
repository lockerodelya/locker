// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const currentDateElement = document.getElementById('current-date');
const userSearchInput = document.getElementById('user-search');
const newUserForm = document.getElementById('new-user-form');
const usersTableBody = document.getElementById('users-table-body');
const paymentsTableBody = document.getElementById('payments-table-body');
const toast = document.getElementById('toast');

// Statistics elements
const totalUsersElement = document.getElementById('total-users');
const activeTodayElement = document.getElementById('active-today');
const expiringSoonElement = document.getElementById('expiring-soon');
const monthlyRevenueElement = document.getElementById('monthly-revenue');

// Sample data for users
let users = JSON.parse(localStorage.getItem('gymUsers')) || [
    {
        id: "GYM001",
        name: "John Doe",
        phone: "9876543210",
        email: "",
        planType: "premium",
        duration: 6,
        startDate: "2024-01-15",
        endDate: "2024-07-15",
        paymentMode: "cash",
        paymentStatus: "completed",
        amount: 24000
    },
    {
        id: "GYM002",
        name: "Jane Smith",
        phone: "9876543211",
        email: "",
        planType: "standard",
        duration: 3,
        startDate: "2024-02-01",
        endDate: "2024-05-01",
        paymentMode: "online",
        paymentStatus: "completed",
        amount: 7500
    },
    {
        id: "GYM003",
        name: "Robert Johnson",
        phone: "9876543212",
        email: "",
        planType: "basic",
        duration: 1,
        startDate: "2024-03-10",
        endDate: "2024-04-10",
        paymentMode: "cash",
        paymentStatus: "pending",
        amount: 1500
    }
];

// Sample data for payments
let payments = JSON.parse(localStorage.getItem('gymPayments')) || [
    {
        paymentId: "PAY001",
        userId: "GYM001",
        userName: "John Doe",
        amount: 24000,
        date: "2024-01-15",
        status: "completed"
    },
    {
        paymentId: "PAY002",
        userId: "GYM002",
        userName: "Jane Smith",
        amount: 7500,
        date: "2024-02-01",
        status: "completed"
    },
    {
        paymentId: "PAY003",
        userId: "GYM003",
        userName: "Robert Johnson",
        amount: 1500,
        date: "2024-03-10",
        status: "pending"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const now = new Date();
    currentDateElement.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Initialize data
    updateStats();
    renderUsersTable();
    renderPaymentsTable();
    saveData();

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.querySelector('a').getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                document.getElementById(`${pageId}-page`).classList.add('active');
            }
        });
    });

    // User search
    userSearchInput.addEventListener('input', function() {
        renderUsersTable(this.value.toLowerCase());
    });

    // New user form submission
    newUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewUser();
    });

    // Set default start date to today
    document.getElementById('start-date').valueAsDate = new Date();
});

// Generate unique user ID
function generateUserId() {
    const lastId = users.length > 0 ? 
        parseInt(users[users.length - 1].id.replace('GYM', '')) : 0;
    return `GYM${(lastId + 1).toString().padStart(3, '0')}`;
}

// Add new user
function addNewUser() {
    const name = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const planType = document.getElementById('plan-type').value;
    const duration = parseInt(document.getElementById('duration').value);
    const startDate = document.getElementById('start-date').value;

    // Calculate end date
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(start.getMonth() + duration);

    // Format dates
    const formatDate = (date) => date.toISOString().split('T')[0];

    // Calculate amount
    const planPrices = {
        'basic': 1500,
        'standard': 2500,
        'premium': 4000
    };
    const amount = planPrices[planType] * duration;

    // Create new user
    const newUser = {
        id: generateUserId(),
        name: name,
        phone: phone,
        email: "", // No email collection
        planType: planType,
        duration: duration,
        startDate: formatDate(start),
        endDate: formatDate(end),
        paymentMode: "cash", // Default
        paymentStatus: "pending", // Default
        amount: amount
    };

    // Add to users array
    users.push(newUser);

    // Create corresponding payment record
    const newPayment = {
        paymentId: `PAY${(payments.length + 1).toString().padStart(3, '0')}`,
        userId: newUser.id,
        userName: newUser.name,
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        status: "pending"
    };
    payments.push(newPayment);

    // Update UI and storage
    updateStats();
    renderUsersTable();
    renderPaymentsTable();
    saveData();
    newUserForm.reset();
    
    // Set default start date to today
    document.getElementById('start-date').valueAsDate = new Date();

    // Show success message
    showToast(`User ${name} created successfully with ID: ${newUser.id}`);
}

// Render users table
function renderUsersTable(searchTerm = '') {
    usersTableBody.innerHTML = '';
    
    const filteredUsers = users.filter(user => 
        !searchTerm || 
        user.id.toLowerCase().includes(searchTerm) ||
        user.name.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm)
    );

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        
        // Format date for display
        const endDate = new Date(user.endDate);
        const formattedDate = endDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Check if expired
        const today = new Date();
        const isExpired = endDate < today;
        const daysUntilExpiry = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>
                <div class="user-info">
                    <span class="user-name">${user.name}</span>
                </div>
            </td>
            <td>${user.phone}</td>
            <td>
                <span class="date-badge ${isExpired ? 'expired' : daysUntilExpiry <= 7 ? 'expiring' : ''}">
                    ${formattedDate}
                    ${isExpired ? ' (Expired)' : daysUntilExpiry <= 7 ? ` (${daysUntilExpiry} days)` : ''}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit-user" data-id="${user.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon renew-user" data-id="${user.id}" title="Renew Plan">
                        <i class="fas fa-redo"></i>
                    </button>
                    <button class="btn-icon delete-user" data-id="${user.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        usersTableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.edit-user').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            editUser(userId);
        });
    });

    document.querySelectorAll('.renew-user').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            renewUser(userId);
        });
    });

    document.querySelectorAll('.delete-user').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            deleteUser(userId);
        });
    });
}

// Render payments table
function renderPaymentsTable(filter = 'all') {
    paymentsTableBody.innerHTML = '';
    
    const filteredPayments = payments.filter(payment => 
        filter === 'all' || payment.status === filter
    );

    filteredPayments.forEach(payment => {
        const row = document.createElement('tr');
        
        // Format date
        const paymentDate = new Date(payment.date);
        const formattedDate = paymentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Status badge
        const statusClass = payment.status === 'completed' ? 'status-completed' : 
                          payment.status === 'pending' ? 'status-pending' : 'status-overdue';
        
        row.innerHTML = `
            <td>${payment.paymentId}</td>
            <td>${payment.userId}</td>
            <td>${payment.userName}</td>
            <td>₹${payment.amount.toLocaleString()}</td>
            <td>${formattedDate}</td>
            <td><span class="status-badge ${statusClass}">${payment.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon mark-paid" data-id="${payment.paymentId}" title="Mark as Paid">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-icon view-receipt" data-id="${payment.paymentId}" title="View Receipt">
                        <i class="fas fa-receipt"></i>
                    </button>
                </div>
            </td>
        `;
        
        paymentsTableBody.appendChild(row);
    });

    // Add event listeners to payment action buttons
    document.querySelectorAll('.mark-paid').forEach(btn => {
        btn.addEventListener('click', function() {
            const paymentId = this.getAttribute('data-id');
            markPaymentAsPaid(paymentId);
        });
    });
}

// Update statistics
function updateStats() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Total users
    totalUsersElement.textContent = users.length;
    
    // Active today (users whose plan hasn't expired)
    const activeUsers = users.filter(user => new Date(user.endDate) >= today).length;
    activeTodayElement.textContent = activeUsers;
    
    // Expiring soon (within 7 days)
    const expiringSoon = users.filter(user => {
        const endDate = new Date(user.endDate);
        const daysUntilExpiry = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
    }).length;
    expiringSoonElement.textContent = expiringSoon;
    
    // Monthly revenue (sum of completed payments from last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const monthlyRevenue = payments
        .filter(p => p.status === 'completed')
        .filter(p => {
            const paymentDate = new Date(p.date);
            return paymentDate >= thirtyDaysAgo;
        })
        .reduce((sum, p) => sum + p.amount, 0);
    
    monthlyRevenueElement.textContent = `₹${monthlyRevenue.toLocaleString()}`;
}

// Edit user
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        // Switch to new user page with pre-filled data
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        document.querySelector('[data-page="new-user"]').classList.add('active');
        document.getElementById('new-user-page').classList.add('active');
        
        // Pre-fill form
        document.getElementById('full-name').value = user.name;
        document.getElementById('phone').value = user.phone;
        document.getElementById('plan-type').value = user.planType;
        document.getElementById('duration').value = user.duration;
        document.getElementById('start-date').value = user.startDate;
        
        showToast(`Editing user: ${user.name}`);
    }
}

// Renew user plan
function renewUser(userId) {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const user = users[userIndex];
        
        // Extend end date by current duration
        const currentEndDate = new Date(user.endDate);
        const extensionMonths = user.duration;
        currentEndDate.setMonth(currentEndDate.getMonth() + extensionMonths);
        
        // Update user
        user.endDate = currentEndDate.toISOString().split('T')[0];
        user.paymentStatus = 'pending'; // Reset payment status
        
        // Create new payment record
        const newPayment = {
            paymentId: `PAY${(payments.length + 1).toString().padStart(3, '0')}`,
            userId: user.id,
            userName: user.name,
            amount: user.amount,
            date: new Date().toISOString().split('T')[0],
            status: "pending"
        };
        payments.push(newPayment);
        
        // Update UI and storage
        updateStats();
        renderUsersTable();
        renderPaymentsTable();
        saveData();
        
        showToast(`Plan renewed for ${user.name}. New end date: ${user.endDate}`);
    }
}

// Delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            const userName = users[userIndex].name;
            users.splice(userIndex, 1);
            
            // Also remove user's payments
            payments = payments.filter(p => p.userId !== userId);
            
            // Update UI and storage
            updateStats();
            renderUsersTable();
            renderPaymentsTable();
            saveData();
            
            showToast(`User ${userName} deleted successfully`);
        }
    }
}

// Mark payment as paid
function markPaymentAsPaid(paymentId) {
    const paymentIndex = payments.findIndex(p => p.paymentId === paymentId);
    if (paymentIndex !== -1) {
        payments[paymentIndex].status = 'completed';
        
        // Also update user's payment status
        const payment = payments[paymentIndex];
        const userIndex = users.findIndex(u => u.id === payment.userId);
        if (userIndex !== -1) {
            users[userIndex].paymentStatus = 'completed';
        }
        
        // Update UI and storage
        renderPaymentsTable();
        saveData();
        
        showToast(`Payment ${paymentId} marked as completed`);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('gymUsers', JSON.stringify(users));
    localStorage.setItem('gymPayments', JSON.stringify(payments));
}

// Show toast notification
function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Payment filter
document.getElementById('payment-filter').addEventListener('change', function() {
    renderPaymentsTable(this.value);
});
