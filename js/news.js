document.addEventListener("DOMContentLoaded", () => {
  const newsFeed = document.getElementById("newsFeed");
  const shareDialog = document.getElementById("shareDialog");
  const closeShare = document.getElementById("closeShare");

  const data = Array.from({ length: 10 }, (_, i) => ({
    title: `Youth Connect News ${i + 1}`,
    desc: "Latest community update, campaign story, and youth activity highlight.",
    date: "20 Jul 2026",
    img: "44837.jpg",
    tags: ["#youth", "#tamilnadu", "#community"],
    likes: Math.floor(Math.random() * 100),
    comments: [
      { name: "Arun", text: "Great update!" },
      { name: "Priya", text: "Nice work team." }
    ]
  }));

  newsFeed.innerHTML = data.map((item, idx) => `
    <article class="news-card">
      <div class="news-media">
        <img src="${item.img}" alt="news">
        <div class="badge-row">
          <span class="badge">BREAKING</span>
          <span class="badge">POST ${idx + 1}</span>
        </div>
        <button class="save-btn"><i class="far fa-bookmark"></i></button>
      </div>
      <div class="news-body">
        <div class="news-head">
          <h3 class="news-title">${item.title}</h3>
          <span class="news-date">${item.date}</span>
        </div>
        <div class="tag-row">${item.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <p class="news-desc">${item.desc}</p>
        <div class="author-row">
          <img src="assets/profile.jpg" alt="author">
          <div>
            <strong>Youth Connect</strong>
            <span>Official page</span>
          </div>
        </div>
        <div class="action-row">
          <div class="action-group">
            <button class="action-btn like"><i class="fas fa-heart"></i> Like <span>${item.likes}</span></button>
            <button class="action-btn comment"><i class="fas fa-comment"></i> Comment</button>
            <button class="action-btn share" data-share="${idx}"><i class="fas fa-share-nodes"></i> Share</button>
          </div>
          <button class="action-btn save"><i class="far fa-bookmark"></i></button>
        </div>
        <div class="comment-box">
          <div class="comment-list">
            ${item.comments.map(c => `
              <div class="comment-item"><strong>${c.name}</strong><p>${c.text}</p></div>
            `).join("")}
          </div>
          <div class="reply-row">
            <input type="text" placeholder="Write a comment...">
            <button>Reply</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".action-btn.like").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("active"));
  });

  document.querySelectorAll(".action-btn.comment").forEach(btn => {
    btn.addEventListener("click", () => {
      const box = btn.closest(".news-body").querySelector(".comment-box");
      box.classList.toggle("open");
      btn.classList.toggle("active");
    });
  });

  document.querySelectorAll(".action-btn.share").forEach(btn => {
    btn.addEventListener("click", () => {
      if (shareDialog?.showModal) shareDialog.showModal();
    });
  });

  closeShare?.addEventListener("click", () => shareDialog.close());

  document.querySelectorAll(".save-btn, .action-btn.save").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("active"));
  });
});
