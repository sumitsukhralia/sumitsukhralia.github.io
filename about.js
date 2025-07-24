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
    const visitorNameInput = document.getElementById('visitorName');
    const submitNameBtn = document.getElementById('submitNameBtn');
    const statusMessage = document.getElementById('status-message');
    const timelinePath = document.getElementById('timeline-path');
    const timelineContainers = document.querySelectorAll('.timeline .container');
    const aboutContentParagraph = document.getElementById('aboutContentParagraph');
    const backHomeBtn = document.getElementById('backHomeBtn');

    console.log('DOM Content Loaded. Initializing game-like experience...');

    // --- Firebase Initialization ---
    // Wait for the Firebase SDK to be loaded and exposed globally by the HTML script tag
    if (window.firebaseApp && typeof window.firebaseApp.init === 'function') {
        await window.firebaseApp.init();
        firebaseDb = window.firebaseApp.getDb();
        firebaseAuth = window.firebaseApp.getAuth();
        currentUserId = window.firebaseApp.getUserId();
        currentAppId = window.firebaseApp.getAppId();
        console.log('Firebase services available.');
    } else {
        console.error('Firebase SDK not loaded or initialized correctly.');
        // Fallback for local testing without Canvas Firebase setup
        firebaseDb = null;
        firebaseAuth = null;
        currentUserId = crypto.randomUUID();
        currentAppId = 'local-dev-app';
    }


    // --- Initial Setup ---
    boomContainer.style.display = 'flex'; // Show boom container initially
    preloader.style.display = 'none';
    animatedVoidScreen.style.display = 'none';
    timelinePath.style.display = 'none';
    document.body.style.overflow = 'hidden'; // Prevent scrolling initially

    // Hide overlay elements on animated void screen
    quoteText.style.opacity = '0';
    nameInputContainer.style.opacity = '0';

    // Hide all timeline items initially
    timelineContainers.forEach(container => container.classList.remove('visible'));

    // --- Boom Effect ---
    function triggerBoomEffect() {
        boomContainer.classList.add('boom-effect');
        setTimeout(() => {
            boomContainer.style.display = 'none';
            boomContainer.classList.remove('boom-effect');
            showPreloader(); // Proceed to preloader after boom
        }, 500); // Match boom-flash animation duration
    }

    // --- Preloader Sequence ---
    function showPreloader() {
        preloader.style.display = 'flex';
        // Force reflow for transition
        void preloader.offsetWidth;
        preloader.style.opacity = '1';
        startBtn.style.opacity = '1';
        startBtn.style.pointerEvents = 'auto'; // Enable button
    }

    // --- Typing Animation Function ---
    async function typeText(element, text, delay = 70) {
        element.textContent = '';
        element.classList.add('typing-animation');
        element.style.opacity = '1';

        const animationDuration = (text.length * delay) / 1000;
        element.style.animation = `typing ${animationDuration}s steps(${text.length}, end), blink-caret .75s step-end infinite`;

        // Manually set text content for immediate rendering and accessibility
        element.textContent = text;

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
        renderer = new THREE.WebGLRenderer({ canvas: threeJsCanvas, alpha: true }); // alpha: true for transparent background
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // For sharper rendering

        // Particle System
        particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const color = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
            // Position particles randomly in a cube
            positions.push(
                (Math.random() * 2 - 1) * 500, // x
                (Math.random() * 2 - 1) * 500, // y
                (Math.random() * 2 - 1) * 500  // z
            );
            // Assign a random color, leaning towards blues/purples for mystery
            color.setHSL(Math.random() * 0.2 + 0.6, 0.7, 0.5); // Hue between blue and purple
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        particleMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            blending: THREE.AdditiveBlending, // For glowing effect
            transparent: true,
            opacity: 0.7
        });

        particles = new THREE.Points(geometry, particleMaterial);
        scene.add(particles);

        camera.position.z = 200;

        // Add event listeners for mouse interaction
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

        // Rotate particles slowly
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;

        // Move particles slightly
        particles.geometry.attributes.position.array.forEach((_, i) => {
            if (i % 3 === 0) particles.geometry.attributes.position.array[i] += Math.sin(Date.now() * 0.0001 + i) * 0.1;
            if (i % 3 === 1) particles.geometry.attributes.position.array[i] += Math.cos(Date.now() * 0.0001 + i) * 0.1;
        });
        particles.geometry.attributes.position.needsUpdate = true;


        // Camera movement based on mouse/touch
        camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // --- Main Game-like Sequence ---
    async function runGameSequence() {
        console.log('Game sequence started.');
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none'; // Disable clicks on preloader
        await new Promise(r => setTimeout(r, 1000)); // Wait for preloader to fade

        preloader.style.display = 'none';
        animatedVoidScreen.style.display = 'block'; // Show animated void screen
        initThreeJs(); // Initialize Three.js
        animateThreeJs(); // Start Three.js animation loop

        // Force reflow for transition
        void animatedVoidScreen.offsetWidth;
        animatedVoidScreen.style.opacity = '1';

        // Type out the quote
        await typeText(quoteText, 'Some truths are not found, but forged.', 70);
        await new Promise(r => setTimeout(r, 1500)); // Pause after quote

        // Fade in name input container
        nameInputContainer.style.opacity = '1';
        nameInputContainer.style.pointerEvents = 'auto'; // Enable input/button
        visitorNameInput.focus(); // Focus on input field
        console.log('Animated void and name input shown.');
    }

    // --- Timeline Autoscroll Logic ---
    let autoscrollInterval;
    let isUserScrolling = false;
    const scrollSpeed = 1; // Pixels per interval
    const scrollIntervalTime = 50; // Milliseconds

    function startAutoscroll() {
        if (autoscrollInterval) clearInterval(autoscrollInterval); // Clear any existing interval

        autoscrollInterval = setInterval(() => {
            if (!isUserScrolling) {
                timelinePath.scrollBy(0, scrollSpeed);
            }
            // Check if reached end
            if (timelinePath.scrollTop + timelinePath.clientHeight >= timelinePath.scrollHeight - 5) { // -5 for buffer
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
        // Reset user scrolling flag after a short delay
        clearTimeout(timelinePath.scrollTimeout);
        timelinePath.scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 200); // Adjust this delay as needed
    }

    // --- Timeline End Boom Effect ---
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

        // After boom, reveal final content and remove overlay
        setTimeout(() => {
            timelineBoomOverlay.remove();
            // Ensure the final story paragraph is visible and generated
            aboutContentParagraph.style.opacity = '1';
            aboutContentParagraph.style.transform = 'translateY(0)';
            generateAboutParagraph();
            backHomeBtn.style.opacity = '1';
            backHomeBtn.style.pointerEvents = 'auto';
        }, 800); // Match timeline-boom-flash animation duration
    }

    // --- Function to Generate About Paragraph (20 words) ---
    async function generateAboutParagraph() {
        if (aboutContentParagraph.textContent !== 'Loading your deeper story...') {
            return; // Already generated or being generated
        }
        console.log('Generating final about paragraph...');
        const prompt = "Generate a concise, mysterious 20-word paragraph about a mind's journey from an unchosen biological path to a consuming passion for computer science, driven by a stoic mission to reshape unseen human systems.";
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas will provide it at runtime
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const generatedText = result.candidates[0].content.parts[0].text;
                aboutContentParagraph.textContent = generatedText;
                console.log('About paragraph generated successfully.');
            } else {
                console.error("LLM response structure unexpected:", result);
                aboutContentParagraph.textContent = "A mind diverged from biology to code, driven by a stoic quest to reshape unseen human systems. A silent mission, forged in curiosity, now unfolds."; // Fallback
            }
        } catch (error) {
            console.error("Error fetching LLM content:", error);
            aboutContentParagraph.textContent = "A mind diverged from biology to code, driven by a stoic quest to reshape unseen human systems. A silent mission, forged in curiosity, now unfolds."; // Fallback
        }
    }

    // --- Event Listeners ---
    // Initial boom on page load
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
                        userId: currentUserId, // Store user ID
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
                            void timelinePath.offsetWidth; // Force reflow
                            timelinePath.style.opacity = '1';
                            document.body.style.overflowY = 'auto'; // Enable scrolling for timeline
                            startAutoscroll(); // Start autoscroll
                            console.log('Transitioned to timeline path.');
                        }, 1000); // Match fade out duration
                    }, 1500); // Show status message for a bit
                } catch (error) {
                    console.error("Error submitting name to Firestore:", error);
                    statusMessage.textContent = 'Error. Try again.';
                    // Fallback to timeline even on error
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
                // Fallback for when Firebase is not initialized
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

    // Event listener for timeline scroll to detect manual scrolling
    timelinePath.addEventListener('scroll', handleTimelineScroll);

    // Observer to reveal timeline items as they enter view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: remove 'visible' class if item scrolls out of view
                // entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the item is visible

    timelineContainers.forEach(container => {
        observer.observe(container);
    });

    backHomeBtn.onclick = () => {
        console.log('Back Home button clicked.');
        window.location.href = 'index.html';
    };
});
