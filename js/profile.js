document.addEventListener("DOMContentLoaded", () => {
  const profileModal = document.getElementById("profileModal");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const closeProfileModal = document.getElementById("closeProfileModal");
  const cancelEdit = document.getElementById("cancelEdit");
  const profileForm = document.getElementById("profileForm");
  const profilePreview = document.getElementById("profilePreview");
  const imageUrl = document.getElementById("imageUrl");
  const profileImageInput = document.getElementById("profileImageInput");

  const fullName = document.getElementById("fullName");
  const username = document.getElementById("username");
  const bio = document.getElementById("bio");
  const dob = document.getElementById("dob");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  const fullNameText = document.getElementById("fullNameText");
  const usernameText = document.getElementById("usernameText");
  const dobText = document.getElementById("dobText");
  const emailText = document.getElementById("emailText");
  const phoneText = document.getElementById("phoneText");

  const profileNameView = document.getElementById("profileNameView");
  const profileUserView = document.getElementById("profileUserView");
  const profileBioView = document.getElementById("profileBioView");

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const openModal = () => {
    profileModal?.classList.add("active");
  };

  const closeModal = () => {
    profileModal?.classList.remove("active");
  };

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("profileData") || "{}");
    const name = data.name || "Youth Connect Member";
    const user = data.username || "@youthconnect";
    const bioText = data.bio || "Social service | Youth movement | Community support";
    const dobVal = data.dob || "2000-01-01";
    const mail = data.email || "hidden";
    const ph = data.phone || "hidden";
    const img = data.image || "assets/profile.jpg";

    profilePreview.src = img;
    profileNameView.textContent = name;
    profileUserView.textContent = user;
    profileBioView.textContent = bioText;

    fullNameText.textContent = name;
    usernameText.textContent = user;
    dobText.textContent = dobVal;
    emailText.textContent = mail;
    phoneText.textContent = ph;
  };

  const fillForm = () => {
    const data = JSON.parse(localStorage.getItem("profileData") || "{}");
    imageUrl.value = data.image || "";
    fullName.value = data.name || "";
    username.value = data.username || "";
    bio.value = data.bio || "";
    dob.value = data.dob || "";
    email.value = data.email || "";
    phone.value = data.phone || "";
  };

  editProfileBtn?.addEventListener("click", () => {
    fillForm();
    openModal();
  });

  closeProfileModal?.addEventListener("click", closeModal);
  cancelEdit?.addEventListener("click", closeModal);

  profileModal?.addEventListener("click", (e) => {
    if (e.target === profileModal) closeModal();
  });

  profileImageInput?.addEventListener("change", () => {
    const file = profileImageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      profilePreview.src = reader.result;
      const data = JSON.parse(localStorage.getItem("profileData") || "{}");
      data.image = reader.result;
      localStorage.setItem("profileData", JSON.stringify(data));
      loadData();
    };
    reader.readAsDataURL(file);
  });

  profileForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      image: imageUrl.value.trim() || profilePreview.src,
      name: fullName.value.trim() || "Youth Connect Member",
      username: username.value.trim() || "@youthconnect",
      bio: bio.value.trim() || "",
      dob: dob.value || "2000-01-01",
      email: email.value.trim() || "hidden",
      phone: phone.value.trim() || "hidden"
    };
    localStorage.setItem("profileData", JSON.stringify(data));
    loadData();
    closeModal();
  });

  loginBtn?.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "yes");
    loginBtn.textContent = "Login";
    alert("Logged in successfully");
  });

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully");
  });

  loadData();
});
