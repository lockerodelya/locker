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

	'upsc-barg-level-1' : '/vooo-ai/vae-upscbarg-level-1.js',
	'upsc-lineg-level-1' : '/vooo-ai/vae-upsclineg-level-1.js',
	'upsc-compd-level-1' : '/vooo-ai/vae-upsccompd-level-1.js',
	'upsc-numsys-level-1' : '/vooo-ai/vae-upscnumsys-level-1.js',
	'upsc-perc-level-1' : '/vooo-ai/vae-upscperc-level-1.js',
	'upsc-ratios-level-1' : '/vooo-ai/vae-upscratios-level-1.js',
	'upsc-tabledata-level-1' : '/vooo-ai/vae-upsctabledata-level-1.js',
	'upsc-timespeed-level-1' : '/vooo-ai/vae-upsctimespeed-level-1.js',
	
	'upsc-seatar-level-1' : '/vooo-ai/vae-upscseatar-level-1.js',
	'upsc-seatar-level-2' : '/vooo-ai/vae-upscseatar-level-2.js',
	'upsc-seatar-level-3' : '/vooo-ai/vae-upscseatar-level-3.js',
	'upsc-compar-level-1' : '/vooo-ai/vae-upsccompar-level-1.js',
	'upsc-compar-level-2' : '/vooo-ai/vae-upsccompar-level-2.js',
	'upsc-compar-level-3' : '/vooo-ai/vae-upsccompar-level-3.js',
	
	'upsc-clock-level-1' : '/vooo-ai/vae-upsc-clock-level-1.js',
	'upsc-clock-level-2' : '/vooo-ai/vae-upsc-clock-level-2.js',
	'upsc-clock-level-3' : '/vooo-ai/vae-upsc-clock-level-3.js',

	'upsc-decision-level-1' : '/vooo-ai/vae-upscdecision-level-1.js',
	'upsc-decision-level-2' : '/vooo-ai/vae-upscdecision-level-2.js',
	'upsc-decision-level-3' : '/vooo-ai/vae-upscdecision-level-3.js',

	'upsc-arguments-level-1' : '/vooo-ai/vae-upsc-arguments-level-1.js',
	'upsc-arguments-level-2' : '/vooo-ai/vae-upsc-arguments-level-2.js',
	'upsc-arguments-level-3' : '/vooo-ai/vae-upsc-arguments-level-3.js',

	'upsc-blood-level-1' : '/vooo-ai/vae-upsc-blood-level-1.js',
	'upsc-blood-level-2' : '/vooo-ai/vae-upsc-blood-level-2.js',
	'upsc-blood-level-3' : '/vooo-ai/vae-upsc-blood-level-3.js',

	'upsc-code-level-1' : '/vooo-ai/vae-upsc-code-level-1.js',
	'upsc-code-level-2' : '/vooo-ai/vae-upsc-code-level-2.js',
	'upsc-code-level-3' : '/vooo-ai/vae-upsc-code-level-3.js',

	'upsc-direction-level-1' : '/vooo-ai/vae-upsc-direction-level-1.js',
	'upsc-direction-level-2' : '/vooo-ai/vae-upsc-direction-level-2.js',
	'upsc-direction-level-3' : '/vooo-ai/vae-upsc-direction-level-3.js',

	'upsc-ranktime-level-1' : '/vooo-ai/vae-upsc-ranktime-level-1.js',
	'upsc-ranktime-level-2' : '/vooo-ai/vae-upsc-ranktime-level-2.js',
	'upsc-ranktime-level-3' : '/vooo-ai/vae-upsc-ranktime-level-3.js',

	'upsc-statement-level-1' : '/vooo-ai/vae-upsc-statement-level-1.js',
	'upsc-statement-level-2' : '/vooo-ai/vae-upsc-statement-level-2.js',
	'upsc-statement-level-3' : '/vooo-ai/vae-upsc-statement-level-3.js',

	'upsc-syllogisms-level-1' : '/vooo-ai/vae-upsc-syllogisms-level-1.js',
	'upsc-syllogisms-level-2' : '/vooo-ai/vae-upsc-syllogisms-level-2.js',
	'upsc-syllogisms-level-3' : '/vooo-ai/vae-upsc-syllogisms-level-3.js',
	
	'upsc-geometry-level-1' : '/vooo-ai/vae-upscgeometry-level-1.js',
	'upsc-geometry-level-2' : '/vooo-ai/vae-upscgeometry-level-2.js',
	'upsc-geometry-level-3' : '/vooo-ai/vae-upscgeometry-level-3.js',
	
	'upsc-profitloss-level-1' : '/vooo-ai/vae-upscprofitloss-level-1.js',
	'upsc-profitloss-level-2' : '/vooo-ai/vae-upscprofitloss-level-2.js',
	'upsc-profitloss-level-3' : '/vooo-ai/vae-upscprofitloss-level-3.js',

		
    // --- ADD NEW ENGINES BELOW THIS LINE ---
};


// ============================================================
// ⭐ STEP 2: ENGINE INSTANCE NAMES
// Must match _ENGINE_INSTANCE_NAME inside each engine file
// ============================================================
const VOOO_ENGINE_INSTANCES = {

	'upsc-barg-level-1' : 'vaeupscbargl1',
	'upsc-lineg-level-1' : 'vaeupsclinegl1',
	'upsc-compd-level-1' : 'vaeupsccompdl1',
	'upsc-numsys-level-1' : 'vaeupscnumsysl1',
	'upsc-perc-level-1' : 'vaeupscpercl1',
	'upsc-ratios-level-1' : 'vaeupscratiosl1',
	'upsc-tabledata-level-1' : 'vaeupsctabledatal1',
	'upsc-timespeed-level-1' : 'vaeupsctimespeedl1',

	'upsc-seatar-level-1' : 'vaeupscseatarl1',
	'upsc-seatar-level-2' : 'vaeupscseatarl2',
	'upsc-seatar-level-3' : 'vaeupscseatarl3',
	'upsc-compar-level-1' : 'vaeupsccomparl1',
	'upsc-compar-level-2' : 'vaeupsccomparl2',
	'upsc-compar-level-3' : 'vaeupsccomparl3',
	
	'upsc-clock-level-1' : 'vaeupscclockl1',
	'upsc-clock-level-2' : 'vaeupscclockl2',
	'upsc-clock-level-3' : 'vaeupscclockl3',
	
	'upsc-decision-level-1' : 'vaeupscdecisionl1',
	'upsc-decision-level-2' : 'vaeupscdecisionl2',
	'upsc-decision-level-3' : 'vaeupscdecisionl3',

	'upsc-arguments-level-1' : 'vaeupscargumentsl1',
	'upsc-arguments-level-2' : 'vaeupscargumentsl2',
	'upsc-arguments-level-3' : 'vaeupscargumentsl3',

	'upsc-blood-level-1' : 'vaeupscbloodl1',
	'upsc-blood-level-2' : 'vaeupscbloodl2',
	'upsc-blood-level-3' : 'vaeupscbloodl3',

	'upsc-code-level-1' : 'vaeupsccodel1',
	'upsc-code-level-2' : 'vaeupsccodel2',
	'upsc-code-level-3' : 'vaeupsccodel3',

	'upsc-direction-level-1' : 'vaeupscdirectionl1',
	'upsc-direction-level-2' : 'vaeupscdirectionl2',
	'upsc-direction-level-3' : 'vaeupscdirectionl3',

	'upsc-ranktime-level-1' : 'vaeupscranktimel1',
	'upsc-ranktime-level-2' : 'vaeupscranktimel2',
	'upsc-ranktime-level-3' : 'vaeupscranktimel3',

	'upsc-statement-level-1' : 'vaeupscstatementl1',
	'upsc-statement-level-2' : 'vaeupscstatementl2',
	'upsc-statement-level-3' : 'vaeupscstatementl3',

	'upsc-syllogisms-level-1' : 'vaeupscsyllogismsl1',
	'upsc-syllogisms-level-2' : 'vaeupscsyllogismsl2',
	'upsc-syllogisms-level-3' : 'vaeupscsyllogismsl3',
	
	'upsc-geometry-level-1' : 'vaeupscgeometryl1',
	'upsc-geometry-level-2' : 'vaeupscgeometryl2',
	'upsc-geometry-level-3' : 'vaeupscgeometryl3',

	'upsc-profitloss-level-1' : 'vaeupscprofitlossl1',
	'upsc-profitloss-level-2' : 'vaeupscprofitlossl2',
	'upsc-profitloss-level-3' : 'vaeupscprofitlossl3',

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
                label: 'UPSC Numeracy (Class X)',
                options: [
                    { value: 'upsc-barg-level-1', text: '• Numeracy Bargraph L1' },
					{ value: 'upsc-lineg-level-1', text: '• Numeracy  Linegraph L1' },
                    { value: 'upsc-compd-level-1', text: '• Numeracy Compound L1' },
					{ value: 'upsc-numsys-level-1', text: '• Numeracy Numbersys L1' },
					{ value: 'upsc-perc-level-1', text: '• Numeracy Percentage L1' },
                    { value: 'upsc-ratios-level-1', text: '• Numeracy Ratios L1' },
                    { value: 'upsc-tabledata-level-1', text: '• Numeracy Table Data L1' },
                    { value: 'upsc-timespeed-level-1', text: '• Numeracy Time Speed L1' },
                ]
            },
			{
                label: 'UPSC : Analytical Reasoning',
                options: [
                    { value: 'upsc-seatar-level-1', text: '• Seating Arrangement L1' },
					{ value: 'upsc-seatar-level-1', text: '• Seating Arrangement L2' },
                    { value: 'upsc-seatar-level-1', text: '• Seating Arrangement L3' },
					{ value: 'upsc-compar-level-1', text: '• Complex Arrangement L1' },
					{ value: 'upsc-compar-level-1', text: '• Complex Arrangement L2' },
                    { value: 'upsc-compar-level-1', text: '• Complex Arrangement L3' },
                		]
            },
			{
                label: 'UPSC : Clock & Calendar',
                options: [
                    { value: 'upsc-clock-level-1', text: '• Clock & Calendar L1' },
					{ value: 'upsc-clock-level-2', text: '• Clock & Calendar L2' },
                    { value: 'upsc-clock-level-3', text: '• Clock & Calendar L3' },
                ]
            },
			{
                label: 'UPSC : Decision Making',
                options: [
                    { value: 'upsc-decision-level-1', text: '• Decision Making L1' },
					{ value: 'upsc-decision-level-2', text: '• Decision Making L2' },
                    { value: 'upsc-decision-level-3', text: '• Decision Making L3' },
                ]
            },
			{
                label: 'UPSC : Arguments & Conclusions',
                options: [
                    { value: 'upsc-arguments-level-1', text: '• Arguments & Conclusions L1' },
					{ value: 'upsc-arguments-level-2', text: '• Arguments & Conclusions L2' },
                    { value: 'upsc-arguments-level-3', text: '• Arguments & Conclusions L3' },
                ]
            },
			{
                label: 'UPSC : Blood Relations',
                options: [
                    { value: 'upsc-blood-level-1', text: '• Blood Relations L1' },
					{ value: 'upsc-blood-level-2', text: '• Blood Relations L2' },
                    { value: 'upsc-blood-level-3', text: '• Blood Relations L3' },
                ]
            },
			{
                label: 'UPSC : Code-Decode',
                options: [
                    { value: 'upsc-code-level-1', text: '• Code-Decode L1' },
					{ value: 'upsc-code-level-2', text: '• Code-Decode L2' },
                    { value: 'upsc-code-level-3', text: '• Code-Decode L3' },
                ]
            },
			{
                label: 'UPSC : Direction Sense',
                options: [
                    { value: 'upsc-direction-level-1', text: '• Direction Sense L1' },
					{ value: 'upsc-direction-level-2', text: '• Direction Sense L2' },
                    { value: 'upsc-direction-level-3', text: '• Direction Sense L3' },
                ]
            },
			{
                label: 'UPSC : Ranking & Time Secquence',
                options: [
                    { value: 'upsc-ranktime-level-1', text: '• Ranking & Time Seq. L1' },
					{ value: 'upsc-ranktime-level-2', text: '• Ranking & Time Seq. L2' },
                    { value: 'upsc-ranktime-level-3', text: '• Ranking & Time Seq. L3' },
                ]
            },
			{
                label: 'UPSC : Statement & Assumptions',
                options: [
                    { value: 'upsc-statement-level-1', text: '• Statement & Assumptions L1' },
					{ value: 'upsc-statement-level-2', text: '• Statement & Assumptions L2' },
                    { value: 'upsc-statement-level-3', text: '• Statement & Assumptions L3' },
                ]
            },
			{
                label: 'UPSC : Syllogisms',
                options: [
                    { value: 'upsc-syllogisms-level-1', text: '• Syllogisms L1' },
					{ value: 'upsc-syllogisms-level-2', text: '• Syllogisms L2' },
                    { value: 'upsc-syllogisms-level-3', text: '• Syllogisms L3' },
                ]
            },
			{
                label: 'UPSC : Data Sufficiency: Geometry',
                options: [
                    { value: 'upsc-geometry-level-1', text: '• Geometry L1' },
					{ value: 'upsc-geometry-level-2', text: '• Geometry L2' },
					{ value: 'upsc-geometry-level-3', text: '• Geometry L3' },
                ]
            },
			{
                label: 'UPSC : Data Sufficiency: Profit & Loss',
                options: [
                    { value: 'upsc-profitloss-level-1', text: '• Profit & Loss L1' },
					{ value: 'upsc-profitloss-level-2', text: '• Profit & Loss L2' },
					{ value: 'upsc-profitloss-level-3', text: '• Profit & Loss L3' },
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
            if (window._voooFirstLoad) {
                window._voooFirstLoad = false;
                return originalGenerate();
            }
            showLimitModal(
                'Free Sign Up',
                'Get free 30 MCQs per day !'
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

