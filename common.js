document.addEventListener('DOMContentLoaded', () => {
    // 1. 全ページ共通メニュー & ダウンロードポップアップのベース挿入
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
                <div id="modalContentInner">
                    </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', commonHTML);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card').forEach(card => observer.observe(card));
});

/* --- 関数定義 --- */

function toggleNav() {
    const nav = document.getElementById('navOverlay');
    const btn = document.querySelector('header .menu-btn');
    const isActive = nav.classList.toggle('active');
    btn.innerText = isActive ? 'CLOSE' : 'MENU';
    document.body.style.overflow = isActive ? 'hidden' : '';
}

function setLang(lang) {
    alert('Language switched: ' + lang.toUpperCase());
}

// ダウンロードポップアップを開く（デバイス判定）
function openDownloadModal(event) {
    if (event) event.preventDefault();
    
    const modal = document.getElementById('downloadModal');
    const inner = document.getElementById('modalContentInner');
    
    // スマホ・タブレット判定
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        inner.innerHTML = `
            <h2 style="color:var(--accent); margin-bottom:1.5rem;">PC専用アプリです</h2>
            <p style="text-align:center; margin-bottom:1.5rem; line-height:1.8;">
                <b>Nihongo Fact Checker</b> は現在 Windows PC 専用です。<br>
                スマホ版・ウェブ版は現在 <span class="accent-text">準備中</span> です。
            </p>
            <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:10px; margin-bottom:1.5rem; font-size:0.9rem;">
                📱 スマホ版：開発中<br>
                🌐 ウェブ版：開発中
            </div>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <a href="roadmap.html" class="btn-main" style="margin:0;">ロードマップを確認する</a>
                <button class="menu-btn" onclick="closeModal()">閉じる</button>
            </div>
        `;
    } else {
        inner.innerHTML = `
            <h2 style="color:var(--accent); margin-bottom:1.5rem;">ダウンロード・実行手順</h2>
            <div style="text-align:left; margin-bottom:2rem; font-size:0.95rem; line-height:1.8; color:rgba(255,255,255,0.9);">
                <p>① 下のボタンから <b>NihongoFactChecker.exe</b> を保存してください。</p>
                <p>② 実行時に「WindowsによってPCが保護されました」と出た場合は、<b>「詳細情報」</b>をクリックし、現れた<b>「実行」</b>ボタンを押してください。</p>
                <p style="margin-top:1rem; font-size:0.8rem; opacity:0.7;">※ウェブ版・スマホ版も順次リリース予定です。</p>
            </div>
            <div style="display:flex; gap:15px; justify-content:center;">
                <button class="btn-main" onclick="executeDownload()" style="margin:0; min-width:180px;">ダウンロード開始</button>
                <button class="menu-btn" onclick="closeModal()">キャンセル</button>
            </div>
        `;
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('downloadModal').style.display = 'none';
    document.body.style.overflow = '';
}

function executeDownload() {
    const filePath = 'dist/NihongoFactChecker.exe';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'NihongoFactChecker.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(closeModal, 500);
}
