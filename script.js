// --- GLOBAL VARIABLES AND HELPER FUNCTIONS ---

// For preloader greetings
const greetings = ["Hello!", "नमस्ते!", "Hola!", "Bonjour!", "Ciao!", "Olá!"];
let currentMultiGreetingIndex = 0;
let greetingCycleCount = 0;
// Cycle through greetings 2 times, each greeting for 800ms + 600ms fade
const maxGreetingCycles = greetings.length * 2; 
const multiGreetingDisplayDuration = 800; 
const multiGreetingFadeDuration = 600; 
let greetingIntervalId; // To store the interval ID for clearing

// For typing effect (name and skill)
const nameText = "Sumit Sukhralia";
const skillText = "MERN Stack Developer | AI Enthusiast";
const typingSpeed = 100; // milliseconds per character
const deletingSpeed = 50; // milliseconds per character
const delayBetweenTypingStages = 1000; // milliseconds before typing/deleting next
const terminalTexts = ["Beyond Curriculum", "From Biochem to Backend", "404: Limit Not Found"];

let typingNameIndex = 0;
let typingSkillIndex = 0;
let isDeletingTerminalText = false;
let currentTerminalTextIndex = 0; 

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
 * Handles the typing and deleting effect for the terminal section.
 */
function animateTerminalText() {
    const terminalElement = document.getElementById('terminal');
    if (!terminalElement) {
        console.error("Terminal element not found for animation.");
        return;
    }

    const currentText = terminalTexts[currentTerminalTextIndex];
    const staticPrefix = "user@SUMIT: ~ whoami\n";

    if (!isDeletingTerminalText) {
        // Typing phase
        terminalElement.textContent = staticPrefix + currentText.substring(0, typingNameIndex++);
        if (typingNameIndex > currentText.length) {
            isDeletingTerminalText = true;
            setTimeout(animateTerminalText, delayBetweenTypingStages); // Pause after typing
        } else {
            setTimeout(animateTerminalText, typingSpeed);
        }
    } else {
        // Deleting phase
        terminalElement.textContent = staticPrefix + currentText.substring(0, typingNameIndex--);
        if (typingNameIndex < 0) {
            isDeletingTerminalText = false;
            currentTerminalTextIndex = (currentTerminalTextIndex + 1) % terminalTexts.length;
            setTimeout(animateTerminalText, typingSpeed); // Pause before typing next
        } else {
            setTimeout(animateTerminalText, deletingSpeed);
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

    // Stop the cycle if we've shown enough greetings
    if (greetingCycleCount >= maxGreetingCycles) {
        clearInterval(greetingIntervalId);
        return;
    }

    // Fade out current greeting
    animatedGreetingElement.classList.remove('greeting-fade-in');
    animatedGreetingElement.classList.add('greeting-fade-out');

    setTimeout(() => {
        // Update text after it has faded out
        currentMultiGreetingIndex = (currentMultiGreetingIndex + 1) % greetings.length;
        animatedGreetingElement.textContent = greetings[currentMultiGreetingIndex];

        // Fade in new greeting
        animatedGreetingElement.classList.remove('greeting-fade-out');
        animatedGreetingElement.classList.add('greeting-fade-in');

        greetingCycleCount++;

        // Schedule next cycle
        if (greetingCycleCount < maxGreetingCycles) {
            greetingIntervalId = setTimeout(cycleMultiGreetingsOnPreloader, multiGreetingDisplayDuration + multiGreetingFadeDuration);
        }

    }, multiGreetingFadeDuration); // Wait for the fade-out duration before changing text
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
        const preloaderMinDisplayTime = 2000; // Minimum time preloader is fully visible (2 seconds)

        // Start the greeting animation immediately
        if (animatedGreetingElement && greetings.length > 0) {
            animatedGreetingElement.textContent = greetings[currentMultiGreetingIndex];
            // Small delay before first greeting fades in, so it's not instantaneous
            setTimeout(() => {
                animatedGreetingElement.classList.add('greeting-fade-in');
                // Start the continuous cycling of greetings AFTER the first one fades in
                greetingIntervalId = setTimeout(cycleMultiGreetingsOnPreloader, multiGreetingDisplayDuration + multiGreetingFadeDuration);
            }, 100); 
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
                    // Set initial quote immediately without fade, then attach listener
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
