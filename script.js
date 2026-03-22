let clickCount = 0;

// This is the list EVERYONE will see by default
const defaultChannels = [
    { name: "BeIN Sports 1", url: "https://12.sportsurges.online/albaplayer/bein-1/?serv=0" },
    { name: "BeIN Sports 2", url: "https://12.sportsurges.online/albaplayer/bein-2/?serv=0" },
    { name: "AD Sports Premium 1", url: "https://12.sportsurges.online/albaplayer/ad-premium-1/?serv=0" }
];

window.onload = function() {
    const grid = document.getElementById('main-grid');
    // Checks if YOU have added custom channels via admin, otherwise shows the list above
    let channels = JSON.parse(localStorage.getItem('myChannels')) || defaultChannels;

    channels.forEach(ch => {
        const card = document.createElement('div');
        card.className = "channel-card";
        // Generating a simple thumbnail based on the name
        const thumbUrl = `https://placehold.co/400x225/1e293b/white?text=${ch.name.replace(/\s/g, '+')}`;
        
        card.innerHTML = `
            <div class="thumb" style="background-image: url('${thumbUrl}');"></div>
            <div class="info"><h3>${ch.name}</h3><span>Live Stream</span></div>
        `;
        card.onclick = () => launchPlayer(ch.url);
        grid.appendChild(card);
    });
};

// Secret entrance to admin.html (Click top right 7 times)
function handleSecretClick() {
    clickCount++;
    if (clickCount === 7) {
        window.location.href = "admin.html";
    }
}

function launchPlayer(url) {
    const frame = document.getElementById('mainFrame');
    frame.src = url;
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('player-view').style.display = 'block';
    document.getElementById('fs-overlay').style.display = 'flex';
}

function closePlayer() {
    document.getElementById('mainFrame').src = "";
    document.getElementById('player-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
    if (document.fullscreenElement) document.exitFullscreen();
}

async function startStream() {
    document.getElementById('fs-overlay').style.display = 'none';
    const elem = document.documentElement;
    try {
        if (elem.requestFullscreen) await elem.requestFullscreen();
        if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape').catch(() => {});
        }
    } catch (e) {
        console.log("Fullscreen/Landscape active");
    }
}
