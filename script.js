
// CÓNDOR ROJO - ASTROSHARKS WEBSITE

// Add the game link when it is published.
const SITE_CONFIG = {
    gameUrl: ""
};

// ELEMENTS
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const languageBtn = document.getElementById("languageBtn");
const progress = document.getElementById("scrollProgress");

// MOBILE MENU
menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

// CLOSE MENU AFTER CLICKING A LINK
mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// ENGLISH / SPANISH TRANSLATOR
let currentLanguage = "en";

languageBtn.addEventListener("click", function () {

    if (currentLanguage === "en") {
        currentLanguage = "es";
        languageBtn.textContent = "EN";
    } else {
        currentLanguage = "en";
        languageBtn.textContent = "ES";
    }

    document.documentElement.lang = currentLanguage;

    const translatedElements = document.querySelectorAll(
        "[data-en][data-es]"
    );

    translatedElements.forEach(function (element) {
        element.textContent = element.getAttribute(
            "data-" + currentLanguage
        );
    });

    // Translate accessible text and the meta description as well.
    document.querySelectorAll("[data-alt-en][data-alt-es]").forEach(function (img) {
        img.alt = img.getAttribute("data-alt-" + currentLanguage);
    });

    document.querySelectorAll("[data-aria-label-en][data-aria-label-es]").forEach(function (element) {
        element.setAttribute("aria-label", element.getAttribute("data-aria-label-" + currentLanguage));
    });

    const description = document.querySelector('meta[name="description"]');
    if (description && description.hasAttribute("data-description-" + currentLanguage)) {
        description.setAttribute("content", description.getAttribute("data-description-" + currentLanguage));
    }

});

// GAME LINK
if (SITE_CONFIG.gameUrl !== "") {
    document.querySelectorAll(".play-link").forEach(function (link) {
        link.href = SITE_CONFIG.gameUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });
}

// CURRENT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// SCROLL PROGRESS BAR
function updateProgress() {
    const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    let percentage = 0;

    if (totalHeight > 0) {
        percentage = (window.scrollY / totalHeight) * 100;
    }

    progress.style.width = percentage + "%";
}

window.addEventListener("scroll", updateProgress, {
    passive: true
});

updateProgress();

// SCROLL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.08
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}
