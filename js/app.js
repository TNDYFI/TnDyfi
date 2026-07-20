document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");
  const themeBtn = document.getElementById("themeBtn");
  const fab = document.getElementById("fab");
  const searchBtn = document.getElementById("searchBtn");
  const moreBtn = document.getElementById("moreBtn");
  const searchPopup = document.getElementById("searchPopup");
  const notificationPanel = document.getElementById("notificationPanel");
  const closeSearch = document.getElementById("closeSearch");
  const closeNotification = document.getElementById("closeNotification");
  const slides = document.querySelectorAll(".slide");
  const videoCards = document.querySelectorAll(".video-card");
  const videoModal = document.getElementById("videoModal");
  const youtubePlayer = document.getElementById("youtubePlayer");
  const searchInput = document.getElementById("searchInput");
  const navLinks = document.querySelectorAll(".bottom-nav a, .side-list a");

  const closeAll = () => {
    sidebar?.classList.remove("active");
    searchPopup?.classList.remove("active");
    notificationPanel?.classList.remove("active");
    overlay?.classList.remove("active");
    menuBtn?.classList.remove("active");
  };

  const closeVideo = () => {
    if (!videoModal || !youtubePlayer) return;
    videoModal.classList.remove("active");
    youtubePlayer.src = "";
  };

  setTimeout(() => {
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
      loader.style.pointerEvents = "none";
    }
  }, 1200);

  menuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const willOpen = !sidebar?.classList.contains("active");
    closeAll();
    if (willOpen) {
      sidebar?.classList.add("active");
      overlay?.classList.add("active");
      menuBtn.classList.add("active");
    }
  });

  overlay?.addEventListener("click", () => {
    closeAll();
    closeVideo();
  });

  searchBtn?.addEventListener("click", () => {
    closeAll();
    searchPopup?.classList.add("active");
    overlay?.classList.add("active");
    searchInput?.focus();
  });

  moreBtn?.addEventListener("click", () => {
    closeAll();
    notificationPanel?.classList.add("active");
    overlay?.classList.add("active");
  });

  closeSearch?.addEventListener("click", () => {
    searchPopup?.classList.remove("active");
    overlay?.classList.remove("active");
  });

  closeNotification?.addEventListener("click", () => {
    notificationPanel?.classList.remove("active");
    overlay?.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll();
      closeVideo();
    }
  });

  const applyTheme = (theme) => {
    document.body.classList.toggle("dark", theme === "dark");
    if (themeBtn) {
      themeBtn.innerHTML = theme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  };

  applyTheme(localStorage.getItem("theme") || "light");

  themeBtn?.addEventListener("click", () => {
    const next = document.body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  let currentSlide = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 4200);
  }

  fab?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-up");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".section, .event-card, .campaign-card, .gallery-grid img, .video-card").forEach((el) => {
      observer.observe(el);
    });
  }

  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
    });
  });

  videoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoId = card.dataset.videoId;
      if (!videoId || !videoModal || !youtubePlayer) return;
      youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      videoModal.classList.add("active");
    });
  });

  document.querySelector(".close-btn")?.addEventListener("click", closeVideo);

  videoModal?.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideo();
  });

  searchInput?.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    document.querySelectorAll(".event-card, .campaign-card, .video-card").forEach((card) => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeAll();
  });
});

