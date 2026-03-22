const pawnsLink = "https://discoverpawns.eu/19346120";

const defaultChannels = [
    { 
        name: "Lojra & Premium", 
        url: "https://discoverpawns.eu/19346120", 
        image: "Logo.png",
        isRecommendation: true
    },
    { name: "AD Sports Premium 1", url: "https://12.sportsurges.online/albaplayer/ad-premium-1/?serv=0" },
    { name: "BeIN Sports 1", url: "https://12.sportsurges.online/albaplayer/bein-1/?serv=0" },
    { name: "BeIN Sports 2", url: "https://12.sportsurges.online/albaplayer/bein-2/?serv=0" },
    { name: "BeIN Sports 3", url: "https://12.sportsurges.online/albaplayer/bein-3/?serv=0" },
    { name: "BeIN Sports 4", url: "https://12.sportsurges.online/albaplayer/bein-4/?serv=0" },
    { name: "BeIN Sports 6", url: "https://30.wwwkoora.com/albaplayer/bein-sports-hd-6/?serv=0" },
    { name: "BeIN Sports 9", url: "https://30.wwwkoora.com/albaplayer/bein-sports-hd-9/?serv=0" },
    { name: "Kanal Sportiv 1", url: "https://29.lifekora.com/splayer/Live1.php" },
    { name: "Kanal Sportiv 5", url: "https://29.lifekora.com/splayer/Live5.php" }
];

let clickCount = 0;
let pendingUrl = ""; 

// Handles Android Hardware Back Button
window.onpopstate = function() {
    closePlayer(true); 
};

document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById('main-grid');
    if (!grid) return;

    let saved = JSON.parse(localStorage.getItem('myChannels'));
    let channels = (saved && saved.length > 5) ? saved : defaultChannels;

    grid.innerHTML = ""; 

    channels.forEach(ch => {
        const card = document.createElement('div');
        card.className = "channel-card";
        const bgImage = ch.image ? ch.image : `https://placehold.co/400x225/1e293b/white?text=${ch.name.replace(/\s/g, '+')}`;
        
        card.innerHTML = `
            <div class="thumb" style="background-image: url('${bgImage}');"></div>
            <div class="info">
                <h3>${ch.name}</h3>
                <span>• LIVE TANI</span>
            </div>
        `;
        
        card.onclick = () => launchPlayer(ch.url);
        grid.appendChild(card);
    });
});

function launchPlayer(url) {
    pendingUrl = url; 
    const overlay = document.getElementById('fs-overlay');
    
    // Push state so Android back button works
    history.pushState({view: "player"}, "");

    overlay.innerHTML = `
        <div style="text-align: center; width: 90%; max-width: 400px; display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <div class="channel-card" style="width: 100%; cursor: default; border-color: #334155;">
                <div class="thumb" style="background-image: url('Logo.png');"></div>
            </div>
            <div style="width: 100%; display: flex; flex-direction: column; gap: 15px;">
                <button onclick="window.open('${pawnsLink}', '_blank')" style="background: #fbbf24; color: #000; width: 100%; border: none; cursor: pointer; padding: 18px; border-radius: 12px; font-weight: 900; font-size: 16px;">
                    💰 FITONI LEK DUKE LUAJTUR
                </button>
                <button onclick="startStream()" style="background: #22c55e; color: #fff; width: 100%; border: none; cursor: pointer; padding: 18px; border-radius: 12px; font-weight: 900; font-size: 16px;">
                    ⚽ VAZHDONI TE NDESHJA
                </button>
            </div>
        </div>
    `;

    document.getElementById('home-view').style.display = 'none';
    document.getElementById('player-view').style.display = 'block';
    overlay.style.display = 'flex';
}

function startStream() {
    document.getElementById('mainFrame').src = pendingUrl; 
    document.getElementById('fs-overlay').style.display = 'none';
}

function closePlayer(isBackAction = false) {
    const frame = document.getElementById('mainFrame');
    if (frame) frame.src = "";
    document.getElementById('player-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    
    if (!isBackAction) history.back();
}

function handleSecretClick() {
    clickCount++;
    if (clickCount >= 7) window.location.href = "admin.html";
}
