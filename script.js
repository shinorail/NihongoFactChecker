document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. メニュー制御 (ハンバーガーメニュー) ---
    const overlay = document.getElementById('js-menu-overlay');
    const openBtn = document.getElementById('js-menu-open');
    const closeBtn = document.getElementById('js-menu-close');

    if (openBtn) openBtn.onclick = () => overlay.classList.add('active');
    if (closeBtn) closeBtn.onclick = () => overlay.classList.remove('active');

    // --- 2. 位置情報の自動取得 ---
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const latLngEl = document.getElementById('js-latlng');
            const locNameEl = document.getElementById('js-location-name');

            if (latLngEl) latLngEl.innerText = `${lat.toFixed(4)} / ${lon.toFixed(4)}`;

            try {
                const res = await fetch(`https://geoapi.heartrails.com/api/json?method=getTowns&x=${lon}&y=${lat}`);
                const data = await res.json();
                if (locNameEl && data.response.location) {
                    const loc = data.response.location[0];
                    locNameEl.innerText = `${loc.city}${loc.town}`;
                }
            } catch (e) {
                if (locNameEl) locNameEl.innerText = "住所取得エラー";
            }
        }, () => {
            if (document.getElementById('js-location-name')) {
                document.getElementById('js-location-name').innerText = "位置情報オフ";
            }
        });
    }

    // --- 3. 今日は何の日 (日付連動ロジック) ---
    function updateAnniversary() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const anniversaryEl = document.getElementById('js-anniversary');
        
        if (!anniversaryEl) return;

        // 代表的な記念日の簡易リスト（順次増やせます）
        const events = {
            "3-20": "上野動物園開園記念日 / LPレコードの日",
            "3-21": "国際森林デー / ランドセルの日",
            "3-22": "世界水の日 / 放送記念日",
            "10-14": "鉄道の日 (日本)",
            "12-25": "クリスマス / スケートの日"
        };

        const key = `${month}-${date}`;
        anniversaryEl.innerHTML = events[key] || `${month}月${date}日の記念日をチェック中...`;
    }
    updateAnniversary();

    // --- 4. コンタクトフォーム (Nagano AI Works Backend 連携) ---
    const contactForm = document.getElementById('js-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const status = document.getElementById('js-form-status');
            const btn = e.target.querySelector('.btn-submit');
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            btn.innerText = "送信中...";
            btn.disabled = true;

            try {
                // 宮嵜さんのデプロイ済みGAS URL
                const gasUrl = "https://script.google.com/macros/s/AKfycbzdGgulUpgtZOz6xrFT5T0Es-f0b4m9MjNXo4EN5CXXsGSjr3X25gRV2nDRyg14RQ2f/exec";

                await fetch(gasUrl, {
                    method: "POST",
                    body: JSON.stringify(data)
                });

                status.innerText = "✅ 送信完了。Nagano AI Works チームよりご連絡します。";
                status.style.color = "#3fb950";
                e.target.reset();
            } catch (error) {
                status.innerText = "❌ エラーが発生しました。";
                status.style.color = "#f85149";
            } finally {
                btn.innerText = "送信する";
                btn.disabled = false;
            }
        });
    }

});
