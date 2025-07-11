// --- Quote Rotation Functionality ---
const quotes = [
    "Ctrl your mind. Alt your path. Del the limits.",
    "Binary vision in an analog world.",
    "Life is a loop — until you break the pattern.",
    "Debugging reality since 2005.",
    "Even the darkest themes hold light in their syntax.",
    "Glitches aren’t flaws. They’re paths to truth.",
    "Beyond grades, beyond norms.",
    "From labs to loops.",
    "Code isn't just logic, it's legacy."
];
let quoteIndex = 0; // Initialize quote index to start from the first quote

// Set an interval to change the quote every 60 seconds (60000 milliseconds)
setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length; // Move to the next quote, loop back to start if at end
    const quoteBox = document.getElementById('quoteBox'); // Get the quote display element

    // Fade out the current quote
    quoteBox.style.opacity = 0;

    // After the fade-out, change the text and fade it back in
    setTimeout(() => {
        quoteBox.innerText = quotes[quoteIndex]; // Update text to the new quote
        quoteBox.style.opacity = 1; // Fade in the new quote
    }, 500); // Wait 500ms (0.5 seconds) for the fade-out to complete before changing text
}, 60000); // Repeat every 60 seconds

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
let aiMessageIndex = 0; // Initialize AI message index

// Set an interval to change the AI tease message every 3 seconds (3000 milliseconds)
setInterval(() => {
    document.getElementById("aiTease").textContent = aiMessages[aiMessageIndex]; // Update text
    aiMessageIndex = (aiMessageIndex + 1) % aiMessages.length; // Move to next message, loop if at end
}, 3000);

// --- Dark Mode Toggle Functionality (Manual Button) ---
let userPrefersDarkMode = false; // Flag to store user's manual preference

function toggleDarkMode() {
    // Toggle the 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode');

    // Update the user's preference flag
    userPrefersDarkMode = document.body.classList.contains('dark-mode');

    // Save the current dark mode preference in local storage
    localStorage.setItem('darkMode', userPrefersDarkMode);
}

// --- Initial Setup on Page Load ---
window.onload = () => {
    // Check local storage for dark mode preference when the page loads
    // This sets the initial state based on user's last choice
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        userPrefersDarkMode = true; // Set flag based on initial load
    } else {
        userPrefersDarkMode = false;
    }

    animateElements(); // Call the function to animate elements (like the terminal text)

    // --- NEW: Scroll-Triggered Dark Mode ("Boom" Effect) ---
    const terminalElement = document.getElementById('terminal'); // Get the terminal div
    let hasScrolledPastTerminal = false; // State variable to track if we've scrolled past the terminal

    window.addEventListener('scroll', () => {
        if (!terminalElement) return; // Exit if terminal element isn't found

        // Get the position of the terminal element relative to the viewport
        // .bottom gives the distance from the top of the viewport to the bottom edge of the element
        const terminalBottom = terminalElement.getBoundingClientRect().bottom;

        // Condition 1: Scroll down and terminal is out of view (past the top of the viewport)
        if (terminalBottom < 0 && !hasScrolledPastTerminal) {
            // "Boom" effect: Add dark mode class
            document.body.classList.add('dark-mode');
            // Optional: Add a temporary class for a faster 'boom' transition if desired
            // document.body.classList.add('fast-transition');
            hasScrolledPastTerminal = true; // Mark that we've scrolled past it
            console.log("Scrolled past terminal: Auto-switching to Dark Mode!"); // For debugging
        }
        // Condition 2: Scroll up and terminal is back in view (or below the top of the viewport)
        else if (terminalBottom >= 0 && hasScrolledPastTerminal) {
            // Remove the dark mode class added by the scroll trigger
            document.body.classList.remove('dark-mode');
            // Optional: Remove the fast transition class
            // document.body.classList.remove('fast-transition');

            // Re-apply the user's manual preference from localStorage
            // This ensures if they had dark mode on initially, it comes back when they scroll up
            if (userPrefersDarkMode) {
                document.body.classList.add('dark-mode');
            }
            hasScrolledPastTerminal = false; // Reset the state
            console.log("Terminal back in view: Reverting to user preference."); // For debugging
        }
    });
};

// --- Text Animation (Scramble Effect) Functionality ---
const ASCII_OF_A = "A".charCodeAt(); // ASCII value of character 'A'
const NO_OF_ALPHABETS = 26; // Number of letters in the English alphabet

// Function to animate a single element
function animateElement(element, originalText, options) {
    let iteration = 0; // Counter for the animation progress

    // If an animation interval is already running for this element, do nothing (prevent multiple animations)
    if (options.interval) return;

    // Start a new interval (animation loop)
    options.interval = setInterval(() => {
        // Generate a new scrambled word:
        // - Split originalText into an array of characters
        // - Map over each character and its index:
        //   - If the current index is less than 'iteration', use the original character (it's "revealed")
        //   - Otherwise, generate a random uppercase letter
        // - Join the characters back into a string
        const newWord = originalText
            .split("")
            .map((_, idx) => idx < iteration ? originalText[idx] : String.fromCharCode(Math.trunc(Math.random() * NO_OF_ALPHABETS) + ASCII_OF_A))
            .join("");

        element.innerText = newWord; // Update the element's text

        iteration += 1; // Increment iteration to reveal more original characters in the next step

        // If all characters have been revealed (iteration exceeds original text length)
        if (iteration > originalText.length) {
            clearInterval(options.interval); // Stop the animation interval
            options.interval = null; // Reset the interval flag
        }
    }, 30); // Run every 30 milliseconds
}

// Function to animate all elements with the 'animate' class
function animateElements() {
    const elements = document.getElementsByClassName("animate"); // Get all elements with class 'animate'

    // Loop through each animating element
    for (const element of elements) {
        const originalText = element.innerText; // Store the original text content
        const options = { interval: null }; // Create an options object to store the interval ID for this element

        // Initial animation when the page loads
        animateElement(element, originalText, options);

        // Add a mouseover event listener to re-trigger the animation
        element.addEventListener("mouseover", (event) => {
            animateElement(event.target, originalText, options);
        });
    }
}










// --- Quote Display Functionality ---
// Your comprehensive list of quotes, now displayed sequentially.
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

let currentQuoteIndex = -1; // Start at -1 so the first call to displayNextQuote() shows index 0
let quoteIntervalId; // To store the ID of the setInterval for automatic rotation

// Function to display the next quote in sequence
function displayNextQuote() {
    const quoteBox = document.getElementById('quoteBox');
    if (!quoteBox) { // Robustness check: Ensure element exists
        console.error("Error: 'quoteBox' element not found. Cannot display quote.");
        return; // Exit function if element is missing
    }

    // Increment index, and loop back to 0 if we reach the end of the array
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

    // Fade out the current quote
    quoteBox.style.opacity = 0;
    console.log(`Displaying quote #${currentQuoteIndex}: "${quotes[currentQuoteIndex].substring(0, 30)}..."`); // Log which quote is next

    // After the fade-out, change the text and fade it back in
    setTimeout(() => {
        quoteBox.innerText = quotes[currentQuoteIndex]; // Update text to the next sequential quote
        quoteBox.style.opacity = 1; // Fade in the new quote
    }, 500); // Wait 500ms (0.5 seconds) for the fade-out to complete before changing text
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
let aiMessageIndex = 0; // Initialize AI message index

// Set an interval to change the AI tease message every 3 seconds (3000 milliseconds)
setInterval(() => {
    const aiTeaseElement = document.getElementById("aiTease");
    if (!aiTeaseElement) { // Robustness check
        console.error("Error: 'aiTease' element not found for AI messages.");
        return;
    }
    aiTeaseElement.textContent = aiMessages[aiMessageIndex]; // Update text
    aiMessageIndex = (aiMessageIndex + 1) % aiMessages.length; // Move to next message, loop if at end
}, 3000);

// --- Dark Mode Toggle Functionality (Manual Button) ---
let userPrefersDarkMode = false; // Flag to store user's manual preference

function toggleDarkMode() {
    // Attempt to toggle dark mode class
    document.body.classList.toggle('dark-mode');

    // Update the user's preference flag
    userPrefersDarkMode = document.body.classList.contains('dark-mode');

    // Save the current dark mode preference in local storage
    try {
        localStorage.setItem('darkMode', userPrefersDarkMode);
        console.log("Dark mode preference saved to localStorage:", userPrefersDarkMode);
    } catch (e) {
        console.error("Error saving dark mode preference to localStorage:", e);
    }
}

// --- Initial Setup on Page Load ---
window.onload = () => {
    console.log("Window loaded. Initializing script.");

    // Check local storage for dark mode preference when the page loads
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
        userPrefersDarkMode = false; // Default to light if localStorage fails
    }


    animateElements(); // Call the function to animate elements (like the terminal text)

    // --- Quote Display Initialization ---
    if (quotes.length > 0) { // Ensure there are quotes to display
        displayNextQuote(); // Display the first quote immediately on load
        quoteIntervalId = setInterval(displayNextQuote, 60000); // Auto-rotate every 60 seconds
        console.log("Quote display initialized.");
    } else {
        console.warn("No quotes found in the 'quotes' array. Quote display will not function.");
    }


    // Add event listener to the new quote button
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

    // --- Scroll-Triggered Dark Mode Effect ---
    const terminalElement = document.getElementById('terminal');
    let hasScrolledPastTerminal = false;

    if (terminalElement) { // Robustness check
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

                if (userPrefersDarkMode) {
                    document.body.classList.add('dark-mode');
                }
                hasScrolledPastTerminal = false;
                console.log("Terminal back in view: Reverting to user preference.");
            }
        });
    } else {
        console.error("Error: 'terminal' element not found. Scroll-triggered dark mode will not function.");
    }
};

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
        animateElement(element, originalText, options);
        element.addEventListener("mouseover", (event) => {
            animateElement(event.target, originalText, options);
        });
    }
}
