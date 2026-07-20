document.addEventListener("DOMContentLoaded", () => {
  const eventFeed = document.getElementById("eventFeed");
  if (!eventFeed) return;

  const events = [
    {
      title: "Event 1",
      badge: "EVENT",
      image: "assets/event1.jpg",
      desc: "Upcoming youth event, meeting, and campaign schedule.",
      tags: ["#meeting", "#district"]
    },
    {
      title: "Event 2",
      badge: "MEETING",
      image: "assets/event2.jpg",
      desc: "District committee review and action plan meeting.",
      tags: ["#committee", "#tn"]
    },
    {
      title: "Event 3",
      badge: "CAMPAIGN",
      image: "assets/event3.jpg",
      desc: "Green Tamil Nadu tree plantation drive across local regions.",
      tags: ["#green", "#youth"]
    },
    {
      title: "Event 4",
      badge: "SEMINAR",
      image: "assets/event4.jpg",
      desc: "Education and employment guidance program for students.",
      tags: ["#education", "#growth"]
    },
    {
      title: "Event 5",
      badge: "CONFERENCE",
      image: "assets/event5.jpg",
      desc: "State level youth conference and cultural meet.",
      tags: ["#state", "#meet"]
    },
    {
      title: "Event 6",
      badge: "WELFARE",
      image: "assets/event6.jpg",
      desc: "Blood donation camp organized by district volunteers.",
      tags: ["#blood", "#service"]
    },
    {
      title: "Event 7",
      badge: "AWARENESS",
      image: "assets/event7.jpg",
      desc: "Public awareness rally on social rights and equality.",
      tags: ["#rally", "#rights"]
    },
    {
      title: "Event 8",
      badge: "SPORTS",
      image: "assets/event8.jpg",
      desc: "District level youth sports tournament and awards.",
      tags: ["#sports", "#energy"]
    },
    {
      title: "Event 9",
      badge: "MEETING",
      image: "assets/event9.jpg",
      desc: "Monthly executive committee planning and review session.",
      tags: ["#review", "#team"]
    },
    {
      title: "Event 10",
      badge: "ANNUAL",
      image: "assets/event10.jpg",
      desc: "Annual day celebration and volunteer felicitation ceremony.",
      tags: ["#annual", "#celebration"]
    }
  ];

  eventFeed.innerHTML = events.map(ev => `
    <article class="event-card">
      <img src="${ev.image}" alt="${ev.title}" onerror="this.src='assets/news1.jpg'">
      <div class="card-content">
        <span class="badge">${ev.badge}</span>
        <h3>${ev.title}</h3>
        <p>${ev.desc}</p>
        <div style="margin-top: 12px; display: flex; gap: 8px;">
          ${ev.tags.map(tag => `<span style="font-size: 12px; font-weight: 700; color: var(--primary);">${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
});
