// --- GLOBAL VARIABLES AND HELPER FUNCTIONS ---

// For preloader greetings
const greetings = [
    "Hello!",
    "नमस्ते!", // Namaste in Hindi
    "Bonjour!",
    "Hola!",
    "こんにちは！", // Konnichiwa in Japanese
    "안녕하세요!", // Annyeonghaseyo in Korean
    "مرحبا!",     // Marhaba in Arabic
    "Olá!",
    "Hallo!"
];

let currentMultiGreetingIndex = 0;
let greetingCycleCount = 0;
const multiGreetingFadeDuration = 600; // Time for each greeting to fade in/out
const multiGreetingVisibleDuration = 1000; // How long each greeting is fully visible (1 second)
const multiGreetingTotalCycleTime = multiGreetingFadeDuration + multiGreetingVisibleDuration + multiGreetingFadeDuration;
const maxGreetingCycles = greetings.length * 2; // Cycle through greetings twice
let greetingIntervalId; // To store the interval ID for clearing

// For typing effect (name and skill)
const nameText = "Sumit Sukhralia";
const skillText = "MERN Stack Developer | AI Enthusiast";
const typingSpeed = 100; // milliseconds per character
const deletingSpeed = 50; // milliseconds per character
const delayBetweenTypingStages = 1000; // milliseconds before typing/deleting next

// For terminal text animation
const terminalLines = [
    "user@SUMIT: ~ whoami",
    "19 • Beyond Curriculum",
    "From Biochem to Backend",
    "404: Limit Not Found",
    "Location: Faridkot, Punjab, India" // Your location
];
let currentTerminalLineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let terminalAnimationTimeoutId;

// For AI tease messages
const aiTeaseMessages = [
    "Compiling insights...",
    "Neural pathways syncing...",
    "Awakening algorithms...",
    "Querying the cosmos...",
    "Data streams optimizing...",
    "Consciousness initializing..."
];
let currentAiTeaseIndex = 0;
let aiTeaseIntervalId;
const aiTeaseDuration = 2500; // How long each AI tease message shows

// For dynamic quotes
const quotes = [
    "\"Ctrl your mind. Alt your path. Del the limits.\"",
    "\"The only way to do great work is to love what you do.\" - Steve Jobs",
    "\"Innovation distinguishes between a leader and a follower.\" - Steve Jobs",
    "\"The future belongs to those who believe in the beauty of their dreams.\" - Eleanor Roosevelt",
    "\"Stay hungry, stay foolish.\" - Steve Jobs",
    "\"Code is like humor. When you have to explain it, it’s bad.\" - Cory House"
    // You can add all your other quotes here
];
let currentQuoteIndex = 0;

// Dark mode preference
let userPrefersDarkMode = false;


// --- UTILITY FUNCTIONS ---

/**
 * Types out a given text into an element.
 * @param {HTMLElement} element The HTML element to type into.
 * @param {string} text The text to type.
 * @param {number} speed Typing speed in milliseconds per character.
 * @param {function} [callback] An optional function to call after typing is complete.
 */
function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = ''; // Clear existing text
    element.classList.add('typing-cursor'); // Add cursor for typing effect
    element.style.opacity = '1'; // Make sure element is visible

    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else {
            element.classList.remove('typing-cursor'); // Remove cursor after typing
            if (callback) {
                setTimeout(callback, delayBetweenTypingStages); // Call callback after a delay
            }
        }
    }
    typeChar();
}

/**
 * Animates the typing and deleting of lines in the terminal.
 */
function animateTerminalText() {
    const terminalElement = document.getElementById('terminal');
    if (!terminalElement) {
        console.error("Terminal element not found for animation.");
        return;
    }

    const fullText = terminalLines.join('\n'); // All lines combined for animation
    const currentLine = terminalLines[currentTerminalLineIndex];

    terminalElement.classList.add('typing-cursor'); // Add cursor to terminal

    if (!isDeleting) {
        // Typing phase
        terminalElement.textContent = terminalLines.slice(0, currentTerminalLineIndex).join('\n');
        if (currentTerminalLineIndex > 0) {
            terminalElement.textContent += '\n'; // Add newline for subsequent lines
        }
        terminalElement.textContent += currentLine.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex > currentLine.length) {
            isDeleting = true;
            terminalAnimationTimeoutId = setTimeout(animateTerminalText, delayBetweenTypingStages); // Pause after typing line
        } else {
            terminalAnimationTimeoutId = setTimeout(animateTerminalText, typingSpeed);
        }
    } else {
        // Deleting phase (only delete the current line)
        terminalElement.textContent = terminalLines.slice(0, currentTerminalLineIndex).join('\n');
        if (currentTerminalLineIndex > 0) {
            terminalElement.textContent += '\n';
        }
        terminalElement.textContent += currentLine.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex < 0) {
            isDeleting = false;
            currentTerminalLineIndex = (currentTerminalLineIndex + 1) % terminalLines.length; // Move to next line
            terminalAnimationTimeoutId = setTimeout(animateTerminalText, typingSpeed); // Pause before typing next line
        } else {
            terminalAnimationTimeoutId = setTimeout(animateTerminalText, deletingSpeed);
        }
    }
}


/**
 * Cycles through multi-language greetings on the preloader screen.
 */
function cycleMultiGreetingsOnPreloader() {
    const animatedGreetingElement = document.getElementById('animated-greeting');
    if (!animatedGreetingElement) {
        console.warn("Multi-language greeting element not found for cycling.");
        return;
    }

    if (greetingCycleCount >= maxGreetingCycles) {
        clearInterval(greetingIntervalId); // Stop future cycles
        return;
    }

    // 1. Fade out current greeting (if any is visible)
    animatedGreetingElement.classList.remove('greeting-fade-in');
    animatedGreetingElement.classList.add('greeting-fade-out');

    // 2. Wait for the fade-out to complete, then change text and fade in the next
    setTimeout(() => {
        // Increment index and update text
        currentMultiGreetingIndex = (currentMultiGreetingIndex + 1) % greetings.length;
        animatedGreetingElement.textContent = greetings[currentMultiGreetingIndex];

        // Fade in new greeting
        animatedGreetingElement.classList.remove('greeting-fade-out');
        animatedGreetingElement.classList.add('greeting-fade-in');

        // Increment cycle count after a greeting has appeared (faded in)
        greetingCycleCount++; 

        // Schedule the next full cycle (current fades out, next fades in)
        if (greetingCycleCount < maxGreetingCycles) {
            greetingIntervalId = setTimeout(cycleMultiGreetingsOnPreloader, multiGreetingVisibleDuration + multiGreetingFadeDuration);
        }

    }, multiGreetingFadeDuration); // This delay accounts for the fade-out duration
}


/**
 * Rotates through AI tease messages.
 */
function rotateAiTeaseMessage() {
    const aiTeaseElement = document.getElementById('aiTease');
    if (!aiTeaseElement) {
        console.error("Error: 'aiTease' element not found. Stopping AI tease.");
        clearInterval(aiTeaseIntervalId); // Stop interval if element is missing
        return;
    }
    aiTeaseElement.textContent = aiTeaseMessages[currentAiTeaseIndex];
    currentAiTeaseIndex = (currentAiTeaseIndex + 1) % aiTeaseMessages.length;
}

/**
 * Displays a new random quote.
 */
function displayNewQuote() {
    const quoteBox = document.getElementById('quoteBox');
    if (!quoteBox) {
        console.error("Error: 'quoteBox' element not found. Cannot display quote.");
        return;
    }
    
    // Fade out the current quote
    quoteBox.style.opacity = '0';

    setTimeout(() => {
        // Ensure new quote is different from the last one (if possible with enough quotes)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === currentQuoteIndex && quotes.length > 1);
        currentQuoteIndex = newIndex;

        quoteBox.textContent = quotes[currentQuoteIndex];
        // Fade in the new quote
        quoteBox.style.opacity = '1';
    }, 500); // Half a second for fade out, then change text and fade in
}

/**
 * Toggles dark mode on the body and saves preference to localStorage.
 */
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    userPrefersDarkMode = body.classList.contains('dark-mode');
    try {
        localStorage.setItem('darkMode', userPrefersDarkMode); // Save preference
        console.log("Dark mode toggled:", userPrefersDarkMode ? "ON" : "OFF");
    } catch (e) {
        console.error("Error saving dark mode preference to localStorage:", e);
    }
}


// --- INITIALIZATION ON WINDOW LOAD ---

// This ensures all HTML elements are fully loaded before JavaScript tries to access them.
window.onload = function() {
    console.log("Window loaded. Initializing script.");

    // Get references to all necessary DOM elements
    const preloader = document.getElementById('preloader');
    const parallaxBg = document.getElementById('parallax-bg');
    const animatedGreetingElement = document.getElementById('animated-greeting');
    const typingNameElement = document.getElementById('typing-name');
    const typingSkillElement = document.getElementById('typing-skill');
    const terminalElement = document.getElementById('terminal');
    const quoteBox = document.getElementById('quoteBox');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const aiTeaseElement = document.getElementById('aiTease');
    const scrollDarkSection = document.getElementById('scroll-dark-section');


    // 1. Load Dark Mode Preference from Local Storage
    try {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            userPrefersDarkMode = true;
            console.log("Loaded dark mode preference from localStorage: ON");
        } else {
            userPrefersDarkMode = false;
            // Ensure dark-mode is explicitly removed if preference is false or not set
            document.body.classList.remove('dark-mode');
            console.log("Loaded dark mode preference from localStorage: OFF (or not set)");
        }
    } catch (e) {
        console.error("Error loading dark mode preference from localStorage:", e);
        userPrefersDarkMode = false; // Default to light if localStorage fails
        document.body.classList.remove('dark-mode');
    }


    // 2. Preloader & Initial Animations
    if (preloader) {
        // Minimum time preloader is fully visible, now considering greeting cycle time
        const preloaderMinDisplayTime = multiGreetingTotalCycleTime * 2; // Show at least 2 full greeting cycles
        if (preloaderMinDisplayTime < 2500) { // Ensure a minimum of 2.5 seconds
            preloaderMinDisplayTime = 2500;
        }

        // Start the greeting animation immediately
        if (animatedGreetingElement && greetings.length > 0) {
            animatedGreetingElement.textContent = greetings[currentMultiGreetingIndex];
            // Initial fade-in of the first greeting
            setTimeout(() => {
                animatedGreetingElement.classList.add('greeting-fade-in');
                // Start the continuous cycling after the first greeting has faded in and been visible
                greetingIntervalId = setTimeout(cycleMultiGreetingsOnPreloader, multiGreetingVisibleDuration + multiGreetingFadeDuration);
            }, multiGreetingFadeDuration); // Give a moment for the initial state to render (matches CSS transition)
            console.log("Starting multi-language greeting animation.");
        } else {
            console.warn("Multi-language greeting element or greetings array not found. Skipping preloader greetings.");
        }

        // Fade out preloader after its minimum display time
        setTimeout(() => {
            preloader.classList.add('fade-out');
            console.log("Preloader fading out...");

            // After preloader starts fading, reveal the parallax background
            if (parallaxBg) {
                parallaxBg.classList.add('show');
                console.log("Parallax background showing.");
            } else {
                console.warn("Parallax background element not found.");
            }

            // Start main content animations AFTER preloader CSS fade-out transition completes (1s)
            setTimeout(() => {
                // Initial typewriter effect for name
                if (typingNameElement && typingSkillElement) {
                    typeText(typingNameElement, nameText, typingSpeed, () => {
                        typeText(typingSkillElement, skillText, typingSpeed);
                    });
                    console.log("Starting typing effect for name and skill.");
                } else {
                    console.warn("Typing elements (typing-name or typing-skill) not found.");
                }

                // Initial AI tease message
                if (aiTeaseElement) {
                    rotateAiTeaseMessage(); // Set initial AI message
                    aiTeaseIntervalId = setInterval(rotateAiTeaseMessage, aiTeaseDuration); // Cycle AI messages
                    console.log("Starting AI tease messages.");
                } else {
                    console.warn("'aiTease' element not found. Skipping AI tease.");
                }

                // Initial Quote (and button listener)
                if (quoteBox && newQuoteBtn) {
                    currentQuoteIndex = Math.floor(Math.random() * quotes.length); // Pick a random first quote
                    quoteBox.textContent = quotes[currentQuoteIndex]; 
                    newQuoteBtn.addEventListener('click', displayNewQuote);
                    console.log("Quote box initialized and button listener attached.");
                } else {
                    console.warn("Quote box or new quote button not found.");
                }

                // Initial terminal typing animation
                if (terminalElement) {
                    animateTerminalText(); // Start terminal animation
                    console.log("Starting terminal animation.");
                } else {
                    console.warn("Terminal element not found. Skipping terminal animation.");
                }

            }, 1000); // Wait for preloader's CSS fade-out transition (1s) to complete
        }, preloaderMinDisplayTime); // Wait for preloader's minimum display time
    } else {
        console.error("Preloader element not found! Page will load immediately without preloader.");
        // If preloader isn't found, ensure other elements are still shown
        if (parallaxBg) {
            parallaxBg.classList.add('show');
        }
        // Immediately start other animations if no preloader
        if (typingNameElement && typingSkillElement) {
            typeText(typingNameElement, nameText, typingSpeed, () => {
                typeText(typingSkillElement, skillText, typingSpeed);
            });
        }
        if (aiTeaseElement) {
            rotateAiTeaseMessage();
            aiTeaseIntervalId = setInterval(rotateAiTeaseMessage, aiTeaseDuration);
        }
        if (quoteBox && newQuoteBtn) {
            currentQuoteIndex = Math.floor(Math.random() * quotes.length);
            quoteBox.textContent = quotes[currentQuoteIndex];
            newQuoteBtn.addEventListener('click', displayNewQuote);
        }
        if (terminalElement) animateTerminalText();
    }


    // 3. Scroll-triggered Dark Mode
    if (scrollDarkSection) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the target element visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the scroll-dark-section is intersecting (i.e., user scrolled down to it)
                if (entry.isIntersecting) {
                    // Only apply dark mode if the user hasn't manually preferred light mode
                    if (!userPrefersDarkMode) { 
                        document.body.classList.add('dark-mode');
                    }
                } else {
                    // If not intersecting (e.g., scrolled back up past it)
                    // Only revert to light mode if the user hasn't manually preferred dark mode
                    if (!userPrefersDarkMode) { 
                        document.body.classList.remove('dark-mode');
                    }
                }
            });
        }, observerOptions);

        observer.observe(scrollDarkSection);
        console.log("Scroll observer for dark mode initialized.");
    } else {
        console.warn("Scroll dark section element not found. Scroll-triggered dark mode disabled.");
    }
};
