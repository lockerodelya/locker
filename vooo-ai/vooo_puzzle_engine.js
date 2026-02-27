// ============================================
// VOOO AI Puzzle Engine - UNIFIED v3.0
// Handles: Math, Reasoning, Pattern, Sequence,
//          Sudoku, Grid, Code, Lateral + all others
// ============================================

class VOOOPuzzleEngine {
    constructor() {
        this.currentPuzzle    = null;
        this.currentTemplate  = null;
        this.categoryData     = null;
        this.score            = 0;
        this.totalAttempts    = 0;
        this.currentCategory  = 'foundation_math';

        // ── Template-rotation state (per category, persisted) ──
        this._tmProgress = {};   // { [cat]: { shuffled:[], idx:0 } }

        this.categories = {
			'basic-math-level-1'            : 'basic-math-level-1.json',
			'basic-math-level-2'            : 'basic-math-level-2.json',
			'basic-math-level-3'            : 'basic-math-level-3.json',
			'basic-math-level-4'            : 'basic-math-level-4.json',
			'basic-math-level-5'            : 'basic-math-level-5.json',
			'basic-math-level-6'            : 'basic-math-level-6.json',
            'basic-math-level-7'            : 'basic-math-level-7.json',
            'intermediate_math'             : 'intermediate_math.json',
            'advanced_math'                 : 'advanced_math.json',
            'scholar_math'                  : 'scholar_math.json',
            'syllogistic_reasoning'         : 'syllogistic_reasoning.json',
            'analogical_reasoning'          : 'analogical_reasoning.json',
            'ifthen_reasoning'              : 'ifthen_reasoning.json',
            'intermediate_reasoning'        : 'intermediate_reasoning.json',
            'advanced_reasoning'            : 'advanced_reasoning.json',
            'intermediate_sudoku'           : 'intermediate_sudoku.json',
            'advanced_sudoku'               : 'advanced_sudoku.json',
            'intermediate_grid'             : 'intermediate_grid.json',
            'advanced_grid'                 : 'advanced_grid.json',
            'intermediate_sequence'         : 'intermediate_sequence.json',
            'advanced_sequence'             : 'advanced_sequence.json',
            'intermediate_code'             : 'intermediate_code.json',
            'advanced_code'                 : 'advanced_code.json',
            'intermediate_lateral'          : 'intermediate_lateral.json',
            'advanced_lateral'              : 'advanced_lateral.json',
            'foundation_pattern'            : 'foundation_pattern.json',
            'intermediate_pattern'          : 'intermediate_pattern.json',
            'advanced_pattern'              : 'advanced_pattern.json',
            'problem_comparison_beginner'   : 'problem_comparison_beginner.json',
            'problem_time_beginner'         : 'problem_time_beginner.json',
            'problem_probability_beginner'  : 'problem_probability_beginner.json',
            'problem_classification_beginner': 'problem_classification_beginner.json',
            'problem_solving_beginner'      : 'problem_solving_beginner.json',
            'problem_causeeffect_beginner'  : 'problem_causeeffect_beginner.json'
        };

        this.shapeMap = {
            'circle':'○','square':'□','triangle':'△',
            'star':'★','heart':'♥','diamond':'◇',
            'rectangle':'▢','hexagon':'⬡'
        };
        this.colorMap = {
            'red':'🔴','blue':'🔵','yellow':'🟡','green':'🟢',
            'black':'⚫','white':'⚪','orange':'🟠','purple':'🟣',
            'brown':'🟤','pink':'🩷'
        };
        this.sizeComparison = {
            '🐘':'big','🦒':'big','🐋':'big','🏠':'big','🌳':'big',
            '🦏':'big','🦛':'big','🐪':'big','🦘':'big','🏔️':'big',
            '🚂':'big','🚗':'big','🚌':'big','🚛':'big','🏢':'big',
            '🐭':'small','🐦':'small','🐜':'small','📦':'small','🌸':'small',
            '🐛':'small','🐌':'small','🐞':'small','🦗':'small','🌼':'small',
            '🏀':'small','⚽':'small','🎾':'small','🏐':'small','📱':'small'
        };

        // ── Extra number-theory arrays for variable definitions ──
        this._arrKeys = [
            'primes','bell_numbers','perrin','cake','motzkin','schroder','narayana',
            'partitions','mersenne','fermat','carmichael','carol','kynea','thabit',
            'sophie','safe','primorial','giuga','cullen','woodall','highly_composite',
            'superior_hc','abundant','deficient','perfect','semiprime','sphenic'
        ];

        // ── Shared math helpers injected into every eval context ──
        // This is the FIX: expose min, max, abs, floor, ceil, round, sqrt, pow, log
        this._evalHelpers = {
            min:   (...a) => Math.min(...a),
            max:   (...a) => Math.max(...a),
            abs:   x => Math.abs(x),
            floor: x => Math.floor(x),
            ceil:  x => Math.ceil(x),
            round: x => Math.round(x),
            sqrt:  x => Math.sqrt(x),
            pow:   (x,y) => Math.pow(x,y),
            log:   x => Math.log(x),
            log2:  x => Math.log2(x),
            log10: x => Math.log10(x),
            sign:  x => Math.sign(x),
            trunc: x => Math.trunc(x),
			sorted: arr => [...arr].sort((a,b) => a - b),
        };
    }

    // ── Helper: build the arg list and body for eval Functions ──
    // Returns { argNames, argValues } so callers can do:
    //   new Function(...argNames, 'return ' + expr)(...argValues)
    _evalContext(extraVars = {}) {
        const helpers = this._evalHelpers;
        const helperNames  = Object.keys(helpers);
        const helperValues = Object.values(helpers);
        const argNames  = ['Math', 'factorial', ...helperNames];
        const argValues = [Math,   n => this.factorial(n), ...helperValues];
        return { argNames, argValues };
    }

    // ═══════════════════════════════════════════════
    // NUMBER THEORY HELPERS
    // ═══════════════════════════════════════════════
    factorial(n){n=Math.round(n);if(n<=1)return 1;let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
    isPrime(n){if(n<2)return false;if(n===2)return true;if(n%2===0)return false;for(let i=3;i*i<=n;i+=2)if(n%i===0)return false;return true;}
    nextPrime(n){let c=n+1;while(!this.isPrime(c))c++;return c;}
    sigma(n){let s=0;for(let i=1;i<=n;i++)if(n%i===0)s+=i;return s;}
    phi(n){let r=n,t=n;for(let p=2;p*p<=t;p++){if(t%p===0){while(t%p===0)t=Math.floor(t/p);r-=Math.floor(r/p);}}if(t>1)r-=Math.floor(r/t);return r;}
    partition(n){const p=new Array(n+1).fill(0);p[0]=1;for(let k=1;k<=n;k++)for(let i=k;i<=n;i++)p[i]+=p[i-k];return p[n];}
    primeFactors(n){const f=[];let t=n;for(let p=2;p*p<=t;p++){if(t%p===0){let c=0;while(t%p===0){c++;t=Math.floor(t/p);}f.push({prime:p,exp:c});}}if(t>1)f.push({prime:t,exp:1});return f;}
    isSphenic(n){if(n<2)return false;const f=this.primeFactors(n);return f.length===3&&f.every(x=>x.exp===1);}
    nextSphenic(n){let c=n+1;while(!this.isSphenic(c))c++;return c;}
    isSemiprime(n){if(n<4)return false;return this.primeFactors(n).reduce((s,f)=>s+f.exp,0)===2;}
    nextSemiprime(n){let c=n+1;while(!this.isSemiprime(c))c++;return c;}
    isAbundant(n){return this.sigma(n)-n>n;}
    nextAbundant(n){let c=n+1;while(!this.isAbundant(c))c++;return c;}
    isDeficient(n){return this.sigma(n)-n<n;}
    nextDeficient(n){let c=n+1;while(!this.isDeficient(c))c++;return c;}
    isPerfect(n){return this.sigma(n)-n===n;}
    nextPerfect(n){let c=n+1;while(!this.isPerfect(c))c++;return c;}
    primorial(n){let r=1,count=0,c=2;while(count<n){if(this.isPrime(c)){r*=c;count++;}c++;}return r;}
    countDivisors(n){let c=0;for(let i=1;i<=n;i++)if(n%i===0)c++;return c;}
    isHighlyComposite(n){const d=this.countDivisors(n);for(let i=1;i<n;i++)if(this.countDivisors(i)>=d)return false;return true;}
    nextHighlyComposite(n){let c=n+1;while(!this.isHighlyComposite(c))c++;return c;}
    isSophieGermain(n){return this.isPrime(n)&&this.isPrime(2*n+1);}
    nextSophieGermain(n){let c=n+1;while(!this.isSophieGermain(c))c++;return c;}
    isSafePrime(n){return this.isPrime(n)&&n>2&&this.isPrime((n-1)/2);}
    nextSafePrime(n){let c=n+1;while(!this.isSafePrime(c))c++;return c;}
    nextFactorialPrime(n){let k=2;while(k<=15){const f=this.factorial(k);if(this.isPrime(f+1)&&f+1>n)return f+1;if(this.isPrime(f-1)&&f-1>n)return f-1;k++;}return this.factorial(n+1)+1;}
    nextSuperiorHighlyComposite(n){const k=[2,6,12,60,120,360,2520,5040,55440,720720];for(const v of k)if(v>n)return v;return n*2;}
    nextGiuga(n){const k=[30,858,1722,66198,2214408306];for(const v of k)if(v>n)return v;return 858;}
    gcd(a,b){a=Math.abs(Math.floor(a));b=Math.abs(Math.floor(b));while(b!==0){const t=b;b=a%b;a=t;}return a;}
    lcm(a,b){return Math.abs(Math.floor(a*b))/this.gcd(a,b);}
    fibonacci(n){n=Math.floor(n);if(n<=0)return 0;if(n===1)return 1;let a=0,b=1;for(let i=2;i<=n;i++){const t=a+b;a=b;b=t;}return b;}
    binomialCoeff(n,k){n=Math.floor(n);k=Math.floor(k);if(k<0||k>n)return 0;if(k===0||k===n)return 1;k=Math.min(k,n-k);let r=1;for(let i=0;i<k;i++){r*=(n-i);r/=(i+1);}return Math.round(r);}
    permutations(n,k){n=Math.floor(n);k=Math.floor(k);if(k<0||k>n)return 0;let r=1;for(let i=0;i<k;i++)r*=(n-i);return r;}
    slopeBetwPoints(x1,y1,x2,y2){if(x2===x1)return null;return parseFloat(((y2-y1)/(x2-x1)).toFixed(4));}
    sinDeg(a){return parseFloat(Math.sin(a*Math.PI/180).toFixed(4));}
    cosDeg(a){return parseFloat(Math.cos(a*Math.PI/180).toFixed(4));}
    tanDeg(a){const r=Math.tan(a*Math.PI/180);return Math.abs(r)>1e6?'undefined':parseFloat(r.toFixed(4));}
    quadraticSolution(a,b,c){const d=b*b-4*a*c;if(d<0)return null;if(d===0)return parseFloat((-b/(2*a)).toFixed(4));return parseFloat(((-b+Math.sqrt(d))/(2*a)).toFixed(4));}
    diceProbability(s){const f={2:1,3:2,4:3,5:4,6:5,7:6,8:5,9:4,10:3,11:2,12:1};return parseFloat(((f[s]||0)/36).toFixed(4));}
    modInverse(a,m){a=((a%m)+m)%m;for(let x=1;x<m;x++)if((a*x)%m===1)return x;return null;}

    // ═══════════════════════════════════════════════
    // APPLY NAMED MATH FUNCTIONS IN AN EXPRESSION
    // ═══════════════════════════════════════════════
    _mathFnList(){
        return [
            ['factorial',         x=>this.factorial(Math.round(x))],
            ['next_prime',        x=>this.nextPrime(Math.round(x))],
            ['sigma',             x=>this.sigma(Math.round(x))],
            ['phi',               x=>this.phi(Math.round(x))],
            ['euler_phi',         x=>this.phi(Math.round(x))],
            ['partition',         x=>this.partition(Math.round(x))],
            ['next_sphenic',      x=>this.nextSphenic(Math.round(x))],
            ['next_semiprime',    x=>this.nextSemiprime(Math.round(x))],
            ['next_abundant',     x=>this.nextAbundant(Math.round(x))],
            ['next_deficient',    x=>this.nextDeficient(Math.round(x))],
            ['next_perfect',      x=>this.nextPerfect(Math.round(x))],
            ['primorial',         x=>this.primorial(Math.round(x))],
            ['next_highly_composite', x=>this.nextHighlyComposite(Math.round(x))],
            ['next_superior_highly_composite', x=>this.nextSuperiorHighlyComposite(Math.round(x))],
            ['next_sophie_germain',x=>this.nextSophieGermain(Math.round(x))],
            ['next_safe_prime',   x=>this.nextSafePrime(Math.round(x))],
            ['next_factorial_prime',x=>this.nextFactorialPrime(Math.round(x))],
            ['next_giuga',        x=>this.nextGiuga(Math.round(x))],
            ['fibonacci',         x=>this.fibonacci(Math.round(x))],
            ['log_base_2',        x=>x<=0?null:parseFloat(Math.log2(x).toFixed(4))],
            ['log_base_10',       x=>x<=0?null:parseFloat(Math.log10(x).toFixed(4))],
            ['sin_degrees',       x=>this.sinDeg(x)],
            ['cos_degrees',       x=>this.cosDeg(x)],
            ['tan_degrees',       x=>this.tanDeg(x)],
            ['quadratic_solution',(a,b,c)=>this.quadraticSolution(a,b,c)],
            ['slope_between_points',(x1,y1,x2,y2)=>this.slopeBetwPoints(x1,y1,x2,y2)],
            ['solve_system_x',(a,b,c,d,e,f)=>{const det=a*e-b*d;if(det===0)return null;return parseFloat(((c*e-b*f)/det).toFixed(4));}],
            ['median_of_five',(a,b,c,d,e)=>parseFloat([a,b,c,d,e].sort((x,y)=>x-y)[2].toFixed(4))],
            ['dice_probability',  x=>this.diceProbability(Math.round(x))],
            ['mod_inverse',       (a,m)=>this.modInverse(Math.round(a),Math.round(m))],
            ['gcd',               (a,b)=>this.gcd(a,b)],
            ['lcm',               (a,b)=>this.lcm(a,b)],
            ['binomial_coefficient',(n,k)=>this.binomialCoeff(n,k)],
            ['permutations',      (n,k)=>this.permutations(n,k)],
            ['is_prime',          x=>this.isPrime(Math.round(x))]
        ];
    }

    applyMathFunctions(ev){
        const fns=this._mathFnList();
        const numArg='(-?\\d+(?:\\.\\d+)?)';
        const multiArgRe=(name)=>new RegExp(
            name+'\\(\\s*'+numArg+'(?:\\s*,\\s*'+numArg+')*\\s*\\)','g'
        );
        for(let pass=0;pass<20;pass++){
            let changed=false;
            ev=ev.replace(/\((-?\d+(?:\.\d+)?)\)\s*([\+\-\*\/])\s*(-?\d+(?:\.\d+)?)/g,(m,a,op,b)=>{try{const r=new Function('return '+a+op+b)();changed=true;return String(r);}catch(e){return m;}});
            ev=ev.replace(/(-?\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*\((-?\d+(?:\.\d+)?)\)/g,(m,a,op,b)=>{try{const r=new Function('return '+a+op+b)();changed=true;return String(r);}catch(e){return m;}});
            ev=ev.replace(/\((-?\d+(?:\.\d+)?)\)\s*([\+\-\*\/])\s*\((-?\d+(?:\.\d+)?)\)/g,(m,a,op,b)=>{try{const r=new Function('return '+a+op+b)();changed=true;return String(r);}catch(e){return m;}});
            ev=ev.replace(/(?<![a-zA-Z_(])\((-?\d+(?:\.\d+)?)\)(?![a-zA-Z_(\d])/g,(m,n)=>{changed=true;return n;});
            for(const[name,fn]of fns){
                const re=multiArgRe(name);
                ev=ev.replace(re,(match)=>{
                    try{
                        const inner=match.slice(name.length+1,-1);
                        const vals=inner.split(',').map(a=>Number(a.trim()));
                        if(vals.some(isNaN))return match;
                        const result=fn(...vals);
                        if(result===null||result===undefined){changed=true;return 'null';}
                        changed=true;
                        return String(result);
                    }catch(e){return match;}
                });
            }
            if(!changed)break;
        }
        return ev;
    }

    // ═══════════════════════════════════════════════
    // PLAIN-TEXT GUARD
    // ═══════════════════════════════════════════════
    isPlainText(calc){
        if(!calc)return true;
        const t=calc.trim();
        if(t===''||t==='null')return true;
        if(/^[A-Za-zÀ-ÿ\s\-\/]+$/.test(t))return true;
        if(/generate|lookup|rules|decryption|transposition|multiplication|substitution|autokey|checkerboard|ambiguity|complexity|dynamic/i.test(t))return true;
        return false;
    }

    isTemplateComputable(template){
        if(!template.calculation)return false;
        const c=template.calculation.trim();
        if(c===''||c==='null')return false;
        if(/^[A-Z][A-Z0-9_]*$/.test(c))return true;
        if(this.isPlainText(c))return false;
        return true;
    }

    // ═══════════════════════════════════════════════
    // VARIABLE GENERATION
    // ═══════════════════════════════════════════════
generateVariables(defs, constraints=[]){
    const MAX_RETRIES=50;
    for(let attempt=0;attempt<MAX_RETRIES;attempt++){
        const v={};
        if(!defs)return v;
        for(const[name,def]of Object.entries(defs)){
            if(def.value!==undefined){v[name]=def.value;}
            else if(def.values!==undefined){v[name]=def.values[Math.floor(Math.random()*def.values.length)];}
            else if(def.calc!==undefined){try{v[name]=this.evaluateExpression(def.calc,v)??0;}catch(e){v[name]=0;}}
            else{
                let handled=false;
                for(const k of this._arrKeys){
                    if(def[k]!==undefined){v[name]=def[k][Math.floor(Math.random()*(def[k].length-1))];handled=true;break;}
                }
                if(!handled){
                    const min=def.min??1, max=def.max??10, step=def.step||1;
                    v[name]=min+(Math.floor(Math.random()*(Math.floor((max-min)/step)+1))*step);
                    if(def.primes_only){let x=v[name];while(!this.isPrime(x)&&x<=max)x++;if(!this.isPrime(x)){x=v[name];while(!this.isPrime(x)&&x>=min)x--;}v[name]=x;}
                    if(def.perfect_only){let x=v[name];while(!this.isPerfect(x)&&x<=max*100)x++;v[name]=x;}
                }
            }
        }
        if(this._checkConstraints(constraints,v))return v;
    }
    // Fallback: return safe defaults if constraints never satisfied
    const v={};
    if(defs)for(const[name,def]of Object.entries(defs)){
        if(def.value!==undefined)v[name]=def.value;
        else if(def.values!==undefined)v[name]=def.values[0];
        else v[name]=def.min??1;
    }
    return v;
}

_checkConstraints(constraints,variables){
    if(!constraints||constraints.length===0)return true;
    for(const constraint of constraints){
        try{
            let expr=constraint;
            for(const[k,v]of Object.entries(variables))
                expr=expr.replace(new RegExp('\\b'+k+'\\b','g'),'('+v+')');
            if(!new Function('return '+expr)())return false;
        }catch(e){return true;}
    }
    return true;
}

    // ═══════════════════════════════════════════════
    // DERIVED VARIABLES
    // ═══════════════════════════════════════════════
    computeDerivedVariables(template,variables){
        const d={...variables};
        const pattern=template.pattern||'';
        const explanation=template.explanation||'';
        const patArr=[]; const ptr=/\[([A-Z][A-Z0-9_]*)\]/g; let m;
        while((m=ptr.exec(pattern))!==null)patArr.push(m[1]);
        const expArr=[]; const etr=/\[([^\]]+)\]/g;
        while((m=etr.exec(explanation))!==null)expArr.push(m[1]);
        for(let i=0;i<patArr.length;i++){
            if(!d.hasOwnProperty(patArr[i])&&expArr[i]){
                const val=this.evaluateBracketExpression(expArr[i],d);
                if(val!==null)d[patArr[i]]=val;
            }
        }
        if(d.hasOwnProperty('A')&&d.hasOwnProperty('STEP')){
            if(!d.B)d.B=d.A+d.STEP;
            if(!d.C)d.C=d.A+d.STEP*2;
            if(!d.D)d.D=d.A+d.STEP*3;
        }else if(d.hasOwnProperty('A')){
            if(!d.B)d.B=d.A+1;
            if(!d.C)d.C=d.A+2;
            if(!d.D)d.D=d.A+3;
        }
        return d;
    }

    // ═══════════════════════════════════════════════
    // EXPRESSION EVALUATOR  (core)
    // ═══════════════════════════════════════════════
    evaluateBracketExpression(expr,variables){
        let e=expr;
        e=e.replace(/×/g,'*').replace(/÷/g,'/');
        if(/[\+\-\*\^%]/.test(e)&&!/[?:'"]/.test(e))
            e=e.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g,'$1*$2');
        for(const[k,v]of Object.entries(variables))
            if(typeof v==='string'&&isNaN(v))e=e.replace(new RegExp('\\b'+k+'\\b','g'),'"'+v+'"');
        for(const[k,v]of Object.entries(variables))
            if(typeof v!=='string'||!isNaN(v))e=e.replace(new RegExp('\\b'+k+'\\b','g'),'('+v+')');
        e=this.applyMathFunctions(e);
        try{
            // ✅ FIX: inject min, max, and other Math helpers into eval scope
            const {argNames, argValues} = this._evalContext();
            const r=new Function(...argNames,'return '+e)(...argValues);
            return(typeof r==='number')?r:(typeof r==='string')?r:null;
        }catch(err){return null;}
    }

    evaluateExpression(expr,variables){
        let ev=expr;
        if(this.isPlainText(ev))return null;

        // if-then-else
        ev=ev.replace(/if\s+(.+?)\s+then\s+(.+?)\s+else\s+(.+)/g,(match,cond,thenV,elseV)=>{
            try{
                let c=cond;
                for(const[k,v]of Object.entries(variables))
                    c=c.replace(new RegExp('\\b'+k+'\\b','g'),(typeof v==='string'&&isNaN(v))?'"'+v+'"':JSON.stringify(v));
                return new Function('return '+c)()?thenV.trim():elseV.trim().replace(/'/g,'');
            }catch(e){return match;}
        });

        ev=ev.replace(/×/g,'*').replace(/÷/g,'/');
        if(/[\+\-\*\^%]/.test(ev)&&!/[?:'"]/.test(ev))
            ev=ev.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g,'$1*$2');

        for(const[k,v]of Object.entries(variables))
            if(typeof v==='string'&&isNaN(v))ev=ev.replace(new RegExp('\\b'+k+'\\b','g'),'"'+v+'"');
        for(const[k,v]of Object.entries(variables))
            if(typeof v!=='string'||!isNaN(v))ev=ev.replace(new RegExp('\\b'+k+'\\b','g'),'('+v+')');

        ev=this.applyMathFunctions(ev);

        // repeat(EMOJI, COUNT)
        if(ev.includes('repeat(')){
            ev=ev.replace(/repeat\(([^,]+),\s*([^)]+)\)/g,(match,emoji,count)=>{
                const ek=emoji.trim().replace(/['"()\s]/g,'');
                const ck=count.trim().replace(/['"()\s]/g,'');
                const ev2=variables[ek]!==undefined?variables[ek]:ek;
                const cv=variables[ck]!==undefined?parseInt(variables[ck]):parseInt(ck);
                if(!isNaN(cv)&&cv>0)return JSON.stringify(String(ev2).repeat(cv));
                return match;
            });
        }

        // next_in_pattern
        if(ev.includes('next_in_pattern(')){
            ev=ev.replace(/next_in_pattern\(([^)]+)\)/g,(match,p)=>
                JSON.stringify(this._nextInPattern(p.trim().replace(/['"]/g,''),variables)));
        }

        // generate_options
        if(ev.includes('generate_options(')){
            ev=ev.replace(/generate_options\(([^,]+),\s*([^)]+)\)/g,(match,num,emoji)=>{
                const nk=num.trim().replace(/['"()\s]/g,'');
                const ek=emoji.trim().replace(/['"()\s]/g,'');
                const nv=variables[nk]!==undefined?parseInt(variables[nk]):parseInt(nk);
                const ev2=variables[ek]!==undefined?variables[ek]:ek;
                return JSON.stringify(this._generateVisualOptions(nv,ev2,variables));
            });
        }

        try{
            if(ev.startsWith('[')&&ev.endsWith(']')){try{return JSON.parse(ev);}catch(e){return[];}}
            if((ev.startsWith('"')&&ev.endsWith('"'))||(ev.startsWith("'")&&ev.endsWith("'")))return ev.slice(1,-1);
            if(ev==='true')return true;
            if(ev==='false')return false;
            if(ev==='null')return null;
            if(!isNaN(ev)&&ev.trim()!=='')return Number(ev);
            if(/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(ev))return ev;
            // ✅ FIX: inject min, max, and other Math helpers into eval scope
            const {argNames, argValues} = this._evalContext();
            const result=new Function(...argNames,'return '+ev)(...argValues);
            return result;
        }catch(e){console.error('Eval error:',expr,'->',ev,e);return null;}
    }

    // ═══════════════════════════════════════════════
    // PATTERN / QUESTION / ANSWER
    // ═══════════════════════════════════════════════
    resolvePatternText(text,variables){
        let r=text;
        r=r.replace(/(\d)\[/g,'$1*[');
        for(const[k,v]of Object.entries(variables))r=r.replace(new RegExp(`\\[${k}\\]`,'g'),v);
        r=r.replace(/\[([^\]]+)\]/g,(match,inner)=>{
            const val=this.evaluateBracketExpression(inner,variables);
            return val!==null?val:match;
        });
        for(const[k,v]of Object.entries(variables))r=r.replace(new RegExp('\\b'+k+'\\b','g'),v);
        return r;
    }

    generateQuestion(template,variables){
        if(template.pattern_builder){try{return this.evaluateExpression(template.pattern_builder,variables);}catch(e){}}
        return this.resolvePatternText(template.pattern,variables);
    }

    calculateAnswer(template,variables){
        if(!template.calculation)return null;
        const calc=template.calculation.trim();
        if(calc===''||calc==='null')return null;
        if(this.isPlainText(calc))return null;

        if(/^[A-Z][A-Z0-9_]*$/.test(calc)){
            if(variables.hasOwnProperty(calc)){
                const val=variables[calc];
                if(template.answer_type==='shape_selector'&&typeof val==='string')return this.shapeMap[val]||val;
                if(template.answer_type==='color_picker'&&typeof val==='string')return this.colorMap[val]||val;
                if(typeof val==='number')return parseFloat(val.toFixed(4));
                return val;
            }
        }

        if(calc.includes('repeat('))return this.evaluateExpression(calc,variables);
        if(calc.includes('next_in_pattern(')){
            const pt=this.evaluateExpression(calc,variables);
            const opts=template.options||[];
            if(pt==='ABAB'||pt==='AABB')return opts[0]||'🔴';
            if(pt==='ABCABC')return opts[2]||'🔵';
            return opts[0]||'?';
        }

        const result=this.evaluateExpression(calc,variables);
        if(result===null||result===undefined)return null;
        if(typeof result==='string'&&/no |undefined|error|nan/i.test(result))return null;
        if(typeof result==='number'){
            if(!isFinite(result)||isNaN(result))return null;
            return parseFloat(result.toFixed(4));
        }
        return result;
    }

    // ═══════════════════════════════════════════════
    // OPTIONS GENERATION
    // ═══════════════════════════════════════════════
    generateOptions(correctAnswer,template,variables){
        if(template.options_builder){
            try{
                const opts=this.evaluateExpression(template.options_builder,variables);
                if(Array.isArray(opts)&&opts.length>=4)return this._shuffleArray(opts);
            }catch(e){}
        }

        if(template.options&&Array.isArray(template.options)){
            const opts=[...template.options];
            const correctStr=String(correctAnswer);
            if(opts.map(o=>String(o)).includes(correctStr)){
                const wrong=opts.filter(o=>String(o)!==correctStr);
                return this._shuffleArray([correctAnswer,...this._shuffleArray(wrong).slice(0,3)]);
            }
            const fallback=opts[0];
            const wrong=opts.filter(o=>String(o)!==String(fallback));
            return this._shuffleArray([fallback,...this._shuffleArray(wrong).slice(0,3)]);
        }

        if(template.answer_type==='shape_selector')return this._shuffleArray([...Object.values(this.shapeMap)]).slice(0,4);
        if(template.answer_type==='color_picker')return this._shuffleArray([...Object.values(this.colorMap)]).slice(0,4);
        if(template.answer_type==='comparison')return this._shuffleArray([variables.A_EMOJI,variables.B_EMOJI]);

        const options=[];
        const correctNum=Number(correctAnswer);
        if(!isNaN(correctNum)&&isFinite(correctNum)){
            const isInt=Number.isInteger(correctNum)||(Math.abs(correctNum-Math.round(correctNum))<0.0001);
            const isDecimal=!isInt&&Math.abs(correctNum)<1;
            const isSmall=Math.abs(correctNum)<=12;
            const fmt=v=>isInt?String(Math.round(v)):String(parseFloat(v.toFixed(isDecimal?4:2)));
            options.push(fmt(correctNum));
            const baseOffsets=isDecimal
                ?[0.1,-0.1,0.2,-0.2,0.25,-0.25,0.5,-0.5,0.3,-0.3]
                :isSmall
                    ?[1,2,3,-1,-2,-3,4,-4,5,-5,6,-6]
                    :[5,-5,10,-10,15,-15,20,-20,25,-25];
            for(const off of baseOffsets){
                if(options.length>=4)break;
                const wrong=correctNum+off;
                if(wrong<0&&correctNum>=0)continue;
                const ws=fmt(wrong);
                if(!options.includes(ws))options.push(ws);
            }
            let attempts=0;
            while(options.length<4&&attempts<60){
                attempts++;
                const sign=Math.random()>0.5?1:-1;
                const mag=Math.max(1,Math.abs(correctNum));
                let offset;
                if(mag>1000) offset=sign*Math.round(mag*0.05*(Math.floor(Math.random()*5)+1));
                else if(mag>100) offset=sign*(Math.floor(Math.random()*20)+1);
                else if(mag>10)  offset=sign*(Math.floor(Math.random()*5)+1);
                else             offset=sign*(Math.floor(Math.random()*4)+1);
                const wrong=correctNum+offset;
                const ws=fmt(wrong);
                if(!options.includes(ws))options.push(ws);
            }
        }else{
            options.push(String(correctAnswer));
            const fillers=['Option A','Option B','Option C'];
            for(let i=0;i<3;i++){
                let f=fillers[i];let dc=0;
                while(options.includes(f)&&dc<10){f=f+' '+String(i+dc);dc++;}
                options.push(f);
            }
        }
        return this._shuffleArray(options);
    }

    _generateVisualOptions(number,emoji,variables){
        const e=typeof emoji==='string'?emoji:(variables[emoji]||emoji);
        const c=parseInt(number);
        const opts=new Set();
        opts.add(e.repeat(c));
        let i=1;
        while(opts.size<4){if(i!==c)opts.add(e.repeat(i));i++;}
        return this._shuffleArray([...opts]);
    }

    _nextInPattern(pt){
        switch(pt){case'ABAB':return'🔴';case'AABB':return'🟡';case'ABCABC':return'🔵';default:return'?';}
    }

    // ═══════════════════════════════════════════════
    // TEMPLATE ROTATION  (Fisher-Yates, persisted)
    // ═══════════════════════════════════════════════
    _tmGetNext(total){
        const cat=this.currentCategory;
        const sKey='vooo_progress_'+cat;
        let prog=null;
        try{const s=localStorage.getItem(sKey);if(s)prog=JSON.parse(s);}catch(e){}

        if(!prog||prog.shuffledIndices.length!==total){
            prog={shuffledIndices:this._shuffleIndices(total),currentIndex:0};
        }

        const idx=prog.shuffledIndices[prog.currentIndex];
        prog.currentIndex++;
        if(prog.currentIndex>=total){
            prog.shuffledIndices=this._shuffleIndices(total);
            prog.currentIndex=0;
        }
        try{localStorage.setItem(sKey,JSON.stringify(prog));}catch(e){}
        return idx;
    }

    _shuffleIndices(n){
        const a=Array.from({length:n},(_,i)=>i);
        for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
        return a;
    }

    // ═══════════════════════════════════════════════
    // USED-QUESTION DEDUP  (hash-based)
    // ═══════════════════════════════════════════════
    _usedKey(){return'vooo_used_'+this.currentCategory;}
    _loadUsed(){try{const s=localStorage.getItem(this._usedKey());return s?JSON.parse(s):[];}catch(e){return[];}}
    _saveUsed(list){try{localStorage.setItem(this._usedKey(),JSON.stringify(list));}catch(e){}}
    _hash(templateId,variables){return btoa(unescape(encodeURIComponent(templateId+'_'+JSON.stringify(variables)))).substring(0,20);}
    clearUsedQuestions(){try{localStorage.removeItem(this._usedKey());}catch(e){}}

    // ═══════════════════════════════════════════════
    // VALIDATION
    // ═══════════════════════════════════════════════
    _validateOptions(options,correct){
        if(!options||options.length!==4)return false;
        if(new Set(options.map(o=>String(o))).size!==4)return false;
        if(!options.map(o=>String(o)).includes(String(correct)))return false;
        return true;
    }

    findCorrectIndex(options,correctAnswer,answerType,question){
        if(answerType==='comparison'){
            const isSmaller=question&&/smaller|least|tiny/i.test(question);
            return options.findIndex(opt=>this.sizeComparison[opt]===(isSmaller?'small':'big'));
        }
        return options.findIndex(opt=>String(opt)===String(correctAnswer));
    }

    // ═══════════════════════════════════════════════
    // EXPLANATION
    // ═══════════════════════════════════════════════
    generateExplanation(template,variables,answer){
        if(!template.explanation)return`The correct answer is ${answer}.`;
        let expl=this.resolvePatternText(template.explanation,variables);
        expl=expl.replace(/\[RESULT\]/g,typeof answer==='number'?parseFloat(answer.toFixed(4)):answer);
        return expl;
    }

    // ═══════════════════════════════════════════════
    // RANDOM RESPONSE MESSAGE
    // ═══════════════════════════════════════════════
    _getResponseMsg(isCorrect){
        const r=this.categoryData?.responses;
        if(!r)return isCorrect?'Correct! ✅':'Try again! 💪';
        const pool=isCorrect?r.correct:r.incorrect;
        if(!pool||!pool.length)return isCorrect?'Correct! ✅':'Try again! 💪';
        return pool[Math.floor(Math.random()*pool.length)];
    }

    // ═══════════════════════════════════════════════
    // LOAD CATEGORY
    // ═══════════════════════════════════════════════
    async loadCategory(categoryName){
        this.currentCategory=categoryName;
        const fileName=this.categories[categoryName];
        if(!fileName){console.error(`❌ Unknown category: "${categoryName}"`);return false;}
        try{
            const response=await fetch(`/vooo-ai/vooo-json/${fileName}`);
            this.categoryData=await response.json();
            return true;
        }catch(error){console.error('Error loading category:',error);return false;}
    }

    // ═══════════════════════════════════════════════
    // GENERATE NEW PUZZLE  (main entry point)
    // ═══════════════════════════════════════════════
    generateNewPuzzle(){
        if(!this.categoryData?.templates){console.error('No templates');return null;}
        const templates=this.categoryData.templates;
        const total=templates.length;
        let usedList=this._loadUsed();

        const maxAttempts=total*3;
        for(let attempt=0;attempt<maxAttempts;attempt++){
            const idx=this._tmGetNext(total);
            const template=templates[idx];

            if(!this.isTemplateComputable(template))continue;

            const rawVars=this.generateVariables(template.variables, template.constraints||[]);
            const variables=this.computeDerivedVariables(template,rawVars);
            const hash=this._hash(template.template_id,variables);
            if(usedList.includes(hash))continue;

            const question=this.generateQuestion(template,variables);
            const answer=this.calculateAnswer(template,variables);
            if(answer===null||answer===undefined||answer==='null')continue;

            const options=this.generateOptions(answer,template,variables);
            if(!this._validateOptions(options,answer))continue;

            usedList.push(hash);
            this._saveUsed(usedList);
            this.currentTemplate=template;

            this.currentPuzzle={
                question,
                options,
                correctAnswer:answer,
                correctIndex:this.findCorrectIndex(options,answer,template.answer_type,question),
                explanation:this.generateExplanation(template,variables,answer),
                templateId:template.template_id,
                level:this.currentCategory,
                answerType:template.answer_type||'text'
            };
            return this.currentPuzzle;
        }

        this.clearUsedQuestions();
        for(const template of templates){
            if(!this.isTemplateComputable(template))continue;
            const rawVars=this.generateVariables(template.variables, template.constraints||[]);
            const variables=this.computeDerivedVariables(template,rawVars);
            const answer=this.calculateAnswer(template,variables);
            if(answer===null||answer===undefined)continue;
            const options=this.generateOptions(answer,template,variables);
            if(!this._validateOptions(options,answer))continue;
            this.currentTemplate=template;
            this.currentPuzzle={
                question:this.generateQuestion(template,variables),
                options,
                correctAnswer:answer,
                correctIndex:this.findCorrectIndex(options,answer,template.answer_type,this.generateQuestion(template,variables)),
                explanation:this.generateExplanation(template,variables,answer),
                templateId:template.template_id,
                level:this.currentCategory,
                answerType:template.answer_type||'text'
            };
            return this.currentPuzzle;
        }
        return null;
    }

    // ═══════════════════════════════════════════════
    // CHECK ANSWER
    // ═══════════════════════════════════════════════
    checkAnswer(selectedIndex){
        this.totalAttempts++;
        const isCorrect=selectedIndex===this.currentPuzzle.correctIndex;
        if(isCorrect)this.score++;
        return{
            correct:isCorrect,
            message:this._getResponseMsg(isCorrect),
            explanation:this.currentPuzzle.explanation,
            correctAnswer:this.currentPuzzle.correctAnswer,
            level:this.currentPuzzle.level
        };
    }

    // ═══════════════════════════════════════════════
    // STATS / UTILITIES
    // ═══════════════════════════════════════════════
    getStats(){
        return{
            score:this.score,
            totalAttempts:this.totalAttempts,
            accuracy:this.totalAttempts>0?Math.round((this.score/this.totalAttempts)*100):0,
            currentCategory:this.currentCategory
        };
    }
    resetScore(){this.score=0;this.totalAttempts=0;}
    getCategoryDisplayName(){return this.categoryData?.display_name||this._formatCatName(this.currentCategory);}
    _formatCatName(n){return n.split('_').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');}
    _shuffleArray(array){const s=[...array];for(let i=s.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s[i],s[j]]=[s[j],s[i]];}return s;}
}

// ============================================
// UI INTEGRATION
// ============================================
window.voooEngine = new VOOOPuzzleEngine();

async function initVOOOGame(){
    const loaded=await voooEngine.loadCategory('foundation_math');
    if(!loaded){document.getElementById('vooo-question').textContent='Error loading puzzles.';return;}
    const puzzle=voooEngine.generateNewPuzzle();
    if(puzzle)updatePuzzleDisplay(puzzle);
    else document.getElementById('vooo-question').textContent='Error generating puzzle.';
}

function updatePuzzleDisplay(puzzle){
    document.getElementById('vooo-question').textContent=puzzle.question;
    const container=document.getElementById('vooo-options');
    container.innerHTML='';
    puzzle.options.forEach((option,index)=>{
        const btn=document.createElement('button');
        btn.className='vooo-option';
        btn.textContent=option;
        if(typeof option==='string'&&option.length>2&&!option.match(/^-?[0-9]+(\.[0-9]+)?$/))
            btn.style.fontSize='1.5em';
        btn.onclick=()=>selectAnswer(index);
        container.appendChild(btn);
    });
    const fb=document.getElementById('vooo-feedback');
    fb.textContent='';fb.className='vooo-feedback';fb.style.cssText='';
    document.getElementById('vooo-explanation').textContent='';
    updateStatsDisplay();
}

function selectAnswer(selectedIndex){
    const result=voooEngine.checkAnswer(selectedIndex);
    const fb=document.getElementById('vooo-feedback');
    const expl=document.getElementById('vooo-explanation');
    const btns=document.getElementById('vooo-options').querySelectorAll('.vooo-option');
    btns.forEach(b=>{b.style.backgroundColor='';b.style.borderColor='';});
    if(result.correct){
        btns[selectedIndex].style.backgroundColor='#c6f6d5';
        btns[selectedIndex].style.borderColor='#9ae6b4';
        fb.textContent=result.message;
        fb.className='vooo-feedback correct';
        expl.textContent=result.explanation;
        setTimeout(nextPuzzle,3000);
    }else{
        btns[selectedIndex].style.backgroundColor='#fed7d7';
        btns[selectedIndex].style.borderColor='#fc8181';
        fb.textContent=result.message;
        fb.className='vooo-feedback incorrect';
        fb.style.background='white';fb.style.border='2px solid black';
        fb.style.color='red';fb.style.fontWeight='bold';
    }
    updateStatsDisplay();
}

async function nextPuzzle(){const puzzle=voooEngine.generateNewPuzzle();if(puzzle)updatePuzzleDisplay(puzzle);}
async function changeLevel(levelKey){const success=await voooEngine.loadCategory(levelKey);if(success){voooEngine.resetScore();nextPuzzle();}}
function updateStatsDisplay(){
    const stats=voooEngine.getStats();
    document.getElementById('vooo-score').textContent=`Score: ${stats.score}`;
    document.getElementById('vooo-accuracy').textContent=`Accuracy: ${stats.accuracy}%`;
}
function resetGame(){
    voooEngine.resetScore();
    voooEngine.clearUsedQuestions();
    voooEngine.loadCategory(voooEngine.currentCategory).then(()=>nextPuzzle());
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initVOOOGame);
else initVOOOGame();
