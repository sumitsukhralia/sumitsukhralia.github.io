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

// --- Dark Mode Toggle Functionality ---
function toggleDarkMode() {
    // Toggle the 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode');

    // Save the current dark mode preference in local storage
    // localStorage.setItem stores data as key-value pairs in the browser
    // document.body.classList.contains('dark-mode') returns true if 'dark-mode' class is present, false otherwise
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// --- Initial Setup on Page Load ---
window.onload = () => {
    // Check local storage for dark mode preference when the page loads
    if (localStorage.getItem('darkMode') === 'true') {
        // If 'darkMode' was true, add the 'dark-mode' class to the body
        document.body.classList.add('dark-mode');
    }

    // Call the function to animate elements (like the terminal text) when the page loads
    animateElements();

    // --- Scroll-Triggered Dark Mode Effect ---
    // This effect applies dark mode when scrolling past a certain point
    window.addEventListener('scroll', () => {
        const darkSection = document.getElementById('scroll-dark-section');
        // If the trigger element doesn't exist, exit the function
        if (!darkSection) return;

        // Get the vertical position of the scroll trigger element
        const threshold = darkSection.offsetTop;

        // If current scroll position is past the threshold (minus 100px buffer)
        if (window.scrollY >= threshold - 100) {
            document.body.classList.add('dark-mode'); // Apply dark mode
        } else {
            document.body.classList.remove('dark-mode'); // Remove dark mode
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
