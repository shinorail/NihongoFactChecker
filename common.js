document.addEventListener('DOMContentLoaded', () => {
    // 1. 全ページ共通メニュー & ダウンロードポップアップの挿入
    const commonHTML = `
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

        <div id="downloadModal" style="position:fixed; inset:0; background:rgba(10, 15, 28, 0.9); backdrop-filter:blur(15px); display:none; justify-content:center; align-items:center; z-index:3000;">
            <div class="glass-card" style="max-width:550px; width:90%; text-align:center; opacity:1; transform:none; border: 1px solid var(--accent);">
                <h2 style="color:var(--accent); margin-bottom:1.5rem;">ダウンロード・実行手順</h2>
                <div style="text-align:left; margin-bottom:2rem; font-size:0.95rem; line-height:1.8; color:rgba(255,255,255,0.9);">
                    <p>① 下のボタンから <b>NihongoFactChecker.exe</b> を保存してください。</p>
                    <p>② 実行時に「WindowsによってPCが保護されました」と表示される場合があります。</p>
                    <p>③ その際は、画面内の<b>「詳細情報」</b>をクリックし、現れた<b>「実行」</b>ボタンを押してください。</p>
                    <p style="margin-top:1rem; font-size:0.8rem; opacity:0.7;">※個人開発アプリのため、Windowsの警告が出ることがありますが、安全性に問題はありません。</p>
                </div>
                <div style="display:flex; gap:15px; justify-content:center;">
                    <button class="btn-main" onclick="executeDownload()" style="margin:0; min-width:180px;">ダウンロード開始</button>
                    <button class="menu-btn" onclick="closeModal()">キャンセル</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', commonHTML);

    // 2. スクロールアニメーション（Intersection Observer）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card').forEach(card => observer.observe(card));
});

/* --- 関数定義 --- */

// メニューの開閉
function toggleNav() {
    const nav = document.getElementById('navOverlay');
    const btn = document.querySelector('header .menu-btn');
    const isActive = nav.classList.toggle('active');
    btn.innerText = isActive ? 'CLOSE' : 'MENU';
    document.body.style.overflow = isActive ? 'hidden' : '';
}

// 言語切替（アラートのみ）
function setLang(lang) {
    alert('Language switched: ' + lang.toUpperCase());
}

// ダウンロードポップアップを開く
function openDownloadModal(event) {
    if (event) event.preventDefault();
    document.getElementById('downloadModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ダウンロードポップアップを閉じる
function closeModal() {
    document.getElementById('downloadModal').style.display = 'none';
    document.body.style.overflow = '';
}

// 実際のダウンロード処理実行
function executeDownload() {
    const filePath = 'dist/NihongoFactChecker.exe';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'NihongoFactChecker.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // ダウンロード開始後にポップアップを閉じる
    setTimeout(closeModal, 500);
}
