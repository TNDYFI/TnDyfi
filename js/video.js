document.addEventListener("DOMContentLoaded", () => {
  const videos = [
    {
      title: "Campaign Launch",
      desc: "Opening event video with highlights and public address.",
      type: "Campaign",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "District Meeting",
      desc: "District level meeting coverage and coordination scenes.",
      type: "Meeting",
      src: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Youth Rally",
      desc: "Public rally, speech moments, and crowd visuals.",
      type: "Rally",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Service Activity",
      desc: "Social service and community support coverage.",
      type: "Service",
      src: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Student Meet",
      desc: "Campus interaction and student awareness session.",
      type: "Campus",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Digital Campaign",
      desc: "Online content and social media campaign launch.",
      type: "Digital",
      src: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const mainVideo = document.getElementById("mainVideo");
  const grid = document.getElementById("videoGrid");
  const titleEl = document.getElementById("videoTitle");
  const descEl = document.getElementById("videoDesc");
  const seekBar = document.getElementById("seekBar");
  const volumeBar = document.getElementById("volumeBar");
  const speedSelect = document.getElementById("speedSelect");
  const playBtn = document.getElementById("playBtn");
  const muteBtn = document.getElementById("muteBtn");
  const fsBtn = document.getElementById("fsBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const zoomBtn = document.getElementById("zoomBtn");

  const dialog = document.getElementById("videoDialog");
  const closeBtn = document.getElementById("closeDialog");
  const dlgVideo = document.getElementById("dialogVideo");

  let currentIndex = 0;
  let zoomed = false;

  if (!mainVideo || !grid) return;

  function loadVideo(index, autoplay = false) {
    currentIndex = (index + videos.length) % videos.length;
    const item = videos[currentIndex];
    mainVideo.src = item.src;
    mainVideo.poster = item.thumb;
    titleEl.textContent = item.title;
    descEl.textContent = item.desc;
    mainVideo.playbackRate = Number(speedSelect.value);
    mainVideo.volume = Number(volumeBar.value);
    mainVideo.muted = false;
    muteBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
    if (autoplay) mainVideo.play().catch(() => {});
  }

  function renderGrid() {
    grid.innerHTML = "";
    videos.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "video-card";
      card.innerHTML = `
        <img class="video-thumb" src="${item.thumb}" alt="${item.title}">
        <div class="video-body">
          <span class="video-tag">${item.type}</span>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        loadVideo(index, true);
        openDialog(item);
      });
      grid.appendChild(card);
    });
  }

  function openDialog(item) {
    document.getElementById("dlgType").textContent = item.type;
    document.getElementById("dlgTitle").textContent = item.title;
    document.getElementById("dlgMeta").textContent = "Tap the video controls to play, speed up, mute, or go fullscreen.";
    document.getElementById("dlgDescription").textContent = item.desc;
    dlgVideo.src = item.src;
    dlgVideo.poster = item.thumb;
    if (dialog?.showModal) dialog.showModal();
    else if (dialog) dialog.setAttribute("open", "");
  }

  function togglePlay() {
    if (mainVideo.paused) {
      mainVideo.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      mainVideo.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  mainVideo.addEventListener("loadedmetadata", () => {
    seekBar.value = 0;
  });

  mainVideo.addEventListener("timeupdate", () => {
    if (mainVideo.duration) {
      seekBar.value = (mainVideo.currentTime / mainVideo.duration) * 100;
    }
    playBtn.innerHTML = mainVideo.paused
      ? '<i class="fas fa-play"></i>'
      : '<i class="fas fa-pause"></i>';
  });

  seekBar.addEventListener("input", () => {
    if (mainVideo.duration) {
      mainVideo.currentTime = (seekBar.value / 100) * mainVideo.duration;
    }
  });

  volumeBar.addEventListener("input", () => {
    mainVideo.volume = Number(volumeBar.value);
    mainVideo.muted = mainVideo.volume === 0;
    muteBtn.innerHTML = mainVideo.muted
      ? '<i class="fas fa-volume-xmark"></i>'
      : '<i class="fas fa-volume-high"></i>';
  });

  speedSelect.addEventListener("change", () => {
    mainVideo.playbackRate = Number(speedSelect.value);
  });

  playBtn.addEventListener("click", togglePlay);

  muteBtn.addEventListener("click", () => {
    mainVideo.muted = !mainVideo.muted;
    muteBtn.innerHTML = mainVideo.muted
      ? '<i class="fas fa-volume-xmark"></i>'
      : '<i class="fas fa-volume-high"></i>';
  });

  prevBtn.addEventListener("click", () => loadVideo(currentIndex - 1, true));
  nextBtn.addEventListener("click", () => loadVideo(currentIndex + 1, true));

  fsBtn.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  });

  zoomBtn.addEventListener("click", () => {
    zoomed = !zoomed;
    const card = document.getElementById("playerCard");
    if (zoomed) {
      card.style.transform = "scale(1.02)";
      card.style.transition = "0.2s ease";
      zoomBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      card.style.transform = "scale(1)";
      zoomBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  });

  closeBtn?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  mainVideo.addEventListener("ended", () => loadVideo(currentIndex + 1, true));

  renderGrid();
  loadVideo(0, false);
});
