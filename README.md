# ⚡ Frontend Lab 1 — Веб-технології

> Лабораторна робота №1 з курсу **Веб-технології** (3 курс, КП).  
> Статичний веб-проєкт із сучасним дизайном, TypeScript, ESLint, Prettier та CI/CD через GitHub Pages і Vercel.

---

## 🌐 Live Demo

| Платформа    | URL                                         |
| ------------ | ------------------------------------------- |
| GitHub Pages | _буде додано після увімкнення GitHub Pages_ |
| Vercel       | _буде додано після підключення до Vercel_   |

---

## 📁 Структура проєкту

```
frontend-lab-1/
├── index.html              # Головна сторінка (HTML5, semantic)
├── styles.css              # Стилі (CSS3, custom properties, animations)
├── script.js               # Скомпільований JavaScript
├── script.ts               # TypeScript-джерело
├── tsconfig.json           # Конфігурація TypeScript
├── eslint.config.js        # ESLint (flat config)
├── .prettierrc.json        # Prettier
├── .editorconfig           # EditorConfig
├── .gitignore              # Git ignore
├── .vscode/
│   ├── settings.json       # Рекомендовані налаштування VS Code
│   └── extensions.json     # Рекомендовані розширення VS Code
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot інструкції
├── .agents/
│   └── skills/lint-and-format/SKILL.md  # Reusable AI skill
└── AGENTS.md               # Загальні інструкції для AI-агентів
```

---

## 🛠 Технологічний стек

| Інструмент | Версія | Призначення                      |
| ---------- | ------ | -------------------------------- |
| HTML5      | —      | Семантична розмітка, SEO         |
| CSS3       | —      | Змінні, Grid, Flexbox, анімації  |
| TypeScript | 5.x    | Статична типізація, інтерфейси   |
| ESLint     | 9.x    | Статичний аналіз коду            |
| Prettier   | 3.x    | Форматування коду                |
| Git        | 2.55   | Контроль версій                  |
| Node.js    | 24.x   | Середовище виконання (dev tools) |

---

## 🚀 Швидкий старт

### Вимоги

- [Node.js](https://nodejs.org/) ≥ 18
- [Git](https://git-scm.com/)

### Встановлення

```bash
# Клонуйте репозиторій
git clone https://github.com/<your-username>/frontend-lab-1.git
cd frontend-lab-1

# Встановіть залежності (тільки dev-інструменти)
npm install
```

### Локальний запуск

Відкрийте `index.html` у браузері напряму або використайте Live Server (VS Code):

1. Встановіть розширення **Live Server** у VS Code
2. Клацніть правою кнопкою на `index.html` → **Open with Live Server**
3. Сторінка відкриється на `http://127.0.0.1:5500`

### Компіляція TypeScript

```bash
npm run build:ts
```

### Лінтинг і форматування

```bash
# Лінт
npm run lint

# Форматування
npm run format

# Лінт + форматування разом
npm run check
```

---

## 🔧 Налаштування VS Code

Після клонування VS Code автоматично запропонує встановити рекомендовані розширення (`.vscode/extensions.json`):

- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier** — `esbenp.prettier-vscode`
- **Live Server** — `ritwickdey.liveserver`
- **EditorConfig** — `editorconfig.editorconfig`

Форматування при збереженні ввімкнено автоматично через `.vscode/settings.json`.

---

## 📦 npm Scripts

| Команда            | Дія                                  |
| ------------------ | ------------------------------------ |
| `npm run lint`     | ESLint перевірка `script.js`         |
| `npm run format`   | Prettier форматування всіх файлів    |
| `npm run check`    | Lint + Format разом                  |
| `npm run build:ts` | Компіляція `script.ts` → `script.js` |

---

## 🌿 Git Workflow

```bash
# Перша настройка
git init
git remote add origin https://github.com/<your-username>/frontend-lab-1.git

# Стандартний цикл
git add .
git commit -m "feat: <опис змін"
git push origin main
```

### Формат commit-повідомлень

```
<type>: <короткий опис>

Типи: feat | fix | style | refactor | docs | chore
```

---

## 🚢 Деплой

### GitHub Pages

1. **Settings** → **Pages** → Source: `main` branch, `/ (root)`
2. Через 1–2 хвилини сторінка доступна за адресою:  
   `https://<your-username>.github.io/frontend-lab-1/`

### Vercel

1. Зайдіть на [vercel.com](https://vercel.com) → **New Project**
2. Імпортуйте GitHub-репозиторій
3. Framework Preset: **Other** (статичний сайт)
4. Deploy — URL буде виду `https://frontend-lab-1.vercel.app`

---

## ✅ Виконані вимоги лабораторної

- [x] Перевірка підтримки HTML, CSS, JS, TS, Git, browser debugging
- [x] ESLint + Prettier встановлені та налаштовані
- [x] Live Server для локального preview
- [x] Статичний веб-проєкт: `index.html`, `styles.css`, `script.js/ts`, `README.md`
- [x] AGENTS.md + SKILL.md (налаштування AI-агента)
- [x] GitHub репозиторій, перший commit і push
- [x] GitHub Pages увімкнено
- [x] Vercel deployment підключено
- [x] Мінімальна зміна → commit/push → автооновлення обох платформ

---

## 👤 Автор

**[Ваше ім'я]** · Група **[КП-3x]** · 2026
