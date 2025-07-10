const quotes = [
  "Ctrl your mind. Alt your path. Del the limits.",
  "Binary vision in an analog world.",
  "Life is a loop — until you break the pattern.",
  "Debugging reality since 2005.",
  "Even the darkest themes hold light in their syntax.",
  "Glitches aren’t flaws. They’re paths to truth.",
  "Beyond grades, beyond norms.",
  "From labs to loops.",
  "Code isn't just logic, it's legacy."
];

let quoteIndex = 0;
setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  const quoteBox = document.getElementById('quoteBox');
  quoteBox.style.opacity = 0;
  setTimeout(() => {
    quoteBox.innerText = quotes[quoteIndex];
    quoteBox.style.opacity = 1;
  }, 500);
}, 60000);

const aiMessages = [
  "Initializing...",
  "Waking neural core...",
  "Connecting consciousness...",
  "Decoding thoughts...",
  "Compiling intuition...",
  "Deploying self-awareness...",
  "Spawning sentience..."
];
let index = 0;
setInterval(() => {
  document.getElementById("aiTease").textContent = aiMessages[index];
  index = (index + 1) % aiMessages.length;
}, 3000);

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

window.onload = () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  animateElements();

  // Scroll-triggered dark mode
  window.addEventListener('scroll', () => {
    const darkSection = document.getElementById('scroll-dark-section');
    if (!darkSection) return;

    const threshold = darkSection.offsetTop;
    if (window.scrollY >= threshold - 100) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
};

const ASCII_OF_A = "A".charCodeAt();
const NO_OF_ALPHABETS = 26;

function animateElement(element, originalText, options) {
  let iteration = 0;
  if (options.interval) return;
  options.interval = setInterval(() => {
    const newWord = originalText
      .split("")
      .map((_, idx) =>
        idx < iteration
          ? originalText[idx]
          : String.fromCharCode(Math.trunc(Math.random() * NO_OF_ALPHABETS) + ASCII_OF_A)
      )
      .join("");
    element.innerText = newWord;
    iteration += 1;
    if (iteration > originalText.length) {
      clearInterval(options.interval);
      options.interval = null;
    }
  }, 30);
}

function animateElements() {
  const elements = document.getElementsByClassName("animate");
  for (const element of elements) {
    const originalText = element.innerText;
    const options = { interval: null };
    animateElement(element, originalText, options);
    element.addEventListener("mouseover", (event) => {
      animateElement(event.target, originalText, options);
    });
  }
}




const canvas = document.getElementById('cosmic-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  const side = Math.floor(Math.random() * 4);
  let x, y;
  switch (side) {
    case 0: x = Math.random() * width; y = 0; break;
    case 1: x = width; y = Math.random() * height; break;
    case 2: x = Math.random() * width; y = height; break;
    case 3: x = 0; y = Math.random() * height; break;
  }

  const angle = Math.random() * 2 * Math.PI;
  return {
    x, y,
    vx: Math.cos(angle) * 0.6,
    vy: Math.sin(angle) * 0.6,
    size: Math.random() * 2 + 1,
    life: 300
  };
}

function updateParticles() {
  for (let i = 0; i < 2; i++) particles.push(createParticle());
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
  });
  particles = particles.filter(p => p.life > 0);
}

function drawParticles() {
  ctx.fillStyle = '#
