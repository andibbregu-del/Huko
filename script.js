// Default channels for everyone
const defaultChannels = [
    { name: "AD Sports Premium 1", url: "https://12.sportsurges.online/albaplayer/ad-premium-1/?serv=0" },
    { name: "BeIN Sports 4", url: "https://12.sportsurges.online/albaplayer/bein-4/?serv=0" },
    { name: "BeIN Sports 6", url: "https://30.wwwkoora.com/albaplayer/bein-sports-hd-6/?serv=0" },
    { name: "BeIN Sports 9", url: "https://30.wwwkoora.com/albaplayer/bein-sports-hd-9/?serv=0" },
    { name: "Kanal Sportiv 1", url: "https://29.lifekora.com/splayer/Live1.php" },
    { name: "Kanal Sportiv 5", url: "https://29.lifekora.com/splayer/Live5.php" }
];

let clickCount = 0;

document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById('main-grid');
    if (!grid) return;

    // Use memory if exists, otherwise use defaults
    let saved = JSON.parse(localStorage.getItem('myChannels'));
    let channels = (saved && saved.length > 0) ? saved : defaultChannels;

    grid.innerHTML = ""; 

    channels.forEach(ch => {
        const card = document.createElement('div');
        card.className = "channel-card";
        const thumbText = ch.name.replace(/\s/g, '+');
        
        card.innerHTML = `
            <div class="thumb" style="background-image: url('https://placehold.co/400x225/1e293b/white?text=${thumbText}');"></div>
            <div class="info">
                <h3>${ch.name}</h3>
                <span>• LIVE TANI</span>
            </div>
        `;
        
        card.onclick = () => launchPlayer(ch.url);
        grid.appendChild(card);
    });
});

function handleSecretClick() {
    clickCount++;
    if (clickCount >= 7) window.location.href = "admin.html";
}

function launchPlayer(url) {
    document.getElementById('mainFrame').src = url;
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('player-view').style.display = 'block';
    document.getElementById('fs-overlay').style.display = 'flex';
}

function closePlayer() {
    document.getElementById('mainFrame').src = "";
    document.getElementById('player-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
}

async function startStream() {
    document.getElementById('fs-overlay').style.display = 'none';
    const elem = document.documentElement;
    try {
        if (elem.requestFullscreen) await elem.requestFullscreen();
        if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape').catch(() => {});
        }
    } catch (e) { console.log("Stream Start"); }
}
