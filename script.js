const defaultChannels = [
    // We add your image as the first "Channel"
    { 
        name: "Lojra & Premium", 
        url: "https://your-ad-link-here.com", // You can put an ad link or a game here
        image: "Logo.png" 
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

document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById('main-grid');
    if (!grid) return;

    let saved = JSON.parse(localStorage.getItem('myChannels'));
    let channels = (saved && saved.length > 0) ? saved : defaultChannels;

    grid.innerHTML = ""; 

    channels.forEach(ch => {
        const card = document.createElement('div');
        card.className = "channel-card";
        
        // Use Logo.png if provided, otherwise use the placeholder text thumb
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

// ... Keep the rest of your script.js functions (launchPlayer, closePlayer, etc.) exactly the same ...
