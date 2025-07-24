document.addEventListener('DOMContentLoaded', () => {
    // Get references to all necessary DOM elements
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const startBtn = document.getElementById('startBtn');
    const choiceScreen = document.getElementById('choice-screen');
    const choiceText = choiceScreen.querySelector('.choice-text'); // Get choice screen text element
    const choiceButtonsContainer = choiceScreen.querySelector('.choice-buttons'); // Get choice buttons container
    const matrixPathBtn = document.getElementById('matrixPathBtn');
    const unpluggedPathBtn = document.getElementById('unpluggedPathBtn');
    const matrixPath = document.getElementById('matrix-path');
    const unpluggedPath = document.getElementById('unplugged-path');
    const unplugFromMatrixBtn = document.getElementById('unplugFromMatrixBtn');
    const aboutContent = document.getElementById('aboutContent');
    const aboutParagraph = aboutContent.querySelector('p');
    const backHome = document.getElementById('backHome');

    // Select all layer content elements for scroll animations
    const layerContents = document.querySelectorAll('.layer-content');

    console.log('DOM Content Loaded. Initializing mysterious cinematic experience...');

    // --- Initial Setup ---
    preloader.style.display = 'flex';
    choiceScreen.style.display = 'none';
    matrixPath.style.display = 'none';
    unpluggedPath.style.display = 'none';
    document.body.style.overflow = 'hidden'; // Prevent scrolling initially

    // Initially hide all layer content for fade-in effect
    layerContents.forEach(content => content.classList.add('hidden'));

    // --- Typing Animation Function ---
    async function typeText(element, text, delay = 70) {
        element.textContent = ''; // Clear existing text
        element.classList.add('typing-animation'); // Add typing animation class
        element.style.opacity = '1'; // Make sure element is visible

        // Calculate animation duration based on text length and delay
        const animationDuration = (text.length * delay) / 1000; // in seconds
        element.style.animation = `typing ${animationDuration}s steps(${text.length}, end), blink-caret .75s step-end infinite`;

        // Manually type text for browsers that don't fully support CSS typing on content change
        // This also ensures the text is fully present for screen readers immediately
        element.textContent = text;

        return new Promise(resolve => {
            // Wait for the animation to complete
            setTimeout(() => {
                element.classList.remove('typing-animation'); // Remove typing animation class
                element.style.animation = ''; // Clear animation property
                resolve();
            }, animationDuration * 1000 + 100); // Add a small buffer
        });
    }


    // --- Main Cinematic Preloader Sequence ---
    async function runCinematicSequence() {
        console.log('Cinematic sequence started.');
        startBtn.style.opacity = '0';
        startBtn.style.pointerEvents = 'none';
        await new Promise(r => setTimeout(r, 500)); // Wait for button to fade

        // Type out the cinematic phrase
        await typeText(preloaderText, 'A journey began. A path diverged. Est. 2005.', 70); // Adjust delay as needed
        await new Promise(r => setTimeout(r, 2000)); // Pause after typing

        // Fade out preloader and show choice screen
        preloader.style.opacity = '0';
        await new Promise(r => setTimeout(r, 1000)); // Wait for preloader to fade out
        preloader.style.display = 'none';

        choiceScreen.style.display = 'flex';
        void choiceScreen.offsetWidth; // Force reflow
        choiceScreen.style.opacity = '1';

        // Type out choice screen text
        await typeText(choiceText, 'Which reality will you explore?', 70);
        choiceButtonsContainer.style.opacity = '1'; // Fade in buttons after text types
        console.log('Preloader hidden, choice screen shown, text typed.');
    }

    // --- Handle Path Selection ---
    function activatePath(pathElement) {
        choiceScreen.style.opacity = '0';
        choiceScreen.style.pointerEvents = 'none';
        setTimeout(() => {
            choiceScreen.style.display = 'none';
            pathElement.style.display = 'block'; // Show the selected path
            document.body.style.overflowY = 'auto'; // Enable scrolling for the path
            pathElement.scrollTop = 0; // Reset scroll position to top for the new path
            console.log('Path activated:', pathElement.id);

            // Trigger initial reveal for the first visible layer
            const firstLayerContent = pathElement.querySelector('.layer-content');
            if (firstLayerContent) {
                firstLayerContent.classList.remove('hidden');
            }
        }, 500); // Match choice screen fade-out time
    }

    // --- Scroll Animation Logic ---
    function handleScrollAnimations() {
        // Determine which path is currently active
        const currentPath = matrixPath.style.display === 'block' ? matrixPath : (unpluggedPath.style.display === 'block' ? unpluggedPath : null);

        if (!currentPath) return; // Only run if a path is active

        const scrollPosition = currentPath.scrollTop + window.innerHeight * 0.8; // Trigger point 80% down the viewport

        currentPath.querySelectorAll('.layer-content').forEach(content => {
            const layer = content.closest('.layer');
            if (!layer) return;

            const layerTop = layer.offsetTop;
            const layerBottom = layerTop + layer.offsetHeight;

            // Check if the layer is in the viewport (or approaching)
            if (scrollPosition > layerTop && currentPath.scrollTop < layerBottom) {
                content.classList.remove('hidden');
            } else {
                // Optionally hide content that's far out of view to reset animations on re-scroll
                // content.classList.add('hidden');
            }
        });

        // Check if user has scrolled to the final 'aboutContent' section on unplugged path
        if (currentPath.id === 'unplugged-path') {
            const aboutContentSection = document.getElementById('aboutContent');
            if (aboutContentSection) {
                const aboutContentRect = aboutContentSection.getBoundingClientRect();
                // If aboutContent is mostly in view and paragraph not yet generated
                if (aboutContentRect.top < window.innerHeight * 0.5 && aboutContentRect.bottom > 0 && aboutParagraph.textContent === 'Loading your deeper story...') {
                    generateAboutParagraph();
                }
            }
        }
    }

    // --- Function to Generate About Paragraph ---
    async function generateAboutParagraph() {
        if (aboutParagraph.textContent !== 'Loading your deeper story...') {
            // Already generated or being generated
            return;
        }
        console.log('Generating about paragraph...');
        // UPDATED AI PROMPT for stoic and expanded themes
        const prompt = "Generate a 30-word paragraph about a mind's journey from an unchosen path (biochemistry) to a consuming passion (computer science), driven by a mysterious mission to understand and reshape unseen human systems through unconventional methods, relentless curiosity, and a stoic pursuit of inner clarity and control.";
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Leave as empty string; Canvas will provide it at runtime
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
                aboutParagraph.textContent = generatedText;
                console.log('About paragraph generated successfully.');
            } else {
                console.error("LLM response structure unexpected:", result);
                aboutParagraph.textContent = "A profound journey from biological intricacies to digital architecture, driven by an enigmatic quest to decode and influence the subtle currents of human interaction. A silent mission, fueled by insatiable curiosity, embracing stoic clarity."; // Fallback with stoic hint
            }
        } catch (error) {
            console.error("Error fetching LLM content:", error);
            aboutParagraph.textContent = "A profound journey from biological intricacies to digital architecture, driven by an enigmatic quest to decode and influence the subtle currents of human interaction. A silent mission, fueled by insatiable curiosity, embracing stoic clarity."; // Fallback
        }
    }

    // --- Event Listeners ---
    startBtn.onclick = runCinematicSequence;
    matrixPathBtn.onclick = () => activatePath(matrixPath);
    unpluggedPathBtn.onclick = () => activatePath(unpluggedPath);

    unplugFromMatrixBtn.onclick = () => {
        console.log('Unplug from Matrix button clicked. Initiating intense glitch and transition.');
        // Apply intense glitch effect before transition
        document.body.style.filter = 'hue-rotate(90deg) saturate(200%) invert(100%)';
        document.body.style.transition = 'filter 0.2s ease-in-out';

        setTimeout(() => {
            document.body.style.filter = 'none'; // Reset filter
            document.body.style.transition = 'none'; // Remove transition for immediate display change

            matrixPath.style.display = 'none';
            unpluggedPath.style.display = 'block';
            unpluggedPath.scrollTop = 0; // Scroll to top of unplugged path
            document.body.style.overflowY = 'auto'; // Ensure scrolling is enabled

            // Trigger initial reveal for the first visible layer of unplugged path
            const firstLayerContent = unpluggedPath.querySelector('.layer-content');
            if (firstLayerContent) {
                firstLayerContent.classList.remove('hidden');
            }
        }, 300); // Short delay for glitch effect
    };

    // Attach scroll event listener to the window and content paths
    window.addEventListener('scroll', handleScrollAnimations);
    matrixPath.addEventListener('scroll', handleScrollAnimations);
    unpluggedPath.addEventListener('scroll', handleScrollAnimations);

    backHome.onclick = () => {
        console.log('Back Home button clicked.');
        window.location.href = 'index.html';
    };

    // Initial check for scroll animations in case content is already visible on load
    handleScrollAnimations();
});
