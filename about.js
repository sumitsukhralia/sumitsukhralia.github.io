// Global variables for Firebase (will be populated by the script tag in HTML)
let firebaseDb, firebaseAuth, currentUserId, currentAppId;

document.addEventListener('DOMContentLoaded', async () => {
    // Get references to all necessary DOM elements
    const boomContainer = document.getElementById('boom-container');
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const startBtn = document.getElementById('startBtn');
    const animatedVoidScreen = document.getElementById('animated-void-screen');
    const threeJsCanvas = document.getElementById('threeJsCanvas');
    const quoteText = document.getElementById('quote-text');
    const nameInputContainer = document.getElementById('name-input-container');
    const nameInputLabel = document.getElementById('name-input-label'); // New label element
    const nameInputHint = document.getElementById('name-input-hint'); // New hint element
    const visitorNameInput = document.getElementById('visitorName');
    const submitNameBtn = document.getElementById('submitNameBtn');
    const statusMessage = document.getElementById('status-message');
    const timelinePath = document.getElementById('timeline-path');
    const timelineContainers = document.querySelectorAll('.timeline .container');
    // const aboutContentParagraph = document.getElementById('aboutContentParagraph'); // Removed
    // const backHomeBtn = document.getElementById('backHomeBtn'); // Removed

    console.log('DOM Content Loaded. Initializing game-like experience...');

    // --- Firebase Initialization ---
    if (window.firebaseApp && typeof window.firebaseApp.init === 'function') {
        await window.firebaseApp.init();
        firebaseDb = window.firebaseApp.getDb();
        firebaseAuth = window.firebaseApp.getAuth();
        currentUserId = window.firebaseApp.getUserId();
        currentAppId = window.firebaseApp.getAppId();
        console.log('Firebase services available. User ID:', currentUserId);
    } else {
        console.error('Firebase SDK not loaded or initialized correctly.');
        firebaseDb = null;
        firebaseAuth = null;
        currentUserId = crypto.randomUUID();
        currentAppId = 'local-dev-app';
        console.warn("Firebase initialization failed, proceeding with anonymous user ID:", currentUserId);
    }

    // --- Initial Setup ---
    boomContainer.style.display = 'flex';
    preloader.style.display = 'none';
    animatedVoidScreen.style.display = 'none';
    timelinePath.style.display = 'none';
    document.body.style.overflow = 'hidden';

    quoteText.style.opacity = '0';
    nameInputContainer.style.opacity = '0';
    nameInputLabel.style.opacity = '0'; // Hide new label
    nameInputHint.style.opacity = '0'; // Hide new hint

    timelineContainers.forEach(container => container.classList.remove('visible'));

    // --- Boom Effect ---
    function triggerBoomEffect() {
        boomContainer.classList.add('boom-effect');
        setTimeout(() => {
            boomContainer.style.display = 'none';
            boomContainer.classList.remove('boom-effect');
            showPreloader();
        }, 500);
    }

    // --- Preloader Sequence ---
    function showPreloader() {
        preloader.style.display = 'flex';
        void preloader.offsetWidth;
        preloader.style.opacity = '1';
        startBtn.style.opacity = '1';
        startBtn.style.pointerEvents = 'auto';
    }

    // --- Typing Animation Function ---
    async function typeText(element, text, delay = 70) {
        element.textContent = '';
        element.classList.add('typing-animation');
        element.style.opacity = '1';

        const animationDuration = (text.length * delay) / 1000;
        element.style.animation = `typing ${animationDuration}s steps(${text.length}, end), blink-caret .75s step-end infinite`;

        element.textContent = text; // Set text content immediately for screen readers and robust typing

        return new Promise(resolve => {
            setTimeout(() => {
                element.classList.remove('typing-animation');
                element.style.animation = '';
                resolve();
            }, animationDuration * 1000 + 100);
        });
    }

    // --- Three.js Animated Void ---
    let scene, camera, renderer, particles, particleMaterial, particleCount;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function initThreeJs() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ canvas: threeJsCanvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const color = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
            positions.push(
                (Math.random() * 2 - 1) * 500,
                (Math.random() * 2 - 1) * 500,
                (Math.random() * 2 - 1) * 500
            );
            color.setHSL(Math.random() * 0.2 + 0.6, 0.7, 0.5);
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        particleMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.7
        });

        particles = new THREE.Points(geometry, particleMaterial);
        scene.add(particles);

        camera.position.z = 200;

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
        requestAnimationFrame(animateThreeJs);

        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;

        particles.geometry.attributes.position.array.forEach((_, i) => {
            if (i % 3 === 0) particles.geometry.attributes.position.array[i] += Math.sin(Date.now() * 0.0001 + i) * 0.1;
            if (i % 3 === 1) particles.geometry.attributes.position.array[i] += Math.cos(Date.now() * 0.0001 + i) * 0.1;
        });
        particles.geometry.attributes.position.needsUpdate = true;

        camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // --- Main Game-like Sequence ---
    async function runGameSequence() {
        console.log('Game sequence started.');
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        await new Promise(r => setTimeout(r, 1000));

        preloader.style.display = 'none';
        animatedVoidScreen.style.display = 'block';
        initThreeJs();
        animateThreeJs();

        void animatedVoidScreen.offsetWidth;
        animatedVoidScreen.style.opacity = '1';

        await typeText(quoteText, 'Some truths are not found, but forged.', 70);
        await new Promise(r => setTimeout(r, 1500));

        // Fade in name input container
        nameInputContainer.style.opacity = '1';
        nameInputContainer.style.pointerEvents = 'auto';

        // Type out "Who are you?"
        await typeText(nameInputLabel, 'Who are you?', 70);
        await new Promise(r => setTimeout(r, 500)); // Pause after typing label

        // Show and fade out hint
        nameInputHint.textContent = 'A designation for access...'; // Updated hint text
        nameInputHint.style.opacity = '1';
        await new Promise(r => setTimeout(r, 2000)); // Display hint for 2 seconds
        nameInputHint.style.opacity = '0';
        await new Promise(r => setTimeout(r, 500)); // Wait for hint to fade

        visitorNameInput.focus();
        console.log('Animated void, quote, and name input shown.');
    }

    // --- Timeline Autoscroll Logic ---
    let autoscrollInterval;
    let isUserScrolling = false;
    const scrollSpeed = 3; // Pixels per interval - Made 1.5x faster (from 2 to 3)
    const scrollIntervalTime = 30; // Milliseconds - Kept same for smoother steps

    function startAutoscroll() {
        if (autoscrollInterval) clearInterval(autoscrollInterval);

        autoscrollInterval = setInterval(() => {
            if (!isUserScrolling) {
                timelinePath.scrollBy(0, scrollSpeed);
            }
            // Check if reached end (within a small buffer)
            if (timelinePath.scrollTop + timelinePath.clientHeight >= timelinePath.scrollHeight - 10) {
                clearInterval(autoscrollInterval);
                console.log('Timeline end reached. Triggering boom effect.');
                triggerTimelineEndBoom();
            }
        }, scrollIntervalTime);
    }

    function stopAutoscroll() {
        clearInterval(autoscrollInterval);
    }

    function handleTimelineScroll() {
        isUserScrolling = true;
        clearTimeout(timelinePath.scrollTimeout);
        timelinePath.scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 200);
    }

    // --- Timeline End Boom Effect & Redirect ---
    function triggerTimelineEndBoom() {
        const timelineBoomOverlay = document.createElement('div');
        timelineBoomOverlay.id = 'timeline-boom-overlay';
        timelineBoomOverlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: #000;
            z-index: 10001;
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 3rem;
            text-shadow: 0 0 20px rgba(255,255,255,0.8);
            animation: timeline-boom-flash 0.8s ease-out forwards;
        `;
        document.body.appendChild(timelineBoomOverlay);

        // After boom, redirect to final-story.html
        setTimeout(() => {
            window.location.href = 'final-story.html';
        }, 800); // Match timeline-boom-flash animation duration
    }

    // --- Event Listeners ---
    window.onload = triggerBoomEffect;

    startBtn.onclick = runGameSequence;

    submitNameBtn.onclick = async () => {
        const visitorName = visitorNameInput.value.trim();
        if (visitorName) {
            statusMessage.style.opacity = '1';
            statusMessage.textContent = 'Processing...';

            if (firebaseDb) {
                try {
                    const visitorsCollectionRef = collection(firebaseDb, `artifacts/${currentAppId}/public/data/visitors`);
                    await addDoc(visitorsCollectionRef, {
                        name: visitorName,
                        userId: currentUserId,
                        timestamp: new Date()
                    });
                    statusMessage.textContent = 'Access Granted. Welcome.';
                    console.log('Visitor name submitted to Firestore:', visitorName);

                    // Transition to timeline
                    setTimeout(() => {
                        animatedVoidScreen.style.opacity = '0';
                        animatedVoidScreen.style.pointerEvents = 'none';
                        setTimeout(() => {
                            animatedVoidScreen.style.display = 'none';
                            timelinePath.style.display = 'block';
                            void timelinePath.offsetWidth;
                            timelinePath.style.opacity = '1';
                            document.body.style.overflowY = 'auto';
                            startAutoscroll();
                            console.log('Transitioned to timeline path.');
                        }, 1000);
                    }, 1500);
                } catch (error) {
                    console.error("Error submitting name to Firestore:", error);
                    statusMessage.textContent = 'Error. Try again.';
                    setTimeout(() => {
                        animatedVoidScreen.style.opacity = '0';
                        animatedVoidScreen.style.pointerEvents = 'none';
                        setTimeout(() => {
                            animatedVoidScreen.style.display = 'none';
                            timelinePath.style.display = 'block';
                            void timelinePath.offsetWidth;
                            timelinePath.style.opacity = '1';
                            document.body.style.overflowY = 'auto';
                            startAutoscroll();
                            console.log('Transitioned to timeline path (with Firestore error).');
                        }, 1000);
                    }, 1500);
                }
            } else {
                statusMessage.textContent = 'Access Granted (offline). Welcome.';
                console.warn('Firestore not available, name not stored.');
                setTimeout(() => {
                    animatedVoidScreen.style.opacity = '0';
                    animatedVoidScreen.style.pointerEvents = 'none';
                    setTimeout(() => {
                        animatedVoidScreen.style.display = 'none';
                        timelinePath.style.display = 'block';
                        void timelinePath.offsetWidth;
                        timelinePath.style.opacity = '1';
                        document.body.style.overflowY = 'auto';
                        startAutoscroll();
                        console.log('Transitioned to timeline path (Firebase not initialized).');
                    }, 1000);
                }, 1500);
            }
        } else {
            statusMessage.style.opacity = '1';
            statusMessage.textContent = 'Please enter your designation.';
        }
    };

    timelinePath.addEventListener('scroll', handleTimelineScroll);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    timelineContainers.forEach(container => {
        observer.observe(container);
    });
});
