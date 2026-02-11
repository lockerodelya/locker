// ============================================
// VOOO Math Helper Library
// Advanced mathematical functions for puzzle engine
// ============================================

const VOOOMathHelper = {

    // ============================================
    // BASIC MATH FUNCTIONS
    // ============================================

    gcd(a, b) {
        a = Math.abs(Math.floor(a));
        b = Math.abs(Math.floor(b));
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    },

    lcm(a, b) {
        return Math.abs(Math.floor(a * b)) / this.gcd(a, b);
    },

    factorial(n) {
        n = Math.floor(n);
        if (n < 0) return 0;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    },

    is_prime(n) {
        n = Math.floor(n);
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    },

    // ============================================
    // COMBINATORICS
    // ============================================

    binomial_coefficient(n, k) {
        n = Math.floor(n);
        k = Math.floor(k);
        if (k < 0 || k > n) return 0;
        if (k === 0 || k === n) return 1;
        k = Math.min(k, n - k);
        let result = 1;
        for (let i = 0; i < k; i++) {
            result *= (n - i);
            result /= (i + 1);
        }
        return Math.round(result);
    },

    permutations(n, k) {
        n = Math.floor(n);
        k = Math.floor(k);
        if (k < 0 || k > n) return 0;
        let result = 1;
        for (let i = 0; i < k; i++) {
            result *= (n - i);
        }
        return result;
    },

    // ============================================
    // TRIGONOMETRY
    // ============================================

    sin_degrees(angle) {
        const rad = (angle * Math.PI) / 180;
        const result = Math.sin(rad);
        return parseFloat(result.toFixed(4));
    },

    cos_degrees(angle) {
        const rad = (angle * Math.PI) / 180;
        const result = Math.cos(rad);
        return parseFloat(result.toFixed(4));
    },

    tan_degrees(angle) {
        const rad = (angle * Math.PI) / 180;
        const result = Math.tan(rad);
        // Handle very large values (approaching infinity)
        if (Math.abs(result) > 1000000) {
            return 'undefined';
        }
        return parseFloat(result.toFixed(4));
    },

    // ============================================
    // LOGARITHMS
    // ============================================

    log_base_2(x) {
        if (x <= 0) return 'undefined';
        return Math.log2(x);
    },

    log_base_10(x) {
        if (x <= 0) return 'undefined';
        return Math.log10(x);
    },

    // ============================================
    // STATISTICS
    // ============================================

    median_of_five(a, b, c, d, e) {
        const arr = [a, b, c, d, e].sort((x, y) => x - y);
        return arr[2]; // Middle element
    },

    mean(arr) {
        return arr.reduce((sum, val) => sum + val, 0) / arr.length;
    },

    variance(arr) {
        const m = this.mean(arr);
        const squaredDiffs = arr.map(x => (x - m) ** 2);
        return this.mean(squaredDiffs);
    },

    // ============================================
    // ALGEBRA - QUADRATIC EQUATIONS
    // ============================================

    quadratic_solution(a, b, c) {
        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) {
            return 'No real solution';
        }
        
        if (discriminant === 0) {
            return parseFloat((-b / (2 * a)).toFixed(4));
        }
        
        const sqrt_disc = Math.sqrt(discriminant);
        const sol1 = (-b + sqrt_disc) / (2 * a);
        const sol2 = (-b - sqrt_disc) / (2 * a);
        
        // Return the positive solution or the larger one
        return parseFloat(Math.max(sol1, sol2).toFixed(4));
    },

    // ============================================
    // LINEAR ALGEBRA - SYSTEMS OF EQUATIONS
    // ============================================

    solve_system_x(a, b, c, d, e, f) {
        // Solve: ax + by = c
        //        dx + ey = f
        const determinant = a * e - b * d;
        
        if (determinant === 0) {
            return 'No unique solution';
        }
        
        const x = (c * e - b * f) / determinant;
        return parseFloat(x.toFixed(4));
    },

    slope_between_points(x1, y1, x2, y2) {
        if (x2 === x1) {
            return 'undefined';
        }
        const slope = (y2 - y1) / (x2 - x1);
        return parseFloat(slope.toFixed(4));
    },

    // ============================================
    // PROBABILITY
    // ============================================

    dice_probability(sum) {
        // Probability of getting sum with 2 dice
        const favorable_outcomes = {
            2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6,
            8: 5, 9: 4, 10: 3, 11: 2, 12: 1
        };
        const count = favorable_outcomes[sum] || 0;
        const prob = count / 36;
        return parseFloat(prob.toFixed(4));
    },

    binomial_probability(n, k, p) {
        const coef = this.binomial_coefficient(n, k);
        const prob = coef * Math.pow(p, k) * Math.pow(1 - p, n - k);
        return parseFloat(prob.toFixed(4));
    },

    // ============================================
    // NUMBER THEORY
    // ============================================

    mod_inverse(a, m) {
        // Extended Euclidean Algorithm
        a = ((a % m) + m) % m;
        
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 'No inverse';
    },

    euler_phi(n) {
        n = Math.floor(n);
        let result = n;
        
        for (let p = 2; p * p <= n; p++) {
            if (n % p === 0) {
                while (n % p === 0) {
                    n /= p;
                }
                result -= result / p;
            }
        }
        
        if (n > 1) {
            result -= result / n;
        }
        
        return Math.floor(result);
    },

    element_order(a, n) {
        // Find order of element a in Z_n
        for (let k = 1; k <= n; k++) {
            if ((k * a) % n === 0) {
                return k;
            }
        }
        return n;
    },

    // ============================================
    // SEQUENCES AND SERIES
    // ============================================

    fibonacci(n) {
        n = Math.floor(n);
        if (n <= 0) return 0;
        if (n === 1) return 1;
        
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            const temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    },

    geometric_series_sum(r, n) {
        // Sum of geometric series: 1 + r + r^2 + ... + r^(n-1)
        if (r === 1) return n;
        return parseFloat(((1 - Math.pow(r, n)) / (1 - r)).toFixed(4));
    },

    // ============================================
    // HELPER UTILITIES
    // ============================================

    round_to_decimals(num, decimals = 4) {
        if (typeof num !== 'number') return num;
        return parseFloat(num.toFixed(decimals));
    }
};

// ============================================
// INTEGRATION WITH VOOO ENGINE
// ============================================

// Extend the VOOOPuzzleEngine to use math helper
if (typeof VOOOPuzzleEngine !== 'undefined') {
    VOOOPuzzleEngine.prototype.evaluateExpression = function(expr, variables) {
        console.log('Evaluating expression:', expr, 'with variables:', variables);
        
        // Replace variable names with their values
        let evaluated = expr;
        for (const [varName, value] of Object.entries(variables)) {
            const regex = new RegExp('\\b' + varName + '\\b', 'g');
            evaluated = evaluated.replace(regex, JSON.stringify(value));
        }
        
        console.log('After variable substitution:', evaluated);
        
        // Handle custom functions from original engine
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
        
        // Handle math helper functions
        const mathFunctions = {
            'gcd': VOOOMathHelper.gcd,
            'lcm': VOOOMathHelper.lcm,
            'factorial': VOOOMathHelper.factorial,
            'is_prime': VOOOMathHelper.is_prime,
            'binomial_coefficient': VOOOMathHelper.binomial_coefficient,
            'permutations': VOOOMathHelper.permutations,
            'sin_degrees': VOOOMathHelper.sin_degrees,
            'cos_degrees': VOOOMathHelper.cos_degrees,
            'tan_degrees': VOOOMathHelper.tan_degrees,
            'log_base_2': VOOOMathHelper.log_base_2,
            'log_base_10': VOOOMathHelper.log_base_10,
            'median_of_five': VOOOMathHelper.median_of_five,
            'quadratic_solution': VOOOMathHelper.quadratic_solution,
            'solve_system_x': VOOOMathHelper.solve_system_x,
            'slope_between_points': VOOOMathHelper.slope_between_points,
            'dice_probability': VOOOMathHelper.dice_probability,
            'binomial_probability': VOOOMathHelper.binomial_probability,
            'mod_inverse': VOOOMathHelper.mod_inverse,
            'euler_phi': VOOOMathHelper.euler_phi,
            'element_order': VOOOMathHelper.element_order,
            'fibonacci': VOOOMathHelper.fibonacci,
            'geometric_series_sum': VOOOMathHelper.geometric_series_sum
        };
        
        // Replace function calls
        for (const [funcName, funcImpl] of Object.entries(mathFunctions)) {
            const funcRegex = new RegExp(funcName + '\\(([^)]+)\\)', 'g');
            evaluated = evaluated.replace(funcRegex, (match, args) => {
                try {
                    const argValues = args.split(',').map(arg => {
                        const trimmed = arg.trim();
                        // Try to evaluate the argument
                        try {
                            return new Function('Math', 'return ' + trimmed)(Math);
                        } catch {
                            return trimmed;
                        }
                    });
                    const result = funcImpl.apply(VOOOMathHelper, argValues);
                    return JSON.stringify(result);
                } catch (e) {
                    console.error(`Error calling ${funcName}:`, e);
                    return '0';
                }
            });
        }
        
        console.log('After function processing:', evaluated);
        
        // Evaluate the expression
        try {
            // Handle JSON strings
            if (evaluated.startsWith('[') && evaluated.endsWith(']')) {
                try {
                    return JSON.parse(evaluated);
                } catch (e) {
                    console.error('Error parsing array:', evaluated, e);
                    return [];
                }
            }
            
            // Handle quoted strings
            if ((evaluated.startsWith('"') && evaluated.endsWith('"')) || 
                (evaluated.startsWith("'") && evaluated.endsWith("'"))) {
                return evaluated.slice(1, -1);
            }
            
            // Handle booleans
            if (evaluated === 'true') return true;
            if (evaluated === 'false') return false;
            
            // Handle numbers
            if (!isNaN(evaluated) && evaluated.trim() !== '') {
                return Number(evaluated);
            }
            
            // Handle simple variable names
            if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(evaluated)) {
                return evaluated;
            }
            
            // Evaluate complex expressions
            const result = new Function('Math', 'return ' + evaluated)(Math);
            console.log('Evaluation result:', result);
            
            // Round numbers to 4 decimal places
            if (typeof result === 'number') {
                return parseFloat(result.toFixed(4));
            }
            
            return result;
        } catch (e) {
            console.error('Error evaluating expression:', expr, '->', evaluated, e);
            return expr;
        }
    };
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VOOOMathHelper;
}
