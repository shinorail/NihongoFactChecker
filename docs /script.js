// ハンバーガーメニュー
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// 言語切替
const jaBtn = document.getElementById("lang-ja");
const enBtn = document.getElementById("lang-en");

function switchLang(lang) {
  document.querySelectorAll("[data-lang-ja]").forEach(el => {
    el.textContent = el.getAttribute(`data-lang-${lang}`);
  });
}

jaBtn.onclick = () => switchLang("ja");
enBtn.onclick = () => switchLang("en");
