/**
 * script.ts — Lab1 CSS
 * TypeScript source file with type-safe interactive features.
 * Compiled to script.js via tsc.
 */

// ── Type Definitions ──────────────────────────────────────────────────────────

interface StatConfig {
  targetEl: HTMLElement;
  target: number;
  suffix?: string;
  duration?: number;
}

interface ThemeConfig {
  name: string;
  h: number;
  s: string;
  l: string;
}

type Theme = "purple" | "blue" | "emerald" | "rose" | "amber";

// ── Constants ─────────────────────────────────────────────────────────────────

const THEMES: Record<Theme, ThemeConfig> = {
  purple: { name: "purple", h: 258, s: "90%", l: "60%" },
  blue: { name: "blue", h: 210, s: "95%", l: "58%" },
  emerald: { name: "emerald", h: 152, s: "80%", l: "50%" },
  rose: { name: "rose", h: 340, s: "82%", l: "62%" },
  amber: { name: "amber", h: 38, s: "95%", l: "56%" },
};

// ── Utility Functions ─────────────────────────────────────────────────────────

function getEl<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function animateCount(config: StatConfig): void {
  const { targetEl, target, suffix = "", duration = 1400 } = config;
  const start = performance.now();

  function step(now: number): void {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    targetEl.textContent = current.toString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function initNavbar(): void {
  const navbar = getEl<HTMLElement>("navbar");
  const burgerBtn = getEl<HTMLButtonElement>("burger-btn");
  const navLinks = getEl<HTMLElement>("nav-links");

  if (!navbar) return;

  // Scroll: add .scrolled class
  const onScroll = (): void => {
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
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const links = document.querySelectorAll<HTMLAnchorElement>(".nav-link");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => {
            l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => io.observe(s));
}

// ── Scroll Reveal ─────────────────────────────────────────────────────────────

function initScrollReveal(): void {
  const els = document.querySelectorAll<HTMLElement>(".tech-card, .feature-item, .demo-card");

  els.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );

  els.forEach((el) => io.observe(el));
}

// ── Animated Stats ────────────────────────────────────────────────────────────

function initStats(): void {
  const statLines = getEl<HTMLElement>("stat-lines");
  const statTech = getEl<HTMLElement>("stat-tech");
  const statFiles = getEl<HTMLElement>("stat-files");

  if (!statLines || !statTech || !statFiles) return;

  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCount({ targetEl: statLines, target: 650 });
        animateCount({ targetEl: statTech, target: 6, duration: 800 });
        animateCount({ targetEl: statFiles, target: 12, duration: 1000 });
        io.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  io.observe(statLines);
}

// ── Counter Demo ──────────────────────────────────────────────────────────────

function initCounter(): void {
  let count = 0;
  const display = getEl<HTMLElement>("counter-display");
  const btnInc = getEl<HTMLButtonElement>("btn-increment");
  const btnDec = getEl<HTMLButtonElement>("btn-decrement");
  const btnRst = getEl<HTMLButtonElement>("btn-reset");

  if (!display) return;

  const update = (newVal: number): void => {
    count = newVal;
    display.textContent = count.toString();
    display.classList.remove("bump");
    // Force reflow to restart animation
    void display.offsetWidth;
    display.classList.add("bump");

    // Colour feedback
    if (count > 0) display.style.color = "hsl(152, 80%, 55%)";
    else if (count < 0) display.style.color = "hsl(0, 70%, 65%)";
    else display.style.color = "var(--clr-accent)";
  };

  btnInc?.addEventListener("click", () => update(count + 1));
  btnDec?.addEventListener("click", () => update(count - 1));
  btnRst?.addEventListener("click", () => update(0));
}

// ── Theme Switcher ────────────────────────────────────────────────────────────

function initThemeSwitcher(): void {
  const swatches = document.querySelectorAll<HTMLButtonElement>(".swatch");
  let currentTheme: Theme = "purple";

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const theme = swatch.dataset["theme"] as Theme;
      if (!THEMES[theme]) return;

      document.body.setAttribute("data-theme", theme);
      swatches.forEach((s) => s.classList.remove("active"));
      swatch.classList.add("active");
      currentTheme = theme;

      // Persist to sessionStorage
      try {
        sessionStorage.setItem("lab1-theme", currentTheme);
      } catch {
        // Storage not available
      }
    });
  });

  // Restore persisted theme
  try {
    const saved = sessionStorage.getItem("lab1-theme") as Theme | null;
    if (saved && THEMES[saved]) {
      document.querySelector<HTMLButtonElement>(`.swatch-${saved}`)?.click();
    }
  } catch {
    // Storage not available
  }
}

// ── Live Clock ────────────────────────────────────────────────────────────────

function initClock(): void {
  const timeEl = getEl<HTMLElement>("clock-time");
  const dateEl = getEl<HTMLElement>("clock-date");

  if (!timeEl || !dateEl) return;

  const DAYS_UK = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
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

  const pad = (n: number): string => n.toString().padStart(2, "0");

  const tick = (): void => {
    const now = new Date();
    timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    dateEl.textContent = `${DAYS_UK[now.getDay()]}, ${now.getDate()} ${MONTHS_UK[now.getMonth()]} ${now.getFullYear()}`;
  };

  tick();
  setInterval(tick, 1000);
}

// ── TypeScript Greeter Demo ───────────────────────────────────────────────────

interface GreeterOptions {
  name: string;
  lang?: string;
}

function greet(opts: GreeterOptions): string {
  const greetings: Record<string, string> = {
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

function initGreeter(): void {
  const input = getEl<HTMLInputElement>("ts-name-input");
  const btn = getEl<HTMLButtonElement>("ts-greet-btn");
  const output = getEl<HTMLElement>("ts-output");

  if (!input || !btn || !output) return;

  const doGreet = (): void => {
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
  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") doGreet();
  });
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

function main(): void {
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
} else {
  main();
}
