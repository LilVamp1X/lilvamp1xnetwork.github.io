const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '0123456789ABCDEF';
const secretWord = 'YOU ARE BEING WATCHED';

const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'grey';
    ctx.font = fontSize + 'px Courier';

    for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (Math.random() < 0.0005) {
            ctx.fillStyle = 'white';
            ctx.fillText(secretWord, Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.fillStyle = 'grey';
        }

        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }
}

setInterval(draw, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
