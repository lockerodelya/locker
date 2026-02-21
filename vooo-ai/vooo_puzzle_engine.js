// ============================================
// VOOO AI Puzzle Engine - ENHANCED VERSION
// Supports all JSON features + NEW REASONING TYPES
// WITH VALIDATION & DUPLICATE PREVENTION
// ============================================

class VOOOPuzzleEngine {
    constructor() {
        this.currentPuzzle = null;
        this.currentTemplate = null;
        this.currentTemplateIndex = 0;
        this.score = 0;
        this.totalAttempts = 0;
        this.currentCategory = 'math_toddler';
        this.usedQuestions = [];
        
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
    // MATH HELPER FUNCTIONS
    // ============================================

    factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    }

    isPrime(n) {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i * i <= n; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }

    nextPrime(n) {
        let candidate = n + 1;
        while (!this.isPrime(candidate)) candidate++;
        return candidate;
    }

    // Sum of divisors (sigma function)
    sigma(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) sum += i;
        }
        return sum;
    }

    // Euler's totient function
    phi(n) {
        let result = n;
        let temp = n;
        for (let p = 2; p * p <= temp; p++) {
            if (temp % p === 0) {
                while (temp % p === 0) temp = Math.floor(temp / p);
                result -= Math.floor(result / p);
            }
        }
        if (temp > 1) result -= Math.floor(result / temp);
        return result;
    }

    // Partition number p(n)
    partition(n) {
        const p = new Array(n + 1).fill(0);
        p[0] = 1;
        for (let k = 1; k <= n; k++) {
            for (let i = k; i <= n; i++) {
                p[i] += p[i - k];
            }
        }
        return p[n];
    }

    // Prime factorization
    primeFactors(n) {
        const factors = [];
        let temp = n;
        for (let p = 2; p * p <= temp; p++) {
            if (temp % p === 0) {
                let count = 0;
                while (temp % p === 0) {
                    count++;
                    temp = Math.floor(temp / p);
                }
                factors.push({ prime: p, exp: count });
            }
        }
        if (temp > 1) factors.push({ prime: temp, exp: 1 });
        return factors;
    }

    // Sphenic: product of exactly 3 distinct primes
    isSphenic(n) {
        if (n < 2) return false;
        const factors = this.primeFactors(n);
        return factors.length === 3 && factors.every(f => f.exp === 1);
    }

    nextSphenic(n) {
        let candidate = n + 1;
        while (!this.isSphenic(candidate)) candidate++;
        return candidate;
    }

    // Semiprime: product of exactly 2 primes (not necessarily distinct)
    isSemiprime(n) {
        if (n < 4) return false;
        const factors = this.primeFactors(n);
        const totalFactors = factors.reduce((sum, f) => sum + f.exp, 0);
        return totalFactors === 2;
    }

    nextSemiprime(n) {
        let candidate = n + 1;
        while (!this.isSemiprime(candidate)) candidate++;
        return candidate;
    }

    // Abundant: sum of proper divisors > n
    isAbundant(n) {
        return this.sigma(n) - n > n;
    }

    nextAbundant(n) {
        let candidate = n + 1;
        while (!this.isAbundant(candidate)) candidate++;
        return candidate;
    }

    // Deficient: sum of proper divisors < n
    isDeficient(n) {
        return this.sigma(n) - n < n;
    }

    nextDeficient(n) {
        let candidate = n + 1;
        while (!this.isDeficient(candidate)) candidate++;
        return candidate;
    }

    // Perfect: sum of proper divisors = n
    isPerfect(n) {
        return this.sigma(n) - n === n;
    }

    nextPerfect(n) {
        let candidate = n + 1;
        while (!this.isPerfect(candidate)) candidate++;
        return candidate;
    }

    // Primorial: product of first k primes up to n
    primorial(n) {
        let result = 1;
        let count = 0;
        let candidate = 2;
        while (count < n) {
            if (this.isPrime(candidate)) {
                result *= candidate;
                count++;
            }
            candidate++;
        }
        return result;
    }

    // Highly composite: more divisors than any smaller number
    countDivisors(n) {
        let count = 0;
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) count++;
        }
        return count;
    }

    isHighlyComposite(n) {
        const divN = this.countDivisors(n);
        for (let i = 1; i < n; i++) {
            if (this.countDivisors(i) >= divN) return false;
        }
        return true;
    }

    nextHighlyComposite(n) {
        let candidate = n + 1;
        while (!this.isHighlyComposite(candidate)) candidate++;
        return candidate;
    }

    // Sophie Germain prime: p and 2p+1 are both prime
    isSophieGermain(n) {
        return this.isPrime(n) && this.isPrime(2 * n + 1);
    }

    nextSophieGermain(n) {
        let candidate = n + 1;
        while (!this.isSophieGermain(candidate)) candidate++;
        return candidate;
    }

    // Safe prime: p where (p-1)/2 is also prime
    isSafePrime(n) {
        return this.isPrime(n) && n > 2 && this.isPrime((n - 1) / 2);
    }

    nextSafePrime(n) {
        let candidate = n + 1;
        while (!this.isSafePrime(candidate)) candidate++;
        return candidate;
    }

    // Next factorial prime (n! + 1 or n! - 1 is prime)
    nextFactorialPrime(n) {
        let k = n + 1;
        while (true) {
            const f = this.factorial(k);
            if (this.isPrime(f + 1)) return f + 1;
            if (this.isPrime(f - 1)) return f - 1;
            k++;
            if (k > 15) break; // safety limit
        }
        return this.factorial(n + 1) + 1;
    }

    // Superior highly composite (simplified)
    nextSuperiorHighlyComposite(n) {
        const known = [2, 6, 12, 60, 120, 360, 2520, 5040, 55440, 720720];
        for (const v of known) {
            if (v > n) return v;
        }
        return n * 2;
    }

    // Next Giuga number (known list)
    nextGiuga(n) {
        const known = [30, 858, 1722, 66198, 2214408306];
        for (const v of known) {
            if (v > n) return v;
        }
        return 'unknown';
    }

    // ============================================
    // VALIDATION & DUPLICATE PREVENTION
    // ============================================

    initLocalStorage() {
        const storageKey = `vooo_used_questions_${this.currentCategory}`;
        const stored = localStorage.getItem(storageKey);
        this.usedQuestions = stored ? JSON.parse(stored) : [];
        console.log(`📦 Loaded ${this.usedQuestions.length} used questions for ${this.currentCategory}`);
    }

    saveUsedQuestion(questionHash) {
        const storageKey = `vooo_used_questions_${this.currentCategory}`;
        this.usedQuestions.push(questionHash);
        localStorage.setItem(storageKey, JSON.stringify(this.usedQuestions));
    }

    createQuestionHash(template, variables) {
        const key = template.template_id + '_' + JSON.stringify(variables);
        return btoa(key).substring(0, 20);
    }

    isQuestionUsed(hash) {
        return this.usedQuestions.includes(hash);
    }

    validateOptions(options, correctAnswer) {
        // Must have exactly 4 options
        if (options.length !== 4) {
            console.warn('❌ Invalid: Not 4 options, got', options.length);
            return false;
        }
        
        // All options must be unique
        const unique = new Set(options.map(opt => String(opt)));
        if (unique.size !== 4) {
            console.warn('❌ Invalid: Duplicate options', options);
            return false;
        }
        
        // Correct answer must be in options
        const answerStr = String(correctAnswer);
        const optionsStr = options.map(opt => String(opt));
        if (!optionsStr.includes(answerStr)) {
            console.warn('❌ Invalid: Answer not in options', correctAnswer, options);
            return false;
        }
        
        return true;
    }

    clearUsedQuestions() {
        const storageKey = `vooo_used_questions_${this.currentCategory}`;
        this.usedQuestions = [];
        localStorage.removeItem(storageKey);
        console.log('🗑️ Cleared used questions for', this.currentCategory);
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
            this.initLocalStorage();
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
        let attempts = 0;
        const maxAttempts = 50;
        
        while (attempts < maxAttempts) {
            attempts++;
            
            // Pick random template
            const templateIndex = Math.floor(Math.random() * templates.length);
            this.currentTemplate = templates[templateIndex];
            
            const variables = this.generateVariables(this.currentTemplate.variables);
            const questionHash = this.createQuestionHash(this.currentTemplate, variables);
            
            // Skip if already used
            if (this.isQuestionUsed(questionHash)) {
                console.log(`⏭️ Skipping duplicate (attempt ${attempts})`);
                continue;
            }
            
            const question = this.generateQuestion(this.currentTemplate, variables);
            const answer = this.calculateAnswer(this.currentTemplate, variables);
            const options = this.generateOptions(answer, this.currentTemplate, variables);
            
            // Validate: Must have exactly 4 unique options with answer included
            if (!this.validateOptions(options, answer)) {
                console.log(`❌ Invalid options (attempt ${attempts})`);
                continue;
            }
            
            // Valid question found!
            this.saveUsedQuestion(questionHash);
            
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

            console.log(`✅ Valid question generated (attempt ${attempts}):`, this.currentPuzzle);
            return this.currentPuzzle;
        }
        
        // If all attempts failed, clear history and try once more
        console.warn('⚠️ Max attempts reached. Clearing duplicate history...');
        this.clearUsedQuestions();
        
        // One final attempt
        const templateIndex = Math.floor(Math.random() * templates.length);
        this.currentTemplate = templates[templateIndex];
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
        
        console.log('⚠️ Generated fallback question:', this.currentPuzzle);
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

        // ============================================
        // MATH SPECIAL FUNCTIONS - resolve before eval
        // ============================================

        // factorial(n)
        evaluated = evaluated.replace(/factorial\((\d+)\)/g, (match, n) => {
            return this.factorial(parseInt(n));
        });

        // next_prime(n)
        evaluated = evaluated.replace(/next_prime\((\d+)\)/g, (match, n) => {
            return this.nextPrime(parseInt(n));
        });

        // sigma(n)
        evaluated = evaluated.replace(/sigma\((\d+)\)/g, (match, n) => {
            return this.sigma(parseInt(n));
        });

        // phi(n)
        evaluated = evaluated.replace(/phi\((\d+)\)/g, (match, n) => {
            return this.phi(parseInt(n));
        });

        // partition(n)
        evaluated = evaluated.replace(/partition\((\d+)\)/g, (match, n) => {
            return this.partition(parseInt(n));
        });

        // next_sphenic(n)
        evaluated = evaluated.replace(/next_sphenic\((\d+)\)/g, (match, n) => {
            return this.nextSphenic(parseInt(n));
        });

        // next_semiprime(n)
        evaluated = evaluated.replace(/next_semiprime\((\d+)\)/g, (match, n) => {
            return this.nextSemiprime(parseInt(n));
        });

        // next_abundant(n)
        evaluated = evaluated.replace(/next_abundant\((\d+)\)/g, (match, n) => {
            return this.nextAbundant(parseInt(n));
        });

        // next_deficient(n)
        evaluated = evaluated.replace(/next_deficient\((\d+)\)/g, (match, n) => {
            return this.nextDeficient(parseInt(n));
        });

        // next_perfect(n)
        evaluated = evaluated.replace(/next_perfect\((\d+)\)/g, (match, n) => {
            return this.nextPerfect(parseInt(n));
        });

        // primorial(n)
        evaluated = evaluated.replace(/primorial\((\d+)\)/g, (match, n) => {
            return this.primorial(parseInt(n));
        });

        // next_highly_composite(n)
        evaluated = evaluated.replace(/next_highly_composite\((\d+)\)/g, (match, n) => {
            return this.nextHighlyComposite(parseInt(n));
        });

        // next_superior_highly_composite(n)
        evaluated = evaluated.replace(/next_superior_highly_composite\((\d+)\)/g, (match, n) => {
            return this.nextSuperiorHighlyComposite(parseInt(n));
        });

        // next_sophie_germain(n)
        evaluated = evaluated.replace(/next_sophie_germain\((\d+)\)/g, (match, n) => {
            return this.nextSophieGermain(parseInt(n));
        });

        // next_safe_prime(n)
        evaluated = evaluated.replace(/next_safe_prime\((\d+)\)/g, (match, n) => {
            return this.nextSafePrime(parseInt(n));
        });

        // next_factorial_prime(n)
        evaluated = evaluated.replace(/next_factorial_prime\((\d+)\)/g, (match, n) => {
            return this.nextFactorialPrime(parseInt(n));
        });

        // next_giuga(n)
        evaluated = evaluated.replace(/next_giuga\((\d+)\)/g, (match, n) => {
            return this.nextGiuga(parseInt(n));
        });

        // ============================================
        
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
        question = question.replace(new RegExp(`\\[${varName}\\]`, 'g'), value);
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
            options.push(parseFloat(correctAnswer.toFixed ? correctAnswer.toFixed(4) : correctAnswer).toString());
            
            for (let i = 0; i < 3; i++) {
                let wrongAnswer;
                const offset = (i + 1) * (Math.random() > 0.5 ? 1 : -1);
                
                if (Math.abs(correctNum) > 10) {
                    wrongAnswer = correctNum + offset * Math.floor(Math.max(1, correctNum * 0.1));
                } else if (correctNum !== 0) {
                    wrongAnswer = correctNum + offset;
                } else {
                    wrongAnswer = i + 1;
                }
                
                if (wrongAnswer === correctNum || wrongAnswer <= 0) {
                    wrongAnswer = correctNum + (i + 2);
                }

                // Avoid duplicates in wrong answers
                let wrongStr = parseFloat(wrongAnswer.toFixed(4)).toString();
                let dupeCheck = 0;
                while (options.includes(wrongStr) && dupeCheck < 10) {
                    wrongAnswer = wrongAnswer + 1;
                    wrongStr = parseFloat(wrongAnswer.toFixed(4)).toString();
                    dupeCheck++;
                }
                
                options.push(wrongStr);
            }
        } else {
            // ============================================
            // FIX: Generate numeric wrong answers based on
            // a numeric estimate when answer is non-numeric
            // This handles cases like next_sphenic, next_prime etc.
            // that were already resolved to numbers above but
            // in case a string slips through, handle gracefully.
            // ============================================
            const numericGuess = parseInt(correctAnswer);
            if (!isNaN(numericGuess)) {
                options.push(String(numericGuess));
                const offsets = [numericGuess + 2, numericGuess + 4, numericGuess - 2].filter(v => v > 0);
                for (let i = 0; i < 3; i++) {
                    let wrongStr = String(offsets[i] || numericGuess + (i + 5));
                    let dupeCheck = 0;
                    while (options.includes(wrongStr) && dupeCheck < 10) {
                        wrongStr = String(parseInt(wrongStr) + 1);
                        dupeCheck++;
                    }
                    options.push(wrongStr);
                }
            } else {
                // Last resort fallback - should rarely happen now
                options.push(String(correctAnswer));
                const fallbacks = ['?', '??', '???'];
                for (let i = 0; i < 3; i++) {
                    options.push(fallbacks[i]);
                }
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
        explanation = explanation.replace(new RegExp(`\\[${varName}\\]`, 'g'), displayValue);
    }
    
    const displayAnswer = typeof answer === 'number' ? parseFloat(answer.toFixed(4)) : answer;
    explanation = explanation.replace(new RegExp(`\\[RESULT\\]`, 'g'), displayAnswer);
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
        if (this.categoryData && this.categoryData.display_name) {
            return this.categoryData.display_name;
        }
        
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
