document.addEventListener("DOMContentLoaded", () => {
  const districts = [
    {name:"Ariyalur", ta:"அரியலூர்", count:21000, color:"#16a085"},
    {name:"Chengalpattu", ta:"செங்கல்பட்டு", count:36000, color:"#1abc9c"},
    {name:"Chennai North", ta:"வட சென்னை", count:32000, color:"#e74c3c"},
    {name:"Chennai Central", ta:"மத்திய சென்னை", count:28500, color:"#3498db"},
    {name:"Chennai South", ta:"தென் சென்னை", count:31000, color:"#9b59b6"},
    {name:"Coimbatore", ta:"கோயம்புத்தூர்", count:78900, color:"#f39c12"},
    {name:"Cuddalore", ta:"கடலூர்", count:38000, color:"#34495e"},
    {name:"Dharmapuri", ta:"தர்மபுரி", count:34500, color:"#2ecc71"},
    {name:"Dindigul", ta:"திண்டுக்கல்", count:44000, color:"#c0392b"},
    {name:"Erode", ta:"ஈரோடு", count:37000, color:"#27ae60"},
    {name:"Kallakurichi", ta:"கள்ளக்குறிச்சி", count:31000, color:"#f39c12"},
    {name:"Kancheepuram", ta:"காஞ்சிபுரம்", count:33000, color:"#f1c40f"},
    {name:"Kanniyakumari", ta:"கன்னியாகுமரி", count:39000, color:"#16a085"},
    {name:"Karur", ta:"கரூர்", count:25000, color:"#d35400"},
    {name:"Krishnagiri", ta:"கிருஷ்ணகிரி", count:32000, color:"#3498db"},
    {name:"Madurai", ta:"மதுரை மாநகரம்", count:42000, color:"#27ae60"},
    {name:"Madurai Suburban", ta:"மதுரை புறநகர்", count:35000, color:"#1abc9c"},
    {name:"Mayiladuthurai", ta:"மயிலாடுதுறை", count:22500, color:"#d35400"},
    {name:"Nagapattinam", ta:"நாகப்பட்டினம்", count:29000, color:"#9b59b6"},
    {name:"Namakkal", ta:"நாமக்கல்", count:29500, color:"#2980b9"},
    {name:"Nilgiris", ta:"நீலகிரி", count:18000, color:"#c0392b"},
    {name:"Perambalur", ta:"பெரம்பலூர்", count:19500, color:"#8e44ad"},
    {name:"Pudukkottai", ta:"புதுக்கோட்டை", count:33500, color:"#27ae60"},
    {name:"Ramanathapuram", ta:"ராமநாதபுரம்", count:28000, color:"#f39c12"},
    {name:"Ranipet", ta:"ராணிப்பேட்டை", count:25500, color:"#27ae60"},
    {name:"Salem", ta:"சேலம்", count:61200, color:"#2c3e50"},
    {name:"Sivaganga", ta:"சிவகங்கை", count:27500, color:"#e67e22"},
    {name:"Tenkasi", ta:"தென்காசி", count:28000, color:"#e74c3c"},
    {name:"Thanjavur", ta:"தஞ்சாவூர்", count:48500, color:"#d35400"},
    {name:"Theni", ta:"தேனி", count:26000, color:"#2c3e50"},
    {name:"Thoothukudi", ta:"தூத்துக்குடி", count:41000, color:"#1abc9c"},
    {name:"Tiruchirappalli", ta:"திருச்சி", count:65100, color:"#16a085"},
    {name:"Tirunelveli", ta:"திருநெல்வேலி", count:54300, color:"#e67e22"},
    {name:"Tirupathur", ta:"திருப்பத்தூர்", count:24000, color:"#2980b9"},
    {name:"Tiruppur", ta:"திருப்பூர்", count:46000, color:"#8e44ad"},
    {name:"Tiruvallur", ta:"திருவள்ளூர்", count:31500, color:"#2ecc71"},
    {name:"Tiruvannamalai", ta:"திருவண்ணாமலை", count:39000, color:"#f1c40f"},
    {name:"Tiruvarur", ta:"திருவாரூர்", count:31000, color:"#1abc9c"},
    {name:"Vellore", ta:"வேலூர்", count:52100, color:"#2980b9"},
    {name:"Viluppuram", ta:"விழுப்புரம்", count:40500, color:"#e74c3c"},
    {name:"Virudhunagar", ta:"விருதுநகர்", count:34000, color:"#2980b9"}
  ];

  const detailsMap = {};
  districts.forEach(d => {
    detailsMap[d.name] = {
      districtDetails: `${d.ta} மாவட்ட அமைப்பு DYFI-யின் செயற்பாட்டுப் பகுதிகளில் ஒன்றாக செயல்பட்டு, இளைஞர் இயக்கங்கள், சமூக சேவை, கல்வி மற்றும் வேலைவாய்ப்பு தொடர்பான பணிகளில் ஈடுபடுகிறது.`,
      membership: [
        `செயலில் உள்ள உறுப்பினர்கள்: ${d.count.toLocaleString()}`,
        `சேர்க்கை விதிமுறை: அமைப்பின் கொள்கைகளை ஏற்று இணையலாம்`,
        `உறுப்பினர் வகைகள்: செயல் உறுப்பினர், ஆதரவாளர், ஒருங்கிணைப்பாளர்`,
        `மாவட்ட அளவிலான குழுக்கள் மூலம் இயக்கம் நடத்தப்படுகிறது`
      ],
      social: [
        {label:"Facebook", url:"https://www.facebook.com/share/191ns6fitb/"},
        {label:"Instagram", url:"https://www.instagram.com/dyfitn?igsh=M2M3YWxkanJ0NGNv"},
        {label:"Website", url:"https://dyfitamilnadu.org"},
        {label:"YouTube", url:"https://youtube.com/@dyfitamilnadu2231?si=VPq2jHD9DJPWWt9X"},
        {label:"X", url:"https://x.com/dyfitn"}
      ],
      contacts: [
        {label:"Mail", value:"info@dyfitamilnadu.com", href:"mailto:info@dyfitamilnadu.com"},
        {label:"Phone", value:"1234567890", href:"tel:1234567890"}
      ]
    };
  });

  const grid = document.getElementById("districtGrid");
  const scrollBox = document.getElementById("districtScrollBox");
  const search = document.getElementById("districtSearch");
  const clearBtn = document.getElementById("clearSearchBtn");
  const dialog = document.getElementById("districtDialog");
  const closeDialog = document.getElementById("closeDialog");
  const tnCount = document.getElementById("tnCount");
  const districtCount = document.getElementById("districtCount");
  const copyBtn = document.getElementById("copyDistrictBtn");

  if (!grid || !scrollBox || !search || !dialog) return;

  districtCount.textContent = districts.length.toString();
  animateCounter(tnCount, districts.reduce((sum, d) => sum + d.count, 0));

  function animateCounter(el, end, duration = 1500) {
    let start = 0, startTime = null;
    function step(t) {
      if (!startTime) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      el.textContent = Math.floor(p * (end - start) + start).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderDistricts(list) {
    grid.innerHTML = "";
    scrollBox.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-box">No district found matching your search.</div>`;
      scrollBox.innerHTML = `<div style="padding:10px; color:var(--muted); font-size:13px;">No district found</div>`;
      return;
    }

    list.forEach(d => {
      const card = document.createElement("article");
      card.className = "dist-card";
      card.style.background = `linear-gradient(135deg, ${d.color}, #111827)`;
      card.innerHTML = `
        <div class="name">${d.ta}</div>
        <div class="count">${d.count.toLocaleString()} Members</div>
        <div class="tap">Tap for details</div>
      `;
      card.addEventListener("click", () => openDistrict(d));
      grid.appendChild(card);

      const row = document.createElement("div");
      row.className = "dist-row";
      row.style.background = d.color;
      row.innerHTML = `<span>${d.ta}</span><span>${d.count.toLocaleString()}</span>`;
      row.addEventListener("click", () => openDistrict(d));
      scrollBox.appendChild(row);
    });
  }

  function openDistrict(d) {
    const data = detailsMap[d.name];
    if(!data) return;
    document.getElementById("dlgName").textContent = d.ta;
    document.getElementById("dlgCount").textContent = `${d.count.toLocaleString()} Members`;
    document.getElementById("dlgTag").textContent = d.name;
    document.getElementById("dlgBanner").style.background = `linear-gradient(135deg, ${d.color}, #111827)`;
    document.getElementById("dlgDistrictDetails").textContent = data.districtDetails;
    document.getElementById("dlgMembership").innerHTML = data.membership.map(i => `<li>${i}</li>`).join("");
    document.getElementById("dlgSocial").innerHTML = data.social.map(s => `<a class="social-link" href="${s.url}" target="_blank" rel="noopener noreferrer"><i class="fas fa-link"></i> ${s.label}</a>`).join("");
    document.getElementById("dlgContact").innerHTML = data.contacts.map(c => `<a class="contact-link" href="${c.href}">${c.label}: ${c.value}</a>`).join("");
    dialog.showModal();
  }

  function applySearch() {
    const q = search.value.trim().toLowerCase();
    if (q === "") {
      renderDistricts(districts);
      return;
    }
    const filtered = districts.filter(d =>
      d.ta.toLowerCase().includes(q) || d.name.toLowerCase().includes(q)
    );
    renderDistricts(filtered);
  }

  search.addEventListener("input", applySearch);
  clearBtn.addEventListener("click", () => {
    search.value = "";
    applySearch();
    search.focus();
  });

  closeDialog.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

  copyBtn.addEventListener("click", async () => {
    const text = districts.map(d => `${d.ta} (${d.name}) - ${d.count.toLocaleString()} Members`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => copyBtn.innerHTML = '<i class="fas fa-copy"></i>', 1500);
    } catch {}
  });

  renderDistricts(districts);
});
