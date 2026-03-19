document.addEventListener('DOMContentLoaded', () => {
    // メニューのHTMLを自動挿入
    const menuHTML = `
        <nav id="navOverlay">
            <a href="index.html" class="nav-link" style="transition-delay: 0.1s">Home</a>
            <a href="roadmap.html" class="nav-link" style="transition-delay: 0.2s">Roadmap</a>
            <a href="company.html" class="nav-link" style="transition-delay: 0.3s">Brand</a>
            <a href="terms.html" class="nav-link" style="transition-delay: 0.4s">Terms</a>
            <a href="privacy.html" class="nav-link" style="transition-delay: 0.5s">Privacy</a>
            <a href="personal-data.html" class="nav-link" style="transition-delay: 0.6s">Data Policy</a>
        </nav>
        <div class="lang-switch" style="position:fixed; bottom:30px; right:30px; z-index:1000;">
            <button class="menu-btn" onclick="setLang('ja')">JP</button>
            <button class="menu-btn" onclick="setLang('en')">EN</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    // スクロール時のカードふわっと表示（追加アニメーション用）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
});

function toggleNav() {
    const nav = document.getElementById('navOverlay');
    const btn = document.querySelector('.menu-btn');
    const isActive = nav.classList.toggle('active');
    btn.innerText = isActive ? 'CLOSE' : 'MENU';
    document.body.style.overflow = isActive ? 'hidden' : '';
}

function setLang(lang) {
    alert('Language: ' + lang.toUpperCase());
}
