// aichatbot.js - AI Chatbot for Odelya Management Pvt Ltd

document.addEventListener('DOMContentLoaded', function() {
    // ====== CHATBOT VARIABLES ======
    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const suggestedQuestions = document.getElementById('suggested-questions');
    
    // ====== PRELOADED Q&A DATABASE ======
    const qaDatabase = [

        // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Initialize chatbot when DOM is loaded
    initializeChatbot();
});
