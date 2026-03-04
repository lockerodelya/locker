// ============================================
// VOOO AI — DEDICATED SINGLE-JSON ENGINE
// ============================================
(function () {

// ⭐⭐⭐ EDIT ONLY THESE 3 LINES FOR A NEW ENGINE ⭐⭐⭐
// ============================================

const _ENGINE_JSON_FILE     = 'upsc-statement-level-1.json';       // ⭐ Line 1: Your JSON filename
const _ENGINE_CATEGORY_KEY  = 'upsc-statement-level-1';            // ⭐ Line 2: Category key (must match dropdown value in HTML)
const _ENGINE_INSTANCE_NAME = 'vaeupscstatementl1';               // ⭐ Line 3: Unique global variable name for this engine

// ============================================
// ✋ DO NOT EDIT ANYTHING BELOW THIS LINE
// ============================================


    // ── JSON base path — same for all engines ──
    const _JSON_BASE_PATH = '/vooo-ai/vooo-json/';

    // ════════════════════════════════════════════
    // ENGINE CLASS
    // ════════════════════════════════════════════
    class VOOOEngine {

        constructor() {
            this.currentPuzzle   = null;
            this.currentTemplate = null;
            this.categoryData    = null;
            this.score           = 0;
            this.totalAttempts   = 0;
            this.categoryKey     = _ENGINE_CATEGORY_KEY;
            this.jsonFile        = _ENGINE_JSON_FILE;

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

            this._arrKeys = [
                'primes','bell_numbers','perrin','cake','motzkin','schroder','narayana',
                'partitions','mersenne','fermat','carmichael','carol','kynea','thabit',
                'sophie','safe','primorial','giuga','cullen','woodall','highly_composite',
                'superior_hc','abundant','deficient','perfect','semiprime','sphenic'
            ];

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

        // ── Eval context helper ──
        _evalContext() {
            const helpers      = this._evalHelpers;
            const helperNames  = Object.keys(helpers);
            const helperValues = Object.values(helpers);
            const argNames     = ['Math', 'factorial', ...helperNames];
            const argValues    = [Math, n => this.factorial(n), ...helperValues];
            return { argNames, argValues };
        }

        // ════════════════════════════════════════════
        // NUMBER THEORY HELPERS
        // ════════════════════════════════════════════
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

        // ════════════════════════════════════════════
        // MATH FUNCTION APPLICATOR
        // ════════════════════════════════════════════
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
            const multiArgRe=(name)=>new RegExp(name+'\\(\\s*'+numArg+'(?:\\s*,\\s*'+numArg+')*\\s*\\)','g');
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

        // ════════════════════════════════════════════
        // PLAIN TEXT GUARD
        // ════════════════════════════════════════════
        isPlainText(calc){
            if(!calc)return true;
            const t=calc.trim();
            if(t===''||t==='null')return true;
            if(/^[A-Za-zÀ-ÿ\s\-\/]+$/.test(t))return true;
            if(/generate|lookup|rules|decryption|transposition|multiplication|substitution|autokey|checkerboard|ambiguity|complexity|dynamic/i.test(t))return true;
            return false;
        }

isTemplateComputable(template){
    // ✅ answer_label templates are always computable
    if(template.answer_label&&Array.isArray(template.answer_label))return true;
    if(!template.calculation)return false;
    const c=template.calculation.trim();
    if(c===''||c==='null')return false;
    if(/^[A-Z][A-Z0-9_]*$/.test(c))return true;
    if(this.isPlainText(c))return false;
    return true;
}

        // ════════════════════════════════════════════
        // VARIABLE GENERATION
        // ════════════════════════════════════════════
        generateVariables(defs,constraints=[]){
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
                            const min=def.min??1,max=def.max??10,step=def.step||1;
                            v[name]=min+(Math.floor(Math.random()*(Math.floor((max-min)/step)+1))*step);
                            if(def.primes_only){let x=v[name];while(!this.isPrime(x)&&x<=max)x++;if(!this.isPrime(x)){x=v[name];while(!this.isPrime(x)&&x>=min)x--;}v[name]=x;}
                            if(def.perfect_only){let x=v[name];while(!this.isPerfect(x)&&x<=max*100)x++;v[name]=x;}
                        }
                    }
                }
                if(this._checkConstraints(constraints,v))return v;
            }
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

        // ════════════════════════════════════════════
        // DERIVED VARIABLES
        // ════════════════════════════════════════════
        computeDerivedVariables(template,variables){
            const d={...variables};
            const pattern=template.pattern||'';
            const explanation=template.explanation||'';
            const patArr=[];const ptr=/\[([A-Z][A-Z0-9_]*)\]/g;let m;
            while((m=ptr.exec(pattern))!==null)patArr.push(m[1]);
            const expArr=[];const etr=/\[([^\]]+)\]/g;
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

        // ════════════════════════════════════════════
        // EXPRESSION EVALUATOR
        // ════════════════════════════════════════════
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
                const {argNames,argValues}=this._evalContext();
                const r=new Function(...argNames,'return '+e)(...argValues);
                return(typeof r==='number')?r:(typeof r==='string')?r:null;
            }catch(err){return null;}
        }

        evaluateExpression(expr,variables){
            let ev=expr;
            if(this.isPlainText(ev))return null;

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

            if(ev.includes('next_in_pattern(')){
                ev=ev.replace(/next_in_pattern\(([^)]+)\)/g,(match,p)=>
                    JSON.stringify(this._nextInPattern(p.trim().replace(/['"]/g,''),variables)));
            }

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
                const {argNames,argValues}=this._evalContext();
                const result=new Function(...argNames,'return '+ev)(...argValues);
                return result;
            }catch(e){console.error('Eval error:',expr,'->',ev,e);return null;}
        }

        // ════════════════════════════════════════════
        // PATTERN / QUESTION / ANSWER
        // ════════════════════════════════════════════
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
    // ✅ answer_label: pick answer by variable index
    if(template.answer_label&&Array.isArray(template.answer_label)){
        const varVals=template.variables?Object.values(template.variables):[];
        const listLen=varVals.length>0&&varVals[0].values?varVals[0].values.length:template.answer_label.length;
        const idx=Math.floor(Math.random()*Math.min(template.answer_label.length,listLen));
        return template.answer_label[idx];
    }
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

        // ════════════════════════════════════════════
        // OPTIONS GENERATION
        // ════════════════════════════════════════════
generateOptions(correctAnswer,template,variables){
    // ✅ answer_label: use unique labels as options
    if(template.answer_label&&Array.isArray(template.answer_label)){
        const unique=[...new Set(template.answer_label)];
        // pad if fewer than 4 unique options
        const pool=['Valid','Not Valid','Both I and II','Only Conclusion I','Only Conclusion II','Only Conclusion III','Neither I nor II','Only Assumption I','Only Assumption II','I and II only','I and III only','I and IV only','II and III only','II and IV only','III and IV only','I, II and III','I, II and IV','I, III and IV','II, III and IV','I, II, III and IV','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Statements are contradictory'];
        let opts=[...unique];
        for(const p of pool){if(opts.length>=4)break;if(!opts.includes(p))opts.push(p);}
        return this._shuffleArray(opts.slice(0,4));
    }
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
                    if(mag>1000)offset=sign*Math.round(mag*0.05*(Math.floor(Math.random()*5)+1));
                    else if(mag>100)offset=sign*(Math.floor(Math.random()*20)+1);
                    else if(mag>10)offset=sign*(Math.floor(Math.random()*5)+1);
                    else offset=sign*(Math.floor(Math.random()*4)+1);
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

        // ════════════════════════════════════════════
        // TEMPLATE ROTATION
        // ════════════════════════════════════════════
        _tmGetNext(total){
            const sKey='vooo_progress_'+this.categoryKey;
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

        // ════════════════════════════════════════════
        // USED QUESTION DEDUP
        // ════════════════════════════════════════════
        _usedKey(){return'vooo_used_'+this.categoryKey;}
        _loadUsed(){try{const s=localStorage.getItem(this._usedKey());return s?JSON.parse(s):[];}catch(e){return[];}}
        _saveUsed(list){try{localStorage.setItem(this._usedKey(),JSON.stringify(list));}catch(e){}}
        createQuestionHash(template,variables){
            const key=template.template_id+'_'+JSON.stringify(variables);
            try{return btoa(unescape(encodeURIComponent(key))).substring(0,20);}
            catch(e){let hash=0;for(let i=0;i<key.length;i++){hash=((hash<<5)-hash)+key.charCodeAt(i);hash|=0;}return String(Math.abs(hash)).substring(0,20);}
        }
        clearUsedQuestions(){try{localStorage.removeItem(this._usedKey());}catch(e){}}

        // ════════════════════════════════════════════
        // VALIDATION
        // ════════════════════════════════════════════
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

        // ════════════════════════════════════════════
        // EXPLANATION
        // ════════════════════════════════════════════
        generateExplanation(template,variables,answer){
            if(!template.explanation)return`The correct answer is ${answer}.`;
            let expl=this.resolvePatternText(template.explanation,variables);
            expl=expl.replace(/\[RESULT\]/g,typeof answer==='number'?parseFloat(answer.toFixed(4)):answer);
            return expl;
        }

        // ════════════════════════════════════════════
        // RESPONSE MESSAGE
        // ════════════════════════════════════════════
        _getResponseMsg(isCorrect){
            const r=this.categoryData?.responses;
            if(!r)return isCorrect?'Correct! ✅':'Try again! 💪';
            const pool=isCorrect?r.correct:r.incorrect;
            if(!pool||!pool.length)return isCorrect?'Correct! ✅':'Try again! 💪';
            return pool[Math.floor(Math.random()*pool.length)];
        }

        // ════════════════════════════════════════════
        // LOAD JSON  — HARDCODED TO THIS ENGINE ONLY
        // ════════════════════════════════════════════
        async loadCategory(){
            try{
                const response=await fetch(_JSON_BASE_PATH + this.jsonFile);
                if(!response.ok)throw new Error('HTTP '+response.status);
                this.categoryData=await response.json();
                console.log('✅ Engine ['+_ENGINE_INSTANCE_NAME+'] loaded: '+this.jsonFile);
                return true;
            }catch(error){
                console.error('❌ Engine ['+_ENGINE_INSTANCE_NAME+'] failed to load: '+this.jsonFile, error);
                return false;
            }
        }

        // ════════════════════════════════════════════
        // GENERATE NEW PUZZLE
        // ════════════════════════════════════════════
        generateNewPuzzle(){
            if(!this.categoryData?.templates){console.error('No templates loaded in engine: '+_ENGINE_INSTANCE_NAME);return null;}
            const templates=this.categoryData.templates;
            const total=templates.length;
            let usedList=this._loadUsed();

            const maxAttempts=total*3;
            for(let attempt=0;attempt<maxAttempts;attempt++){
                const idx=this._tmGetNext(total);
                const template=templates[idx];
                if(!this.isTemplateComputable(template))continue;
                const rawVars=this.generateVariables(template.variables,template.constraints||[]);
                const variables=this.computeDerivedVariables(template,rawVars);
                const hash=this.createQuestionHash(template,variables);
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
                    question,options,
                    correctAnswer:answer,
                    correctIndex:this.findCorrectIndex(options,answer,template.answer_type,question),
                    explanation:this.generateExplanation(template,variables,answer),
                    templateId:template.template_id,
                    level:this.categoryKey,
                    answerType:template.answer_type||'text'
                };
                return this.currentPuzzle;
            }

            // All used — reset and try again
            this.clearUsedQuestions();
            for(const template of templates){
                if(!this.isTemplateComputable(template))continue;
                const rawVars=this.generateVariables(template.variables,template.constraints||[]);
                const variables=this.computeDerivedVariables(template,rawVars);
                const answer=this.calculateAnswer(template,variables);
                if(answer===null||answer===undefined)continue;
                const options=this.generateOptions(answer,template,variables);
                if(!this._validateOptions(options,answer))continue;
                this.currentTemplate=template;
                this.currentPuzzle={
                    question:this.generateQuestion(template,variables),
                    options,correctAnswer:answer,
                    correctIndex:this.findCorrectIndex(options,answer,template.answer_type,this.generateQuestion(template,variables)),
                    explanation:this.generateExplanation(template,variables,answer),
                    templateId:template.template_id,
                    level:this.categoryKey,
                    answerType:template.answer_type||'text'
                };
                return this.currentPuzzle;
            }
            return null;
        }

        // ════════════════════════════════════════════
        // CHECK ANSWER
        // ════════════════════════════════════════════
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

        // ════════════════════════════════════════════
        // STATS / UTILITIES
        // ════════════════════════════════════════════
        getStats(){
            return{score:this.score,totalAttempts:this.totalAttempts,accuracy:this.totalAttempts>0?Math.round((this.score/this.totalAttempts)*100):0,currentCategory:this.categoryKey};
        }
        resetScore(){this.score=0;this.totalAttempts=0;}
        _shuffleArray(array){const s=[...array];for(let i=s.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s[i],s[j]]=[s[j],s[i]];}return s;}
    }

    // ════════════════════════════════════════════
    // REGISTER ENGINE ON WINDOW
    // Uses _ENGINE_INSTANCE_NAME from top of file
    // ════════════════════════════════════════════
    window[_ENGINE_INSTANCE_NAME] = new VOOOEngine();
    console.log('✅ Engine registered as window.' + _ENGINE_INSTANCE_NAME + ' for JSON: ' + _ENGINE_JSON_FILE);

})(); // End IIFE — nothing leaks to global scope except the one instance name
