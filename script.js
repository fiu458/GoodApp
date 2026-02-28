document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll("main section[id]");
    const revealItems = document.querySelectorAll(".reveal");
    const yearEl = document.getElementById("year");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            const expanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!expanded));
            navLinks.classList.toggle("open");
        });

        sectionLinks.forEach((link) => {
            link.addEventListener("click", () => {
                menuButton.setAttribute("aria-expanded", "false");
                navLinks.classList.remove("open");
            });
        });

        document.addEventListener("click", (event) => {
            if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
                menuButton.setAttribute("aria-expanded", "false");
                navLinks.classList.remove("open");
            }
        });
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const linkMap = new Map();
    sectionLinks.forEach((link) => {
        const id = link.getAttribute("href").slice(1);
        linkMap.set(id, link);
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");
                const link = linkMap.get(id);
                if (!link) {
                    return;
                }

                if (entry.isIntersecting) {
                    sectionLinks.forEach((item) => item.classList.remove("active"));
                    link.classList.add("active");
                }
            });
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
});
