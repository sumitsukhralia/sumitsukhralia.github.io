<section id="block-visualizer" class="cosmic-visualizer-section">
  <canvas id="cosmicCanvas"></canvas>
  <div class="visualizer-content">
    <h2 aria-label="Blockchain Block Visualizer">🔗 Blockchain Block Visualizer</h2>
    <p>Explore block data in real-time — visualized in a cosmic way.</p>
    <div id="block-data" class="block-data">
      <!-- Live block data gets injected here -->
    </div>
  </div>
</section>

<style>
  .cosmic-visualizer-section {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: black;
    color: white;
  }

  #cosmicCanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .visualizer-content {
    position: relative;
    z-index: 1;
    padding: 3rem;
    text-align: center;
  }

  .block-data {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-height: 70vh;
    overflow-y: auto;
  }

  .block {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid #582dbd;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 0 15px #582dbd44;
    width: 90%;
    max-width: 500px;
    text-align: left;
  }

  @media (max-width: 768px) {
    .visualizer-content {
      padding: 2rem 1rem;
    }
  }
</style>

<script>
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

  // === Blockchain Block Demo (Fake Data for Now) ===
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
</script>
