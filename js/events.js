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
  const clearBtn = document.getElementById("clearEventsBtn");

  if (!grid) return;

  function render(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-box">No events found</div>`;
      return;
    }

    list.forEach((eventItem) => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.style.background = `linear-gradient(135deg, ${eventItem.color}, #111827)`;
      card.innerHTML = `
        <span class="event-type">${eventItem.type}</span>
        <h3>${eventItem.title}</h3>
        <p><i class="fas fa-calendar"></i> ${eventItem.date}</p>
        <p><i class="fas fa-clock"></i> ${eventItem.time}</p>
        <p><i class="fas fa-location-dot"></i> ${eventItem.place}</p>
        <button class="view-btn" type="button">View Details</button>
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

  clearBtn?.addEventListener("click", () => {
    if (search) search.value = "";
    applySearch();
    search?.focus();
  });

  closeBtn?.addEventListener("click", () => {
    modal?.close();
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
});
