AOS.init({ duration: 1000 });

const icons = ['💖', '🎈', '🍭', '✨', '🌸', '🧸', '🌈', '🎉'];

function celebrateNow() {
    const rawName = document.getElementById('user-name').value.trim();
    const name = rawName || "Pyaare Dost";
    document.getElementById('target-name').innerText = name;

    document.getElementById('overlay').style.transition = '0.5s';
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('overlay').style.pointerEvents = 'none';

    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('wish-card').style.display = 'block';
        spawnItems();
        startAutoConfetti();
    }, 500);
}

function spawnItems() {
    const count = window.innerWidth < 500 ? 12 : 20;

    for (let i = 0; i < count; i++) {
        let item = document.createElement('div');
        item.className = 'emoji-float';
        item.innerHTML = icons[Math.floor(Math.random() * icons.length)];

        // Random position
        item.style.left = Math.random() * 85 + 'vw';
        item.style.top = Math.random() * 85 + 'vh';

        // Random animation delay taaki sab ek saath move na karein
        item.style.animationDelay = Math.random() * 5 + 's';
        item.style.animationDuration = (Math.random() * 3 + 4) + 's';

        const triggerJump = (e) => {
            item.style.animation = 'none'; // Stop floating
            void item.offsetWidth; // Reset animation
            item.style.animation = 'jump 0.6s ease-out';

            confetti({
                particleCount: 15,
                spread: 40,
                origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
                colors: ['#ffafcc', '#a2d2ff']
            });

            // Resume floating after jump
            setTimeout(() => {
                item.style.animation = `floatMove ${(Math.random() * 3 + 4)}s ease-in-out infinite alternate`;
            }, 600);
        };

        item.addEventListener('mousedown', (e) => triggerJump(e));
        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            triggerJump(e.touches[0]);
        });

        document.body.appendChild(item);
    }
}

function startAutoConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffafcc', '#a2d2ff', '#ffffff']
    });

    setInterval(() => {
        confetti({
            particleCount: 30,
            angle: Math.random() * 360,
            spread: 60,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#ffafcc', '#a2d2ff']
        });
    }, 7000);
}

document.getElementById('user-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') celebrateNow();
});