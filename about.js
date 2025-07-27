// Three.js variables
let scene, camera, renderer, particles, particleMaterial;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let animateThreeJsId; // To store requestAnimationFrame ID for potential stopping (though not used in this version)

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js immediately when the DOM is ready
    initThreeJs(document.getElementById('threeJsCanvasBackground'));
    animateThreeJs(); // Start the particle animation loop
});

// --- Three.js Animated Void Setup ---
function initThreeJs(canvasElement) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvasElement, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particleCount = 1500; // Number of particles
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
        // Random positions within a cube for particles
        positions.push(
            (Math.random() * 2 - 1) * 600,
            (Math.random() * 2 - 1) * 600,
            (Math.random() * 2 - 1) * 600
        );
        // Assigning colors for a subtle effect
        color.setHSL(Math.random() * 0.2 + 0.6, 0.7, 0.5); // Warm purple/pink hues
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    particleMaterial = new THREE.PointsMaterial({
        size: 2, // Size of each particle
        vertexColors: true, // Use colors from geometry
        blending: THREE.AdditiveBlending, // For glowing, overlapping effect
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
    camera.position.z = 250; // Initial camera distance

    // Event listeners for mouse interaction and window resizing
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

// Handles mouse movement to influence camera position
function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

// Handles touch start for mobile devices
function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault(); // Prevent scrolling/zooming
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

// Handles touch movement for mobile devices
function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault(); // Prevent scrolling/zooming
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

// Handles window resizing to adjust camera aspect and renderer size
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// The main animation loop for Three.js
function animateThreeJs() {
    animateThreeJsId = requestAnimationFrame(animateThreeJs); // Request next frame

    // Rotate particles
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    // Slight movement for each particle to create a "living" effect
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.00005 + i) * 0.05;
        positions[i+1] += Math.cos(Date.now() * 0.00005 + i) * 0.05;
        positions[i+2] += Math.sin(Date.now() * 0.00005 + i + 10) * 0.05;
    }
    particles.geometry.attributes.position.needsUpdate = true; // Tell Three.js positions changed

    // Smoothly move camera towards mouse position
    camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.03;
    camera.lookAt(scene.position); // Always look at the center of the scene
    renderer.render(scene, camera); // Render the scene
}

// Function to stop Three.js animation (not used in this simple page but good to have)
function stopThreeJsAnimation() {
    if (animateThreeJsId) {
        cancelAnimationFrame(animateThreeJsId);
        animateThreeJsId = null;
    }
}
