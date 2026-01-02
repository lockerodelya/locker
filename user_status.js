// user_status.js - Fetches and stores user data with successful payment status

// Global variable to store successful payment users
let successfulUsers = JSON.parse(localStorage.getItem('successfulUsers')) || [];

// Function to check payment status and store if successful
function processUserPayment(userData) {
    if (!userData || !userData.paymentStatus) {
        console.error('Invalid user data provided');
        return false;
    }

    const status = userData.paymentStatus.toLowerCase();
    
    // Check for successful payment status
    if (status === 'successful' || status === 'success' || status === 'paid' || status === 'completed') {
        
        // Check if user already exists in the list
        const existingUserIndex = successfulUsers.findIndex(user => 
            user.email === userData.email || user.userId === userData.userId
        );
        
        if (existingUserIndex === -1) {
            // Add timestamp for when the payment was recorded
            userData.paymentRecordedAt = new Date().toISOString();
            
            // Add to successful users array
            successfulUsers.push(userData);
            
            // Save to localStorage for persistence
            localStorage.setItem('successfulUsers', JSON.stringify(successfulUsers));
            
            console.log('User with successful payment status stored:', userData.email || userData.userId);
            return true;
        } else {
            // Update existing user data
            successfulUsers[existingUserIndex] = {
                ...successfulUsers[existingUserIndex],
                ...userData,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('successfulUsers', JSON.stringify(successfulUsers));
            console.log('User payment data updated:', userData.email || userData.userId);
            return true;
        }
    }
    
    // Status is not successful (cancelled, not paid, processing, etc.)
    console.log('Payment status not successful:', status);
    return false;
}

// Function to fetch user data from admin.html (assuming data is passed or accessible)
function fetchUsersFromAdmin() {
    // This function assumes you have a way to get user data from admin.html
    // You'll need to adapt this based on how your admin.html provides the data
    
    // Example 1: If data is stored in localStorage from admin.html
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
    
    // Example 2: If data is passed via a global variable (make sure admin.html sets this)
    // const adminUsers = window.adminUsersData || [];
    
    if (!adminUsers || adminUsers.length === 0) {
        console.log('No user data found from admin.html');
        return [];
    }
    
    console.log(`Fetched ${adminUsers.length} users from admin.html`);
    return adminUsers;
}

// Function to process all users from admin
function processAllUsers() {
    const users = fetchUsersFromAdmin();
    let successfulCount = 0;
    
    users.forEach(user => {
        if (processUserPayment(user)) {
            successfulCount++;
        }
    });
    
    console.log(`Processed ${users.length} users. ${successfulCount} had successful payments.`);
    return { total: users.length, successful: successfulCount };
}

// Function to get all users with successful payments
function getSuccessfulUsers() {
    return successfulUsers;
}

// Function to clear all stored user data (for testing/reset purposes)
function clearUserStatusData() {
    successfulUsers = [];
    localStorage.removeItem('successfulUsers');
    console.log('All user status data cleared');
}

// Function to export successful users as JSON file
function exportSuccessfulUsers() {
    const dataStr = JSON.stringify(successfulUsers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'successful_users.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log(`Exported ${successfulUsers.length} successful users`);
}

// Auto-process users when the script loads (optional)
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('User status module loaded');
//     // Uncomment the next line to auto-process on page load
//     // processAllUsers();
// });

// Make functions available globally (optional - if you need to call them from other scripts)
window.userStatusModule = {
    processUserPayment,
    processAllUsers,
    getSuccessfulUsers,
    clearUserStatusData,
    exportSuccessfulUsers,
    fetchUsersFromAdmin
};
