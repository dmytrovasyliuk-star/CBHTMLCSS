"use strict";
/**
 * script.ts — Lab1 CSS
 * TypeScript source file with type-safe interactive features.
 * Compiled to script.js via tsc.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// ── Constants ─────────────────────────────────────────────────────────────────
const THEMES = {
    purple: { name: "purple", h: 258, s: "90%", l: "60%" },
    blue: { name: "blue", h: 210, s: "95%", l: "58%" },
    emerald: { name: "emerald", h: 152, s: "80%", l: "50%" },
    rose: { name: "rose", h: 340, s: "82%", l: "62%" },
    amber: { name: "amber", h: 38, s: "95%", l: "56%" },
};
// ── Utility Functions ─────────────────────────────────────────────────────────
function getEl(id) {
    return document.getElementById(id);
}
function animateCount(config) {
    const { targetEl, target, suffix = "", duration = 1400 } = config;
    const start = performance.now();
    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        targetEl.textContent = current.toString() + suffix;
        if (progress < 1)
            requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
// ── Navbar ────────────────────────────────────────────────────────────────────
function initNavbar() {
    const navbar = getEl("navbar");
    const burgerBtn = getEl("burger-btn");
    const navLinks = getEl("nav-links");
    if (!navbar)
        return;
    // Scroll: add .scrolled class
    const onScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    // Burger menu
    burgerBtn?.addEventListener("click", () => {
        burgerBtn.classList.toggle("open");
        navLinks?.classList.toggle("open");
    });
    // Active nav-link on scroll
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                links.forEach((l) => {
                    l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`);
                });
            }
        });
    }, { threshold: 0.5 });
    sections.forEach((s) => io.observe(s));
}
// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function initScrollReveal() {
    const els = document.querySelectorAll(".tech-card, .feature-item, .demo-card");
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    els.forEach((el) => io.observe(el));
}
// ── Animated Stats ────────────────────────────────────────────────────────────
function initStats() {
    const statLines = getEl("stat-lines");
    const statTech = getEl("stat-tech");
    const statFiles = getEl("stat-files");
    if (!statLines || !statTech || !statFiles)
        return;
    const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCount({ targetEl: statLines, target: 650 });
            animateCount({ targetEl: statTech, target: 6, duration: 800 });
            animateCount({ targetEl: statFiles, target: 12, duration: 1000 });
            io.disconnect();
        }
    }, { threshold: 0.5 });
    io.observe(statLines);
}
// ── Counter Demo ──────────────────────────────────────────────────────────────
function initCounter() {
    let count = 0;
    const display = getEl("counter-display");
    const btnInc = getEl("btn-increment");
    const btnDec = getEl("btn-decrement");
    const btnRst = getEl("btn-reset");
    if (!display)
        return;
    const update = (newVal) => {
        count = newVal;
        display.textContent = count.toString();
        display.classList.remove("bump");
        // Force reflow to restart animation
        void display.offsetWidth;
        display.classList.add("bump");
        // Colour feedback
        if (count > 0)
            display.style.color = "hsl(152, 80%, 55%)";
        else if (count < 0)
            display.style.color = "hsl(0, 70%, 65%)";
        else
            display.style.color = "var(--clr-accent)";
    };
    btnInc?.addEventListener("click", () => update(count + 1));
    btnDec?.addEventListener("click", () => update(count - 1));
    btnRst?.addEventListener("click", () => update(0));
}
// ── Theme Switcher ────────────────────────────────────────────────────────────
function initThemeSwitcher() {
    const swatches = document.querySelectorAll(".swatch");
    let currentTheme = "purple";
    swatches.forEach((swatch) => {
        swatch.addEventListener("click", () => {
            const theme = swatch.dataset["theme"];
            if (!THEMES[theme])
                return;
            document.body.setAttribute("data-theme", theme);
            swatches.forEach((s) => s.classList.remove("active"));
            swatch.classList.add("active");
            currentTheme = theme;
            // Persist to sessionStorage
            try {
                sessionStorage.setItem("lab1-theme", currentTheme);
            }
            catch {
                // Storage not available
            }
        });
    });
    // Restore persisted theme
    try {
        const saved = sessionStorage.getItem("lab1-theme");
        if (saved && THEMES[saved]) {
            document
                .querySelector(`.swatch-${saved}`)
                ?.click();
        }
    }
    catch {
        // Storage not available
    }
}
// ── Live Clock ────────────────────────────────────────────────────────────────
function initClock() {
    const timeEl = getEl("clock-time");
    const dateEl = getEl("clock-date");
    if (!timeEl || !dateEl)
        return;
    const DAYS_UK = [
        "Неділя",
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четвер",
        "П'ятниця",
        "Субота",
    ];
    const MONTHS_UK = [
        "січня",
        "лютого",
        "березня",
        "квітня",
        "травня",
        "червня",
        "липня",
        "серпня",
        "вересня",
        "жовтня",
        "листопада",
        "грудня",
    ];
    const pad = (n) => n.toString().padStart(2, "0");
    const tick = () => {
        const now = new Date();
        timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        dateEl.textContent = `${DAYS_UK[now.getDay()]}, ${now.getDate()} ${MONTHS_UK[now.getMonth()]} ${now.getFullYear()}`;
    };
    tick();
    setInterval(tick, 1000);
}
function greet(opts) {
    const greetings = {
        uk: "Привіт",
        en: "Hello",
        de: "Hallo",
        fr: "Bonjour",
        es: "Hola",
        ja: "こんにちは",
        zh: "你好",
        ar: "مرحبا",
    };
    const lang = opts.lang ?? "uk";
    const greeting = greetings[lang] ?? greetings["uk"];
    return `${greeting}, ${opts.name}! 👋 Ласкаво просимо до Lab1!`;
}
function initGreeter() {
    const input = getEl("ts-name-input");
    const btn = getEl("ts-greet-btn");
    const output = getEl("ts-output");
    if (!input || !btn || !output)
        return;
    const doGreet = () => {
        const name = input.value.trim();
        if (!name) {
            output.textContent = "⚠️ Будь ласка, введіть ім'я";
            output.classList.remove("active");
            return;
        }
        output.textContent = greet({ name, lang: "uk" });
        output.classList.add("active");
    };
    btn.addEventListener("click", doGreet);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            doGreet();
    });
}
// ── Bootstrap ─────────────────────────────────────────────────────────────────
function main() {
    initNavbar();
    initScrollReveal();
    initStats();
    initCounter();
    initThemeSwitcher();
    initClock();
    initGreeter();
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
}
else {
    main();
}
