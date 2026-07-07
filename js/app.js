// ==========================
// Youth Connect Tamil Nadu
// app.js
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // Loader
    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }
        }, 1500);
    });

    // Sidebar
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuBtn = document.querySelector(".menu-btn");

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    if (menuBtn) {
        menuBtn.onclick = () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        };
    }

    if (overlay) {
        overlay.onclick = closeSidebar;
    }

    // Dark Mode
    const themeBtn = document.getElementById("themeBtn");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        if (themeBtn) {
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    if (themeBtn) {
        themeBtn.onclick = () => {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {

                localStorage.setItem("theme", "dark");
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';

            } else {

                localStorage.setItem("theme", "light");
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';

            }

        };
    }

    // Hero Slider
    const slides = document.querySelectorAll(".slide");

    let current = 0;

    function showSlide(index) {

        slides.forEach(slide => slide.classList.remove("active"));

        slides[index].classList.add("active");

    }

    if (slides.length > 0) {

        setInterval(() => {

            current++;

            if (current >= slides.length) current = 0;

            showSlide(current);

        }, 4000);

    }

    // Search Popup
    const searchBtn = document.getElementById("searchBtn");
    const searchPopup = document.getElementById("searchPopup");
    const closeSearch = document.getElementById("closeSearch");

    if (searchBtn) {

        searchBtn.onclick = () => {

            searchPopup.classList.add("active");

        };

    }

    if (closeSearch) {

        closeSearch.onclick = () => {

            searchPopup.classList.remove("active");

        };

    }

    // Notification
    const moreBtn = document.getElementById("moreBtn");
    const notificationPanel = document.getElementById("notificationPanel");
    const closeNotification = document.getElementById("closeNotification");

    if (moreBtn) {

        moreBtn.onclick = () => {

            notificationPanel.classList.add("active");

        };

    }

    if (closeNotification) {

        closeNotification.onclick = () => {

            notificationPanel.classList.remove("active");

        };

    }

    // Floating Button
    const fab = document.getElementById("fab");

    if (fab) {

        fab.onclick = () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        };

    }

    // Fade Animation
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-up");

            }

        });

    });

    document.querySelectorAll(".section,.event-card,.news-card,.campaign-card,.gallery-grid img,.video-card")
        .forEach(el => observer.observe(el));

});