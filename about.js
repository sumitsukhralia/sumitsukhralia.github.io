document.addEventListener('DOMContentLoaded', () => {
    // Get references to all necessary DOM elements
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const startBtn = document.getElementById('startBtn');
    const choiceScreen = document.getElementById('choice-screen');
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

    console.log('DOM Content Loaded. Initializing merged cinematic experience...');

    // --- Initial Setup ---
    preloader.style.display = 'flex';
    choiceScreen.style.display = 'none';
    matrixPath.style.display = 'none';
    unpluggedPath.style.display = 'none';
    document.body.style.overflow = 'hidden'; // Prevent scrolling initially

    // Initially hide all layer content for fade-in effect
    layerContents.forEach(content => content.classList.add('hidden'));

    // Function to update the preloader text
    function showText(text) {
        preloaderText.innerHTML = text;
    }

    // --- Main Cinematic Preloader Sequence ---
    async function runCinematicSequence() {
        console.log('Cinematic sequence started.');
        startBtn.style.opacity = '0';
        startBtn.style.pointerEvents = 'none';
        await new Promise(r => setTimeout(r, 500));

        showText('A journey began. A path diverged. Est. 2005.');
        preloader.classList.add('cinematic-bg'); // Apply cinematic background
        await new Promise(r => setTimeout(r, 4000));

        // Fade out preloader and show choice screen
        preloader.style.opacity = '0';
        await new Promise(r => setTimeout(r, 1000));
        preloader.style.display = 'none';

        choiceScreen.style.display = 'flex';
        // Force reflow to ensure transition works
        void choiceScreen.offsetWidth;
        choiceScreen.style.opacity = '1';
        console.log('Preloader hidden, choice screen shown.');
    }

    // --- Handle Path Selection ---
    function activatePath(pathElement) {
        choiceScreen.style.opacity = '0';
        choiceScreen.style.pointerEvents = 'none';
        setTimeout(() => {
            choiceScreen.style.display = 'none';
            pathElement.style.display = 'block'; // Show the selected path
            document.body.style.overflowY = 'auto'; // Enable scrolling for the path
            // Reset scroll position to top for the new path
            pathElement.scrollTop = 0;
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
        const currentPath = matrixPath.style.display === 'block' ? matrixPath : unpluggedPath;
        if (currentPath.style.display === 'none') return; // Only run if a path is active

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

        // Check if user has scrolled to the final 'aboutContent' section
        if (currentPath.id === 'unplugged-path') {
            const aboutContentSection = document.getElementById('aboutContent');
            if (aboutContentSection) {
                const aboutContentRect = aboutContentSection.getBoundingClientRect();
                // If aboutContent is mostly in view
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
        const prompt = "Generate a short, engaging paragraph about someone's journey of self-discovery and growth, exactly 30 words long. Focus on themes of overcoming challenges and finding purpose, and hint at breaking free from societal expectations.";
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
                aboutParagraph.textContent = "A journey of self-discovery unfolds, embracing challenges and celebrating growth. Each step forward reveals new strengths, paving a path towards a purposeful and fulfilling life, rich with experiences and profound understanding, breaking free from the expected.";
            }
        } catch (error) {
            console.error("Error fetching LLM content:", error);
            aboutParagraph.textContent = "A journey of self-discovery unfolds, embracing challenges and celebrating growth. Each step forward reveals new strengths, paving a path towards a purposeful and fulfilling life, rich with experiences and profound understanding, breaking free from the expected.";
        }
    }

    // --- Event Listeners ---
    startBtn.onclick = runCinematicSequence;
    matrixPathBtn.onclick = () => activatePath(matrixPath);
    unpluggedPathBtn.onclick = () => activatePath(unpluggedPath);

    unplugFromMatrixBtn.onclick = () => {
        console.log('Unplug from Matrix button clicked.');
        matrixPath.style.display = 'none';
        unpluggedPath.style.display = 'block';
        unpluggedPath.scrollTop = 0; // Scroll to top of unplugged path
        document.body.style.overflowY = 'auto'; // Ensure scrolling is enabled
        // Trigger initial reveal for the first visible layer of unplugged path
        const firstLayerContent = unpluggedPath.querySelector('.layer-content');
        if (firstLayerContent) {
            firstLayerContent.classList.remove('hidden');
        }
    };

    // Attach scroll event listener to the window
    window.addEventListener('scroll', handleScrollAnimations);
    // Also attach to the specific content paths, as they have overflow-y: auto
    matrixPath.addEventListener('scroll', handleScrollAnimations);
    unpluggedPath.addEventListener('scroll', handleScrollAnimations);


    backHome.onclick = () => {
        console.log('Back Home button clicked.');
        window.location.href = 'index.html';
    };

    // Initial check for scroll animations in case content is already visible on load
    handleScrollAnimations();
});
