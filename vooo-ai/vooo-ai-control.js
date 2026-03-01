// ============================================================
// vooo-ai-control.js
// Central control file for Vooo AI Education
// Edit THIS file only — never touch vooo-ai.html
// ============================================================


// ============================================================
// ⭐ STEP 1: ENGINE REGISTRY
// Add one line per new JSON/engine here
// ============================================================
const VOOO_ENGINE_REGISTRY = {
    'basic-math-level-1' : '/vooo-ai/vooo-ai-engine-mathl1.js',
    'basic-math-level-2' : '/vooo-ai/vooo-ai-engine-mathl2.js',
    'basic-math-level-3' : '/vooo-ai/vooo-ai-engine-mathl3.js',
    'basic-math-level-4' : '/vooo-ai/vooo-ai-engine-mathl4.js',
    'basic-math-level-5' : '/vooo-ai/vooo-ai-engine-mathl5.js',
    'basic-math-level-6' : '/vooo-ai/vooo-ai-engine-mathl6.js',
    'basic-math-level-7' : '/vooo-ai/vooo-ai-engine-mathl7.js',
    'basic-reason-level-1' : '/vooo-ai/vooo-ai-engine-basic-reasonl1.js',
    'basic-reason-level-2' : '/vooo-ai/vooo-ai-engine-basic-reasonl2.js',
    'basic-reason-level-3' : '/vooo-ai/vooo-ai-engine-basic-reasonl3.js',
    'basic-reason-level-4' : '/vooo-ai/vooo-ai-engine-basic-reasonl4.js',
    'basic-reason-level-5' : '/vooo-ai/vooo-ai-engine-basic-reasonl5.js',
    'basic-reason-level-6' : '/vooo-ai/vooo-ai-engine-basic-reasonl6.js',
    'basic-reason-level-7' : '/vooo-ai/vooo-ai-engine-basic-reasonl7.js',
    'basic-reason-level-8' : '/vooo-ai/vooo-ai-engine-basic-reasonl8.js',
    'basic-reason-level-9' : '/vooo-ai/vooo-ai-engine-basic-reasonl9.js',
    'basic-gk-level-1'  : '/vooo-ai/vooo-ai-engine-basic-gkl1.js',
    'basic-gk-level-2'  : '/vooo-ai/vooo-ai-engine-basic-gkl2.js',
    'basic-gk-level-3'  : '/vooo-ai/vooo-ai-engine-basic-gkl3.js',
    'basic-gk-level-4'  : '/vooo-ai/vooo-ai-engine-basic-gkl4.js',
    'basic-gk-level-5'  : '/vooo-ai/vooo-ai-engine-basic-gkl5.js',
    'basic-gk-level-6'  : '/vooo-ai/vooo-ai-engine-basic-gkl6.js',
    'basic-gk-level-7'  : '/vooo-ai/vooo-ai-engine-basic-gkl7.js',
    'basic-gk-level-8'  : '/vooo-ai/vooo-ai-engine-basic-gkl8.js',
    'basic-gk-level-9'  : '/vooo-ai/vooo-ai-engine-basic-gkl9.js',
    'basic-gk-level-10' : '/vooo-ai/vooo-ai-engine-basic-gkl10.js',
	'basic-gk-level-11' : '/vooo-ai/vooo-ai-engine-basic-gkl11.js',
	'basic-gk-level-12' : '/vooo-ai/vooo-ai-engine-basic-gkl12.js',
	'basic-gk-level-13' : '/vooo-ai/vooo-ai-engine-basic-gkl13.js',
	'basic-gk-level-14' : '/vooo-ai/vooo-ai-engine-basic-gkl14.js',
	'basic-gk-level-15' : '/vooo-ai/vooo-ai-engine-basic-gkl15.js',
	'basic-gk-level-16' : '/vooo-ai/vooo-ai-engine-basic-gkl16.js',
	'basic-gk-level-17' : '/vooo-ai/vooo-ai-engine-basic-gkl17.js',
	'basic-gk-level-18' : '/vooo-ai/vooo-ai-engine-basic-gkl18.js',
	'basic-gk-level-19' : '/vooo-ai/vooo-ai-engine-basic-gkl19.js',
	'basic-gk-level-20' : '/vooo-ai/vooo-ai-engine-basic-gkl20.js',
	'basic-gk-level-21' : '/vooo-ai/vooo-ai-engine-basic-gkl21.js',
	'basic-gk-level-22' : '/vooo-ai/vooo-ai-engine-basic-gkl22.js',
	'basic-gk-level-23' : '/vooo-ai/vooo-ai-engine-basic-gkl23.js',
	'basic-gk-level-24' : '/vooo-ai/vooo-ai-engine-basic-gkl24.js',
	'basic-gk-level-25' : '/vooo-ai/vooo-ai-engine-basic-gkl25.js',
	'basic-gk-level-26' : '/vooo-ai/vooo-ai-engine-basic-gkl26.js',
	'basic-gk-level-27' : '/vooo-ai/vooo-ai-engine-basic-gkl27.js',
	'numeracy-ratios-level-1' : '/vooo-ai/vooo-ai-engine-ratiosl1.js',
	'numeracy-compound-level-1' : '/vooo-ai/vooo-ai-engine.js',
	'numeracy-timespeed-level-1' : '/vooo-ai/vooo-ai-engine.js',
	'numeracy-numbersys-level-1' : '/vooo-ai/vooo-ai-engine.js',
	'interpretation-tabledata-level-1' : '/vooo-ai/vooo-ai-engine.js',
	'interpretation-bargraph-level-1' : '/vooo-ai/vooo-ai-engine.js',
	'interpretation-linegraph-level-1' : '/vooo-ai/vooo-ai-engine-linegraphl1.js',
	'numeracy-percentage-level-1' : '/vooo-ai/vooo-ai-engine.js',
	
    // --- ADD NEW ENGINES BELOW THIS LINE ---
};


// ============================================================
// ⭐ STEP 2: ENGINE INSTANCE NAMES
// Must match _ENGINE_INSTANCE_NAME inside each engine file
// ============================================================
const VOOO_ENGINE_INSTANCES = {
    'basic-math-level-1' : 'voooEngineBasicMathL1',
    'basic-math-level-2' : 'voooEngineBasicMathL2',
    'basic-math-level-3' : 'voooEngineBasicMathL3',
    'basic-math-level-4' : 'voooEngineBasicMathL4',
    'basic-math-level-5' : 'voooEngineBasicMathL5',
    'basic-math-level-6' : 'voooEngineBasicMathL6',
    'basic-math-level-7' : 'voooEngineBasicMathL7',
    'basic-reason-level-1' : 'voooEngineBasicReasonL1',
    'basic-reason-level-2' : 'voooEngineBasicReasonL2',
    'basic-reason-level-3' : 'voooEngineBasicReasonL3',
    'basic-reason-level-4' : 'voooEngineBasicReasonL4',
    'basic-reason-level-5' : 'voooEngineBasicReasonL5',
    'basic-reason-level-6' : 'voooEngineBasicReasonL6',
    'basic-reason-level-7' : 'voooEngineBasicReasonL7',
    'basic-reason-level-8' : 'voooEngineBasicReasonL8',
    'basic-reason-level-9' : 'voooEngineBasicReasonL9',
    'basic-gk-level-1'  : 'voooEngineBasicGKL1',
    'basic-gk-level-2'  : 'voooEngineBasicGKL2',
    'basic-gk-level-3'  : 'voooEngineBasicGKL3',
    'basic-gk-level-4'  : 'voooEngineBasicGKL4',
    'basic-gk-level-5'  : 'voooEngineBasicGKL5',
    'basic-gk-level-6'  : 'voooEngineBasicGKL6',
    'basic-gk-level-7'  : 'voooEngineBasicGKL7',
    'basic-gk-level-8'  : 'voooEngineBasicGKL8',
    'basic-gk-level-9'  : 'voooEngineBasicGKL9',
    'basic-gk-level-10' : 'voooEngineBasicGKL10',
	'basic-gk-level-11' : 'voooEngineBasicGKL11',
	'basic-gk-level-12' : 'voooEngineBasicGKL12',
	'basic-gk-level-13' : 'voooEngineBasicGKL13',
	'basic-gk-level-14' : 'voooEngineBasicGKL14',
	'basic-gk-level-15' : 'voooEngineBasicGKL15',
	'basic-gk-level-16' : 'voooEngineBasicGKL16',
	'basic-gk-level-17' : 'voooEngineBasicGKL17',
	'basic-gk-level-18' : 'voooEngineBasicGKL18',
	'basic-gk-level-19' : 'voooEngineBasicGKL19',
	'basic-gk-level-20' : 'voooEngineBasicGKL20',
	'basic-gk-level-21' : 'voooEngineBasicGKL21',
	'basic-gk-level-22' : 'voooEngineBasicGKL22',
	'basic-gk-level-23' : 'voooEngineBasicGKL23',
	'basic-gk-level-24' : 'voooEngineBasicGKL24',
	'basic-gk-level-25' : 'voooEngineBasicGKL25',
	'basic-gk-level-26' : 'voooEngineBasicGKL26',
	'basic-gk-level-27' : 'voooEngineBasicGKL27',
	'numeracy-ratios-level-1' : 'voooEngineRatiosl1',
	'numeracy-compound-level-1' : 'voooEngineCompoundl1',
	'numeracy-timespeed-level-1' : 'voooEngineTimespeedl1',
	'numeracy-numbersys-level-1' : 'voooEngineNumbersysl1',
	'interpretation-tabledata-level-1' : 'voooEngineTabledatal1',
	'interpretation-bargraph-level-1' : 'voooEngineBargraphl1',
	'interpretation-linegraph-level-1' : 'voooEngineLinegraphl1',
	'numeracy-percentage-level-1' : 'voooEnginePercentagel1',
	
    // --- ADD NEW ENGINES BELOW THIS LINE ---
};


// ============================================================
// ⭐ STEP 3: DROPDOWN OPTIONS
// Add new optgroup or option here to appear in the dropdown
// ============================================================
(function buildDropdown() {
    document.addEventListener('DOMContentLoaded', function () {
        const select = document.getElementById('vooo-category-select');
        if (!select) return;

        const groups = [
            {
                label: 'Basic Math',
                options: [
                    { value: 'basic-math-level-1', text: '• Basic Math Level 1' },
                    { value: 'basic-math-level-2', text: '• Basic Math Level 2' },
                    { value: 'basic-math-level-3', text: '• Basic Math Level 3' },
                    { value: 'basic-math-level-4', text: '• Basic Math Level 4' },
                    { value: 'basic-math-level-5', text: '• Basic Math Level 5' },
                    { value: 'basic-math-level-6', text: '• Basic Math Level 6' },
                    { value: 'basic-math-level-7', text: '• Basic Math Level 7' },
                ]
            },
            {
                label: 'Basic Reasoning',
                options: [
                    { value: 'basic-reason-level-1', text: '• Basic Reasoning Level 1' },
                    { value: 'basic-reason-level-2', text: '• Basic Reasoning Level 2' },
                    { value: 'basic-reason-level-3', text: '• Basic Reasoning Level 3' },
                    { value: 'basic-reason-level-4', text: '• Basic Reasoning Level 4' },
                    { value: 'basic-reason-level-5', text: '• Basic Reasoning Level 5' },
                    { value: 'basic-reason-level-6', text: '• Basic Reasoning Level 6' },
                    { value: 'basic-reason-level-7', text: '• Basic Reasoning Level 7' },
                    { value: 'basic-reason-level-8', text: '• Basic Reasoning Level 8' },
                    { value: 'basic-reason-level-9', text: '• Basic Reasoning Level 9' },
                ]
            },
            {
                label: 'Basic General Knowledge',
                options: [
                    { value: 'basic-gk-level-1',  text: '• Basic General Knowledge Level 1' },
                    { value: 'basic-gk-level-2',  text: '• Basic General Knowledge Level 2' },
                    { value: 'basic-gk-level-3',  text: '• Basic General Knowledge Level 3' },
                    { value: 'basic-gk-level-4',  text: '• Basic General Knowledge Level 4' },
                    { value: 'basic-gk-level-5',  text: '• Basic General Knowledge Level 5' },
                    { value: 'basic-gk-level-6',  text: '• Basic General Knowledge Level 6' },
                    { value: 'basic-gk-level-7',  text: '• Basic General Knowledge Level 7' },
                    { value: 'basic-gk-level-8',  text: '• Basic General Knowledge Level 8' },
                    { value: 'basic-gk-level-9',  text: '• Basic General Knowledge Level 9' },
                    { value: 'basic-gk-level-10', text: '• Basic General Knowledge Level 10' },
					{ value: 'basic-gk-level-11', text: '• Basic General Knowledge Level 11' },
					{ value: 'basic-gk-level-12', text: '• Basic General Knowledge Level 12' },
					{ value: 'basic-gk-level-13', text: '• Basic General Knowledge Level 13' },
					{ value: 'basic-gk-level-14', text: '• Basic General Knowledge Level 14' },
					{ value: 'basic-gk-level-15', text: '• Basic General Knowledge Level 15' },
					{ value: 'basic-gk-level-16', text: '• Basic General Knowledge Level 16' },
					{ value: 'basic-gk-level-17', text: '• Basic General Knowledge Level 17' },
					{ value: 'basic-gk-level-18', text: '• Basic General Knowledge Level 18' },
					{ value: 'basic-gk-level-19', text: '• Basic General Knowledge Level 19' },
					{ value: 'basic-gk-level-20', text: '• Basic General Knowledge Level 20' },
					{ value: 'basic-gk-level-21', text: '• Basic General Knowledge Level 21' },
					{ value: 'basic-gk-level-22', text: '• Basic General Knowledge Level 22' },
					{ value: 'basic-gk-level-23', text: '• Basic General Knowledge Level 23' },
					{ value: 'basic-gk-level-24', text: '• Basic General Knowledge Level 24' },
					{ value: 'basic-gk-level-25', text: '• Basic General Knowledge Level 25' },
					{ value: 'basic-gk-level-26', text: '• Basic General Knowledge Level 26' },
					{ value: 'basic-gk-level-27', text: '• Basic General Knowledge Level 27' },
                ]
            },
            {
                label: 'Numeracy (Class X) Level 1',
                options: [
                    { value: 'numeracy-ratios-level-1', text: '• Ratios Level 1' },
                    { value: 'numeracy-compound-level-1', text: '• Compound Level 1' },
                    { value: 'numeracy-timespeed-level-1', text: '• Time Speed Level 1' },
                    { value: 'numeracy-numbersys-level-1', text: '• Number System Level 1' },
                    { value: 'interpretation-tabledata-level-1', text: '• Table Data Level 1' },
                    { value: 'interpretation-bargraph-level-1', text: '• Bar Graph Level 1' },
                    { value: 'interpretation-linegraph-level-1', text: '• Line Graph Level 1' },
					{ value: 'numeracy-percentage-level-1', text: '• Percentae Level 1' },
                ]
            },
			
            // --- ADD NEW OPTGROUP BELOW THIS LINE ---
        ];

        groups.forEach(function (group) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.label;
            group.options.forEach(function (item) {
                const opt = document.createElement('option');
                opt.value = item.value;
                opt.textContent = item.text;
                optgroup.appendChild(opt);
            });
            select.appendChild(optgroup);
        });
    });
})();


// ============================================================
// ⭐ STEP 4: FREE USER LIMIT + AUTH GUARD
// Applied every time engine changes — fixes the bug where
// limit only worked on basic-math-level-1
// ============================================================
const FREE_USER_MCQ_LIMIT = 30;

// This function wraps the active engine's generateNewPuzzle
// with the auth + limit check. Called after every engine switch.
function applyVoooLimitGuard() {
    if (!window.voooEngine || !window.voooEngine.generateNewPuzzle) return;

    // Avoid double-wrapping
    if (window.voooEngine._limitGuardApplied) return;

    const originalGenerate = window.voooEngine.generateNewPuzzle.bind(window.voooEngine);

    window.voooEngine.generateNewPuzzle = function () {

        // ---- GUEST CHECK ----
        if (!currentVoooUser) {
            showLimitModal(
                'Free Sign Up',
                'Get free 30 MCQs per day, or buy a plan.!'
            );
            return null;
        }

        // ---- PAID USER: unlimited but counted ----
        if (userVoooData && userVoooData.tier === 'paid') {
            const today    = new Date().toISOString().split('T')[0];
            const usage    = userVoooData.dailyUsage || {};
            const count    = (usage.date === today) ? (usage.count || 0) : 0;
            const newCount = count + 1;

            voooDb.collection('users').doc(currentVoooUser.uid).update({
                'dailyUsage.date':  today,
                'dailyUsage.count': newCount,
                totalMCQsAttempted: firebase.firestore.FieldValue.increment(1)
            }).catch(function (err) { console.error('Firebase update error (paid user):', err); });

            userVoooData.dailyUsage = { date: today, count: newCount };
            return originalGenerate();
        }

        // ---- FREE USER: check + update ----
        if (userVoooData) {
            const today = new Date().toISOString().split('T')[0];
            const usage = userVoooData.dailyUsage || {};
            const count = (usage.date === today) ? (usage.count || 0) : 0;

            if (count >= FREE_USER_MCQ_LIMIT) {
                showLimitModal(
                    'Daily Limit Reached',
                    'Dear ' + (userVoooData.fullName || 'User') + ', your daily limit of ' + FREE_USER_MCQ_LIMIT + ' MCQs is over. Please come back tomorrow or upgrade your plan. Thanks!'
                );
                return null;
            }

            const newCount = count + 1;
            voooDb.collection('users').doc(currentVoooUser.uid).update({
                'dailyUsage.date':  today,
                'dailyUsage.count': newCount,
                totalMCQsAttempted: firebase.firestore.FieldValue.increment(1)
            }).catch(function (err) { console.error('Firebase update error:', err); });

            userVoooData.dailyUsage = { date: today, count: newCount };
            return originalGenerate();
        }

        // Fallback — user data not loaded yet, allow
        return originalGenerate();
    };

    window.voooEngine._limitGuardApplied = true;
    console.log('✅ MCQ limit guard applied to active engine');
}

// ============================================================
// Hook into _activateEngine so guard is applied on EVERY
// engine switch — not just page load
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the main page script to define _activateEngine
    setTimeout(function () {
        if (typeof _activateEngine === 'function') {
            const originalActivate = _activateEngine;

            window._activateEngine = async function (categoryKey) {
                const result = await originalActivate(categoryKey);
                if (result) applyVoooLimitGuard();
                return result;
            };

            console.log('✅ _activateEngine wrapped with limit guard hook');
        }
    }, 200);
});
