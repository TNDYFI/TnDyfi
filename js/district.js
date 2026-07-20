document.addEventListener("DOMContentLoaded", () => {
  const districts = [
    {name:"வட சென்னை", count:32000, color:"#e74c3c"},
    {name:"மத்திய சென்னை", count:28500, color:"#3498db"},
    {name:"தென் சென்னை", count:31000, color:"#9b59b6"},
    {name:"மதுரை மாநகரம்", count:42000, color:"#27ae60"},
    {name:"மதுரை புறநகர்", count:35000, color:"#1abc9c"},
    {name:"கோவை", count:78900, color:"#f39c12"},
    {name:"திருச்சி", count:65100, color:"#16a085"},
    {name:"நெல்லை", count:54300, color:"#e67e22"},
    {name:"சேலம்", count:61200, color:"#2c3e50"},
    {name:"தஞ்சாவூர்", count:48500, color:"#d35400"},
    {name:"வேலூர்", count:52100, color:"#2980b9"},
    {name:"திண்டுக்கல்", count:44000, color:"#c0392b"},
    {name:"தூத்துக்குடி", count:41000, color:"#1abc9c"},
    {name:"கன்னியாகுமரி", count:39000, color:"#16a085"},
    {name:"ஈரோடு", count:37000, color:"#27ae60"},
    {name:"விருதுநகர்", count:34000, color:"#2980b9"},
    {name:"திருப்பூர்", count:46000, color:"#8e44ad"},
    {name:"காஞ்சிபுரம்", count:33000, color:"#f1c40f"},
    {name:"திருவள்ளூர்", count:31500, color:"#2ecc71"},
    {name:"கடலூர்", count:38000, color:"#34495e"},
    {name:"விழுப்புரம்", count:40500, color:"#e74c3c"},
    {name:"நாகப்பட்டினம்", count:29000, color:"#9b59b6"},
    {name:"திருவாரூர்", count:31000, color:"#1abc9c"},
    {name:"புதுக்கோட்டை", count:33500, color:"#27ae60"},
    {name:"ராமநாதபுரம்", count:28000, color:"#f39c12"},
    {name:"சிவகங்கை", count:27500, color:"#e67e22"},
    {name:"தேனி", count:26000, color:"#2c3e50"},
    {name:"கரூர்", count:25000, color:"#d35400"},
    {name:"நாமக்கல்", count:29500, color:"#2980b9"},
    {name:"நீலகிரி", count:18000, color:"#c0392b"},
    {name:"அரியலூர்", count:21000, color:"#16a085"},
    {name:"பெரம்பலூர்", count:19500, color:"#8e44ad"},
    {name:"தர்மபுரி", count:34500, color:"#2ecc71"},
    {name:"கிருஷ்ணகிரி", count:32000, color:"#3498db"},
    {name:"திருவண்ணாமலை", count:39000, color:"#f1c40f"},
    {name:"தென்காசி", count:28000, color:"#e74c3c"},
    {name:"ராணிப்பேட்டை", count:25500, color:"#27ae60"},
    {name:"திருப்பத்தூர்", count:24000, color:"#2980b9"},
    {name:"கள்ளக்குறிச்சி", count:31000, color:"#f39c12"},
    {name:"செங்கல்பட்டு", count:36000, color:"#16a085"},
    {name:"மயிலாடுதுறை", count:22500, color:"#d35400"}
  ];

  const detailsMap = {};
  districts.forEach(d => {
    detailsMap[d.name] = {
      districtDetails: `${d.name} மாவட்ட அமைப்பு DYFI-யின் செயற்பாட்டுப் பகுதிகளில் ஒன்றாக செயல்பட்டு, இளைஞர் இயக்கங்கள், சமூக சேவை, கல்வி மற்றும் வேலைவாய்ப்பு தொடர்பான பணிகளில் ஈடுபடுகிறது.`,
      membership: [
        `செயலில் உள்ள உறுப்பினர்கள்: ${d.count.toLocaleString()}`,
        `மாணவர் மற்றும் இளைஞர் இணைப்புகள்: மாவட்ட அளவில் செயல்பாடு`,
        `சேர்க்கை விதிமுறை: அமைப்பின் கொள்கைகளை ஏற்று இணையலாம்`,
        `உறுப்பினர் வகைகள்: செயல் உறுப்பினர், ஆதரவாளர், ஒருங்கிணைப்பாளர்`
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
  const dialog = document.getElementById("districtDialog");
  const closeDialog = document.getElementById("closeDialog");
  const tnCount = document.getElementById("tnCount");
  const copyBtn = document.getElementById("copyDistrictBtn");

  if (!grid || !scrollBox || !dialog) return;

  const total = districts.reduce((sum, d) => sum + d.count, 0);
  tnCount.textContent = total.toLocaleString();

  function renderDistricts(list) {
    grid.innerHTML = "";
    scrollBox.innerHTML = "";

    list.forEach(d => {
      const card = document.createElement("article");
      card.className = "dist-card";
      card.style.background = `linear-gradient(135deg, ${d.color}, #111827)`;
      card.innerHTML = `
        <div class="name">${d.name}</div>
        <div class="count">${d.count.toLocaleString()} Members</div>
        <div class="tap">Tap for details</div>
      `;
      card.addEventListener("click", () => openDistrict(d));
      grid.appendChild(card);

      const row = document.createElement("div");
      row.className = "dist-row";
      row.style.background = d.color;
      row.innerHTML = `<span>${d.name}</span><span>${d.count.toLocaleString()}</span>`;
      row.addEventListener("click", () => openDistrict(d));
      scrollBox.appendChild(row);
    });
  }

  function openDistrict(d) {
    const data = detailsMap[d.name];
    document.getElementById("dlgName").textContent = d.name;
    document.getElementById("dlgCount").textContent = `${d.count.toLocaleString()} Members`;
    document.getElementById("dlgDistrictDetails").textContent = data.districtDetails;

    const membership = document.getElementById("dlgMembership");
    const social = document.getElementById("dlgSocial");
    const contact = document.getElementById("dlgContact");

    membership.innerHTML = data.membership.map(item => `<li>${item}</li>`).join("");
    social.innerHTML = data.social.map(s => `<a class="social-link" href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join("");
    contact.innerHTML = data.contacts.map(c => `<a class="contact-link" href="${c.href}">${c.label}: ${c.value}</a>`).join("");

    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  renderDistricts(districts);

  search?.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    renderDistricts(districts.filter(d => d.name.toLowerCase().includes(q)));
  });

  closeDialog?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", e => {
    if (e.target === dialog) dialog.close();
  });

  copyBtn?.addEventListener("click", async () => {
    const text = districts.map(d => `${d.name} - ${d.count.toLocaleString()}`).join("
");
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => copyBtn.innerHTML = '<i class="fas fa-copy"></i>', 1200);
    } catch {}
  });
});
