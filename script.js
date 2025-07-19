// --- Consolidated JavaScript for Sumit Sukhralia's Portfolio ---

// Global flag to store user's manual dark mode preference
let userPrefersDarkMode = false;

// Comprehensive list of quotes for the Deep Thoughts Terminal
const quotes = [
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
    "Some people are storms disguised as calm seas.", "Light attracts darkness.",
    "Solitude builds empires within.", "Answers hide in silence.",
    "The past always finds its echo.", "Your demons know your name.",
    "What you run from stays closer.", "Secrets poison slowly.",
    "Bruises fade, lessons stay.", "Hunger feeds the wild inside.",
    "Some flowers only bloom in the dark.", "Stars die to be seen.",
    "Wolves don’t lose sleep over sheep.", "Even broken clocks tell time twice.",
    "Hope is rebellion.", "Monsters are born in neglected corners.",
    "Only the lost find hidden roads.", "What you bury grows roots.",
    "Trust your shadows — they never leave.", "Storms cleanse more than they destroy.",
    "The void listens.", "Not every map shows the way out.",
    "Fire teaches what ice forgets.", "Some eyes hide entire universes.",
    "You dig your grave daily.", "Stillness is the loudest roar.",
    "Destiny bends to the brave.", "Nothing haunts like almost.",
    "The mind is a maze with no exits.", "Words taste different in the dark.",
    "The moon keeps secrets daylight denies.", "Trust breaks without sound.",
    "Every scar is a page in your story.", "Some souls wear borrowed faces.",
    "Silence is loyalty to the self.", "Broken wings remember flight.",
    "The truth hides in half-said things.", "Code whispers what logic screams.",
    "The bug you ignore haunts your nights.", "Silence is the best debugger.",
    "One semicolon can break empires.", "Errors are teachers in disguise.",
    "Great devs trust the unseen.", "A single line can change your fate.",
    "Sleep is a myth when curiosity lives.", "Shadows exist in code too.",
    "Build alone, launch together.", "Code is poetry for machines.",
    "The compiler never lies.", "Trust your logic, question your assumptions.",
    "Some loops never end — like regret.", "Debugging is a mirror for the mind.",
    "Clarity is rarer than syntax.", "Comments are confessions to the future.",
    "If it works, you missed something.", "The mind compiles what the heart ignores.",
    "Version 1 is a graveyard of mistakes.", "Deadlines kill perfection.",
    "Creativity hides behind broken code.", "Stack Overflow knows your secrets.",
    "Some bugs are features waiting to be named.", "Dark mode, deep thoughts.",
    "Broken code builds better coders.", "Code alone, ship loud.",
    "Push your limits like you push commits.", "You write bugs before you write brilliance.",
    "Genius hides in drafts.", "Trust your repo, distrust your ego.",
    "Night owls build tomorrow’s empires.", "Data never lies — but people do.",
    "Syntax is simple — logic is chaos.", "Hack your fears, deploy your courage.",
    "If you can’t break it, you don’t own it.", "Scripts sleep — logic never does.",
    "Errors know your name.",
    "Some branches must be deleted.",
    "Rewrite or regret.",
    "Code reveals character.",
    "Dreams deploy at 2AM.",
    "Learn, break, rebuild — repeat.",
    "Silence your doubts, echo your skills.",
    "Keyboard is sword, mind is shield.",
    "Test your limits like you test your code.",
    "Ghost commits haunt the careless.",
    "Lost sleep, found purpose.",
    "You debug you.",
    "Some logs never lie.",
    "Patience writes clean code.",
    "Coffee fuels revolutions in silence.",
    "Your mindset is the master branch.",
    "Brackets close — ideas don’t.",
    "Read the docs, trust your gut.",
    "Legacy code — modern regret.",
    "Stay curious — stay dangerous.",
    "Push your chaos, pull your peace.",
    "Code is alive — it changes you back.",
    "Keyboard clicks echo your mind.",
    "Comment your life like your code.",
    "Only the brave merge master.",
    "Fearless devs ship ugly.",
    "Failing builds stronger brains.",
    "A hacker’s silence is louder than noise.",
    "Logic bends for the persistent.",
    "One repo, infinite paths.",
    "Bugs find lazy minds.",
    "Never trust a green build.",
    "Deploy hope, rollback fear.",
    "Sometimes the root problem is you.",
    "Security is an illusion — diligence is real.",
    "Keep shipping until doubt dies.",
    "Algorithms reflect your chaos.",
    "Brave devs question comments.",
    "Bad code outlives you.",
    "Keyboard warriors build new worlds.",
    "Merge conflict mirrors inner conflict.",
    "Read your failures like logs.",
    "The greatest feature: unfinished.",
    "Never chase perfect — chase progress.",
    "Code like no one’s watching — refactor like everyone is.",
    "Silence your IDE, unleash your mind.",
    "Frameworks age, logic evolves.",
    "Build trust in your branches.",
    "Break your own limits — or bugs will.",
    "Every sprint leaves a footprint.",
    "Deploy dreams, patch nightmares.",
    "One line at 3AM can launch an empire.",
    "Pseudocode your thoughts, compile your life.",
    "Some bugs fix you.",
    "Passion outlives syntax.",
    "Deadlines teach speed — curiosity teaches depth.",
    "Don’t fear blank screens — fear stale code.",
    "The repo remembers what you forget.",
    "True devs know when to delete.",
    "Fear no error — fear no commit.",
    "One branch can betray you.",
    "All code is legacy tomorrow.",
    "Debug your doubts daily.",
    "Push when afraid.",
    "The deeper the logic, the darker the nights.",
    "Dreams are raw commits.",
    "Sometimes you are the bottleneck.",
    "Break code, not spirit.",
    "Devs build realities in silence.",
    "Architecture hides inside questions.",
    "Secure your logic — unlock your mind.",
    "One repo at a time, you evolve.",
    "Rewrite yourself like your code.",
    "Merge your chaos with purpose.",
    "The cleanest code is invisible.",
    "Fear writes sloppy code.",
    "Trust the compiler — test your mind.",
    "Each sprint reveals a flaw in you.",
    "Stay raw — stay building.",
    "The keyboard knows your secrets.",
    "One feature at a time, one fear at a time.",
    "Restarts are rebirths.",
    "Dark mode hides tears.",
    "Let your silence refactor your soul.",
    "Shadows in code, demons in mind.",
    "Learn the rules — break them clean.",
    "Build what you fear to need.",
    "Test cases teach patience.",
    "The best devs break things twice.",
    "A real dev fixes themselves first.",
    "Never trust working code blindly.",
    "Fearful devs write messy futures.",
    "If it’s too easy, look deeper.",
    "Work alone — change together.",
    "Refactor your regrets.",
    "Infinite loops mirror your mind.",
    "Deploy your doubts to /dev/null.",
    "Dreams versioned, doubts deleted.",
    "Ghost branches never die.",
    "Plan less, build more.",
    "Ship now, sleep later.",
    "IDEs crash — mind shouldn’t.",
    "Protect your main branch — protect your peace.",
    "Brave minds handle merge conflicts.",
    "Git pull your purpose.",
    "Build in silence — launch in noise.",
    "The console knows your soul.",
    "Each error log is a lesson.",
    "Push past logic — trust your gut.",
    "Ideas never compile perfectly.",
    "Control your keys — own your future.",
    "Brackets contain chaos.",
    "Code what they can’t copy."
];
let currentQuoteIndex = -1; // Kept to avoid showing the exact same random quote twice in a row
let quoteIntervalId;

// AI Tease Messages
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


// --- Main DOMContentLoaded Listener ---
// All primary script initializations happen here.
document.addEventListener('DOMContentLoaded', () => {
    console.log("Main script: DOM Content Loaded. Initializing all website features.");

    // --- Preloader Functionality ---
    const preloader = document.getElementById('preloader');
    const greetings = [
        'greeting-1', 'greeting-2', 'greeting-3',
        'greeting-4', 'greeting-5', 'greeting-6',
        'greeting-7', 'greeting-8'
    ];
    let currentGreetingDisplayIndex = 0; // Renamed to avoid conflict with global quote index

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
            setTimeout(showNextGreeting, 120); // Faster display
        } else {
            // All greetings displayed, now fade out preloader
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto'; // Re-enable scroll
                    }, 300); // Faster preloader fade out
                }
            }, 500); // Delay before preloader fade out
        }
    }






document.addEventListener('DOMContentLoaded', () => {
  const ipAddressElement = document.getElementById('ip-address');

  if (ipAddressElement) {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        ipAddressElement.textContent = data.ip;
      })
      .catch(error => {
        console.error('Error fetching IP:', error);
        ipAddressElement.textContent = 'Unavailable';
      });

    console.log('IP Flip Card initialized.');
  } else {
    console.warn('IP Flip Card element (#ip-address) not found.');
  }

  // Optional: Flip on click
  const flipCard = document.querySelector('.flip-card');
  if (flipCard) {
    flipCard.addEventListener('click', () => {
      flipCard.classList.toggle('flipped');
    });
  }
});






    
    showNextGreeting(); // Start preloader animation immediately on DOMContentLoaded


    // --- Check for Saved Dark Mode Preference on Load ---
    try {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            userPrefersDarkMode = true; // Update global flag
            const icon = document.querySelector('.toggle-dark i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            console.log("Loaded dark mode preference from localStorage: ON");
        } else {
            userPrefersDarkMode = false; // Update global flag
            console.log("Loaded dark mode preference from localStorage: OFF (or not set)");
        }
    } catch (e) {
        console.error("Error loading dark mode preference from localStorage:", e);
        userPrefersDarkMode = false;
    }

// --- Dark Mode Toggle Button Functionality ---
const darkModeToggleBtn = document.querySelector('.toggle-dark');
if (darkModeToggleBtn) {
    console.log("Dark mode toggle button found. Adding click listener.");
    darkModeToggleBtn.addEventListener('click', () => {
        console.log("Dark mode toggle button clicked!");
        document.body.classList.toggle('dark-mode'); // Toggles the 'dark-mode' class on the body

        // Update the global flag based on current body class
        userPrefersDarkMode = document.body.classList.contains('dark-mode');

        // Save the preference to localStorage
        try {
            localStorage.setItem('darkMode', userPrefersDarkMode);
            console.log(`Dark mode preference saved: ${userPrefersDarkMode}`);
        } catch (e) {
            console.error("Error saving dark mode preference to localStorage:", e);
        }

        // Update the icon (sun/moon)
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
} else {
    console.error("Error: Dark mode toggle button (.toggle-dark) not found in the DOM.");
}
    
    // --- Profile Section Scroll Effects (Opacity and Parallax on Image) ---
    const profileSection = document.getElementById('profile'); // Assuming your main container has id="profile"
    const profileImg = document.querySelector('.profile-img');

    if (profileSection && profileImg) {
        console.log("Profile section and image found. Adding scroll effects.");
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const opacity = 1 - Math.min(scrollPosition / 500, 1);
            profileSection.style.opacity = opacity;
            const translateY = scrollPosition * 0.3;
            profileImg.style.transform = `translateY(${translateY}px)`;
        });
    } else {
        console.warn("Profile section or image not found. Scroll effects not applied.");
    }

    // --- Terminal Text Animation (Scramble Effect on Mouse Enter/Leave) ---
    // Targets elements with class 'terminal-content' (from your HTML)
    document.querySelectorAll('.terminal-content').forEach(terminal => {
        let animationInterval = null; // Stores the interval ID for the scramble animation

        // Function to scramble the text
        const scrambleText = () => {
            // Get the *current* text from the quote box.
            // This ensures we always scramble the quote that is actually displayed,
            // even if it changed due to auto-rotation before the scramble began.
            const quoteBox = document.getElementById('quoteBox');
            if (!quoteBox) return; // Exit if quoteBox isn't found
            const currentTextContent = quoteBox.textContent;

            // Stop any existing animation to prevent overlap
            if (animationInterval) {
                clearInterval(animationInterval);
            }

            let iteration = 0;
            const chars = "!@#$%^&*()_+`-=[]{}|;':\",./<>?~"; // More diverse scramble characters

            animationInterval = setInterval(() => {
                terminal.textContent = currentTextContent
                    .split('')
                    .map((char, index) => {
                        // If we've passed this character's index, keep the original character
                        if (index < iteration) {
                            return currentTextContent[index];
                        }
                        // Otherwise, return a random scramble character
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                // If all characters have been revealed, stop the animation
                if (iteration >= currentTextContent.length) {
                    clearInterval(animationInterval);
                    animationInterval = null;
                    terminal.textContent = currentTextContent; // Ensure final text is exact
                    // console.log("Terminal scramble animation complete."); // For debugging
                }
                iteration += 1; // Move to the next character for the next iteration
            }, 30); // Animation speed (lower number = faster scramble)
        };

        // Event listener for mouse entering the terminal content
        terminal.addEventListener('mouseenter', scrambleText); // Call the scramble function

        // Event listener for mouse leaving the terminal content
        terminal.addEventListener('mouseleave', () => {
            if (animationInterval) {
                clearInterval(animationInterval); // Stop any ongoing scramble
                animationInterval = null;
            }
            // Immediately revert the text to the *current* active quote
            // This ensures the full quote is always visible if mouse leaves
            const quoteBox = document.getElementById('quoteBox');
            if (quoteBox && quotes[currentQuoteIndex] !== undefined) {
                quoteBox.textContent = quotes[currentQuoteIndex];
            }
            // console.log("Mouse left terminal. Scramble animation stopped/reset."); // For debugging
        });
    });


    // --- AI Tease Text Rotation Functionality ---
    setInterval(() => {
        const aiTeaseElement = document.getElementById("aiTease");
        if (!aiTeaseElement) {
            console.error("Error: 'aiTease' element not found for AI messages.");
            return;
        }
        aiTeaseElement.textContent = aiMessages[aiMessageIndex];
        aiMessageIndex = (aiMessageIndex + 1) % aiMessages.length;
    }, 3000); // Change message every 3 seconds


    // --- Quote Display Initialization (Random & Faster) ---
    function displayNextQuote() {
        const quoteBox = document.getElementById('quoteBox');
        if (!quoteBox) {
            console.error("Error: 'quoteBox' element not found. Cannot display quote.");
            return;
        }
        if (quotes.length === 0) {
            quoteBox.innerText = "No quotes available.";
            return;
        }

        // Select a random quote index, ensuring it's different from the current one
        let newQuoteIndex;
        do {
            newQuoteIndex = Math.floor(Math.random() * quotes.length);
        } while (newQuoteIndex === currentQuoteIndex && quotes.length > 1); // Only try to avoid repeat if there's more than 1 quote

        currentQuoteIndex = newQuoteIndex; // Update the global index to the new random one

        quoteBox.style.opacity = 0; // Start fade-out
        setTimeout(() => {
            quoteBox.innerText = quotes[currentQuoteIndex]; // Set new random quote
            quoteBox.style.opacity = 1; // Fade-in
        }, 500); // Fade in duration
    }

    // Initial call and automation setup
    if (quotes.length > 0) {
        displayNextQuote(); // Display an initial random quote immediately on load
        quoteIntervalId = setInterval(displayNextQuote, 6000); // Auto-rotate every 6 seconds (6000ms)
        console.log("Quote display initialized, auto-rotating every 6 seconds.");
    } else {
        console.warn("No quotes found in the 'quotes' array. Quote display will not function.");
    }

    const newQuoteBtn = document.getElementById('newQuoteBtn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            console.log("New Quote button clicked.");
            clearInterval(quoteIntervalId); // Stop automatic rotation temporarily
            displayNextQuote(); // Display a new random quote manually
            quoteIntervalId = setInterval(displayNextQuote, 6000); // Restart rotation with 6-second interval
        });
    } else {
        console.error("Error: 'newQuoteBtn' element not found. Quote button functionality will not work.");
    }

    // --- Scroll-Triggered Dark Mode Effect ---
    const terminalElement = document.getElementById('terminal'); // This refers to the main 'whoami' terminal
    let hasScrolledPastTerminal = false;

    if (terminalElement) {
        console.log("Terminal element found for scroll-triggered dark mode.");
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
                console.log("Scrolled past main terminal: Auto-switching to Dark Mode!");
            } else if (terminalBottom >= 0 && hasScrolledPastTerminal) {
                // If scrolling back up and the main terminal is in view
                document.body.classList.remove('dark-mode');

                // Revert to user's manual preference if they had dark mode enabled
                if (userPrefersDarkMode) {
                    document.body.classList.add('dark-mode');
                    const icon = document.querySelector('.toggle-dark i');
                    if (icon) {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    }
                } else { // Revert to light mode if user preference was light mode
                    const icon = document.querySelector('.toggle-dark i');
                    if (icon) {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    }
                }
                hasScrolledPastTerminal = false;
                console.log("Main terminal back in view: Reverting to user preference.");
            }
        });
    } else {
        console.error("Error: Main 'terminal' element not found for scroll-triggered dark mode. This effect will not function.");
    }
});

