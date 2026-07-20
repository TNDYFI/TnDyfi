document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("newsSearch");
  const tabs = document.querySelectorAll(".tab-btn");
  const cards = document.querySelectorAll(".news-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.tab;
      cards.forEach((card) => {
        const category = card.dataset.category || "";
        const show = filter === "all" || category.includes(filter);
        card.style.display = show ? "" : "none";
      });
    });
  });

  search?.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? "" : "none";
    });
  });
});
