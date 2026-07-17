// ==========================================
// Youth Connect Tamil Nadu - Enterprise JS V3
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. Perfect Loader Logic (4 Seconds Dismissal)
    const loader = document.getElementById("loader");
    
    const dismissLoader = () => {
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none"; // பின்னணியில் உள்ள எலிமெண்ட்களை க்ளிக் செய்ய அனுமதிக்கும்
        }
    };

    // பக்கம் முழுமையாக லோடானாலும், அதிகபட்சம் 4 வினாடிகளில் லோடர் தானாக மறைந்துவிடும்
    setTimeout(dismissLoader, 1000);

    // 2. Unified Sidebar & Menu Logic
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuBtn = document.getElementById("menuBtn");

    const toggleSidebar = (state) => {
        const isOpen = state !== undefined ? state : !sidebar.classList.contains("active");
        sidebar.classList.toggle("active", isOpen);
        overlay.classList.toggle("active", isOpen);
        if (menuBtn) menuBtn.classList.toggle("active", isOpen);
    };

    if (menuBtn) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    if (overlay) overlay.addEventListener("click", () => toggleSidebar(false));

    // 3. Dark Mode Configuration
    const themeBtn = document.getElementById("themeBtn");
    
    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.body.classList.add("dark");
            if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove("dark");
            if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    // Local Storage Check
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const isDark = document.body.classList.contains("dark");
            const newTheme = isDark ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }

    // 4. Hero Banner Carousel
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 4000);
    }

    // 5. Dynamic Modal Helper Function
    const configurePopup = (triggerId, panelId, closeId) => {
        const trigger = document.getElementById(triggerId);
        const panel = document.getElementById(panelId);
        const close = document.getElementById(closeId);

        if (trigger && panel) {
            trigger.addEventListener("click", () => panel.classList.add("active"));
        }
        if (close && panel) {
            close.addEventListener("click", () => panel.classList.remove("active"));
        }
    };

    configurePopup("searchBtn", "searchPopup", "closeSearch");
    configurePopup("moreBtn", "notificationPanel", "closeNotification");

    // 6. Smooth Scroll-to-Top (FAB)
    const fab = document.getElementById("fab");
    if (fab) {
        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 7. Advanced Element Viewport Observer (Fade-In Effect)
    const viewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-up");
                viewObserver.unobserve(entry.target); // ஒருமுறை அனிமேட் ஆனதும் கண்காணிப்பதை நிறுத்தும்
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".section, .event-card, .news-card, .campaign-card, .gallery-grid img, .video-card")
        .forEach(element => viewObserver.observe(element));
});


document.addEventListener("DOMContentLoaded", () => {
    const videoCards = document.querySelectorAll(".video-card");
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("youtubePlayer");
    const closeBtn = document.querySelector(".close-btn");

    // ஒவ்வொறு வீடியோ கார்டுக்கும் கிளிக் ஈவென்ட் சேர்க்கிறோம்
    videoCards.forEach(card => {
        card.addEventListener("click", () => {
            const videoId = card.getAttribute("data-video-id");
            // autoplay=1 கொடுத்தால் கிளிக் செய்தவுடன் வீடியோ ஓடும்
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = "flex"; // பாப்-அப் ஓபன் ஆகும்
        });
    });

    // க்ளோஸ் பட்டன் கிளிக் செய்யும்போது
    closeBtn.addEventListener("click", closeModal);

    // வீடியோவுக்கு வெளியே கருப்பு பக்கத்தில் கிளிக் செய்தாலும் க்ளோஸ் ஆகும்
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        iframe.src = ""; // வீடியோவை ஸ்டாப் செய்ய src-ஐ காலி செய்கிறோம்
    }
});
