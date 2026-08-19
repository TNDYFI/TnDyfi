document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     VIDEO DATABASE
  ========================================= */

  const videos = [

    {
      id: "campaign-launch",
      title: "Campaign Launch",
      desc: "Opening event video with highlights and public address.",
      type: "Campaign",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
    },

    {
      id: "district-meeting",
      title: "District Meeting",
      desc: "District level meeting coverage and coordination scenes.",
      type: "Meeting",
      src: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
    },

    {
      id: "youth-rally",
      title: "Youth Rally",
      desc: "Public rally, speech moments, and crowd visuals.",
      type: "Rally",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
    },

    {
      id: "service-activity",
      title: "Service Activity",
      desc: "Social service and community support coverage.",
      type: "Service",
      src: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
    },

    {
      id: "student-meet",
      title: "Student Meet",
      desc: "Campus interaction and student awareness session.",
      type: "Campus",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
    },

    {
      id: "digital-campaign",
      title: "Digital Campaign",
      desc: "Online content and social media campaign launch.",
      type: "Digital",
      src: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    }

  ];


  /* =========================================
     DOM
  ========================================= */

  const $ = (id) => document.getElementById(id);

  const mainVideo = $("mainVideo");
  const grid = $("videoGrid");

  const titleEl = $("videoTitle");
  const descEl = $("videoDesc");
  const typeEl = $("currentType");

  const seekBar = $("seekBar");
  const volumeBar = $("volumeBar");

  const currentTimeEl = $("currentTime");
  const durationEl = $("duration");

  const speedSelect = $("speedSelect");

  const playBtn = $("playBtn");
  const muteBtn = $("muteBtn");

  const fsBtn = $("fsBtn");
  const prevBtn = $("prevBtn");
  const nextBtn = $("nextBtn");

  const zoomBtn = $("zoomBtn");
  const playerCard = $("playerCard");

  const searchInput = $("searchInput");
  const clearSearch = $("clearSearch");
  const categoryFilters = $("categoryFilters");

  const playlistCount = $("playlistCount");
  const resultInfo = $("resultInfo");

  const totalVideos = $("totalVideos");
  const totalCategories = $("totalCategories");
  const currentVideoNumber = $("currentVideoNumber");
  const playerCounter = $("playerCounter");

  const emptyState = $("emptyState");
  const resetFilters = $("resetFilters");

  const loader = $("videoLoader");
  const errorBox = $("videoError");
  const retryBtn = $("retryBtn");

  const centerPlay = $("centerPlay");

  const shareBtn = $("shareBtn");
  const dialogShare = $("dialogShare");

  const dialog = $("videoDialog");
  const closeDialog = $("closeDialog");

  const dlgVideo = $("dialogVideo");
  const dlgType = $("dlgType");
  const dlgTitle = $("dlgTitle");
  const dlgMeta = $("dlgMeta");
  const dlgDescription = $("dlgDescription");

  const toast = $("toast");
  const toastText = $("toastText");
  const toastIcon = $("toastIcon");


  if (!mainVideo || !grid) {
    console.error("Video player elements not found.");
    return;
  }


  /* =========================================
     STATE
  ========================================= */

  let currentIndex = 0;
  let filteredVideos = [...videos];

  let selectedCategory = "All";

  let zoomed = false;

  let lastVolume =
    Number(localStorage.getItem("videoVolume")) || 0.8;


  /* =========================================
     INITIAL SETUP
  ========================================= */

  mainVideo.volume = lastVolume;

  totalVideos.textContent = videos.length;

  const categories = [
    "All",
    ...new Set(videos.map(video => video.type))
  ];

  totalCategories.textContent = categories.length - 1;


  /* =========================================
     TIME FORMAT
  ========================================= */

  function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
      return "00:00";
    }

    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor((seconds % 3600) / 60);

    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${String(hrs).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
    }

    return `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
  }


  /* =========================================
     TOAST
  ========================================= */

  let toastTimer;

  function showToast(message, success = true) {

    toastText.textContent = message;

    toastIcon.className = success
      ? "fas fa-check-circle"
      : "fas fa-circle-exclamation";

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }


  /* =========================================
     LOAD VIDEO
  ========================================= */

  function loadVideo(index, autoplay = false) {

    if (!videos.length) return;

    currentIndex =
      (index + videos.length) % videos.length;

    const item = videos[currentIndex];

    loader.classList.add("active");
    errorBox.classList.remove("active");

    mainVideo.pause();

    mainVideo.src = item.src;
    mainVideo.poster = item.thumb;

    mainVideo.load();

    titleEl.textContent = item.title;
    descEl.textContent = item.desc;
    typeEl.textContent = item.type;

    mainVideo.playbackRate =
      Number(speedSelect.value);

    mainVideo.volume = lastVolume;

    mainVideo.muted = false;

    updateMuteIcon();

    seekBar.value = 0;

    currentTimeEl.textContent = "00:00";
    durationEl.textContent = "00:00";

    playerCounter.textContent =
      `${currentIndex + 1} / ${videos.length}`;

    currentVideoNumber.textContent =
      currentIndex + 1;

    saveCurrentVideo();

    renderGrid();

    if (autoplay) {
      mainVideo.play().catch(() => {});
    }

  }


  /* =========================================
     GRID
  ========================================= */

  function renderGrid() {

    grid.innerHTML = "";

    playlistCount.textContent =
      `${filteredVideos.length} video${filteredVideos.length !== 1 ? "s" : ""}`;

    resultInfo.textContent =
      selectedCategory === "All"
        ? `Showing ${filteredVideos.length} videos`
        : `${selectedCategory} • ${filteredVideos.length} videos`;

    if (!filteredVideos.length) {

      emptyState.classList.add("show");

      return;

    }

    emptyState.classList.remove("show");


    filteredVideos.forEach((item) => {

      const originalIndex =
        videos.findIndex(video => video.id === item.id);

      const card =
        document.createElement("article");

      card.className =
        "video-card" +
        (originalIndex === currentIndex ? " active" : "");


      card.innerHTML = `

        <div class="video-thumb-wrap">

          <img
            class="video-thumb"
            src="${item.thumb}"
            alt="${escapeHTML(item.title)}"
            loading="lazy">

          <div class="thumb-play">
            <i class="fas fa-play"></i>
          </div>

        </div>

        <div class="video-body">

          <span class="video-tag">
            ${escapeHTML(item.type)}
          </span>

          <h4>
            ${escapeHTML(item.title)}
          </h4>

          <p>
            ${escapeHTML(item.desc)}
          </p>
          <button class="playlist-share" type="button" aria-label="Share video"><i class="fas fa-share-nodes"></i> Share</button>

        </div>
      `;


      card.addEventListener("click", (event) => {
        if(event.target.closest('.playlist-share')) return;
        loadVideo(originalIndex, true);
        openDialog(item);
      });
      card.querySelector('.playlist-share')?.addEventListener('click', (event)=>{event.stopPropagation();shareVideo(item);});


      grid.appendChild(card);

    });

  }


  /* =========================================
     ESCAPE HTML
  ========================================= */

  function escapeHTML(value) {

    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  /* =========================================
     CATEGORY FILTER
  ========================================= */

  function renderCategories() {

    categoryFilters.innerHTML = "";

    categories.forEach(category => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "category-btn" +
        (category === selectedCategory
          ? " active"
          : "");

      button.textContent = category;

      button.addEventListener("click", () => {

        selectedCategory = category;

        applyFilters();

      });

      categoryFilters.appendChild(button);

    });

  }


  /* =========================================
     SEARCH
  ========================================= */

  function applyFilters() {

    const query =
      searchInput.value.trim().toLowerCase();


    filteredVideos =
      videos.filter(item => {

        const matchesCategory =
          selectedCategory === "All" ||
          item.type === selectedCategory;


        const matchesSearch =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query);


        return matchesCategory && matchesSearch;

      });


    clearSearch.classList.toggle(
      "show",
      Boolean(query)
    );


    renderCategories();

    renderGrid();

  }


  searchInput.addEventListener(
    "input",
    applyFilters
  );


  clearSearch.addEventListener(
    "click",
    () => {

      searchInput.value = "";

      applyFilters();

      searchInput.focus();

    }
  );


  resetFilters.addEventListener(
    "click",
    () => {

      searchInput.value = "";

      selectedCategory = "All";

      applyFilters();

    }
  );


  /* =========================================
     PLAY / PAUSE
  ========================================= */

  async function togglePlay() {

    try {

      if (mainVideo.paused) {

        await mainVideo.play();

      } else {

        mainVideo.pause();

      }

    } catch (error) {

      showToast(
        "Video cannot be played",
        false
      );

    }

  }


  playBtn.addEventListener(
    "click",
    togglePlay
  );


  mainVideo.addEventListener(
    "click",
    togglePlay
  );


  /* =========================================
     PLAY ICON
  ========================================= */

  function updatePlayIcon() {

    const playing =
      !mainVideo.paused &&
      !mainVideo.ended;

    playBtn.innerHTML =
      playing
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';

    playBtn.title =
      playing ? "Pause" : "Play";

  }


  mainVideo.addEventListener(
    "play",
    () => {

      updatePlayIcon();

      centerPlay.classList.remove("show");

    }
  );


  mainVideo.addEventListener(
    "pause",
    () => {

      updatePlayIcon();

    }
  );


  /* =========================================
     CENTER PLAY
  ========================================= */

  mainVideo.addEventListener(
    "pause",
    () => {

      if (mainVideo.currentTime > 0 &&
          !mainVideo.ended) {

        centerPlay.innerHTML =
          '<i class="fas fa-play"></i>';

        centerPlay.classList.add("show");

        setTimeout(() => {
          centerPlay.classList.remove("show");
        }, 700);

      }

    }
  );


  /* =========================================
     TIME UPDATE
  ========================================= */

  mainVideo.addEventListener(
    "timeupdate",
    () => {

      if (!Number.isFinite(mainVideo.duration)) {
        return;
      }

      const percentage =
        (mainVideo.currentTime /
        mainVideo.duration) * 100;


      seekBar.value = percentage;

      currentTimeEl.textContent =
        formatTime(mainVideo.currentTime);

      durationEl.textContent =
        formatTime(mainVideo.duration);

      saveProgress();

    }
  );


  mainVideo.addEventListener(
    "loadedmetadata",
    () => {

      durationEl.textContent =
        formatTime(mainVideo.duration);

      seekBar.value =
        mainVideo.duration
          ? (mainVideo.currentTime /
             mainVideo.duration) * 100
          : 0;

    }
  );


  /* =========================================
     SEEK
  ========================================= */

  seekBar.addEventListener(
    "input",
    () => {

      if (!Number.isFinite(mainVideo.duration)) {
        return;
      }

      mainVideo.currentTime =
        (Number(seekBar.value) / 100) *
        mainVideo.duration;

    }
  );


  /* =========================================
     VOLUME
  ========================================= */

  volumeBar.value = lastVolume;

  volumeBar.addEventListener(
    "input",
    () => {

      const value =
        Number(volumeBar.value);

      mainVideo.volume = value;

      lastVolume = value;

      localStorage.setItem(
        "videoVolume",
        value
      );

      mainVideo.muted =
        value === 0;

      updateMuteIcon();

    }
  );


  function updateMuteIcon() {

    if (
      mainVideo.muted ||
      mainVideo.volume === 0
    ) {

      muteBtn.innerHTML =
        '<i class="fas fa-volume-xmark"></i>';

      muteBtn.title = "Unmute";

    } else {

      muteBtn.innerHTML =
        '<i class="fas fa-volume-high"></i>';

      muteBtn.title = "Mute";

    }

  }


  muteBtn.addEventListener(
    "click",
    () => {

      if (mainVideo.muted) {

        mainVideo.muted = false;

        if (mainVideo.volume === 0) {

          mainVideo.volume =
            lastVolume || 0.8;

          volumeBar.value =
            mainVideo.volume;

        }

      } else {

        mainVideo.muted = true;

      }

      updateMuteIcon();

    }
  );


  /* =========================================
     SPEED
  ========================================= */

  speedSelect.addEventListener(
    "change",
    () => {

      mainVideo.playbackRate =
        Number(speedSelect.value);

      localStorage.setItem(
        "videoSpeed",
        speedSelect.value
      );

      showToast(
        `Playback speed ${speedSelect.value}x`
      );

    }
  );


  const savedSpeed =
    localStorage.getItem("videoSpeed");

  if (savedSpeed) {

    speedSelect.value = savedSpeed;

    mainVideo.playbackRate =
      Number(savedSpeed);

  }


  /* =========================================
     PREVIOUS / NEXT
  ========================================= */

  prevBtn.addEventListener(
    "click",
    () => {

      loadVideo(
        currentIndex - 1,
        true
      );

    }
  );


  nextBtn.addEventListener(
    "click",
    () => {

      loadVideo(
        currentIndex + 1,
        true
      );

    }
  );


  /* =========================================
     AUTO NEXT
  ========================================= */

  mainVideo.addEventListener(
    "ended",
    () => {

      showToast("Playing next video");

      loadVideo(
        currentIndex + 1,
        true
      );

    }
  );


  /* =========================================
     FULLSCREEN
  ========================================= */

  fsBtn.addEventListener(
    "click",
    async () => {

      try {

        if (!document.fullscreenElement) {

          const target =
            document.querySelector(".video-stage");

          if (target?.requestFullscreen) {

            await target.requestFullscreen();

          } else if (mainVideo.webkitEnterFullscreen) {

            mainVideo.webkitEnterFullscreen();

          }

        } else {

          await document.exitFullscreen();

        }

      } catch (error) {

        console.log(
          "Fullscreen unavailable",
          error
        );

      }

    }
  );


  document.addEventListener(
    "fullscreenchange",
    () => {

      const active =
        Boolean(document.fullscreenElement);

      fsBtn.innerHTML =
        active
          ? '<i class="fas fa-compress"></i>'
          : '<i class="fas fa-expand"></i>';

    }
  );


  /* =========================================
     ZOOM
  ========================================= */

  zoomBtn.addEventListener(
    "click",
    () => {

      zoomed = !zoomed;

      playerCard.classList.toggle(
        "zoomed",
        zoomed
      );

      zoomBtn.innerHTML =
        zoomed
          ? '<i class="fas fa-compress"></i>'
          : '<i class="fas fa-expand"></i>';

    }
  );


  /* =========================================
     VIDEO LOADING
  ========================================= */

  mainVideo.addEventListener(
    "loadstart",
    () => {

      loader.classList.add("active");

    }
  );


  mainVideo.addEventListener(
    "canplay",
    () => {

      loader.classList.remove("active");

      errorBox.classList.remove("active");

    }
  );


  mainVideo.addEventListener(
    "waiting",
    () => {

      loader.classList.add("active");

    }
  );


  mainVideo.addEventListener(
    "playing",
    () => {

      loader.classList.remove("active");

    }
  );


  mainVideo.addEventListener(
    "error",
    () => {

      loader.classList.remove("active");

      errorBox.classList.add("active");

    }
  );


  retryBtn.addEventListener(
    "click",
    () => {

      const item = videos[currentIndex];

      mainVideo.src = item.src;

      mainVideo.load();

      mainVideo.play().catch(() => {});

    }
  );


  /* =========================================
     SHARE
  ========================================= */

  async function shareVideo(item) {

    const shareData = {

      title: item.title,

      text: `${item.title} — ${item.desc}`,

      url: window.location.href

    };


    try {

      if (
        navigator.share &&
        window.isSecureContext
      ) {

        await navigator.share(shareData);

      } else if (
        navigator.clipboard
      ) {

        await navigator.clipboard.writeText(
          window.location.href
        );

        showToast(
          "Video link copied"
        );

      } else {

        showToast(
          "Sharing is not supported",
          false
        );

      }

    } catch (error) {

      if (error.name !== "AbortError") {

        showToast(
          "Unable to share",
          false
        );

      }

    }

  }


  shareBtn.addEventListener(
    "click",
    () => {

      shareVideo(
        videos[currentIndex]
      );

    }
  );


  dialogShare.addEventListener(
    "click",
    () => {

      const item =
        videos.find(
          video =>
            video.id === dlgVideo.dataset.videoId
        );

      if (item) {

        shareVideo(item);

      }

    }
  );


  /* =========================================
     DIALOG
  ========================================= */

  function openDialog(item) {

    dlgType.textContent =
      item.type;

    dlgTitle.textContent =
      item.title;

    dlgMeta.textContent =
      `${item.type} • Advanced Video Player`;

    dlgDescription.textContent =
      item.desc;

    dlgVideo.dataset.videoId =
      item.id;

    dlgVideo.src =
      item.src;

    dlgVideo.poster =
      item.thumb;

    if (
      typeof dialog.showModal === "function"
    ) {

      if (!dialog.open) {
        dialog.showModal();
      }

    } else {

      dialog.setAttribute(
        "open",
        ""
      );

    }

  }


  function closeVideoDialog() {

    dlgVideo.pause();

    dlgVideo.removeAttribute("src");

    dlgVideo.load();

    if (
      typeof dialog.close === "function"
    ) {

      if (dialog.open) {
        dialog.close();
      }

    } else {

      dialog.removeAttribute("open");

    }

  }


  closeDialog.addEventListener(
    "click",
    closeVideoDialog
  );


  dialog.addEventListener(
    "click",
    (event) => {

      if (
        event.target === dialog
      ) {

        closeVideoDialog();

      }

    }
  );


  /* =========================================
     LOCAL STORAGE
  ========================================= */

  function saveCurrentVideo() {

    localStorage.setItem(
      "lastVideoId",
      videos[currentIndex].id
    );

  }


  function saveProgress() {

    if (!videos[currentIndex]) {
      return;
    }

    const progress = {

      id: videos[currentIndex].id,

      time: mainVideo.currentTime

    };


    localStorage.setItem(
      "videoProgress",
      JSON.stringify(progress)
    );

  }


  function restoreLastVideo() {

    const lastId =
      localStorage.getItem(
        "lastVideoId"
      );

    if (!lastId) {
      loadVideo(0, false);
      return;
    }

    const index =
      videos.findIndex(
        video => video.id === lastId
      );

    loadVideo(
      index >= 0 ? index : 0,
      false
    );

  }


  mainVideo.addEventListener(
    "loadedmetadata",
    () => {

      try {

        const saved =
          JSON.parse(
            localStorage.getItem(
              "videoProgress"
            )
          );

        if (
          saved &&
          saved.id ===
          videos[currentIndex].id &&
          saved.time > 5 &&
          saved.time <
          mainVideo.duration - 5
        ) {

          mainVideo.currentTime =
            saved.time;

        }

      } catch (error) {

        console.log(
          "Progress restore skipped"
        );

      }

    }
  );


  /* =========================================
     KEYBOARD CONTROLS
  ========================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      const tag =
        document.activeElement?.tagName;

      if (
        tag === "INPUT" ||
        tag === "SELECT" ||
        tag === "TEXTAREA"
      ) {
        return;
      }


      if (event.code === "Space") {

        event.preventDefault();

        togglePlay();

      }


      if (event.key === "ArrowRight") {

        if (
          Number.isFinite(
            mainVideo.duration
          )
        ) {

          mainVideo.currentTime =
            Math.min(
              mainVideo.duration,
              mainVideo.currentTime + 5
            );

        }

      }


      if (event.key === "ArrowLeft") {

        mainVideo.currentTime =
          Math.max(
            0,
            mainVideo.currentTime - 5
          );

      }


      if (event.key.toLowerCase() === "m") {

        muteBtn.click();

      }


      if (event.key.toLowerCase() === "f") {

        fsBtn.click();

      }

    }
  );


  /* =========================================
     VISIBILITY / PAGE LEAVE
  ========================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        !mainVideo.paused
      ) {

        mainVideo.pause();

      }

    }
  );


  /* =========================================
     INITIALIZE
  ========================================= */

  renderCategories();

  applyFilters();

  restoreLastVideo();

  updateMuteIcon();

  updatePlayIcon();

});
