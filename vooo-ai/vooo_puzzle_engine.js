// ============================================
// VOOO AI Puzzle Engine - ENHANCED VERSION
// Supports all JSON features we created
// ============================================

class VOOOPuzzleEngine {
    constructor() {
        this.currentPuzzle = null;
        this.currentTemplate = null;
        this.currentTemplateIndex = 0; // NEW: Track which template to use next
        this.score = 0;
        this.totalAttempts = 0;
        this.currentCategory = 'math_toddler';
        this.categories = {
            'math_toddler': 'math_toddler.json',
            'math_beginner': 'math_beginner.json',
            'math_elementary': 'math_elementary.json',
            'math_intermediate': 'math_intermediate.json',
            'math_advanced': 'math_advanced.json',
            'math_scholar': 'math_scholar.json'
        };
        
        // Shape and color mappings
        this.shapeMap = {
            'circle': '○',
            'square': '□', 
            'triangle': '△',
            'star': '★',
            'heart': '♥',
            'diamond': '◇',
            'rectangle': '▢',
            'hexagon': '⬡'
        };
        
        this.colorMap = {
            'red': '🔴',
            'blue': '🔵',
            'yellow': '🟡',
            'green': '🟢',
            'black': '⚫',
            'white': '⚪'
        };
        
        this.sizeComparison = {
            '🐘': 'big', '🦒': 'big', '🐋': 'big', '🏠': 'big', '🌳': 'big',
            '🐭': 'small', '🐦': 'small', '🐜': 'small', '📦': 'small', '🌸': 'small'
        };
    }

    // ============================================
    // CORE ENGINE FUNCTIONS - UPDATED
    // ============================================

    async loadCategory(categoryName) {
        this.currentCategory = categoryName;
        const fileName = this.categories[categoryName];
        
        try {
            const response = await fetch(`/vooo-ai/vooo-json/${fileName}`);
            this.categoryData = await response.json();
            this.currentTemplateIndex = 0; // NEW: Reset template index when loading new category
            return true;
        } catch (error) {
            console.error('Error loading puzzle category:', error);
            return false;
        }
    }

    generateNewPuzzle() {
        if (!this.categoryData || !this.categoryData.templates) {
            console.error('No category data or templates found');
            return null;
        }

        // FIXED: Cycle through ALL templates sequentially
        const templates = this.categoryData.templates;
        
        // Select current template
        this.currentTemplate = templates[this.currentTemplateIndex];
        
        console.log(`🎯 Using template ${this.currentTemplateIndex + 1}/${templates.length}: ${this.currentTemplate.template_id}`);
        
        // Move to next template, loop back to 0 when we reach the end
        this.currentTemplateIndex = (this.currentTemplateIndex + 1) % templates.length;
        
        if (this.currentTemplateIndex === 0) {
            console.log('✅ All templates cycled! Starting from beginning.');
        }

        // Generate variables
        const variables = this.generateVariables(this.currentTemplate.variables);
        
        // Generate question based on pattern or pattern_builder
        const question = this.generateQuestion(this.currentTemplate, variables);
        
        // Generate answer
        const answer = this.calculateAnswer(this.currentTemplate, variables);
        
        // Generate options based on answer_type
        const options = this.generateOptions(answer, this.currentTemplate, variables);
        
        // Store current puzzle
        this.currentPuzzle = {
            question: question,
            options: options,
            correctAnswer: answer,
            correctIndex: this.findCorrectIndex(options, answer, this.currentTemplate.answer_type),
            explanation: this.generateExplanation(this.currentTemplate, variables, answer),
            templateId: this.currentTemplate.template_id,
            level: this.currentCategory.replace('math_', ''),
            answerType: this.currentTemplate.answer_type || 'text'
        };

        console.log('Generated puzzle:', this.currentPuzzle);
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
    console.log('Evaluating expression:', expr, 'with variables:', variables);
    
    // Replace variable names with their values
    let evaluated = expr;
    for (const [varName, value] of Object.entries(variables)) {
        // Use word boundaries to avoid partial matches
        const regex = new RegExp('\\b' + varName + '\\b', 'g');
        evaluated = evaluated.replace(regex, JSON.stringify(value));
    }
    
    console.log('After variable substitution:', evaluated);
    
    // Add support for custom functions
    if (evaluated.includes('repeat(')) {
        evaluated = evaluated.replace(/repeat\(([^,]+),\s*([^)]+)\)/g, (match, emoji, count) => {
            // Remove quotes from emoji variable name and get its value
            const emojiName = emoji.trim().replace(/['"]/g, '');
            const emojiValue = variables[emojiName] || emojiName;
            const repeatCount = parseInt(count) || 1;
            return JSON.stringify(emojiValue.repeat(repeatCount));
        });
    }
    
    if (evaluated.includes('next_in_pattern(')) {
        evaluated = evaluated.replace(/next_in_pattern\(([^)]+)\)/g, (match, pattern) => {
            const result = this.calculateNextInPattern(pattern.trim().replace(/['"]/g, ''), variables);
            return JSON.stringify(result);
        });
    }
    
    if (evaluated.includes('generate_options(')) {
        evaluated = evaluated.replace(/generate_options\(([^)]+)\)/g, (match, params) => {
            const [num, emoji] = params.split(',').map(p => p.trim().replace(/['"]/g, ''));
            const options = this.generateVisualOptions(num, emoji, variables);
            // Return as JSON array string
            return JSON.stringify(options);
        });
    }
    
    console.log('After function processing:', evaluated);
    
    // Evaluate the expression safely
    try {
        // If it's already a JSON string, parse it
        if (evaluated.startsWith('[') && evaluated.endsWith(']')) {
            try {
                return JSON.parse(evaluated);
            } catch (e) {
                console.error('Error parsing array:', evaluated, e);
                return [];
            }
        }
        
        // If it's a quoted string, return it
        if ((evaluated.startsWith('"') && evaluated.endsWith('"')) || 
            (evaluated.startsWith("'") && evaluated.endsWith("'"))) {
            return evaluated.slice(1, -1);
        }
        
        // If it's a boolean string
        if (evaluated === 'true') return true;
        if (evaluated === 'false') return false;
        
        // If it's a number
        if (!isNaN(evaluated) && evaluated.trim() !== '') {
            return Number(evaluated);
        }
        
        // If it's just a string value (like "square"), return it
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(evaluated)) {
            return evaluated;
        }
        
        // For complex expressions
        const result = new Function('return ' + evaluated)();
        console.log('Evaluation result:', result);
        return result;
    } catch (e) {
        console.error('Error evaluating expression:', expr, '->', evaluated, e);
        // Return as string if all else fails
        return expr;
    }
}

    generateQuestion(template, variables) {
        // Use pattern_builder if available
        if (template.pattern_builder) {
            try {
                const result = this.evaluateExpression(template.pattern_builder, variables);
                console.log('Built question:', result);
                return result;
            } catch (e) {
                console.error('Error building pattern:', e);
            }
        }
        
        // Fallback to pattern
        let question = template.pattern;
        for (const [varName, value] of Object.entries(variables)) {
            question = question.replace(`[${varName}]`, value);
        }
        
        return question;
    }

calculateAnswer(template, variables) {
    if (template.calculation) {
        // First check if the calculation is just a variable name
        const calc = template.calculation.trim();
        
        // Check if calculation uses repeat() function
        if (calc.includes('repeat(')) {
            return this.evaluateExpression(calc, variables);
        }
        
        // Check if calculation uses next_in_pattern() function
        if (calc.includes('next_in_pattern(')) {
            const pattern = this.evaluateExpression(calc, variables);
            
            // Get the template options (the emojis available)
            const options = template.options || [];
            
            // Determine which emoji to return based on pattern
            if (pattern === 'ABAB' || pattern === 'AABB') {
                // Next in ABAB (🔴🟡🔴🟡?) is 🔴 (first)
                // Next in AABB (🔴🔴🟡🟡?) is 🔴 (first)
                return options[0] || '🔴';
            } else if (pattern === 'ABCABC') {
                // Next in ABCABC (🔴🟡🔵🔴🟡?) is 🔵 (third)
                return options[2] || '🔵';
            }
            
            return options[0] || '?';
        }
        
        // If it's just a variable name (like "SHAPE" or "NUMBER"), return its value directly
        if (variables.hasOwnProperty(calc)) {
            const value = variables[calc];
            
            // Special handling for visual matching (TOD_MATCH_01)
            if (template.answer_type === 'multiple_choice_visual' && template.options_builder) {
                // The answer should be the emoji repeated, not just the number
                const emojiVar = template.options_builder.match(/generate_options\([^,]+,\s*(\w+)\)/);
                if (emojiVar && variables[emojiVar[1]]) {
                    return variables[emojiVar[1]].repeat(value);
                }
            }
            
            // Handle special answer types
            if (template.answer_type === 'shape_selector' && typeof value === 'string') {
                return this.shapeMap[value] || value;
            }
            
            if (template.answer_type === 'color_picker' && typeof value === 'string') {
                return this.colorMap[value] || value;
            }
            
            if (template.answer_type === 'comparison' && typeof value === 'string') {
                return variables[value + '_EMOJI'] || value;
            }
            
            // Format numbers to max 4 decimal places
            if (typeof value === 'number') {
                return parseFloat(value.toFixed(4));
            }
            
            return value;
        }
        
        // Otherwise, evaluate as expression
        const result = this.evaluateExpression(template.calculation, variables);
        
        // Handle special answer types
        if (template.answer_type === 'shape_selector' && typeof result === 'string') {
            return this.shapeMap[result] || result;
        }
        
        if (template.answer_type === 'color_picker' && typeof result === 'string') {
            return this.colorMap[result] || result;
        }
        
        if (template.answer_type === 'comparison' && typeof result === 'string') {
            return variables[result + '_EMOJI'] || result;
        }
        
        // Format numbers to max 4 decimal places
        if (typeof result === 'number') {
            return parseFloat(result.toFixed(4));
        }
        
        return result;
    }
    return 0;
}

    generateOptions(correctAnswer, template, variables) {
        console.log('Generating options for answer:', correctAnswer, 'type:', template.answer_type);
        
        // Use options_builder if available
        if (template.options_builder) {
            try {
                const options = this.evaluateExpression(template.options_builder, variables);
                console.log('Built options:', options);
                if (Array.isArray(options)) {
                    return this.shuffleArray(options);
                }
            } catch (e) {
                console.error('Error building options:', e);
            }
        }
        
        // Use predefined options if available
        if (template.options && Array.isArray(template.options)) {
            const options = [...template.options];
            // Add correct answer if not already in options
            if (!options.includes(correctAnswer)) {
                options.push(correctAnswer);
            }
            return this.shuffleArray(options);
        }
        
        // Generate default options for different answer types
        if (template.answer_type === 'shape_selector') {
            const shapes = Object.values(this.shapeMap);
            return this.shuffleArray([...shapes]);
        }
        
        if (template.answer_type === 'color_picker') {
            const colors = Object.values(this.colorMap);
            return this.shuffleArray([...colors]);
        }
        
        if (template.answer_type === 'comparison') {
            const options = [variables.A_EMOJI, variables.B_EMOJI];
            return this.shuffleArray(options);
        }
        
        // Default: generate numeric options
        const options = [];
        const correctNum = Number(correctAnswer);
        
        if (!isNaN(correctNum)) {
            options.push(parseFloat(correctAnswer.toFixed(4)).toString());
            
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
                
                if (wrongAnswer === correctNum || wrongAnswer <= 0) {
                    wrongAnswer = correctNum + (i + 2);
                }
                
                options.push(parseFloat(wrongAnswer.toFixed(4)).toString());
            }
        } else {
            // Non-numerical
            options.push(correctAnswer);
            const wrongOptions = ['A', 'B', 'C', 'D'];
            for (let i = 0; i < 3; i++) {
                let wrongOpt;
                do {
                    wrongOpt = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
                } while (options.includes(wrongOpt));
                options.push(wrongOpt);
            }
        }
        
        return this.shuffleArray(options);
    }

    generateVisualOptions(number, emojiName, variables) {
        const emoji = variables[emojiName] || emojiName;
        const targetNumber = parseInt(number) || 3;
        const options = [];
        
        // Create visual representations of numbers around the target
        for (let i = 1; i <= 5; i++) {
            options.push(emoji.repeat(i));
        }
        
        // Make sure the correct number is in options
        if (targetNumber >= 1 && targetNumber <= 5) {
            if (!options.includes(emoji.repeat(targetNumber))) {
                options[0] = emoji.repeat(targetNumber);
            }
        }
        
        return this.shuffleArray(options);
    }

    calculateNextInPattern(patternType, variables) {
        switch (patternType) {
            case 'ABAB':
                return '🔴'; // Next in 🔴🟡🔴🟡 is 🔴
            case 'AABB':
                return '🟡'; // Next in 🔴🔴🟡🟡? is 🟡
            case 'ABCABC':
                return '🔵'; // Next in 🔴🟡🔵🔴🟡? is 🔵
            default:
                return '?';
        }
    }

findCorrectIndex(options, correctAnswer, answerType) {
    console.log('Finding correct index for:', correctAnswer, 'in options:', options, 'type:', answerType);
    
    // For visual comparisons, we need to check differently
    if (answerType === 'comparison') {
        const aSize = this.sizeComparison[options[0]] || 'medium';
        const bSize = this.sizeComparison[options[1]] || 'medium';
        
        // Assuming bigger is correct (as per your template)
        const correctIndex = aSize === 'big' ? 0 : 1;
        console.log('Comparison correct index:', correctIndex);
        return correctIndex;
    }
    
    // Default: find by value - compare as strings to handle type differences
    const index = options.findIndex(opt => String(opt) === String(correctAnswer));
    console.log('Found correct index:', index);
    return index;
}

    generateExplanation(template, variables, answer) {
        if (!template.explanation) {
            return `The correct answer is ${answer}.`;
        }
        
        let explanation = template.explanation;
        for (const [varName, value] of Object.entries(variables)) {
            // Format numeric values to 4 decimal places in explanation
            const displayValue = typeof value === 'number' ? parseFloat(value.toFixed(4)) : value;
            explanation = explanation.replace(`[${varName}]`, displayValue);
        }
        
        // Format answer to 4 decimal places in explanation
        const displayAnswer = typeof answer === 'number' ? parseFloat(answer.toFixed(4)) : answer;
        explanation = explanation.replace('[RESULT]', displayAnswer);
        return explanation;
    }

    checkAnswer(selectedIndex) {
        this.totalAttempts++;
        
        const isCorrect = selectedIndex === this.currentPuzzle.correctIndex;
        
        if (isCorrect) {
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
    // Return fixed messages, not random ones
    if (type === 'correct') {
        return 'Yes Correct Answer';
    } else {
        return 'Please try again';
    }
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
    const words = name.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    );
    
    // Join with space and ensure "Math" is included
    let result = words.join(' ');
    if (!result.includes('Math')) {
        result = result.replace(/(Toddler|Beginner|Elementary|Intermediate|Advanced|Expert|Scholar|Genius)/, '$1 Math');
    }
    return result;
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
    console.log('Initializing VOOO game...');
    
    // Load default category (Toddler level)
    const loaded = await voooEngine.loadCategory('math_beginner');
    
    if (!loaded) {
        document.getElementById('vooo-question').textContent = 'Error loading puzzles.';
        return;
    }
    
    // Generate first puzzle
    const puzzle = voooEngine.generateNewPuzzle();
    
    if (puzzle) {
        updatePuzzleDisplay(puzzle);
    } else {
        // Show error message
        document.getElementById('vooo-question').textContent = 'Error generating puzzle. Check console.';
    }
    
    // Update level selector
    updateLevelSelector();
    
    // Update level indicator
    updateLevelIndicator();
}

function updatePuzzleDisplay(puzzle) {
    console.log('Updating puzzle display:', puzzle);
    
    // Update question
    document.getElementById('vooo-question').textContent = puzzle.question;
    
    // Update options
    const optionsContainer = document.getElementById('vooo-options');
    optionsContainer.innerHTML = '';
    
    puzzle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'vooo-option';
        
        // Handle emoji/visual options
        if (typeof option === 'string' && option.length > 2 && !option.match(/^[0-9]+$/)) {
            button.textContent = option;
            button.style.fontSize = '1.5em'; // Make emojis bigger
        } else {
            button.textContent = option;
        }
        
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Clear feedback
    document.getElementById('vooo-feedback').textContent = '';
    document.getElementById('vooo-feedback').className = 'vooo-feedback';
    
    // Reset custom styles
    document.getElementById('vooo-feedback').style.background = '';
    document.getElementById('vooo-feedback').style.border = '';
    document.getElementById('vooo-feedback').style.color = '';
    document.getElementById('vooo-feedback').style.fontWeight = '';
    
    document.getElementById('vooo-explanation').textContent = '';
    
    // Update stats
    updateStatsDisplay();
}

function selectAnswer(selectedIndex) {
    console.log('Selected answer:', selectedIndex);
    const result = voooEngine.checkAnswer(selectedIndex);
    const feedbackEl = document.getElementById('vooo-feedback');
    const explanationEl = document.getElementById('vooo-explanation');
    const optionsContainer = document.getElementById('vooo-options');
    const optionButtons = optionsContainer.querySelectorAll('.vooo-option');
    
    // Reset all button colors first
    optionButtons.forEach(button => {
        button.style.backgroundColor = '';
        button.style.borderColor = '';
    });
    
    if (result.correct) {
        // Correct answer - turn button green
        optionButtons[selectedIndex].style.backgroundColor = '#c6f6d5';
        optionButtons[selectedIndex].style.borderColor = '#9ae6b4';
        
        feedbackEl.textContent = 'Yes Correct Answer';
        feedbackEl.className = 'vooo-feedback correct';
        explanationEl.textContent = result.explanation;
        
        // Auto next after 3 seconds
        setTimeout(nextPuzzle, 3000);
    } else {
        // Wrong answer - turn button red
        optionButtons[selectedIndex].style.backgroundColor = '#fed7d7';
        optionButtons[selectedIndex].style.borderColor = '#fc8181';
        
        feedbackEl.textContent = 'Please try again';
        feedbackEl.className = 'vooo-feedback incorrect';
        
        // Custom styling
        feedbackEl.style.background = 'white';
        feedbackEl.style.border = '2px solid black';
        feedbackEl.style.color = 'red';
        feedbackEl.style.fontWeight = 'bold';
    }
    
    updateStatsDisplay();
}

async function nextPuzzle() {
    console.log('Loading next puzzle...');
    const puzzle = voooEngine.generateNewPuzzle();
    if (puzzle) {
        updatePuzzleDisplay(puzzle);
    }
}

async function changeLevel(levelKey) {
    console.log('Changing level to:', levelKey);
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
        levelProgress.textContent = `Level ${levelIndex}/4 - ${stats.currentLevel}`;
    }
}

function updateLevelSelector() {
    const levels = voooEngine.getAllCategories();
    const selector = document.getElementById('vooo-category-select');
    
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
    console.log('Resetting game...');
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
