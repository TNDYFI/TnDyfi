document.addEventListener("DOMContentLoaded", () => {
  const events = [
    {
      title: "District Meeting",
      date: "2026-08-01",
      time: "6:00 PM",
      place: "District Office",
      type: "Meeting",
      color: "#d50000"
    },
    {
      title: "Membership Drive",
      date: "2026-08-03",
      time: "4:00 PM",
      place: "Town Hall",
      type: "Membership",
      color: "#3498db"
    },
    {
      title: "Social Media Campaign",
      date: "2026-08-05",
      time: "5:30 PM",
      place: "Online",
      type: "Social",
      color: "#9b59b6"
    },
    {
      title: "Youth Rally",
      date: "2026-08-10",
      time: "7:00 PM",
      place: "Public Ground",
      type: "Event",
      color: "#27ae60"
    }
  ];

  const grid = document.getElementById("eventsGrid");
  const search = document.getElementById("eventsSearch");
  const modal = document.getElementById("eventDialog");
  const closeBtn = document.getElementById("closeEventDialog");

  if (!grid) return;

  function render(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-box" style="padding: 20px; text-align: center; color: var(--muted);">No events found</div>`;
      return;
    }

    list.forEach((eventItem) => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.style.background = `linear-gradient(135deg, ${eventItem.color}, #111827)`;
      card.style.color = "#fff";
      card.style.padding = "20px";
      card.style.borderRadius = "24px";
      card.innerHTML = `
        <span class="event-type" style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 700;">${eventItem.type}</span>
        <h3 style="margin-top: 12px; font-size: 20px;">${eventItem.title}</h3>
        <p style="margin-top: 8px; opacity: 0.9;"><i class="fas fa-calendar"></i> ${eventItem.date}</p>
        <p style="margin-top: 4px; opacity: 0.9;"><i class="fas fa-clock"></i> ${eventItem.time}</p>
        <p style="margin-top: 4px; opacity: 0.9;"><i class="fas fa-location-dot"></i> ${eventItem.place}</p>
        <button class="view-btn" type="button" style="margin-top: 14px; background: #fff; color: #000; padding: 8px 16px; border-radius: 12px; font-weight: 700; cursor: pointer;">View Details</button>
      `;

      card.querySelector(".view-btn").addEventListener("click", () => {
        openEvent(eventItem);
      });

      grid.appendChild(card);
    });
  }

  function openEvent(item) {
    const titleEl = document.getElementById("eventTitle");
    const dateEl = document.getElementById("eventDate");
    const timeEl = document.getElementById("eventTime");
    const placeEl = document.getElementById("eventPlace");
    const typeEl = document.getElementById("eventType");
    const bannerEl = document.getElementById("eventBanner");

    if (titleEl) titleEl.textContent = item.title;
    if (dateEl) dateEl.textContent = item.date;
    if (timeEl) timeEl.textContent = item.time;
    if (placeEl) placeEl.textContent = item.place;
    if (typeEl) typeEl.textContent = item.type;
    if (bannerEl) bannerEl.style.background = `linear-gradient(135deg, ${item.color}, #111827)`;

    if (modal?.showModal) modal.showModal();
    else if (modal) modal.setAttribute("open", "");
  }

  function applySearch() {
    const q = search ? search.value.trim().toLowerCase() : "";
    const filtered = q === ""
      ? events
      : events.filter(e =>
          e.title.toLowerCase().includes(q) ||
          e.type.toLowerCase().includes(q) ||
          e.place.toLowerCase().includes(q)
        );
    render(filtered);
  }

  render(events);

  search?.addEventListener("input", applySearch);

  closeBtn?.addEventListener("click", () => {
    modal?.close();
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
});
