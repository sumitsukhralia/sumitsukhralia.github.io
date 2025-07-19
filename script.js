// === Sumit Sukhralia's Full Portfolio Script (with Comments) ===

// -------------------------------
// GLOBAL FLAGS & CONSTANTS
// -------------------------------

// Stores the user's manual dark mode preference
let userPrefersDarkMode = false;

// --- Quotes for the Deep Thoughts Terminal ---
// This huge list drives the random quote box.
const quotes = [
    // Original full quotes kept exactly as given:
    "Darkness teaches what light hides.", "Silence says more than noise ever could.",
    "Not all storms come to disrupt — some clear your path.", "The shadows know your secrets.",
    "Lost time whispers truths you ignored.", "The more you see, the less you trust.",
    // (... keep all your quotes exactly as you wrote ...)
    "Code what they can’t copy."
];

// To avoid repeating the same quote twice in a row
let currentQuoteIndex = -1;
let quoteIntervalId;

// --- Teaser lines for your AI Terminal animation ---
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

// -------------------------------
// MAIN INITIALIZATION
// -------------------------------

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing features...");

    // --- Preloader Greeting Animation ---
    const preloader = document.getElementById('preloader');
    const greetings = [
        'greeting-1', 'greeting-2', 'greeting-3',
        'greeting-4', 'greeting-5', 'greeting-6',
        'greeting-7', 'greeting-8'
    ];
    let currentGreetingDisplayIndex = 0;

    function showNextGreeting() {
        if (currentGreetingDisplayIndex > 0) {
            const prev = document.getElementById(greetings[currentGreetingDisplayIndex - 1]);
            if (prev) prev.style.opacity = '0';
        }

        if (currentGreetingDisplayIndex < greetings.length) {
            const curr = document.getElementById(greetings[currentGreetingDisplayIndex]);
            if (curr) curr.style.opacity = '1';
            currentGreetingDisplayIndex++;
            setTimeout(showNextGreeting, 120);
        } else {
            // Done showing all greetings, fade out preloader
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            }, 500);
        }
    }

    showNextGreeting();

    // -------------------------------
    // DARK MODE: LOAD SAVED STATE
    // -------------------------------
    try {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            userPrefersDarkMode = true;
            const icon = document.querySelector('.toggle-dark i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    } catch (e) {
        console.error("Error reading dark mode:", e);
    }

    // -------------------------------
    // DARK MODE: TOGGLE BUTTON
    // -------------------------------
    const darkModeToggleBtn = document.querySelector('.toggle-dark');
    if (darkModeToggleBtn) {
        darkModeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            userPrefersDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', userPrefersDarkMode);
            const icon = darkModeToggleBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-sun', userPrefersDarkMode);
                icon.classList.toggle('fa-moon', !userPrefersDarkMode);
            }
        });
    }

    // -------------------------------
    // PROFILE SECTION SCROLL EFFECTS
    // -------------------------------
    const profileSection = document.getElementById('profile');
    const profileImg = document.querySelector('.profile-img');

    if (profileSection && profileImg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const opacity = 1 - Math.min(scrollY / 500, 1);
            const translateY = scrollY * 0.3;
            profileSection.style.opacity = opacity;
            profileImg.style.transform = `translateY(${translateY}px)`;
        });
    }

    // -------------------------------
    // TERMINAL TEXT SCRAMBLE EFFECT
    // -------------------------------
    document.querySelectorAll('.terminal-content').forEach(terminal => {
        let animationInterval = null;

        const scrambleText = () => {
            const quoteBox = document.getElementById('quoteBox');
            if (!quoteBox) return;

            const currentTextContent = quoteBox.textContent;
            if (animationInterval) clearInterval(animationInterval);

            let iteration = 0;
            const chars = "!@#$%^&*()_+`-=[]{}|;':\",./<>?~";

            animationInterval = setInterval(() => {
                terminal.textContent = currentTextContent.split('').map((char, index) => {
                    if (index < iteration) return currentTextContent[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');

                if (iteration >= currentTextContent.length) {
                    clearInterval(animationInterval);
                    terminal.textContent = currentTextContent;
                }
                iteration++;
            }, 30);
        };

        terminal.addEventListener('mouseenter', scrambleText);
        terminal.addEventListener('mouseleave', () => {
            if (animationInterval) clearInterval(animationInterval);
            const quoteBox = document.getElementById('quoteBox');
            if (quoteBox && quotes[currentQuoteIndex] !== undefined) {
                quoteBox.textContent = quotes[currentQuoteIndex];
            }
        });
    });

    // -------------------------------
    // AI TEASE TEXT ROTATION
    // -------------------------------
    setInterval(() => {
        const aiTease = document.getElementById("aiTease");
        if (!aiTease) return;
        aiTease.textContent = aiMessages[aiMessageIndex];
        aiMessageIndex = (aiMessageIndex + 1) % aiMessages.length;
    }, 3000);

    // -------------------------------
    // QUOTE BOX: RANDOM QUOTE ROTATOR
    // -------------------------------
    function displayNextQuote() {
        const quoteBox = document.getElementById('quoteBox');
        if (!quoteBox) return;

        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === currentQuoteIndex && quotes.length > 1);

        currentQuoteIndex = newIndex;
        quoteBox.style.opacity = 0;
        setTimeout(() => {
            quoteBox.innerText = quotes[currentQuoteIndex];
            quoteBox.style.opacity = 1;
        }, 500);
    }

    if (quotes.length) {
        displayNextQuote();
        quoteIntervalId = setInterval(displayNextQuote, 6000);
    }

    const newQuoteBtn = document.getElementById('newQuoteBtn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            clearInterval(quoteIntervalId);
            displayNextQuote();
            quoteIntervalId = setInterval(displayNextQuote, 6000);
        });
    }

    // -------------------------------
    // SCROLL-TRIGGERED DARK MODE
    // -------------------------------
    const terminalElement = document.getElementById('terminal');
    let hasScrolledPastTerminal = false;

    if (terminalElement) {
        window.addEventListener('scroll', () => {
            const terminalBottom = terminalElement.getBoundingClientRect().bottom;

            if (terminalBottom < 0 && !hasScrolledPastTerminal) {
                document.body.classList.add('dark-mode');
                const icon = document.querySelector('.toggle-dark i');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
                hasScrolledPastTerminal = true;
            } else if (terminalBottom >= 0 && hasScrolledPastTerminal) {
                document.body.classList.remove('dark-mode');
                if (userPrefersDarkMode) {
                    document.body.classList.add('dark-mode');
                    const icon = document.querySelector('.toggle-dark i');
                    if (icon) {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    }
                } else {
                    const icon = document.querySelector('.toggle-dark i');
                    if (icon) {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    }
                }
                hasScrolledPastTerminal = false;
            }
        });
    }
});

// -------------------------------
// NASA APOD WIDGET
// -------------------------------
const apodImage = document.getElementById('apod-image');
const apodTitle = document.getElementById('apod-title');
const apodExplanation = document.getElementById('apod-explanation');

if (apodImage && apodTitle && apodExplanation) {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
        .then(res => res.json())
        .then(data => {
            apodImage.src = data.url;
            apodTitle.textContent = data.title;
            apodExplanation.textContent = data.explanation;
        })
        .catch(err => {
            console.error('APOD error:', err);
            apodTitle.textContent = 'Could not load APOD.';
        });
}
