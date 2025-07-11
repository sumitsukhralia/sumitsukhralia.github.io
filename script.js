// --- Quote Display Functionality (KEEP AS IS) ---
const quotes = [
    "Darkness teaches what light hides.",
    "Silence says more than noise ever could.",
    // ... (rest of your quotes) ...
    "Code what they can’t copy."
];

let currentQuoteIndex = -1;
let quoteIntervalId;

function displayNextQuote() {
    const quoteBox = document.getElementById('quoteBox');
    if (!quoteBox) {
        console.error("Error: 'quoteBox' element not found. Cannot display quote.");
        return;
    }

    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

    quoteBox.style.opacity = 0;
    console.log(`Displaying quote #${currentQuoteIndex}: "${quotes[currentQuoteIndex].substring(0, 30)}..."`);

    setTimeout(() => {
        quoteBox.innerText = quotes[currentQuoteIndex];
        quoteBox.style.opacity = 1;
    }, 500);
}

// --- AI Tease Text Rotation Functionality (KEEP AS IS) ---
const aiMessages = [
    "Initializing...",
    "Waking neural core...",
    "Connecting consciousness...",
    "Decoding thoughts...",
    "Compiling intuition...",
    "Deploying self-awareness...",
    "Spawning sentience..."
];
let aiMessageIndex = 0;

setInterval(() => {
    const aiTeaseElement = document.getElementById("aiTease");
    if (!aiTeaseElement) {
        console.error("Error: 'aiTease' element not found for AI messages.");
        return;
    }
    aiTeaseElement.textContent = aiMessages[aiMessageIndex];
    aiMessageIndex = (aiMessageIndex + 1) % aiMessages.length;
}, 3000);

// --- Dark Mode Toggle Functionality (Manual Button) (KEEP AS IS) ---
let userPrefersDarkMode = false;

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    userPrefersDarkMode = document.body.classList.contains('dark-mode');
    try {
        localStorage.setItem('darkMode', userPrefersDarkMode);
        console.log("Dark mode preference saved to localStorage:", userPrefersDarkMode);
    } catch (e) {
        console.error("Error saving dark mode preference to localStorage:", e);
    }
}

// --- NEW: Multi-Language Greeting Animation (Adapted from previous) ---
const greetings = [
    "Hello!",
    "नमस्ते!", // Namaste in Hindi
    "Bonjour!",
    "Hola!",
    "こんにちは！", // Konnichiwa in Japanese
    "안녕하세요!", // Annyeonghaseyo in Korean
    "مرحبا!",    // Marhaba in Arabic
    "Olá!",
    "Hallo!"
];

let currentMultiGreetingIndex = 0; // Renamed to avoid conflict
const multiGreetingFadeDuration = 600;
const multiGreetingDisplayDuration = 1800; // How long each greeting is visible

function cycleMultiGreetingsOnPreloader() {
    const animatedGreetingElement = document.getElementById('animated-greeting'); // Get the element
    if (!animatedGreetingElement) return;

    animatedGreetingElement.classList.remove('greeting-fade-in');
    animatedGreetingElement.classList.add('greeting-fade-out');

    setTimeout(() => {
        currentMultiGreetingIndex = (currentMultiGreetingIndex + 1) % greetings.length;
        animatedGreetingElement.textContent = greetings[currentMultiGreetingIndex];

        animatedGreetingElement.classList.remove('greeting-fade-out');
        animatedGreetingElement.classList.add('greeting-fade-in');

        // Schedule the next cycle
        // Only loop for a set number of times for the preloader
        if (currentMultiGreetingIndex < greetings.length - 1) { // Example: Loop through all once
            setTimeout(cycleMultiGreetingsOnPreloader, multiGreetingDisplayDuration);
        }

    }, multiGreetingFadeDuration);
}

// --- NEW: Typing Effect for Name and Tagline ---
const nameEl = document.getElementById('typing-name');
const skillEl = document.getElementById('typing-skill');
const nameText = "Sumit Sukhralia"; // <= CUSTOMIZE THIS!
const skillText = "awesome web experiences."; // <= CUSTOMIZE THIS!

function typeWriterEffect(element, text, speed, callback) {
    let currentText = "";
    let i = 0;
    const typingInterval = setInterval(() => {
        if (element && i < text.length) { // Check if element exists before modifying
            currentText += text.charAt(i);
            element.textContent = currentText;
            i++;
        } else {
            clearInterval(typingInterval);
            if (callback) callback();
        }
    }, speed);
}


// --- Initial Setup on Page Load (HEAVILY MODIFIED) ---
window.onload = () => {
    console.log("Window loaded. Initializing script.");

    const preloader = document.getElementById('preloader');
    const animatedGreetingElement = document.getElementById('animated-greeting');
    const parallaxBg = document.getElementById('parallax-bg'); // Get the new parallax element

    // 1. Initial Dark Mode Check (KEEP AS IS)
    try {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            userPrefersDarkMode = true;
            console.log("Loaded dark mode preference from localStorage: ON");
        } else {
            userPrefersDarkMode = false;
            console.log("Loaded dark mode preference from localStorage: OFF (or not set)");
        }
    } catch (e) {
        console.error("Error loading dark mode preference from localStorage:", e);
        userPrefersDarkMode = false;
    }

    // 2. Start Multi-Language Greeting on the black preloader screen
    if (animatedGreetingElement && greetings.length > 0) {
        animatedGreetingElement.textContent = greetings[currentMultiGreetingIndex];
        setTimeout(() => {
            animatedGreetingElement.classList.add('greeting-fade-in');
            cycleMultiGreetingsOnPreloader(); // Start the looping of greetings
        }, 300); // Small delay before first greeting fades in
    } else {
        console.warn("Multi-language greeting element or greetings array not found.");
    }

    // 3. Determine when to fade out the preloader and start main animations
    // Let's aim for the preloader to stay for about 3-4 seconds, covering a couple of greetings
    const preloaderDisplayDuration = 3500; // Total time the preloader stays (3.5 seconds)

    setTimeout(() => {
        // Fade out the preloader screen
        if (preloader) {
            preloader.classList.add('fade-out');
            console.log("Preloader fading out...");
        }

        // Show the main parallax background as preloader fades
        if (parallaxBg) {
            parallaxBg.classList.add('show');
            console.log("Parallax background starting...");
        }

        // Start typing effect for name and skill AFTER preloader begins to fade
        // This will align with the main content becoming visible
        setTimeout(() => {
            if (nameEl && skillEl) {
                typeWriterEffect(nameEl, nameText, 80, () => {
                    setTimeout(() => {
                        typeWriterEffect(skillEl, skillText, 60);
                    }, 500); // Small pause before skill starts
                });
            } else {
                console.warn("Name or Skill typing elements not found. Typing effect will not run.");
            }
            animateElements(); // Call your existing text scrambling animation
            console.log("Main typing effect and other animations starting.");

            // Quote Display Initialization (only after preloader is done)
            if (quotes.length > 0) {
                displayNextQuote(); // Display the first quote immediately
                quoteIntervalId = setInterval(displayNextQuote, 60000); // Auto-rotate every 60 seconds
                console.log("Quote display initialized.");
            } else {
                console.warn("No quotes found for display.");
            }

        }, 500); // Start typing 0.5s into preloader fade-out transition
        // The preloader fade-out itself is 1s, so this makes it smooth.

    }, preloaderDisplayDuration); // Total time preloader is visible before fade-out begins


    // Add event listener to the new quote button (KEEP AS IS)
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            console.log("New Quote button clicked.");
            displayNextQuote();
            // Optional: Reset the automatic timer so it doesn't change too quickly after a manual click
            // clearInterval(quoteIntervalId);
            // quoteIntervalId = setInterval(displayNextQuote, 60000);
        });
    } else {
        console.error("Error: 'newQuoteBtn' element not found. Quote button functionality will not work.");
    }

    // --- Scroll-Triggered Dark Mode Effect (KEEP AS IS, but consider its interaction with new main background) ---
    // You have a scroll-triggered dark mode. Now that you have a global parallax,
    // this effect might need re-evaluation or modification if it conflicts.
    // For now, keeping it, but be aware.
    const terminalElement = document.getElementById('terminal');
    let hasScrolledPastTerminal = false;

    if (terminalElement) {
        console.log("Terminal element found for scroll-triggered dark mode.");
        window.addEventListener('scroll', () => {
            const terminalBottom = terminalElement.getBoundingClientRect().bottom;

            if (terminalBottom < 0 && !hasScrolledPastTerminal) {
                // Ensure manual toggle preference isn't overridden if user wants light mode always
                if (!userPrefersDarkMode) { // Only auto-switch if user hasn't explicitly set light mode
                   // document.body.classList.add('dark-mode'); // This will make it dark
                }
                hasScrolledPastTerminal = true;
                console.log("Scrolled past terminal: Auto-switching logic triggered.");
            } else if (terminalBottom >= 0 && hasScrolledPastTerminal) {
                // If scrolling back up, revert if user preference isn't dark mode
                if (!userPrefersDarkMode) {
                   // document.body.classList.remove('dark-mode'); // This will revert to original
                }
                hasScrolledPastTerminal = false;
                console.log("Terminal back in view: Reverting to user preference.");
            }
        });
    } else {
        console.error("Error: 'terminal' element not found. Scroll-triggered dark mode will not function.");
    }
};

// --- Text Animation (Scramble Effect) Functionality (KEEP AS IS) ---
const ASCII_OF_A = "A".charCodeAt();
const NO_OF_ALPHABETS = 26;

function animateElement(element, originalText, options) {
    let iteration = 0;
    if (options.interval) return;
    options.interval = setInterval(() => {
        const newWord = originalText
            .split("")
            .map((_, idx) => idx < iteration ? originalText[idx] : String.fromCharCode(Math.trunc(Math.random() * NO_OF_ALPHABETS) + ASCII_OF_A))
            .join("");
        element.innerText = newWord;
        iteration += 1;
        if (iteration > originalText.length) {
            clearInterval(options.interval);
            options.interval = null;
        }
    }, 30);
}

function animateElements() {
    const elements = document.getElementsByClassName("animate");
    if (elements.length === 0) {
        console.warn("No elements found with class 'animate' for text scrambling.");
        return;
    }
    for (const element of elements) {
        const originalText = element.innerText;
        const options = { interval: null };
        animateElement(element, originalText, options);
        element.addEventListener("mouseover", (event) => {
            animateElement(event.target, originalText, options);
        });
    }
}

// --- NEW: Scroll Reveal Animation for SECTIONS (NOT the original scroll-triggered dark mode) ---
const sections = document.querySelectorAll('section'); // Target all <section> elements
const options = {
    threshold: 0.1, // Trigger when 10% of the section is visible
    rootMargin: "0px"
};

const sectionObserver = new IntersectionObserver((entries, observer) => { // Renamed observer to avoid conflict
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
            // If it's the skills section, animate skill bars
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, options);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// --- NEW: Animate Skill Bars on Scroll ---
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skill => {
        const level = skill.dataset.level;
        if (level) {
            skill.style.width = level + '%'; // Apply width
        }
        skill.classList.add('animate'); // Trigger CSS transition
    });
}
