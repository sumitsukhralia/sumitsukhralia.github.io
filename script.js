// --- GLOBAL VARIABLES AND HELPER FUNCTIONS ---
// These are functions and data that can be used anywhere in your script.

// --- NEW: Multi-Language Greeting Animation ---
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
const multiGreetingFadeDuration = 600; // Time for each greeting to fade in/out
const multiGreetingDisplayDuration = 1000; // How long each greeting is visible (1 second)
let greetingCycleCount = 0; // To track how many greetings have cycled
let maxGreetingCycles = 2; // How many greetings to show on preloader (e.g., 2-3)
let greetingIntervalId; // To store the interval for clearing

function cycleMultiGreetingsOnPreloader() {
    const animatedGreetingElement = document.getElementById('animated-greeting');
    if (!animatedGreetingElement) return;

    // Stop the cycle if we've shown enough greetings or if the preloader is already fading
    if (greetingCycleCount >= maxGreetingCycles) {
        clearInterval(greetingIntervalId); // Stop the cycling
        return;
    }

    animatedGreetingElement.classList.remove('greeting-fade-in');
    animatedGreetingElement.classList.add('greeting-fade-out');

    setTimeout(() => {
        currentMultiGreetingIndex = (currentMultiGreetingIndex + 1) % greetings.length;
        animatedGreetingElement.textContent = greetings[currentMultiGreetingIndex];

        animatedGreetingElement.classList.remove('greeting-fade-out');
        animatedGreetingElement.classList.add('greeting-fade-in');

        greetingCycleCount++; // Increment count after a full cycle (fade-out + fade-in)

        // Schedule the next cycle if still within max cycles
        if (greetingCycleCount < maxGreetingCycles) {
            greetingIntervalId = setTimeout(cycleMultiGreetingsOnPreloader, multiGreetingDisplayDuration + multiGreetingFadeDuration);
        }

    }, multiGreetingFadeDuration);
}


// --- Quote Display Functionality ---
const quotes = [
    "Darkness teaches what light hides.",
    "Silence says more than noise ever could.",
    "Not all storms come to disrupt — some clear your path.",
    "The shadows know your secrets.",
    "Lost time whispers truths you ignored.",
    "The more you see, the less you trust.",
    "Loneliness sharpens the mind.",
    "Some doors only open once.",
    "Ghosts live in memories we revisit.",
    "You become what you feed your mind.",
    "Still waters drown deeper secrets.",
    "Trust the quiet ones — they notice everything.",
    "Chaos hides in routine.",
    "A lie repeated is a truth forgotten.",
    "Some scars glow in the dark.",
    "The cost of freedom is solitude.",
    "Words heal; silence breaks.",
    "You fear what you refuse to face.",
    "The cage is open — the mind stays locked.",
    "Mirrors never lie — they just wait.",
    "We chase time, but it buries us.",
    "Dreams remember what you forget.",
    "Unspoken words weigh the most.",
    "Fear is a story we tell ourselves.",
    "You break to rebuild stronger.",
    "Some endings free you.",
    "Shadows grow when the sun sets.",
    "Pain makes poets of us all.",
    "The truth is patient.",
    "Destiny whispers — noise ignores.",
    "Some people are storms disguised as calm seas.",
    "Light attracts darkness.",
    "Solitude builds empires within.",
    "Answers hide in silence.",
    "The past always finds its echo.",
    "Your demons know your name.",
    "What you run from stays closer.",
    "Secrets poison slowly.",
    "Bruises fade, lessons stay.",
    "Hunger feeds the wild inside.",
    "Some flowers only bloom in the dark.",
    "Stars die to be seen.",
    "Wolves don’t lose sleep over sheep.",
    "Even broken clocks tell time twice.",
    "Hope is rebellion.",
    "Monsters are born in neglected corners.",
    "Only the lost find hidden roads.",
    "What you bury grows roots.",
    "Trust your shadows — they never leave.",
    "Storms cleanse more than they destroy.",
    "The void listens.",
    "Not every map shows the way out.",
    "Fire teaches what ice forgets.",
    "Some eyes hide entire universes.",
    "You dig your grave daily.",
    "Stillness is the loudest roar.",
    "Destiny bends to the brave.",
    "Nothing haunts like almost.",
    "The mind is a maze with no exits.",
    "Words taste different in the dark.",
    "The moon keeps secrets daylight denies.",
    "Trust breaks without sound.",
    "Every scar is a page in your story.",
    "Some souls wear borrowed faces.",
    "Silence is loyalty to the self.",
    "Broken wings remember flight.",
    "The truth hides in half-said things.",
    "Code whispers what logic screams.",
    "The bug you ignore haunts your nights.",
    "Silence is the best debugger.",
    "One semicolon can break empires.",
    "Errors are teachers in disguise.",
    "Great devs trust the unseen.",
    "A single line can change your fate.",
    "Sleep is a myth when curiosity lives.",
    "Shadows exist in code too.",
    "Build alone, launch together.",
    "Code is poetry for machines.",
    "The compiler never lies.",
    "Trust your logic, question your assumptions.",
    "Some loops never end — like regret.",
    "Debugging is a mirror for the mind.",
    "Clarity is rarer than syntax.",
    "Comments are confessions to the future.",
    "If it works, you missed something.",
    "The mind compiles what the heart ignores.",
    "Version 1 is a graveyard of mistakes.",
    "Deadlines kill perfection.",
    "Creativity hides behind broken code.",
    "Stack Overflow knows your secrets.",
    "Some bugs are features waiting to be named.",
    "Dark mode, deep thoughts.",
    "Broken code builds better coders.",
    "Code alone, ship loud.",
    "Push your limits like you push commits.",
    "You write bugs before you write brilliance.",
    "Genius hides in drafts.",
    "Trust your repo, distrust your ego.",
    "Night owls build tomorrow’s empires.",
    "Data never lies — but people do.",
    "Syntax is simple — logic is chaos.",
    "Hack your fears, deploy your courage.",
    "If you can’t break it, you don’t own it.",
    "Scripts sleep — logic never does.",
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


// --- AI Tease Text Rotation Functionality ---
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
let aiIntervalId; // Declared globally so we can clear it later if needed


// --- Dark Mode Toggle Functionality (Manual Button) ---
let userPrefersDarkMode = false; // Flag to store user's manual preference

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


// --- Typing Effect for Name and Tagline ---
const nameText = "Sumit Sukhralia"; // Customize this!
const skillText = "awesome web experiences."; // Customize this!

function typeWriterEffect(element, text, speed, callback) {
    let i = 0;
    element.textContent = ''; // Clear existing text
    element.classList.add('typing-cursor'); // Add cursor for typing effect

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor'); // Remove cursor after typing
            if (callback) {
                callback(); // Execute callback if provided
            }
        }
    }
    type();
}


// --- Text Animation (Scramble Effect) Functionality ---
const ASCII_OF_A = "A".charCodeAt();
const NO_OF_ALPHABETS = 26;

function animateElement(element, originalText, options) {
    let iteration = 0;
    if (options.interval) return; // Prevent multiple intervals for the same element
    options.interval = setInterval(() => {
        const newWord = originalText
            .split("")
            .map((_, idx) => idx < iteration ? originalText[idx] : String.fromCharCode(Math.trunc(Math.random() * NO_OF_ALPHABETS) + ASCII_OF_A))
            .join("");
        element.innerText = newWord;
        iteration += 1;
        if (iteration > originalText.length) {
            clearInterval(options.interval);
            options.interval = null; // Reset interval ID
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
        const options = { interval: null }; // Pass options object to manage interval
        animateElement(element, originalText, options);
        element.addEventListener("mouseover", (event) => {
            animateElement(event.target, originalText, options);
        });
    }
}


// --- Scroll Reveal Animation for SECTIONS (Intersection Observer) ---
// Make sure your HTML sections have the 'scroll-reveal' class
const sections = document.querySelectorAll('.scroll-reveal');
const skillBars = document.querySelectorAll('.skill-bar-fill'); // Assuming you have skill bars with this class

const sectionOptions = {
    threshold: 0.1, // Trigger when 10% of the section is visible
    rootMargin: "0px"
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add 'visible' class for animations
            if (entry.target.id === 'skills-section') { // Assuming your skills section has ID 'skills-section'
                animateSkillBars();
            }
            // observer.unobserve(entry.target); // Uncomment to animate only once
        } else {
            // entry.target.classList.remove('visible'); // Uncomment to re-hide when scrolling away
        }
    });
}, sectionOptions);

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.dataset.width; // Assuming width is stored in data-width attribute
        if (width) {
            bar.style.width = width;
            bar.style.opacity = 1; // Fade in the bar
        }
    });
}


// --- MAIN PAGE LOAD INITIALIZATION ---
// This runs once the entire page (HTML, CSS, images, etc.) has loaded.
window.onload = () => {
    console.log("Window loaded. Initializing script.");

    // --- 1. Get Element References (Crucial for all animations) ---
    const preloader = document.getElementById('preloader');
    const animatedGreetingElement = document.getElementById('animated-greeting');
    const parallaxBg = document.getElementById('parallax-bg');
    const nameEl = document.getElementById('typing-name');
    const skillEl = document.getElementById('typing-skill');


    // --- Load Dark Mode preference from localStorage ---
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


    // --- 2. Start Multi-Language Greeting Animation on Preloader ---
    if (animatedGreetingElement && greetings.length > 0) {
        animatedGreetingElement.textContent = greetings[currentMultiGreetingIndex];
        setTimeout(() => {
            animatedGreetingElement.classList.add('greeting-fade-in');
            cycleMultiGreetingsOnPreloader(); // Starts the looping of greetings
        }, 100); // Small delay before first greeting fades in
    } else {
        console.warn("Multi-language greeting element or greetings array not found.");
    }


    // --- 3. Define Preloader Duration & Start Fade-Out ---
    // This is the total time the preloader stays visible BEFORE it starts fading out.
    const preloaderDisplayDuration = 2000; // 2 seconds before fade-out starts

    setTimeout(() => {
        // Fade out the preloader screen
        if (preloader) {
            preloader.classList.add('fade-out');
            console.log("Preloader fading out...");
        } else {
            console.error("Error: Preloader element not found.");
        }

        // Show the main parallax background as preloader fades
        if (parallaxBg) {
            parallaxBg.classList.add('show');
            console.log("Parallax background starting...");
        } else {
            console.error("Error: Parallax background element not found.");
        }

        // --- 4. Start Main Content Animations (AFTER Preloader Fades) ---
        // This nested timeout starts your other main animations
        // AFTER the preloader has begun its fade-out transition.
        // The 500ms here gives a smooth transition for elements to appear.
        setTimeout(() => {
            // Typing Effect Initialization
            if (nameEl && skillEl) {
                typeWriterEffect(nameEl, nameText, 80, () => {
                    setTimeout(() => {
                        typeWriterEffect(skillEl, skillText, 60);
                    }, 500); // Small pause before skill starts
                });
            } else {
                console.warn("Name or Skill typing elements not found. Typing effect will not run.");
            }

            // Text Scramble Animation (e.g., for elements with class 'animate')
            animateElements();

            // Quote Display Initialization
            if (quotes.length > 0) {
                displayNextQuote();
                quoteIntervalId = setInterval(displayNextQuote, 60000); // Auto-rotate every 60 seconds
                console.log("Quote display initialized.");
            } else {
                console.warn("No quotes found in the 'quotes' array. Quote display will not function.");
            }

            // AI Tease Text Rotation Initialization
            aiIntervalId = setInterval(() => {
                const aiTeaseElement = document.getElementById("aiTease");
                if (!aiTeaseElement) {
                    console.error("Error: 'aiTease' element not found for AI messages. Stopping AI tease.");
                    clearInterval(aiIntervalId);
                    return;
                }
                aiTeaseElement.textContent = aiMessages[aiMessageIndex];
                aiMessageIndex = (aiMessageIndex + 1) % aiMessages.length;
            }, 3000);
            console.log("AI Tease text rotation initialized.");

        }, 500); // This delay allows the preloader's fade-out to begin before main animations start

    }, preloaderDisplayDuration); // This is the main delay for the preloader to disappear


    // --- Add event listener to the "New Quote" button ---
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            console.log("New Quote button clicked.");
            displayNextQuote();
            // Optional: You might want to reset the auto-rotation timer here
            // clearInterval(quoteIntervalId);
            // quoteIntervalId = setInterval(displayNextQuote, 60000);
        });
    } else {
        console.error("Error: 'newQuoteBtn' element not found. Quote button functionality will not work.");
    }


    // --- Scroll-Triggered Dark Mode Effect ---
    const terminalElement = document.getElementById('terminal'); // Assuming you have a 'terminal' element for this effect
    let hasScrolledPastTerminal = false;

    if (terminalElement) {
        console.log("Terminal element found for scroll-triggered dark mode.");
        window.addEventListener('scroll', () => {
            const terminalBottom = terminalElement.getBoundingClientRect().bottom;

            if (terminalBottom < 0 && !hasScrolledPastTerminal) {
                document.body.classList.add('dark-mode');
                // document.body.classList.add('fast-transition'); // Uncomment if you add this CSS class
                hasScrolledPastTerminal = true;
                console.log("Scrolled past terminal: Auto-switching to Dark Mode!");
            } else if (terminalBottom >= 0 && hasScrolledPastTerminal) {
                document.body.classList.remove('dark-mode');
                // document.body.classList.remove('fast-transition'); // Uncomment if you add this CSS class

                if (userPrefersDarkMode) { // Revert to user's saved preference if they preferred dark mode
                    document.body.classList.add('dark-mode');
                }
                hasScrolledPastTerminal = false;
                console.log("Terminal back in view: Reverting to user preference.");
            }
        });
    } else {
        console.error("Error: 'terminal' element not found. Scroll-triggered dark mode will not function.");
    }


    // --- Activate Scroll Reveal Animation for SECTIONS ---
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate Skill Bars is handled by the sectionObserver when the skills section comes into view.

}; // END of window.onload
