// ============================================
// VOOO AI Puzzle Engine - ENHANCED VERSION
// Supports all JSON features + NEW REASONING TYPES
// WITH VALIDATION & DUPLICATE PREVENTION
// FIXES: solv1+solv2+solv3+solv4+solv6+solv7+solv8+solv9+sol10
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
        
        this.categories = {
            'math_toddler': 'math_toddler.json',
            'math_beginner': 'math_beginner.json',
            'math_elementary': 'math_elementary.json',
            'math_intermediate': 'math_intermediate.json',
            'math_advanced': 'math_advanced.json',
            'math_scholar': 'math_scholar.json',
            'reasoning_beginner': 'reasoning_beginner.json',
            'reasoning_analogical_beginner': 'reasoning_analogical_beginner.json',
            'reasoning_if-then_beginner': 'reasoning_if-then_beginner.json',
            'reasoning_syllogistic_beginner': 'reasoning_syllogistic_beginner.json',
            'reasoning_intermediate': 'reasoning_intermediate.json',
            'reasoning_advanced': 'reasoning_advanced.json',
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
            'pattern_beginner': 'pattern_beginner.json',
            'pattern_intermediate': 'pattern_intermediate.json',
            'pattern_advanced': 'pattern_advanced.json',
            'mathops_beginner': 'mathops_beginner.json',
            'problem_comparison_beginner': 'problem_comparison_beginner.json',
            'problem_time_beginner': 'problem_time_beginner.json',
            'problem_probability_beginner': 'problem_probability_beginner.json',
            'problem_classification_beginner': 'problem_classification_beginner.json',
            'problem_solving_beginner': 'problem_solving_beginner.json',
            'problem_causeeffect_beginner': 'problem_causeeffect_beginner.json'
        };
        
        this.shapeMap = {
            'circle': '○', 'square': '□', 'triangle': '△',
            'star': '★', 'heart': '♥', 'diamond': '◇',
            'rectangle': '▢', 'hexagon': '⬡'
        };
        
        this.colorMap = {
            'red': '🔴', 'blue': '🔵', 'yellow': '🟡',
            'green': '🟢', 'black': '⚫', 'white': '⚪'
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
                while (temp % p === 0) { count++; temp = Math.floor(temp / p); }
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
        return factors.reduce((sum, f) => sum + f.exp, 0) === 2;
    }

    nextSemiprime(n) {
        let candidate = n + 1;
        while (!this.isSemiprime(candidate)) candidate++;
        return candidate;
    }

    isAbundant(n) { return this.sigma(n) - n > n; }
    nextAbundant(n) {
        let candidate = n + 1;
        while (!this.isAbundant(candidate)) candidate++;
        return candidate;
    }

    isDeficient(n) { return this.sigma(n) - n < n; }
    nextDeficient(n) {
        let candidate = n + 1;
        while (!this.isDeficient(candidate)) candidate++;
        return candidate;
    }

    isPerfect(n) { return this.sigma(n) - n === n; }
    nextPerfect(n) {
        let candidate = n + 1;
        while (!this.isPerfect(candidate)) candidate++;
        return candidate;
    }

    primorial(n) {
        let result = 1, count = 0, candidate = 2;
        while (count < n) {
            if (this.isPrime(candidate)) { result *= candidate; count++; }
            candidate++;
        }
        return result;
    }

    countDivisors(n) {
        let count = 0;
        for (let i = 1; i <= n; i++) { if (n % i === 0) count++; }
        return count;
    }

    isHighlyComposite(n) {
        const divN = this.countDivisors(n);
        for (let i = 1; i < n; i++) { if (this.countDivisors(i) >= divN) return false; }
        return true;
    }

    nextHighlyComposite(n) {
        let candidate = n + 1;
        while (!this.isHighlyComposite(candidate)) candidate++;
        return candidate;
    }

    isSophieGermain(n) { return this.isPrime(n) && this.isPrime(2 * n + 1); }
    nextSophieGermain(n) {
        let candidate = n + 1;
        while (!this.isSophieGermain(candidate)) candidate++;
        return candidate;
    }

    isSafePrime(n) { return this.isPrime(n) && n > 2 && this.isPrime((n - 1) / 2); }
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
        for (const v of known) { if (v > n) return v; }
        return n * 2;
    }

    nextGiuga(n) {
        const known = [30, 858, 1722, 66198, 2214408306];
        for (const v of known) { if (v > n) return v; }
        return 858;
    }

    // ============================================
    // solv9 - COMPUTE DERIVED VARIABLES
    // ============================================

    computeDerivedVariables(template, variables) {
        const derived = { ...variables };
        const pattern = template.pattern || '';
        const explanation = template.explanation || '';

        const tokenRegex = /\[([A-Z][A-Z0-9_]*)\]/g;
        let match;
        const missingTokens = [];
        while ((match = tokenRegex.exec(pattern)) !== null) {
            const token = match[1];
            if (!derived.hasOwnProperty(token)) missingTokens.push(token);
        }

        if (missingTokens.length === 0) return derived;

        const patternTokensOrdered = [];
        const ptr = /\[([A-Z][A-Z0-9_]*)\]/g;
        while ((match = ptr.exec(pattern)) !== null) patternTokensOrdered.push(match[1]);

        const explExpressionsOrdered = [];
        const etr = /\[([^\]]+)\]/g;
        while ((match = etr.exec(explanation)) !== null) explExpressionsOrdered.push(match[1]);

        for (let i = 0; i < patternTokensOrdered.length; i++) {
            const token = patternTokensOrdered[i];
            if (!derived.hasOwnProperty(token) && explExpressionsOrdered[i]) {
                const expr = explExpressionsOrdered[i];
                const val = this.evaluateBracketExpression(expr, derived);
                if (val !== null) {
                    derived[token] = val;
                    console.log(`🔗 solv9: Derived ${token} = ${val}`);
                }
            }
        }

        if (derived.hasOwnProperty('A') && derived.hasOwnProperty('STEP')) {
            if (!derived.hasOwnProperty('B')) derived['B'] = derived['A'] + derived['STEP'];
            if (!derived.hasOwnProperty('C')) derived['C'] = derived['A'] + derived['STEP'] * 2;
            if (!derived.hasOwnProperty('D')) derived['D'] = derived['A'] + derived['STEP'] * 3;
        } else if (derived.hasOwnProperty('A')) {
            if (!derived.hasOwnProperty('B')) derived['B'] = derived['A'] + 1;
            if (!derived.hasOwnProperty('C')) derived['C'] = derived['A'] + 2;
            if (!derived.hasOwnProperty('D')) derived['D'] = derived['A'] + 3;
        }

        return derived;
    }

    // ============================================
    // solv2 + solv6 + solv8 - EXPRESSION RESOLVER
    // ============================================

    evaluateBracketExpression(expr, variables) {
        let e = expr;
        e = e.replace(/×/g, '*');
        e = e.replace(/÷/g, '/');
        e = e.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g, '$1*$2');

        // solv8: string variables with quotes first
        for (const [varName, value] of Object.entries(variables)) {
            if (typeof value === 'string' && isNaN(value)) {
                const regex = new RegExp('\\b' + varName + '\\b', 'g');
                e = e.replace(regex, '"' + value + '"');
            }
        }
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
        resolved = resolved.replace(/(\d)\[/g, '$1*[');

        for (const [varName, value] of Object.entries(variables)) {
            resolved = resolved.replace(new RegExp(`\\[${varName}\\]`, 'g'), value);
        }

        resolved = resolved.replace(/\[([^\]]+)\]/g, (match, inner) => {
            const result = this.evaluateBracketExpression(inner, variables);
            if (result !== null) return result;
            return match;
        });

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

    isQuestionUsed(hash) { return this.usedQuestions.includes(hash); }

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
        if (!options.map(opt => String(opt)).includes(answerStr)) {
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
            this.currentTemplateIndex = 0;
            this.initLocalStorage();
            return true;
        } catch (error) {
            console.error('Error loading puzzle category:', error);
            return false;
        }
    }

    // solv7
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

        while (attempts < maxAttempts) {
            attempts++;

            // solv3: sequential
            const templateIndex = this.currentTemplateIndex % templates.length;
            this.currentTemplate = templates[templateIndex];
            this.currentTemplateIndex++;
            if (this.currentTemplateIndex >= templates.length) this.currentTemplateIndex = 0;

            // solv7: skip uncomputable
            if (!this.isTemplateComputable(this.currentTemplate)) {
                console.log(`⏭️ Skipping uncomputable: ${this.currentTemplate.template_id}`);
                continue;
            }

            const rawVariables = this.generateVariables(this.currentTemplate.variables);
            // solv9: derive missing variables
            const variables = this.computeDerivedVariables(this.currentTemplate, rawVariables);

            const questionHash = this.createQuestionHash(this.currentTemplate, variables);
            if (this.isQuestionUsed(questionHash)) {
                console.log(`⏭️ Skipping duplicate (attempt ${attempts})`);
                continue;
            }

            const question = this.generateQuestion(this.currentTemplate, variables);
            const answer = this.calculateAnswer(this.currentTemplate, variables);

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

        console.warn('⚠️ Max attempts reached. Clearing history...');
        this.clearUsedQuestions();
        this.currentTemplateIndex = 0;

        let fallbackTemplate = templates[0];
        for (const t of templates) {
            if (this.isTemplateComputable(t)) { fallbackTemplate = t; break; }
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
                try { variables[varName] = this.evaluateExpression(def.calc, variables); }
                catch (e) { variables[varName] = 0; }
            } else if (def.primes !== undefined) {
                variables[varName] = def.primes[Math.floor(Math.random() * (def.primes.length - 1))];
            } else if (def.bell_numbers !== undefined) {
                variables[varName] = def.bell_numbers[Math.floor(Math.random() * (def.bell_numbers.length - 1))];
            } else if (def.perrin !== undefined) {
                variables[varName] = def.perrin[Math.floor(Math.random() * (def.perrin.length - 1))];
            } else if (def.cake !== undefined) {
                variables[varName] = def.cake[Math.floor(Math.random() * (def.cake.length - 1))];
            } else if (def.motzkin !== undefined) {
                variables[varName] = def.motzkin[Math.floor(Math.random() * (def.motzkin.length - 1))];
            } else if (def.schroder !== undefined) {
                variables[varName] = def.schroder[Math.floor(Math.random() * (def.schroder.length - 1))];
            } else if (def.narayana !== undefined) {
                variables[varName] = def.narayana[Math.floor(Math.random() * (def.narayana.length - 1))];
            } else if (def.partitions !== undefined) {
                variables[varName] = def.partitions[Math.floor(Math.random() * (def.partitions.length - 1))];
            } else if (def.mersenne !== undefined) {
                variables[varName] = def.mersenne[Math.floor(Math.random() * (def.mersenne.length - 1))];
            } else if (def.fermat !== undefined) {
                variables[varName] = def.fermat[Math.floor(Math.random() * (def.fermat.length - 1))];
            } else if (def.carmichael !== undefined) {
                variables[varName] = def.carmichael[Math.floor(Math.random() * (def.carmichael.length - 1))];
            } else if (def.carol !== undefined) {
                variables[varName] = def.carol[Math.floor(Math.random() * (def.carol.length - 1))];
            } else if (def.kynea !== undefined) {
                variables[varName] = def.kynea[Math.floor(Math.random() * (def.kynea.length - 1))];
            } else if (def.thabit !== undefined) {
                variables[varName] = def.thabit[Math.floor(Math.random() * (def.thabit.length - 1))];
            } else if (def.sophie !== undefined) {
                variables[varName] = def.sophie[Math.floor(Math.random() * (def.sophie.length - 1))];
            } else if (def.safe !== undefined) {
                variables[varName] = def.safe[Math.floor(Math.random() * (def.safe.length - 1))];
            } else if (def.primorial !== undefined) {
                variables[varName] = def.primorial[Math.floor(Math.random() * (def.primorial.length - 1))];
            } else if (def.giuga !== undefined) {
                variables[varName] = def.giuga[Math.floor(Math.random() * (def.giuga.length - 1))];
            } else if (def.cullen !== undefined) {
                variables[varName] = def.cullen[Math.floor(Math.random() * (def.cullen.length - 1))];
            } else if (def.woodall !== undefined) {
                variables[varName] = def.woodall[Math.floor(Math.random() * (def.woodall.length - 1))];
            } else if (def.highly_composite !== undefined) {
                variables[varName] = def.highly_composite[Math.floor(Math.random() * (def.highly_composite.length - 1))];
            } else if (def.superior_hc !== undefined) {
                variables[varName] = def.superior_hc[Math.floor(Math.random() * (def.superior_hc.length - 1))];
            } else if (def.abundant !== undefined) {
                variables[varName] = def.abundant[Math.floor(Math.random() * (def.abundant.length - 1))];
            } else if (def.deficient !== undefined) {
                variables[varName] = def.deficient[Math.floor(Math.random() * (def.deficient.length - 1))];
            } else if (def.perfect !== undefined) {
                variables[varName] = def.perfect[Math.floor(Math.random() * (def.perfect.length - 1))];
            } else if (def.semiprime !== undefined) {
                variables[varName] = def.semiprime[Math.floor(Math.random() * (def.semiprime.length - 1))];
            } else if (def.sphenic !== undefined) {
                variables[varName] = def.sphenic[Math.floor(Math.random() * (def.sphenic.length - 1))];
            } else if (def.totients !== undefined) {
                variables[varName] = Math.floor(Math.random() * def.totients.length);
            } else {
                const min = def.min !== undefined ? def.min : 1;
                const max = def.max !== undefined ? def.max : 10;
                const step = def.step || 1;
                const steps = Math.floor((max - min) / step) + 1;
                variables[varName] = min + (Math.floor(Math.random() * steps) * step);

                // solv4
                if (def.primes_only) {
                    let v = variables[varName];
                    let up = v, down = v;
                    while (!this.isPrime(up) && up <= max) up++;
                    while (!this.isPrime(down) && down >= min) down--;
                    variables[varName] = (this.isPrime(up) && up <= max) ? up : down;
                }
                if (def.perfect_only) {
                    let v = variables[varName];
                    while (!this.isPerfect(v) && v <= max * 100) v++;
                    variables[varName] = v;
                }
            }
        }
        return variables;
    }

    evaluateExpression(expr, variables) {
        console.log('Evaluating expression:', expr, 'with variables:', variables);
        let evaluated = expr;

        // solv1: if-then-else
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

        // solv6
        evaluated = evaluated.replace(/×/g, '*');
        evaluated = evaluated.replace(/÷/g, '/');
        evaluated = evaluated.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g, '$1*$2');

        // solv8: strings first
        for (const [varName, value] of Object.entries(variables)) {
            if (typeof value === 'string' && isNaN(value)) {
                evaluated = evaluated.replace(new RegExp('\\b' + varName + '\\b', 'g'), '"' + value + '"');
            }
        }
        for (const [varName, value] of Object.entries(variables)) {
            if (typeof value !== 'string' || !isNaN(value)) {
                evaluated = evaluated.replace(new RegExp('\\b' + varName + '\\b', 'g'), '(' + value + ')');
            }
        }

        console.log('After variable substitution:', evaluated);

        // solv1: math functions
        evaluated = evaluated.replace(/factorial\(([^)]+)\)/g, (match, inner) => {
            try { return this.factorial(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_prime\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextPrime(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/sigma\(([^)]+)\)/g, (match, inner) => {
            try { return this.sigma(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/phi\(([^)]+)\)/g, (match, inner) => {
            try { return this.phi(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/partition\(([^)]+)\)/g, (match, inner) => {
            try { return this.partition(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_sphenic\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSphenic(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_semiprime\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSemiprime(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_abundant\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextAbundant(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_deficient\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextDeficient(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_perfect\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextPerfect(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/primorial\(([^)]+)\)/g, (match, inner) => {
            try { return this.primorial(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_highly_composite\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextHighlyComposite(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_superior_highly_composite\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSuperiorHighlyComposite(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_sophie_germain\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSophieGermain(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_safe_prime\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextSafePrime(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_factorial_prime\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextFactorialPrime(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });
        evaluated = evaluated.replace(/next_giuga\(([^)]+)\)/g, (match, inner) => {
            try { return this.nextGiuga(Math.round(new Function('return ' + inner)())); } catch(e) { return match; }
        });

        if (evaluated.includes('repeat(')) {
            evaluated = evaluated.replace(/repeat\(([^,]+),\s*([^)]+)\)/g, (match, emoji, count) => {
                const emojiValue = variables[emoji.trim().replace(/['"]/g, '')] || emoji.trim().replace(/['"]/g, '');
                return JSON.stringify(emojiValue.repeat(parseInt(count) || 1));
            });
        }
        if (evaluated.includes('next_in_pattern(')) {
            evaluated = evaluated.replace(/next_in_pattern\(([^)]+)\)/g, (match, pattern) => {
                return JSON.stringify(this.calculateNextInPattern(pattern.trim().replace(/['"]/g, ''), variables));
            });
        }
        if (evaluated.includes('generate_options(')) {
            evaluated = evaluated.replace(/generate_options\(([^)]+)\)/g, (match, params) => {
                const [num, emoji] = params.split(',').map(p => p.trim().replace(/['"]/g, ''));
                return JSON.stringify(this.generateVisualOptions(num, emoji, variables));
            });
        }

        console.log('After function processing:', evaluated);

        try {
            if (evaluated.startsWith('[') && evaluated.endsWith(']')) {
                try { return JSON.parse(evaluated); } catch (e) { return []; }
            }
            if ((evaluated.startsWith('"') && evaluated.endsWith('"')) ||
                (evaluated.startsWith("'") && evaluated.endsWith("'"))) {
                return evaluated.slice(1, -1);
            }
            if (evaluated === 'true') return true;
            if (evaluated === 'false') return false;
            if (evaluated === 'null') return null;
            if (!isNaN(evaluated) && evaluated.trim() !== '') return Number(evaluated);
            if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(evaluated)) return evaluated;
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
                return result;
            } catch (e) { console.error('Error building pattern:', e); }
        }
        return this.resolvePatternText(template.pattern, variables);
    }

    calculateAnswer(template, variables) {
        if (template.calculation) {
            const calc = template.calculation.trim();
            if (calc === 'null' || calc === '') return null;

            if (calc.includes('repeat(')) return this.evaluateExpression(calc, variables);

            if (calc.includes('next_in_pattern(')) {
                const pattern = this.evaluateExpression(calc, variables);
                const options = template.options || [];
                if (pattern === 'ABAB' || pattern === 'AABB') return options[0] || '🔴';
                if (pattern === 'ABCABC') return options[2] || '🔵';
                return options[0] || '?';
            }

            if (variables.hasOwnProperty(calc)) {
                const value = variables[calc];
                if (template.answer_type === 'multiple_choice_visual' && template.options_builder) {
                    const emojiVar = template.options_builder.match(/generate_options\([^,]+,\s*(\w+)\)/);
                    if (emojiVar && variables[emojiVar[1]]) return variables[emojiVar[1]].repeat(value);
                }
                if (template.answer_type === 'shape_selector' && typeof value === 'string') return this.shapeMap[value] || value;
                if (template.answer_type === 'color_picker' && typeof value === 'string') return this.colorMap[value] || value;
                if (template.answer_type === 'comparison' && typeof value === 'string') return variables[value + '_EMOJI'] || value;
                if (typeof value === 'number') return parseFloat(value.toFixed(4));
                return value;
            }

            const result = this.evaluateExpression(template.calculation, variables);
            if (result === null || result === undefined) return null;
            if (template.answer_type === 'shape_selector' && typeof result === 'string') return this.shapeMap[result] || result;
            if (template.answer_type === 'color_picker' && typeof result === 'string') return this.colorMap[result] || result;
            if (template.answer_type === 'comparison' && typeof result === 'string') return variables[result + '_EMOJI'] || result;
            if (typeof result === 'number') return parseFloat(result.toFixed(4));
            return result;
        }
        return 0;
    }

    generateOptions(correctAnswer, template, variables) {
        console.log('Generating options for answer:', correctAnswer, 'type:', template.answer_type);

        if (template.options_builder) {
            try {
                const options = this.evaluateExpression(template.options_builder, variables);
                if (Array.isArray(options)) return this.shuffleArray(options);
            } catch (e) { console.error('Error building options:', e); }
        }

        // sol10: trim to exactly 4 options always
        if (template.options && Array.isArray(template.options)) {
            let options = [...template.options];
            if (!options.map(o => String(o)).includes(String(correctAnswer))) {
                options.push(correctAnswer);
            }
            const wrong = options.filter(o => String(o) !== String(correctAnswer));
            const selected = this.shuffleArray(wrong).slice(0, 3);
            return this.shuffleArray([correctAnswer, ...selected]);
        }

        if (template.answer_type === 'shape_selector') return this.shuffleArray([...Object.values(this.shapeMap)]);
        if (template.answer_type === 'color_picker') return this.shuffleArray([...Object.values(this.colorMap)]);
        if (template.answer_type === 'comparison') return this.shuffleArray([variables.A_EMOJI, variables.B_EMOJI]);

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
                if (wrongAnswer === correctNum) wrongAnswer = correctNum + (i + 2);
                let wrongStr = String(parseFloat(wrongAnswer.toFixed(4)));
                let dupeCheck = 0;
                while (options.includes(wrongStr) && dupeCheck < 20) {
                    wrongAnswer++;
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
        for (let i = 1; i <= 5; i++) options.push(emoji.repeat(i));
        if (targetNumber >= 1 && targetNumber <= 5) {
            if (!options.includes(emoji.repeat(targetNumber))) options[0] = emoji.repeat(targetNumber);
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
        if (answerType === 'comparison') {
            const aSize = this.sizeComparison[options[0]] || 'medium';
            return aSize === 'big' ? 0 : 1;
        }
        return options.findIndex(opt => String(opt) === String(correctAnswer));
    }

    generateExplanation(template, variables, answer) {
        if (!template.explanation) return `The correct answer is ${answer}.`;
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
            return { correct: true, message: this.getRandomResponse('correct'), explanation: this.currentPuzzle.explanation, level: this.currentPuzzle.level };
        } else {
            return { correct: false, message: this.getRandomResponse('incorrect'), explanation: this.currentPuzzle.explanation, correctAnswer: this.currentPuzzle.correctAnswer, level: this.currentPuzzle.level };
        }
    }

    getRandomResponse(type) {
        return type === 'correct' ? 'Yes Correct Answer' : 'Please try again';
    }

    getStats() {
        const accuracy = this.totalAttempts > 0 ? Math.round((this.score / this.totalAttempts) * 100) : 0;
        return { score: this.score, totalAttempts: this.totalAttempts, accuracy: accuracy, currentCategory: this.currentCategory };
    }

    resetScore() { this.score = 0; this.totalAttempts = 0; }

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
        if (this.categoryData && this.categoryData.display_name) return this.categoryData.display_name;
        return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
    if (puzzle) updatePuzzleDisplay(puzzle);
    else document.getElementById('vooo-question').textContent = 'Error generating puzzle. Check console.';
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
    if (puzzle) updatePuzzleDisplay(puzzle);
}

async function changeLevel(levelKey) {
    console.log('Changing level to:', levelKey);
    const success = await voooEngine.loadCategory(levelKey);
    if (success) { voooEngine.resetScore(); nextPuzzle(); }
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
