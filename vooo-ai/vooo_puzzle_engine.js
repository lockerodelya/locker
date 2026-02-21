// ============================================
// VOOO AI Puzzle Engine - ENHANCED VERSION
// Supports all JSON features + NEW REASONING TYPES
// WITH VALIDATION & DUPLICATE PREVENTION
// FIXES: solv1 + solv2 + solv3 + solv4 + solv6 + solv7 + solv8 + solv9
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
    // MATH HELPER FUNCTIONS (solv1)
    // ============================================

    factorial(n) {
        n = Math.round(n);
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

    sigma(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) sum += i;
        }
        return sum;
    }

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

    isAbundant(n) {
        return this.sigma(n) - n > n;
    }

    nextAbundant(n) {
        let candidate = n + 1;
        while (!this.isAbundant(candidate)) candidate++;
        return candidate;
    }

    isDeficient(n) {
        return this.sigma(n) - n < n;
    }

    nextDeficient(n) {
        let candidate = n + 1;
        while (!this.isDeficient(candidate)) candidate++;
        return candidate;
    }

    isPerfect(n) {
        return this.sigma(n) - n === n;
    }

    nextPerfect(n) {
        let candidate = n + 1;
        while (!this.isPerfect(candidate)) candidate++;
        return candidate;
    }

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

    isSophieGermain(n) {
        return this.isPrime(n) && this.isPrime(2 * n + 1);
    }

    nextSophieGermain(n) {
        let candidate = n + 1;
        while (!this.isSophieGermain(candidate)) candidate++;
        return candidate;
    }

    isSafePrime(n) {
        return this.isPrime(n) && n > 2 && this.isPrime((n - 1) / 2);
    }

    nextSafePrime(n) {
        let candidate = n + 1;
        while (!this.isSafePrime(candidate)) candidate++;
        return candidate;
    }

    nextFactorialPrime(n) {
        let k = n + 1;
        while (true) {
            const f = this.factorial(k);
            if (this.isPrime(f + 1)) return f + 1;
            if (this.isPrime(f - 1)) return f - 1;
            k++;
            if (k > 15) break;
        }
        return this.factorial(n + 1) + 1;
    }

    nextSuperiorHighlyComposite(n) {
        const known = [2, 6, 12, 60, 120, 360, 2520, 5040, 55440, 720720];
        for (const v of known) {
            if (v > n) return v;
        }
        return n * 2;
    }

    nextGiuga(n) {
        const known = [30, 858, 1722, 66198, 2214408306];
        for (const v of known) {
            if (v > n) return v;
        }
        return 858;
    }

    // ============================================
    // solv9 - COMPUTE DERIVED VARIABLES
    // Fills in missing B, C etc. from pattern context
    // ============================================

    computeDerivedVariables(template, variables) {
        const derived = { ...variables };
        const pattern = template.pattern || '';
        const explanation = template.explanation || '';

        // Find all [TOKEN] placeholders in pattern
        const tokens = [];
        const tokenRegex = /\[([A-Z][A-Z0-9_]*)\]/g;
        let match;
        while ((match = tokenRegex.exec(pattern)) !== null) {
            const token = match[1];
            if (!derived.hasOwnProperty(token)) {
                tokens.push(token);
            }
        }

        if (tokens.length === 0) return derived;

        // Try to derive missing variables from explanation hints
        // e.g. explanation: "[A], [A+1], [A+2]" → B = A+1, C = A+2
        const explTokens = [];
        const explRegex = /\[([^\]]+)\]/g;
        while ((match = explRegex.exec(explanation)) !== null) {
            explTokens.push(match[1]);
        }

        // Map pattern tokens to explanation expressions by position
        // Find pattern tokens in order
        const patternTokensOrdered = [];
        const patternTokenRegex = /\[([A-Z][A-Z0-9_]*)\]/g;
        while ((match = patternTokenRegex.exec(pattern)) !== null) {
            patternTokensOrdered.push(match[1]);
        }

        // Find explanation expressions in order
        const explExpressionsOrdered = [];
        const explExprRegex = /\[([^\]]+)\]/g;
        while ((match = explExprRegex.exec(explanation)) !== null) {
            explExpressionsOrdered.push(match[1]);
        }

        // Match unknown pattern tokens to explanation expressions
        for (let i = 0; i < patternTokensOrdered.length; i++) {
            const token = patternTokensOrdered[i];
            if (!derived.hasOwnProperty(token) && explExpressionsOrdered[i]) {
                const expr = explExpressionsOrdered[i];
                const val = this.evaluateBracketExpression(expr, derived);
                if (val !== null) {
                    derived[token] = val;
                    console.log(`🔗 solv9: Derived ${token} = ${val} from expression [${expr}]`);
                }
            }
        }

        // Fallback: if still missing, try common sequential patterns
        // B = A + STEP, C = A + STEP*2, D = A + STEP*3
        if (derived.hasOwnProperty('A') && derived.hasOwnProperty('STEP')) {
            if (!derived.hasOwnProperty('B')) derived['B'] = derived['A'] + derived['STEP'];
            if (!derived.hasOwnProperty('C')) derived['C'] = derived['A'] + derived['STEP'] * 2;
            if (!derived.hasOwnProperty('D')) derived['D'] = derived['A'] + derived['STEP'] * 3;
        } else if (derived.hasOwnProperty('A')) {
            // Default sequential +1 pattern
            if (!derived.hasOwnProperty('B')) derived['B'] = derived['A'] + 1;
            if (!derived.hasOwnProperty('C')) derived['C'] = derived['A'] + 2;
            if (!derived.hasOwnProperty('D')) derived['D'] = derived['A'] + 3;
        }

        return derived;
    }

    // ============================================
    // solv2 + solv6 - EXPRESSION RESOLVER
    // ============================================

    evaluateBracketExpression(expr, variables) {
        let e = expr;

        // solv6: Replace × with *
        e = e.replace(/×/g, '*');
        // solv6: Replace ÷ with /
        e = e.replace(/÷/g, '/');

        // solv6: Handle implicit coefficient×variable like 2M2 → 2*M2
        e = e.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g, '$1*$2');

        // solv8: Replace string variables with quoted values FIRST
        for (const [varName, value] of Object.entries(variables)) {
            if (typeof value === 'string' && isNaN(value)) {
                const regex = new RegExp('\\b' + varName + '\\b', 'g');
                e = e.replace(regex, '"' + value + '"');
            }
        }

        // Replace numeric variables
        for (const [varName, value] of Object.entries(variables)) {
            if (typeof value !== 'string' || !isNaN(value)) {
                const regex = new RegExp('\\b' + varName + '\\b', 'g');
                e = e.replace(regex, '(' + value + ')');
            }
        }

        try {
            const result = new Function('return ' + e)();
            return (typeof result === 'number') ? result : 
                   (typeof result === 'string') ? result : null;
        } catch (err) {
            return null;
        }
    }

    resolvePatternText(text, variables) {
        let resolved = text;

        // solv6: Fix implicit number×bracket like 2[M1] → 2*[M1]
        resolved = resolved.replace(/(\d)\[/g, '$1*[');

        // Step 1: Replace simple [VAR] tokens first
        for (const [varName, value] of Object.entries(variables)) {
            resolved = resolved.replace(new RegExp(`\\[${varName}\\]`, 'g'), value);
        }

        // Step 2: Evaluate remaining [expression] blocks
        resolved = resolved.replace(/\[([^\]]+)\]/g, (match, inner) => {
            const result = this.evaluateBracketExpression(inner, variables);
            if (result !== null) return result;
            return match;
        });

        // Step 3: Replace any remaining bare variable names
        for (const [varName, value] of Object.entries(variables)) {
            const regex = new RegExp('\\b' + varName + '\\b', 'g');
            resolved = resolved.replace(regex, value);
        }

        return resolved;
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
        return btoa(unescape(encodeURIComponent(key))).substring(0, 20);
    }

    isQuestionUsed(hash) {
        return this.usedQuestions.includes(hash);
    }

    validateOptions(options, correctAnswer) {
        if (options.length !== 4) {
            console.warn('❌ Invalid: Not 4 options, got', options.length);
            return false;
        }
        const unique = new Set(options.map(opt => String(opt)));
        if (unique.size !== 4) {
            console.warn('❌ Invalid: Duplicate options', options);
            return false;
        }
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
    // CORE ENGINE FUNCTIONS
    // ============================================

    async loadCategory(categoryName) {
        this.currentCategory = categoryName;
        const fileName = this.categories[categoryName];
        try {
            const response = await fetch(`/vooo-ai/vooo-json/${fileName}`);
            this.categoryData = await response.json();
            // solv3: reset sequential index on category load
            this.currentTemplateIndex = 0;
            this.initLocalStorage();
            return true;
        } catch (error) {
            console.error('Error loading puzzle category:', error);
            return false;
        }
    }

    // solv7: Check if template is computable
    isTemplateComputable(template) {
        if (!template.calculation) return false;
        if (template.calculation.trim() === 'null') return false;
        if (template.calculation.trim() === '') return false;
        return true;
    }

    generateNewPuzzle() {
        if (!this.categoryData || !this.categoryData.templates) {
            console.error('No category data or templates found');
            return null;
        }

        const templates = this.categoryData.templates;
        let attempts = 0;
        const maxAttempts = templates.length * 3;

        // solv3: Go through templates sequentially 1 to last, then repeat
        while (attempts < maxAttempts) {
            attempts++;

            const templateIndex = this.currentTemplateIndex % templates.length;
            this.currentTemplate = templates[templateIndex];

            this.currentTemplateIndex++;
            if (this.currentTemplateIndex >= templates.length) {
                this.currentTemplateIndex = 0;
            }

            // solv7: Skip uncomputable templates
            if (!this.isTemplateComputable(this.currentTemplate)) {
                console.log(`⏭️ Skipping uncomputable template: ${this.currentTemplate.template_id}`);
                continue;
            }

            const rawVariables = this.generateVariables(this.currentTemplate.variables);

            // solv9: Compute derived/missing variables
            const variables = this.computeDerivedVariables(this.currentTemplate, rawVariables);

            const questionHash = this.createQuestionHash(this.currentTemplate, variables);

            if (this.isQuestionUsed(questionHash)) {
                console.log(`⏭️ Skipping duplicate (attempt ${attempts})`);
                continue;
            }

            const question = this.generateQuestion(this.currentTemplate, variables);
            const answer = this.calculateAnswer(this.currentTemplate, variables);

            // solv7: Skip null answers
            if (answer === null || answer === undefined || answer === 'null') {
                console.log(`⏭️ Skipping null answer: ${this.currentTemplate.template_id}`);
                continue;
            }

            const options = this.generateOptions(answer, this.currentTemplate, variables);

            if (!this.validateOptions(options, answer)) {
                console.log(`❌ Invalid options (attempt ${attempts})`);
                continue;
            }

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

        // All attempts failed — clear history and restart
        console.warn('⚠️ Max attempts reached. Clearing duplicate history...');
        this.clearUsedQuestions();
        this.currentTemplateIndex = 0;

        let fallbackTemplate = templates[0];
        for (const t of templates) {
            if (this.isTemplateComputable(t)) {
                fallbackTemplate = t;
                break;
            }
        }

        this.currentTemplate = fallbackTemplate;
        const rawVariables = this.generateVariables(this.currentTemplate.variables);
        const variables = this.computeDerivedVariables(this.currentTemplate, rawVariables);
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
        if (!variableDefs) return variables;
        
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
            } else if (def.primes !== undefined) {
                const primes = def.primes;
                variables[varName] = primes[Math.floor(Math.random() * (primes.length - 1))];
            } else if (def.bell_numbers !== undefined) {
                const arr = def.bell_numbers;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.perrin !== undefined) {
                const arr = def.perrin;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.cake !== undefined) {
                const arr = def.cake;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.motzkin !== undefined) {
                const arr = def.motzkin;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.schroder !== undefined) {
                const arr = def.schroder;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.narayana !== undefined) {
                const arr = def.narayana;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.partitions !== undefined) {
                const arr = def.partitions;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.mersenne !== undefined) {
                const arr = def.mersenne;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.fermat !== undefined) {
                const arr = def.fermat;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.carmichael !== undefined) {
                const arr = def.carmichael;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.carol !== undefined) {
                const arr = def.carol;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.kynea !== undefined) {
                const arr = def.kynea;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.thabit !== undefined) {
                const arr = def.thabit;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.sophie !== undefined) {
                const arr = def.sophie;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.safe !== undefined) {
                const arr = def.safe;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.primorial !== undefined) {
                const arr = def.primorial;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.giuga !== undefined) {
                const arr = def.giuga;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.cullen !== undefined) {
                const arr = def.cullen;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.woodall !== undefined) {
                const arr = def.woodall;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.highly_composite !== undefined) {
                const arr = def.highly_composite;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.superior_hc !== undefined) {
                const arr = def.superior_hc;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.abundant !== undefined) {
                const arr = def.abundant;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.deficient !== undefined) {
                const arr = def.deficient;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.perfect !== undefined) {
                const arr = def.perfect;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.semiprime !== undefined) {
                const arr = def.semiprime;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.sphenic !== undefined) {
                const arr = def.sphenic;
                variables[varName] = arr[Math.floor(Math.random() * (arr.length - 1))];
            } else if (def.totients !== undefined) {
                const arr = def.totients;
                variables[varName] = Math.floor(Math.random() * arr.length);
            } else {
                const min = def.min !== undefined ? def.min : 1;
                const max = def.max !== undefined ? def.max : 10;
                const step = def.step || 1;
                const steps = Math.floor((max - min) / step) + 1;
                const randomStep = Math.floor(Math.random() * steps);
                variables[varName] = min + (randomStep * step);

                // solv4: respect primes_only flag
                if (def.primes_only) {
                    let v = variables[varName];
                    let up = v, down = v;
                    while (!this.isPrime(up) && up <= max) up++;
                    while (!this.isPrime(down) && down >= min) down--;
                    if (this.isPrime(up) && up <= max) v = up;
                    else if (this.isPrime(down) && down >= min) v = down;
                    variables[varName] = v;
                }

                // solv4: respect perfect_only flag
                if (def.perfect_only) {
                    let v = variables[varName];
                    let up = v;
                    while (!this.isPerfect(up) && up <= max * 100) up++;
                    variables[varName] = up;
                }
            }
        }
        
        return variables;
    }

    evaluateExpression(expr, variables) {
        console.log('Evaluating expression:', expr, 'with variables:', variables);
        
        let evaluated = expr;

        // solv1: Handle if-then-else pseudo syntax FIRST
        evaluated = evaluated.replace(/if\s+(.+?)\s+then\s+(.+?)\s+else\s+(.+)/g, (match, condition, thenVal, elseVal) => {
            try {
                let cond = condition;
                for (const [varName, value] of Object.entries(variables)) {
                    if (typeof value === 'string' && isNaN(value)) {
                        cond = cond.replace(new RegExp('\\b' + varName + '\\b', 'g'), '"' + value + '"');
                    } else {
                        cond = cond.replace(new RegExp('\\b' + varName + '\\b', 'g'), JSON.stringify(value));
                    }
                }
                const result = new Function('return ' + cond)();
                return result ? thenVal.trim() : elseVal.trim().replace(/'/g, '');
            } catch(e) { return match; }
        });

        // solv6: Replace × with * and ÷ with /
        evaluated = evaluated.replace(/×/g, '*');
        evaluated = evaluated.replace(/÷/g, '/');

        // solv6: Fix implicit coefficient×variable like 2*F1
        evaluated = evaluated.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g, '$1*$2');

        // solv8: Replace STRING variables with quoted values BEFORE numeric ones
        for (const [varName, value] of Object.entries(variables)) {
            if (typeof value === 'string' && isNaN(value)) {
                const regex = new RegExp('\\b' + varName + '\\b', 'g');
                evaluated = evaluated.replace(regex, '"' + value + '"');
            }
        }

        // Replace numeric variables
        for (const [varName, value] of Object.entries(variables)) {
            if (typeof value !== 'string' || !isNaN(value)) {
                const regex = new RegExp('\\b' + varName + '\\b', 'g');
                evaluated = evaluated.replace(regex, '(' + value + ')');
            }
        }

        console.log('After variable substitution:', evaluated);

        // ============================================
        // solv1: MATH SPECIAL FUNCTIONS
        // ============================================

        evaluated = evaluated.replace(/factorial\(([^)]+)\)/g, (match, inner) => {
            try { return this.factorial(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_prime\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextPrime(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/sigma\(([^)]+)\)/g, (match, inner) => {
            try { return this.sigma(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/phi\(([^)]+)\)/g, (match, inner) => {
            try { return this.phi(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/partition\(([^)]+)\)/g, (match, inner) => {
            try { return this.partition(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_sphenic\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSphenic(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_semiprime\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSemiprime(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_abundant\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextAbundant(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_deficient\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextDeficient(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_perfect\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextPerfect(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/primorial\(([^)]+)\)/g, (match, inner) => {
            try { return this.primorial(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_highly_composite\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextHighlyComposite(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_superior_highly_composite\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSuperiorHighlyComposite(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_sophie_germain\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSophieGermain(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_safe_prime\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSafePrime(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_factorial_prime\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextFactorialPrime(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
        });

        evaluated = evaluated.replace(/next_giuga\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextGiuga(Math.round(new Function('return ' + inner)())); }
            catch(e) { return match; }
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
            if (evaluated === 'null') return null;
            
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
        
        let question = this.resolvePatternText(template.pattern, variables);
        return question;
    }

    calculateAnswer(template, variables) {
        if (template.calculation) {
            const calc = template.calculation.trim();

            // solv7: Return null for uncomputable
            if (calc === 'null' || calc === '') return null;
            
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
            
            if (result === null || result === undefined) return null;

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
            return this.shuffleArray([...Object.values(this.shapeMap)]);
        }
        if (template.answer_type === 'color_picker') {
            return this.shuffleArray([...Object.values(this.colorMap)]);
        }
        if (template.answer_type === 'comparison') {
            return this.shuffleArray([variables.A_EMOJI, variables.B_EMOJI]);
        }
        
        const options = [];
        const correctNum = Number(correctAnswer);
        
        if (!isNaN(correctNum)) {
            options.push(String(parseFloat(correctNum.toFixed(4))));
            
            for (let i = 0; i < 3; i++) {
                let wrongAnswer;
                const direction = (Math.random() > 0.5 ? 1 : -1);
                const offset = (i + 1) * direction;
                
                if (Math.abs(correctNum) > 100) {
                    wrongAnswer = correctNum + offset * Math.floor(Math.max(1, Math.abs(correctNum) * 0.05));
                } else if (Math.abs(correctNum) > 10) {
                    wrongAnswer = correctNum + offset * Math.floor(Math.max(1, Math.abs(correctNum) * 0.1));
                } else if (correctNum !== 0) {
                    wrongAnswer = correctNum + offset;
                } else {
                    wrongAnswer = i + 1;
                }
                
                if (wrongAnswer === correctNum) {
                    wrongAnswer = correctNum + (i + 2);
                }

                let wrongStr = String(parseFloat(wrongAnswer.toFixed(4)));
                let dupeCheck = 0;
                while (options.includes(wrongStr) && dupeCheck < 20) {
                    wrongAnswer = wrongAnswer + 1;
                    wrongStr = String(parseFloat(wrongAnswer.toFixed(4)));
                    dupeCheck++;
                }
                options.push(wrongStr);
            }
        } else {
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
                options.push(String(correctAnswer));
                const fallbacks = ['?', '??', '???'];
                for (let i = 0; i < 3; i++) options.push(fallbacks[i]);
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
            case 'ABAB': return '🔴';
            case 'AABB': return '🟡';
            case 'ABCABC': return '🔵';
            default: return '?';
        }
    }

    findCorrectIndex(options, correctAnswer, answerType) {
        console.log('Finding correct index for:', correctAnswer, 'in options:', options, 'type:', answerType);
        
        if (answerType === 'comparison') {
            const aSize = this.sizeComparison[options[0]] || 'medium';
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
        
        let explanation = this.resolvePatternText(template.explanation, variables);
        
        const displayAnswer = typeof answer === 'number' ? parseFloat(answer.toFixed(4)) : answer;
        explanation = explanation.replace(/\[RESULT\]/g, displayAnswer);
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
        if (typeof option === 'string' && option.length > 2 && !option.match(/^-?[0-9]+(\.[0-9]+)?$/)) {
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
