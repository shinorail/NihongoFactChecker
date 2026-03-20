document.addEventListener('DOMContentLoaded', () => {
    // メニュー制御
    const menuOpen = document.getElementById('js-menu-open');
    const menuClose = document.getElementById('js-menu-close');
    const fullMenu = document.getElementById('js-full-menu');

    menuOpen.addEventListener('click', () => fullMenu.classList.add('active'));
    menuClose.addEventListener('click', () => fullMenu.classList.remove('active'));

    // 設定モーダル制御
    const settingsTrigger = document.getElementById('js-settings-trigger');
    const settingsModal = document.getElementById('js-settings-modal');
    const settingsClose = document.getElementById('js-settings-close');

    settingsTrigger.addEventListener('click', () => settingsModal.classList.add('active'));
    settingsClose.addEventListener('click', () => settingsModal.classList.remove('active'));

    // JSONアップデート情報の取得
    const updateUrl = 'https://shinorail.github.io/NihongoFactChecker/update.json';
    const logEl = document.getElementById('js-console-log');
    const updateInfoEl = document.getElementById('js-update-info');

    async function fetchUpdates() {
        try {
            const response = await fetch(updateUrl);
            const data = await response.json();
            
            logEl.innerHTML += `[${new Date().toLocaleTimeString()}] Version ${data.version} detected.<br>`;
            logEl.innerHTML += `[${new Date().toLocaleTimeString()}] Sync Complete. Status: LATEST.`;
            
            // アップデート情報の表示
            updateInfoEl.innerHTML = `
                <p><strong>Version:</strong> ${data.version}</p>
                <p><strong>Update:</strong> ${data.date || '2026/03/20'}</p>
                <p>${data.description || '機能改善およびバグ修正'}</p>
            `;
        } catch (error) {
            logEl.innerHTML += `<span style="color:red;">[ERROR] Failed to fetch updates.</span>`;
            updateInfoEl.innerHTML = "情報の取得に失敗しました。";
        }
    }

    fetchUpdates();
});
