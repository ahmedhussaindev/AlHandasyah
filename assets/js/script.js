//==============================
//      DEFINING VARIABLES
//==============================

// HEADER & NAVS
const menuButton = document.querySelector("#mobile-menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const hamburgerLines = document.querySelectorAll(".hamburger-line");

//===============================
// HUMBURGER BUTTON & MOBILE NAV
//===============================
menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("max-h-0");
    mobileMenu.classList.toggle("max-h-96");

    mobileMenu.classList.toggle("opacity-0");
    mobileMenu.classList.toggle("opacity-100");

    const isOpen = mobileMenu.classList.contains("max-h-96");

    menuButton.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        // Top line
        hamburgerLines[0].classList.add(
            "rotate-45",
            "top-1/2",
            "-translate-y-1/2"
        );
        // Middle line
        hamburgerLines[1].classList.add(
            "opacity-0"
        );
        // Bottom line
        hamburgerLines[2].classList.add(
            "-rotate-45",
            "bottom-1/2",
            "translate-y-1/2"
        );
        menuButton.setAttribute("aria-label", "إغلاق القائمة");

    } 
    else {
        // Top line
        hamburgerLines[0].classList.remove(
            "rotate-45",
            "top-1/2",
            "-translate-y-1/2"
        );
        // Middle line
        hamburgerLines[1].classList.remove(
            "opacity-0"
        );
        // Bottom line
        hamburgerLines[2].classList.remove(
            "-rotate-45",
            "bottom-1/2",
            "translate-y-1/2"
        );
        menuButton.setAttribute("aria-label", "فتح القائمة");
    }
});

//===============================
//       MOBILE MENU LINKS
//===============================
const menuLinks = mobileMenu.querySelectorAll("a");

menuLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.add("max-h-0");
        mobileMenu.classList.remove("max-h-96");

        mobileMenu.classList.add("opacity-0");
        mobileMenu.classList.remove("opacity-100");

        menuButton.setAttribute("aria-expanded", "false");

        // Reset hamburger
        hamburgerLines[0].classList.remove(
            "rotate-45",
            "top-1/2",
            "-translate-y-1/2"
        );
        hamburgerLines[1].classList.remove(
            "opacity-0"
        );
        hamburgerLines[2].classList.remove(
            "-rotate-45",
            "bottom-1/2",
            "translate-y-1/2"
        );
        menuButton.setAttribute("aria-label", "فتح القائمة");
    });
});