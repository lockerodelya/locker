/**
 * ═══════════════════════════════════════════════════════════════
 * VOOO REASONING ENGINE v2.0
 * Universal engine for all reasoning types
 * Compatible with vooo-math-helper.js and vooo_puzzle_engine.js
 * ═══════════════════════════════════════════════════════════════
 */

class VoooReasoningEngine {
    constructor() {
        this.currentPuzzle = null;
        this.currentTemplate = null;
        this.generatedValues = {};
        this.correctAnswer = null;
        this.responses = null;
    }

    /**
     * Generate a random integer between min and max (inclusive)
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Select random value from array
     */
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Generate variable values based on template definition
     */
    generateVariables(variables) {
        const values = {};
        
        for (const [varName, config] of Object.entries(variables)) {
            if (config.values) {
                // Array of specific values
                values[varName] = this.randomChoice(config.values);
            } else if (config.min !== undefined && config.max !== undefined) {
                // Range with optional step
                const step = config.step || 1;
                const range = config.max - config.min;
                const steps = Math.floor(range / step) + 1;
                const randomStep = Math.floor(Math.random() * steps);
                values[varName] = config.min + (randomStep * step);
            } else if (Array.isArray(config)) {
                // Direct array
                values[varName] = this.randomChoice(config);
            } else {
                // Default to config value if it's a direct value
                values[varName] = config;
            }
        }
        
        return values;
    }

    /**
     * Replace variables in pattern string
     */
    replacePlaceholders(pattern, values) {
        let result = pattern;
        
        // Replace all [VARNAME] with actual values
        for (const [varName, value] of Object.entries(values)) {
            const regex = new RegExp(`\\[${varName}\\]`, 'g');
            result = result.replace(regex, value);
        }
        
        return result;
    }

    /**
     * Safely evaluate calculation string
     */
    calculateAnswer(calculation, values) {
        try {
            // Create a function that has access to all variables
            const varNames = Object.keys(values);
            const varValues = Object.values(values);
            
            // Handle string literals in calculation
            if (calculation.startsWith("'") || calculation.startsWith('"')) {
                return calculation.slice(1, -1); // Remove quotes
            }
            
            // Create safe evaluation context
            const func = new Function(...varNames, 'Math', `
                "use strict";
                return ${calculation};
            `);
            
            return func(...varValues, Math);
        } catch (error) {
            console.error('Calculation error:', error, 'Calculation:', calculation);
            return null;
        }
    }

    /**
     * Generate a puzzle from template
     */
    generatePuzzle(template, responses) {
        this.currentTemplate = template;
        this.responses = responses;
        
        // Generate variable values
        this.generatedValues = this.generateVariables(template.variables || {});
        
        // Replace placeholders in pattern
        const question = this.replacePlaceholders(template.pattern, this.generatedValues);
        
        // Calculate correct answer
        this.correctAnswer = this.calculateAnswer(template.calculation, this.generatedValues);
        
        // Create explanation
        let explanation = this.replacePlaceholders(template.explanation, this.generatedValues);
        explanation = explanation.replace('[RESULT]', this.correctAnswer);
        
        this.currentPuzzle = {
            id: template.template_id,
            question: question,
            answer: this.correctAnswer,
            explanation: explanation
        };
        
        return this.currentPuzzle;
    }

    /**
     * Check if user's answer is correct
     */
    checkAnswer(userAnswer) {
        if (!this.correctAnswer) return false;
        
        // Handle numeric answers
        if (typeof this.correctAnswer === 'number') {
            const numAnswer = parseFloat(userAnswer);
            return Math.abs(numAnswer - this.correctAnswer) < 0.01; // Allow small floating point errors
        }
        
        // Handle string answers (case-insensitive)
        if (typeof this.correctAnswer === 'string') {
            return userAnswer.toString().toLowerCase().trim() === 
                   this.correctAnswer.toLowerCase().trim();
        }
        
        // Direct comparison for other types
        return userAnswer == this.correctAnswer;
    }

    /**
     * Get random response message
     */
    getResponse(isCorrect) {
        if (!this.responses) return isCorrect ? 'Correct!' : 'Try again!';
        
        const messages = isCorrect ? this.responses.correct : this.responses.incorrect;
        return this.randomChoice(messages);
    }

    /**
     * Get current puzzle info
     */
    getCurrentPuzzle() {
        return this.currentPuzzle;
    }

    /**
     * Get correct answer (for debugging/showing solution)
     */
    getCorrectAnswer() {
        return this.correctAnswer;
    }
}

/**
 * ═══════════════════════════════════════════════════════════════
 * VOOO REASONING LOADER
 * Loads and manages reasoning JSON files
 * ═══════════════════════════════════════════════════════════════
 */

class VoooReasoningLoader {
    constructor() {
        this.puzzleData = null;
        this.engine = new VoooReasoningEngine();
        this.currentTemplateIndex = 0;
    }

    /**
     * Load puzzle data from JSON
     */
    async loadPuzzle(jsonPath) {
        try {
            const response = await fetch(jsonPath);
            this.puzzleData = await response.json();
            this.currentTemplateIndex = 0;
            return true;
        } catch (error) {
            console.error('Error loading puzzle:', error);
            return false;
        }
    }

    /**
     * Get puzzle metadata
     */
    getPuzzleInfo() {
        if (!this.puzzleData) return null;
        
        return {
            type: this.puzzleData.puzzle_type,
            displayName: this.puzzleData.display_name,
            totalTemplates: this.puzzleData.templates.length
        };
    }

    /**
     * Generate next puzzle
     */
    generateNext() {
        if (!this.puzzleData || !this.puzzleData.templates.length) {
            console.error('No puzzle data loaded');
            return null;
        }
        
        // Get random template
        const template = this.puzzleData.templates[
            Math.floor(Math.random() * this.puzzleData.templates.length)
        ];
        
        // Generate puzzle from template
        return this.engine.generatePuzzle(template, this.puzzleData.responses);
    }

    /**
     * Check user answer
     */
    checkAnswer(userAnswer) {
        return this.engine.checkAnswer(userAnswer);
    }

    /**
     * Get response message
     */
    getResponseMessage(isCorrect) {
        return this.engine.getResponse(isCorrect);
    }

    /**
     * Get current puzzle
     */
    getCurrentPuzzle() {
        return this.engine.getCurrentPuzzle();
    }

    /**
     * Get correct answer
     */
    getCorrectAnswer() {
        return this.engine.getCorrectAnswer();
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoooReasoningEngine, VoooReasoningLoader };
}
