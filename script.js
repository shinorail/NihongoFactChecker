// 自動メニュー生成
const menuItems = [
  { ja: "ホーム", en: "Home", link: "index.html" },
  { ja: "ロードマップ", en: "Roadmap", link: "roadmap.html" },
  { ja: "利用規約", en: "Terms", link: "terms.html" },
  { ja: "プライバシー", en: "Privacy", link: "privacy.html" },
  { ja: "個人情報保護方針", en: "Personal Data", link: "personal-data.html" },
  { ja: "会社情報", en: "Company", link: "company.html" }
];

const navMenu = document.getElementById("nav-menu");

menuItems.forEach(item => {
  const a = document.createElement("a");
  a.href = item.link;
  a.textContent = item.ja;
  a.setAttribute("data-lang-ja", item.ja);
  a.setAttribute("data-lang-en", item.en);
  navMenu.appendChild(a);
});

// ハンバーガーメニュー
const hamburger = document.getElementById("hamburger");
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
