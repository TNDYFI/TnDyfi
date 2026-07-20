document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("galleryGrid");
  const zoomDialog = document.getElementById("zoomDialog");
  const zoomImg = document.getElementById("zoomImg");
  const closeZoom = document.getElementById("closeZoom");

  const images = Array.from({ length: 12 }, () => "44837.jpg");

  grid.innerHTML = images.map((src, i) => `
    <article class="gallery-card">
      <img src="${src}" alt="gallery ${i + 1}">
      <div class="gallery-actions">
        <button class="like-btn"><i class="far fa-heart"></i> <span>Like</span></button>
        <button class="zoom-btn"><i class="fas fa-magnifying-glass-plus"></i></button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".gallery-card").forEach((card, idx) => {
    const img = card.querySelector("img");
    const likeBtn = card.querySelector(".like-btn");
    const zoomBtn = card.querySelector(".zoom-btn");

    const openZoom = () => {
      zoomImg.src = img.src;
      zoomDialog.showModal();
    };

    img.addEventListener("click", openZoom);
    zoomBtn.addEventListener("click", openZoom);

    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("active");
      likeBtn.innerHTML = likeBtn.classList.contains("active")
        ? '<i class="fas fa-heart"></i> <span>Liked</span>'
        : '<i class="far fa-heart"></i> <span>Like</span>';
    });
  });

  closeZoom?.addEventListener("click", () => zoomDialog.close());
});
