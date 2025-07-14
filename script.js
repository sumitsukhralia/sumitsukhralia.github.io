document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Terminal Overlay Elements ---
    const introOverlay = document.getElementById('intro-overlay');
    const introTypingOutput = document.getElementById('intro-typing-output');
    const introProceedButton = document.getElementById('intro-proceed-button');
    const introTransitionSky = document.getElementById('intro-transition-sky'); // This will be a solid color now
    const introTerminalContent = document.querySelector('.intro-terminal-content'); // For fading out
    const mainContentWrapper = document.getElementById('main-content-wrapper');

    // --- NEW: Parallax Elements (for the 'About Me' section) ---
    const parallaxContainer = document.querySelector('.parallax-container');
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const contentLayers = document.querySelectorAll('.content-layer');

    // --- NEW: Terminal Typing Logic ---
    const fullIntroText = "Want to know about me more?";
    let introCharIndex = 0;
    const introTypingSpeed = 70; // milliseconds per character

    function typeIntroText() {
        if (introCharIndex < fullIntroText.length) {
            introTypingOutput.textContent += fullIntroText.charAt(introCharIndex);
            introCharIndex++;
            setTimeout(typeIntroText, introTypingSpeed);
        } else {
            // Typing finished, show button after a short delay
            setTimeout(() => {
                introProceedButton.classList.remove('intro-hidden');
                let opacity = 0;
                const fadeInInterval = setInterval(() => {
                    if (opacity < 1) {
                        opacity += 0.05;
                        introProceedButton.style.opacity = opacity;
                    } else {
                        clearInterval(fadeInInterval);
                    }
                }, 50);
            }, 1000); // Wait 1 second after typing
        }
    }

    // --- NEW: Terminal Interaction & Transition ---
    introProceedButton.addEventListener('click', () => {
        // Hide terminal content with animation
        introTerminalContent.style.opacity = 0;
        introTerminalContent.style.transition = 'opacity 1s ease-out';

        // Activate sky background beneath terminal content (will be a solid color)
        introTransitionSky.classList.add('active');

        // After sky is visible, remove terminal overlay and show main content
        setTimeout(() => {
            introOverlay.classList.add('fade-out'); // Fade out the entire overlay
            
            // Allow scrolling on body once overlay is gone
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            document.body.style.visibility = 'visible'; // Make body visible
            document.body.style.opacity = '1'; // Fade in body

            mainContentWrapper.classList.remove('hidden'); // Ensure main content wrapper isn't explicitly hidden
            mainContentWrapper.classList.add('active'); // Fade in main content

        }, 1500); // Match this to intro-transition-sky's CSS transition duration
    });

    // --- NEW: Parallax Logic (for the 'About Me' section) ---

    // Apply the necessary scale transformation based on translateZ for proper perspective
    function applyParallaxScale() {
        if (!parallaxContainer) return;

        if (window.innerWidth > 768) { // Only apply 3D transforms if screen is wider than 768px
            parallaxLayers.forEach(layer => {
                const currentTransform = layer.style.transform || '';
                const translateZMatch = currentTransform.match(/translateZ\((-?\d+\.?\d*)px\)/);
                
                if (translateZMatch && translateZMatch[1]) {
                    const translateZ = parseFloat(translateZMatch[1]);
                    const scaleValue = 1 + (translateZ * -1); 
                    layer.style.transform = `translateZ(${translateZ}px) scale(${scaleValue})`;
                } else {
                    layer.style.transform = `scale(1)`;
                }
            });
        }
    }

    // Handle scrolling for parallax and content visibility
    window.addEventListener('scroll', () => {
        if (!mainContentWrapper.classList.contains('active') || !parallaxContainer) {
            return; 
        }

        const scrollTop = window.pageYOffset;
        const parallaxContainerRect = parallaxContainer.getBoundingClientRect();
        const scrollInsideParallax = scrollTop - (parallaxContainerRect.top + scrollTop);

        if (window.innerWidth > 768) {
            parallaxLayers.forEach(layer => {
                const currentTransform = layer.style.transform || '';
                const translateZMatch = currentTransform.match(/translateZ\((-?\d+\.?\d*)px\)/);
                if (translateZMatch && translateZMatch[1]) {
                    const translateZ = parseFloat(translateZMatch[1]);
                    
                    if (scrollInsideParallax >= 0 && scrollInsideParallax < parallaxContainer.offsetHeight) {
                       layer.style.transform = `translateZ(${translateZ}px) scale(${1 + (translateZ * -1)}) translateY(${scrollInsideParallax * translateZ * -1}px)`;
                    } else {
                        layer.style.transform = `translateZ(${translateZ}px) scale(${1 + (translateZ * -1)}) translateY(0px)`;
                    }
                }
            });
        }

        // Content Visibility on Scroll (Fade-in effect for content layers)
        contentLayers.forEach(layer => {
            const rect = layer.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
                layer.classList.add('is-visible');
            }
        });
    });

    // --- NEW: Initializations for the Intro and Parallax ---
    typeIntroText(); // Re-enable intro typing
    if (parallaxContainer) {
        applyParallaxScale();
    }


    // --- YOUR ORIGINAL script.js CONTENT (Integrated and Adjusted) ---
    // Make sure all your original functions and initializations are here.
    // This section starts from your 'quotes' array and goes to the end.
    
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
        setTimeout(() => {
            quoteBox.innerText = quotes[currentQuoteIndex];
            quoteBox.style.opacity = 1;
        }, 500);
    }

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

    let userPrefersDarkMode = false;

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        userPrefersDarkMode = document.body.classList.contains('dark-mode');
        try {
            localStorage.setItem('darkMode', userPrefersDarkMode);
        } catch (e) {
            console.error("Error saving dark mode preference to localStorage:", e);
        }
    }

    try {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            userPrefersDarkMode = true;
        } else {
            userPrefersDarkMode = false;
        }
    } catch (e) {
        console.error("Error loading dark mode preference from localStorage:", e);
        userPrefersDarkMode = false;
    }

    animateElements(); // Your text scramble animation

    if (quotes.length > 0) {
        displayNextQuote();
        quoteIntervalId = setInterval(displayNextQuote, 60000);
    }

    const newQuoteBtn = document.getElementById('newQuoteBtn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            displayNextQuote();
        });
    }

    // --- Text Animation (Scramble Effect) Functionality ---
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
            element.addEventListener("mouseover", (event) => {
                animateElement(event.target, originalText, options);
            });
        }
    }

    const toggleDarkModeBtn = document.querySelector('.toggle-dark');
    if (toggleDarkModeBtn) {
        toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
    } else {
        console.error("Error: Dark mode toggle button '.toggle-dark' not found.");
    }

}); // End of DOMContentLoaded
