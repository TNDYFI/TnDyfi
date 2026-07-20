document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll(".gallery-card");
  const search = document.getElementById("gallerySearch");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const dialog = document.getElementById("imageDialog");
  const zoomImage = document.getElementById("zoomImage");
  const closeImage = document.getElementById("closeImage");
  const dialogLikeBtn = document.getElementById("dialogLikeBtn");
  const dialogShareBtn = document.getElementById("dialogShareBtn");
  let currentCard = null;

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      cards.forEach(card => {
        const ok = filter === "all" || (card.dataset.category || "").includes(filter);
        card.style.display = ok ? "" : "none";
      });
    });
  });

  search?.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    cards.forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  cards.forEach(card => {
    const img = card.querySelector("img");
    const likeBtn = card.querySelector(".like-btn");

    img.addEventListener("click", () => {
      currentCard = card;
      zoomImage.src = img.src;
      zoomImage.alt = img.alt;
      if (dialog?.showModal) dialog.showModal();
    });

    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("active");
      likeBtn.innerHTML = likeBtn.classList.contains("active")
        ? '<i class="fas fa-heart"></i>'
        : '<i class="far fa-heart"></i>';
    });
  });

  closeImage?.addEventListener("click", () => dialog.close());

  dialogLikeBtn?.addEventListener("click", () => {
    if (!currentCard) return;
    const likeBtn = currentCard.querySelector(".like-btn");
    likeBtn.classList.add("active");
    likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
  });

  dialogShareBtn?.addEventListener("click", async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Gallery Image",
        url: location.href
      });
    }
  });

  loadMoreBtn?.addEventListener("click", () => {
    loadMoreBtn.textContent = "No More Images";
    loadMoreBtn.disabled = true;
  });
});
