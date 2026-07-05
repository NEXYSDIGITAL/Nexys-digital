/**
 * NEXYS DIGITAL // Front-End Functional Operations Engine
 * Vanilla architecture implementing core UI events, scroll reveals, and active tracking matrices.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // MOBILE RESPONSIVE HAMBURGER NAVIGATION INTERFACE
    // ==========================================
    const mobileTrigger = document.getElementById("mobileTrigger");
    const navMenu = document.getElementById("navMenu");
    const navAnchors = document.querySelectorAll(".nav-item");

    if (mobileTrigger && navMenu) {
        // Toggle mobile flyout display layers
        mobileTrigger.addEventListener("click", () => {
            mobileTrigger.classList.toggle("open");
            navMenu.classList.toggle("open");
            
            // Prevent body line scroll processing behind the full overlay menu
            if (navMenu.classList.contains("open")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close menu array structure when selecting individual section coordinates
        navAnchors.forEach(anchor => {
            anchor.addEventListener("click", () => {
                mobileTrigger.classList.remove("open");
                navMenu.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }

    // ==========================================
    // PERFORMANCE-DRIVEN INTERSECTION OBSERVER FOR SCROLL REVEALS
    // ==========================================
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const observerOptions = {
        root: null, // Viewport-relative calculations
        threshold: 0.05, // Fire trigger safely as element edges arrive
        rootMargin: "0px 0px -40px 0px" // Bottom safety padding matrix
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Terminate observation stream for this node once deployed safely
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // INTERACTIVE NAVIGATION ACTIVE-STATE ANCHOR MATRIX SWITCHER
    // ==========================================
    const sectionElements = document.querySelectorAll("header[id], section[id]");
    const navItemsArray = document.querySelectorAll(".nav-item");

    const sectionTrackingObserverOptions = {
        root: null,
        threshold: 0.25, // Active node identification trigger
        rootMargin: "-20% 0px -60% 0px" // Screen focal center frame
    };

    const sectionTrackingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const globalCurrentSectionId = entry.target.getAttribute("id");
                
                navItemsArray.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${globalCurrentSectionId}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, sectionTrackingObserverOptions);

    sectionElements.forEach(section => {
        sectionTrackingObserver.observe(section);
    });
});