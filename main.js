// Select the dynamic text element where the typing effect will display
const dynamicText = document.querySelector("#intro-h2 span");

// Array of words for the typing effect
const words = ["Programmer", "Learner", "Enthusiast", "Engineer"];

// Variables to track the current word, character index, and deletion status
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Function to execute the typing effect
const typeEffect = () => {
    // Get the current word based on the word index
    const currentWord = words[wordIndex];

    // Get the part of the word to be displayed based on the character index
    const currentChar = currentWord.substring(0, charIndex);

    // Update the text content of the dynamic text element
    dynamicText.textContent = currentChar;

    // Temporarily stop the blinking cursor effect during typing/deleting
    dynamicText.classList.add("stop-blinking");

    if (!isDeleting && charIndex < currentWord.length) {
        // If not currently deleting and the entire word has not been typed out, type the next character
        charIndex++;
        setTimeout(typeEffect, 200); // Continue the effect with a short delay
    } else if (isDeleting && charIndex > 0) {
        // If currently deleting and there are characters left, remove the last character
        charIndex--;
        setTimeout(typeEffect, 100); // Continue the effect with a shorter delay for deletion
    } else {
        // If the word has been completely typed out or deleted, switch modes
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");

        // Move to the next word if we just finished typing one out, not deleting
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;

        // Pause before starting to type the next word or before starting to delete
        setTimeout(typeEffect, 1200);
    }
};

// Initiate the typing effect when the script loads
typeEffect();




document.querySelector("#scroll-down").addEventListener("click", () => {
    window.scrollTo({
        top: document.querySelector("#about-me").offsetTop - 20,
    });
});

document.querySelector("#toggle-theme").addEventListener("click", () => {
    document.documentElement.classList.toggle("light-theme");
});

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (prefersLight) {
    document.documentElement.classList.add("light-theme");
}

// Tabs Toggle for the Blog section

const tabs = document.querySelectorAll(".tabs .tab");

tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
        // remove highlight from previous active tab
        document.querySelector(".tab.active").classList.remove("active");
        // highlight current tab
        event.currentTarget.classList.add("active");

        // hide the previously visible tab content
        document.querySelector(".tab-content.show").classList.remove("show");

        // get the selector from data-content
        const selector = event.currentTarget.dataset.content;
        // find the related content and show it
        document.querySelector(selector).classList.add("show");
    });
});

// Views Counter
const views = document.querySelector(".side .text--sm");
const getViewsCount = async () => {
    try {

         const response = await fetch(
            "https://rkt4nstjpl7w2xpn6hlba6hc7q0ytbnd.lambda-url.ca-central-1.on.aws"
        );
        if (!response.ok) {
            throw new Error(
                `Http Error: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        views.textContent = `👀 views : ${data}`;
    } catch (error) {
        console.error("An Error has occurred:", error);
        views.textContent = "Faild to load views";
    }
};

getViewsCount();


