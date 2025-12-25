// qa-data.js - Question Answer Database for Odelya Locker AI Assistant

const qaDatabase = [
    // ====== COMPANY INFORMATION ======
    {
        question: "What is Odelya Management Pvt. Ltd.?",
        answer: "Odelya Management Pvt. Ltd. is a Kolkata-based company specializing in secure digital storage solutions, offering cloud storage services and IT solutions with a focus on data security and accessibility.",
        keywords: ["odelya", "company", "what", "management", "pvt", "ltd"]
    },
    
    {
        question: "Who founded Odelya Management?",
        answer: "Odelya Management Pvt. Ltd. was founded by Mr. Aniruddha Ghosh (Chairman) and Mr. Shyamal Sen (Director).",
        keywords: ["founder", "who", "started", "established", "created"]
    },
    
    {
        question: "What services do you offer?",
        answer: "Odelya offers two main services: 1) Secure Cloud Storage with End-to-End Encryption, and 2) Event Guest Photo Storage where photos captured by specific guests are simultaneously stored in the cloud.",
        keywords: ["services", "offer", "provide", "what", "do"]
    },
    
    {
        question: "What are your pricing plans?",
        answer: "We offer storage plans ranging from 10GB to 500GB. Prices start from Rs. 18 per month for 10GB (single user) up to Rs. 885 per month for 500GB (5 users). All charges include 18% GST. Please check our pricing table for detailed rates.",
        keywords: ["price", "cost", "pricing", "plans", "rates", "charges", "how much"]
    },
    
    {
        question: "What payment methods do you accept?",
        answer: "We accept two payment methods: 1) UPI Payment via QR code, and 2) Bank Transfer to State Bank of India (Account: 39681284318, IFSC: SBIN0001140).",
        keywords: ["payment", "methods", "pay", "transfer", "upi", "bank"]
    },
    
    {
        question: "How can I contact Odelya?",
        answer: "You can contact us via:<br>📞 Phone: +91-96741 30001<br>✉️ Email: care.ompl@gmail.com<br>📍 Address: 44E, 2nd Floor, Nandalalmitra Lane, Kolkata-700040<br>⏰ Hours: Monday-Saturday, 9 AM to 8 PM",
        keywords: ["contact", "call", "email", "phone", "reach", "support"]
    },
    
    {
        question: "What is end-to-end encryption?",
        answer: "End-to-end encryption means your data is encrypted on your device before being uploaded to our servers. Only you have the decryption key, ensuring that no one (including Odelya staff) can access your files without your permission.",
        keywords: ["encryption", "security", "secure", "protection", "end-to-end"]
    },
    
    {
        question: "How much storage do I need?",
        answer: "Storage needs vary by user. For reference: 10GB stores approximately 2,500 photos or 2,500 documents. We offer plans from 10GB to 500GB. Our team can help you choose the right plan based on your specific needs.",
        keywords: ["storage", "capacity", "how much", "need", "size"]
    },
    
    {
        question: "How do I access my stored files?",
        answer: "You can access your files through our secure web portal or mobile application. After registration and payment confirmation, you'll receive login credentials to access your encrypted storage.",
        keywords: ["access", "login", "files", "retrieve", "get", "download"]
    },
    
    {
        question: "Is my data safe with Odelya?",
        answer: "Yes! We use military-grade 256-bit AES encryption for all data. Your files are encrypted on your device before uploading, and only you hold the decryption keys. We also have multiple data backups and secure servers.",
        keywords: ["safe", "secure", "privacy", "protection", "data", "security"]
    },
    
    {
        question: "Where is your office located?",
        answer: "Our administrative office is at:<br>📍 44E, 2nd Floor, Nandalalmitra Lane, Kolkata-700040, India<br><br>Registered office:<br>📍 Molina Apartment, 1st Floor, 32/10 Chandi Ghosh Road, Kolkata-700040, India",
        keywords: ["location", "office", "address", "where", "place"]
    },
    
    {
        question: "Do you offer corporate solutions?",
        answer: "Yes! We provide customized corporate cloud storage solutions with enhanced security features, multiple user management, and dedicated support. Contact our corporate team at care.ompl@gmail.com for customized quotes.",
        keywords: ["corporate", "business", "enterprise", "company", "organization"]
    }
];

// Make it globally available
if (typeof window !== 'undefined') {
    window.qaDatabase = qaDatabase;
}
