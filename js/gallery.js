document.addEventListener("DOMContentLoaded", () => {
  const chips = [...document.querySelectorAll(".chip")];
  const cards = [...document.querySelectorAll(".gallery-card")];
  const search = document.getElementById("gallerySearch");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const lightbox = document.getElementById("imageDialog");
  const zoomImage = document.getElementById("zoomImage");
  const closeImage = document.getElementById("closeImage");
  const dialogLikeBtn = document.getElementById("dialogLikeBtn");
  const dialogShareBtn = document.getElementById("dialogShareBtn");
  const dialogDownloadBtn = document.getElementById("dialogDownloadBtn");
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const zoomResetBtn = document.getElementById("zoomResetBtn");

  if (!lightbox || !zoomImage) return;

  let currentCard = null;
  let activeFilter = "all";
  let lightboxHistoryOpen = false;
  let zoomScale = 1;
  let pinchStartDistance = 0;
  let pinchStartScale = 1;
  let lastTap = 0;
  let panX = 0;
  let panY = 0;
  let panStartX = 0;
  let panStartY = 0;
  let panOriginX = 0;
  let panOriginY = 0;
  let singleTouchMoved = false;
  let lastTouchX = 0;
  let lastTouchY = 0;

  const likeStoreKey = "dyfi_gallery_likes";
  const getLikes = () => {
    try { return new Set(JSON.parse(localStorage.getItem(likeStoreKey) || "[]")); }
    catch { return new Set(); }
  };
  const saveLikes = (set) => localStorage.setItem(likeStoreKey, JSON.stringify([...set]));

  function cardKey(card) {
    const img = card?.querySelector("img");
    return img?.getAttribute("src") || card?.querySelector("h3")?.textContent?.trim() || "gallery-item";
  }

  function setCardLike(card, liked) {
    const button = card?.querySelector(".like-btn");
    if (!button) return;
    button.classList.toggle("active", liked);
    button.innerHTML = liked
      ? '<i class="fas fa-heart"></i>'
      : '<i class="far fa-heart"></i>';
    button.setAttribute("aria-pressed", String(liked));
  }

  function syncLikes() {
    const likes = getLikes();
    cards.forEach(card => setCardLike(card, likes.has(cardKey(card))));
  }

  function toggleLike(card) {
    if (!card) return false;
    const likes = getLikes();
    const key = cardKey(card);
    const liked = !likes.has(key);
    liked ? likes.add(key) : likes.delete(key);
    saveLikes(likes);
    setCardLike(card, liked);
    return liked;
  }

  function applyFilters() {
    const query = (search?.value || "").trim().toLowerCase();
    cards.forEach(card => {
      const matchesCategory = activeFilter === "all" || (card.dataset.category || "") === activeFilter;
      const matchesSearch = !query || (card.textContent || "").toLowerCase().includes(query);
      card.hidden = !(matchesCategory && matchesSearch);
    });
  }

  chips.forEach(chip => chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter || "all";
    applyFilters();
  }));

  search?.addEventListener("input", applyFilters);


  function clampZoom(value){ return Math.min(5, Math.max(1, Number(value) || 1)); }
  function applyTransform(){
    zoomImage.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoomScale})`;
    zoomImage.style.cursor = zoomScale > 1 ? (singleTouchMoved ? "grabbing" : "grab") : "zoom-in";
    zoomInBtn?.toggleAttribute("disabled", zoomScale >= 5);
    zoomOutBtn?.toggleAttribute("disabled", zoomScale <= 1);
  }
  function applyZoom(value, focalX=null, focalY=null){
    const old=zoomScale;
    zoomScale=clampZoom(value);
    if(focalX!==null && focalY!==null && zoomScale!==old){
      const ratio=zoomScale/old;
      panX = focalX - (focalX-panX)*ratio;
      panY = focalY - (focalY-panY)*ratio;
    }
    if(zoomScale<=1){panX=0;panY=0;}
    applyTransform();
  }
  function resetZoom(){ zoomScale=1;panX=0;panY=0;applyTransform(); }
  function zoomBy(step){ applyZoom(zoomScale + step); }
  function touchDistance(t1,t2){ const dx=t1.clientX-t2.clientX, dy=t1.clientY-t2.clientY; return Math.hypot(dx,dy); }

  function openLightbox(card) {
    const img = card?.querySelector("img");
    if (!img) return;

    currentCard = card;
    zoomImage.src = img.currentSrc || img.src;
    zoomImage.alt = img.alt || card.querySelector("h3")?.textContent || "Gallery image";
    resetZoom();

    if (dialogDownloadBtn) {
      dialogDownloadBtn.href = img.currentSrc || img.src;
      const base = (img.alt || card.querySelector("h3")?.textContent || "gallery-image")
        .replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
      dialogDownloadBtn.download = `${base || "gallery-image"}.jpg`;
    }

    const liked = getLikes().has(cardKey(card));
    dialogLikeBtn?.classList.toggle("active", liked);
    if (dialogLikeBtn) {
      dialogLikeBtn.innerHTML = liked
        ? '<i class="fas fa-heart"></i><span>Liked</span>'
        : '<i class="far fa-heart"></i><span>Like</span>';
      dialogLikeBtn.setAttribute("aria-pressed", String(liked));
    }

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-lightbox-open");

    requestAnimationFrame(() => lightbox.classList.add("show"));

    if (!lightboxHistoryOpen) {
      history.pushState({ ...(history.state || {}), dyfiGalleryLightbox: true }, "", `${location.pathname}${location.search}#gallery-view`);
      lightboxHistoryOpen = true;
    }
  }

  function hideLightbox(updateHistory = true) {
    if (lightbox.hidden) return;

    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gallery-lightbox-open");
    zoomImage.removeAttribute("src");

    setTimeout(() => {
      if (!lightbox.classList.contains("show")) lightbox.hidden = true;
    }, 180);

    currentCard = null;
    resetZoom();

    if (updateHistory && lightboxHistoryOpen) {
      lightboxHistoryOpen = false;
      if (history.state?.dyfiGalleryLightbox) history.back();
    } else {
      lightboxHistoryOpen = false;
    }
  }

  cards.forEach(card => {
    const img = card.querySelector("img");
    const likeBtn = card.querySelector(".like-btn");

    img?.addEventListener("click", () => openLightbox(card));
    likeBtn?.addEventListener("click", event => {
      event.stopPropagation();
      toggleLike(card);
    });
  });

  closeImage?.addEventListener("click", () => hideLightbox(true));
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) hideLightbox(true);
  });

  dialogLikeBtn?.addEventListener("click", event => {
    event.stopPropagation();
    if (!currentCard) return;
    const liked = toggleLike(currentCard);
    dialogLikeBtn.classList.toggle("active", liked);
    dialogLikeBtn.innerHTML = liked
      ? '<i class="fas fa-heart"></i><span>Liked</span>'
      : '<i class="far fa-heart"></i><span>Like</span>';
    dialogLikeBtn.setAttribute("aria-pressed", String(liked));
  });

  dialogShareBtn?.addEventListener("click", async event => {
    event.stopPropagation();
    if (!currentCard) return;
    const title = currentCard.querySelector("h3")?.textContent?.trim() || "Gallery Image";
    const text = currentCard.querySelector("p")?.textContent?.trim() || "DYFI Tamil Nadu Gallery";
    try {
      if (navigator.share) await navigator.share({ title, text, url: location.href.split("#")[0] });
      else {
        await navigator.clipboard?.writeText(location.href.split("#")[0]);
        window.__dyfiToast?.("Link copied ✓");
      }
    } catch {}
  });

  window.addEventListener("popstate", () => {
    if (lightboxHistoryOpen) {
      lightboxHistoryOpen = false;
      hideLightbox(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lightbox.hidden) hideLightbox(true);
    if (lightbox.hidden) return;
    if (event.key === "+" || event.key === "=") zoomBy(.25);
    if (event.key === "-") zoomBy(-.25);
    if (event.key === "0") resetZoom();
  });

  zoomInBtn?.addEventListener("click", e => { e.stopPropagation(); zoomBy(.25); });
  zoomOutBtn?.addEventListener("click", e => { e.stopPropagation(); zoomBy(-.25); });
  zoomResetBtn?.addEventListener("click", e => { e.stopPropagation(); resetZoom(); });

  zoomImage.addEventListener("wheel", e => {
    if (lightbox.hidden) return;
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? .25 : -.25);
  }, {passive:false});

  zoomImage.addEventListener("dblclick", e => {
    e.preventDefault();
    const rect=zoomImage.getBoundingClientRect();
    const fx=e.clientX-(rect.left+rect.width/2);
    const fy=e.clientY-(rect.top+rect.height/2);
    applyZoom(zoomScale > 1 ? 1 : 2.5, fx, fy);
  });

  zoomImage.addEventListener("touchstart", e => {
    if (e.touches.length === 2) {
      e.preventDefault();
      pinchStartDistance = touchDistance(e.touches[0], e.touches[1]);
      pinchStartScale = zoomScale;
      lastTouchX=(e.touches[0].clientX+e.touches[1].clientX)/2;
      lastTouchY=(e.touches[0].clientY+e.touches[1].clientY)/2;
    } else if (e.touches.length === 1) {
      const t=e.touches[0];
      panStartX=t.clientX; panStartY=t.clientY; panOriginX=panX; panOriginY=panY; singleTouchMoved=false;
      const now = Date.now();
      if (now - lastTap < 280) {
        const rect=zoomImage.getBoundingClientRect();
        const fx=t.clientX-(rect.left+rect.width/2);
        const fy=t.clientY-(rect.top+rect.height/2);
        applyZoom(zoomScale > 1 ? 1 : 2.5, fx, fy);
      }
      lastTap = now;
    }
  }, {passive:false});

  zoomImage.addEventListener("touchmove", e => {
    if (e.touches.length === 2 && pinchStartDistance) {
      e.preventDefault();
      const currentDistance = touchDistance(e.touches[0], e.touches[1]);
      const midX=(e.touches[0].clientX+e.touches[1].clientX)/2;
      const midY=(e.touches[0].clientY+e.touches[1].clientY)/2;
      const rect=zoomImage.getBoundingClientRect();
      const fx=midX-(rect.left+rect.width/2);
      const fy=midY-(rect.top+rect.height/2);
      applyZoom(pinchStartScale * (currentDistance / pinchStartDistance), fx, fy);
      panX += midX-lastTouchX; panY += midY-lastTouchY;
      lastTouchX=midX; lastTouchY=midY; applyTransform();
      return;
    }
    if (e.touches.length===1 && zoomScale>1) {
      e.preventDefault();
      const t=e.touches[0];
      const dx=t.clientX-panStartX, dy=t.clientY-panStartY;
      if(Math.abs(dx)+Math.abs(dy)>3) singleTouchMoved=true;
      panX=panOriginX+dx; panY=panOriginY+dy; applyTransform();
    }
  }, {passive:false});

  zoomImage.addEventListener("touchend", e => {
    if (e.touches.length < 2) pinchStartDistance = 0;
    if (e.touches.length===0) setTimeout(()=>{singleTouchMoved=false;applyTransform();},0);
  }, {passive:true});

  loadMoreBtn?.addEventListener("click", () => {
    loadMoreBtn.textContent = "No More Images";
    loadMoreBtn.disabled = true;
  });

  syncLikes();
  applyFilters();
});
