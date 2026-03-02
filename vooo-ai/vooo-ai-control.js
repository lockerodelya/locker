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
    'basmath-level-1' : '/vooo-ai/vae-basmath-level-1.js',
    'basmath-level-2' : '/vooo-ai/vae-basmath-level-2.js',
    'basmath-level-3' : '/vooo-ai/vae-basmath-level-3.js',
    'basmath-level-4' : '/vooo-ai/vae-basmath-level-4.js',
    'basmath-level-5' : '/vooo-ai/vae-basmath-level-5.js',
    'basmath-level-6' : '/vooo-ai/vae-basmath-level-6.js',
    'basmath-level-7' : '/vooo-ai/vae-basmath-level-7.js',

    'basreason-level-1' : '/vooo-ai/vae-basreason-level-1.js',
    'basreason-level-2' : '/vooo-ai/vae-basreason-level-2.js',
    'basreason-level-3' : '/vooo-ai/vae-basreason-level-3.js',
    'basreason-level-4' : '/vooo-ai/vae-basreason-level-4.js',
    'basreason-level-5' : '/vooo-ai/vae-basreason-level-5.js',
    'basreason-level-6' : '/vooo-ai/vae-basreason-level-6.js',
    'basreason-level-7' : '/vooo-ai/vae-basreason-level-7.js',
    'basreason-level-8' : '/vooo-ai/vae-basreason-level-8.js',
    'basreason-level-9' : '/vooo-ai/vae-basreason-level-9.js',

    'gk-level-1'  : '/vooo-ai/vae-gk-level-1.js',
    'gk-level-2'  : '/vooo-ai/vae-gk-level-2.js',
    'gk-level-3'  : '/vooo-ai/vae-gk-level-3.js',
    'gk-level-4'  : '/vooo-ai/vae-gk-level-4.js',
    'gk-level-5'  : '/vooo-ai/vae-gk-level-5.js',
    'gk-level-6'  : '/vooo-ai/vae-gk-level-6.js',
    'gk-level-7'  : '/vooo-ai/vae-gk-level-7.js',
    'gk-level-8'  : '/vooo-ai/vae-gk-level-8.js',
    'gk-level-9'  : '/vooo-ai/vae-gk-level-9.js',
    'gk-level-10' : '/vooo-ai/vae-gk-level-10.js',
	'gk-level-11' : '/vooo-ai/vae-gk-level-11.js',
	'gk-level-12' : '/vooo-ai/vae-gk-level-12.js',
	'gk-level-13' : '/vooo-ai/vae-gk-level-13.js',
	'gk-level-14' : '/vooo-ai/vae-gk-level-14.js',
	'gk-level-15' : '/vooo-ai/vae-gk-level-15.js',
	'gk-level-16' : '/vooo-ai/vae-gk-level-16.js',
	'gk-level-17' : '/vooo-ai/vae-gk-level-17.js',
	'gk-level-18' : '/vooo-ai/vae-gk-level-18.js',
	'gk-level-19' : '/vooo-ai/vae-gk-level-19.js',
	'gk-level-20' : '/vooo-ai/vae-gk-level-20.js',
	'gk-level-21' : '/vooo-ai/vae-gk-level-21.js',
	'gk-level-22' : '/vooo-ai/vae-gk-level-22.js',
	'gk-level-23' : '/vooo-ai/vae-gk-level-23.js',
	'gk-level-24' : '/vooo-ai/vae-gk-level-24.js',
	'gk-level-25' : '/vooo-ai/vae-gk-level-25.js',
	'gk-level-26' : '/vooo-ai/vae-gk-level-26.js',
	'gk-level-27' : '/vooo-ai/vae-gk-level-27.js',

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
	'upsc-decision-level-1' : '/vooo-ai/vae-upscdecision-level-2.js',
	'upsc-decision-level-1' : '/vooo-ai/vae-upscdecision-level-3.js',

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
	
    // --- ADD NEW ENGINES BELOW THIS LINE ---
};


// ============================================================
// ⭐ STEP 2: ENGINE INSTANCE NAMES
// Must match _ENGINE_INSTANCE_NAME inside each engine file
// ============================================================
const VOOO_ENGINE_INSTANCES = {
    'basmath-level-1' : 'vaebasmathl1',
    'basmath-level-2' : 'vaebasmathl2',
    'basmath-level-3' : 'vaebasmathl3',
    'basmath-level-4' : 'vaebasmathl4',
    'basmath-level-5' : 'vaebasmathl5',
    'basmath-level-6' : 'vaebasmathl6',
    'basmath-level-7' : 'vaebasmathl7',
	
    'basreason-level-1' : 'vaebasreasonl1',
    'basreason-level-2' : 'vaebasreasonl2',
    'basreason-level-3' : 'vaebasreasonl3',
    'basreason-level-4' : 'vaebasreasonl4',
    'basreason-level-5' : 'vaebasreasonl5',
    'basreason-level-6' : 'vaebasreasonl6',
    'basreason-level-7' : 'vaebasreasonl7',
    'basreason-level-8' : 'vaebasreasonl8',
    'basreason-level-9' : 'vaebasreasonl9',
    
	'gk-level-1' : 'vaegkl1',
    'gk-level-2' : 'vaegkl2',
    'gk-level-3' : 'vaegkl3',
    'gk-level-4' : 'vaegkl4',
    'gk-level-5' : 'vaegkl5',
    'gk-level-6' : 'vaegkl6',
    'gk-level-7' : 'vaegkl7',
    'gk-level-8' : 'vaegkl8',
    'gk-level-9' : 'vaegkl9',
    'gk-level-10' : 'vaegkl10',
	'gk-level-11' : 'vaegkl11',
	'gk-level-12' : 'vaegkl12',
	'gk-level-13' : 'vaegkl13',
	'gk-level-14' : 'vaegkl14',
	'gk-level-15' : 'vaegkl15',
	'gk-level-16' : 'vaegkl16',
	'gk-level-17' : 'vaegkl17',
	'gk-level-18' : 'vaegkl18',
	'gk-level-19' : 'vaegkl19',
	'gk-level-20' : 'vaegkl20',
	'gk-level-21' : 'vaegkl21',
	'gk-level-22' : 'vaegkl22',
	'gk-level-23' : 'vaegkl23',
	'gk-level-24' : 'vaegkl24',
	'gk-level-25' : 'vaegkl25',
	'gk-level-26' : 'vaegkl26',
	'gk-level-27' : 'vaegkl27',
	
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
	'upsc-decision-level-1' : 'vaeupscdecisionl2',
	'upsc-decision-level-1' : 'vaeupscdecisionl3',

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
                    { value: 'basmath-level-1', text: '• Basic Math L1' },
                    { value: 'basmath-level-2', text: '• Basic Math L2' },
                    { value: 'basmath-level-3', text: '• Basic Math L3' },
                    { value: 'basmath-level-4', text: '• Basic Math L4' },
                    { value: 'basmath-level-5', text: '• Basic Math L5' },
                    { value: 'basmath-level-6', text: '• Basic Math L6' },
                    { value: 'basmath-level-7', text: '• Basic Math L7' },
                ]
            },
            {
                label: 'Basic Reasoning',
                options: [
                    { value: 'basreason-level-1', text: '• Basic Reasoning L1' },
                    { value: 'basreason-level-2', text: '• Basic Reasoning L2' },
                    { value: 'basreason-level-3', text: '• Basic Reasoning L3' },
                    { value: 'basreason-level-4', text: '• Basic Reasoning L4' },
                    { value: 'basreason-level-5', text: '• Basic Reasoning L5' },
                    { value: 'basreason-level-6', text: '• Basic Reasoning L6' },
                    { value: 'basreason-level-7', text: '• Basic Reasoning L7' },
                    { value: 'basreason-level-8', text: '• Basic Reasoning L8' },
                    { value: 'basreason-level-9', text: '• Basic Reasoning L9' },
                ]
            },
            {
                label: 'General Knowledge',
                options: [
                    { value: 'gk-level-1',  text: '• General Knowledge L1' },
                    { value: 'gk-level-2',  text: '• General Knowledge L2' },
                    { value: 'gk-level-3',  text: '• General Knowledge L3' },
                    { value: 'gk-level-4',  text: '• General Knowledge L4' },
                    { value: 'gk-level-5',  text: '• General Knowledge L5' },
                    { value: 'gk-level-6',  text: '• General Knowledge L6' },
                    { value: 'gk-level-7',  text: '• General Knowledge L7' },
                    { value: 'gk-level-8',  text: '• General Knowledge L8' },
                    { value: 'gk-level-9',  text: '• General Knowledge L9' },
                    { value: 'gk-level-10', text: '• General Knowledge L10' },
					{ value: 'gk-level-11', text: '• General Knowledge L11' },
					{ value: 'gk-level-12', text: '• General Knowledge L12' },
					{ value: 'gk-level-13', text: '• General Knowledge L13' },
					{ value: 'gk-level-14', text: '• General Knowledge L14' },
					{ value: 'gk-level-15', text: '• General Knowledge L15' },
					{ value: 'gk-level-16', text: '• General Knowledge L16' },
					{ value: 'gk-level-17', text: '• General Knowledge L17' },
					{ value: 'gk-level-18', text: '• General Knowledge L18' },
					{ value: 'gk-level-19', text: '• General Knowledge L19' },
					{ value: 'gk-level-20', text: '• General Knowledge L20' },
					{ value: 'gk-level-21', text: '• General Knowledge L21' },
					{ value: 'gk-level-22', text: '• General Knowledge L22' },
					{ value: 'gk-level-23', text: '• General Knowledge L23' },
					{ value: 'gk-level-24', text: '• General Knowledge L24' },
					{ value: 'gk-level-25', text: '• General Knowledge L25' },
					{ value: 'gk-level-26', text: '• General Knowledge L26' },
					{ value: 'gk-level-27', text: '• General Knowledge L27' },
                ]
            },
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
                    { value: 'upsc-seatar-level-1', text: '• Analytical Seating Arrangement L1' },
					{ value: 'upsc-seatar-level-1', text: '• Analytical Seating Arrangement L2' },
                    { value: 'upsc-seatar-level-1', text: '• Analytical Seating Arrangement L3' },
					{ value: 'upsc-compar-level-1', text: '• Analytical Complex Arrangement L1' },
					{ value: 'upsc-compar-level-1', text: '• Analytical Complex Arrangement L2' },
                    { value: 'upsc-compar-level-1', text: '• Analytical Complex Arrangement L3' },


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
                label: 'UPSC : Ranking & Time Sequence',
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

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        // Guard on first page load
        if (window.voooEngine) {
            applyVoooLimitGuard();

            // If no user logged in, clear the puzzle area
            if (!currentVoooUser) {
                showLimitModal(
                    'Free Sign Up',
                    'Get free 30 MCQs per day !'
                );
            }
        }
    }, 800);
});
