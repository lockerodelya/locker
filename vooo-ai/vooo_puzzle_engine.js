// ============================================
// VOOO AI Puzzle Engine - ENHANCED VERSION
// Supports all JSON features + NEW REASONING TYPES
// ============================================

class VOOOPuzzleEngine {
    constructor() {
        this.currentPuzzle = null;
        this.currentTemplate = null;
        this.currentTemplateIndex = 0;
        this.score = 0;
        this.totalAttempts = 0;
        this.currentCategory = 'math_toddler';
        
        // ============================================
        // CATEGORIES - MATH + REASONING
        // ============================================
        this.categories = {
            // MATH CATEGORIES
            'math_toddler': 'math_toddler.json',
            'math_beginner': 'math_beginner.json',
            'math_elementary': 'math_elementary.json',
            'math_intermediate': 'math_intermediate.json',
            'math_advanced': 'math_advanced.json',
            'math_scholar': 'math_scholar.json',
            
            // LOGICAL REASONING
            'reasoning_beginner': 'reasoning_beginner.json',
            'reasoning_analogical_beginner': 'reasoning_analogical_beginner.json',
            'reasoning_if-then_beginner': 'reasoning_if-then_beginner.json',
            'reasoning_syllogistic_beginner': 'reasoning_syllogistic_beginner.json',
            'reasoning_intermediate': 'reasoning_intermediate.json',
            'reasoning_advanced': 'reasoning_advanced.json',

            // LOGICAL REASONING
            'reasoning_sudoku_intermediate': 'reasoning_sudoku_intermediate.json',
            'reasoning_sudoku_advanced': 'reasoning_sudoku_advanced.json',
            'reasoning_grid_intermediate': 'reasoning_grid_intermediate.json',
            'reasoning_grid_advanced': 'reasoning_grid_advanced.json',
            'reasoning_sequence_intermediate': 'reasoning_sequence_intermediate.json',
            'reasoning_sequence_advanced': 'reasoning_sequence_advanced.json',
            'reasoning_code_intermediate': 'reasoning_code_intermediate.json',
            'reasoning_code_advanced': 'reasoning_code_advanced.json',
            'reasoning_lateral_intermediate': 'reasoning_lateral_intermediate.json',
            'reasoning_lateral_advanced': 'reasoning_lateral_advanced.json',
            
             // PATTERN CATEGORIES
            'pattern_beginner': 'pattern_beginner.json',
            'pattern_intermediate': 'pattern_intermediate.json',
            'pattern_advanced': 'pattern_advanced.json',

            // MATH OPERATIONS CATEGORIES
            'mathops_beginner': 'mathops_beginner.json',            

            // PROBLEM SOLVING CATEGORIES
            'problem_comparison_beginner': 'problem_comparison_beginner.json',
            'problem_time_beginner': 'problem_time_beginner.json',
            'problem_probability_beginner': 'problem_probability_beginner.json',
            'problem_classification_beginner': 'problem_classification_beginner.json',
            'problem_solving_beginner': 'problem_solving_beginner.json',
            'problem_causeeffect_beginner': 'problem_causeeffect_beginner.json'
            
            
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
            this.currentTemplateIndex = 0;
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

        const templates = this.categoryData.templates;
        
        this.currentTemplate = templates[this.currentTemplateIndex];
        
        console.log(`🎯 Using template ${this.currentTemplateIndex + 1}/${templates.length}: ${this.currentTemplate.template_id}`);
        
        this.currentTemplateIndex = (this.currentTemplateIndex + 1) % templates.length;
        
        if (this.currentTemplateIndex === 0) {
            console.log('✅ All templates cycled! Starting from beginning.');
        }

        const variables = this.generateVariables(this.currentTemplate.variables);
        const question = this.generateQuestion(this.currentTemplate, variables);
        const answer = this.calculateAnswer(this.currentTemplate, variables);
        const options = this.generateOptions(answer, this.currentTemplate, variables);
        
        this.currentPuzzle = {
            question: question,
            options: options,
            correctAnswer: answer,
            correctIndex: this.findCorrectIndex(options, answer, this.currentTemplate.answer_type),
            explanation: this.generateExplanation(this.currentTemplate, variables, answer),
            templateId: this.currentTemplate.template_id,
            level: this.currentCategory,
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
                variables[varName] = def.values[Math.floor(Math.random() * def.values.length)];
            } else if (def.calc !== undefined) {
                try {
                    variables[varName] = this.evaluateExpression(def.calc, variables);
                } catch (e) {
                    variables[varName] = 0;
                }
            } else {
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
        
        let evaluated = expr;
        for (const [varName, value] of Object.entries(variables)) {
            const regex = new RegExp('\\b' + varName + '\\b', 'g');
            evaluated = evaluated.replace(regex, JSON.stringify(value));
        }
        
        console.log('After variable substitution:', evaluated);
        
        if (evaluated.includes('repeat(')) {
            evaluated = evaluated.replace(/repeat\(([^,]+),\s*([^)]+)\)/g, (match, emoji, count) => {
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
                return JSON.stringify(options);
            });
        }
        
        console.log('After function processing:', evaluated);
        
        try {
            if (evaluated.startsWith('[') && evaluated.endsWith(']')) {
                try {
                    return JSON.parse(evaluated);
                } catch (e) {
                    console.error('Error parsing array:', evaluated, e);
                    return [];
                }
            }
            
            if ((evaluated.startsWith('"') && evaluated.endsWith('"')) || 
                (evaluated.startsWith("'") && evaluated.endsWith("'"))) {
                return evaluated.slice(1, -1);
            }
            
            if (evaluated === 'true') return true;
            if (evaluated === 'false') return false;
            
            if (!isNaN(evaluated) && evaluated.trim() !== '') {
                return Number(evaluated);
            }
            
            if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(evaluated)) {
                return evaluated;
            }
            
            const result = new Function('return ' + evaluated)();
            console.log('Evaluation result:', result);
            return result;
        } catch (e) {
            console.error('Error evaluating expression:', expr, '->', evaluated, e);
            return expr;
        }
    }

    generateQuestion(template, variables) {
        if (template.pattern_builder) {
            try {
                const result = this.evaluateExpression(template.pattern_builder, variables);
                console.log('Built question:', result);
                return result;
            } catch (e) {
                console.error('Error building pattern:', e);
            }
        }
        
        let question = template.pattern;
        for (const [varName, value] of Object.entries(variables)) {
            question = question.replace(`[${varName}]`, value);
        }
        
        return question;
    }

    calculateAnswer(template, variables) {
        if (template.calculation) {
            const calc = template.calculation.trim();
            
            if (calc.includes('repeat(')) {
                return this.evaluateExpression(calc, variables);
            }
            
            if (calc.includes('next_in_pattern(')) {
                const pattern = this.evaluateExpression(calc, variables);
                const options = template.options || [];
                
                if (pattern === 'ABAB' || pattern === 'AABB') {
                    return options[0] || '🔴';
                } else if (pattern === 'ABCABC') {
                    return options[2] || '🔵';
                }
                
                return options[0] || '?';
            }
            
            if (variables.hasOwnProperty(calc)) {
                const value = variables[calc];
                
                if (template.answer_type === 'multiple_choice_visual' && template.options_builder) {
                    const emojiVar = template.options_builder.match(/generate_options\([^,]+,\s*(\w+)\)/);
                    if (emojiVar && variables[emojiVar[1]]) {
                        return variables[emojiVar[1]].repeat(value);
                    }
                }
                
                if (template.answer_type === 'shape_selector' && typeof value === 'string') {
                    return this.shapeMap[value] || value;
                }
                
                if (template.answer_type === 'color_picker' && typeof value === 'string') {
                    return this.colorMap[value] || value;
                }
                
                if (template.answer_type === 'comparison' && typeof value === 'string') {
                    return variables[value + '_EMOJI'] || value;
                }
                
                if (typeof value === 'number') {
                    return parseFloat(value.toFixed(4));
                }
                
                return value;
            }
            
            const result = this.evaluateExpression(template.calculation, variables);
            
            if (template.answer_type === 'shape_selector' && typeof result === 'string') {
                return this.shapeMap[result] || result;
            }
            
            if (template.answer_type === 'color_picker' && typeof result === 'string') {
                return this.colorMap[result] || result;
            }
            
            if (template.answer_type === 'comparison' && typeof result === 'string') {
                return variables[result + '_EMOJI'] || result;
            }
            
            if (typeof result === 'number') {
                return parseFloat(result.toFixed(4));
            }
            
            return result;
        }
        return 0;
    }

    generateOptions(correctAnswer, template, variables) {
        console.log('Generating options for answer:', correctAnswer, 'type:', template.answer_type);
        
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
        
        if (template.options && Array.isArray(template.options)) {
            const options = [...template.options];
            if (!options.includes(correctAnswer)) {
                options.push(correctAnswer);
            }
            return this.shuffleArray(options);
        }
        
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
        
        for (let i = 1; i <= 5; i++) {
            options.push(emoji.repeat(i));
        }
        
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
                return '🔴';
            case 'AABB':
                return '🟡';
            case 'ABCABC':
                return '🔵';
            default:
                return '?';
        }
    }

    findCorrectIndex(options, correctAnswer, answerType) {
        console.log('Finding correct index for:', correctAnswer, 'in options:', options, 'type:', answerType);
        
        if (answerType === 'comparison') {
            const aSize = this.sizeComparison[options[0]] || 'medium';
            const bSize = this.sizeComparison[options[1]] || 'medium';
            const correctIndex = aSize === 'big' ? 0 : 1;
            console.log('Comparison correct index:', correctIndex);
            return correctIndex;
        }
        
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
            const displayValue = typeof value === 'number' ? parseFloat(value.toFixed(4)) : value;
            explanation = explanation.replace(`[${varName}]`, displayValue);
        }
        
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
            currentCategory: this.currentCategory
        };
    }

    resetScore() {
        this.score = 0;
        this.totalAttempts = 0;
    }

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
        // Get display name from JSON if available
        if (this.categoryData && this.categoryData.display_name) {
            return this.categoryData.display_name;
        }
        
        // Fallback formatting
        const words = name.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        );
        return words.join(' ');
    }
}

// ============================================
// UI INTEGRATION FUNCTIONS
// ============================================

window.voooEngine = new VOOOPuzzleEngine();

async function initVOOOGame() {
    console.log('Initializing VOOO game...');
    
    const loaded = await voooEngine.loadCategory('math_beginner');
    
    if (!loaded) {
        document.getElementById('vooo-question').textContent = 'Error loading puzzles.';
        return;
    }
    
    const puzzle = voooEngine.generateNewPuzzle();
    
    if (puzzle) {
        updatePuzzleDisplay(puzzle);
    } else {
        document.getElementById('vooo-question').textContent = 'Error generating puzzle. Check console.';
    }
}

function updatePuzzleDisplay(puzzle) {
    console.log('Updating puzzle display:', puzzle);
    
    document.getElementById('vooo-question').textContent = puzzle.question;
    
    const optionsContainer = document.getElementById('vooo-options');
    optionsContainer.innerHTML = '';
    
    puzzle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'vooo-option';
        
        if (typeof option === 'string' && option.length > 2 && !option.match(/^[0-9]+$/)) {
            button.textContent = option;
            button.style.fontSize = '1.5em';
        } else {
            button.textContent = option;
        }
        
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('vooo-feedback').textContent = '';
    document.getElementById('vooo-feedback').className = 'vooo-feedback';
    document.getElementById('vooo-feedback').style.background = '';
    document.getElementById('vooo-feedback').style.border = '';
    document.getElementById('vooo-feedback').style.color = '';
    document.getElementById('vooo-feedback').style.fontWeight = '';
    document.getElementById('vooo-explanation').textContent = '';
    
    updateStatsDisplay();
}

function selectAnswer(selectedIndex) {
    console.log('Selected answer:', selectedIndex);
    const result = voooEngine.checkAnswer(selectedIndex);
    const feedbackEl = document.getElementById('vooo-feedback');
    const explanationEl = document.getElementById('vooo-explanation');
    const optionsContainer = document.getElementById('vooo-options');
    const optionButtons = optionsContainer.querySelectorAll('.vooo-option');
    
    optionButtons.forEach(button => {
        button.style.backgroundColor = '';
        button.style.borderColor = '';
    });
    
    if (result.correct) {
        optionButtons[selectedIndex].style.backgroundColor = '#c6f6d5';
        optionButtons[selectedIndex].style.borderColor = '#9ae6b4';
        
        feedbackEl.textContent = 'Yes Correct Answer';
        feedbackEl.className = 'vooo-feedback correct';
        explanationEl.textContent = result.explanation;
        
        setTimeout(nextPuzzle, 3000);
    } else {
        optionButtons[selectedIndex].style.backgroundColor = '#fed7d7';
        optionButtons[selectedIndex].style.borderColor = '#fc8181';
        
        feedbackEl.textContent = 'Please try again';
        feedbackEl.className = 'vooo-feedback incorrect';
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
    }
}

function updateStatsDisplay() {
    const stats = voooEngine.getStats();
    document.getElementById('vooo-score').textContent = `Score: ${stats.score}`;
    document.getElementById('vooo-accuracy').textContent = `Accuracy: ${stats.accuracy}%`;
}

function resetGame() {
    console.log('Resetting game...');
    voooEngine.resetScore();
    nextPuzzle();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVOOOGame);
} else {
    initVOOOGame();
}
