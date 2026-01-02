/**
 * User Log Display Component
 * Displays permanently stored user data in user.html
 */

class UserLogDisplay {
    constructor() {
        this.logContainerId = 'userLogDisplayContainer';
        this.fetcher = window.PaymentBasedUserFetcher;
        this.init();
    }

    init() {
        this.createDisplayContainer();
        this.setupEventListeners();
    }

    createDisplayContainer() {
        // Create container if it doesn't exist
        if (!document.getElementById(this.logContainerId)) {
            const container = document.createElement('div');
            container.id = this.logContainerId;
            container.className = 'user-log-display';
            container.style.cssText = `
                margin: 20px 0;
                padding: 20px;
                background: #f8f9ff;
                border-radius: 10px;
                border-left: 5px solid #4caf50;
                display: none;
            `;
            
            container.innerHTML = `
                <h3 style="color: #1a237e; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-history"></i> Permanent User Log
                </h3>
                <div class="log-stats" style="margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px;">
                    <p style="margin: 5px 0;">Loading statistics...</p>
                </div>
                <div class="log-entries" style="max-height: 300px; overflow-y: auto;">
                    <p style="text-align: center; color: #666; padding: 20px;">
                        No log entries to display
                    </p>
                </div>
                <div class="log-actions" style="margin-top: 15px; display: flex; gap: 10px;">
                    <button class="btn-refresh-log" style="padding: 8px 15px; background: #2196f3; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-sync-alt"></i> Refresh Log
                    </button>
                    <button class="btn-clear-log" style="padding: 8px 15px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-trash"></i> Clear Log
                    </button>
                </div>
            `;
            
            // Insert after plan history section
            const planHistorySection = document.querySelector('.plan-history');
            if (planHistorySection) {
                planHistorySection.parentNode.insertBefore(container, planHistorySection.nextSibling);
            }
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-refresh-log')) {
                this.refreshLogDisplay();
            }
            
            if (e.target.closest('.btn-clear-log')) {
                if (confirm('Are you sure you want to clear the permanent log? This action cannot be undone.')) {
                    this.clearLog();
                }
            }
        });
    }

    refreshLogDisplay() {
        if (!this.fetcher) {
            console.error('PaymentBasedUserFetcher not available');
            return;
        }

        const container = document.getElementById(this.logContainerId);
        if (!container) return;

        // Get statistics
        const stats = this.fetcher.getLogStatistics();
        const statsHtml = `
            <p style="margin: 5px 0;"><strong>Total Entries:</strong> ${stats.totalEntries}</p>
            <p style="margin: 5px 0;"><strong>Unique Users:</strong> ${stats.uniqueUsers}</p>
            <p style="margin: 5px 0;"><strong>By Status:</strong> ${
                Object.entries(stats.byPaymentStatus)
                    .map(([status, count]) => `${status}: ${count}`)
                    .join(', ')
            }</p>
        `;

        container.querySelector('.log-stats').innerHTML = statsHtml;

        // Get all log entries
        const log = JSON.parse(localStorage.getItem('odelya_user_log_permanent')) || [];
        
        if (log.length === 0) {
            container.querySelector('.log-entries').innerHTML = `
                <p style="text-align: center; color: #666; padding: 20px;">
                    No permanent log entries found
                </p>
            `;
            return;
        }

        // Create table of log entries
        let tableHtml = `
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                <thead>
                    <tr style="background: #e3f2fd;">
                        <th style="padding: 8px; text-align: left; border-bottom: 2px solid #bbdefb;">User ID</th>
                        <th style="padding: 8px; text-align: left; border-bottom: 2px solid #bbdefb;">Name</th>
                        <th style="padding: 8px; text-align: left; border-bottom: 2px solid #bbdefb;">Status</th>
                        <th style="padding: 8px; text-align: left; border-bottom: 2px solid #bbdefb;">Fetched At</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Show latest 10 entries
        const recentEntries = log.slice(-10).reverse();
        
        recentEntries.forEach(entry => {
            const date = new Date(entry.fetchedAt);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            
            tableHtml += `
                <tr style="border-bottom: 1px solid #e0e0e0;">
                    <td style="padding: 8px;">${entry.userId || 'N/A'}</td>
                    <td style="padding: 8px;">${entry.fullName || 'N/A'}</td>
                    <td style="padding: 8px;">
                        <span style="padding: 3px 8px; border-radius: 12px; font-size: 0.8em; background: ${
                            entry.paymentStatus === 'successful' ? '#e8f5e9' : '#fff3e0'
                        }; color: ${
                            entry.paymentStatus === 'successful' ? '#2e7d32' : '#e65100'
                        };">
                            ${entry.paymentStatus || 'unknown'}
                        </span>
                    </td>
                    <td style="padding: 8px; font-size: 0.85em;">${formattedDate}</td>
                </tr>
            `;
        });

        tableHtml += `
                </tbody>
            </table>
        `;

        container.querySelector('.log-entries').innerHTML = tableHtml;
    }

    clearLog() {
        localStorage.setItem('odelya_user_log_permanent', JSON.stringify([]));
        this.refreshLogDisplay();
        alert('Permanent user log cleared successfully.');
    }

    show() {
        const container = document.getElementById(this.logContainerId);
        if (container) {
            container.style.display = 'block';
            this.refreshLogDisplay();
        }
    }

    hide() {
        const container = document.getElementById(this.logContainerId);
        if (container) {
            container.style.display = 'none';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.PaymentBasedUserFetcher) {
        window.UserLogDisplay = new UserLogDisplay();
    }
});
