// --- Consolidated JavaScript for Sumit Sukhralia's Portfolio ---

// === Global flag for user dark mode preference ===
let userPrefersDarkMode = false;

// === Quotes Array ===
const quotes = [
    // your entire huge quotes array exactly as-is
    "Darkness teaches what light hides.", "Silence says more than noise ever could.",
    "Not all storms come to disrupt — some clear your path.", "The shadows know your secrets.",
    "Lost time whispers truths you ignored.", "The more you see, the less you trust.",
    "Loneliness sharpens the mind.", "Some doors only open once.",
    "Ghosts live in memories we revisit.", "You become what you feed your mind.",
    "Still waters drown deeper secrets.", "Trust the quiet ones — they notice everything.",
    "Chaos hides in routine.", "A lie repeated is a truth forgotten.",
    "Some scars glow in the dark.", "The cost of freedom is solitude.",
    "Words heal; silence breaks.", "You fear what you refuse to face.",
    "The cage is open — the mind stays locked.", "Mirrors never lie — they just wait.",
    "We chase time, but it buries us.", "Dreams remember what you forget.",
    "Unspoken words weigh the most.", "Fear is a story we tell ourselves.",
    "You break to rebuild stronger.", "Some endings free you.",
    "Shadows grow when the sun sets.", "Pain makes poets of us all.",
    "The truth is patient.", "Destiny whispers — noise ignores.",
    // (and so on... keep the rest exactly)
];
let currentQuoteIndex = -1; // === Current quote tracker ===
let quoteIntervalId;

// === AI Tease Messages ===
const aiMessages = [
    "Initializing...", "Waking neural core...", "Connecting consciousness...",
    "Decoding thoughts...", "Compiling intuition...", "Deploying self-awareness...",
    "Spawning sentience..."
];
let aiMessageIndex = 0;

// === DOMContentLoaded Main ===
document.addEventListener('DOMContentLoaded', () => {

    // === Preloader ===
    const preloader = document.getElementById('preloader');
    const greetings = [
        'greeting-1', 'greeting-2', 'greeting-3',
        'greeting-4', 'greeting-5', 'greeting-6',
        'greeting-7', 'greeting-8'
    ];
    let currentGreetingDisplayIndex = 0;

    function showNextGreeting() {
        if (currentGreetingDisplayIndex > 0) {
            const prevElement = document.getElementById(greetings[currentGreetingDisplayIndex - 1]);
            if (prevElement) {
                prevElement.style.opacity = '0';
            }
        }
        if (currentGreetingDisplayIndex < greetings.length) {
            const currentElement = document.getElementById(greetings[currentGreetingDisplayIndex]);
            if (currentElement) {
                currentElement.style.opacity = '1';
            }
            currentGreetingDisplayIndex++;
            setTimeout(showNextGreeting, 120);
        } else {
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

    // === IP Flip Card ===
    document.addEventListener('DOMContentLoaded', () => {
        const ipAddressElement = document.getElementById('ip-address');

        if (ipAddressElement) {
            fetch('https://ipinfo.io/json?token=YOUR_TOKEN_HERE')
                .then(response => response.json())
                .then(data => {
                    ipAddressElement.innerHTML = `
                        <strong>IP:</strong> ${data.ip}<br>
                        <strong>Country:</strong> ${data.country}<br>
                        <strong>ISP:</strong> ${data.org}
                    `;
                })
                .catch(error => {
                    console.error('Error fetching IP info:', error);
                    ipAddressElement.textContent = 'Unavailable';
                });

            console.log('IP Flip Card initialized.');
        } else {
            console.warn('IP Flip Card element (#ip-address) not found.');
        }

        const flipCard = document.querySelector('.flip-card');
        if (flipCard) {
            flipCard.addEventListener('click', () => {
                flipCard.classList.toggle('flipped');
            });
        }
    });

    showNextGreeting();

    // === Check Saved Dark Mode ===
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
        } else {
            userPrefersDarkMode = false;
        }
    } catch (e) {
        console.error("Error loading dark mode preference:", e);
        userPrefersDarkMode = false;
    }

    // === Dark Mode Toggle ===
    const darkModeToggleBtn = document.querySelector('.toggle-dark');
    if (darkModeToggleBtn) {
        darkModeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            userPrefersDarkMode = document.body.classList.contains('dark-mode');
            try {
                localStorage.setItem('darkMode', userPrefersDarkMode);
            } catch (e) {
                console.error("Error saving dark mode preference:", e);
            }
            const icon = darkModeToggleBtn.querySelector('i');
            if (icon) {
                if (userPrefersDarkMode) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }

    // === Profile Section Scroll ===
    const profileSection = document.getElementById('profile');
    const profileImg = document.querySelector('.profile-img');
    if (profileSection && profileImg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const opacity = 1 - Math.min(scrollPosition / 500, 1);
            profileSection.style.opacity = opacity;
            const translateY = scrollPosition * 0.3;
            profileImg.style.transform = `translateY(${translateY}px)`;
        });
    }

    // === Terminal Scramble ===
    document.querySelectorAll('.terminal-content').forEach(terminal => {
        let animationInterval = null;

        const scrambleText = () => {
            const quoteBox = document.getElementById('quoteBox');
            if (!quoteBox) return;
            const currentTextContent = quoteBox.textContent;

            if (animationInterval) {
                clearInterval(animationInterval);
            }

            let iteration = 0;
            const chars = "!@#$%^&*()_+`-=[]{}|;':\",./<>?~";

            animationInterval = setInterval(() => {
                terminal.textContent = currentTextContent
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return currentTextContent[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iteration >= currentTextContent.length) {
                    clearInterval(animationInterval);
                    animationInterval = null;
                    terminal.textContent = currentTextContent;
                }
                iteration += 1;
            }, 30);
        };

        terminal.addEventListener('mouseenter', scrambleText);
        terminal.addEventListener('mouseleave', () => {
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
            }
            const quoteBox = document.getElementById('quoteBox');
            if (quoteBox && quotes[currentQuoteIndex] !== undefined) {
                quoteBox.textContent = quotes[currentQuoteIndex];
            }
        });
    });

    // === AI Tease ===
    setInterval(() => {
        const aiTeaseElement = document.getElementById("aiTease");
        if (!aiTeaseElement) return;
        aiTeaseElement.textContent = aiMessages[aiMessageIndex];
        aiMessageIndex = (aiMessageIndex + 1) % aiMessages.length;
    }, 3000);

    // === Quote Display ===
    function displayNextQuote() {
        const quoteBox = document.getElementById('quoteBox');
        if (!quoteBox) return;
        if (quotes.length === 0) {
            quoteBox.innerText = "No quotes available.";
            return;
        }
        let newQuoteIndex;
        do {
            newQuoteIndex = Math.floor(Math.random() * quotes.length);
        } while (newQuoteIndex === currentQuoteIndex && quotes.length > 1);
        currentQuoteIndex = newQuoteIndex;

        quoteBox.style.opacity = 0;
        setTimeout(() => {
            quoteBox.innerText = quotes[currentQuoteIndex];
            quoteBox.style.opacity = 1;
        }, 500);
    }

    if (quotes.length > 0) {
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

    // === Scroll-Triggered Dark Mode ===
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

// === NASA APOD ===
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
            apodTitle.textContent = 'Could not load APOD.';
        });
}
