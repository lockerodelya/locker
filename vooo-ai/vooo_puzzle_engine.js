// ============================================
// VOOO AI Puzzle Engine - ENHANCED VERSION
// FIXES: solv1+solv2+solv3+solv4+solv6+solv7+solv8+solv9+sol10+solv11+solv12+solv13
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
        for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
        return true;
    }
    nextPrime(n) { let c = n + 1; while (!this.isPrime(c)) c++; return c; }
    sigma(n) { let s = 0; for (let i = 1; i <= n; i++) if (n % i === 0) s += i; return s; }
    phi(n) {
        let result = n, temp = n;
        for (let p = 2; p * p <= temp; p++) {
            if (temp % p === 0) { while (temp % p === 0) temp = Math.floor(temp / p); result -= Math.floor(result / p); }
        }
        if (temp > 1) result -= Math.floor(result / temp);
        return result;
    }
    partition(n) {
        const p = new Array(n + 1).fill(0); p[0] = 1;
        for (let k = 1; k <= n; k++) for (let i = k; i <= n; i++) p[i] += p[i - k];
        return p[n];
    }
    primeFactors(n) {
        const f = []; let t = n;
        for (let p = 2; p * p <= t; p++) { if (t % p === 0) { let c = 0; while (t % p === 0) { c++; t = Math.floor(t / p); } f.push({ prime: p, exp: c }); } }
        if (t > 1) f.push({ prime: t, exp: 1 });
        return f;
    }
    isSphenic(n) { if (n < 2) return false; const f = this.primeFactors(n); return f.length === 3 && f.every(x => x.exp === 1); }
    nextSphenic(n) { let c = n + 1; while (!this.isSphenic(c)) c++; return c; }
    isSemiprime(n) { if (n < 4) return false; return this.primeFactors(n).reduce((s, f) => s + f.exp, 0) === 2; }
    nextSemiprime(n) { let c = n + 1; while (!this.isSemiprime(c)) c++; return c; }
    isAbundant(n) { return this.sigma(n) - n > n; }
    nextAbundant(n) { let c = n + 1; while (!this.isAbundant(c)) c++; return c; }
    isDeficient(n) { return this.sigma(n) - n < n; }
    nextDeficient(n) { let c = n + 1; while (!this.isDeficient(c)) c++; return c; }
    isPerfect(n) { return this.sigma(n) - n === n; }
    nextPerfect(n) { let c = n + 1; while (!this.isPerfect(c)) c++; return c; }
    primorial(n) { let r = 1, count = 0, c = 2; while (count < n) { if (this.isPrime(c)) { r *= c; count++; } c++; } return r; }
    countDivisors(n) { let c = 0; for (let i = 1; i <= n; i++) if (n % i === 0) c++; return c; }
    isHighlyComposite(n) { const d = this.countDivisors(n); for (let i = 1; i < n; i++) if (this.countDivisors(i) >= d) return false; return true; }
    nextHighlyComposite(n) { let c = n + 1; while (!this.isHighlyComposite(c)) c++; return c; }
    isSophieGermain(n) { return this.isPrime(n) && this.isPrime(2 * n + 1); }
    nextSophieGermain(n) { let c = n + 1; while (!this.isSophieGermain(c)) c++; return c; }
    isSafePrime(n) { return this.isPrime(n) && n > 2 && this.isPrime((n - 1) / 2); }
    nextSafePrime(n) { let c = n + 1; while (!this.isSafePrime(c)) c++; return c; }
    nextFactorialPrime(n) {
        let k = n + 1;
        while (true) { const f = this.factorial(k); if (this.isPrime(f + 1)) return f + 1; if (this.isPrime(f - 1)) return f - 1; k++; if (k > 15) break; }
        return this.factorial(n + 1) + 1;
    }
    nextSuperiorHighlyComposite(n) { const k = [2, 6, 12, 60, 120, 360, 2520, 5040, 55440, 720720]; for (const v of k) if (v > n) return v; return n * 2; }
    nextGiuga(n) { const k = [30, 858, 1722, 66198, 2214408306]; for (const v of k) if (v > n) return v; return 858; }

    // ============================================
    // solv13 - DETECT PLAIN TEXT CALCULATION
    // ============================================
    isPlainTextCalculation(calc, variables) {
        if (!calc) return true;
        const trimmed = calc.trim();
        // If it's null or empty
        if (trimmed === '' || trimmed === 'null') return true;
        // If it contains only letters, spaces, hyphens, accented chars — plain English
        if (/^[A-Za-zÀ-ÿ\s\-]+$/.test(trimmed)) return true;
        // If it contains generate/lookup/rules keywords
        if (/generate|lookup|rules|decryption|transposition|multiplication|substitution|autokey|checkerboard|pattern|ambiguity|complexity|Dynamic/i.test(trimmed)) return true;
        return false;
    }

    // ============================================
    // solv9 - COMPUTE DERIVED VARIABLES
    // ============================================
    computeDerivedVariables(template, variables) {
        const derived = { ...variables };
        const pattern = template.pattern || '';
        const explanation = template.explanation || '';
        const ptr = /\[([A-Z][A-Z0-9_]*)\]/g;
        let match;
        const patArr = [];
        while ((match = ptr.exec(pattern)) !== null) patArr.push(match[1]);
        const expArr = [];
        const etr = /\[([^\]]+)\]/g;
        while ((match = etr.exec(explanation)) !== null) expArr.push(match[1]);
        for (let i = 0; i < patArr.length; i++) {
            if (!derived.hasOwnProperty(patArr[i]) && expArr[i]) {
                const val = this.evaluateBracketExpression(expArr[i], derived);
                if (val !== null) { derived[patArr[i]] = val; console.log(`🔗 solv9: Derived ${patArr[i]}=${val}`); }
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
    // solv2+solv6+solv8+solv12 - EXPRESSION RESOLVERS
    // ============================================
    evaluateBracketExpression(expr, variables) {
        let e = expr;
        e = e.replace(/×/g, '*');
        e = e.replace(/÷/g, '/');

        // solv12: only apply implicit coefficient regex if expression
        // contains math operators — NOT for string comparisons or plain text
        const hasMathOps = /[\+\-\*\/\^%]/.test(e) && !/[?:'"]/.test(e);
        if (hasMathOps) {
            e = e.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g, '$1*$2');
        }

        // solv8: strings first
        for (const [k, v] of Object.entries(variables)) {
            if (typeof v === 'string' && isNaN(v)) {
                e = e.replace(new RegExp('\\b' + k + '\\b', 'g'), '"' + v + '"');
            }
        }
        for (const [k, v] of Object.entries(variables)) {
            if (typeof v !== 'string' || !isNaN(v)) {
                e = e.replace(new RegExp('\\b' + k + '\\b', 'g'), '(' + v + ')');
            }
        }
        try {
            const r = new Function('return ' + e)();
            return (typeof r === 'number') ? r : (typeof r === 'string') ? r : null;
        } catch (err) { return null; }
    }

    resolvePatternText(text, variables) {
        let resolved = text;
        // solv12: only add * between digit and [ if followed by a variable
        // not for patterns like [N] where N is just a label
        resolved = resolved.replace(/(\d)\[/g, '$1*[');
        for (const [k, v] of Object.entries(variables)) {
            resolved = resolved.replace(new RegExp(`\\[${k}\\]`, 'g'), v);
        }
        resolved = resolved.replace(/\[([^\]]+)\]/g, (match, inner) => {
            const r = this.evaluateBracketExpression(inner, variables);
            return r !== null ? r : match;
        });
        for (const [k, v] of Object.entries(variables)) {
            resolved = resolved.replace(new RegExp('\\b' + k + '\\b', 'g'), v);
        }
        return resolved;
    }

    // ============================================
    // VALIDATION & DUPLICATE PREVENTION
    // ============================================
    initLocalStorage() {
        const key = `vooo_used_questions_${this.currentCategory}`;
        const stored = localStorage.getItem(key);
        this.usedQuestions = stored ? JSON.parse(stored) : [];
        console.log(`📦 Loaded ${this.usedQuestions.length} used questions`);
    }
    saveUsedQuestion(hash) {
        const key = `vooo_used_questions_${this.currentCategory}`;
        this.usedQuestions.push(hash);
        localStorage.setItem(key, JSON.stringify(this.usedQuestions));
    }
    createQuestionHash(template, variables) {
        return btoa(unescape(encodeURIComponent(template.template_id + '_' + JSON.stringify(variables)))).substring(0, 20);
    }
    isQuestionUsed(hash) { return this.usedQuestions.includes(hash); }
    validateOptions(options, correctAnswer) {
        if (options.length !== 4) { console.warn('❌ Not 4 options', options.length); return false; }
        if (new Set(options.map(o => String(o))).size !== 4) { console.warn('❌ Duplicate options', options); return false; }
        if (!options.map(o => String(o)).includes(String(correctAnswer))) { console.warn('❌ Answer not in options', correctAnswer, options); return false; }
        return true;
    }
    clearUsedQuestions() {
        localStorage.removeItem(`vooo_used_questions_${this.currentCategory}`);
        this.usedQuestions = [];
        console.log('🗑️ Cleared used questions');
    }

    // ============================================
    // CORE ENGINE
    // ============================================
    async loadCategory(categoryName) {
        this.currentCategory = categoryName;
        try {
            const response = await fetch(`/vooo-ai/vooo-json/${this.categories[categoryName]}`);
            this.categoryData = await response.json();
            this.currentTemplateIndex = 0;
            this.initLocalStorage();
            return true;
        } catch (error) { console.error('Error loading category:', error); return false; }
    }

    // solv7 + solv13
    isTemplateComputable(template) {
        if (!template.calculation) return false;
        const calc = template.calculation.trim();
        if (calc === '' || calc === 'null') return false;
        // solv13: skip plain English descriptions
        if (this.isPlainTextCalculation(calc, {})) {
            console.log(`⏭️ solv13: Plain text calculation skipped: ${calc}`);
            return false;
        }
        return true;
    }

    generateNewPuzzle() {
        if (!this.categoryData || !this.categoryData.templates) { console.error('No templates'); return null; }
        const templates = this.categoryData.templates;
        let attempts = 0;
        const maxAttempts = templates.length * 3;

        while (attempts < maxAttempts) {
            attempts++;
            // solv3: sequential
            const idx = this.currentTemplateIndex % templates.length;
            this.currentTemplate = templates[idx];
            this.currentTemplateIndex++;
            if (this.currentTemplateIndex >= templates.length) this.currentTemplateIndex = 0;

            // solv7 + solv13
            if (!this.isTemplateComputable(this.currentTemplate)) {
                console.log(`⏭️ Skipping: ${this.currentTemplate.template_id}`);
                continue;
            }

            const rawVars = this.generateVariables(this.currentTemplate.variables);
            // solv9
            const variables = this.computeDerivedVariables(this.currentTemplate, rawVars);
            const hash = this.createQuestionHash(this.currentTemplate, variables);
            if (this.isQuestionUsed(hash)) { console.log(`⏭️ Duplicate (${attempts})`); continue; }

            const question = this.generateQuestion(this.currentTemplate, variables);
            const answer = this.calculateAnswer(this.currentTemplate, variables);
            if (answer === null || answer === undefined || answer === 'null') {
                console.log(`⏭️ Null answer: ${this.currentTemplate.template_id}`); continue;
            }

            const options = this.generateOptions(answer, this.currentTemplate, variables);
            if (!this.validateOptions(options, answer)) { console.log(`❌ Invalid options (${attempts})`); continue; }

            this.saveUsedQuestion(hash);
            this.currentPuzzle = {
                question, options, correctAnswer: answer,
                correctIndex: this.findCorrectIndex(options, answer, this.currentTemplate.answer_type),
                explanation: this.generateExplanation(this.currentTemplate, variables, answer),
                templateId: this.currentTemplate.template_id,
                level: this.currentCategory,
                answerType: this.currentTemplate.answer_type || 'text'
            };
            console.log(`✅ Generated (${attempts}):`, this.currentPuzzle);
            return this.currentPuzzle;
        }

        console.warn('⚠️ Max attempts. Clearing history...');
        this.clearUsedQuestions();
        this.currentTemplateIndex = 0;
        let fb = templates[0];
        for (const t of templates) if (this.isTemplateComputable(t)) { fb = t; break; }
        this.currentTemplate = fb;
        const rv = this.generateVariables(this.currentTemplate.variables);
        const vars = this.computeDerivedVariables(this.currentTemplate, rv);
        const ans = this.calculateAnswer(this.currentTemplate, vars);
        const opts = this.generateOptions(ans, this.currentTemplate, vars);
        this.currentPuzzle = {
            question: this.generateQuestion(this.currentTemplate, vars),
            options: opts, correctAnswer: ans,
            correctIndex: this.findCorrectIndex(opts, ans, this.currentTemplate.answer_type),
            explanation: this.generateExplanation(this.currentTemplate, vars, ans),
            templateId: this.currentTemplate.template_id,
            level: this.currentCategory, answerType: this.currentTemplate.answer_type || 'text'
        };
        return this.currentPuzzle;
    }

    generateVariables(variableDefs) {
        const variables = {};
        if (!variableDefs) return variables;
        const arrKeys = ['primes', 'bell_numbers', 'perrin', 'cake', 'motzkin', 'schroder', 'narayana',
            'partitions', 'mersenne', 'fermat', 'carmichael', 'carol', 'kynea', 'thabit', 'sophie',
            'safe', 'primorial', 'giuga', 'cullen', 'woodall', 'highly_composite', 'superior_hc',
            'abundant', 'deficient', 'perfect', 'semiprime', 'sphenic'];
        for (const [varName, def] of Object.entries(variableDefs)) {
            if (def.value !== undefined) { variables[varName] = def.value; }
            else if (def.values !== undefined) { variables[varName] = def.values[Math.floor(Math.random() * def.values.length)]; }
            else if (def.calc !== undefined) { try { variables[varName] = this.evaluateExpression(def.calc, variables); } catch (e) { variables[varName] = 0; } }
            else if (def.totients !== undefined) { variables[varName] = Math.floor(Math.random() * def.totients.length); }
            else {
                let handled = false;
                for (const k of arrKeys) {
                    if (def[k] !== undefined) { variables[varName] = def[k][Math.floor(Math.random() * (def[k].length - 1))]; handled = true; break; }
                }
                if (!handled) {
                    const min = def.min !== undefined ? def.min : 1;
                    const max = def.max !== undefined ? def.max : 10;
                    const step = def.step || 1;
                    variables[varName] = min + (Math.floor(Math.random() * (Math.floor((max - min) / step) + 1)) * step);
                    // solv4
                    if (def.primes_only) {
                        let v = variables[varName], up = v, dn = v;
                        while (!this.isPrime(up) && up <= max) up++;
                        while (!this.isPrime(dn) && dn >= min) dn--;
                        variables[varName] = (this.isPrime(up) && up <= max) ? up : dn;
                    }
                    if (def.perfect_only) { let v = variables[varName]; while (!this.isPerfect(v) && v <= max * 100) v++; variables[varName] = v; }
                }
            }
        }
        return variables;
    }

    evaluateExpression(expr, variables) {
        console.log('Evaluating:', expr, 'vars:', variables);
        let ev = expr;

        // solv13: catch plain text before any processing
        if (this.isPlainTextCalculation(ev, variables)) {
            console.log('⏭️ solv13: Plain text expression skipped:', ev);
            return null;
        }

        // solv1: if-then-else
        ev = ev.replace(/if\s+(.+?)\s+then\s+(.+?)\s+else\s+(.+)/g, (match, cond, thenV, elseV) => {
            try {
                let c = cond;
                for (const [k, v] of Object.entries(variables)) {
                    c = c.replace(new RegExp('\\b' + k + '\\b', 'g'), (typeof v === 'string' && isNaN(v)) ? '"' + v + '"' : JSON.stringify(v));
                }
                return new Function('return ' + c)() ? thenV.trim() : elseV.trim().replace(/'/g, '');
            } catch (e) { return match; }
        });

        // solv6
        ev = ev.replace(/×/g, '*').replace(/÷/g, '/');

        // solv12: only apply implicit coefficient when math expression
        const hasMathOps = /[\+\-\*\/\^%]/.test(ev) && !/[?:'"]/.test(ev);
        if (hasMathOps) {
            ev = ev.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g, '$1*$2');
        }

        // solv8: strings first
        for (const [k, v] of Object.entries(variables)) {
            if (typeof v === 'string' && isNaN(v)) ev = ev.replace(new RegExp('\\b' + k + '\\b', 'g'), '"' + v + '"');
        }
        for (const [k, v] of Object.entries(variables)) {
            if (typeof v !== 'string' || !isNaN(v)) ev = ev.replace(new RegExp('\\b' + k + '\\b', 'g'), '(' + v + ')');
        }

        console.log('After substitution:', ev);

        // solv1: math functions
        const mathFns = [
            ['factorial', x => this.factorial(Math.round(x))],
            ['next_prime', x => this.nextPrime(Math.round(x))],
            ['sigma', x => this.sigma(Math.round(x))],
            ['phi', x => this.phi(Math.round(x))],
            ['partition', x => this.partition(Math.round(x))],
            ['next_sphenic', x => this.nextSphenic(Math.round(x))],
            ['next_semiprime', x => this.nextSemiprime(Math.round(x))],
            ['next_abundant', x => this.nextAbundant(Math.round(x))],
            ['next_deficient', x => this.nextDeficient(Math.round(x))],
            ['next_perfect', x => this.nextPerfect(Math.round(x))],
            ['primorial', x => this.primorial(Math.round(x))],
            ['next_highly_composite', x => this.nextHighlyComposite(Math.round(x))],
            ['next_superior_highly_composite', x => this.nextSuperiorHighlyComposite(Math.round(x))],
            ['next_sophie_germain', x => this.nextSophieGermain(Math.round(x))],
            ['next_safe_prime', x => this.nextSafePrime(Math.round(x))],
            ['next_factorial_prime', x => this.nextFactorialPrime(Math.round(x))],
            ['next_giuga', x => this.nextGiuga(Math.round(x))]
        ];
        for (const [name, fn] of mathFns) {
            ev = ev.replace(new RegExp(name + '\\(([^)]+)\\)', 'g'), (match, inner) => {
                try { return fn(new Function('return ' + inner)()); } catch (e) { return match; }
            });
        }

        if (ev.includes('repeat(')) {
            ev = ev.replace(/repeat\(([^,]+),\s*([^)]+)\)/g, (match, emoji, count) => {
                const val = variables[emoji.trim().replace(/['"]/g, '')] || emoji.trim().replace(/['"]/g, '');
                return JSON.stringify(val.repeat(parseInt(count) || 1));
            });
        }
        if (ev.includes('next_in_pattern(')) {
            ev = ev.replace(/next_in_pattern\(([^)]+)\)/g, (match, p) =>
                JSON.stringify(this.calculateNextInPattern(p.trim().replace(/['"]/g, ''), variables)));
        }
        if (ev.includes('generate_options(')) {
            ev = ev.replace(/generate_options\(([^)]+)\)/g, (match, params) => {
                const [num, emoji] = params.split(',').map(p => p.trim().replace(/['"]/g, ''));
                return JSON.stringify(this.generateVisualOptions(num, emoji, variables));
            });
        }

        console.log('After processing:', ev);

        try {
            if (ev.startsWith('[') && ev.endsWith(']')) try { return JSON.parse(ev); } catch (e) { return []; }
            if ((ev.startsWith('"') && ev.endsWith('"')) || (ev.startsWith("'") && ev.endsWith("'"))) return ev.slice(1, -1);
            if (ev === 'true') return true;
            if (ev === 'false') return false;
            if (ev === 'null') return null;
            if (!isNaN(ev) && ev.trim() !== '') return Number(ev);
            if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(ev)) return ev;
            const result = new Function('return ' + ev)();
            console.log('Result:', result);
            return result;
        } catch (e) { console.error('Eval error:', expr, '->', ev, e); return null; }
    }

    generateQuestion(template, variables) {
        if (template.pattern_builder) { try { return this.evaluateExpression(template.pattern_builder, variables); } catch (e) { } }
        return this.resolvePatternText(template.pattern, variables);
    }

    calculateAnswer(template, variables) {
        if (!template.calculation) return 0;
        const calc = template.calculation.trim();
        if (calc === 'null' || calc === '') return null;

        // solv13: skip plain text
        if (this.isPlainTextCalculation(calc, variables)) return null;

        if (calc.includes('repeat(')) return this.evaluateExpression(calc, variables);
        if (calc.includes('next_in_pattern(')) {
            const pattern = this.evaluateExpression(calc, variables);
            const opts = template.options || [];
            if (pattern === 'ABAB' || pattern === 'AABB') return opts[0] || '🔴';
            if (pattern === 'ABCABC') return opts[2] || '🔵';
            return opts[0] || '?';
        }
        if (variables.hasOwnProperty(calc)) {
            const value = variables[calc];
            if (template.answer_type === 'shape_selector' && typeof value === 'string') return this.shapeMap[value] || value;
            if (template.answer_type === 'color_picker' && typeof value === 'string') return this.colorMap[value] || value;
            if (typeof value === 'number') return parseFloat(value.toFixed(4));
            return value;
        }
        const result = this.evaluateExpression(calc, variables);
        if (result === null || result === undefined) return null;
        if (typeof result === 'number') return parseFloat(result.toFixed(4));
        return result;
    }

    generateOptions(correctAnswer, template, variables) {
        console.log('Options for:', correctAnswer);

        if (template.options_builder) {
            try { const opts = this.evaluateExpression(template.options_builder, variables); if (Array.isArray(opts)) return this.shuffleArray(opts); }
            catch (e) { console.error('Options builder error:', e); }
        }

        // sol10 + solv11: trim to exactly 4, fix leaked variable values
        if (template.options && Array.isArray(template.options)) {
            let opts = [...template.options];
            const correctStr = String(correctAnswer);
            const optsStr = opts.map(o => String(o));

            // solv11: if correct answer not in options array, pick first option
            let effectiveCorrect = correctAnswer;
            if (!optsStr.includes(correctStr)) {
                effectiveCorrect = opts[0];
                console.log(`⚠️ solv11: Fixed answer ${correctAnswer} → ${effectiveCorrect}`);
            }
            const wrong = opts.filter(o => String(o) !== String(effectiveCorrect));
            const selected = this.shuffleArray(wrong).slice(0, 3);
            return this.shuffleArray([effectiveCorrect, ...selected]);
        }

        if (template.answer_type === 'shape_selector') return this.shuffleArray([...Object.values(this.shapeMap)]);
        if (template.answer_type === 'color_picker') return this.shuffleArray([...Object.values(this.colorMap)]);
        if (template.answer_type === 'comparison') return this.shuffleArray([variables.A_EMOJI, variables.B_EMOJI]);

        const options = [];
        const correctNum = Number(correctAnswer);
        if (!isNaN(correctNum)) {
            options.push(String(parseFloat(correctNum.toFixed(4))));
            for (let i = 0; i < 3; i++) {
                let wrong;
                const dir = (Math.random() > 0.5 ? 1 : -1);
                const off = (i + 1) * dir;
                if (Math.abs(correctNum) > 100) wrong = correctNum + off * Math.floor(Math.max(1, Math.abs(correctNum) * 0.05));
                else if (Math.abs(correctNum) > 10) wrong = correctNum + off * Math.floor(Math.max(1, Math.abs(correctNum) * 0.1));
                else if (correctNum !== 0) wrong = correctNum + off;
                else wrong = i + 1;
                if (wrong === correctNum) wrong = correctNum + (i + 2);
                let ws = String(parseFloat(wrong.toFixed(4)));
                let dc = 0;
                while (options.includes(ws) && dc < 20) { wrong++; ws = String(parseFloat(wrong.toFixed(4))); dc++; }
                options.push(ws);
            }
        } else {
            const ng = parseInt(correctAnswer);
            if (!isNaN(ng)) {
                options.push(String(ng));
                const offs = [ng + 2, ng + 4, ng - 2].filter(v => v > 0);
                for (let i = 0; i < 3; i++) {
                    let ws = String(offs[i] || ng + (i + 5));
                    let dc = 0;
                    while (options.includes(ws) && dc < 10) { ws = String(parseInt(ws) + 1); dc++; }
                    options.push(ws);
                }
            } else {
                options.push(String(correctAnswer));
                ['?', '??', '???'].forEach(f => options.push(f));
            }
        }
        return this.shuffleArray(options);
    }

    generateVisualOptions(number, emojiName, variables) {
        const emoji = variables[emojiName] || emojiName;
        const opts = [];
        for (let i = 1; i <= 5; i++) opts.push(emoji.repeat(i));
        return this.shuffleArray(opts);
    }

    calculateNextInPattern(patternType) {
        switch (patternType) {
            case 'ABAB': return '🔴';
            case 'AABB': return '🟡';
            case 'ABCABC': return '🔵';
            default: return '?';
        }
    }

    findCorrectIndex(options, correctAnswer, answerType) {
        if (answerType === 'comparison') return (this.sizeComparison[options[0]] === 'big') ? 0 : 1;
        return options.findIndex(opt => String(opt) === String(correctAnswer));
    }

    generateExplanation(template, variables, answer) {
        if (!template.explanation) return `The correct answer is ${answer}.`;
        let expl = this.resolvePatternText(template.explanation, variables);
        expl = expl.replace(/\[RESULT\]/g, typeof answer === 'number' ? parseFloat(answer.toFixed(4)) : answer);
        return expl;
    }

    checkAnswer(selectedIndex) {
        this.totalAttempts++;
        const isCorrect = selectedIndex === this.currentPuzzle.correctIndex;
        if (isCorrect) { this.score++; return { correct: true, message: 'Yes Correct Answer', explanation: this.currentPuzzle.explanation, level: this.currentPuzzle.level }; }
        return { correct: false, message: 'Please try again', explanation: this.currentPuzzle.explanation, correctAnswer: this.currentPuzzle.correctAnswer, level: this.currentPuzzle.level };
    }

    getStats() {
        return { score: this.score, totalAttempts: this.totalAttempts, accuracy: this.totalAttempts > 0 ? Math.round((this.score / this.totalAttempts) * 100) : 0, currentCategory: this.currentCategory };
    }

    resetScore() { this.score = 0; this.totalAttempts = 0; }

    shuffleArray(array) {
        const s = [...array];
        for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; }
        return s;
    }

    getCategoryDisplayName(categoryKey) { return this.categoryData?.display_name || this.formatCategoryName(categoryKey); }
    formatCategoryName(name) {
        if (this.categoryData && this.categoryData.display_name) return this.categoryData.display_name;
        return name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
}

// ============================================
// UI INTEGRATION
// ============================================
window.voooEngine = new VOOOPuzzleEngine();

async function initVOOOGame() {
    const loaded = await voooEngine.loadCategory('math_beginner');
    if (!loaded) { document.getElementById('vooo-question').textContent = 'Error loading puzzles.'; return; }
    const puzzle = voooEngine.generateNewPuzzle();
    if (puzzle) updatePuzzleDisplay(puzzle);
    else document.getElementById('vooo-question').textContent = 'Error generating puzzle.';
}

function updatePuzzleDisplay(puzzle) {
    document.getElementById('vooo-question').textContent = puzzle.question;
    const container = document.getElementById('vooo-options');
    container.innerHTML = '';
    puzzle.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'vooo-option';
        btn.textContent = option;
        if (typeof option === 'string' && option.length > 2 && !option.match(/^-?[0-9]+(\.[0-9]+)?$/)) btn.style.fontSize = '1.5em';
        btn.onclick = () => selectAnswer(index);
        container.appendChild(btn);
    });
    const fb = document.getElementById('vooo-feedback');
    fb.textContent = ''; fb.className = 'vooo-feedback'; fb.style.cssText = '';
    document.getElementById('vooo-explanation').textContent = '';
    updateStatsDisplay();
}

function selectAnswer(selectedIndex) {
    const result = voooEngine.checkAnswer(selectedIndex);
    const fb = document.getElementById('vooo-feedback');
    const expl = document.getElementById('vooo-explanation');
    const btns = document.getElementById('vooo-options').querySelectorAll('.vooo-option');
    btns.forEach(b => { b.style.backgroundColor = ''; b.style.borderColor = ''; });
    if (result.correct) {
        btns[selectedIndex].style.backgroundColor = '#c6f6d5';
        btns[selectedIndex].style.borderColor = '#9ae6b4';
        fb.textContent = 'Yes Correct Answer'; fb.className = 'vooo-feedback correct';
        expl.textContent = result.explanation;
        setTimeout(nextPuzzle, 3000);
    } else {
        btns[selectedIndex].style.backgroundColor = '#fed7d7';
        btns[selectedIndex].style.borderColor = '#fc8181';
        fb.textContent = 'Please try again'; fb.className = 'vooo-feedback incorrect';
        fb.style.background = 'white'; fb.style.border = '2px solid black';
        fb.style.color = 'red'; fb.style.fontWeight = 'bold';
    }
    updateStatsDisplay();
}

async function nextPuzzle() {
    const puzzle = voooEngine.generateNewPuzzle();
    if (puzzle) updatePuzzleDisplay(puzzle);
}

async function changeLevel(levelKey) {
    const success = await voooEngine.loadCategory(levelKey);
    if (success) { voooEngine.resetScore(); nextPuzzle(); }
}

function updateStatsDisplay() {
    const stats = voooEngine.getStats();
    document.getElementById('vooo-score').textContent = `Score: ${stats.score}`;
    document.getElementById('vooo-accuracy').textContent = `Accuracy: ${stats.accuracy}%`;
}

function resetGame() { voooEngine.resetScore(); nextPuzzle(); }

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initVOOOGame);
else initVOOOGame();
