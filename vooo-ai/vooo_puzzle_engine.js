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
        this.currentCategory = 'math_toddler';
        this.categories = {
            'math_toddler': 'math_toddler.json',
            'math_beginner': 'math_beginner.json',
            'math_elementary': 'math_elementary.json',
            'math_intermediate': 'math_intermediate.json',
            'math_advanced': 'math_advanced.json',
            'math_expert': 'math_expert.json',
            'math_scholar': 'math_scholar.json',
            'math_genius': 'math_genius.json'
        };
    }

    // ============================================
    // CORE ENGINE FUNCTIONS
    // ============================================

    async loadCategory(categoryName) {
        this.currentCategory = categoryName;
        const fileName = this.categories[categoryName];
        
        try {
            const response = await fetch(`/vooo-ai/vooo-json/${fileName}`);
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
            templateId: this.currentTemplate.template_id,
            level: this.currentCategory.replace('math_', '')
        };

        return this.currentPuzzle;
    }

    generateVariables(variableDefs) {
        const variables = {};
        
        for (const [varName, def] of Object.entries(variableDefs)) {
            if (def.value !== undefined) {
                variables[varName] = def.value;
            } else if (def.values !== undefined) {
                // Random selection from array of values
                variables[varName] = def.values[Math.floor(Math.random() * def.values.length)];
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
                explanation: this.currentPuzzle.explanation,
                level: this.currentPuzzle.level
            };
        } else {
            return {
                correct: false,
                message: this.getRandomResponse('incorrect'),
                explanation: this.currentPuzzle.explanation,
                correctAnswer: this.currentPuzzle.correctAnswer,
                level: this.currentPuzzle.level
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
            currentCategory: this.currentCategory,
            currentLevel: this.currentCategory.replace('math_', '')
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
            display: this.formatCategoryName(key.replace('math_', '')),
            file: this.categories[key]
        }));
    }

    getLevelOrder() {
        return [
            'math_toddler',
            'math_beginner', 
            'math_elementary',
            'math_intermediate',
            'math_advanced',
            'math_expert',
            'math_scholar',
            'math_genius'
        ];
    }

    async progressToNextLevel() {
        const levels = this.getLevelOrder();
        const currentIndex = levels.indexOf(this.currentCategory);
        
        if (currentIndex < levels.length - 1) {
            const nextLevel = levels[currentIndex + 1];
            const success = await this.loadCategory(nextLevel);
            if (success) {
                this.resetScore();
                return nextLevel;
            }
        }
        return null;
    }

    getCurrentLevelIndex() {
        const levels = this.getLevelOrder();
        return levels.indexOf(this.currentCategory);
    }

    isMaxLevel() {
        const levels = this.getLevelOrder();
        return this.currentCategory === levels[levels.length - 1];
    }
}

// ============================================
// UI INTEGRATION FUNCTIONS
// ============================================

// Create global engine instance
window.voooEngine = new VOOOPuzzleEngine();

// Initialize the game
async function initVOOOGame() {
    // Load default category (Toddler level)
    await voooEngine.loadCategory('math_toddler');
    
    // Generate first puzzle
    const puzzle = voooEngine.generateNewPuzzle();
    
    if (puzzle) {
        updatePuzzleDisplay(puzzle);
    }
    
    // Update level selector
    updateLevelSelector();
    
    // Update level indicator
    updateLevelIndicator();
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
        
        // Check if should progress to next level
        const stats = voooEngine.getStats();
        if (stats.score >= 10 && stats.accuracy >= 80 && !voooEngine.isMaxLevel()) {
            showLevelUpPrompt();
        } else {
            // Auto-next after delay
            setTimeout(nextPuzzle, 1500);
        }
    } else {
        feedbackEl.textContent = result.message;
        feedbackEl.className = 'vooo-feedback incorrect';
        explanationEl.textContent = `${result.explanation} (Correct: ${result.correctAnswer})`;
        
        // Next puzzle after delay for incorrect answers
        setTimeout(nextPuzzle, 2500);
    }
    
    updateStatsDisplay();
}

async function nextPuzzle() {
    const puzzle = voooEngine.generateNewPuzzle();
    if (puzzle) {
        updatePuzzleDisplay(puzzle);
    }
}

async function changeLevel(levelKey) {
    const success = await voooEngine.loadCategory(levelKey);
    if (success) {
        voooEngine.resetScore();
        nextPuzzle();
        updateLevelIndicator();
    }
}

function updateStatsDisplay() {
    const stats = voooEngine.getStats();
    document.getElementById('vooo-score').textContent = `Score: ${stats.score}`;
    document.getElementById('vooo-accuracy').textContent = `Accuracy: ${stats.accuracy}%`;
    
    // Update level progress
    const levelProgress = document.getElementById('vooo-level-progress');
    if (levelProgress) {
        const levelIndex = voooEngine.getCurrentLevelIndex() + 1;
        levelProgress.textContent = `Level ${levelIndex}/8 - ${stats.currentLevel}`;
    }
}

function updateLevelSelector() {
    const levels = voooEngine.getAllCategories();
    const selector = document.getElementById('vooo-level-select');
    
    if (selector) {
        selector.innerHTML = '';
        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.key;
            option.textContent = level.display;
            selector.appendChild(option);
        });
        
        // Set current level
        selector.value = voooEngine.currentCategory;
        
        selector.onchange = (e) => changeLevel(e.target.value);
    }
}

function updateLevelIndicator() {
    const levelIndicator = document.getElementById('vooo-current-level');
    if (levelIndicator) {
        const displayName = voooEngine.getCategoryDisplayName(voooEngine.currentCategory);
        levelIndicator.textContent = displayName;
    }
}

function resetGame() {
    voooEngine.resetScore();
    nextPuzzle();
}

function showLevelUpPrompt() {
    const prompt = document.getElementById('vooo-level-up-prompt');
    if (prompt) {
        prompt.style.display = 'block';
        prompt.innerHTML = `
            <div class="level-up-content">
                <h3>🎉 Level Up Unlocked! 🎉</h3>
                <p>You've mastered this level with ${voooEngine.getStats().accuracy}% accuracy!</p>
                <p>Ready for the next challenge?</p>
                <button onclick="progressToNextLevel()" class="level-up-btn">Advance to Next Level</button>
                <button onclick="stayAtCurrentLevel()" class="stay-btn">Stay Here</button>
            </div>
        `;
    }
}

function hideLevelUpPrompt() {
    const prompt = document.getElementById('vooo-level-up-prompt');
    if (prompt) {
        prompt.style.display = 'none';
    }
}

async function progressToNextLevel() {
    const nextLevel = await voooEngine.progressToNextLevel();
    if (nextLevel) {
        hideLevelUpPrompt();
        nextPuzzle();
        updateLevelIndicator();
        updateLevelSelector();
        
        // Show level up message
        const feedbackEl = document.getElementById('vooo-feedback');
        feedbackEl.textContent = `🎊 Advanced to ${voooEngine.getCategoryDisplayName(nextLevel)}! 🎊`;
        feedbackEl.className = 'vooo-feedback level-up';
    }
}

function stayAtCurrentLevel() {
    hideLevelUpPrompt();
    setTimeout(nextPuzzle, 1000);
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVOOOGame);
} else {
    initVOOOGame();
}
