/**
 * script.ts — Lab1 CSS
 * TypeScript source file with type-safe interactive features.
 * Compiled to script.js via tsc.
 */
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
declare const THEMES: Record<Theme, ThemeConfig>;
declare function getEl<T extends HTMLElement>(id: string): T | null;
declare function animateCount(config: StatConfig): void;
declare function initNavbar(): void;
declare function initScrollReveal(): void;
declare function initStats(): void;
declare function initCounter(): void;
declare function initThemeSwitcher(): void;
declare function initClock(): void;
interface GreeterOptions {
  name: string;
  lang?: string;
}
declare function greet(opts: GreeterOptions): string;
declare function initGreeter(): void;
declare function main(): void;
