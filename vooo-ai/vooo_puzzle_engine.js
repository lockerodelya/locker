// ============================================
// VOOO AI Puzzle Engine
// Lightweight, no dependencies, no storage
// ============================================

class VOOOPuzzleEngine {
    constructor() {
        this.currentPuzzle = null;
        this.currentTemplate = null;
        this.score = 0;
        this.totalAttempts = 0;
        this.currentCategory = 'quick_math';
        this.categories = {
            'quick_math': 'vooo_quick_math.json',
            'number_sequences': 'vooo_number_sequences.json',
            'logic_equations': 'vooo_logic_equations.json',
            'visual_patterns': 'vooo_visual_patterns.json',
            'word_number': 'vooo_word_number.json',
            'odd_one_out': 'vooo_odd_one_out.json',
            'reverse_calc': 'vooo_reverse_calc.json',
            'comparison': 'vooo_comparison.json',
            'missing_operation': 'vooo_missing_operation.json',
            'base_systems': 'vooo_base_systems.json',
            'code_cracker': 'vooo_code_cracker.json',
            'time_measurement': 'vooo_time_measurement.json'
        };
    }

    // ============================================
    // CORE ENGINE FUNCTIONS
    // ============================================

    async loadCategory(categoryName) {
        this.currentCategory = categoryName;
        const fileName = this.categories[categoryName];
        
        try {
            const response = await fetch(`vooo-json/${fileName}`);
            this.categoryData = await response.json();
            return true;
        } catch (error) {
            console.error('Error loading puzzle category:', error);
            return false;
        }
    }

    generateNewPuzzle() {
        if (!this.categoryData || !this.categoryData.templates) {
            return null;
        }

        // Randomly select a template
        const templates = this.categoryData.templates;
        const templateIndex = Math.floor(Math.random() * templates.length);
        this.currentTemplate = templates[templateIndex];

        // Generate variables
        const variables = this.generateVariables(this.currentTemplate.variables);
        
        // Calculate answer
        const answer = this.calculateAnswer(this.currentTemplate, variables);
        
        // Generate question text
        const question = this.generateQuestion(this.currentTemplate.pattern, variables);
        
        // Generate options
        const options = this.generateOptions(answer, this.currentTemplate);
        
        // Store current puzzle
        this.currentPuzzle = {
            question: question,
            options: options,
            correctAnswer: answer,
            correctIndex: options.indexOf(answer.toString()),
            explanation: this.generateExplanation(this.currentTemplate.explanation, variables, answer),
            templateId: this.currentTemplate.template_id
        };

        return this.currentPuzzle;
    }

    generateVariables(variableDefs) {
        const variables = {};
        
        for (const [varName, def] of Object.entries(variableDefs)) {
            if (def.value !== undefined) {
                variables[varName] = def.value;
            } else if (def.calc !== undefined) {
                // Calculate based on other variables
                try {
                    variables[varName] = this.evaluateExpression(def.calc, variables);
                } catch (e) {
                    variables[varName] = 0;
                }
            } else {
                // Random number within range
                const min = def.min || 1;
                const max = def.max || 10;
                const step = def.step || 1;
                
                const steps = Math.floor((max - min) / step) + 1;
                const randomStep = Math.floor(Math.random() * steps);
                variables[varName] = min + (randomStep * step);
            }
        }
        
        return variables;
    }

    evaluateExpression(expr, variables) {
        // Replace variable names with their values
        let evaluated = expr;
        for (const [varName, value] of Object.entries(variables)) {
            evaluated = evaluated.replace(new RegExp(varName, 'g'), value);
        }
        
        // Evaluate the expression safely
        try {
            // Using Function constructor as it's more secure than eval
            return new Function('return ' + evaluated)();
        } catch (e) {
            console.error('Error evaluating expression:', expr, e);
            return 0;
        }
    }

    calculateAnswer(template, variables) {
        if (template.calculation !== undefined) {
            return this.evaluateExpression(template.calculation, variables);
        } else if (template.correct_index !== undefined) {
            // For multiple choice with fixed options
            return template.options[template.correct_index];
        }
        return 0;
    }

    generateQuestion(pattern, variables) {
        let question = pattern;
        
        // Replace variables in pattern
        for (const [varName, value] of Object.entries(variables)) {
            question = question.replace(`[${varName}]`, value);
        }
        
        return question;
    }

    generateOptions(correctAnswer, template) {
        if (template.options) {
            // Use predefined options
            return [...template.options];
        }
        
        // Generate random options around correct answer
        const options = [];
        const correctNum = Number(correctAnswer);
        
        if (!isNaN(correctNum)) {
            // Numerical answer
            options.push(correctAnswer.toString());
            
            // Generate 3 wrong options
            for (let i = 0; i < 3; i++) {
                let wrongAnswer;
                const offset = (i + 1) * (Math.random() > 0.5 ? 1 : -1);
                
                if (Math.abs(correctNum) > 10) {
                    wrongAnswer = correctNum + offset * Math.floor(correctNum * 0.1);
                } else if (correctNum !== 0) {
                    wrongAnswer = correctNum + offset;
                } else {
                    wrongAnswer = i + 1;
                }
                
                // Ensure wrong answer is different and positive if needed
                if (wrongAnswer === correctNum || wrongAnswer <= 0) {
                    wrongAnswer = correctNum + (i + 2);
                }
                
                options.push(wrongAnswer.toString());
            }
        } else {
            // Non-numerical answer
            options.push(correctAnswer);
            
            // For non-numeric, provide generic wrong options
            const wrongOptions = ['A', 'B', 'C', 'D', 'X', 'Y', 'Z', 'N/A', 'None'];
            for (let i = 0; i < 3; i++) {
                let wrongOpt;
                do {
                    wrongOpt = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
                } while (options.includes(wrongOpt));
                options.push(wrongOpt);
            }
        }
        
        // Shuffle options
        return this.shuffleArray(options);
    }

    generateExplanation(explanationTemplate, variables, answer) {
        let explanation = explanationTemplate;
        
        // Replace variables in explanation
        for (const [varName, value] of Object.entries(variables)) {
            explanation = explanation.replace(`[${varName}]`, value);
        }
        
        // Replace [RESULT] with actual answer
        explanation = explanation.replace('[RESULT]', answer);
        
        return explanation;
    }

    checkAnswer(selectedIndex) {
        this.totalAttempts++;
        
        if (selectedIndex === this.currentPuzzle.correctIndex) {
            this.score++;
            return {
                correct: true,
                message: this.getRandomResponse('correct'),
                explanation: this.currentPuzzle.explanation
            };
        } else {
            return {
                correct: false,
                message: this.getRandomResponse('incorrect'),
                explanation: this.currentPuzzle.explanation,
                correctAnswer: this.currentPuzzle.correctAnswer
            };
        }
    }

    getRandomResponse(type) {
        const responses = this.categoryData?.responses?.[type] || 
            (type === 'correct' 
                ? ['Correct!', 'Well done!', 'Perfect!', 'Excellent!']
                : ['Try again!', 'Not quite!', 'Almost!', 'Keep going!']);
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getStats() {
        const accuracy = this.totalAttempts > 0 
            ? Math.round((this.score / this.totalAttempts) * 100) 
            : 0;
            
        return {
            score: this.score,
            totalAttempts: this.totalAttempts,
            accuracy: accuracy,
            currentCategory: this.currentCategory
        };
    }

    resetScore() {
        this.score = 0;
        this.totalAttempts = 0;
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    getCategoryDisplayName(categoryKey) {
        return this.categoryData?.display_name || this.formatCategoryName(categoryKey);
    }

    formatCategoryName(name) {
        return name.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    getAllCategories() {
        return Object.keys(this.categories).map(key => ({
            key: key,
            name: this.formatCategoryName(key),
            file: this.categories[key]
        }));
    }
}

// ============================================
// UI INTEGRATION FUNCTIONS
// ============================================

// Create global engine instance
window.voooEngine = new VOOOPuzzleEngine();

// Initialize the game
async function initVOOOGame() {
    // Load default category
    await voooEngine.loadCategory('quick_math');
    
    // Generate first puzzle
    const puzzle = voooEngine.generateNewPuzzle();
    
    if (puzzle) {
        updatePuzzleDisplay(puzzle);
    }
    
    // Update category selector
    updateCategorySelector();
}

function updatePuzzleDisplay(puzzle) {
    // Update question
    document.getElementById('vooo-question').textContent = puzzle.question;
    
    // Update options
    const optionsContainer = document.getElementById('vooo-options');
    optionsContainer.innerHTML = '';
    
    puzzle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'vooo-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Clear feedback
    document.getElementById('vooo-feedback').textContent = '';
    document.getElementById('vooo-explanation').textContent = '';
    
    // Update stats
    updateStatsDisplay();
}

function selectAnswer(selectedIndex) {
    const result = voooEngine.checkAnswer(selectedIndex);
    const feedbackEl = document.getElementById('vooo-feedback');
    const explanationEl = document.getElementById('vooo-explanation');
    
    if (result.correct) {
        feedbackEl.textContent = result.message;
        feedbackEl.className = 'vooo-feedback correct';
        explanationEl.textContent = result.explanation;
        
        // Auto-next after delay
        setTimeout(nextPuzzle, 1500);
    } else {
        feedbackEl.textContent = result.message;
        feedbackEl.className = 'vooo-feedback incorrect';
        explanationEl.textContent = `${result.explanation} (Correct: ${result.correctAnswer})`;
    }
    
    updateStatsDisplay();
}

async function nextPuzzle() {
    const puzzle = voooEngine.generateNewPuzzle();
    if (puzzle) {
        updatePuzzleDisplay(puzzle);
    }
}

async function changeCategory(categoryKey) {
    const success = await voooEngine.loadCategory(categoryKey);
    if (success) {
        nextPuzzle();
    }
}

function updateStatsDisplay() {
    const stats = voooEngine.getStats();
    document.getElementById('vooo-score').textContent = `Score: ${stats.score}`;
    document.getElementById('vooo-accuracy').textContent = `Accuracy: ${stats.accuracy}%`;
}

function updateCategorySelector() {
    const categories = voooEngine.getAllCategories();
    const selector = document.getElementById('vooo-category-select');
    
    if (selector) {
        selector.innerHTML = '';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.key;
            option.textContent = cat.name;
            selector.appendChild(option);
        });
        
        selector.onchange = (e) => changeCategory(e.target.value);
    }
}

function resetGame() {
    voooEngine.resetScore();
    nextPuzzle();
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVOOOGame);
} else {
    initVOOOGame();
}