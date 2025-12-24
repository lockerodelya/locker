// qa-data.js - Question Answer Database for Odelya Locker AI Assistant

const qaDatabase = [
    // ====== COMPANY INFORMATION (50 Questions) ======
    {
        question: "What is Odelya Management Pvt. Ltd.?",
        answer: "Odelya Management Pvt. Ltd. is a Kolkata-based company specializing in secure digital storage solutions, offering cloud storage services and IT solutions with a focus on data security and accessibility.",
        keywords: ["company", "odelya", "management", "what", "is"]
    },
    
    {
        question: "Who founded Odelya Management?",
        answer: "Odelya Management Pvt. Ltd. was founded by Mr. Aniruddha Ghosh (Chairman) and Mr. Shyamal Sen (Director).",
        keywords: ["founder", "who", "started", "established", "created"]
    },
    
    // Add all other 48 company information questions here in the same format
    // Example:
    // {
    //     question: "Question text",
    //     answer: "Answer text",
    //     keywords: ["keyword1", "keyword2", "keyword3"]
    // },
    
    // ====== SERVICES & PRODUCTS (50 Questions) ======
    {
        question: "What services does Odelya offer?",
        answer: "Odelya offers two main services: 1) Secure Cloud Storage with End-to-End Encryption, and 2) Event Guest Photo Storage where photos captured by specific guests are simultaneously stored in the cloud.",
        keywords: ["services", "offer", "provide", "what", "do"]
    },
    
    // Add all other 49 services questions here
    
    // ====== PRICING & PLANS (50 Questions) ======
    {
        question: "What are your pricing plans?",
        answer: "We offer storage plans ranging from 10GB to 500GB. Prices start from Rs. 18 per month for 10GB (single user) up to Rs. 885 per month for 500GB (5 users). All charges include 18% GST. Please check our pricing table for detailed rates.",
        keywords: ["price", "cost", "pricing", "plans", "rates", "charges"]
    },
    
    // Add all other 49 pricing questions here
    
    // ====== PAYMENT METHODS (25 Questions) ======
    {
        question: "What payment methods do you accept?",
        answer: "We accept two payment methods: 1) UPI Payment via QR code, and 2) Bank Transfer to State Bank of India (Account: 39681284318, IFSC: SBIN0001140).",
        keywords: ["payment", "methods", "pay", "transfer", "upi", "bank"]
    },
    
    // Add all other 24 payment questions here
    
    // ====== CONTACT & SUPPORT (25 Questions) ======
    {
        question: "How can I contact Odelya?",
        answer: "You can contact us via:<br>📞 Phone: +91-96741 30001<br>✉️ Email: care.ompl@gmail.com<br>📍 Address: 44E, 2nd Floor, Nandalalmitra Lane, Kolkata-700040<br>⏰ Hours: Monday-Saturday, 9 AM to 8 PM",
        keywords: ["contact", "call", "email", "phone", "reach", "support"]
    },
    
    // Add all other 24 contact questions here
    
    // ====== TECHNICAL SUPPORT (25 Questions) ======
    {
        question: "What is end-to-end encryption?",
        answer: "End-to-end encryption means your data is encrypted on your device before being uploaded to our servers. Only you have the decryption key, ensuring that no one (including Odelya staff) can access your files without your permission.",
        keywords: ["encryption", "security", "secure", "protection", "end-to-end"]
    },
    
    // Add all other 24 technical questions here
    
    // ====== STORAGE & CAPACITY (25 Questions) ======
    {
        question: "How much storage do I need?",
        answer: "Storage needs vary by user. For reference: 10GB stores approximately 2,500 photos or 2,500 documents. We offer plans from 10GB to 500GB. Our team can help you choose the right plan based on your specific needs.",
        keywords: ["storage", "capacity", "how much", "need", "size"]
    },
    
    // Add all other 24 storage questions here
    
    // ====== ACCOUNT & ACCESS (25 Questions) ======
    {
        question: "How do I access my stored files?",
        answer: "You can access your files through our secure web portal or mobile application. After registration and payment confirmation, you'll receive login credentials to access your encrypted storage.",
        keywords: ["access", "login", "files", "retrieve", "get", "download"]
    },
    
    // Add all other 24 account questions here
    
    // ====== SECURITY & PRIVACY (25 Questions) ======
    {
        question: "Is my data safe with Odelya?",
        answer: "Yes! We use military-grade 256-bit AES encryption for all data. Your files are encrypted on your device before uploading, and only you hold the decryption keys. We also have multiple data backups and secure servers.",
        keywords: ["safe", "secure", "privacy", "protection", "data", "security"]
    },
    
    // Add all other 24 security questions here
    
    // ====== TERMS & CONDITIONS (25 Questions) ======
    {
        question: "What are your terms and conditions?",
        answer: "Our terms include data security protocols, usage policies, payment terms, and service guarantees. You can read the complete terms and conditions in the payment section of our website or request a copy via email.",
        keywords: ["terms", "conditions", "agreement", "policy", "rules"]
    },
    
    // Add all other 24 terms questions here
    
    // ====== BUSINESS & CORPORATE (25 Questions) ======
    {
        question: "Do you offer corporate solutions?",
        answer: "Yes! We provide customized corporate cloud storage solutions with enhanced security features, multiple user management, and dedicated support. Contact our corporate team at care.ompl@gmail.com for customized quotes.",
        keywords: ["corporate", "business", "enterprise", "company", "organization"]
    },
    
    // Add all other 24 business questions here
    
    // ====== LOCATION & OFFICES (25 Questions) ======
    {
        question: "Where is your office located?",
        answer: "Our administrative office is at:<br>📍 44E, 2nd Floor, Nandalalmitra Lane, Kolkata-700040, India<br><br>Registered office:<br>📍 Molina Apartment, 1st Floor, 32/10 Chandi Ghosh Road, Kolkata-700040, India",
        keywords: ["location", "office", "address", "where", "place"]
    },
    
    // Add all other 24 location questions here
    
    // ====== FINAL QUESTIONS ======
    {
        question: "Thank you",
        answer: "You're welcome! We're here to help with all your secure storage needs. Contact us anytime.",
        keywords: ["thank", "thanks", "welcome"]
    },
    
    {
        question: "Thanks",
        answer: "You're welcome! Let us know if you need any more information about our services.",
        keywords: ["thank", "thanks", "welcome"]
    },
    
    {
        question: "Goodbye",
        answer: "Goodbye! Remember, we're here to help secure your digital life. Contact us anytime.",
        keywords: ["goodbye", "bye", "see you", "farewell"]
    },
    
    {
        question: "Bye",
        answer: "Bye! Stay secure. Contact us at +91-96741 30001 if you need assistance.",
        keywords: ["bye", "goodbye", "see you"]
    },
    
    {
        question: "End conversation",
        answer: "Conversation ended. Thank you for chatting with Odelya AI assistant. Have a secure day!",
        keywords: ["end", "stop", "conversation", "exit"]
    }
];

// Export the database for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qaDatabase };
}
