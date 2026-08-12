//==============================
//      DEFINING VARIABLES
//==============================

// HEADER & NAVS
const menuButton = document.querySelector("#mobile-menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const hamburgerLines = document.querySelectorAll(".hamburger-line");

//  FAQ
const faqItems = document.querySelectorAll(".faq-item");


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
        hamburgerLines[0].classList.remove(
            "h-0.75"
        );
        hamburgerLines[0].classList.add(
            "rotate-45",
            "top-1/2",
            "-translate-y-1/2",
            "h-0.5"
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
            "-translate-y-1/2",
            "h-0.5"
        );
        hamburgerLines[0].classList.add(
            "h-0.75"
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
            "-translate-y-1/2",
            "h-0.5"
        );
        hamburgerLines[0].classList.add(
            "h-0.75"
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


//==============================
//         FAQ SECTION
//==============================
faqItems.forEach((item) => {

    const button = item.querySelector(".faq-button");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";

        // Close current item
        button.setAttribute("aria-expanded", !isOpen);

        if (isOpen) {
            answer.classList.remove("grid-rows-[1fr]");
            answer.classList.add("grid-rows-[0fr]");

            icon.classList.remove("rotate-180");
        }
        else {
            answer.classList.remove("grid-rows-[0fr]");
            answer.classList.add("grid-rows-[1fr]");

            icon.classList.add("rotate-180");
        }
    });
});

//==============================
//       CONTACT FORM
//==============================

const contactForm = document.querySelector("#contact-form");
const phoneInput = document.querySelector("#phone");
const phoneError = document.querySelector("#phone-error");

const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;


//==============================
//      PHONE VALIDATION
//==============================

phoneInput.addEventListener("input", () => {

    // Allow numbers only
    phoneInput.value = phoneInput.value.replace(/\D/g, "");

    const phone = phoneInput.value;

    // Empty input
    if (phone.length === 0) {

        phoneError.classList.add("hidden");
        phoneInput.classList.remove("border-red-300");

        return;
    }


    // Invalid Egyptian phone number
    if (!egyptianPhoneRegex.test(phone)) {

        phoneError.classList.remove("hidden");
        phoneInput.classList.add("border-red-300");

    }

    // Valid Egyptian phone number
    else {

        phoneError.classList.add("hidden");
        phoneInput.classList.remove("border-red-300");

    }

});


//==============================
//       FORM SUBMISSION
//==============================
contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const phone = phoneInput.value.trim();

    // Validate phone before submission
    if (!egyptianPhoneRegex.test(phone)) {

        phoneError.classList.remove("hidden");
        phoneInput.classList.add("border-red-300");

        return;
    }

    // WhatsApp message
    const message = `
            السلام عليكم،
            لدي استفسار بخصوص وحدات الهندسية.

            الاسم: ${name}
            رقم الهاتف: ${phone}
            `;

    // Your WhatsApp number
    const whatsappNumber = "201150182048";

    // Create WhatsApp URL
    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Reset form
    contactForm.reset();

    // Reset phone validation UI
    phoneError.classList.add("hidden");
    phoneInput.classList.remove("border-red-300");
});



// ===============================
//       Active Navigation
// ===============================
const navLinks = document.querySelectorAll('header .nav-link[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

// Remove active state
function removeActiveLinks() {
    navLinks.forEach((link) => {
        link.classList.remove("text-primary", "font-semibold");
    });
}

// Add active state
function setActiveLink(id) {
    removeActiveLinks();

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("text-primary", "font-semibold");
        }
    });
}

// ================================
//  Detect section while scrolling
// ================================

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    },
    {
        root: null,
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0
    }
);
sections.forEach((section) => {
    observer.observe(section);
});


// ===============================
// Active state when clicking
// ===============================

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const targetId = link
            .getAttribute("href")
            .replace("#", "");
        setActiveLink(targetId);
    });
});