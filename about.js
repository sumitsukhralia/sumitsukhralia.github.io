document.addEventListener('DOMContentLoaded', () => {
    // Get references to all necessary DOM elements
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const startBtn = document.getElementById('startBtn');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('aboutVideo');
    const videoPlayBtn = document.getElementById('videoPlayBtn'); // Get the new play button
    const aboutContent = document.getElementById('aboutContent');
    const aboutParagraph = aboutContent.querySelector('p'); // Get the paragraph element within aboutContent
    const backHome = document.getElementById('backHome');

    // --- Initial Setup ---
    // Ensure preloader is visible and other sections are hidden
    preloader.style.display = 'flex'; // Use 'flex' as per CSS for centering
    videoContainer.style.display = 'none';
    aboutContent.style.display = 'none';
    document.body.style.overflow = 'hidden'; // Prevent scrolling until the final content is shown
    videoPlayBtn.style.display = 'none'; // Ensure video play button is hidden initially

    // Function to update the preloader text
    function showText(text) {
        preloaderText.innerHTML = text; // Use innerHTML to allow for HTML tags like <em> or <br>
    }

    // --- Main Preloader Sequence Function ---
    async function runPreloader() {
        startBtn.style.display = 'none'; // Hide the "LET'S BEGIN" button once it's clicked

        // First message: Sound instruction
        showText('Make sure you have turned on sound to 70% for best experience.');
        await new Promise(r => setTimeout(r, 2000)); // Wait for 2 seconds

        // Second message: Famous quote with background change
        showText('“Life is a race. If you don’t run fast, you’ll be like a broken anda.”');
        preloader.classList.add('quote-bg'); // Add class to change background image
        await new Promise(r => setTimeout(r, 4000)); // Wait for 4 seconds

        // Transition to video container, show play button
        preloader.style.display = 'none'; // Hide the preloader
        videoContainer.style.display = 'block'; // Show the video container
        videoPlayBtn.style.display = 'block'; // Show the new play button
    }

    // --- Event Listener for the Start Button (on preloader) ---
    startBtn.onclick = () => {
        runPreloader(); // Start the preloader sequence when button is clicked
    };

    // --- Event Listener for the NEW Video Play Button ---
    videoPlayBtn.onclick = () => {
        videoPlayBtn.style.display = 'none'; // Hide the play button
        video.volume = 0.7; // Set video volume (now allowed due to direct user click)
        video.play().catch(err => {
            console.error('Video play failed:', err);
            // Fallback: If for some reason play still fails, hide video and show about content
            videoContainer.style.display = 'none';
            aboutContent.style.display = 'flex';
            document.body.style.overflow = 'auto';
            // Also generate text immediately if video fails to play
            generateAboutParagraph();
        });
    };

    // --- Event Listener for Video End ---
    video.onended = () => {
        videoContainer.style.display = 'none'; // Hide the video container
        aboutContent.style.display = 'flex'; // Show the about content (using flex for centering)
        document.body.style.overflow = 'auto'; // Allow scrolling on the page now
        generateAboutParagraph(); // Generate the "About Me" paragraph
    };

    // --- Function to Generate About Paragraph (moved to its own function for reusability) ---
    async function generateAboutParagraph() {
        const prompt = "Generate a short, engaging paragraph about someone's journey of self-discovery and growth, exactly 30 words long. Focus on themes of overcoming challenges and finding purpose.";
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
                aboutParagraph.textContent = generatedText; // Update the paragraph content
            } else {
                console.error("LLM response structure unexpected:", result);
                aboutParagraph.textContent = "A journey of self-discovery unfolds, embracing challenges and celebrating growth. Each step forward reveals new strengths, paving a path towards a purposeful and fulfilling life, rich with experiences and profound understanding.";
            }
        } catch (error) {
            console.error("Error fetching LLM content:", error);
            aboutParagraph.textContent = "A journey of self-discovery unfolds, embracing challenges and celebrating growth. Each step forward reveals new strengths, paving a path towards a purposeful and fulfilling life, rich with experiences and profound understanding.";
        }
    }

    // --- Event Listener for Back Home Button ---
    if (backHome) {
        backHome.onclick = () => {
            window.location.href = 'index.html'; // Navigate back to the main page
        };
    }
});
