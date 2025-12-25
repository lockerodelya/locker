        // ====== AI CHAT FUNCTIONALITY ======
    (function() {
        console.log('AI Chat: Starting initialization...');
        
        // Get chat elements
        const chatToggle = document.getElementById('chat-toggle-btn');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        // Debug: Log what elements were found
        console.log('AI Chat Elements found:', {
            toggle: chatToggle,
            window: chatWindow,
            close: closeChat,
            messages: chatMessages,
            input: chatInput,
            sendBtn: sendBtn
        });
        
        // Check if essential elements exist
        if (!chatToggle || !chatWindow) {
            console.error('AI Chat: Essential elements not found!');
            return;
        }
        
        // Simple Q&A database - will be loaded from qa-data.js
        let qaDatabase = [];
        
        // Function to search for answer
        function searchAnswer(question) {
            const normalizedQuestion = question.toLowerCase().trim();
            
            // Check if qaDatabase is loaded and has data
            if (!window.qaDatabase || !Array.isArray(window.qaDatabase)) {
                console.error('QA Database not loaded properly');
                return "I'm having trouble accessing my knowledge base. Please try again or contact support.";
            }
            
            // First try exact match
            for (const qa of window.qaDatabase) {
                if (qa.question.toLowerCase() === normalizedQuestion) {
                    return qa.answer;
                }
            }
            
            // Then try partial match
            for (const qa of window.qaDatabase) {
                const qaQuestion = qa.question.toLowerCase();
                if (normalizedQuestion.includes(qaQuestion) || qaQuestion.includes(normalizedQuestion)) {
                    return qa.answer;
                }
            }
            
            // Then try keyword matching
            for (const qa of window.qaDatabase) {
                if (qa.keywords && Array.isArray(qa.keywords)) {
                    for (const keyword of qa.keywords) {
                        if (normalizedQuestion.includes(keyword.toLowerCase())) {
                            return qa.answer;
                        }
                    }
                }
            }
            
            // Default response
            return "I couldn't find an exact answer to your question. Please contact us at +91-96741 30001 or email care.ompl@gmail.com for assistance.";
        }
        
        // Add message to chat
        function addMessage(text, isUser = false) {
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.innerHTML = text;
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Handle sending message
        function handleSendMessage() {
            if (!chatInput) return;
            
            const question = chatInput.value.trim();
            if (!question) return;
            
            // Add user message
            addMessage(question, true);
            chatInput.value = '';
            
            // Show typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Get answer after delay
            setTimeout(() => {
                // Remove typing indicator
                const typingIndicator = document.getElementById('typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                
                // Get and display answer
                const answer = searchAnswer(question);
                addMessage(answer, false);
            }, 1000);
        }
        
        // Toggle chat window
        function toggleChat() {
            if (chatWindow.style.display === 'flex') {
                chatWindow.style.display = 'none';
                chatToggle.style.display = 'flex';
            } else {
                chatWindow.style.display = 'flex';
                chatToggle.style.display = 'none';
                if (chatInput) {
                    setTimeout(() => chatInput.focus(), 100);
                }
            }
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Toggle chat
            if (chatToggle) {
                chatToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleChat();
                });
            }
            
            // Close chat
            if (closeChat) {
                closeChat.addEventListener('click', function(e) {
                    e.stopPropagation();
                    chatWindow.style.display = 'none';
                    chatToggle.style.display = 'flex';
                });
            }
            
            // Send message on button click
            if (sendBtn) {
                sendBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    handleSendMessage();
                });
            }
            
            // Send message on Enter key
            if (chatInput) {
                chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                });
            }
            
            // Close chat when clicking outside
            document.addEventListener('click', function(e) {
                if (chatWindow.style.display === 'flex' && 
                    !chatWindow.contains(e.target) && 
                    chatToggle && !chatToggle.contains(e.target)) {
                    chatWindow.style.display = 'none';
                    chatToggle.style.display = 'flex';
                }
            });
        }
        
        // Initialize chat
        function initializeChat() {
            console.log('AI Chat: Initializing...');
            console.log('QA Database available:', !!window.qaDatabase, 'Length:', window.qaDatabase ? window.qaDatabase.length : 0);
            
            setupEventListeners();
            console.log('AI Chat: Initialization complete');
        }
        
        // Initialize when DOM is ready
        setTimeout(initializeChat, 500);
    })();
