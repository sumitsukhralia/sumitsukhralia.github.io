// Three.js variables
let scene, camera, renderer, particles, particleMaterial;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let animateThreeJsId; // To store requestAnimationFrame ID

// Screen elements
const preloader = document.getElementById('preloader');
const accessSystemBtn = document.getElementById('accessSystemBtn');
const mainContent = document.getElementById('main-content');

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Three.js immediately
    initThreeJs(document.getElementById('threeJsCanvasBackground'));
    animateThreeJs(); // Start particle animation loop

    // Show the preloader initially
    preloader.classList.add('active');

    // Handle the button click
    accessSystemBtn.onclick = () => {
        // Hide the preloader
        preloader.classList.remove('active');
        // Show the main content
        mainContent.classList.add('active');
    };
});


// --- Three.js Animated Void Setup (unchanged from previous versions) ---
function initThreeJs(canvasElement) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvasElement, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
        positions.push(
            (Math.random() * 2 - 1) * 600,
            (Math.random() * 2 - 1) * 600,
            (Math.random() * 2 - 1) * 600
        );
        color.setHSL(Math.random() * 0.2 + 0.6, 0.7, 0.5); // Warm purple/pink hues
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    particleMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
    camera.position.z = 250;

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateThreeJs() {
    animateThreeJsId = requestAnimationFrame(animateThreeJs);

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.00005 + i) * 0.05;
        positions[i+1] += Math.cos(Date.now() * 0.00005 + i) * 0.05;
        positions[i+2] += Math.sin(Date.now() * 0.00005 + i + 10) * 0.05;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
