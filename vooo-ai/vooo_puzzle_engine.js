// ============================================
// VOOO AI Puzzle Engine
// APPLIED: SOL1,SOL2,SOL3,SOL4,SOL5,SOL7,SOL8
// ============================================

class VOOOPuzzleEngine {
    constructor() {
        this.currentPuzzle = null;
        this.currentTemplate = null;
        this.currentTemplateIndex = 0;
        this.score = 0;
        this.totalAttempts = 0;
        this.currentCategory = 'math_beginner';
        this.usedQuestions = [];
        this.categories = {
            'toddler_math': 'toddler_math.json',
            'toddler_reasoning': 'toddler_reasoning.json',
            'foundation_math': 'foundation_math.json',
            'elementary_math': 'elementary_math.json',
            'intermediate_math': 'intermediate_math.json',
            'advanced_math': 'advanced_math.json',
            'scholar_math': 'scholar_math.json',
            'foundation_reasoning': 'foundation_reasoning.json',
            'syllogistic_reasoning': 'syllogistic_reasoning.json',
            'analogical_reasoning': 'analogical_reasoning.json',
            'ifthen_reasoning': 'ifthen_reasoning.json',
            'intermediate_reasoning': 'intermediate_reasoning.json',
            'advanced_reasoning': 'advanced_reasoning.json',
            'intermediate_sudoku': 'intermediate_sudoku.json',
            'advanced_sudoku': 'advanced_sudoku.json',
            'intermediate_grid': 'intermediate_grid.json',
            'advanced_grid': 'advanced_grid.json',
            'sequence_intermediate': 'sequence_intermediate.json',
            'sequence_advanced': 'sequence_advanced.json',
            'code_intermediate': 'code_intermediate.json',
            'code_advanced': 'code_advanced.json',
            'lateral_intermediate': 'lateral_intermediate.json',
            'lateral_advanced': 'lateral_advanced.json',
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
            'green': '🟢', 'black': '⚫', 'white': '⚪',
            'orange': '🟠', 'purple': '🟣', 'brown': '🟤', 'pink': '🩷'
        };
        this.sizeComparison = {
            '🐘': 'big', '🦒': 'big', '🐋': 'big', '🏠': 'big', '🌳': 'big',
            '🦏': 'big', '🦛': 'big', '🐪': 'big', '🦘': 'big', '🏔️': 'big',
            '🚂': 'big', '🚗': 'big', '🚌': 'big', '🚛': 'big', '🏢': 'big',
            '🐭': 'small', '🐦': 'small', '🐜': 'small', '📦': 'small', '🌸': 'small',
            '🐛': 'small', '🐌': 'small', '🐞': 'small', '🦗': 'small', '🌼': 'small',
            '🏀': 'small', '⚽': 'small', '🎾': 'small', '🏐': 'small', '📱': 'small'
        };
    }

    factorial(n) { n=Math.round(n); if(n<=1) return 1; let r=1; for(let i=2;i<=n;i++) r*=i; return r; }
    isPrime(n) { if(n<2) return false; if(n===2) return true; if(n%2===0) return false; for(let i=3;i*i<=n;i+=2) if(n%i===0) return false; return true; }
    nextPrime(n) { let c=n+1; while(!this.isPrime(c)) c++; return c; }
    sigma(n) { let s=0; for(let i=1;i<=n;i++) if(n%i===0) s+=i; return s; }
    phi(n) { let r=n,t=n; for(let p=2;p*p<=t;p++){if(t%p===0){while(t%p===0)t=Math.floor(t/p);r-=Math.floor(r/p);}} if(t>1)r-=Math.floor(r/t); return r; }
    partition(n) { const p=new Array(n+1).fill(0); p[0]=1; for(let k=1;k<=n;k++) for(let i=k;i<=n;i++) p[i]+=p[i-k]; return p[n]; }
    primeFactors(n) { const f=[]; let t=n; for(let p=2;p*p<=t;p++){if(t%p===0){let c=0;while(t%p===0){c++;t=Math.floor(t/p);}f.push({prime:p,exp:c});}} if(t>1)f.push({prime:t,exp:1}); return f; }
    isSphenic(n) { if(n<2)return false; const f=this.primeFactors(n); return f.length===3&&f.every(x=>x.exp===1); }
    nextSphenic(n) { let c=n+1; while(!this.isSphenic(c))c++; return c; }
    isSemiprime(n) { if(n<4)return false; return this.primeFactors(n).reduce((s,f)=>s+f.exp,0)===2; }
    nextSemiprime(n) { let c=n+1; while(!this.isSemiprime(c))c++; return c; }
    isAbundant(n) { return this.sigma(n)-n>n; }
    nextAbundant(n) { let c=n+1; while(!this.isAbundant(c))c++; return c; }
    isDeficient(n) { return this.sigma(n)-n<n; }
    nextDeficient(n) { let c=n+1; while(!this.isDeficient(c))c++; return c; }
    isPerfect(n) { return this.sigma(n)-n===n; }
    nextPerfect(n) { let c=n+1; while(!this.isPerfect(c))c++; return c; }
    primorial(n) { let r=1,count=0,c=2; while(count<n){if(this.isPrime(c)){r*=c;count++;}c++;} return r; }
    countDivisors(n) { let c=0; for(let i=1;i<=n;i++) if(n%i===0)c++; return c; }
    isHighlyComposite(n) { const d=this.countDivisors(n); for(let i=1;i<n;i++) if(this.countDivisors(i)>=d)return false; return true; }
    nextHighlyComposite(n) { let c=n+1; while(!this.isHighlyComposite(c))c++; return c; }
    isSophieGermain(n) { return this.isPrime(n)&&this.isPrime(2*n+1); }
    nextSophieGermain(n) { let c=n+1; while(!this.isSophieGermain(c))c++; return c; }
    isSafePrime(n) { return this.isPrime(n)&&n>2&&this.isPrime((n-1)/2); }
    nextSafePrime(n) { let c=n+1; while(!this.isSafePrime(c))c++; return c; }
    nextFactorialPrime(n) { let k=n+1; while(true){const f=this.factorial(k);if(this.isPrime(f+1))return f+1;if(this.isPrime(f-1))return f-1;k++;if(k>15)break;} return this.factorial(n+1)+1; }
    nextSuperiorHighlyComposite(n) { const k=[2,6,12,60,120,360,2520,5040,55440,720720]; for(const v of k)if(v>n)return v; return n*2; }
    nextGiuga(n) { const k=[30,858,1722,66198,2214408306]; for(const v of k)if(v>n)return v; return 858; }

    applyMathFunctions(ev) {
        const mathFns = [
            ['factorial',x=>this.factorial(Math.round(x))],
            ['next_prime',x=>this.nextPrime(Math.round(x))],
            ['sigma',x=>this.sigma(Math.round(x))],
            ['phi',x=>this.phi(Math.round(x))],
            ['partition',x=>this.partition(Math.round(x))],
            ['next_sphenic',x=>this.nextSphenic(Math.round(x))],
            ['next_semiprime',x=>this.nextSemiprime(Math.round(x))],
            ['next_abundant',x=>this.nextAbundant(Math.round(x))],
            ['next_deficient',x=>this.nextDeficient(Math.round(x))],
            ['next_perfect',x=>this.nextPerfect(Math.round(x))],
            ['primorial',x=>this.primorial(Math.round(x))],
            ['next_highly_composite',x=>this.nextHighlyComposite(Math.round(x))],
            ['next_superior_highly_composite',x=>this.nextSuperiorHighlyComposite(Math.round(x))],
            ['next_sophie_germain',x=>this.nextSophieGermain(Math.round(x))],
            ['next_safe_prime',x=>this.nextSafePrime(Math.round(x))],
            ['next_factorial_prime',x=>this.nextFactorialPrime(Math.round(x))],
            ['next_giuga',x=>this.nextGiuga(Math.round(x))]
        ];
        const fnNames=mathFns.map(([name])=>name).join('|');
        const fnNamesArr=mathFns.map(([name])=>name);
        const argExprRegexDeep=new RegExp(`(${fnNames})\\(([^()]*(?:\\([^()]*\\)[^()]*)*)\\)`,'g');
        for(let pre=0;pre<10;pre++){
            ev=ev.replace(argExprRegexDeep,(m,fn,inner)=>{
                if(fnNamesArr.some(name=>inner.includes(name))) return m;
                let resolved=inner.replace(/\((-?\d+(?:\.\d+)?)\)/g,'$1');
                try{const val=new Function('return '+resolved)();if(typeof val==='number'&&isFinite(val))return fn+'('+val+')';}catch(e){}
                return m;
            });
        }
        for(let pass=0;pass<20;pass++){
            let changed=false;
            ev=ev.replace(/\((-?\d+(?:\.\d+)?)\)\s*([\+\-\*\/])\s*(-?\d+(?:\.\d+)?)/g,(m,a,op,b)=>{try{const r=new Function('return '+a+op+b)();changed=true;return String(r);}catch(e){return m;}});
            ev=ev.replace(/(-?\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*\((-?\d+(?:\.\d+)?)\)/g,(m,a,op,b)=>{try{const r=new Function('return '+a+op+b)();changed=true;return String(r);}catch(e){return m;}});
            ev=ev.replace(/\((-?\d+(?:\.\d+)?)\)\s*([\+\-\*\/])\s*\((-?\d+(?:\.\d+)?)\)/g,(m,a,op,b)=>{try{const r=new Function('return '+a+op+b)();changed=true;return String(r);}catch(e){return m;}});
            ev=ev.replace(/(?<![a-zA-Z_])\((-?\d+(?:\.\d+)?)\)/g,(m,n)=>{changed=true;return n;});
            for(const [name,fn] of mathFns){
                const regex=new RegExp(name+'\\((-?\\d+(?:\\.\\d+)?)\\)','g');
                ev=ev.replace(regex,(match,inner)=>{try{const result=fn(Number(inner));changed=true;return String(result);}catch(e){return match;}});
            }
            if(!changed) break;
        }
        return ev;
    }

    isPlainTextCalculation(calc) {
        if(!calc) return true;
        const t=calc.trim();
        if(t===''||t==='null') return true;
        if(/^[A-Za-zÀ-ÿ\s\-\/]+$/.test(t)) return true;
        if(/generate|lookup|rules|decryption|transposition|multiplication|substitution|autokey|checkerboard|ambiguity|complexity|dynamic/i.test(t)) return true;
        return false;
    }

    computeDerivedVariables(template,variables) {
        const derived={...variables};
        const pattern=template.pattern||'';
        const explanation=template.explanation||'';
        const patArr=[];
        const ptr=/\[([A-Z][A-Z0-9_]*)\]/g;
        let match;
        while((match=ptr.exec(pattern))!==null) patArr.push(match[1]);
        const expArr=[];
        const etr=/\[([^\]]+)\]/g;
        while((match=etr.exec(explanation))!==null) expArr.push(match[1]);
        for(let i=0;i<patArr.length;i++){
            if(!derived.hasOwnProperty(patArr[i])&&expArr[i]){
                const val=this.evaluateBracketExpression(expArr[i],derived);
                if(val!==null) derived[patArr[i]]=val;
            }
        }
        if(derived.hasOwnProperty('A')&&derived.hasOwnProperty('STEP')){
            if(!derived.hasOwnProperty('B')) derived['B']=derived['A']+derived['STEP'];
            if(!derived.hasOwnProperty('C')) derived['C']=derived['A']+derived['STEP']*2;
            if(!derived.hasOwnProperty('D')) derived['D']=derived['A']+derived['STEP']*3;
        } else if(derived.hasOwnProperty('A')){
            if(!derived.hasOwnProperty('B')) derived['B']=derived['A']+1;
            if(!derived.hasOwnProperty('C')) derived['C']=derived['A']+2;
            if(!derived.hasOwnProperty('D')) derived['D']=derived['A']+3;
        }
        return derived;
    }

    evaluateBracketExpression(expr,variables) {
        let e=expr;
        e=e.replace(/×/g,'*').replace(/÷/g,'/');
        const hasMathOps=/[\+\-\*\^%]/.test(e)&&!/[?:'"]/.test(e);
        if(hasMathOps) e=e.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g,'$1*$2');
        for(const [k,v] of Object.entries(variables)){if(typeof v==='string'&&isNaN(v)) e=e.replace(new RegExp('\\b'+k+'\\b','g'),'"'+v+'"');}
        for(const [k,v] of Object.entries(variables)){if(typeof v!=='string'||!isNaN(v)) e=e.replace(new RegExp('\\b'+k+'\\b','g'),'('+v+')');}
        e=this.applyMathFunctions(e);
        try{
            // SOL8: pass Math and factorial into eval scope
            const factorial=(n)=>this.factorial(n);
            const r=new Function('Math','factorial','return '+e)(Math,factorial);
            return (typeof r==='number')?r:(typeof r==='string')?r:null;
        }catch(err){return null;}
    }

    resolvePatternText(text,variables) {
        let resolved=text;
        resolved=resolved.replace(/(\d)\[/g,'$1*[');
        for(const [k,v] of Object.entries(variables)) resolved=resolved.replace(new RegExp(`\\[${k}\\]`,'g'),v);
        resolved=resolved.replace(/\[([^\]]+)\]/g,(match,inner)=>{
            const r=this.evaluateBracketExpression(inner,variables);
            return r!==null?r:match;
        });
        for(const [k,v] of Object.entries(variables)) resolved=resolved.replace(new RegExp('\\b'+k+'\\b','g'),v);
        return resolved;
    }

    initLocalStorage() {
        const key=`vooo_used_questions_${this.currentCategory}`;
        const stored=localStorage.getItem(key);
        this.usedQuestions=stored?JSON.parse(stored):[];
    }
    saveUsedQuestion(hash) {
        const key=`vooo_used_questions_${this.currentCategory}`;
        this.usedQuestions.push(hash);
        localStorage.setItem(key,JSON.stringify(this.usedQuestions));
    }
    createQuestionHash(template,variables) {
        return btoa(unescape(encodeURIComponent(template.template_id+'_'+JSON.stringify(variables)))).substring(0,20);
    }
    isQuestionUsed(hash){return this.usedQuestions.includes(hash);}
    validateOptions(options,correctAnswer) {
        if(options.length!==4){console.warn('❌ Not 4 options',options.length);return false;}
        if(new Set(options.map(o=>String(o))).size!==4){console.warn('❌ Duplicate options',options);return false;}
        if(!options.map(o=>String(o)).includes(String(correctAnswer))){console.warn('❌ Answer not in options',correctAnswer,options);return false;}
        return true;
    }
    clearUsedQuestions() {
        localStorage.removeItem(`vooo_used_questions_${this.currentCategory}`);
        this.usedQuestions=[];
    }

    async loadCategory(categoryName) {
        this.currentCategory=categoryName;
        const fileName=this.categories[categoryName];
        if(!fileName){console.error(`❌ Unknown category: "${categoryName}"`);return false;}
        try{
            const response=await fetch(`/vooo-ai/vooo-json/${fileName}`);
            this.categoryData=await response.json();
            this.currentTemplateIndex=0;
            this.initLocalStorage();
            return true;
        }catch(error){console.error('Error loading category:',error);return false;}
    }

    isTemplateComputable(template) {
        if(!template.calculation) return false;
        const calc=template.calculation.trim();
        if(calc===''||calc==='null') return false;
        if(/^[A-Z][A-Z0-9_]*$/.test(calc)) return true;
        if(this.isPlainTextCalculation(calc)){console.log(`⏭️ solv13: Plain text skipped: ${calc}`);return false;}
        return true;
    }

    generateNewPuzzle() {
        if(!this.categoryData||!this.categoryData.templates){console.error('No templates');return null;}
        const templates=this.categoryData.templates;
        let attempts=0;
        const maxAttempts=templates.length*3;
        while(attempts<maxAttempts){
            attempts++;
            const idx=this.currentTemplateIndex%templates.length;
            this.currentTemplate=templates[idx];
            this.currentTemplateIndex++;
            if(this.currentTemplateIndex>=templates.length) this.currentTemplateIndex=0;
            if(!this.isTemplateComputable(this.currentTemplate)) continue;
            const rawVars=this.generateVariables(this.currentTemplate.variables);
            const variables=this.computeDerivedVariables(this.currentTemplate,rawVars);
            const hash=this.createQuestionHash(this.currentTemplate,variables);
            if(this.isQuestionUsed(hash)) continue;
            const question=this.generateQuestion(this.currentTemplate,variables);
            const answer=this.calculateAnswer(this.currentTemplate,variables);
            if(answer===null||answer===undefined||answer==='null') continue;
            const options=this.generateOptions(answer,this.currentTemplate,variables);
            if(!this.validateOptions(options,answer)) continue;
            this.saveUsedQuestion(hash);
            this.currentPuzzle={
                question,options,correctAnswer:answer,
                correctIndex:this.findCorrectIndex(options,answer,this.currentTemplate.answer_type,question),
                explanation:this.generateExplanation(this.currentTemplate,variables,answer),
                templateId:this.currentTemplate.template_id,
                level:this.currentCategory,
                answerType:this.currentTemplate.answer_type||'text'
            };
            return this.currentPuzzle;
        }
        this.clearUsedQuestions();
        this.currentTemplateIndex=0;
        let fb=templates[0];
        for(const t of templates) if(this.isTemplateComputable(t)){fb=t;break;}
        this.currentTemplate=fb;
        const rv=this.generateVariables(this.currentTemplate.variables);
        const vars=this.computeDerivedVariables(this.currentTemplate,rv);
        const ans=this.calculateAnswer(this.currentTemplate,vars);
        const opts=this.generateOptions(ans,this.currentTemplate,vars);
        const fbQuestion=this.generateQuestion(this.currentTemplate,vars);
        this.currentPuzzle={
            question:fbQuestion,options:opts,correctAnswer:ans,
            correctIndex:this.findCorrectIndex(opts,ans,this.currentTemplate.answer_type,fbQuestion),
            explanation:this.generateExplanation(this.currentTemplate,vars,ans),
            templateId:this.currentTemplate.template_id,
            level:this.currentCategory,answerType:this.currentTemplate.answer_type||'text'
        };
        return this.currentPuzzle;
    }

    generateVariables(variableDefs) {
        const variables={};
        if(!variableDefs) return variables;
        const arrKeys=['primes','bell_numbers','perrin','cake','motzkin','schroder','narayana',
            'partitions','mersenne','fermat','carmichael','carol','kynea','thabit','sophie',
            'safe','primorial','giuga','cullen','woodall','highly_composite','superior_hc',
            'abundant','deficient','perfect','semiprime','sphenic'];
        for(const [varName,def] of Object.entries(variableDefs)){
            if(def.value!==undefined){variables[varName]=def.value;}
            else if(def.values!==undefined){variables[varName]=def.values[Math.floor(Math.random()*def.values.length)];}
            else if(def.calc!==undefined){try{variables[varName]=this.evaluateExpression(def.calc,variables);}catch(e){variables[varName]=0;}}
            else if(def.totients!==undefined){variables[varName]=Math.floor(Math.random()*def.totients.length);}
            else{
                let handled=false;
                for(const k of arrKeys){if(def[k]!==undefined){variables[varName]=def[k][Math.floor(Math.random()*(def[k].length-1))];handled=true;break;}}
                if(!handled){
                    const min=def.min!==undefined?def.min:1;
                    const max=def.max!==undefined?def.max:10;
                    const step=def.step||1;
                    variables[varName]=min+(Math.floor(Math.random()*(Math.floor((max-min)/step)+1))*step);
                    if(def.primes_only){let v=variables[varName],up=v,dn=v;while(!this.isPrime(up)&&up<=max)up++;while(!this.isPrime(dn)&&dn>=min)dn--;variables[varName]=(this.isPrime(up)&&up<=max)?up:dn;}
                    if(def.perfect_only){let v=variables[varName];while(!this.isPerfect(v)&&v<=max*100)v++;variables[varName]=v;}
                }
            }
        }
        return variables;
    }

    evaluateExpression(expr,variables) {
        let ev=expr;
        if(this.isPlainTextCalculation(ev)){console.log('⏭️ solv13 plain text:',ev);return null;}
        ev=ev.replace(/if\s+(.+?)\s+then\s+(.+?)\s+else\s+(.+)/g,(match,cond,thenV,elseV)=>{
            try{
                let c=cond;
                for(const [k,v] of Object.entries(variables)) c=c.replace(new RegExp('\\b'+k+'\\b','g'),(typeof v==='string'&&isNaN(v))?'"'+v+'"':JSON.stringify(v));
                return new Function('return '+c)()?thenV.trim():elseV.trim().replace(/'/g,'');
            }catch(e){return match;}
        });
        ev=ev.replace(/×/g,'*').replace(/÷/g,'/');
        const hasMathOps=/[\+\-\*\^%]/.test(ev)&&!/[?:'"]/.test(ev);
        if(hasMathOps) ev=ev.replace(/(\d)([A-Za-z_][A-Za-z0-9_]*)/g,'$1*$2');
        for(const [k,v] of Object.entries(variables)){if(typeof v==='string'&&isNaN(v)) ev=ev.replace(new RegExp('\\b'+k+'\\b','g'),'"'+v+'"');}
        for(const [k,v] of Object.entries(variables)){if(typeof v!=='string'||!isNaN(v)) ev=ev.replace(new RegExp('\\b'+k+'\\b','g'),'('+v+')');}
        ev=this.applyMathFunctions(ev);
        if(ev.includes('repeat(')){
            ev=ev.replace(/repeat\(([^,]+),\s*([^)]+)\)/g,(match,emoji,count)=>{
                const emojiKey=emoji.trim().replace(/['"()\s]/g,'');
                const countKey=count.trim().replace(/['"()\s]/g,'');
                const emojiVal=variables[emojiKey]!==undefined?variables[emojiKey]:emojiKey;
                const countVal=variables[countKey]!==undefined?parseInt(variables[countKey]):parseInt(countKey);
                if(!isNaN(countVal)&&countVal>0) return JSON.stringify(String(emojiVal).repeat(countVal));
                return match;
            });
        }
        if(ev.includes('next_in_pattern(')){
            ev=ev.replace(/next_in_pattern\(([^)]+)\)/g,(match,p)=>
                JSON.stringify(this.calculateNextInPattern(p.trim().replace(/['"]/g,''),variables)));
        }
        if(ev.includes('generate_options(')){
            ev=ev.replace(/generate_options\(([^,]+),\s*([^)]+)\)/g,(match,num,emoji)=>{
                const numKey=num.trim().replace(/['"()\s]/g,'');
                const emojiKey=emoji.trim().replace(/['"()\s]/g,'');
                const numVal=variables[numKey]!==undefined?parseInt(variables[numKey]):parseInt(numKey);
                const emojiVal=variables[emojiKey]!==undefined?variables[emojiKey]:emojiKey;
                return JSON.stringify(this.generateVisualOptions(numVal,emojiVal,variables));
            });
        }
        try{
            if(ev.startsWith('[')&&ev.endsWith(']')) try{return JSON.parse(ev);}catch(e){return [];}
            if((ev.startsWith('"')&&ev.endsWith('"'))||(ev.startsWith("'")&&ev.endsWith("'"))) return ev.slice(1,-1);
            if(ev==='true') return true;
            if(ev==='false') return false;
            if(ev==='null') return null;
            if(!isNaN(ev)&&ev.trim()!=='') return Number(ev);
            if(/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(ev)) return ev;
            // SOL8: pass Math and factorial into eval scope
            const factorial=(n)=>this.factorial(n);
            const result=new Function('Math','factorial','return '+ev)(Math,factorial);
            return result;
        }catch(e){console.error('Eval error:',expr,'->',ev,e);return null;}
    }

    generateQuestion(template,variables) {
        if(template.pattern_builder){try{return this.evaluateExpression(template.pattern_builder,variables);}catch(e){}}
        return this.resolvePatternText(template.pattern,variables);
    }

    calculateAnswer(template,variables) {
        if(!template.calculation) return 0;
        const calc=template.calculation.trim();
        if(calc===''||calc==='null') return null;
        if(this.isPlainTextCalculation(calc)) return null;
        if(calc.includes('repeat(')) return this.evaluateExpression(calc,variables);
        if(calc.includes('next_in_pattern(')){
            const pattern=this.evaluateExpression(calc,variables);
            const opts=template.options||[];
            if(pattern==='ABAB'||pattern==='AABB') return opts[0]||'🔴';
            if(pattern==='ABCABC') return opts[2]||'🔵';
            return opts[0]||'?';
        }
        if(variables.hasOwnProperty(calc)){
            const value=variables[calc];
            if(template.answer_type==='shape_selector'&&typeof value==='string') return this.shapeMap[value]||value;
            if(template.answer_type==='color_picker'&&typeof value==='string') return this.colorMap[value]||value;
            if(typeof value==='number') return parseFloat(value.toFixed(4));
            return value;
        }
        const result=this.evaluateExpression(calc,variables);
        if(result===null||result===undefined) return null;
        if(typeof result==='number') return parseFloat(result.toFixed(4));
        return result;
    }

    generateOptions(correctAnswer,template,variables) {
        if(template.options_builder){
            try{const opts=this.evaluateExpression(template.options_builder,variables);if(Array.isArray(opts))return this.shuffleArray(opts);}catch(e){}
        }
        if(template.options&&Array.isArray(template.options)){
            let opts=[...template.options];
            const correctStr=String(correctAnswer);
            let effectiveCorrect=correctAnswer;
            if(!opts.map(o=>String(o)).includes(correctStr)){effectiveCorrect=opts[0];console.log(`⚠️ solv11: Fixed answer ${correctAnswer} → ${effectiveCorrect}`);}
            const wrong=opts.filter(o=>String(o)!==String(effectiveCorrect));
            const selected=this.shuffleArray(wrong).slice(0,3);
            return this.shuffleArray([effectiveCorrect,...selected]);
        }
        if(template.answer_type==='shape_selector') return this.shuffleArray([...Object.values(this.shapeMap)]);
        if(template.answer_type==='color_picker') return this.shuffleArray([...Object.values(this.colorMap)]);
        if(template.answer_type==='comparison') return this.shuffleArray([variables.A_EMOJI,variables.B_EMOJI]);
        const options=[];
        const correctNum=Number(correctAnswer);
        if(!isNaN(correctNum)){
            options.push(String(parseFloat(correctNum.toFixed(4))));
            for(let i=0;i<3;i++){
                let wrong;
                const dir=(Math.random()>0.5?1:-1);
                const off=(i+1)*dir;
                if(Math.abs(correctNum)>100) wrong=correctNum+off*Math.floor(Math.max(1,Math.abs(correctNum)*0.05));
                else if(Math.abs(correctNum)>10) wrong=correctNum+off*Math.floor(Math.max(1,Math.abs(correctNum)*0.1));
                else if(correctNum!==0) wrong=correctNum+off;
                else wrong=i+1;
                if(wrong===correctNum) wrong=correctNum+(i+2);
                let ws=String(parseFloat(wrong.toFixed(4)));
                let dc=0;
                while(options.includes(ws)&&dc<20){wrong++;ws=String(parseFloat(wrong.toFixed(4)));dc++;}
                options.push(ws);
            }
        }else{
            const ng=parseInt(correctAnswer);
            if(!isNaN(ng)){
                options.push(String(ng));
                const offs=[ng+2,ng+4,ng-2].filter(v=>v>0);
                for(let i=0;i<3;i++){
                    let ws=String(offs[i]||ng+(i+5));
                    let dc=0;
                    while(options.includes(ws)&&dc<10){ws=String(parseInt(ws)+1);dc++;}
                    options.push(ws);
                }
            }else{
                options.push(String(correctAnswer));
                ['?','??','???'].forEach(f=>options.push(f));
            }
        }
        return this.shuffleArray(options);
    }

    generateVisualOptions(number,emoji,variables) {
        const emojiChar=typeof emoji==='string'?emoji:(variables[emoji]||emoji);
        const correct=parseInt(number);
        const opts=new Set();
        opts.add(emojiChar.repeat(correct));
        let i=1;
        while(opts.size<4){if(i!==correct) opts.add(emojiChar.repeat(i));i++;}
        return this.shuffleArray([...opts]);
    }

    calculateNextInPattern(patternType) {
        switch(patternType){case 'ABAB':return '🔴';case 'AABB':return '🟡';case 'ABCABC':return '🔵';default:return '?';}
    }

    findCorrectIndex(options,correctAnswer,answerType,question) {
        if(answerType==='comparison'){
            const isSmaller=question&&/smaller|least|tiny/i.test(question);
            return options.findIndex(opt=>this.sizeComparison[opt]===(isSmaller?'small':'big'));
        }
        return options.findIndex(opt=>String(opt)===String(correctAnswer));
    }

    generateExplanation(template,variables,answer) {
        if(!template.explanation) return `The correct answer is ${answer}.`;
        let expl=this.resolvePatternText(template.explanation,variables);
        expl=expl.replace(/\[RESULT\]/g,typeof answer==='number'?parseFloat(answer.toFixed(4)):answer);
        return expl;
    }
    checkAnswer(selectedIndex) {
        this.totalAttempts++;
        const isCorrect=selectedIndex===this.currentPuzzle.correctIndex;
        if(isCorrect){this.score++;return{correct:true,message:'Yes Correct Answer',explanation:this.currentPuzzle.explanation,level:this.currentPuzzle.level};}
        return{correct:false,message:'Please try again',explanation:this.currentPuzzle.explanation,correctAnswer:this.currentPuzzle.correctAnswer,level:this.currentPuzzle.level};
    }
    getStats(){return{score:this.score,totalAttempts:this.totalAttempts,accuracy:this.totalAttempts>0?Math.round((this.score/this.totalAttempts)*100):0,currentCategory:this.currentCategory};}
    resetScore(){this.score=0;this.totalAttempts=0;}
    shuffleArray(array){const s=[...array];for(let i=s.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s[i],s[j]]=[s[j],s[i]];}return s;}
    getCategoryDisplayName(categoryKey){return this.categoryData?.display_name||this.formatCategoryName(categoryKey);}
    formatCategoryName(name){if(this.categoryData&&this.categoryData.display_name)return this.categoryData.display_name;return name.split('_').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');}
}

// ============================================
// UI INTEGRATION
// ============================================
window.voooEngine = new VOOOPuzzleEngine();

async function initVOOOGame() {
    const loaded=await voooEngine.loadCategory('toddler_math');
    if(!loaded){document.getElementById('vooo-question').textContent='Error loading puzzles.';return;}
    const puzzle=voooEngine.generateNewPuzzle();
    if(puzzle) updatePuzzleDisplay(puzzle);
    else document.getElementById('vooo-question').textContent='Error generating puzzle.';
}

function updatePuzzleDisplay(puzzle) {
    document.getElementById('vooo-question').textContent=puzzle.question;
    const container=document.getElementById('vooo-options');
    container.innerHTML='';
    puzzle.options.forEach((option,index)=>{
        const btn=document.createElement('button');
        btn.className='vooo-option';
        btn.textContent=option;
        if(typeof option==='string'&&option.length>2&&!option.match(/^-?[0-9]+(\.[0-9]+)?$/)) btn.style.fontSize='1.5em';
        btn.onclick=()=>selectAnswer(index);
        container.appendChild(btn);
    });
    const fb=document.getElementById('vooo-feedback');
    fb.textContent='';fb.className='vooo-feedback';fb.style.cssText='';
    document.getElementById('vooo-explanation').textContent='';
    updateStatsDisplay();
}

function selectAnswer(selectedIndex) {
    const result=voooEngine.checkAnswer(selectedIndex);
    const fb=document.getElementById('vooo-feedback');
    const expl=document.getElementById('vooo-explanation');
    const btns=document.getElementById('vooo-options').querySelectorAll('.vooo-option');
    btns.forEach(b=>{b.style.backgroundColor='';b.style.borderColor='';});
    if(result.correct){
        btns[selectedIndex].style.backgroundColor='#c6f6d5';
        btns[selectedIndex].style.borderColor='#9ae6b4';
        fb.textContent='Yes Correct Answer';fb.className='vooo-feedback correct';
        expl.textContent=result.explanation;
        setTimeout(nextPuzzle,3000);
    }else{
        btns[selectedIndex].style.backgroundColor='#fed7d7';
        btns[selectedIndex].style.borderColor='#fc8181';
        fb.textContent='Please try again';fb.className='vooo-feedback incorrect';
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
    const currentCat=voooEngine.currentCategory;
    voooEngine.resetScore();
    voooEngine.clearUsedQuestions();
    voooEngine.currentTemplateIndex=0;
    voooEngine.loadCategory(currentCat).then(()=>nextPuzzle());
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initVOOOGame);
else initVOOOGame();
