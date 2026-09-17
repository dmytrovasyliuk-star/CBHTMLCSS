---
name: lint-and-format
description: >
  Run ESLint + Prettier checks on the frontend-lab-1 project.
  Use after any code edit to verify correctness and consistent style.
  Triggers on: "lint", "format", "check code", "run prettier", "run eslint".
---

# Skill: Lint and Format

## Purpose

Ensure code quality and consistent formatting across all project files.
Run this skill after every significant code change.

## Steps

### 1. Inspect current state

```bash
# Check which files have been modified
git status --short
```

### 2. Run ESLint

```bash
# Lint JavaScript (compiled output)
npx eslint script.js --max-warnings 0

# If TypeScript source needs linting (requires @typescript-eslint):
# npx eslint script.ts
```

Expected output: **0 errors, 0 warnings**. If warnings appear, fix them before committing.

### 3. Run Prettier (check only, no write)

```bash
npx prettier --check "**/*.{html,css,js,ts,json,md}"
```

### 4. Auto-fix formatting (if check fails)

```bash
npx prettier --write "**/*.{html,css,js,ts,json,md}"
```

### 5. Re-run lint after format

```bash
npx eslint script.js
```

### 6. Report

After completing steps 2–5, report:

```
✓ ESLint: 0 errors, 0 warnings
✓ Prettier: all files formatted
Files checked: script.js, index.html, styles.css, .prettierrc.json
```

## Failure Handling

| Error                          | Fix                                              |
|--------------------------------|--------------------------------------------------|
| ESLint `no-unused-vars`        | Remove unused variable or prefix with `_`        |
| ESLint `prefer-const`          | Change `let` → `const`                          |
| ESLint `eqeqeq`                | Change `==` → `===`                             |
| Prettier "file not formatted"  | Run `prettier --write` on that file             |
| Parse error in eslint.config   | Ensure `"type": "module"` in `package.json`     |

## Notes

- Do **not** run ESLint on `node_modules/` or `dist/`.
- The `eslint.config.js` uses the **flat config** format (ESLint 9+).
- `script.js` is the **compiled output** from `script.ts` — editing it directly is not recommended.
