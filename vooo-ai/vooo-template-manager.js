// ============================================
// VOOO Template Manager v1.0
// Handles randomized, non-repeating template selection
// with localStorage persistence across sessions
// ============================================

class VOOOTemplateManager {
    constructor() {
        this.storagePrefix = 'vooo_progress_';
        this.cleanupOldStorage(); // Remove any old localStorage keys if needed
    }

    /**
     * Fisher-Yates shuffle algorithm for true randomization
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Get storage key for a specific category
     */
    getStorageKey(categoryName) {
        return this.storagePrefix + categoryName;
    }

    /**
     * Initialize or load progress for a category
     * @param {string} categoryName - Name of the puzzle category
     * @param {number} totalTemplates - Total number of templates in this category
     * @returns {object} Progress object with shuffledIndices and currentIndex
     */
    initializeCategory(categoryName, totalTemplates) {
        const storageKey = this.getStorageKey(categoryName);
        
        try {
            const stored = localStorage.getItem(storageKey);
            
            if (stored) {
                const progress = JSON.parse(stored);
                
                // Validate stored data
                if (progress.shuffledIndices && 
                    progress.shuffledIndices.length === totalTemplates &&
                    progress.currentIndex !== undefined) {
                    
                    console.log(`📂 Loaded progress for ${categoryName}: Template ${progress.currentIndex + 1}/${totalTemplates}`);
                    return progress;
                }
            }
        } catch (error) {
            console.warn('Error loading stored progress:', error);
        }

        // Create new shuffled sequence
        const indices = Array.from({ length: totalTemplates }, (_, i) => i);
        const shuffledIndices = this.shuffleArray(indices);
        
        const newProgress = {
            shuffledIndices: shuffledIndices,
            currentIndex: 0,
            lastShuffleDate: new Date().toISOString()
        };

        this.saveProgress(categoryName, newProgress);
        console.log(`🎲 Created new random sequence for ${categoryName}: ${shuffledIndices.slice(0, 5)}...`);
        
        return newProgress;
    }

    /**
     * Get the next template index for a category
     * @param {string} categoryName - Name of the puzzle category
     * @param {number} totalTemplates - Total number of templates
     * @returns {number} The actual template index to use
     */
    getNextTemplateIndex(categoryName, totalTemplates) {
        const storageKey = this.getStorageKey(categoryName);
        let progress = this.initializeCategory(categoryName, totalTemplates);

        // Get current template index from shuffled sequence
        const templateIndex = progress.shuffledIndices[progress.currentIndex];
        
        // Move to next position
        progress.currentIndex++;

        // Check if we've completed all templates
        if (progress.currentIndex >= progress.shuffledIndices.length) {
            console.log(`🔄 All templates completed for ${categoryName}! Reshuffling...`);
            
            // Reshuffle and start over
            const indices = Array.from({ length: totalTemplates }, (_, i) => i);
            progress.shuffledIndices = this.shuffleArray(indices);
            progress.currentIndex = 0;
            progress.lastShuffleDate = new Date().toISOString();
        }

        // Save updated progress
        this.saveProgress(categoryName, progress);

        console.log(`📍 ${categoryName}: Using template ${templateIndex} (Progress: ${progress.currentIndex}/${totalTemplates})`);
        
        return templateIndex;
    }

    /**
     * Save progress to localStorage
     */
    saveProgress(categoryName, progress) {
        const storageKey = this.getStorageKey(categoryName);
        try {
            localStorage.setItem(storageKey, JSON.stringify(progress));
        } catch (error) {
            console.error('Error saving progress to localStorage:', error);
        }
    }

    /**
     * Reset progress for a specific category
     * (Creates new random sequence)
     */
    resetCategory(categoryName, totalTemplates) {
        const storageKey = this.getStorageKey(categoryName);
        localStorage.removeItem(storageKey);
        console.log(`🔄 Reset ${categoryName}`);
        return this.initializeCategory(categoryName, totalTemplates);
    }

    /**
     * Reset all progress (useful for testing or fresh start)
     */
    resetAll() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.storagePrefix)) {
                localStorage.removeItem(key);
            }
        });
        console.log('🔄 Reset all VOOO progress');
    }

    /**
     * Get current progress info for a category
     */
    getProgress(categoryName, totalTemplates) {
        const progress = this.initializeCategory(categoryName, totalTemplates);
        return {
            current: progress.currentIndex,
            total: totalTemplates,
            remaining: totalTemplates - progress.currentIndex,
            percentComplete: Math.round((progress.currentIndex / totalTemplates) * 100)
        };
    }

    /**
     * Cleanup old storage keys (if storage format changed)
     */
    cleanupOldStorage() {
        // Add any cleanup logic here if you change storage format in future
    }
}

// ============================================
// INTEGRATION HELPERS
// ============================================

/**
 * Helper function to integrate with VOOOPuzzleEngine
 * Modifies the generateNewPuzzle method to use template manager
 */
function integrateWithPuzzleEngine(engine, templateManager) {
    // Store original method
    const originalGenerate = engine.generateNewPuzzle.bind(engine);

    // Override generateNewPuzzle
    engine.generateNewPuzzle = function() {
        if (!this.categoryData || !this.categoryData.templates) {
            console.error('No category data or templates found');
            return null;
        }

        const templates = this.categoryData.templates;
        const totalTemplates = templates.length;

        // Get next random template index from manager
        const templateIndex = templateManager.getNextTemplateIndex(
            this.currentCategory, 
            totalTemplates
        );

        // Use that specific template
        this.currentTemplate = templates[templateIndex];
        
        console.log(`🎯 Using template: ${this.currentTemplate.template_id} (Index: ${templateIndex})`);

        // Generate puzzle from template (same as before)
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
    };

    console.log('✅ Integrated Template Manager with Puzzle Engine');
}

/**
 * Helper function to integrate with VoooReasoningLoader
 */
function integrateWithReasoningLoader(loader, templateManager) {
    // Store original method
    const originalGenerate = loader.generateNext.bind(loader);

    // Override generateNext
    loader.generateNext = function() {
        if (!this.puzzleData || !this.puzzleData.templates.length) {
            console.error('No puzzle data loaded');
            return null;
        }

        const templates = this.puzzleData.templates;
        const totalTemplates = templates.length;

        // Get current category name (derive from puzzle type or set manually)
        const categoryName = this.puzzleData.puzzle_type || 'reasoning_default';

        // Get next random template index from manager
        const templateIndex = templateManager.getNextTemplateIndex(
            categoryName, 
            totalTemplates
        );

        // Use that specific template
        const template = templates[templateIndex];
        
        console.log(`🎯 Reasoning: Using template ${templateIndex}: ${template.template_id}`);

        // Generate puzzle from template
        return this.engine.generatePuzzle(template, this.puzzleData.responses);
    };

    console.log('✅ Integrated Template Manager with Reasoning Loader');
}

// ============================================
// GLOBAL INSTANCE
// ============================================

// Create global template manager instance
window.voooTemplateManager = new VOOOTemplateManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        VOOOTemplateManager, 
        integrateWithPuzzleEngine,
        integrateWithReasoningLoader
    };
}

console.log('🎲 VOOO Template Manager initialized');
