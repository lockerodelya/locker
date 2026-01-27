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
            answer: "Yes! All our prices include 18% GST.",
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
            answer: "We have <strong>Administrative Office:</strong><br>44E, 2nd Floor, Nandalalmitra Lane, Kolkata-700040, West Bengal, India<br>",
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
            answer: "We offer two main services:<br><br>1. <strong>Secure Cloud Storage</strong> with secure End-to-End Encryption<br>2. <strong>Odelya IT Services</strong> - Various types of Information Technology related services from Income Tax, GST, Auditing, Licese, to Data Recovery, Website Hosting, SEO etc.",
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
            answer: "Our business hours are:<br><br><strong>Monday to Saturday:</strong> 10:00 AM - 7:00 PM<br><strong>Sunday:</strong> Closed<br><br>We are available for calls and emails during these hours.",
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
            question: "Do you serve customers outside Kolkata?",
            answer: "Yes! While our offices are in Kolkata, we serve customers across India. Our cloud storage services are accessible from anywhere with an internet connection.",
            category: "business"
        },
        
        // Process Information
        {
            question: "How do I sign up for your service?",
            answer: "To sign up:<br>1. Choose a plan from our pricing table<br>2. Click 'Select Plan' for monthly or yearly<br>3. Complete the payment process<br>4. Share payment proof via WhatsApp or email<br>5. We'll set up your account and send login details",
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
            answer: "Yes, you can cancel your subscription. Please contact us at +91-96741 30001 or care.ompl@gmail.com for assistance with subscription cancellation. Also for your reference, paid money cannot be refunded under any circumstances.",
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
        {
    question: "What is the name of the cloud storage service?",
    answer: "Odelya Cloud Digital Locker."
},
{
    question: "What is the main service offered by Odelya?",
    answer: "Secure cloud data storage with end-to-end encryption."
},
{
    question: "Where is Odelya Cloud based?",
    answer: "Kolkata, India."
},
{
    question: "What type of security does Odelya Cloud use?",
    answer: "End-to-end encryption and military-grade encryption."
},
{
    question: "What is the tagline or description for Odelya Cloud?",
    answer: "Secure Cloud Storage for Files and Media."
},
{
    question: "What company produces Odelya Cloud?",
    answer: "Odelya Management private Limited (OMPL)."
},
{
    question: "What are the three main services listed on the site?",
    answer: "Secure Cloud Storage, Event Photo Storage, and Odelya IT Services."
},
{
    question: "What is the Event Photo Storage service described as?",
    answer: "Cloud Facility for Event Guest."
},
{
    question: "What is described as 'IT Services for Personal & Businesses'?",
    answer: "Odelya IT Services."
},
{
    question: "What is the phone number for customer service?",
    answer: "+91-96741-30001."
},
{
    question: "What is the customer service email address?",
    answer: "care.ompl@gmail.com."
},
{
    question: "What is the street address of Odelya Management Pvt Ltd?",
    answer: "44E, 2nd Floor, Nandalalmitra Lane, Kolkata."
},
{
    question: "What are the opening hours for customer service?",
    answer: "Monday to Friday, from 10:00 to 19:00."
},
{
    question: "What languages are available for customer service?",
    answer: "English, Hindi, and Bengali."
},
{
    question: "What is the name of the AI chatbot on the website?",
    answer: "Vooo."
},
{
    question: "Which pages are linked in the footer?",
    answer: "Security, Privacy, Contact, and About."
},
{
    question: "What is the website's official URL?",
    answer: "https://odelya.online"
},
{
    question: "What is the purpose of the service described as 'End-to-End Encryption'?",
    answer: "Secure Cloud Storage."
},
{
    question: "What options are available in the dropdown menu?",
    answer: "User, Cloud Storage, IT Services, Contact, and About."
},
{
    question: "What does the logo next to the word 'Locker' represent?",
    answer: "The Odelya Locker Logo."
},
{
    question: "What is the year in the copyright notice?",
    answer: "2025."
},
{
    question: "What does the FAQ say about accessing the digital locker?",
    answer: "Through a secure web portal or mobile app."
},
{
    question: "What is the main title of this cloud storage page?",
    answer: "Odelya Secure Cloud Storage."
},
{
    question: "What is the main offering described on this page?",
    answer: "Encrypted cloud storage with end-to-end protection."
},
{
    question: "What is the GST rate included in all charges?",
    answer: "18% GST."
},
{
    question: "How many storage capacity (GB) plans are listed in the pricing table?",
    answer: "Nine (9) plans."
},
{
    question: "What are the storage capacities available?",
    answer: "10GB, 30GB, 50GB, 70GB, 100GB, 200GB, 300GB, 400GB, and 500GB."
},
{
    question: "What billing periods are available for the storage plans?",
    answer: "Monthly and Yearly."
},
{
    question: "How many devices are allowed for the 10GB plan?",
    answer: "1 Device."
},
{
    question: "How many devices are allowed for the 500GB plan?",
    answer: "5 Devices."
},
{
    question: "What is the monthly price for the 10GB plan?",
    answer: "INR 18 per month."
},
{
    question: "What is the yearly price for the 10GB plan?",
    answer: "INR 195 per year."
},
{
    question: "What is the monthly price for the 50GB plan?",
    answer: "INR 89 per month."
},
{
    question: "What is the yearly price for the 50GB plan?",
    answer: "INR 915 per year."
},
{
    question: "What is the monthly price for the 100GB plan?",
    answer: "INR 177 per month."
},
{
    question: "What is the yearly price for the 100GB plan?",
    answer: "INR 1,726 per year."
},
{
    question: "What is the monthly price for the 500GB plan?",
    answer: "INR 885 per month."
},
{
    question: "What is the yearly price for the 500GB plan?",
    answer: "INR 8,343 per year."
},
{
    question: "Where are Odelya's servers located?",
    answer: "Kolkata, West Bengal, India"
},
{
    question: "What feature allows access from any device?",
    answer: "Multi-device access."
},
{
    question: "What is the starting price mentioned for data storage in Kolkata?",
    answer: "Just INR 18/month."
},
{
    question: "When can users access their files?",
    answer: "Anytime, anywhere with 24/7 accessibility."
},
{
    question: "What type of solutions does Odelya provide for businesses?",
    answer: "Enterprise-grade cloud storage solutions."
},
{
    question: "What is the Odelya Digital Locker perfect for?",
    answer: "Individuals needing secure storage in Kolkata for documents, photos, and files."
},
{
    question: "What company produces Odelya Cloud Storage?",
    answer: "Odelya Management Pvt Ltd (OMPL)."
},
{
    question: "What is the first IT service listed?",
    answer: "Income Tax Related Support."
},
{
    question: "What does the Income Tax Related Support service include?",
    answer: "Tax filing, Planning & Consultation services for personal & businesses."
},
{
    question: "What is the second IT service listed?",
    answer: "GST Related Support."
},
{
    question: "What does the GST Related Support service include?",
    answer: "GST registration, filing, returns, and compliance management services."
},
{
    question: "What is the third IT service listed?",
    answer: "Online Accounting Solution."
},
{
    question: "What does the Online Accounting Solution service include?",
    answer: "Cloud-based accounting software and digital bookkeeping solutions."
},
{
    question: "What does AMC Accounting Support stand for?",
    answer: "Annual Maintenance Contracts for comprehensive accounting support."
},
{
    question: "What is the service 'Cloud Storage for Accounting'?",
    answer: "Secure cloud storage facility for accounting data and records."
},
{
    question: "What type of support does 'Audit Support' provide?",
    answer: "All types of Income Tax related Audit support."
},
{
    question: "What does 'MCA Related Support' refer to?",
    answer: "MCA related all accounting solutions."
},
{
    question: "What services are included in 'Mutation, Local Taxes & Licenses'?",
    answer: "Property mutation services, local tax filing, trade license applications and compliance."
},
{
    question: "What is 'Heavy Duty Cloud Storage'?",
    answer: "Enterprise-level secure cloud storage solutions for special software related cloud space.."
},
{
    question: "What does 'SEO for Website' stand for?",
    answer: "Search Engine Optimization to improve website visibility and rankings."
},
{
    question: "What does the 'Website Making' service provide?",
    answer: "Custom website design and development from scratch."
},
{
    question: "What does 'Website Related Solutions' include?",
    answer: "Complete website maintenance, updates, and technical support."
},
{
    question: "What does the 'Website Hosting' service provide?",
    answer: "Reliable web hosting services with high uptime and security."
},
{
    question: "What is 'IT Solutions for Personal'?",
    answer: "Information Technology support, data backup, tech assistance for individuals."
},
{
    question: "What is 'IT Solutions for Business'?",
    answer: "Information Technological infrastructure and support for businesses."
},
{
    question: "What are 'Data Related Cloud Solutions'?",
    answer: "Cloud-based data management, backup, and recovery solutions."
},
{
    question: "What are 'Data Related Offline Solutions'?",
    answer: "Local storage, backup, and data management solutions."
},
{
    question: "What does 'Misc. IT Services' include?",
    answer: "Information Technology related troubleshooting and consultations."
},
{
    question: "What page is this HTML code for?",
    answer: "The About Us page for Odelya Cloud Digital Locker."
},
{
    question: "What is the title of the About page?",
    answer: "About Us - Odelya Cloud Digital Locker | Leadership & Mission."
},
{
    question: "What is the main description of the About page?",
    answer: "Learn about Odelya Cloud Digital Locker leadership, mission, and values. Meet our visionary leaders and discover our commitment to secure end-to-end encrypted cloud storage."
},
{
    question: "What are the four main areas covered in the 'Our Company'?",
    answer: "Our Mission, Our Vision, Our Values, and Our Service."
},
{
    question: "What is Odelya's mission?",
    answer: "To revolutionize data storage system by providing iron-clad security with end-to-end encryption, ensuring every byte of data remains private, secure, and instantly accessible to authorized users only."
},
{
    question: "What is Odelya's vision?",
    answer: "To become one of the most trusted cloud storage provider by making top-most level encryption accessible to individuals and businesses of all sizes, setting new standards in data privacy and security."
},
{
    question: "What are Odelya's three core values?",
    answer: "Security First, Innovation Driven, and Customer Solutions."
},
{
    question: "What does the 'Security First' value mean?",
    answer: "Your data's protection is our top priority."
},
{
    question: "What does the 'Innovation Driven' value mean?",
    answer: "Continuously evolving our technology."
},
{
    question: "What does the 'Customer Solutions' value mean?",
    answer: "Tailored to your needs through honest communication."
},
{
    question: "What service does Odelya Cloud Digital Locker provide?",
    answer: "Secure end-to-end encrypted storage with military-grade encryption. We offer private cloud storage solutions that ensure your files are fully protected at all times."
},
{
    question: "Who is the Chairman of Odelya?",
    answer: "Mr. Aniruddha Ghosh."
},
{
    question: "What is the Chairman's quote?",
    answer: "The word possible makes impossible to irrelevant."
},
{
    question: "What is the Chairman's vision?",
    answer: "Pioneering secure cloud solutions that redefine data protection standards in India and beyond."
},
{
    question: "What is the Chairman's professional background?",
    answer: "A professional physicist with no prior IT knowledge who established two highly successful software companies - BON-ACCORD (6-time Businessman of the Year award winner from USA) and EREVMAX."
},
{
    question: "What does the Chairman believe in?",
    answer: "Believes in making the impossible possible through relentless innovation and visionary thinking in the field of data security."
},
{
    question: "Who is the Director of Odelya?",
    answer: "Mr. Shyamal Sen."
},
{
    question: "What is the Director's quote?",
    answer: "Every byte of data deserves iron-clad security and privacy."
},
{
    question: "What is the Director's area of expertise?",
    answer: "Specialized in Accounting, Business Strategy, and Management with a focus on sustainable growth and operational excellence."
},
{
    question: "How much experience does the Director have?",
    answer: "40+ years of extensive experience in Accounting & Information Technology Business Management."
},
{
    question: "What does the Director bring to Odelya?",
    answer: "Financial discipline, innovation and strategic vision to Odelya's seamless operations."
},
{
    question: "What is the Director's strategic approach?",
    answer: "Combines financial acumen with technological insight to create scalable business models that prioritize security & privacy."
},
{
    question: "What are the three commitments listed in the 'Our Commitment'?",
    answer: "Security First, Instant Access, and User Control."
},
{
    question: "What does 'Instant Access' commitment mean?",
    answer: "Your data is always available when you need it. Our infrastructure ensures high-speed access from anywhere, at any time."
},
{
    question: "What does 'User Control' commitment mean?",
    answer: "You maintain complete control over your data. Our zero-knowledge architecture means we cannot access your encrypted files."
},
{
    question: "What are the two main office sections on the Contact page?",
    answer: "Administrative Office and Registered Office."
},
{
    question: "What is the address of the Administrative Office?",
    answer: "44E, 2nd Floor, Nandalalmitra Lane, Kolkata - 700040, West Bengal, India."
},
{
    question: "What are the business hours for the Administrative Office?",
    answer: "Monday to Saturday: 10:00 AM - 7:00 PM, Sunday: Closed."
},
{
    question: "What is the address of the Registered Office?",
    answer: "Molina Apartment, 1st Floor, 32/10 Chandi Ghosh Road, Kolkata - 700040, West Bengal, India."
},
{
    question: "What does Odelya Cloud Digital Locker provide?",
    answer: "End-to-end encrypted cloud storage solutions with military-grade security for personal and business data."
},
{
    question: "What encryption does Odelya's secure digital locker use?",
    answer: "256-bit encryption."
},
{
    question: "What does Odelya offer for a free consultation?",
    answer: "Cloud storage pricing plans, IT services, or income tax support."
},
{
    question: "What information is required in the contact form?",
    answer: "Your Name, Email Address, Phone Number, Subject, and Message."
},
{
    question: "What is the maximum character limit for the subject field?",
    answer: "30 characters."
},
{
    question: "What is the maximum character limit for the message field?",
    answer: "200 characters."
},
{
    question: "What is the success message that appears after submitting the form?",
    answer: "Thanks for reaching us! We will contact you within 72 business hours. We have received your inquiry about our cloud storage and IT services."
},
{
    question: "What is the effective date shown in the privacy policy?",
    answer: "Jan, 2025."
},
{
    question: "How many main privacy policy sections are there?",
    answer: "Eight sections."
},
{
    question: "What is the title of the first privacy policy section?",
    answer: "Our Commitment."
},
{
    question: "Who does the privacy policy say it applies to?",
    answer: "All services offered by Odelya, including Cloud Digital Locker, secure storage solutions, and any related services."
},
{
    question: "What does Odelya say it never accesses?",
    answer: "File Contents, File Names, Metadata, Decryption Keys, and Folder Structures."
},
{
    question: "What is zero-knowledge architecture explained as?",
    answer: "Your data is encrypted on your device before upload. We store only encrypted blobs that are meaningless without your private key."
},
{
    question: "What are the retention principles mentioned?",
    answer: "Active Accounts, Inactive Accounts, Account Deletion, and Legal Requirements."
},
{
    question: "How long after account diactivation does Odelya say complete data deletion occurs?",
    answer: "Within 24 hrs."
},
{
    question: "What standards does Odelya mention for secure deletion?",
    answer: "NIST 800-88 standards for media sanitization."
},
{
    question: "For what purposes does Odelya say it uses your information?",
    answer: "Service Delivery, Payment Processing, Communication, Legal Compliance, Service Improvement, Customer Support, and Security Protection."
},
{
    question: "What promise is made about transparency?",
    answer: "We will always be clear about how we use your data. If our data practices change, we will update this policy and notify you in advance."
},
{
    question: "In what circumstances does Odelya say data may be shared?",
    answer: "Legal Requirements, Essential Service Providers, Safety & Security, and With Your Consent."
},
{
    question: "What compliance standards does Odelya mention?",
    answer: "GDPR & DPDPA Compliant."
},
{
    question: "Where is user data primarily stored according to the policy?",
    answer: "All user data is stored within Indian borders in secure, certified data centers."
},
{
    question: "What rights are listed for users under applicable privacy laws?",
    answer: "Access Right, Correction Right, Deletion Right, Objection Right, Portability Right, Consent Withdrawal, and Complaint Right."
},
{
    question: "What does Odelya say about data sharing?",
    answer: "Data is never shared with third parties under any circumstances."
},
{
    question: "What data privacy features are listed?",
    answer: "No third-party data sharing, Strict internal access controls, Regular privacy audits, and GDPR compliant practices."
},
{
    question: "What access control features are listed?",
    answer: "Multi-factor authentication, Role-based access control, Session management, and Login attempt monitoring."
},
{
    question: "What does Odelya say about system monitoring?",
    answer: "Our systems are monitored 24X7 to prevent unauthorized access & data breaches."
},
{
    question: "What security features are listed?",
    answer: "24/7 security monitoring, Regular security audits, DDoS protection, and Secure data centers."
},
{
    question: "What advice does Odelya give about user credentials?",
    answer: "Users are advised to keep their login credentials secure and avoid sharing details with others."
},
{
    question: "What does Odelya say about compliance and standards?",
    answer: "We adhere to industry security standards and compliance to ensure data protection."
},
{
    question: "What compliance standards are listed?",
    answer: "ISO 27001 aligned, GDPR compliance, Regular penetration testing, and Security certifications."
},
{
    question: "What does the Zero-Knowledge principle mean?",
    answer: "We cannot access your encrypted data. Only you hold the keys."
},
{
    question: "What does the Defense principle mean?",
    answer: "Multiple layers of security protecting your data at every level."
},
{
    question: "What does the Monitoring principle mean?",
    answer: "Data under 24/7 security monitoring per global standards."
},
{
    question: "What does the Improvement principle mean?",
    answer: "Regular updates and security enhancements based on latest threats."
},
{
    question: "What security level percentage is shown?",
    answer: "95% Security Level."
},
{
    question: "What is section 1 about?",
    answer: "Cloud Storage Services Agreement."
},
{
    question: "Who is the Service Provider?",
    answer: "Odelya Management Pvt. Ltd."
},
{
    question: "What does 'Applicable Law' include?",
    answer: "Information Technology Act, 2000, Digital Personal Data Protection Act, 2023."
},
{
    question: "What is 'Client Data'?",
    answer: "All data, information, files, and content uploaded by the Client."
},
{
    question: "What is 'DPDPA'?",
    answer: "Digital Personal Data Protection Act, 2023."
},
{
    question: "What is 'Personal Data'?",
    answer: "As defined under the DPDPA."
},
{
    question: "What is 'Services'?",
    answer: "The cloud storage services described in the Order Form."
},
{
    question: "What is 'User'?",
    answer: "Any Individual or Ogranisation authorized by the Client to use the Services."
},
{
    question: "Who owns the Client Data?",
    answer: "The Client retains all rights to Client Data."
},
{
    question: "What encryption is used for data in transit?",
    answer: "Secure TLS protocols."
},
{
    question: "Who is the Data Fiduciary?",
    answer: "The Client."
},
{
    question: "Who is the Data Processor?",
    answer: "The Service Provider."
},
{
    question: "How soon must Data Breach be notified?",
    answer: "Within 24 working hours."
},
{
    question: "Where are primary data centers located?",
    answer: "Kolkata, West Bengal, India."
},
{
    question: "What is section 5 about?",
    answer: "Service Level Agreement."
},
{
    question: "What is the uptime commitment?",
    answer: "99.9% Monthly Uptime Percentage."
},
{
    question: "What is excluded from Downtime?",
    answer: "Scheduled maintenance and Force Majeure."
},
{
    question: "What is section 6 about?",
    answer: "User Terms and Conditions."
},
{
    question: "How many user terms are listed?",
    answer: "Eleven terms."
},
{
    question: "What is term 1 about?",
    answer: "Acceptance of Terms."
},
{
    question: "What is term 2 about?",
    answer: "Service Description."
},
{
    question: "What does the service provide?",
    answer: "Secure cloud storage with end-to-end encryption."
},
{
    question: "What is term 3 about?",
    answer: "User Responsibilities."
},
{
    question: "What are users responsible for?",
    answer: "Maintaining confidentiality of login credentials and authorized devices."
},
{
    question: "What is term 4 about?",
    answer: "Payment Terms."
},
{
    question: "Are payments refundable?",
    answer: "No, all payments are non-refundable."
},
{
    question: "When is service activated?",
    answer: "Within 48 hours of successful payment verification."
},
{
    question: "What is term 5 about?",
    answer: "Data Security."
},
{
    question: "What are users advised to do?",
    answer: "Maintain their own backups."
},
{
    question: "What is term 6 about?",
    answer: "Service Availability."
},
{
    question: "What is term 7 about?",
    answer: "Prohibited Content."
},
{
    question: "What content may not be stored?",
    answer: "Illegal, copyrighted, or malicious content."
},
{
    question: "What happens for violation?",
    answer: "Immediate termination."
},
{
    question: "What is term 8 about?",
    answer: "Termination."
},
{
    question: "Can service be terminated without refund?",
    answer: "Yes, for violation of terms. Also for your reference paid money cannot be refunded under any circumstances."
},
{
    question: "What is term 9 about?",
    answer: "Limitation of Liability."
},
{
    question: "What is Odelya not liable for?",
    answer: "Any indirect, incidental, or consequential damages."
},
{
    question: "What is term 10 about?",
    answer: "Governing Law."
},
{
    question: "Which laws govern the terms?",
    answer: "Laws of India."
},
{
    question: "Which jurisdiction applies?",
    answer: "Kolkata jurisdiction."
},
{
    question: "What is term 11 about?",
    answer: "Contact Information."
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
