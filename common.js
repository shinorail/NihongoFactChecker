document.addEventListener('DOMContentLoaded', () => {
    // 1. 全ページ共通メニューの自動挿入
    const menuHTML = `
        <nav id="navOverlay">
            <a href="index.html" class="nav-link" style="transition-delay: 0.1s">Home</a>
            <a href="roadmap.html" class="nav-link" style="transition-delay: 0.2s">Roadmap</a>
            <a href="company.html" class="nav-link" style="transition-delay: 0.3s">Brand</a>
            <a href="terms.html" class="nav-link" style="transition-delay: 0.4s">Terms</a>
            <a href="privacy.html" class="nav-link" style="transition-delay: 0.5s">Privacy</a>
            <a href="personal-data.html" class="nav-link" style="transition-delay: 0.6s">Data Policy</a>
        </nav>
        <div style="position:fixed; bottom:30px; right:30px; z-index:1000; display:flex; gap:12px;">
            <button class="menu-btn" style="padding: 8px 18px;" onclick="setLang('ja')">JP</button>
            <button class="menu-btn" style="padding: 8px 18px;" onclick="setLang('en')">EN</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    // 2. スクロールアニメーションの監視（ふわっと表示）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card').forEach(card => observer.observe(card));
});

// メニュー開閉
function toggleNav() {
    const nav = document.getElementById('navOverlay');
    const btn = document.querySelector('header .menu-btn');
    const isActive = nav.classList.toggle('active');
    btn.innerText = isActive ? 'CLOSE' : 'MENU';
    document.body.style.overflow = isActive ? 'hidden' : '';
}

// 言語切替（デモ）
function setLang(lang) {
    alert('Language switched: ' + lang.toUpperCase());
}

// 実ファイルダウンロード処理（URLに#を付けず、dist内のexeを取得）
function startDownload(event) {
    if (event) event.preventDefault();
    const filePath = 'dist/NihongoFactChecker.exe';
    
    // ダウンロード用の仮想リンク作成
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'NihongoFactChecker.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Download attempt: ' + filePath);
}
