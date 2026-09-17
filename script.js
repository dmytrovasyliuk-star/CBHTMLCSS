"use strict";
/**
 * script.ts — Lab 1
 * Мінімальна інтерактивність: лічильник і годинник.
 */
// ── Counter ───────────────────────────────────────────────────────────────────
function initCounter() {
  let count = 0;
  const display = document.getElementById("counter-value");
  const btnInc = document.getElementById("btn-inc");
  const btnDec = document.getElementById("btn-dec");
  const btnReset = document.getElementById("btn-reset");
  if (!display) {
    return;
  }
  function render() {
    if (display) {
      display.textContent = count.toString();
    }
  }
  btnInc?.addEventListener("click", () => {
    count += 1;
    render();
  });
  btnDec?.addEventListener("click", () => {
    count -= 1;
    render();
  });
  btnReset?.addEventListener("click", () => {
    count = 0;
    render();
  });
}
// ── Clock ─────────────────────────────────────────────────────────────────────
function initClock() {
  const clockEl = document.getElementById("clock");
  const dateEl = document.getElementById("date-display");
  if (!clockEl) {
    return;
  }
  function pad(n) {
    return n.toString().padStart(2, "0");
  }
  function tick() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString("uk-UA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }
  tick();
  setInterval(tick, 1000);
}
// ── Init ──────────────────────────────────────────────────────────────────────
function main() {
  initCounter();
  initClock();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
