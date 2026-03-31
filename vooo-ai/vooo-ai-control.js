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

	'basic-math-level-1' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-1.js',
	'basic-math-level-2' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-2.js',
	'basic-math-level-3' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-3.js',
	'basic-math-level-4' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-4.js',
	'basic-math-level-5' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-5.js',
	'basic-math-level-6' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-6.js',
	'basic-math-level-7' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-7.js',
	'basic-math-level-8' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-8.js',
	'basic-math-level-9' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-9.js',
	'basic-math-level-10' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-10.js',
	'basic-math-level-11' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-11.js',
	'basic-math-level-12' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-12.js',
	'basic-math-level-13' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-13.js',
	'basic-math-level-14' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-14.js',
	'basic-math-level-15' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-15.js',
	'basic-math-level-16' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-16.js',
	'basic-math-level-17' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-17.js',
	'basic-math-level-18' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-18.js',
	'basic-math-level-19' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-19.js',
	'basic-math-level-20' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-20.js',
	'basic-math-level-21' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-21.js',
	'basic-math-level-22' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-22.js',
	'basic-math-level-23' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-23.js',
	'basic-math-level-24' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-24.js',
	'basic-math-level-25' : '/vooo-ai/subjects/basic-math/engine-code/basic-math-level-25.js',

    'basreason-level-1' : '/vooo-ai/vae-basreason-level-1.js',
    'basreason-level-2' : '/vooo-ai/vae-basreason-level-2.js',
    'basreason-level-3' : '/vooo-ai/vae-basreason-level-3.js',
    'basreason-level-4' : '/vooo-ai/vae-basreason-level-4.js',
    'basreason-level-5' : '/vooo-ai/vae-basreason-level-5.js',
    'basreason-level-6' : '/vooo-ai/vae-basreason-level-6.js',
    'basreason-level-7' : '/vooo-ai/vae-basreason-level-7.js',
    'basreason-level-8' : '/vooo-ai/vae-basreason-level-8.js',
    'basreason-level-9' : '/vooo-ai/vae-basreason-level-9.js',

	'basic-general-knowledge-level-1' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-1.js',
	'basic-general-knowledge-level-2' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-2.js',
	'basic-general-knowledge-level-3' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-3.js',
	'basic-general-knowledge-level-4' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-4.js',
	'basic-general-knowledge-level-5' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-5.js',
	'basic-general-knowledge-level-6' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-6.js',
	'basic-general-knowledge-level-7' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-7.js',
	'basic-general-knowledge-level-8' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-8.js',
	'basic-general-knowledge-level-9' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-9.js',
	'basic-general-knowledge-level-10' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-10.js',
	'basic-general-knowledge-level-11' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-11.js',
	'basic-general-knowledge-level-12' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-12.js',
	'basic-general-knowledge-level-13' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-13.js',
	'basic-general-knowledge-level-14' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-14.js',
	'basic-general-knowledge-level-15' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-15.js',
	'basic-general-knowledge-level-16' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-16.js',
	'basic-general-knowledge-level-17' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-17.js',
	'basic-general-knowledge-level-18' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-18.js',
	'basic-general-knowledge-level-19' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-19.js',
	'basic-general-knowledge-level-20' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-20.js',
	'basic-general-knowledge-level-21' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-21.js',
	'basic-general-knowledge-level-22' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-22.js',
	'basic-general-knowledge-level-23' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-23.js',
	'basic-general-knowledge-level-24' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-24.js',
	'basic-general-knowledge-level-25' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-25.js',
	'basic-general-knowledge-level-26' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-26.js',
	'basic-general-knowledge-level-27' : '/vooo-ai/subjects/basic-general-knowledge/engine-code/basic-general-knowledge-level-27.js',

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

	'physics-forces-motion-level-1' : '/vooo-ai/subjects/physics-forces-motion/engine-code/physics-forces-motion-level-1.js',
	'physics-forces-motion-level-2' : '/vooo-ai/subjects/physics-forces-motion/engine-code/physics-forces-motion-level-2.js',
	'physics-forces-motion-level-3' : '/vooo-ai/subjects/physics-forces-motion/engine-code/physics-forces-motion-level-3.js',

	'physics-energy-power-level-1' : '/vooo-ai/subjects/physics-energy-power/engine-code/physics-energy-power-level-1.js',
	'physics-energy-power-level-2' : '/vooo-ai/subjects/physics-energy-power/engine-code/physics-energy-power-level-2.js',
	'physics-energy-power-level-3' : '/vooo-ai/subjects/physics-energy-power/engine-code/physics-energy-power-level-3.js',	

	'physics-waves-sound-level-1' : '/vooo-ai/subjects/physics-waves-sound/engine-code/physics-waves-sound-level-1.js',
	'physics-waves-sound-level-2' : '/vooo-ai/subjects/physics-waves-sound/engine-code/physics-waves-sound-level-2.js',
	'physics-waves-sound-level-3' : '/vooo-ai/subjects/physics-waves-sound/engine-code/physics-waves-sound-level-3.js',

	'physics-light-optics-level-1' : '/vooo-ai/subjects/physics-light-optics/engine-code/physics-light-optics-level-1.js',
	'physics-light-optics-level-2' : '/vooo-ai/subjects/physics-light-optics/engine-code/physics-light-optics-level-2.js',
	'physics-light-optics-level-3' : '/vooo-ai/subjects/physics-light-optics/engine-code/physics-light-optics-level-3.js',

	'physics-electricity-magnetism-level-1' : '/vooo-ai/subjects/physics-electricity-magnetism/engine-code/physics-electricity-magnetism-level-1.js',
	'physics-electricity-magnetism-level-2' : '/vooo-ai/subjects/physics-electricity-magnetism/engine-code/physics-electricity-magnetism-level-2.js',
	'physics-electricity-magnetism-level-3' : '/vooo-ai/subjects/physics-electricity-magnetism/engine-code/physics-electricity-magnetism-level-3.js',

	'physics-atomic-nuclear-level-1' : '/vooo-ai/subjects/physics-atomic-nuclear/engine-code/physics-atomic-nuclear-level-1.js',
	'physics-atomic-nuclear-level-2' : '/vooo-ai/subjects/physics-atomic-nuclear/engine-code/physics-atomic-nuclear-level-2.js',
	'physics-atomic-nuclear-level-3' : '/vooo-ai/subjects/physics-atomic-nuclear/engine-code/physics-atomic-nuclear-level-3.js',

	'physics-astrophysics-level-1' : '/vooo-ai/subjects/physics-astrophysics/engine-code/physics-astrophysics-level-1.js',
	'physics-astrophysics-level-2' : '/vooo-ai/subjects/physics-astrophysics/engine-code/physics-astrophysics-level-2.js',
	'physics-astrophysics-level-3' : '/vooo-ai/subjects/physics-astrophysics/engine-code/physics-astrophysics-level-3.js',

	'chemistry-atomic-structure-level-1' : '/vooo-ai/subjects/chemistry-atomic-structure/engine-code/chemistry-atomic-structure-level-1.js',
	'chemistry-atomic-structure-level-2' : '/vooo-ai/subjects/chemistry-atomic-structure/engine-code/chemistry-atomic-structure-level-2.js',
	'chemistry-atomic-structure-level-3' : '/vooo-ai/subjects/chemistry-atomic-structure/engine-code/chemistry-atomic-structure-level-3.js',

	'chemistry-chemical-bonding-level-1' : '/vooo-ai/subjects/chemistry-chemical-bonding/engine-code/chemistry-chemical-bonding-level-1.js',
	'chemistry-chemical-bonding-level-2' : '/vooo-ai/subjects/chemistry-chemical-bonding/engine-code/chemistry-chemical-bonding-level-2.js',
	'chemistry-chemical-bonding-level-3' : '/vooo-ai/subjects/chemistry-chemical-bonding/engine-code/chemistry-chemical-bonding-level-3.js',

	'cs-networks-level-1' : '/vooo-ai/subjects/cs-networks/engine-code/cs-networks-level-1.js',
	'cs-networks-level-2' : '/vooo-ai/subjects/cs-networks/engine-code/cs-networks-level-2.js',
	'cs-networks-level-3' : '/vooo-ai/subjects/cs-networks/engine-code/cs-networks-level-3.js',

	'cs-data-representation-level-1' : '/vooo-ai/subjects/cs-data-representation/engine-code/cs-data-representation-level-1.js',
	'cs-data-representation-level-2' : '/vooo-ai/subjects/cs-data-representation/engine-code/cs-data-representation-level-2.js',
	'cs-data-representation-level-3' : '/vooo-ai/subjects/cs-data-representation/engine-code/cs-data-representation-level-3.js',

	'cs-algorithms-level-1' : '/vooo-ai/subjects/cs-algorithms/engine-code/cs-algorithms-level-1.js',
	'cs-algorithms-level-2' : '/vooo-ai/subjects/cs-algorithms/engine-code/cs-algorithms-level-2.js',
	'cs-algorithms-level-3' : '/vooo-ai/subjects/cs-algorithms/engine-code/cs-algorithms-level-3.js',

	'biology-cell-level-1' : '/vooo-ai/subjects/biology-cell/engine-code/biology-cell-level-1.js',
	'biology-cell-level-2' : '/vooo-ai/subjects/biology-cell/engine-code/biology-cell-level-2.js',
	'biology-cell-level-3' : '/vooo-ai/subjects/biology-cell/engine-code/biology-cell-level-3.js',

	'biology-human-body-level-1' : '/vooo-ai/subjects/biology-human-body/engine-code/biology-human-body-level-1.js',
	'biology-human-body-level-2' : '/vooo-ai/subjects/biology-human-body/engine-code/biology-human-body-level-2.js',
	'biology-human-body-level-3' : '/vooo-ai/subjects/biology-human-body/engine-code/biology-human-body-level-3.js',

	'biology-ecology-ecosystems-level-1' : '/vooo-ai/subjects/biology-ecology-ecosystems/engine-code/biology-ecology-ecosystems-level-1.js',
	'biology-ecology-ecosystems-level-2' : '/vooo-ai/subjects/biology-ecology-ecosystems/engine-code/biology-ecology-ecosystems-level-2.js',
	'biology-ecology-ecosystems-level-3' : '/vooo-ai/subjects/biology-ecology-ecosystems/engine-code/biology-ecology-ecosystems-level-3.js',
	
	'environmental-pollution-level-1' : '/vooo-ai/subjects/environmental-pollution/engine-code/environmental-pollution-level-1.js',
	'environmental-pollution-level-2' : '/vooo-ai/subjects/environmental-pollution/engine-code/environmental-pollution-level-2.js',
	'environmental-pollution-level-3' : '/vooo-ai/subjects/environmental-pollution/engine-code/environmental-pollution-level-3.js',

	'environmental-ecosystems-level-1' : '/vooo-ai/subjects/environmental-ecosystems/engine-code/environmental-ecosystems-level-1.js',
	'environmental-ecosystems-level-2' : '/vooo-ai/subjects/environmental-ecosystems/engine-code/environmental-ecosystems-level-2.js',
	'environmental-ecosystems-level-3' : '/vooo-ai/subjects/environmental-ecosystems/engine-code/environmental-ecosystems-level-3.js',

	'environmental-renewable-level-1' : '/vooo-ai/subjects/environmental-renewable/engine-code/environmental-renewable-level-1.js',
	'environmental-renewable-level-2' : '/vooo-ai/subjects/environmental-renewable/engine-code/environmental-renewable-level-2.js',
	'environmental-renewable-level-3' : '/vooo-ai/subjects/environmental-renewable/engine-code/environmental-renewable-level-3.js',
	
	'environmental-biodiversity-level-1' : '/vooo-ai/subjects/environmental-biodiversity/engine-code/environmental-biodiversity-level-1.js',
	'environmental-biodiversity-level-2' : '/vooo-ai/subjects/environmental-biodiversity/engine-code/environmental-biodiversity-level-2.js',
	'environmental-biodiversity-level-3' : '/vooo-ai/subjects/environmental-biodiversity/engine-code/environmental-biodiversity-level-3.js',

	'environmental-human-level-1' : '/vooo-ai/subjects/environmental-human/engine-code/environmental-human-level-1.js',
	'environmental-human-level-2' : '/vooo-ai/subjects/environmental-human/engine-code/environmental-human-level-2.js',
	'environmental-human-level-3' : '/vooo-ai/subjects/environmental-human/engine-code/environmental-human-level-3.js',

	'environmental-sustainability-level-1' : '/vooo-ai/subjects/environmental-sustainability/engine-code/environmental-sustainability-level-1.js',
	'environmental-sustainability-level-2' : '/vooo-ai/subjects/environmental-sustainability/engine-code/environmental-sustainability-level-2.js',
	'environmental-sustainability-level-3' : '/vooo-ai/subjects/environmental-sustainability/engine-code/environmental-sustainability-level-3.js',
	
	'environmental-water-level-1' : '/vooo-ai/subjects/environmental-water/engine-code/environmental-water-level-1.js',
	'environmental-water-level-2' : '/vooo-ai/subjects/environmental-water/engine-code/environmental-water-level-2.js',
	'environmental-water-level-3' : '/vooo-ai/subjects/environmental-water/engine-code/environmental-water-level-3.js',
	
	'upsc-math-simple-ratio-level-1' : '/vooo-ai/subjects/upsc-math-simple-ratio/engine-code/upsc-math-simple-ratio-level-1.js',
	'upsc-math-simple-ratio-level-2' : '/vooo-ai/subjects/upsc-math-simple-ratio/engine-code/upsc-math-simple-ratio-level-2.js',
	'upsc-math-simple-ratio-level-3' : '/vooo-ai/subjects/upsc-math-simple-ratio/engine-code/upsc-math-simple-ratio-level-3.js',
	
	'upsc-math-approximation-level-1' : '/vooo-ai/subjects/upsc-math-approximation/engine-code/upsc-math-approximation-level-1.js',
	'upsc-math-approximation-level-2' : '/vooo-ai/subjects/upsc-math-approximation/engine-code/upsc-math-approximation-level-2.js',
	'upsc-math-approximation-level-3' : '/vooo-ai/subjects/upsc-math-approximation/engine-code/upsc-math-approximation-level-3.js',
	
	'upsc-math-bodmas-level-1' : '/vooo-ai/subjects/upsc-math-bodmas/engine-code/upsc-math-bodmas-level-1.js',
	'upsc-math-bodmas-level-2' : '/vooo-ai/subjects/upsc-math-bodmas/engine-code/upsc-math-bodmas-level-2.js',
	'upsc-math-bodmas-level-3' : '/vooo-ai/subjects/upsc-math-bodmas/engine-code/upsc-math-bodmas-level-3.js',
	
	'upsc-math-divisibility-level-1' : '/vooo-ai/subjects/upsc-math-divisibility/engine-code/upsc-math-divisibility-level-1.js',
	'upsc-math-divisibility-level-2' : '/vooo-ai/subjects/upsc-math-divisibility/engine-code/upsc-math-divisibility-level-2.js',
	'upsc-math-divisibility-level-3' : '/vooo-ai/subjects/upsc-math-divisibility/engine-code/upsc-math-divisibility-level-3.js',
	
	'upsc-math-factors-multiples-level-1' : '/vooo-ai/subjects/upsc-math-factors-multiples/engine-code/upsc-math-factors-multiples-level-1.js',
	'upsc-math-factors-multiples-level-2' : '/vooo-ai/subjects/upsc-math-factors-multiples/engine-code/upsc-math-factors-multiples-level-2.js',
	'upsc-math-factors-multiples-level-3' : '/vooo-ai/subjects/upsc-math-factors-multiples/engine-code/upsc-math-factors-multiples-level-3.js',

	
    // --- ADD NEW ENGINES BELOW THIS LINE ---
};


// ============================================================
// ⭐ STEP 2: ENGINE INSTANCE NAMES
// Must match _ENGINE_INSTANCE_NAME inside each engine file
// ============================================================
const VOOO_ENGINE_INSTANCES = {

	'basic-math-level-1' : 'basicmathl1',
	'basic-math-level-2' : 'basicmathl2',
	'basic-math-level-3' : 'basicmathl3',
	'basic-math-level-4' : 'basicmathl4',
	'basic-math-level-5' : 'basicmathl5',
	'basic-math-level-6' : 'basicmathl6',
	'basic-math-level-7' : 'basicmathl7',
	'basic-math-level-8' : 'basicmathl8',
	'basic-math-level-9' : 'basicmathl9',
	'basic-math-level-10' : 'basicmathll0',
	'basic-math-level-11' : 'basicmathl11',
	'basic-math-level-12' : 'basicmathl12',
	'basic-math-level-13' : 'basicmathl13',
	'basic-math-level-14' : 'basicmathl14',
	'basic-math-level-15' : 'basicmathl15',
	'basic-math-level-16' : 'basicmathl16',
	'basic-math-level-17' : 'basicmathl17',
	'basic-math-level-18' : 'basicmathl18',
	'basic-math-level-19' : 'basicmathl19',
	'basic-math-level-20' : 'basicmathl20',
	'basic-math-level-21' : 'basicmathl21',
	'basic-math-level-22' : 'basicmathl22',
	'basic-math-level-23' : 'basicmathl23',
	'basic-math-level-24' : 'basicmathl24',
	'basic-math-level-25' : 'basicmathl25',
	
    'basreason-level-1' : 'vaebasreasonl1',
    'basreason-level-2' : 'vaebasreasonl2',
    'basreason-level-3' : 'vaebasreasonl3',
    'basreason-level-4' : 'vaebasreasonl4',
    'basreason-level-5' : 'vaebasreasonl5',
    'basreason-level-6' : 'vaebasreasonl6',
    'basreason-level-7' : 'vaebasreasonl7',
    'basreason-level-8' : 'vaebasreasonl8',
    'basreason-level-9' : 'vaebasreasonl9',

	'basic-general-knowledge-level-1' : 'basicgeneralknowledgel1',
	'basic-general-knowledge-level-2' : 'basicgeneralknowledgel2',
	'basic-general-knowledge-level-3' : 'basicgeneralknowledgel3',
	'basic-general-knowledge-level-4' : 'basicgeneralknowledgel4',
	'basic-general-knowledge-level-5' : 'basicgeneralknowledgel5',
	'basic-general-knowledge-level-6' : 'basicgeneralknowledgel6',
	'basic-general-knowledge-level-7' : 'basicgeneralknowledgel7',
	'basic-general-knowledge-level-8' : 'basicgeneralknowledgel8',
	'basic-general-knowledge-level-9' : 'basicgeneralknowledgel9',
	'basic-general-knowledge-level-10' : 'basicgeneralknowledgel10',
	'basic-general-knowledge-level-11' : 'basicgeneralknowledgel11',
	'basic-general-knowledge-level-12' : 'basicgeneralknowledgel12',
	'basic-general-knowledge-level-13' : 'basicgeneralknowledgel13',
	'basic-general-knowledge-level-14' : 'basicgeneralknowledgel14',
	'basic-general-knowledge-level-15' : 'basicgeneralknowledgel15',
	'basic-general-knowledge-level-16' : 'basicgeneralknowledgel16',
	'basic-general-knowledge-level-17' : 'basicgeneralknowledgel17',
	'basic-general-knowledge-level-18' : 'basicgeneralknowledgel18',
	'basic-general-knowledge-level-19' : 'basicgeneralknowledgel19',
	'basic-general-knowledge-level-20' : 'basicgeneralknowledgel20',
	'basic-general-knowledge-level-21' : 'basicgeneralknowledgel21',
	'basic-general-knowledge-level-22' : 'basicgeneralknowledgel22',
	'basic-general-knowledge-level-23' : 'basicgeneralknowledgel23',
	'basic-general-knowledge-level-24' : 'basicgeneralknowledgel24',
	'basic-general-knowledge-level-25' : 'basicgeneralknowledgel25',
	'basic-general-knowledge-level-26' : 'basicgeneralknowledgel26',
	'basic-general-knowledge-level-27' : 'basicgeneralknowledgel27',

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

	'physics-forces-motion-level-1' : 'physicsforcesmotionl1',
	'physics-forces-motion-level-2' : 'physicsforcesmotionl2',
	'physics-forces-motion-level-3' : 'physicsforcesmotionl3',

	'physics-energy-power-level-1' : 'physicsenergypowerl1',
	'physics-energy-power-level-2' : 'physicsenergypowerl2',
	'physics-energy-power-level-3' : 'physicsenergypowerl3',

	'physics-waves-sound-level-1' : 'physicswavessoundl1',
	'physics-waves-sound-level-2' : 'physicswavessoundl2',
	'physics-waves-sound-level-3' : 'physicswavessoundl3',

	'physics-light-optics-level-1' : 'physicslightopticsl1',
	'physics-light-optics-level-2' : 'physicslightopticsl2',
	'physics-light-optics-level-3' : 'physicslightopticsl3',

	'physics-electricity-magnetism-level-1' : 'physicselectricitymagnetisml1',
	'physics-electricity-magnetism-level-2' : 'physicselectricitymagnetisml2',
	'physics-electricity-magnetism-level-3' : 'physicselectricitymagnetisml3',

	'physics-atomic-nuclear-level-1' : 'physicsatomicnuclearl1',
	'physics-atomic-nuclear-level-2' : 'physicsatomicnuclearl2',
	'physics-atomic-nuclear-level-3' : 'physicsatomicnuclearl3',

	'physics-astrophysics-level-1' : 'physicsastrophysicsl1',
	'physics-astrophysics-level-2' : 'physicsastrophysicsl2',
	'physics-astrophysics-level-3' : 'physicsastrophysicsl3',
			
	'chemistry-atomic-structure-level-1' : 'chemistryatomicstructurel1',
	'chemistry-atomic-structure-level-2' : 'chemistryatomicstructurel2',
	'chemistry-atomic-structure-level-3' : 'chemistryatomicstructurel3',

	'chemistry-chemical-bonding-level-1' : 'chemistrychemicalbondingl1',
	'chemistry-chemical-bonding-level-2' : 'chemistrychemicalbondingl2',
	'chemistry-chemical-bonding-level-3' : 'chemistrychemicalbondingl3',

	'cs-networks-level-1' : 'csnetworksl1',
	'cs-networks-level-2' : 'csnetworksl2',
	'cs-networks-level-3' : 'csnetworksl3',

	'cs-data-representation-level-1' : 'csdatarepresentationl1',
	'cs-data-representation-level-2' : 'csdatarepresentationl2',
	'cs-data-representation-level-3' : 'csdatarepresentationl3',
	
	'cs-algorithms-level-1' : 'csalgorithmsl1',
	'cs-algorithms-level-2' : 'csalgorithmsl2',
	'cs-algorithms-level-3' : 'csalgorithmsl3',
	
	'biology-cell-level-1' : 'biologycelll1',
	'biology-cell-level-2' : 'biologycelll2',
	'biology-cell-level-3' : 'biologycelll3',

	'biology-human-body-level-1' : 'biologyhumanbodyl1',
	'biology-human-body-level-2' : 'biologyhumanbodyl2',
	'biology-human-body-level-3' : 'biologyhumanbodyl3',

	'biology-ecology-ecosystems-level-1' : 'biologyecologyecosystemsl1',
	'biology-ecology-ecosystems-level-2' : 'biologyecologyecosystemsl2',
	'biology-ecology-ecosystems-level-3' : 'biologyecologyecosystemsl3',
	
	'environmental-pollution-level-1' : 'environmentalpollutionl1',
	'environmental-pollution-level-2' : 'environmentalpollutionl2',
	'environmental-pollution-level-3' : 'environmentalpollutionl3',
	
	'environmental-ecosystems-level-1' : 'environmentalecosystemsl1',
	'environmental-ecosystems-level-2' : 'environmentalecosystemsl2',
	'environmental-ecosystems-level-3' : 'environmentalecosystemsl3',
	
	'environmental-renewable-level-1' : 'environmentalrenewablel1',
	'environmental-renewable-level-2' : 'environmentalrenewablel2',
	'environmental-renewable-level-3' : 'environmentalrenewablel3',
	
	'environmental-biodiversity-level-1' : 'environmentalbiodiversityl1',
	'environmental-biodiversity-level-2' : 'environmentalbiodiversityl2',
	'environmental-biodiversity-level-3' : 'environmentalbiodiversityl3',
	
	'environmental-human-level-1' : 'environmentalhumanl1',
	'environmental-human-level-2' : 'environmentalhumanl2',
	'environmental-human-level-3' : 'environmentalhumanl3',
	
	'environmental-sustainability-level-1' : 'environmentalsustainabilityl1',
	'environmental-sustainability-level-2' : 'environmentalsustainabilityl2',
	'environmental-sustainability-level-3' : 'environmentalsustainabilityl3',
	
	'environmental-water-level-1' : 'environmentalwaterl1',
	'environmental-water-level-2' : 'environmentalwaterl2',
	'environmental-water-level-3' : 'environmentalwaterl3',
	
	'upsc-math-simple-ratio-level-1' : 'upscmathsimpleratiol1',
	'upsc-math-simple-ratio-level-2' : 'upscmathsimpleratiol2',
	'upsc-math-simple-ratio-level-3' : 'upscmathsimpleratiol3',

	'upsc-math-approximation-level-1' : 'upscmathapproximationl1',
	'upsc-math-approximation-level-2' : 'upscmathapproximationl2',
	'upsc-math-approximation-level-3' : 'upscmathapproximationl3',

	'upsc-math-bodmas-level-1' : 'upscmathbodmasl1',
	'upsc-math-bodmas-level-2' : 'upscmathbodmasl2',
	'upsc-math-bodmas-level-3' : 'upscmathbodmasl3',

	'upsc-math-divisibility-level-1' : 'upscmathdivisibilityl1',
	'upsc-math-divisibility-level-2' : 'upscmathdivisibilityl2',
	'upsc-math-divisibility-level-3' : 'upscmathdivisibilityl3',

	'upsc-math-factors-multiples-level-1' : 'upscmathfactorsmultiplesl1',
	'upsc-math-factors-multiples-level-2' : 'upscmathfactorsmultiplesl2',
	'upsc-math-factors-multiples-level-3' : 'upscmathfactorsmultiplesl3',

	
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
                    { value: 'basic-math-level-1', text: '• Basic Math L1' },
                    { value: 'basic-math-level-2', text: '• Basic Math L2' },
                    { value: 'basic-math-level-3', text: '• Basic Math L3' },
                    { value: 'basic-math-level-4', text: '• Basic Math L4' },
                    { value: 'basic-math-level-5', text: '• Basic Math L5' },
                    { value: 'basic-math-level-6', text: '• Basic Math L6' },
                    { value: 'basic-math-level-7', text: '• Basic Math L7' },
                    { value: 'basic-math-level-8', text: '• Basic Math L8' },
                    { value: 'basic-math-level-9', text: '• Basic Math L9' },
                    { value: 'basic-math-level-10', text: '• Basic Math L10' },
                    { value: 'basic-math-level-11', text: '• Basic Math L11' },
                    { value: 'basic-math-level-12', text: '• Basic Math L12' },
                    { value: 'basic-math-level-13', text: '• Basic Math L13' },
                    { value: 'basic-math-level-14', text: '• Basic Math L14' },
                    { value: 'basic-math-level-15', text: '• Basic Math L15' },
                    { value: 'basic-math-level-16', text: '• Basic Math L16' },
                    { value: 'basic-math-level-17', text: '• Basic Math L17' },
                    { value: 'basic-math-level-18', text: '• Basic Math L18' },
                    { value: 'basic-math-level-19', text: '• Basic Math L19' },
                    { value: 'basic-math-level-20', text: '• Basic Math L20' },
                    { value: 'basic-math-level-21', text: '• Basic Math L21' },
                    { value: 'basic-math-level-22', text: '• Basic Math L22' },
                    { value: 'basic-math-level-23', text: '• Basic Math L23' },
                    { value: 'basic-math-level-24', text: '• Basic Math L24' },
                    { value: 'basic-math-level-25', text: '• Basic Math L25' },
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
                label: 'Basic General Knowledge',
                options: [
                    { value: 'basic-general-knowledge-level-1',  text: '• Basic General Knowledge L1' },
                    { value: 'basic-general-knowledge-level-2',  text: '• Basic General Knowledge L2' },
                    { value: 'basic-general-knowledge-level-3',  text: '• Basic General Knowledge L3' },
                    { value: 'basic-general-knowledge-level-4',  text: '• Basic General Knowledge L4' },
                    { value: 'basic-general-knowledge-level-5',  text: '• Basic General Knowledge L5' },
                    { value: 'basic-general-knowledge-level-6',  text: '• Basic General Knowledge L6' },
                    { value: 'basic-general-knowledge-level-7',  text: '• Basic General Knowledge L7' },
                    { value: 'basic-general-knowledge-level-8',  text: '• Basic General Knowledge L8' },
                    { value: 'basic-general-knowledge-level-9',  text: '• Basic General Knowledge L9' },
                    { value: 'basic-general-knowledge-level-10', text: '• Basic General Knowledge L10' },
					{ value: 'basic-general-knowledge-level-11', text: '• Basic General Knowledge L11' },
					{ value: 'basic-general-knowledge-level-12', text: '• Basic General Knowledge L12' },
					{ value: 'basic-general-knowledge-level-13', text: '• Basic General Knowledge L13' },
					{ value: 'basic-general-knowledge-level-14', text: '• Basic General Knowledge L14' },
					{ value: 'basic-general-knowledge-level-15', text: '• Basic General Knowledge L15' },
					{ value: 'basic-general-knowledge-level-16', text: '• Basic General Knowledge L16' },
					{ value: 'basic-general-knowledge-level-17', text: '• Basic General Knowledge L17' },
					{ value: 'basic-general-knowledge-level-18', text: '• Basic General Knowledge L18' },
					{ value: 'basic-general-knowledge-level-19', text: '• Basic General Knowledge L19' },
					{ value: 'basic-general-knowledgegk-level-20', text: '• Basic General Knowledge L20' },
					{ value: 'basic-general-knowledgegk-level-21', text: '• Basic General Knowledge L21' },
					{ value: 'basic-general-knowledgegk-level-22', text: '• Basic General Knowledge L22' },
					{ value: 'basic-general-knowledgegk-level-23', text: '• Basic General Knowledge L23' },
					{ value: 'basic-general-knowledgegk-level-24', text: '• Basic General Knowledge L24' },
					{ value: 'basic-general-knowledgegk-level-25', text: '• Basic General Knowledge L25' },
					{ value: 'basic-general-knowledgegk-level-26', text: '• Basic General Knowledge L26' },
					{ value: 'basic-general-knowledgegk-level-27', text: '• Basic General Knowledge L27' },
                ]
            },
            {
                label: 'Numeracy (Class X)',
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
                label: 'Analytical Reasoning',
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
                label: 'Clock & Calendar',
                options: [
                    { value: 'upsc-clock-level-1', text: '• Clock & Calendar L1' },
					{ value: 'upsc-clock-level-2', text: '• Clock & Calendar L2' },
                    { value: 'upsc-clock-level-3', text: '• Clock & Calendar L3' },
                ]
            },
			{
                label: 'Decision Making',
                options: [
                    { value: 'upsc-decision-level-1', text: '• Decision Making L1' },
					{ value: 'upsc-decision-level-2', text: '• Decision Making L2' },
                    { value: 'upsc-decision-level-3', text: '• Decision Making L3' },
                ]
            },
			{
                label: 'Arguments & Conclusions',
                options: [
                    { value: 'upsc-arguments-level-1', text: '• Arguments & Conclusions L1' },
					{ value: 'upsc-arguments-level-2', text: '• Arguments & Conclusions L2' },
                    { value: 'upsc-arguments-level-3', text: '• Arguments & Conclusions L3' },
                ]
            },
			{
                label: 'Blood Relations',
                options: [
                    { value: 'upsc-blood-level-1', text: '• Blood Relations L1' },
					{ value: 'upsc-blood-level-2', text: '• Blood Relations L2' },
                    { value: 'upsc-blood-level-3', text: '• Blood Relations L3' },
                ]
            },
			{
                label: 'Code-Decode',
                options: [
                    { value: 'upsc-code-level-1', text: '• Code-Decode L1' },
					{ value: 'upsc-code-level-2', text: '• Code-Decode L2' },
                    { value: 'upsc-code-level-3', text: '• Code-Decode L3' },
                ]
            },
			{
                label: 'Direction Sense',
                options: [
                    { value: 'upsc-direction-level-1', text: '• Direction Sense L1' },
					{ value: 'upsc-direction-level-2', text: '• Direction Sense L2' },
                    { value: 'upsc-direction-level-3', text: '• Direction Sense L3' },
                ]
            },
			{
                label: 'Ranking & Time Secquence',
                options: [
                    { value: 'upsc-ranktime-level-1', text: '• Ranking & Time Seq. L1' },
					{ value: 'upsc-ranktime-level-2', text: '• Ranking & Time Seq. L2' },
                    { value: 'upsc-ranktime-level-3', text: '• Ranking & Time Seq. L3' },
                ]
            },
			{
                label: 'Statement & Assumptions',
                options: [
                    { value: 'upsc-statement-level-1', text: '• Statement & Assumptions L1' },
					{ value: 'upsc-statement-level-2', text: '• Statement & Assumptions L2' },
                    { value: 'upsc-statement-level-3', text: '• Statement & Assumptions L3' },
                ]
            },
			{
                label: 'Syllogisms',
                options: [
                    { value: 'upsc-syllogisms-level-1', text: '• Syllogisms L1' },
					{ value: 'upsc-syllogisms-level-2', text: '• Syllogisms L2' },
                    { value: 'upsc-syllogisms-level-3', text: '• Syllogisms L3' },
                ]
            },
			{
                label: 'Data Sufficiency: Geometry',
                options: [
                    { value: 'upsc-geometry-level-1', text: '• Geometry L1' },
					{ value: 'upsc-geometry-level-2', text: '• Geometry L2' },
					{ value: 'upsc-geometry-level-3', text: '• Geometry L3' },
                ]
            },
			{
                label: 'Data Sufficiency: Profit & Loss',
                options: [
                    { value: 'upsc-profitloss-level-1', text: '• Profit & Loss L1' },
					{ value: 'upsc-profitloss-level-2', text: '• Profit & Loss L2' },
					{ value: 'upsc-profitloss-level-3', text: '• Profit & Loss L3' },
                ]
            },
			{
                label: 'Physics : Forces & Motion',
                options: [
                    { value: 'physics-forces-motion-level-1', text: '• Forces & Motion L1' },
					{ value: 'physics-forces-motion-level-2', text: '• Forces & Motion L2' },
					{ value: 'physics-forces-motion-level-3', text: '• Forces & Motion L3' },
                ]
            },
			{
                label: 'Physics : Energy & Power',
                options: [
                    { value: 'physics-energy-power-level-1', text: '• Energy & Power L1' },
					{ value: 'physics-energy-power-level-2', text: '• Energy & Power L2' },
					{ value: 'physics-energy-power-level-3', text: '• Energy & Power L3' },
                ]
            },
			{
                label: 'Physics : Waves & Sound',
                options: [
                    { value: 'physics-waves-sound-level-1', text: '• Waves & Sound L1' },
					{ value: 'physics-waves-sound-level-2', text: '• Waves & Sound L2' },
					{ value: 'physics-waves-sound-level-3', text: '• Waves & Sound L3' },
                ]
            },
			{
                label: 'Physics : Light & Optics',
                options: [
                    { value: 'physics-light-optics-level-1', text: '• Light & Optics L1' },
					{ value: 'physics-light-optics-level-2', text: '• Light & Optics L2' },
					{ value: 'physics-light-optics-level-3', text: '• Light & Optics L3' },
                ]
            },
			{
                label: 'Physics : Electricity & Magnetism',
                options: [
                    { value: 'physics-electricity-magnetism-level-1', text: '• Electricity & Magnetism L1' },
					{ value: 'physics-electricity-magnetism-level-2', text: '• Electricity & Magnetism L2' },
					{ value: 'physics-electricity-magnetism-level-3', text: '• Electricity & Magnetism L3' },
                ]
            },
			{
                label: 'Physics : Atomic & Nuclear',
                options: [
                    { value: 'physics-atomic-nuclear-level-1', text: '• Atomic & Nuclear L1' },
					{ value: 'physics-atomic-nuclear-level-2', text: '• Atomic & Nuclear L2' },
					{ value: 'physics-atomic-nuclear-level-3', text: '• Atomic & Nuclear L3' },
                ]
            },
			{
                label: 'Physics : Astrophysics',
                options: [
                    { value: 'physics-astrophysics-level-1', text: '• Astrophysics L1' },
					{ value: 'physics-astrophysics-level-2', text: '• Astrophysics L2' },
					{ value: 'physics-astrophysics-level-3', text: '• Astrophysics L3' },
                ]
            },
			{
                label: 'Chemistry : Atomic Structure',
                options: [
                    { value: 'chemistry-atomic-structure-level-1', text: '• Atomic Structure L1' },
					{ value: 'chemistry-atomic-structure-level-2', text: '• Atomic Structure L2' },
					{ value: 'chemistry-atomic-structure-level-3', text: '• Atomic Structure L3' },
                ]
            },			
			{
                label: 'Chemistry : Chemical Bonding',
                options: [
                    { value: 'chemistry-chemical-bonding-level-1', text: '• Chemical Bonding L1' },
					{ value: 'chemistry-chemical-bonding-level-2', text: '• Chemical Bonding L2' },
					{ value: 'chemistry-chemical-bonding-level-3', text: '• Chemical Bonding L3' },
                ]
            },
			{
                label: 'Computer Science : Networks',
                options: [
                    { value: 'cs-networks-level-1', text: '• Networks L1' },
					{ value: 'cs-networks-level-2', text: '• Networks L2' },
					{ value: 'cs-networks-level-3', text: '• Networks L3' },
                ]
            },
			{
                label: 'Computer Science : Data Representation',
                options: [
                    { value: 'cs-data-representation-level-1', text: '• Data Representation L1' },
					{ value: 'cs-data-representation-level-2', text: '• Data Representation L2' },
					{ value: 'cs-data-representation-level-3', text: '• Data Representation L3' },
                ]
            },
			{
                label: 'Computer Science : Algorithms',
                options: [
                    { value: 'cs-algorithms-level-1', text: '• Algorithms L1' },
					{ value: 'cs-algorithms-level-2', text: '• Algorithms L2' },
					{ value: 'cs-algorithms-level-3', text: '• Algorithms L3' },
                ]
            },
			{
                label: 'Biology : Cell Biology',
                options: [
                    { value: 'biology-cell-level-1', text: '• Cell Biology L1' },
					{ value: 'biology-cell-level-2', text: '• Cell Biology L2' },
					{ value: 'biology-cell-level-3', text: '• Cell Biology L3' },
                ]
            },
			{
                label: 'Biology : Human Body Systems',
                options: [
                    { value: 'biology-human-body-level-1', text: '• Human Body Systems L1' },
					{ value: 'biology-human-body-level-2', text: '• Human Body Systems L2' },
					{ value: 'biology-human-body-level-3', text: '• Human Body Systems L3' },
                ]
            },
			{
                label: 'Biology : Ecology & Ecosystems',
                options: [
                    { value: 'biology-ecology-ecosystems-level-1', text: '• Ecology & Ecosystems L1' },
					{ value: 'biology-ecology-ecosystems-level-2', text: '• Ecology & Ecosystems L2' },
					{ value: 'biology-ecology-ecosystems-level-3', text: '• Ecology & Ecosystems L3' },
                ]
            },
			{
                label: 'Environmental Science : Pollution',
                options: [
                    { value: 'environmental-pollution-level-1', text: '• Pollution L1' },
					{ value: 'environmental-pollution-level-2', text: '• Pollution L2' },
					{ value: 'environmental-pollution-level-3', text: '• Pollution L3' },
                ]
            },
			{
                label: 'Environmental Science : Ecosystems',
                options: [
                    { value: 'environmental-ecosystems-level-1', text: '• Ecosystems L1' },
					{ value: 'environmental-ecosystems-level-2', text: '• Ecosystems L2' },
					{ value: 'environmental-ecosystems-level-3', text: '• Ecosystems L3' },
                ]
            },
			{
                label: 'Environmental Science : Renewable Energy',
                options: [
                    { value: 'environmental-renewable-level-1', text: '• Renewable Energy L1' },
					{ value: 'environmental-renewable-level-2', text: '• Renewable Energy L2' },
					{ value: 'environmental-renewable-level-3', text: '• Renewable Energy L3' },
                ]
            },
			{
                label: 'Environmental Science : Biodiversity',
                options: [
                    { value: 'environmental-biodiversity-level-1', text: '• Biodiversity L1' },
					{ value: 'environmental-biodiversity-level-2', text: '• Biodiversity L2' },
					{ value: 'environmental-biodiversity-level-3', text: '• Biodiversity L3' },
                ]
            },
			{
                label: 'Environmental Science : Human Impact',
                options: [
                    { value: 'environmental-human-level-1', text: '• Human Impact L1' },
					{ value: 'environmental-human-level-2', text: '• Human Impact L2' },
					{ value: 'environmental-human-level-3', text: '• Human Impact L3' },
                ]
            },
			{
                label: 'Environmental Science : Sustainability',
                options: [
                    { value: 'environmental-sustainability-level-1', text: '• Sustainability L1' },
					{ value: 'environmental-sustainability-level-2', text: '• Sustainability L2' },
					{ value: 'environmental-sustainability-level-3', text: '• Sustainability L3' },
                ]
            },
			{
                label: 'Environmental Science : Water Cycle',
                options: [
                    { value: 'environmental-water-level-1', text: '• Water Cycle L1' },
					{ value: 'environmental-water-level-2', text: '• Water Cycle L2' },
					{ value: 'environmental-water-level-3', text: '• Water Cycle L3' },
                ]
            },
			{
                label: 'Mathematics : Simple & Compound Ratio',
                options: [
                    { value: 'upsc-math-simple-ratio-level-1', text: '• Simple & Compound Ratio L1' },
					{ value: 'upsc-math-simple-ratio-level-2', text: '• Simple & Compound Ratio L2' },
					{ value: 'upsc-math-simple-ratio-level-3', text: '• Simple & Compound Ratio L3' },
                ]
            },
			{
                label: 'Mathematics : Approximation',
                options: [
                    { value: 'upsc-math-approximation-level-1', text: '• Approximation L1' },
					{ value: 'upsc-math-approximation-level-2', text: '• Approximation L2' },
					{ value: 'upsc-math-approximation-level-3', text: '• Approximation L3' },
                ]
            },
			{
                label: 'Mathematics : BODMAS',
                options: [
                    { value: 'upsc-math-bodmas-level-1', text: '• BODMAS L1' },
					{ value: 'upsc-math-bodmas-level-2', text: '• BODMAS L2' },
					{ value: 'upsc-math-bodmas-level-3', text: '• BODMAS L3' },
                ]
            },
			{
                label: 'Mathematics : Divisibility',
                options: [
                    { value: 'upsc-math-divisibility-level-1', text: '• Divisibility L1' },
					{ value: 'upsc-math-divisibility-level-2', text: '• Divisibility L2' },
					{ value: 'upsc-math-divisibility-level-3', text: '• Divisibility L3' },
                ]
            },
			{
                label: 'Mathematics : Factors & Multiples',
                options: [
                    { value: 'upsc-math-factors-multiples-level-1', text: '• Factors & Multiples L1' },
					{ value: 'upsc-math-factors-multiples-level-2', text: '• Factors & Multiples L2' },
					{ value: 'upsc-math-factors-multiples-level-3', text: '• Factors & Multiples L3' },
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

