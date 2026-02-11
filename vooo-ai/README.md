# 🎯 VOOO REASONING SYSTEM - README

## 📦 **WHAT YOU HAVE (Updated Naming)**

All files now use your standard naming convention: `subject_level.json`

### 🔧 **JavaScript Engine** (1 file)
- `vooo-reasoning-engine.js` - Universal engine for ALL reasoning types

### 📊 **JSON Reasoning Files** (12 files)

| # | File Name | Shows In Dropdown | Templates |
|---|-----------|-------------------|-----------|
| 1 | `reasoning_beginner.json` | 🧠 Beginner Reasoning | 22 |
| 2 | `reasoning_intermediate.json` | 🎓 Intermediate Reasoning | 22 |
| 3 | `reasoning_advanced.json` | 🏆 Advanced Reasoning | 22 |
| 4 | `pattern_beginner.json` | 🔢 Beginner Pattern | 22 |
| 5 | `pattern_intermediate.json` | 🔢 Intermediate Pattern | 22 |
| 6 | `mathops_beginner.json` | ➗ Beginner Math Ops | 22 |
| 7 | `comparison_beginner.json` | ⚖️ Beginner Comparison | 22 |
| 8 | `time_beginner.json` | ⏰ Beginner Time | 22 |
| 9 | `probability_beginner.json` | 🎲 Beginner Probability | 22 |
| 10 | `classification_beginner.json` | 📊 Beginner Classification | 22 |
| 11 | `problemsolving_beginner.json` | 🧩 Beginner Problem Solving | 22 |
| 12 | `causeeffect_beginner.json` | ⚡ Beginner Cause & Effect | 22 |

**Total: 264 reasoning puzzle templates!**

---

## 📁 **FILE ORGANIZATION**

```
/vooo-ai/
  ├── vooo-reasoning-engine.js     ← Copy this
  └── vooo-json/
      ├── reasoning_beginner.json
      ├── reasoning_intermediate.json
      ├── reasoning_advanced.json
      ├── pattern_beginner.json
      ├── pattern_intermediate.json
      ├── mathops_beginner.json
      ├── comparison_beginner.json
      ├── time_beginner.json
      ├── probability_beginner.json
      ├── classification_beginner.json
      ├── problemsolving_beginner.json
      └── causeeffect_beginner.json
```

---

## 🎯 **NAMING CONVENTION**

All files follow your standard pattern:

```
[subject]_[level].json

Examples:
✅ math_beginner.json      (your existing)
✅ math_toddler.json       (your existing)
✅ reasoning_beginner.json (new)
✅ pattern_intermediate.json (new)
✅ time_beginner.json      (new)
```

This makes it easy to:
- Identify subject at a glance
- Add more levels (expert, master, etc.)
- Keep files organized
- Match your existing system

---

## 🚀 **QUICK START**

### 1. Copy Files
```
vooo-reasoning-engine.js → /vooo-ai/
vooo-json/*.json → /vooo-ai/vooo-json/
```

### 2. Add to HTML
```html
<script src="/vooo-ai/vooo-reasoning-engine.js"></script>

<select id="puzzle-type">
  <option value="reasoning_beginner">🧠 Beginner Reasoning</option>
  <option value="pattern_beginner">🔢 Beginner Pattern</option>
  <option value="time_beginner">⏰ Beginner Time</option>
  <!-- etc. -->
</select>
```

### 3. Use (Same as Your Math Puzzles!)
```javascript
const loader = new VoooReasoningLoader();
await loader.loadPuzzle('/vooo-ai/vooo-json/reasoning_beginner.json');
const puzzle = loader.generateNext();
```

---

## 📊 **REASONING TYPES**

### 🧠 **Logical Reasoning** (3 levels)
- `reasoning_beginner.json` - Basic logic, simple equations
- `reasoning_intermediate.json` - Multi-step, complex calculations
- `reasoning_advanced.json` - Algebra, functions, advanced math

### 🔢 **Pattern Recognition** (2 levels)
- `pattern_beginner.json` - Number sequences, simple patterns
- `pattern_intermediate.json` - Advanced sequences, Fibonacci

### ➗ **Math Operations** (1 level)
- `mathops_beginner.json` - Multi-step calculations

### ⚖️ **Comparison** (1 level)
- `comparison_beginner.json` - Greater/smaller comparisons

### ⏰ **Time** (1 level)
- `time_beginner.json` - Hours, minutes, time calculations

### 🎲 **Probability** (1 level)
- `probability_beginner.json` - Outcomes, combinations

### 📊 **Classification** (1 level)
- `classification_beginner.json` - Categorizing items

### 🧩 **Problem Solving** (1 level)
- `problemsolving_beginner.json` - Word problems, real scenarios

### ⚡ **Cause & Effect** (1 level)
- `causeeffect_beginner.json` - Understanding relationships

---

## ✨ **KEY FEATURES**

✅ **Matches your existing system:**
- Same naming convention
- Same file structure
- Same loading method
- Works with existing code

✅ **Easy to expand:**
- Add `reasoning_expert.json` for expert level
- Add `pattern_advanced.json` for advanced patterns
- Add `time_intermediate.json` for harder time puzzles

✅ **Compatible:**
- Works with vooo-math-helper.js
- Works with vooo_puzzle_engine.js
- Same JSON format

---

## 💡 **EXAMPLE PUZZLES**

### Beginner Reasoning
```
Question: If 15 > 8, and 8 > 3, then 15 ? 3
Answer: >
```

### Beginner Pattern
```
Question: 2, 4, 6, 8, ... Next number?
Answer: 10
```

### Beginner Time
```
Question: 3 hours = ? minutes
Answer: 180
```

---

## 🔮 **FUTURE EXPANSION**

You can easily add more:

```
reasoning_expert.json
pattern_advanced.json
time_intermediate.json
probability_advanced.json
spatial_beginner.json
verbal_beginner.json
```

Just copy any existing JSON file and modify!

---

## 📞 **SUPPORT**

See `INTEGRATION_GUIDE.md` for detailed integration steps.

**Everything is ready to use!** 🎯✨

---

**Version:** 2.0
**Date:** February 2026
**Created for:** VOOO AI Project
