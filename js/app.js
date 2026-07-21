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

  // --- Theme Controller (அனைத்து பக்கங்களுக்கும் வேலை செய்யும்) ---
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    if (themeBtn) {
      themeBtn.innerHTML = theme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  };

  // பக்கத்தின் தொடக்கத்தில் சேமிக்கப்பட்ட தீமை எடுப்பது
  applyTheme(localStorage.getItem("theme") || "light");

  themeBtn?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
  // -------------------------------------------------------------

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

document.addEventListener("DOMContentLoaded", () => {
  const feedbackBtn = document.getElementById("feedbackBtn");
  const reportBugBtn = document.getElementById("reportBugBtn");
  const assistantBtn = document.getElementById("assistantBtn");

  const feedbackDialog = document.getElementById("feedbackDialog");
  const bugDialog = document.getElementById("bugDialog");

  const closeFeedback = document.getElementById("closeFeedback");
  const cancelFeedback = document.getElementById("cancelFeedback");
  const closeBug = document.getElementById("closeBug");
  const cancelBug = document.getElementById("cancelBug");

  const feedbackForm = document.getElementById("feedbackForm");
  const bugForm = document.getElementById("bugForm");

  const feedbackPhone = document.getElementById("feedbackPhone");
  const feedbackEmail = document.getElementById("feedbackEmail");

  function openDialog(dialog) {
    if (dialog?.showModal) dialog.showModal();
    else dialog?.setAttribute("open", "");
  }

  function closeDialog(dialog) {
    dialog?.close?.();
    dialog?.removeAttribute?.("open");
  }

  feedbackBtn?.addEventListener("click", () => openDialog(feedbackDialog));
  reportBugBtn?.addEventListener("click", () => openDialog(bugDialog));

  assistantBtn?.addEventListener("click", () => {
    document.querySelector("df-messenger")?.setAttribute("expanded", "");
  });

  closeFeedback?.addEventListener("click", () => closeDialog(feedbackDialog));
  cancelFeedback?.addEventListener("click", () => closeDialog(feedbackDialog));
  closeBug?.addEventListener("click", () => closeDialog(bugDialog));
  cancelBug?.addEventListener("click", () => closeDialog(bugDialog));

  feedbackDialog?.addEventListener("click", (e) => {
    if (e.target === feedbackDialog) closeDialog(feedbackDialog);
  });

  bugDialog?.addEventListener("click", (e) => {
    if (e.target === bugDialog) closeDialog(bugDialog);
  });

  function atLeastOneContact() {
    return feedbackPhone.value.trim() || feedbackEmail.value.trim();
  }

  feedbackForm?.addEventListener("submit", (e) => {
    if (!atLeastOneContact()) {
      e.preventDefault();
      alert("Please enter either contact number or email");
      return;
    }

    setTimeout(() => {
      feedbackForm.reset();
      closeDialog(feedbackDialog);
      alert("Feedback sent successfully");
    }, 300);
  });

  bugForm?.addEventListener("submit", (e) => {
    setTimeout(() => {
      bugForm.reset();
      closeDialog(bugDialog);
      alert("Bug report sent successfully");
    }, 300);
  });
});

// chat bot //
document.addEventListener("DOMContentLoaded", () => {
  const bot = document.getElementById("bot-container");
  const closeBtn = document.getElementById("closeBot");
  const openChatMenu = document.getElementById("openChatMenu");

  openChatMenu?.addEventListener("click", () => {
    bot.classList.remove("bot-hidden");
    bot.style.display = "block";
  });

  closeBtn?.addEventListener("click", () => {
    bot.classList.add("bot-hidden");
  });
});
