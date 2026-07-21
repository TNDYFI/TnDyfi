document.addEventListener("DOMContentLoaded", () => {
  const campaigns = [
    {
      id: 1,
      title: "Public Awareness Drive",
      date: "2026-08-01",
      place: "Chennai Central",
      type: "Awareness",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
      desc: "Community outreach campaign focused on social awareness, public discussion, and direct field interaction.",
      highlights: ["Street corner meetings", "Poster campaign", "Volunteer briefing"]
    },
    {
      id: 2,
      title: "Youth Enrollment Campaign",
      date: "2026-08-03",
      place: "Coimbatore",
      type: "Membership",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      desc: "Membership expansion drive with local coordination, sign-up support, and youth engagement activities.",
      highlights: ["Form collection", "Youth meetups", "District mobilization"]
    },
    {
      id: 3,
      title: "Worker Support Rally",
      date: "2026-08-05",
      place: "Madurai",
      type: "Rally",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      desc: "Mass rally to support workers' rights, public welfare demands, and collective action awareness.",
      highlights: ["Rally coordination", "Banner march", "Public speech"]
    },
    {
      id: 4,
      title: "Campus Outreach Program",
      date: "2026-08-08",
      place: "Tiruchirappalli",
      type: "Campus",
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
      desc: "Educational outreach program connecting with students through discussions, guidance, and membership support.",
      highlights: ["Student interaction", "Brochure sharing", "Volunteer support"]
    },
    {
      id: 5,
      title: "Blood Donation Camp",
      date: "2026-08-12",
      place: "Salem",
      type: "Service",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80",
      desc: "Health service camp with voluntary blood donation and public health awareness activities.",
      highlights: ["Medical coordination", "Volunteer registration", "Public service"]
    },
    {
      id: 6,
      title: "Digital Campaign Launch",
      date: "2026-08-15",
      place: "Online",
      type: "Digital",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      desc: "Online campaign launch covering social media promotion, short video sharing, and digital community reach.",
      highlights: ["Social media post", "Video release", "Online engagement"]
    }
  ];

  const grid = document.getElementById("campaignGrid");
  const dialog = document.getElementById("campaignDialog");
  const closeBtn = document.getElementById("closeDialog");

  if (!grid) return;

  function renderCards() {
    grid.innerHTML = "";

    campaigns.forEach((item) => {
      const card = document.createElement("article");
      card.className = "campaign-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="card-body">
          <div class="card-top">
            <span class="tag">${item.type}</span>
            <span class="tag">${item.date}</span>
          </div>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.desc}</p>
          <div class="meta-row">
            <span class="tag"><i class="fas fa-location-dot"></i> ${item.place}</span>
          </div>
          <div class="action-row">
            <button class="see-more" type="button">
              <i class="fas fa-eye"></i> See More
            </button>
            <a class="share" target="_blank" rel="noopener noreferrer"
               href="https://wa.me/?text=${encodeURIComponent(item.title + " | " + item.date + " | " + item.place)}">
              <i class="fab fa-whatsapp"></i> Share
            </a>
          </div>
        </div>
      `;

      card.querySelector(".see-more").addEventListener("click", () => openDialog(item));
      grid.appendChild(card);
    });
  }

  function openDialog(item) {
    document.getElementById("dlgType").textContent = item.type;
    document.getElementById("dlgTitle").textContent = item.title;
    document.getElementById("dlgMeta").textContent = `${item.date} • ${item.place}`;
    document.getElementById("dlgImage").src = item.image;
    document.getElementById("dlgImage").alt = item.title;
    document.getElementById("dlgDescription").textContent = item.desc;
    document.getElementById("dlgDate").textContent = item.date;
    document.getElementById("dlgPlace").textContent = item.place;
    document.getElementById("dlgHighlights").innerHTML = item.highlights.map(h => `<li>${h}</li>`).join("");

    if (dialog?.showModal) dialog.showModal();
    else if (dialog) dialog.setAttribute("open", "");
  }

  renderCards();

  closeBtn?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});
