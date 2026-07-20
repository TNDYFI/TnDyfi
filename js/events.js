document.addEventListener("DOMContentLoaded", () => {
  const eventFeed = document.getElementById("eventFeed");
  const events = Array.from({ length: 10 }, (_, i) => ({
    title: `Event ${i + 1}`,
    desc: "Upcoming youth event, meeting, and campaign schedule.",
    img: "44837.jpg"
  }));

  eventFeed.innerHTML = events.map((e, i) => `
    <article class="event-card">
      <img src="${e.img}" alt="event">
      <div class="event-body">
        <div class="event-top">
          <h3 class="event-title">${e.title}</h3>
          <span class="tag">EVENT</span>
        </div>
        <p class="event-desc">${e.desc}</p>
        <div class="event-meta">
          <span class="tag">#meeting</span>
          <span class="tag">#district</span>
        </div>
        <div class="share-row">
          <button class="share-btn"><i class="fas fa-share-nodes"></i> Share</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".share-btn").forEach(btn => {
    btn.addEventListener("click", () => alert("Share action ready"));
  });
});
