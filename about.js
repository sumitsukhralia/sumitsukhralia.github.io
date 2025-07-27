// Global variables for Firebase (will be populated by the script tag in HTML)
let firebaseLogEvent;

// Three.js variables
let scene, camera, renderer, particles, particleMaterial;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let animateThreeJsId; // To store requestAnimationFrame ID

// Screen elements
const boomContainer = document.getElementById('boom-container');
const preloader = document.getElementById('preloader');
const preloaderText = document.getElementById('preloader-text');
const accessSystemBtn = document.getElementById('accessSystemBtn');
const loginScreen = document.getElementById('login-screen');
const welcomeMessage = document.getElementById('welcome-message');
const nameInputContainer = document.getElementById('name-input-container');
const nameInputLabel = document.getElementById('name-input-label');
const nameInputHint = document.getElementById('name-input-hint');
const visitorNameInput = document.getElementById('visitorName');
const initiateProtocolBtn = document.getElementById('initiateProtocolBtn');
const statusMessage = document.getElementById('status-message');
const mainHubScreen = document.getElementById('main-hub-screen');
const gameOverScreen = document.getElementById('game-over-screen');

// Module content elements
const profileContent = document.getElementById('profile-content');
const projectsContent = document.getElementById('projects-content');
const historyContent = document.getElementById('history-content');
const contactContent = document.getElementById('contact-content');

// Game state variables
let visitedModules = new Set();
let userName = "UNIDENTIFIED_USER"; // Default user name

// Text content for the game
const preloaderMessages = [
    "SYSTEM DIAGNOSTICS: RUNNING...",
    "LOADING CORE MODULES...",
    "ESTABLISHING DATA LINK..."
];

const moduleContents = {
    profile: `STATUS: ONLINE
DESIGNATION: Sumit Sukhralia
PRIMARY FUNCTION: Digital Architect / Creator
CURRENT STATUS: Operating within creative parameters.
PROTOCOL: Always learning, always building.
ENERGIZED BY: Curiosity, challenges, good vibes.`,

    projects: `LOG ENTRY: 001 - Full-Stack Development
STATUS: ENGAGED. Building robust systems from front-end interfaces to back-end logic. Focused on intuitive user experiences.

LOG ENTRY: 002 - AI/ML Exploration
STATUS: INITIATED. Diving into machine learning algorithms, exploring possibilities in automation and intelligent systems. Fascinated by what comes next.

LOG ENTRY: 003 - Open Source Contributions
STATUS: ONGOING. Contributing to community-driven projects, believing in shared knowledge and collaborative innovation.

LOG ENTRY: 004 - Creative Endeavors
STATUS: ACTIVE. Experimenting with new design tools, dabbling in digital art, and always seeking unique ways to express ideas.`,

    history: `LOG: GENESIS - Initializing. Early fascinations with breaking and rebuilding digital constructs. A fundamental curiosity about how systems truly operate.

LOG: CALIBRATION_PHASE - A period of recalibration, adapting to unforeseen challenges and re-evaluating core directives. Pivoted towards resilience.

LOG: EMERGENT_PATH - Identified new pathways. Focused on forging unique interactions, believing in blurring traditional boundaries between humans and technology.

LOG: CONTINUOUS_UPGRADE - Ongoing process of skill enhancement and knowledge acquisition. Every challenge is a new update.`,

    contact: `PROTOCOL: TRANSMISSION ACTIVE

EMAIL: sumitsukhralia.work@gmail.com
GITHUB: github.com/your-github-profile
LINKEDIN: linkedin.com/in/your-linkedin-profile
INSTAGRAM: instagram.com/your-instagram-profile

// NOTE: Direct neural interface currently in beta. Please use standard protocols.`
};


// --- Audio Elements (Optional - Uncomment and provide paths if you have audio files) ---
const audio = {
    // typeSound: new Audio('assets/audio/typewriter.mp3'), // Replace with your path
    // clickSound: new Audio('assets/audio/button_click.mp3'), // Replace with your path
    // backgroundHum: new Audio('assets/audio/system_hum.mp3'), // Replace with your path
    // glitchSound: new Audio('assets/audio/glitch.mp3') // Replace with your path
};

// Set audio properties (only if audio objects are defined)
if (audio.typeSound) audio.typeSound.volume = 0.1;
if (audio.clickSound) audio.clickSound.volume = 0.3;
if (audio.backgroundHum) {
    audio.backgroundHum.volume = 0.05;
    audio.backgroundHum.loop = true;
}
if (audio.glitchSound) audio.glitchSound.volume = 0.2;


function playSound(sound) {
    if (sound) {
        sound.currentTime = 0; // Reset for quick playback
        sound.play().catch(e => console.log("Audio playback failed:", e.message)); // Catch promise rejection
    }
}

function stopSound(sound) {
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    // --- Firebase Initialization ---
    // This part runs first to ensure Firebase is ready for logging.
    if (window.firebaseApp && typeof window.firebaseApp.init === 'function') {
        await window.firebaseApp.init();
        firebaseLogEvent = window.firebaseApp.logEvent;
        console.log('Firebase services available. Logging enabled.');
        firebaseLogEvent('page_load', { page: 'about.html' });
    } else {
        console.error('Firebase SDK not loaded or initialized correctly. Logging disabled.');
        // Fallback logging if Firebase isn't available
        firebaseLogEvent = (eventName, data) => console.log(`[Offline Log] Event: ${eventName}`, data);
    }

    // --- Initial Screen Setup ---
    // All screens start hidden, except the boomContainer (which is black)
    document.querySelectorAll('.system-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Ensure boomContainer is the very first thing active on load
    boomContainer.classList.add('active'); 

    // Initialize Three.js immediately
    initThreeJs(document.getElementById('threeJsCanvasBackground'));
    animateThreeJs(); // Start particle animation loop


    // --- Game Start Sequence on Window Load ---
    // This ensures all HTML, CSS, and Three.js are loaded before starting the animation.
    window.onload = () => {
        // Start the boom effect, then transition to preloader
        boomContainer.classList.add('boom-effect'); // Trigger CSS animation

        // After the boom animation finishes (0.4s), transition to the preloader
        setTimeout(() => {
            boomContainer.classList.remove('active'); // Hide boom screen
            showScreen(preloader); // Show the preloader
            showPreloaderSequence(); // Start preloader typing sequence
            firebaseLogEvent('preloader_started');
        }, 400); // Matches boom-flash duration in CSS
    };


    // --- Screen Management Function ---
    function showScreen(screenToShow, delay = 0) {
        // Hide all screens first (except the canvas)
        document.querySelectorAll('.system-screen').forEach(screen => {
            if (screen !== screenToShow) {
                screen.classList.remove('active');
            }
        });

        setTimeout(() => {
            screenToShow.classList.add('active');
        }, delay);
    }

    // --- Typing Animation Function ---
    async function typeText(element, text, delay = 50) {
        element.textContent = '';
        element.classList.add('typing-animation');
        element.style.opacity = '1';

        // Play typing sound on loop if available (uncomment if using audio)
        // if (audio.typeSound) {
        //     audio.typeSound.loop = true;
        //     playSound(audio.typeSound);
        // }

        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        element.classList.remove('typing-animation');
        // stopSound(audio.typeSound); // Stop typing sound (uncomment if using audio)
        return new Promise(resolve => setTimeout(resolve, 100)); // Small pause after typing
    }


    // --- Preloader Sequence ---
    async function showPreloaderSequence() {
        for (let i = 0; i < preloaderMessages.length; i++) {
            await typeText(preloaderText, preloaderMessages[i], 50);
            await new Promise(r => setTimeout(r, 800)); // Pause between messages
            if (i < preloaderMessages.length - 1) {
                preloaderText.textContent = ''; // Clear for next message
            }
        }
        // Reveal access button
        accessSystemBtn.style.opacity = '1';
        accessSystemBtn.style.pointerEvents = 'auto'; // Make button clickable
        accessSystemBtn.style.transform = 'translateY(0)'; // If you had a translateY animation
        firebaseLogEvent('preloader_complete');
    }

    // --- Three.js Animated Void Setup ---
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

    function stopThreeJsAnimation() {
        if (animateThreeJsId) {
            cancelAnimationFrame(animateThreeJsId);
            animateThreeJsId = null;
        }
    }

    // --- Game Logic Flow ---
    accessSystemBtn.onclick = async () => {
        playSound(audio.clickSound);
        // Attempt to play background hum only after user interaction
        if (audio.backgroundHum) {
            audio.backgroundHum.play().catch(e => console.log("Background hum auto-play blocked:", e.message));
        }

        accessSystemBtn.disabled = true;
        showScreen(loginScreen); // Transition to login screen
        firebaseLogEvent('access_system_clicked');

        await new Promise(r => setTimeout(r, 600)); // Wait for screen transition
        await typeText(welcomeMessage, '// Welcome, Unidentified User. Provide designation to proceed.', 60);

        nameInputContainer.style.opacity = '1';
        nameInputContainer.style.pointerEvents = 'auto';
        nameInputLabel.style.opacity = '1';
        nameInputHint.style.opacity = '1';
        nameInputHint.textContent = 'Enter your handle, pilot...'; // Set hint text
        await typeText(nameInputLabel, 'DESIGNATION:', 60); // Type out label
        visitorNameInput.focus();
        firebaseLogEvent('login_screen_displayed');
    };

    initiateProtocolBtn.onclick = async () => {
        playSound(audio.clickSound);
        const inputName = visitorNameInput.value.trim();
        initiateProtocolBtn.disabled = true;
        statusMessage.style.opacity = '1'; // Show message container

        if (inputName) {
            userName = inputName.toUpperCase(); // Store and capitalize user name
            const successMessage = `DESIGNATION: ${userName} ACCEPTED. ACCESSING SUMIT.EXE PERSONAL DATA LOGS.`;
            await typeText(statusMessage, successMessage, 40);
            firebaseLogEvent('login_success', { user_name: userName });

            // Transition to main hub after success message
            setTimeout(() => {
                showScreen(mainHubScreen);
                firebaseLogEvent('main_hub_entered', { user_name: userName });
            }, 3000); // Delay for user to read status message
        } else {
            const errorMessage = 'ERROR: INPUT INVALID. RETRYING CONNECTION...';
            await typeText(statusMessage, errorMessage, 40);
            firebaseLogEvent('login_failed_no_input');
            initiateProtocolBtn.disabled = false; // Allow retry
            // Clear status message after a short delay for re-attempt
            setTimeout(() => { statusMessage.textContent = ''; statusMessage.style.opacity = '0'; }, 1500);
        }
    };

    // --- Module Button Click Handlers ---
    document.getElementById('moduleProfileBtn').onclick = async () => {
        playSound(audio.clickSound);
        showScreen(document.getElementById('module-profile-screen'));
        await typeText(profileContent, moduleContents.profile, 20); // Faster typing for content
        visitedModules.add('profile');
        checkGameCompletion();
        firebaseLogEvent('module_accessed', { module: 'profile', user_name: userName });
    };

    document.getElementById('moduleProjectsBtn').onclick = async () => {
        playSound(audio.clickSound);
        showScreen(document.getElementById('module-projects-screen'));
        await typeText(projectsContent, moduleContents.projects, 20);
        visitedModules.add('projects');
        checkGameCompletion();
        firebaseLogEvent('module_accessed', { module: 'projects', user_name: userName });
    };

    document.getElementById('moduleHistoryBtn').onclick = async () => {
        playSound(audio.clickSound);
        showScreen(document.getElementById('module-history-screen'));
        await typeText(historyContent, moduleContents.history, 20);
        visitedModules.add('history');
        checkGameCompletion();
        firebaseLogEvent('module_accessed', { module: 'history', user_name: userName });
    };

    document.getElementById('moduleContactBtn').onclick = async () => {
        playSound(audio.clickSound);
        showScreen(document.getElementById('module-contact-screen'));
        await typeText(contactContent, moduleContents.contact, 20);
        visitedModules.add('contact');
        checkGameCompletion();
        firebaseLogEvent('module_accessed', { module: 'contact', user_name: userName });
    };

    // --- Module Back Button Handler ---
    document.querySelectorAll('.module-back-btn').forEach(button => {
