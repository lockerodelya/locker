// chatbot-mini.js - Simple Chatbot using odelyaqa.js
// This works similar to odelyafaq.html but in a chat window

document.addEventListener('DOMContentLoaded', function() {
    // ====== CHATBOT ELEMENTS ======
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const suggestedQuestions = document.getElementById('suggested-questions');
    
    // Variables for keyboard navigation
    let selectedSuggestionIndex = -1;
    
    // ====== CHATBOT FUNCTIONS ======
    
    function initializeChatbot() {
        // Hide chat window initially
        chatWindow.style.display = 'none';
        chatToggleBtn.style.display = 'flex';
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Mini Chatbot initialized');
    }
    
    function setupEventListeners() {
        // Toggle chat window
        chatToggleBtn.addEventListener('click', openChatWindow);
        
        // Close chat window
        closeChatBtn.addEventListener('click', closeChatWindow);
        
        // Send message on Enter key
        chatInput.addEventListener('keydown', function(e) {
            handleKeyboardInput(e);
        });
        
        // Show suggestions while typing
        chatInput.addEventListener('input', function() {
            showSuggestions(this.value.trim());
            selectedSuggestionIndex = -1; // Reset selection
        });
        
        // Close on Escape key for whole document
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (chatWindow.style.display === 'flex') {
                    closeChatWindow();
                }
            }
        });
    }
    
    function handleKeyboardInput(e) {
        const suggestions = document.querySelectorAll('.question-item');
        
        // Arrow Down - Navigate suggestions
        if (e.key === 'ArrowDown' && suggestions.length > 0) {
            e.preventDefault();
            selectedSuggestionIndex = (selectedSuggestionIndex + 1) % suggestions.length;
            updateSelectedSuggestion(suggestions);
            return;
        }
        
        // Arrow Up - Navigate suggestions
        if (e.key === 'ArrowUp' && suggestions.length > 0) {
            e.preventDefault();
            selectedSuggestionIndex = (selectedSuggestionIndex - 1 + suggestions.length) % suggestions.length;
            updateSelectedSuggestion(suggestions);
            return;
        }
        
        // Enter - Send message or select suggestion
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // If a suggestion is selected, use it
            if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                suggestions[selectedSuggestionIndex].click();
            } else {
                // Otherwise send the typed message
                handleSendMessage();
            }
            return;
        }
        
        // Escape - Close suggestions
        if (e.key === 'Escape') {
            if (suggestions.length > 0) {
                suggestedQuestions.style.display = 'none';
                selectedSuggestionIndex = -1;
            }
            return;
        }
    }
    
    function updateSelectedSuggestion(suggestions) {
        // Remove selection from all
        suggestions.forEach(suggestion => {
            suggestion.classList.remove('selected');
        });
        
        // Add selection to current
        if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
            suggestions[selectedSuggestionIndex].classList.add('selected');
            suggestions[selectedSuggestionIndex].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    }
    
    function openChatWindow() {
        chatWindow.style.display = 'flex';
        chatWindow.classList.add('active');
        chatInput.focus();
    }
    
    function closeChatWindow() {
        chatWindow.style.display = 'none';
        chatWindow.classList.remove('active');
        chatInput.value = '';
        suggestedQuestions.style.display = 'none';
        selectedSuggestionIndex = -1;
    }
    
    function showSuggestions(searchTerm) {
        if (!searchTerm || !window.odelyaQA || !window.odelyaQA.database) {
            suggestedQuestions.style.display = 'none';
            suggestedQuestions.innerHTML = '';
            selectedSuggestionIndex = -1;
            return;
        }
        
        const term = searchTerm.toLowerCase();
        const matched = [];
        
        // Search in questions
        window.odelyaQA.database.forEach(qa => {
            if (qa.question.toLowerCase().includes(term)) {
                matched.push(qa);
            }
        });
        
        // If no matches in questions, search in answers
        if (matched.length === 0) {
            window.odelyaQA.database.forEach(qa => {
                if (qa.answer.toLowerCase().includes(term)) {
                    matched.push(qa);
                }
            });
        }
        
        // Display suggestions (max 5)
        if (matched.length > 0) {
            suggestedQuestions.innerHTML = '';
            matched.slice(0, 5).forEach((qa, index) => {
                const div = document.createElement('div');
                div.className = 'question-item';
                if (index === 0) {
                    div.classList.add('selected');
                    selectedSuggestionIndex = 0;
                }
                div.textContent = qa.question;
                div.addEventListener('click', () => {
                    chatInput.value = qa.question;
                    suggestedQuestions.style.display = 'none';
                    selectedSuggestionIndex = -1;
                    handleSendMessage();
                });
                
                // Hover effect
                div.addEventListener('mouseenter', () => {
                    document.querySelectorAll('.question-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    div.classList.add('selected');
                    selectedSuggestionIndex = index;
                });
                
                suggestedQuestions.appendChild(div);
            });
            suggestedQuestions.style.display = 'flex';
        } else {
            suggestedQuestions.style.display = 'none';
            selectedSuggestionIndex = -1;
        }
    }
    
    function handleSendMessage() {
        const question = chatInput.value.trim();
        
        if (!question) {
            return;
        }
        
        // Add user message (in red)
        addUserMessage(question);
        
        // Clear input and hide suggestions
        chatInput.value = '';
        suggestedQuestions.style.display = 'none';
        selectedSuggestionIndex = -1;
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate processing delay
        setTimeout(() => {
            removeTypingIndicator();
            
            // Get answer from odelyaqa.js
            const answer = getAnswerFromDatabase(question);
            
            // Add bot answer (in black)
            setTimeout(() => {
                addBotMessage(answer);
                scrollToBottom();
            }, 500);
        }, 1000);
    }
    
 // In chatbot-mini.js, replace getAnswerFromDatabase with:

function getAnswerFromDatabase(question) {
    // Check if odelyaQA is loaded
    if (typeof window.odelyaQA === 'undefined' || !window.odelyaQA.database) {
        return "I'm sorry, my knowledge base is not loaded. Please try again.";
    }
    
    const normalizedQuestion = question.toLowerCase().trim();
    
    // 1. First try EXACT match (like FAQ page)
    for (const qa of window.odelyaQA.database) {
        if (qa.question.toLowerCase() === normalizedQuestion) {
            return qa.answer;
        }
    }
    
    // 2. Then try PARTIAL match (like FAQ page)
    for (const qa of window.odelyaQA.database) {
        if (normalizedQuestion.includes(qa.question.toLowerCase()) || 
            qa.question.toLowerCase().includes(normalizedQuestion)) {
            return qa.answer;
        }
    }
    
    // 3. NO keyword matching! If no match found, show contact message
    return `Sorry, I don't have an answer for "${question}" in my knowledge base.<br><br>
            <strong>Please contact our support team:</strong><br>
            📞 WhatsApp: +91-9674130001<br>
            📧 Email: care.ompl@gmail.com<br>
            ⏰ Office Hours: Mon-Sat 9AM-8PM`;
}
    
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
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function addUserMessage(message) {
        addMessage(message, true);
    }
    
    function addBotMessage(message) {
        addMessage(message, false);
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Initialize the chatbot
    initializeChatbot();
});
