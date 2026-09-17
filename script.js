"use strict";
const infoText = document.getElementById("info-text");
const infoBlock = document.getElementById("info-block");
const mainBtn = document.getElementById("main-btn");
const countEl = document.getElementById("count");
const btnInc = document.getElementById("btn-inc");
const btnDec = document.getElementById("btn-dec");
const btnReset = document.getElementById("btn-reset");
let toggled = false;
let count = 0;
mainBtn?.addEventListener("click", () => {
  toggled = !toggled;
  if (infoText) {
    infoText.textContent = toggled
      ? "Текст змінено! Натисніть ще раз, щоб повернути."
      : "Натисніть кнопку, щоб змінити текст.";
  }
  infoBlock?.classList.toggle("active", toggled);
});
function render() {
  if (countEl) countEl.textContent = count.toString();
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
