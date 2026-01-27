// chatbot-mini.js - Simple Chatbot using odelyaqa.js
// This works similar to odelyafaq.html but in a chat window

document.addEventListener('DOMContentLoaded', function() {
    // ====== CHATBOT ELEMENTS ======
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const suggestedQuestions = document.getElementById('suggested-questions');
    
    // ====== CHATBOT FUNCTIONS ======
    
    function initializeChatbot() {
        // Hide chat window initially
        chatWindow.style.display = 'none';
        chatToggleBtn.style.display = 'flex';
        
        // Don't show greeting here (HTML already has it)
        
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
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
        
        // Show suggestions while typing
        chatInput.addEventListener('input', function() {
            showSuggestions(this.value.trim());
        });
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
    }
    
    function showGreeting() {
        addBotMessage("Hi! I am Vooo. How can I help you today?");
    }
    
    function showSuggestions(searchTerm) {
        if (!searchTerm || !window.odelyaQA || !window.odelyaQA.database) {
            suggestedQuestions.style.display = 'none';
            suggestedQuestions.innerHTML = '';
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
            matched.slice(0, 5).forEach(qa => {
                const div = document.createElement('div');
                div.className = 'question-item';
                div.textContent = qa.question;
                div.addEventListener('click', () => {
                    chatInput.value = qa.question;
                    suggestedQuestions.style.display = 'none';
                    handleSendMessage();
                });
                suggestedQuestions.appendChild(div);
            });
            suggestedQuestions.style.display = 'flex';
        } else {
            suggestedQuestions.style.display = 'none';
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
    
    function getAnswerFromDatabase(question) {
        // Check if odelyaQA is loaded
        if (typeof window.odelyaQA === 'undefined' || !window.odelyaQA.database) {
            return "I'm sorry, my knowledge base is not loaded. Please try again.";
        }
        
        const normalizedQuestion = question.toLowerCase().trim();
        
        // First, try exact match
        for (const qa of window.odelyaQA.database) {
            if (qa.question.toLowerCase() === normalizedQuestion) {
                return qa.answer;
            }
        }
        
        // Then try partial match
        for (const qa of window.odelyaQA.database) {
            if (normalizedQuestion.includes(qa.question.toLowerCase()) || 
                qa.question.toLowerCase().includes(normalizedQuestion)) {
                return qa.answer;
            }
        }
        
        // Try keyword matching
        const searchWords = normalizedQuestion.split(/\s+/).filter(word => word.length > 2);
        let bestMatch = null;
        let bestScore = 0;
        
        for (const qa of window.odelyaQA.database) {
            const qaWords = qa.question.toLowerCase().split(/\s+/);
            let score = 0;
            
            for (const word of searchWords) {
                for (const qaWord of qaWords) {
                    if (qaWord.includes(word) || word.includes(qaWord)) {
                        score++;
                        break;
                    }
                }
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestMatch = qa;
            }
        }
        
        if (bestMatch && bestScore > 0) {
            return bestMatch.answer;
        }
        
        // Default response if no match found
        return "Dear user, my advice is to please contact our support team via WhatsApp: +91-9674130001 or email: care.ompl@gmail.com during office hours. Thanks.";
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
