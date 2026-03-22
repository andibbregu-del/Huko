function launchPlayer(url) {
    pendingUrl = url; 
    const overlay = document.getElementById('fs-overlay');
    
    // Hide back button during ad screen
    document.querySelector('.back-btn').style.display = 'none';

    overlay.innerHTML = `
        <div style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: 15px; width: 90%; max-width: 400px;">
            
            <img src="Logo.png" style="width: 200px; margin-bottom: 20px; border-radius: 10px;">

            <button onclick="window.open('${pawnsLink}', '_blank')" class="play-btn" style="background: #fbbf24; color: #000; border: none; cursor: pointer; padding: 18px; border-radius: 12px; font-weight: 900; font-size: 16px; width: 100%;">
                💰 FITONI LEK DUKE LUAJTUR
            </button>
            
            <button onclick="startStream()" class="play-btn" style="background: #22c55e; color: #fff; border: none; cursor: pointer; padding: 18px; border-radius: 12px; font-weight: 900; font-size: 16px; width: 100%;">
                ⚽ VAZHDONI TE NDESHJA
            </button>
        </div>
    `;

    document.getElementById('home-view').style.display = 'none';
    document.getElementById('player-view').style.display = 'block';
    overlay.style.display = 'flex';
}
