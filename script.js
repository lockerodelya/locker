    // ====== AI CHAT FUNCTIONALITY ======
    (function() {
        console.log('Initializing AI Chat...');
        
        // Chat elements
        const chatToggle = document.getElementById('chat-toggle-btn');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        console.log('Chat elements:', { chatToggle, chatWindow, closeChat, chatMessages, chatInput, sendBtn });
        
        // Check if elements exist
        if (!chatToggle || !chatWindow) {
            console.error('Chat toggle or window not found!');
            return;
        }
        
        // Q&A database
        let qaPairs = [];
        
        // Load Q&A database
        function loadQADatabase() {
            if (typeof qaDatabase !== 'undefined' && Array.isArray(qaDatabase)) {
                qaPairs = qaDatabase;
                console.log('Loaded', qaPairs.length, 'Q&A pairs');
            } else {
                console.error('qaDatabase not found or invalid');
                // Use minimal fallback
                qaPairs = [
                    {
                        question: "What is Odelya Management?",
                        answer: "Odelya Management Pvt. Ltd. is a Kolkata-based company specializing in secure cloud storage solutions.",
                        keywords: ["odelya", "company", "what"]
                    },
                    {
                        question: "What services do you offer?",
                        answer: "We offer secure cloud storage with end-to-end encryption and event guest photo storage services.",
                        keywords: ["services", "offer", "what"]
                    }
                ];
            }
        }
        
        // Initialize chat
        function initializeChat() {
            loadQADatabase();
            setupEventListeners();
            console.log('Chat initialized successfully');
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Toggle chat window
            chatToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Toggle clicked');
                if (chatWindow.style.display === 'flex') {
                    closeChatWindow();
                } else {
                    openChatWindow();
                }
            });
            
            // Close chat
            if (closeChat) {
                closeChat.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closeChatWindow();
                });
            }
            
            // Send message on button click
            if (sendBtn) {
                sendBtn.addEventListener('click', handleSendMessage);
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
                    !chatToggle.contains(e.target)) {
                    closeChatWindow();
                }
            });
        }
        
        // Open chat window
        function openChatWindow() {
            chatWindow.style.display = 'flex';
            chatToggle.style.display = 'none';
            setTimeout(() => {
                if (chatInput) chatInput.focus();
            }, 100);
            console.log('Chat opened');
        }
        
        // Close chat window
        function closeChatWindow() {
            chatWindow.style.display = 'none';
            chatToggle.style.display = 'flex';
            console.log('Chat closed');
        }
        
        // Handle send message
        function handleSendMessage() {
            if (!chatInput) return;
            
            const question = chatInput.value.trim();
            console.log('Sending message:', question);
            
            if (!question) {
                return;
            }
            
            // Add user message
            addUserMessage(question);
            chatInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Find and show answer after delay
            setTimeout(() => {
                removeTypingIndicator();
                const answer = searchAnswer(question);
                addBotMessage(answer);
                scrollToBottom();
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
            
            // Try exact match
            for (const qa of qaPairs) {
                if (qa.question.toLowerCase() === normalizedQuestion) {
                    return qa.answer;
                }
            }
            
            // Try keyword matching
            const inputWords = normalizedQuestion.split(/\s+/).filter(word => word.length > 2);
            
            for (const qa of qaPairs) {
                if (qa.keywords) {
                    for (const keyword of qa.keywords) {
                        if (inputWords.some(word => 
                            word.includes(keyword) || keyword.includes(word))) {
                            return qa.answer;
                        }
                    }
                }
            }
            
            // Default response
            return "Sorry. I couldn't find an exact answer to your question. Kindly feel free to call us at +91-96741 30001 for further assistance.";
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
        
        // Add user message
        function addUserMessage(message) {
            addMessage(message, true);
        }
        
        // Add bot message
        function addBotMessage(message) {
            addMessage(message, false);
        }
        
        // Scroll to bottom
        function scrollToBottom() {
            if (!chatMessages) return;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Initialize when DOM is ready
        setTimeout(initializeChat, 100);
    })();
