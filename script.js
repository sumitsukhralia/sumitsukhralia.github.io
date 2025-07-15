// --- Dark Mode Toggle Functionality ---
// This function is called when the "Dark Mode" button is clicked.
function toggleDarkMode() {
    // Toggles the 'dark-mode' class on the <body> element.
    // If 'dark-mode' is present, it removes it; if absent, it adds it.
    document.body.classList.toggle('dark-mode');

    // Save the current dark mode preference to the browser's local storage.
    // localStorage.setItem stores data as key-value pairs.
    // document.body.classList.contains('dark-mode') returns true if the class is present, false otherwise.
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    console.log("Dark mode preference saved:", isDarkMode); // Log for debugging

    // Update the icon on the toggle button (moon for light, sun for dark)
    const icon = document.querySelector('.toggle-dark i'); // Get the <i> element (icon) inside the button
    if (icon) { // Check if the icon element exists
        if (isDarkMode) {
            icon.classList.remove('fa-moon'); // Remove moon icon
            icon.classList.add('fa-sun'); // Add sun icon
        } else {
            icon.classList.remove('fa-sun'); // Remove sun icon
            icon.classList.add('fa-moon'); // Add moon icon
        }
    } else {
        console.warn("Dark mode toggle icon not found."); // Warn if icon element is missing
    }
}

// --- Page Initialization (runs when the HTML content is fully loaded) ---
// document.addEventListener('DOMContentLoaded') is generally preferred over window.onload
// because it fires as soon as the DOM is ready, without waiting for images/stylesheets.
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded. Initializing script.");

    // --- Check for Saved Dark Mode Preference on Load ---
    try {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') { // If the saved preference is 'true' (as a string)
            document.body.classList.add('dark-mode'); // Apply dark mode class
            // Also update the button icon immediately on load to reflect the saved state
            const icon = document.querySelector('.toggle-dark i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            console.log("Loaded dark mode preference from localStorage: ON");
        } else {
            console.log("Loaded dark mode preference from localStorage: OFF (or not set)");
        }
    } catch (e) {
        console.error("Error loading dark mode preference from localStorage:", e);
        // Default to light mode if localStorage access fails (e.g., security restrictions)
    }

    // --- Profile Section Scroll Effects (Opacity and Parallax on Image) ---
    const profileSection = document.getElementById('profile'); // Get the main profile section
    const profileImg = document.querySelector('.profile-img'); // Get the profile image

    if (profileSection && profileImg) { // Ensure both elements exist before adding listeners
        console.log("Profile section and image found. Adding scroll effects.");
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY; // Get current vertical scroll position

            // 1. Opacity Fade Effect for Profile Section:
            // Calculates opacity: 1 (fully visible) at top, fades to 0 (invisible) as scrollPosition reaches 500px.
            // Math.min(scrollPosition / 500, 1) ensures the value doesn't go above 1.
            const opacity = 1 - Math.min(scrollPosition / 500, 1);
            profileSection.style.opacity = opacity;
            // Optional: You could also use display: none when opacity is 0 to remove it from flow
            // if (opacity <= 0) { profileSection.style.display = 'none'; } else { profileSection.style.display = 'flex'; }


            // 2. Parallax Effect for Profile Image:
            // Moves the image down at a slower rate (0.3x scroll speed) than the page.
            // This creates a subtle parallax effect on the image itself.
            const translateY = scrollPosition * 0.3;
            profileImg.style.transform = `translateY(${translateY}px)`;
        });
    } else {
        console.warn("Profile section or image not found. Scroll effects not applied.");
    }

    // --- Terminal Text Animation (Scramble Effect on Mouse Enter) ---
    // Selects all elements with the class 'terminal-content'
    document.querySelectorAll('.terminal-content').forEach(terminal => {
        const originalText = terminal.textContent; // Store the original text content of the terminal
        let animationInterval = null; // Variable to hold the interval ID for animation control

        terminal.addEventListener('mouseenter', () => {
            console.log("Mouse entered terminal. Starting scramble animation.");
            if (animationInterval) { // If an animation is already running, clear it first
                clearInterval(animationInterval);
            }

            let iteration = 0; // Counter for how many characters have been "revealed"
            animationInterval = setInterval(() => {
                // Generates the scrambled text:
                // - Splits the original text into an array of characters.
                // - Maps over each character and its index:
                //   - If the current index is less than 'iteration', use the original character (it's "revealed").
                //   - Otherwise, generate a random lowercase letter (ASCII 97 is 'a').
                // - Joins the characters back into a string.
                terminal.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index]; // Keep original character
                        }
                        // Generate a random lowercase letter (ASCII 'a' is 97, 'z' is 122)
                        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                    })
                    .join('');

                // If all characters have been revealed, stop the animation
                if (iteration >= originalText.length) {
                    clearInterval(animationInterval); // Stop the interval
                    animationInterval = null; // Reset the interval ID
                    console.log("Terminal scramble animation complete.");
                }

                iteration += 1; // Move to reveal the next character in the next interval tick
            }, 30); // Run every 30 milliseconds (controls animation speed)
        });

        // Optional: Reset text on mouse leave if you want it to go back to original state
        // terminal.addEventListener('mouseleave', () => {
        //     if (animationInterval) {
        //         clearInterval(animationInterval);
        //         animationInterval = null;
        //     }
        //     terminal.textContent = originalText;
        //     console.log("Mouse left terminal. Resetting text.");
        // });
    });
});

