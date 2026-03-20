document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 位置情報の自動取得
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            document.getElementById('js-latlng').innerText = `${lat.toFixed(4)} / ${lon.toFixed(4)}`;

            try {
                // 逆ジオコーディング（緯度経度から住所を取得）
                const res = await fetch(`https://geoapi.heartrails.com/api/json?method=getTowns&x=${lon}&y=${lat}`);
                const data = await res.json();
                const loc = data.response.location[0];
                document.getElementById('js-location-name').innerText = `${loc.city}${loc.town}`;
            } catch (e) {
                document.getElementById('js-location-name').innerText = "住所取得エラー";
            }
        }, () => {
            document.getElementById('js-location-name').innerText = "位置情報オフ";
        });
    }

    // 2. 運行情報の更新（ここを将来的にAPIと連動可能）
    // 現状は静的ですが、fetch等で順次拡張できます。

    // 3. 今日は何の日（今日の日付に合わせて内容を変える処理をここに追加可能）
});
