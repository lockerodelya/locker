// odelyaqa.js - Q&A Database for Odelya Chatbot
// Link to main file: aichatbot.js

const qaDatabase = [
    // ====== PRICING TABLE SPECIFIC Q&A ======
    // 10GB Plan
    {
        question: "10GB storage plan price",
        answer: "10GB Storage Plan Details:<br><br>• Storage: 10GB<br>• Users: 1 user<br>• Monthly: Rs. 18<br>• Yearly: Rs. 202<br>• GST: Included (18%)",
        category: "pricing"
    },
    {
        question: "How much for 10GB storage?",
        answer: "10GB storage costs:<br><br>• Monthly: Rs. 18<br>• Yearly: Rs. 202<br>• Users: 1 user<br>• All prices include 18% GST",
        category: "pricing"
    },
    // ====== ADD MORE Q&A BELOW THIS LINE ======
    // Add your new questions and answers here
    // Format:
    // {
    //     question: "Your question here?",
    //     answer: "Your answer here with <br> for line breaks",
    //     category: "category-name"
    // },
    
    // ====== EXAMPLE ENTRIES ======
    {
        question: "What is your company name?",
        answer: "We are Odelya Management Private Limited, a cloud storage solution provider.",
        category: "general"
    },
    {
        question: "How to contact support?",
        answer: "Contact our support team at:<br>📞 +91-96741 30001<br>✉️ care.ompl@gmail.com",
        category: "contact"
    }
];

// Function to add new Q&A pairs
function addNewQA(newQuestions) {
    if (Array.isArray(newQuestions)) {
        qaDatabase.push(...newQuestions);
        console.log(`Added ${newQuestions.length} new Q&A pairs. Total: ${qaDatabase.length}`);
        return true;
    } else if (typeof newQuestions === 'object') {
        qaDatabase.push(newQuestions);
        console.log('Added 1 new Q&A pair.');
        return true;
    }
    console.error('Invalid Q&A format. Please provide an array or object.');
    return false;
}

// Function to get all Q&A
function getAllQA() {
    return qaDatabase;
}

// Function to get Q&A by category
function getQAByCategory(category) {
    return qaDatabase.filter(qa => qa.category === category);
}

// Function to search Q&A
function searchQA(query) {
    const normalizedQuery = query.toLowerCase().trim();
    return qaDatabase.filter(qa => 
        qa.question.toLowerCase().includes(normalizedQuery) ||
        qa.answer.toLowerCase().includes(normalizedQuery) ||
        qa.category.toLowerCase().includes(normalizedQuery)
    );
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        qaDatabase,
        addNewQA,
        getAllQA,
        getQAByCategory,
        searchQA
    };
} else {
    // Browser environment
    window.odelyaQA = {
        database: qaDatabase,
        addNewQA,
        getAllQA,
        getQAByCategory,
        searchQA
    };
}
