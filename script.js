// === Cosmic Energy Canvas Background ===
const canvas = document.getElementById('cosmicCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    const edges = ['top', 'right', 'bottom', 'left'];
    const edge = edges[Math.floor(Math.random() * edges.length)];
    const offset = 50;

    switch (edge) {
      case 'top':
        this.x = Math.random() * canvas.width;
        this.y = -offset;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 1.5 + 0.5;
        break;
      case 'bottom':
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + offset;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = -(Math.random() * 1.5 + 0.5);
        break;
      case 'left':
        this.x = -offset;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 1.5 + 0.5;
        this.vy = (Math.random() - 0.5) * 2;
        break;
      case 'right':
        this.x = canvas.width + offset;
        this.y = Math.random() * canvas.height;
        this.vx = -(Math.random() * 1.5 + 0.5);
        this.vy = (Math.random() - 0.5) * 2;
        break;
    }

    this.size = Math.random() * 2 + 1;
    this.life = 0;
    this.maxLife = Math.random() * 100 + 100;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life >= this.maxLife) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = '#582dbd';
    ctx.shadowColor = '#582dbd';
    ctx.shadowBlur = 10;
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// === Blockchain Block Demo (Fake Data) ===
function generateBlock(index) {
  const hash = Math.random().toString(36).substring(2, 15);
  const time = new Date().toLocaleString();

  return `
    <div class="block">
      <h3>Block #${index}</h3>
      <p><strong>Hash:</strong> ${hash}</p>
      <p><strong>Transactions:</strong> ${Math.floor(Math.random() * 100)}</p>
      <p><strong>Timestamp:</strong> ${time}</p>
    </div>
  `;
}

const blockDataEl = document.getElementById('block-data');
let blockIndex = 123457;

setInterval(() => {
  const newBlock = generateBlock(blockIndex++);
  blockDataEl.innerHTML = newBlock + blockDataEl.innerHTML;

  // Keep only the latest 10 blocks
  const blocks = blockDataEl.querySelectorAll('.block');
  if (blocks.length > 10) {
    blocks[blocks.length - 1].remove();
  }
}, 3000);
