document.addEventListener("DOMContentLoaded", () => {
  const photoSet = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80"
  ];

  const states = ["Tamil Nadu"];
  const districts = [
    "Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Erode","Tirunelveli",
    "Thoothukudi","Vellore","Tiruppur","Kanchipuram","Thanjavur","Dindigul","Kanyakumari"
  ];

  const leaderRoles = [
    "State President","State Secretary","State Treasurer","State Vice President",
    "State Joint Secretary","State Organizing Secretary","State Public Relations Secretary",
    "State Education Secretary","State Cultural Secretary","State Women Coordinator",
    "State Youth Coordinator","State Media Coordinator"
  ];

  const committeeRoles = [
    "State Committee Member"
  ];

  const socialBase = [
    { label: "Facebook", icon: "fa-facebook-f", url: "https://facebook.com" },
    { label: "Instagram", icon: "fa-instagram", url: "https://instagram.com" },
    { label: "YouTube", icon: "fa-youtube", url: "https://youtube.com" },
    { label: "X", icon: "fa-x-twitter", url: "https://x.com" }
  ];

  const leaders = Array.from({ length: 12 }, (_, i) => createMember({
    id: `L${i+1}`,
    name: `Leader ${i+1}`,
    role: leaderRoles[i],
    district: districts[i % districts.length],
    state: "Tamil Nadu",
    qualification: ["M.A.", "M.Com.", "B.Sc.", "M.S.W.", "MBA"][i % 5],
    phone: `98765432${String(i).padStart(2, "0")}`,
    whatsapp: `98765432${String(i).padStart(2, "0")}`,
    bio: `Experienced public leader with strong organizational skills, field coordination experience, and a clear commitment to social work and youth mobilization.`,
    image: photoSet[i % photoSet.length]
  }));

  const committee = Array.from({ length: 41 }, (_, i) => createMember({
    id: `C${i+1}`,
    name: `Committee Member ${i+1}`,
    role: committeeRoles[0],
    district: districts[i % districts.length],
    state: "Tamil Nadu",
    qualification: ["B.A.", "B.Com.", "B.Sc.", "M.A.", "M.Sc.", "Diploma"][i % 6],
    phone: `900000${String(100 + i).slice(-3)}`,
    whatsapp: `900000${String(100 + i).slice(-3)}`,
    bio: `Active district-level member involved in local programs, student support, social campaigns, and community outreach activities.`,
    image: photoSet[(i + 1) % photoSet.length]
  }));

  const leadGrid = document.getElementById("leadGrid");
  const committeeGrid = document.getElementById("committeeGrid");
  const dialog = document.getElementById("memberDialog");
  const closeBtn = document.getElementById("closeDialog");

  if (!leadGrid || !committeeGrid) return;

  function createMember(data) {
    return {
      ...data,
      social: socialBase.map(s => ({ ...s, url: `${s.url}/${data.id.toLowerCase()}` }))
    };
  }

  function cardHTML(member) {
    return `
      <img class="member-photo" src="${member.image}" alt="${member.name}">
      <div class="member-body">
        <div class="member-name">${member.name}</div>
        <div class="member-role">${member.role}</div>
        <div class="member-meta">
          <div><i class="fas fa-location-dot"></i> ${member.district}</div>
          <div><i class="fas fa-globe"></i> ${member.state}</div>
        </div>
        <div class="member-actions">
          <button class="see-more" type="button">See More</button>
          <a class="whatsapp" target="_blank" rel="noopener noreferrer" href="https://wa.me/91${member.whatsapp}?text=${encodeURIComponent("Hello " + member.name)}">
            WhatsApp
          </a>
        </div>
      </div>
    `;
  }

  function renderGrid(grid, list) {
    grid.innerHTML = "";
    list.forEach(member => {
      const card = document.createElement("article");
      card.className = "member-card";
      card.innerHTML = cardHTML(member);
      card.querySelector(".see-more").addEventListener("click", () => openDialog(member));
      grid.appendChild(card);
    });
  }

  function openDialog(member) {
    document.getElementById("dlgPhoto").src = member.image;
    document.getElementById("dlgPhoto").alt = member.name;
    document.getElementById("dlgRoleTag").textContent = member.role;
    document.getElementById("dlgName").textContent = member.name;
    document.getElementById("dlgRole").textContent = member.role;
    document.getElementById("dlgDistrict").textContent = `${member.district} • ${member.state}`;
    document.getElementById("dlgBio").textContent = member.bio;
    document.getElementById("dlgQualification").textContent = member.qualification;
    document.getElementById("dlgState").textContent = member.state;
    document.getElementById("dlgPhone").textContent = member.phone;
    document.getElementById("dlgWhatsapp").innerHTML = `<a href="https://wa.me/91${member.whatsapp}" target="_blank" rel="noopener noreferrer">+91 ${member.whatsapp}</a>`;
    document.getElementById("dlgSocial").innerHTML = member.social.map(s => `
      <a class="social-link" href="${s.url}" target="_blank" rel="noopener noreferrer">
        <i class="fab ${s.icon}"></i> ${s.label}
      </a>
    `).join("");

    if (dialog?.showModal) dialog.showModal();
    else if (dialog) dialog.setAttribute("open", "");
  }

  renderGrid(leadGrid, leaders);
  renderGrid(committeeGrid, committee);

  closeBtn?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});
