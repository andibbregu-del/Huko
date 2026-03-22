// 1. Define the default channels
const defaultChannels = [
    { name: "BeIN Sports 1", url: "https://12.sportsurges.online/albaplayer/bein-1/?serv=0" },
    { name: "BeIN Sports 2", url: "https://12.sportsurges.online/albaplayer/bein-2/?serv=0" },
    { name: "AD Sports Premium 1", url: "https://12.sportsurges.online/albaplayer/ad-premium-1/?serv=0" }
];

let clickCount = 0;

// 2. This function runs as soon as the page is ready
document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById('main-grid');
    
    // Safety check: if grid doesn't exist, stop
    if (!grid) return;

    // 3. Load from memory or use defaults
    let savedChannels = JSON.parse(localStorage.getItem('myChannels'));
    
    // If memory is empty or broken, use the defaults defined above
    let channels = (savedChannels && savedChannels.length > 0) ? savedChannels : defaultChannels;

    // 4. Clear the grid and inject the channel cards
    grid.innerHTML = ""; 

    channels.forEach(ch => {
        const card = document.createElement('div');
        card.className = "channel-card";
        
        // Create a clean thumbnail label
        const thumbText = ch.name.replace(/\s/g, '+');
        
        card.innerHTML = `
            <div class="thumb" style="background-image: url('https://placehold.co/400x225/1e293b/white?text=${thumbText}');"></div>
            <div class="info">
                <h3>${ch.name}</h3>
                <span>Transmetim Live</span>
            </div>
        `;
        
        card.onclick = () => launchPlayer(ch.url);
        grid.appendChild(card);
    });
});

// --- HELPER FUNCTIONS ---

// Secret: Jump to admin.html after 7 clicks in top right
function handleSecretClick() {
    clickCount++;
    if (clickCount >= 7) {
        window.location.href = "admin.html";
    }
}

function launchPlayer(url) {
    const frame = document.getElementById('mainFrame');
    if (!frame) return;
    
    frame.src = url;
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('player-view').style.display = 'block';
    document.getElementById('fs-overlay').style.display = 'flex';
}

function closePlayer() {
    const frame = document.getElementById('mainFrame');
    if (frame) frame.src = "";
    
    document.getElementById('player-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
    
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
    }
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
        console.log("Player Active");
    }
}
