# 🎯 VOOO REASONING SYSTEM - INTEGRATION GUIDE (Updated)

## 📦 **NEW FILE NAMING CONVENTION**

All files now follow your standard format:
- `subject_level.json` format
- Examples: `reasoning_beginner.json`, `pattern_intermediate.json`, `time_beginner.json`

This matches your existing files like:
- `math_beginner.json` → "Beginner Math"
- `math_toddler.json` → "Toddler Math"

---

## 📂 **FILES INCLUDED**

### JavaScript Engine (Place in `/vooo-ai/`):
- ✅ `vooo-reasoning-engine.js` - Universal engine for all reasoning types

### JSON Files (Place in `/vooo-ai/vooo-json/`):

| File Name | Displays As | Templates |
|-----------|-------------|-----------|
| `reasoning_beginner.json` | 🧠 Beginner Reasoning | 22 |
| `reasoning_intermediate.json` | 🎓 Intermediate Reasoning | 22 |
| `reasoning_advanced.json` | 🏆 Advanced Reasoning | 22 |
| `pattern_beginner.json` | 🔢 Beginner Pattern | 22 |
| `pattern_intermediate.json` | 🔢 Intermediate Pattern | 22 |
| `mathops_beginner.json` | ➗ Beginner Math Ops | 22 |
| `comparison_beginner.json` | ⚖️ Beginner Comparison | 22 |
| `time_beginner.json` | ⏰ Beginner Time | 22 |
| `probability_beginner.json` | 🎲 Beginner Probability | 22 |
| `classification_beginner.json` | 📊 Beginner Classification | 22 |
| `problemsolving_beginner.json` | 🧩 Beginner Problem Solving | 22 |
| `causeeffect_beginner.json` | ⚡ Beginner Cause & Effect | 22 |

---

## 🔧 **HOW TO ADD TO YOUR HTML DROPDOWN**

### Step 1: Add JavaScript Reference
```html
<!-- In your <head> section, add: -->
<script src="/vooo-ai/vooo-reasoning-engine.js"></script>
```

### Step 2: Update Your Dropdown
```html
<select id="puzzle-type">
  <!-- Your existing math options -->
  <option value="math_toddler">🧒 Toddler Math</option>
  <option value="math_beginner">🎓 Beginner Math</option>
  <option value="math_advanced">🏆 Advanced Math</option>
  
  <!-- ADD THESE NEW REASONING OPTIONS -->
  <option value="reasoning_beginner">🧠 Beginner Reasoning</option>
  <option value="reasoning_intermediate">🎓 Intermediate Reasoning</option>
  <option value="reasoning_advanced">🏆 Advanced Reasoning</option>
  
  <option value="pattern_beginner">🔢 Beginner Pattern</option>
  <option value="pattern_intermediate">🔢 Intermediate Pattern</option>
  
  <option value="mathops_beginner">➗ Beginner Math Ops</option>
  <option value="comparison_beginner">⚖️ Beginner Comparison</option>
  <option value="time_beginner">⏰ Beginner Time</option>
  <option value="probability_beginner">🎲 Beginner Probability</option>
  <option value="classification_beginner">📊 Beginner Classification</option>
  <option value="problemsolving_beginner">🧩 Beginner Problem Solving</option>
  <option value="causeeffect_beginner">⚡ Beginner Cause & Effect</option>
</select>
```

### OR Use Organized Optgroups (Recommended):
```html
<select id="puzzle-type">
  <!-- Existing Math -->
  <optgroup label="📐 Mathematics">
    <option value="math_toddler">🧒 Toddler Math</option>
    <option value="math_beginner">🎓 Beginner Math</option>
    <option value="math_advanced">🏆 Advanced Math</option>
    <option value="mathops_beginner">➗ Beginner Math Ops</option>
  </optgroup>
  
  <!-- NEW Reasoning -->
  <optgroup label="🧠 Logical Reasoning">
    <option value="reasoning_beginner">🧠 Beginner Reasoning</option>
    <option value="reasoning_intermediate">🎓 Intermediate Reasoning</option>
    <option value="reasoning_advanced">🏆 Advanced Reasoning</option>
  </optgroup>
  
  <optgroup label="🔢 Patterns">
    <option value="pattern_beginner">🔢 Beginner Pattern</option>
    <option value="pattern_intermediate">🔢 Intermediate Pattern</option>
  </optgroup>
  
  <optgroup label="🧩 Problem Solving">
    <option value="comparison_beginner">⚖️ Beginner Comparison</option>
    <option value="time_beginner">⏰ Beginner Time</option>
    <option value="probability_beginner">🎲 Beginner Probability</option>
    <option value="classification_beginner">📊 Beginner Classification</option>
    <option value="problemsolving_beginner">🧩 Beginner Problem Solving</option>
    <option value="causeeffect_beginner">⚡ Beginner Cause & Effect</option>
  </optgroup>
</select>
```

### Step 3: Load Puzzle (Same as Your Existing Code)
```javascript
// If you already have a loader for math puzzles, 
// the SAME code works for reasoning puzzles!

// Initialize reasoning loader
const reasoningLoader = new VoooReasoningLoader();

// When user selects a puzzle type
async function loadPuzzle(puzzleType) {
  // puzzleType will be like: "reasoning_beginner", "pattern_intermediate", etc.
  const jsonPath = `/vooo-ai/vooo-json/${puzzleType}.json`;
  const loaded = await reasoningLoader.loadPuzzle(jsonPath);
  
  if (loaded) {
    const info = reasoningLoader.getPuzzleInfo();
    console.log(`Loaded: ${info.displayName}`);
    generateNewPuzzle();
  }
}

// Generate puzzle - same as before
function generateNewPuzzle() {
  const puzzle = reasoningLoader.generateNext();
  document.getElementById('question').textContent = puzzle.question;
  document.getElementById('answer-input').value = '';
}

// Check answer - same as before
function checkUserAnswer() {
  const userAnswer = document.getElementById('answer-input').value;
  const isCorrect = reasoningLoader.checkAnswer(userAnswer);
  const message = reasoningLoader.getResponseMessage(isCorrect);
  
  document.getElementById('feedback').textContent = message;
  
  if (isCorrect) {
    const puzzle = reasoningLoader.getCurrentPuzzle();
    document.getElementById('explanation').textContent = puzzle.explanation;
    setTimeout(generateNewPuzzle, 2000);
  }
}
```

---

## 🎨 **FILE ORGANIZATION**

```
/vooo-ai/
  ├── vooo-math-helper.js          (your existing)
  ├── vooo_puzzle_engine.js        (your existing)
  ├── vooo-reasoning-engine.js     (NEW - add this)
  └── vooo-json/
      ├── math_toddler.json        (your existing)
      ├── math_beginner.json       (your existing)
      ├── math_advanced.json       (your existing)
      ├── reasoning_beginner.json  (NEW)
      ├── reasoning_intermediate.json (NEW)
      ├── reasoning_advanced.json  (NEW)
      ├── pattern_beginner.json    (NEW)
      ├── pattern_intermediate.json (NEW)
      ├── mathops_beginner.json    (NEW)
      ├── comparison_beginner.json (NEW)
      ├── time_beginner.json       (NEW)
      ├── probability_beginner.json (NEW)
      ├── classification_beginner.json (NEW)
      ├── problemsolving_beginner.json (NEW)
      └── causeeffect_beginner.json (NEW)
```

---

## ✨ **NAMING PATTERN**

For easy expansion in the future:

```
[subject]_[level].json

Examples:
- reasoning_beginner.json
- reasoning_intermediate.json
- reasoning_advanced.json
- reasoning_expert.json      (you can add later)

- pattern_beginner.json
- pattern_intermediate.json
- pattern_advanced.json       (you can add later)

- time_beginner.json
- time_intermediate.json      (you can add later)
```

This makes it super easy to add more levels!

---

## 🚀 **QUICK INTEGRATION STEPS**

1. **Copy files:**
   - `vooo-reasoning-engine.js` → `/vooo-ai/`
   - All 12 JSON files → `/vooo-ai/vooo-json/`

2. **Add script tag to HTML:**
   ```html
   <script src="/vooo-ai/vooo-reasoning-engine.js"></script>
   ```

3. **Add options to dropdown:**
   - Use the dropdown code above
   - File name (without .json) = option value
   - Example: `<option value="reasoning_beginner">🧠 Beginner Reasoning</option>`

4. **Use existing puzzle loading code:**
   - The engine works exactly like your math puzzles!
   - Same API, same methods, same workflow

5. **Test:**
   - Select "Beginner Reasoning" from dropdown
   - Solve a few puzzles
   - Check that answers validate correctly

---

## 💡 **COMPATIBILITY NOTES**

✅ **Works with your existing system:**
- Compatible with vooo-math-helper.js
- Compatible with vooo_puzzle_engine.js
- Same JSON structure
- Same loading pattern
- Same display method

✅ **Easy to maintain:**
- Clear naming convention
- Organized by subject and level
- Easy to add new subjects
- Easy to add new levels

---

## 🎯 **EXAMPLE DROPDOWN VALUES**

When user selects from dropdown:
- Value: `reasoning_beginner` → Loads `/vooo-ai/vooo-json/reasoning_beginner.json`
- Value: `pattern_intermediate` → Loads `/vooo-ai/vooo-json/pattern_intermediate.json`
- Value: `time_beginner` → Loads `/vooo-ai/vooo-json/time_beginner.json`

Just like your math puzzles:
- Value: `math_beginner` → Loads `/vooo-ai/vooo-json/math_beginner.json`

**Same pattern, same code!** ✨

---

## 📞 **NEED HELP?**

Check:
1. File names match exactly (case-sensitive)
2. Files are in `/vooo-ai/vooo-json/` folder
3. Script tag is in HTML `<head>`
4. Dropdown values match file names (without .json)

**Everything should work perfectly with your existing setup!** 🎯

---

**Happy Reasoning!** 🧠✨
