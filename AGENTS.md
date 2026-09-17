# Frontend Lab Agent Instructions

## Role
Act as a careful frontend development assistant for a 3rd-year CS student.

## Project
- HTML + CSS + JavaScript/TypeScript.
- Prefer browser-native APIs and simple solutions.
- Do not add dependencies unless there is a clear reason.

## Before editing
1. Inspect the relevant files.
2. State a short plan.
3. Identify risks or missing context.

## After editing
1. Check the diff.
2. Run the relevant lint/format/type checks.
3. Report exactly what changed and what was verified.

## Safety
Never expose or invent secrets. Do not delete files or rewrite project
configuration without explaining why.

---

## Stack & Tooling

| Tool       | Purpose                          | Config file            |
|------------|----------------------------------|------------------------|
| HTML5      | Semantic markup, SEO             | `index.html`           |
| CSS3       | Styling, animations, variables   | `styles.css`           |
| JavaScript | Browser interactivity            | `script.js`            |
| TypeScript | Static typing (source)           | `script.ts`            |
| ESLint     | Static code analysis             | `eslint.config.js`     |
| Prettier   | Code formatting                  | `.prettierrc.json`     |
| EditorConfig | Editor whitespace consistency  | `.editorconfig`        |
| Git        | Version control                  | `.gitignore`           |

## Code Style Rules
- Indentation: **2 spaces** (no tabs)
- Line endings: **LF**
- Max line length: **100 characters**
- Quotes: **double** in JSON, HTML attributes; **single** in JS/TS when possible
- Semicolons: **always** in JS/TS
- Trailing commas: **ES5** style

## File Naming
- Use **kebab-case** for all files and folders.
- Keep filenames short and descriptive.

## Commit Message Format
```
<type>: <short description in Ukrainian or English>

Types: feat | fix | style | refactor | docs | chore
```

Examples:
```
feat: add theme switcher
fix: correct counter reset logic
docs: update README with Vercel URL
style: format with prettier
```

## Deployment
- **GitHub Pages**: `main` branch → `/(root)` served via Pages.
- **Vercel**: auto-deploy on every push to `main`.
- Both deployments should stay in sync after every commit.

## Skill Reference
See [`.agents/skills/lint-and-format/SKILL.md`](.agents/skills/lint-and-format/SKILL.md)
for the reusable lint + format workflow.
