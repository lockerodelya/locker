/* aichatbot.css - AI Chatbot Styles for Odelya Management */

/* ====== AI CHAT BOX STYLES ====== */
#ai-chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
}

/* Chat Toggle Button */
.chat-toggle {
    background: linear-gradient(135deg, #191970, #3498db);
    color: white;
    border-radius: 25px;
    padding: 12px 20px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chat-toggle:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    background: linear-gradient(135deg, #3498db, #191970);
}

.chat-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 1rem;
}

.chat-banner i {
    font-size: 1.2rem;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* Chat Window */
.chat-window {
    position: absolute;
    bottom: 60px;
    right: 0;
    width: 380px;
    height: 500px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    display: none;
    flex-direction: column;
    overflow: hidden;
    border: 2px solid #191970;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chat-header {
    background: linear-gradient(135deg, #191970, #2a2a9e);
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

.chat-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    font-weight: 600;
}

.close-chat {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-chat:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
}

/* Chat Messages Area */
.chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #f8f9fa;
    min-height: 0;
}

.chat-messages::-webkit-scrollbar {
    width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
    background: #191970;
    border-radius: 3px;
}

/* Message Bubbles */
.message {
    max-width: 85%;
    padding: 10px 15px;
    border-radius: 18px;
    line-height: 1.4;
    word-wrap: break-word;
    animation: fadeIn 0.3s ease;
    font-size: 0.95rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.user-message {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
    font-weight: 600;
}

.bot-message {
    background: white;
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
    border: 1px solid #eee;
}

/* Chat Input Area */
.chat-input-area {
    padding: 15px;
    border-top: 1px solid #eee;
    background: white;
    flex-shrink: 0;
}

.input-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

#chat-input {
    flex: 1;
    padding: 12px 15px;
    border: 2px solid #ddd;
    border-radius: 25px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    outline: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#chat-input:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

#chat-input::placeholder {
    color: #999;
}

.send-btn {
    background: #3498db;
    color: white;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.send-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
}

.send-btn:active {
    transform: translateY(0);
}

/* Suggested Questions */
.suggested-questions {
    padding: 10px 15px;
    border-top: 1px solid #eee;
    background: #f8f9fa;
    display: none;
    flex-direction: column;
    gap: 8px;
    max-height: 150px;
    overflow-y: auto;
    flex-shrink: 0;
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from { 
        opacity: 0;
        max-height: 0;
        padding: 0 15px;
    }
    to { 
        opacity: 1;
        max-height: 150px;
        padding: 10px 15px;
    }
}

.suggested-questions.show {
    display: flex;
}

.question-item {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.85rem;
    color: #2c3e50;
    text-align: left;
}

.question-item:hover {
    background: #3498db;
    color: white;
    border-color: #3498db;
    transform: translateX(3px);
}

/* Typing indicator */
.typing-indicator {
    background: white;
    border: 1px solid #eee;
    border-radius: 18px;
    padding: 10px 15px;
    align-self: flex-start;
    display: flex;
    gap: 5px;
    align-items: center;
    margin-bottom: 5px;
}

.typing-dot {
    width: 8px;
    height: 8px;
    background: #3498db;
    border-radius: 50%;
    animation: typing 1.4s infinite;
}

.typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: translateY(0);
    }
    30% {
        transform: translateY(-5px);
    }
}

/* Responsive Design for Chat Box */
@media (max-width: 768px) {
    .chat-window {
        width: 320px;
        height: 420px;
        bottom: 50px;
        right: 10px;
        position: fixed;
    }
    
    #ai-chat-container {
        bottom: 10px;
        right: 10px;
    }
    
    .message {
        max-width: 90%;
    }
}

@media (max-width: 480px) {
    .chat-window {
        width: calc(100vw - 20px);
        right: 10px;
        left: 10px;
        height: 70vh;
        bottom: 60px;
        position: fixed;
    }
    
    .chat-toggle {
        padding: 10px 15px;
        font-size: 0.9rem;
    }
}

/* Add these new styles for mobile keyboard handling */
@media (max-width: 768px) {
    /* Fix for iOS Safari */
    @supports (-webkit-overflow-scrolling: touch) {
        .chat-window {
            position: fixed;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
    }
    
    /* Prevent body scrolling when chat is open */
    body.chat-open {
        overflow: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
    }
    
    /* Adjust chat window when keyboard is open */
    .chat-window.keyboard-open {
        height: 60vh;
        bottom: 0;
    }
}
