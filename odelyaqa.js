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
        {
            question: "What is the price of 10GB plan?",
            answer: "10GB Plan Pricing:<br><br>📦 Storage: 10GB<br>👥 Users: 1<br>💰 Monthly: Rs. 18<br>💰 Yearly: Rs. 202<br>📋 GST: Included",
            category: "pricing"
        },

        // 30GB Plan
        {
            question: "30GB storage plan price",
            answer: "30GB Storage Plan Details:<br><br>• Storage: 30GB<br>• Users: 2 users<br>• Monthly: Rs. 53<br>• Yearly: Rs. 605<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 30GB storage?",
            answer: "30GB storage costs:<br><br>• Monthly: Rs. 53<br>• Yearly: Rs. 605<br>• Users: 2 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 30GB plan?",
            answer: "30GB Plan Pricing:<br><br>📦 Storage: 30GB<br>👥 Users: 2<br>💰 Monthly: Rs. 53<br>💰 Yearly: Rs. 605<br>📋 GST: Included",
            category: "pricing"
        },

        // 50GB Plan
        {
            question: "50GB storage plan price",
            answer: "50GB Storage Plan Details:<br><br>• Storage: 50GB<br>• Users: 2 users<br>• Monthly: Rs. 89<br>• Yearly: Rs. 956<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 50GB storage?",
            answer: "50GB storage costs:<br><br>• Monthly: Rs. 89<br>• Yearly: Rs. 956<br>• Users: 2 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 50GB plan?",
            answer: "50GB Plan Pricing:<br><br>📦 Storage: 50GB<br>👥 Users: 2<br>💰 Monthly: Rs. 89<br>💰 Yearly: Rs. 956<br>📋 GST: Included",
            category: "pricing"
        },

        // 70GB Plan
        {
            question: "70GB storage plan price",
            answer: "70GB Storage Plan Details:<br><br>• Storage: 70GB<br>• Users: 3 users<br>• Monthly: Rs. 124<br>• Yearly: Rs. 1,338<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 70GB storage?",
            answer: "70GB storage costs:<br><br>• Monthly: Rs. 124<br>• Yearly: Rs. 1,338<br>• Users: 3 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 70GB plan?",
            answer: "70GB Plan Pricing:<br><br>📦 Storage: 70GB<br>👥 Users: 3<br>💰 Monthly: Rs. 124<br>💰 Yearly: Rs. 1,338<br>📋 GST: Included",
            category: "pricing"
        },

        // 100GB Plan
        {
            question: "100GB storage plan price",
            answer: "100GB Storage Plan Details:<br><br>• Storage: 100GB<br>• Users: 3 users<br>• Monthly: Rs. 177<br>• Yearly: Rs. 1,805<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 100GB storage?",
            answer: "100GB storage costs:<br><br>• Monthly: Rs. 177<br>• Yearly: Rs. 1,805<br>• Users: 3 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 100GB plan?",
            answer: "100GB Plan Pricing:<br><br>📦 Storage: 100GB<br>👥 Users: 3<br>💰 Monthly: Rs. 177<br>💰 Yearly: Rs. 1,805<br>📋 GST: Included",
            category: "pricing"
        },

        // 150GB Plan
        {
            question: "150GB storage plan price",
            answer: "150GB Storage Plan Details:<br><br>• Storage: 150GB<br>• Users: 3 users<br>• Monthly: Rs. 266<br>• Yearly: Rs. 2,708<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 150GB storage?",
            answer: "150GB storage costs:<br><br>• Monthly: Rs. 266<br>• Yearly: Rs. 2,708<br>• Users: 3 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 150GB plan?",
            answer: "150GB Plan Pricing:<br><br>📦 Storage: 150GB<br>👥 Users: 3<br>💰 Monthly: Rs. 266<br>💰 Yearly: Rs. 2,708<br>📋 GST: Included",
            category: "pricing"
        },

        // 200GB Plan
        {
            question: "200GB storage plan price",
            answer: "200GB Storage Plan Details:<br><br>• Storage: 200GB<br>• Users: 4 users<br>• Monthly: Rs. 354<br>• Yearly: Rs. 3,611<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 200GB storage?",
            answer: "200GB storage costs:<br><br>• Monthly: Rs. 354<br>• Yearly: Rs. 3,611<br>• Users: 4 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 200GB plan?",
            answer: "200GB Plan Pricing:<br><br>📦 Storage: 200GB<br>👥 Users: 4<br>💰 Monthly: Rs. 354<br>💰 Yearly: Rs. 3,611<br>📋 GST: Included",
            category: "pricing"
        },

        // 300GB Plan
        {
            question: "300GB storage plan price",
            answer: "300GB Storage Plan Details:<br><br>• Storage: 300GB<br>• Users: 4 users<br>• Monthly: Rs. 531<br>• Yearly: Rs. 5,098<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 300GB storage?",
            answer: "300GB storage costs:<br><br>• Monthly: Rs. 531<br>• Yearly: Rs. 5,098<br>• Users: 4 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 300GB plan?",
            answer: "300GB Plan Pricing:<br><br>📦 Storage: 300GB<br>👥 Users: 4<br>💰 Monthly: Rs. 531<br>💰 Yearly: Rs. 5,098<br>📋 GST: Included",
            category: "pricing"
        },

        // 400GB Plan
        {
            question: "400GB storage plan price",
            answer: "400GB Storage Plan Details:<br><br>• Storage: 400GB<br>• Users: 4 users<br>• Monthly: Rs. 708<br>• Yearly: Rs. 6,797<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 400GB storage?",
            answer: "400GB storage costs:<br><br>• Monthly: Rs. 708<br>• Yearly: Rs. 6,797<br>• Users: 4 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 400GB plan?",
            answer: "400GB Plan Pricing:<br><br>📦 Storage: 400GB<br>👥 Users: 4<br>💰 Monthly: Rs. 708<br>💰 Yearly: Rs. 6,797<br>📋 GST: Included",
            category: "pricing"
        },

        // 500GB Plan
        {
            question: "500GB storage plan price",
            answer: "500GB Storage Plan Details:<br><br>• Storage: 500GB<br>• Users: 5 users<br>• Monthly: Rs. 885<br>• Yearly: Rs. 7,965<br>• GST: Included (18%)",
            category: "pricing"
        },
        {
            question: "How much for 500GB storage?",
            answer: "500GB storage costs:<br><br>• Monthly: Rs. 885<br>• Yearly: Rs. 7,965<br>• Users: 5 users<br>• All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "What is the price of 500GB plan?",
            answer: "500GB Plan Pricing:<br><br>📦 Storage: 500GB<br>👥 Users: 5<br>💰 Monthly: Rs. 885<br>💰 Yearly: Rs. 7,965<br>📋 GST: Included",
            category: "pricing"
        },

        // ====== COMPARATIVE Q&A ======
        {
            question: "Which plan has 2 users?",
            answer: "Plans with 2 users:<br><br>1. 30GB Plan - Rs. 53/month, Rs. 605/year<br>2. 50GB Plan - Rs. 89/month, Rs. 956/year",
            category: "pricing"
        },
        {
            question: "Which plan has 3 users?",
            answer: "Plans with 3 users:<br><br>1. 70GB Plan - Rs. 124/month, Rs. 1,338/year<br>2. 100GB Plan - Rs. 177/month, Rs. 1,805/year<br>3. 150GB Plan - Rs. 266/month, Rs. 2,708/year",
            category: "pricing"
        },
        {
            question: "Which plan has 4 users?",
            answer: "Plans with 4 users:<br><br>1. 200GB Plan - Rs. 354/month, Rs. 3,611/year<br>2. 300GB Plan - Rs. 531/month, Rs. 5,098/year<br>3. 400GB Plan - Rs. 708/month, Rs. 6,797/year",
            category: "pricing"
        },
        {
            question: "Which plan has 5 users?",
            answer: "Plan with 5 users:<br><br>1. 500GB Plan - Rs. 885/month, Rs. 7,965/year",
            category: "pricing"
        },
        {
            question: "What is your cheapest plan?",
            answer: "Cheapest Plan:<br><br>• 10GB Storage<br>• 1 User<br>• Monthly: Rs. 18<br>• Yearly: Rs. 202<br>• All inclusive of 18% GST",
            category: "pricing"
        },
        {
            question: "What is your most expensive plan?",
            answer: "Most Expensive Plan:<br><br>• 500GB Storage<br>• 5 Users<br>• Monthly: Rs. 885<br>• Yearly: Rs. 7,965<br>• All inclusive of 18% GST",
            category: "pricing"
        },
        {
            question: "What is your middle range plan?",
            answer: "Middle Range Plans:<br><br>1. 100GB - Rs. 177/month, Rs. 1,805/year (3 users)<br>2. 150GB - Rs. 266/month, Rs. 2,708/year (3 users)<br>3. 200GB - Rs. 354/month, Rs. 3,611/year (4 users)",
            category: "pricing"
        },

        // ====== PRICING SUMMARY Q&A ======
        {
            question: "Show me all storage plans",
            answer: "All Storage Plans:<br><br>" +
                    "1. 10GB - 1 user - Rs. 18/month - Rs. 202/year<br>" +
                    "2. 30GB - 2 users - Rs. 53/month - Rs. 605/year<br>" +
                    "3. 50GB - 2 users - Rs. 89/month - Rs. 956/year<br>" +
                    "4. 70GB - 3 users - Rs. 124/month - Rs. 1,338/year<br>" +
                    "5. 100GB - 3 users - Rs. 177/month - Rs. 1,805/year<br>" +
                    "6. 150GB - 3 users - Rs. 266/month - Rs. 2,708/year<br>" +
                    "7. 200GB - 4 users - Rs. 354/month - Rs. 3,611/year<br>" +
                    "8. 300GB - 4 users - Rs. 531/month - Rs. 5,098/year<br>" +
                    "9. 400GB - 4 users - Rs. 708/month - Rs. 6,797/year<br>" +
                    "10. 500GB - 5 users - Rs. 885/month - Rs. 7,965/year<br><br>" +
                    "All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "List all pricing plans",
            answer: "Complete Pricing List:<br><br>" +
                    "📊 10GB: ₹18/month | ₹202/year | 1 user<br>" +
                    "📊 30GB: ₹53/month | ₹605/year | 2 users<br>" +
                    "📊 50GB: ₹89/month | ₹956/year | 2 users<br>" +
                    "📊 70GB: ₹124/month | ₹1,338/year | 3 users<br>" +
                    "📊 100GB: ₹177/month | ₹1,805/year | 3 users<br>" +
                    "📊 150GB: ₹266/month | ₹2,708/year | 3 users<br>" +
                    "📊 200GB: ₹354/month | ₹3,611/year | 4 users<br>" +
                    "📊 300GB: ₹531/month | ₹5,098/year | 4 users<br>" +
                    "📊 400GB: ₹708/month | ₹6,797/year | 4 users<br>" +
                    "📊 500GB: ₹885/month | ₹7,965/year | 5 users<br><br>" +
                    "✅ All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "Show me price table",
            answer: "Price Table Summary:<br><br>" +
                    "┌─────────┬────────┬───────────┬──────────┐<br>" +
                    "│ Storage │ Users  │  Monthly  │  Yearly  │<br>" +
                    "├─────────┼────────┼───────────┼──────────┤<br>" +
                    "│  10GB   │   1    │   ₹18     │   ₹202   │<br>" +
                    "│  30GB   │   2    │   ₹53     │   ₹605   │<br>" +
                    "│  50GB   │   2    │   ₹89     │   ₹956   │<br>" +
                    "│  70GB   │   3    │   ₹124    │  ₹1,338  │<br>" +
                    "│  100GB  │   3    │   ₹177    │  ₹1,805  │<br>" +
                    "│  150GB  │   3    │   ₹266    │  ₹2,708  │<br>" +
                    "│  200GB  │   4    │   ₹354    │  ₹3,611  │<br>" +
                    "│  300GB  │   4    │   ₹531    │  ₹5,098  │<br>" +
                    "│  400GB  │   4    │   ₹708    │  ₹6,797  │<br>" +
                    "│  500GB  │   5    │   ₹885    │  ₹7,965  │<br>" +
                    "└─────────┴────────┴───────────┴──────────┘<br><br>" +
                    "All prices include 18% GST",
            category: "pricing"
        },

        // ====== SPECIFIC NUMBER Q&A ======
        {
            question: "10",
            answer: "10GB Storage Plan:<br><br>• Storage: 10GB<br>• Users: 1 user<br>• Monthly: Rs. 18<br>• Yearly: Rs. 202<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "30",
            answer: "30GB Storage Plan:<br><br>• Storage: 30GB<br>• Users: 2 users<br>• Monthly: Rs. 53<br>• Yearly: Rs. 605<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "50",
            answer: "50GB Storage Plan:<br><br>• Storage: 50GB<br>• Users: 2 users<br>• Monthly: Rs. 89<br>• Yearly: Rs. 956<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "70",
            answer: "70GB Storage Plan:<br><br>• Storage: 70GB<br>• Users: 3 users<br>• Monthly: Rs. 124<br>• Yearly: Rs. 1,338<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "100",
            answer: "100GB Storage Plan:<br><br>• Storage: 100GB<br>• Users: 3 users<br>• Monthly: Rs. 177<br>• Yearly: Rs. 1,805<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "150",
            answer: "150GB Storage Plan:<br><br>• Storage: 150GB<br>• Users: 3 users<br>• Monthly: Rs. 266<br>• Yearly: Rs. 2,708<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "200",
            answer: "200GB Storage Plan:<br><br>• Storage: 200GB<br>• Users: 4 users<br>• Monthly: Rs. 354<br>• Yearly: Rs. 3,611<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "300",
            answer: "300GB Storage Plan:<br><br>• Storage: 300GB<br>• Users: 4 users<br>• Monthly: Rs. 531<br>• Yearly: Rs. 5,098<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "400",
            answer: "400GB Storage Plan:<br><br>• Storage: 400GB<br>• Users: 4 users<br>• Monthly: Rs. 708<br>• Yearly: Rs. 6,797<br>• GST: Included",
            category: "pricing"
        },
        {
            question: "500",
            answer: "500GB Storage Plan:<br><br>• Storage: 500GB<br>• Users: 5 users<br>• Monthly: Rs. 885<br>• Yearly: Rs. 7,965<br>• GST: Included",
            category: "pricing"
        },

        // ====== PRICING GENERAL Q&A ======
        {
            question: "Do you have monthly plans?",
            answer: "Yes! We offer monthly plans for all storage sizes:<br><br>" +
                    "• 10GB: Rs. 18/month<br>" +
                    "• 30GB: Rs. 53/month<br>" +
                    "• 50GB: Rs. 89/month<br>" +
                    "• 70GB: Rs. 124/month<br>" +
                    "• 100GB: Rs. 177/month<br>" +
                    "• 150GB: Rs. 266/month<br>" +
                    "• 200GB: Rs. 354/month<br>" +
                    "• 300GB: Rs. 531/month<br>" +
                    "• 400GB: Rs. 708/month<br>" +
                    "• 500GB: Rs. 885/month<br><br>" +
                    "All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "Do you have yearly plans?",
            answer: "Yes! We offer yearly plans for all storage sizes:<br><br>" +
                    "• 10GB: Rs. 202/year<br>" +
                    "• 30GB: Rs. 605/year<br>" +
                    "• 50GB: Rs. 956/year<br>" +
                    "• 70GB: Rs. 1,338/year<br>" +
                    "• 100GB: Rs. 1,805/year<br>" +
                    "• 150GB: Rs. 2,708/year<br>" +
                    "• 200GB: Rs. 3,611/year<br>" +
                    "• 300GB: Rs. 5,098/year<br>" +
                    "• 400GB: Rs. 6,797/year<br>" +
                    "• 500GB: Rs. 7,965/year<br><br>" +
                    "All prices include 18% GST",
            category: "pricing"
        },
        {
            question: "Is GST included in price?",
            answer: "Yes! All our prices include 18% GST (Goods and Services Tax). There are no hidden charges or additional taxes. The prices shown are the final amounts you pay.",
            category: "pricing"
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept:<br><br>" +
                    "1. UPI Payment (Scan QR code)<br>" +
                    "2. Bank Transfer to State Bank of India<br><br>" +
                    "Account Details:<br>" +
                    "• Bank: State Bank of India<br>" +
                    "• Account: Odelya Management Pvt Ltd<br>" +
                    "• Account No: 39681284318<br>" +
                    "• IFSC: SBIN0001140",
            category: "payment"
        },
        
        // Company Information
        {
            question: "What is Odelya Management Pvt Ltd?",
            answer: "Odelya Management Pvt Ltd is a Kolkata-based company specializing in secure cloud storage solutions with end-to-end encryption. We provide protected digital locker services for individuals and businesses.",
            category: "company"
        },
        {
            question: "Where is your office located?",
            answer: "We have two offices in Kolkata:<br><br><strong>Administrative Office:</strong><br>44E, 2nd Floor, Nandalalmitra Lane, Kolkata-700040, India<br><br><strong>Registered Office:</strong><br>Molina Apartment, 1st Floor, 32/10 Chandi Ghosh Road, Kolkata-700040, India",
            category: "contact"
        },
        {
            question: "Who are the founders of Odelya?",
            answer: "Our company is led by:<br><br>1. <strong>Mr. Aniruddha Ghosh</strong> - Chairman<br>2. <strong>Mr. Shyamal Sen</strong> - Director<br><br>Both bring decades of experience in business and technology.",
            category: "company"
        },
        
        // Services Information
        {
            question: "What services do you offer?",
            answer: "We offer two main services:<br><br>1. <strong>Secure Cloud Storage</strong> with End-to-End Encryption<br>2. <strong>Event Guest Photo Storage</strong> - Photos captured by specific guests are simultaneously stored in the cloud",
            category: "services"
        },
        {
            question: "What is secure cloud storage?",
            answer: "Secure cloud storage is our flagship service that provides end-to-end encrypted storage for your important files and media. Your data is protected with military-grade encryption, ensuring complete privacy and security.",
            category: "services"
        },
        {
            question: "What is event guest photo storage?",
            answer: "This service allows photos captured by specific guests at events to be automatically and simultaneously stored in our secure cloud. It's perfect for weddings, corporate events, and special occasions.",
            category: "services"
        },
        
        // Pricing and Plans
        {
            question: "What are your prices?",
            answer: "Our pricing starts from Rs. 18/month for 10GB storage. We offer various plans ranging from 10GB to 500GB with options for monthly and yearly payments. All charges include 18% GST.",
            category: "pricing"
        },
        {
            question: "What is your cheapest plan?",
            answer: "Our most affordable plan is 10GB storage for 1 user at <strong>Rs. 18 per month</strong> or <strong>Rs. 202 per year</strong> (all inclusive of 18% GST).",
            category: "pricing"
        },
        {
            question: "What is your largest storage plan?",
            answer: "Our largest plan is 500GB storage for 5 users at <strong>Rs. 885 per month</strong> or <strong>Rs. 7965 per year</strong> (all inclusive of 18% GST).",
            category: "pricing"
        },
        {
            question: "Do you offer monthly and yearly plans?",
            answer: "Yes! We offer both monthly and yearly subscription options for all our storage plans. Yearly plans offer better value compared to paying monthly.",
            category: "pricing"
        },
        {
            question: "What is included in the price?",
            answer: "All our prices include:<br>1. Secure cloud storage with end-to-end encryption<br>2. GST (Goods and Services Tax) at 18%<br>3. Technical support during business hours<br>4. Regular security updates",
            category: "pricing"
        },
        
        // Payment Information
        {
            question: "How can I make payment?",
            answer: "You can pay through:<br><br>1. <strong>UPI Payment</strong> - Scan our QR code with any UPI app<br>2. <strong>Bank Transfer</strong> - Transfer to our State Bank of India account<br><br>Details: Odelya Management Pvt Ltd, Account No: 39681284318, IFSC: SBIN0001140",
            category: "payment"
        },
        {
            question: "What is your bank account details?",
            answer: "Bank: <strong>State Bank of India</strong><br>Account Name: <strong>Odelya Management Pvt Ltd</strong><br>Account No: <strong>39681284318</strong><br>IFSC: <strong>SBIN0001140</strong><br>Branch: <strong>C.I.T. Road, Kolkata</strong>",
            category: "payment"
        },
        {
            question: "How do I share payment proof?",
            answer: "After payment, you must share your transaction details via:<br><br>1. <strong>WhatsApp:</strong> +91-96741 30001<br>2. <strong>Email:</strong> care.ompl@gmail.com<br><br>Requests are not processed without payment proof.",
            category: "payment"
        },
        {
            question: "Do you accept credit cards?",
            answer: "Currently, we accept payments only through UPI and Bank Transfer to our State Bank of India account. We do not accept credit cards or other payment methods.",
            category: "payment"
        },
        
        // Contact Information
        {
            question: "How can I contact you?",
            answer: "You can reach us through:<br><br>📞 <strong>Phone:</strong> +91-96741 30001<br>✉️ <strong>Email:</strong> care.ompl@gmail.com<br>📍 <strong>Office:</strong> 44E, 2nd Floor, Nandalalmitra Lane, Kolkata-700040<br>⏰ <strong>Hours:</strong> Monday to Saturday, 9 AM - 8 PM",
            category: "contact"
        },
        {
            question: "What are your business hours?",
            answer: "Our business hours are:<br><br><strong>Monday to Saturday:</strong> 9:00 AM - 8:00 PM<br><strong>Sunday:</strong> Closed<br><br>We are available for calls and emails during these hours.",
            category: "contact"
        },
        {
            question: "What is your phone number?",
            answer: "You can call us at: <strong>+91-96741 30001</strong><br><br>Please call between 9 AM to 8 PM, Monday to Saturday for assistance.",
            category: "contact"
        },
        {
            question: "What is your email address?",
            answer: "Our official email address is: <strong>care.ompl@gmail.com</strong><br><br>For customer support, business inquiries, and payment confirmations.",
            category: "contact"
        },
        
        // Technical Information
        {
            question: "What is end-to-end encryption?",
            answer: "End-to-end encryption means your data is encrypted on your device before being uploaded to our servers. Only you have the decryption key, ensuring that no one else (including us) can access your files. It's the highest level of security available.",
            category: "technical"
        },
        {
            question: "Is my data safe with you?",
            answer: "Yes, absolutely! We use military-grade end-to-end encryption which means:<br>1. Your data is encrypted before leaving your device<br>2. Only you have the decryption key<br>3. We cannot access your files even if we wanted to<br>4. Your privacy is 100% protected",
            category: "technical"
        },
        {
            question: "How many users can access one storage plan?",
            answer: "Our plans support different numbers of users:<br><br>• 10GB: 1 user<br>• 30GB & 50GB: 2 users<br>• 70GB, 100GB & 150GB: 3 users<br>• 200GB, 300GB & 400GB: 4 users<br>• 500GB: 5 users",
            category: "technical"
        },
        {
            question: "Can I upgrade my storage plan?",
            answer: "Yes, you can upgrade to a higher storage plan at any time. Contact us at +91-96741 30001 or care.ompl@gmail.com for assistance with plan upgrades.",
            category: "technical"
        },
        
        // Business Information
        {
            question: "When was Odelya founded?",
            answer: "Odelya Management Pvt Ltd was established by experienced professionals in the technology sector, bringing together decades of expertise in secure data storage solutions.",
            category: "business"
        },
        {
            question: "Who is your target customer?",
            answer: "We serve:<br>1. <strong>Individuals</strong> needing secure personal storage<br>2. <strong>Businesses</strong> requiring protected data storage<br>3. <strong>Event organizers</strong> for guest photo storage<br>4. <strong>Professionals</strong> with sensitive documents",
            category: "business"
        },
        {
            question: "Do you serve customers outside Kolkata?",
            answer: "Yes! While our offices are in Kolkata, we serve customers across India. Our cloud storage services are accessible from anywhere with an internet connection.",
            category: "business"
        },
        
        // Process Information
        {
            question: "How do I sign up for your service?",
            answer: "To sign up:<br>1. Choose a plan from our pricing table<br>2. Click 'Buy' for monthly or yearly<br>3. Complete the payment process<br>4. Share payment proof via WhatsApp or email<br>5. We'll set up your account and send login details",
            category: "process"
        },
        {
            question: "How long does account setup take?",
            answer: "Once we receive your payment confirmation, account setup typically takes 24-48 hours during business days. You'll receive your login credentials via email.",
            category: "process"
        },
        {
            question: "What happens after I make payment?",
            answer: "After payment:<br>1. Share payment proof via WhatsApp/email<br>2. We verify your payment<br>3. We set up your secure cloud storage account<br>4. We email you login instructions<br>5. You can start using your secure storage",
            category: "process"
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel your subscription. Please contact us at +91-96741 30001 or care.ompl@gmail.com for assistance with subscription cancellation.",
            category: "process"
        },
        
        // Additional Questions
        {
            question: "What file types can I store?",
            answer: "You can store all types of files including documents (PDF, Word, Excel), photos (JPG, PNG), videos (MP4, MOV), and any other file types. Our storage is versatile and supports all file formats.",
            category: "general"
        },
        {
            question: "Is there a file size limit?",
            answer: "There are no specific file size limits. You can upload files of any size, subject to your total storage limit. Large files may take longer to upload depending on your internet speed.",
            category: "general"
        },
        {
            question: "Can I access my files from mobile?",
            answer: "Yes! You can access your secure cloud storage from any device with internet access - smartphones, tablets, laptops, or desktop computers.",
            category: "general"
        },
        {
            question: "Do you offer technical support?",
            answer: "Yes, we provide technical support during our business hours (Mon-Sat, 9 AM - 8 PM). Contact us at +91-96741 30001 or care.ompl@gmail.com for assistance.",
            category: "general"
        },
        {
            question: "What makes you different from other cloud storage?",
            answer: "We stand out because:<br>1. <strong>True end-to-end encryption</strong> - Your data is 100% private<br>2. <strong>Transparent pricing</strong> - All-inclusive with no hidden charges<br>3. <strong>Indian company</strong> - Local support and understanding<br>4. <strong>Event photo storage</strong> - Unique service for special occasions",
            category: "general"
        },
        {
            question: "Which jurisdiction applies?",
            answer: "Kolkata jurisdiction."
        },


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
