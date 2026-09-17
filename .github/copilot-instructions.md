# GitHub Copilot Instructions

## Project Context

This is **Frontend Lab 1** — a static web project for a 3rd-year Computer Science student.

- **Stack**: HTML5, CSS3, JavaScript (ES2020), TypeScript 5.x
- **Tooling**: ESLint 9 (flat config), Prettier 3, EditorConfig
- **Deployment**: GitHub Pages + Vercel

---

## Code Generation Guidelines

### General

- Prefer **browser-native APIs** over third-party libraries.
- Keep solutions **simple and readable** — this is a learning project.
- Always use **`const`** by default; use **`let`** only when reassignment is needed.
- Never use **`var`**.
- Prefer **arrow functions** for callbacks.

### HTML

- Use **semantic HTML5** elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Every interactive element must have a unique **`id`** attribute.
- Include `aria-label` on icon-only buttons.
- Use `rel="noopener noreferrer"` on `target="_blank"` links.

### CSS

- Use **CSS custom properties** (`--variable-name`) for all colors, spacing, and typography values.
- Prefer **Flexbox** and **CSS Grid** over absolute positioning.
- Write **mobile-first** responsive styles.
- Use `transition` shorthand with explicit properties (not `all`).

### JavaScript / TypeScript

- **TypeScript** is the source of truth — edit `script.ts`, not `script.js` directly.
- Always provide **type annotations** for function parameters and return values.
- Prefer **`interface`** over `type` for object shapes.
- Use **`IntersectionObserver`** for scroll-triggered animations, not scroll event listeners.
- Use **`requestAnimationFrame`** for animations, not `setInterval`.

---

## Forbidden Patterns

```ts
// ❌ Don't do this
var x = 1;
document.getElementById("foo").innerHTML = userInput; // XSS risk
element.style.cssText = "..."; // use classList instead
any; // avoid TypeScript `any`
```

```ts
// ✅ Do this instead
const x = 1;
const el = document.getElementById("foo");
if (el) { el.textContent = sanitize(userInput); }
element.classList.add("active");
```

---

## Commit Message Format

```
<type>: <short description>

Types: feat | fix | style | refactor | docs | chore | test
```

## File Structure (do not change without discussion)

```
index.html      ← markup only, no inline scripts or styles
styles.css      ← all styles here, use CSS variables
script.ts       ← TypeScript source (edit this)
script.js       ← compiled output (auto-generated)
```
