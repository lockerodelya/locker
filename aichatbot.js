// aichatbot.js - AI Chatbot for Odelya Management Pvt Ltd
// Q&A Database Source: odelyaqa.js

document.addEventListener('DOMContentLoaded', function() {
    // ====== CHATBOT VARIABLES ======
    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const suggestedQuestions = document.getElementById('suggested-questions');
    
    // ====== Q&A DATABASE REFERENCE ======
    // Using the external Q&A database from odelyaqa.js
    let qaDatabase = [];
    
    // ====== CHATBOT FUNCTIONS ======
    
    // Initialize chatbot
    function initializeChatbot() {
        // First, make sure chat window is hidden and toggle button is visible
        if (chatWindow) chatWindow.style.display = 'none';
        if (chatToggle) chatToggle.style.display = 'flex';
        
        // Load Q&A database
        loadQADatabase();
        
        // Setup event listeners
        setupEventListeners();
        
        // Show greeting
        showGreeting();
        
        // Add simple test to verify elements
        console.log('Chatbot initialized successfully');
        console.log('Chat toggle:', chatToggle ? 'Found' : 'Not found');
        console.log('Chat window:', chatWindow ? 'Found' : 'Not found');
    }
    
    // Load Q&A database
    function loadQADatabase() {
        // Check if odelyaQA is loaded (from odelyaqa.js)
        if (typeof window.odelyaQA !== 'undefined' && window.odelyaQA.database) {
            qaDatabase = window.odelyaQA.database;
            console.log(`Loaded ${qaDatabase.length} Q&A pairs from external database`);
        } else {
            // Fallback to minimal default Q&A if external file not loaded
            qaDatabase = [
                {
                    question: "Default question",
                    answer: "Please ensure odelyaqa.js is properly loaded in your HTML file.",
                    category: "general"
                }
            ];
            console.warn('External Q&A database not found. Using fallback.');
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Check if elements exist before adding listeners
        if (!chatToggle || !chatWindow || !closeChat || !sendBtn) {
            console.error('Some chat elements not found!');
            return;
        }
        
        // Toggle chat window
        chatToggle.addEventListener('click', toggleChat);
        
        // Close chat window
        closeChat.addEventListener('click', closeChatWindow);
        
        // Send message on button click
        sendBtn.addEventListener('click', handleSendMessage);
        
        // Send message on Enter key
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSendMessage();
                }
            });
            
            // Show suggestions while typing
            chatInput.addEventListener('input', function() {
                showDynamicSuggestions(this.value.trim());
            });
            
            // Hide suggestions when input is cleared
            chatInput.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    hideSuggestions();
                }
            });
        }
    }
    
    // Toggle chat window
    function toggleChat() {
        console.log('Toggle clicked');
        if (chatWindow.style.display === 'flex' || chatWindow.style.display === '') {
            closeChatWindow();
        } else {
            openChatWindow();
        }
    }
    
    // Open chat window
    function openChatWindow() {
        console.log('Opening chat window');
        chatWindow.style.display = 'flex';
        chatToggle.style.display = 'none';
        if (chatInput) chatInput.focus();
    }
    
    // Close chat window
    function closeChatWindow() {
        console.log('Closing chat window');
        chatWindow.style.display = 'none';
        chatToggle.style.display = 'flex';
        clearChat();
        hideSuggestions();
        if (chatInput) chatInput.value = '';
        showGreeting();
    }
    
    // Show greeting message
    function showGreeting() {
        if (chatMessages) {
            chatMessages.innerHTML = '';
            addBotMessage("Hi! I am Vooo. Please type your query below");
        }
    }
    
    // Clear chat
    function clearChat() {
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
    }
    
    // Show dynamic suggestions based on typing
    function showDynamicSuggestions(inputText) {
        if (!inputText || !suggestedQuestions) {
            hideSuggestions();
            return;
        }
        
        const normalizedInput = inputText.toLowerCase().trim();
        const matchedQuestions = [];
        
        // Find matching questions
        qaDatabase.forEach(qa => {
            const questionLower = qa.question.toLowerCase();
            const keywords = extractKeywords(qa.question);
            
            // Check direct match
            if (questionLower.includes(normalizedInput) || 
                normalizedInput.includes(questionLower.substring(0, normalizedInput.length))) {
                matchedQuestions.push(qa);
                return;
            }
            
            // Check keyword match
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword) || keyword.includes(normalizedInput)) {
                    matchedQuestions.push(qa);
                    return;
                }
            }
            
            // Check category match
            if (normalizedInput.includes(qa.category)) {
                matchedQuestions.push(qa);
                return;
            }
        });
        
        // Remove duplicates
        const uniqueQuestions = [...new Set(matchedQuestions)];
        
        // Show top 5 suggestions
        if (uniqueQuestions.length > 0) {
            displaySuggestions(uniqueQuestions.slice(0, 5));
        } else {
            hideSuggestions();
        }
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
        
        return [...new Set(words)];
    }
    
    // Display suggestions
    function displaySuggestions(suggestions) {
        if (!suggestedQuestions) return;
        
        suggestedQuestions.innerHTML = '';
        
        suggestions.forEach(qa => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.textContent = qa.question;
            questionDiv.addEventListener('click', () => {
                if (chatInput) {
                    chatInput.value = qa.question;
                }
                hideSuggestions();
                handleSendMessage();
            });
            suggestedQuestions.appendChild(questionDiv);
        });
        
        suggestedQuestions.classList.add('show');
    }
    
    // Hide suggestions
    function hideSuggestions() {
        if (suggestedQuestions) {
            suggestedQuestions.classList.remove('show');
            suggestedQuestions.innerHTML = '';
        }
    }
    
    // Handle send message
    function handleSendMessage() {
        if (!chatInput || !chatMessages) return;
        
        const question = chatInput.value.trim();
        
        if (!question) {
            return;
        }
        
        // Add user message (in red)
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
            
            // Add bot answer (in black)
            setTimeout(() => {
                addBotMessage(answer);
                scrollToBottom();
            }, 500);
        }, 1000);
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        if (!chatMessages) return;
        
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
    for (const qa of qaDatabase) {
        if (qa.question.toLowerCase() === normalizedQuestion) {
            return qa.answer;
        }
    }
    
    // Then try partial match
    for (const qa of qaDatabase) {
        if (normalizedQuestion.includes(qa.question.toLowerCase()) || 
            qa.question.toLowerCase().includes(normalizedQuestion)) {
            return qa.answer;
        }
    }
    
    // Try keyword matching
    const matchedByKeywords = [];
    const inputWords = normalizedQuestion.split(/\s+/).filter(word => word.length > 2);
    
    for (const qa of qaDatabase) {
        const keywords = extractKeywords(qa.question);
        const matchScore = keywords.filter(keyword => 
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
    
    // If no match found, show your message
    return "Dear user, my advice is to please contact our support team via WhatsApp: +91-9674130001 or email: care.ompl@gmail.com during office hours. Thanks.";
}
    
    // Add message to chat
    function addMessage(message, isUser = false) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Add user message (red)
    function addUserMessage(message) {
        addMessage(message, true);
    }
    
    // Add bot message (black)
    function addBotMessage(message) {
        addMessage(message, false);
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    // Initialize chatbot when DOM is loaded
    initializeChatbot();
});
