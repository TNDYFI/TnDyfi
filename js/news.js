document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();

  const newsList = document.getElementById("newsList");
  const newsSearch = document.getElementById("newsSearch");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const openPostBtn = document.getElementById("openPostBtn");
  const postDialog = document.getElementById("postDialog");
  const closePostBtn = document.getElementById("closePostBtn");
  const cancelPostBtn = document.getElementById("cancelPostBtn");
  const postForm = document.getElementById("postForm");

  let allNews = [];
  let visibleCount = 4;

  const renderNews = (items) => {
    newsList.innerHTML = "";
    items.slice(0, visibleCount).forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const comments = data.comments || [];
      const likes = data.likes || 0;

      const card = document.createElement("article");
      card.className = "news-card";
      card.innerHTML = `
        <img src="${data.image || 'assets/news1.jpg'}" alt="${data.title}">
        <div class="card-content">
          <div class="news-top">
            <span class="badge">${(data.category || 'news').toUpperCase()}</span>
            <span class="news-date"><i class="far fa-clock"></i> ${data.date || ""}</span>
          </div>
          <h3>${data.title || ""}</h3>
          <p>${data.description || ""}</p>

          <div class="news-author">
            <img src="${data.authorImage || 'assets/profile.jpg'}" alt="author">
            <span>${data.author || "Youth Connect"}</span>
          </div>

          <div class="news-actions">
            <button class="icon-action like-btn ${data.liked ? 'liked' : ''}" data-id="${id}">
              <i class="fas fa-heart"></i> <span>${likes}</span>
            </button>
            <button class="icon-action toggle-comments" data-id="${id}">
              <i class="fas fa-comment"></i> <span>${comments.length}</span>
            </button>
          </div>

          <div class="comment-box" id="comments-${id}" style="display:none;">
            <div class="comment-list">
              ${comments.map(c => `<div class="comment-item"><strong>${c.name}</strong><p>${c.text}</p></div>`).join("")}
            </div>
            <form class="comment-form" data-id="${id}">
              <input type="text" name="comment" placeholder="Write a comment..." required>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      `;
      newsList.appendChild(card);
    });

    bindActions();
  };

  const bindActions = () => {
    document.querySelectorAll(".toggle-comments").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const box = document.getElementById(`comments-${id}`);
        box.style.display = box.style.display === "none" ? "block" : "none";
      };
    });

    document.querySelectorAll(".like-btn").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const ref = db.collection("news").doc(id);
        const snap = await ref.get();
        const current = snap.data()?.likes || 0;
        await ref.update({ likes: current + 1 });
      };
    });

    document.querySelectorAll(".comment-form").forEach((form) => {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const id = form.dataset.id;
        const input = form.querySelector("input[name='comment']");
        const text = input.value.trim();
        if (!text) return;

        const ref = db.collection("news").doc(id);
        const snap = await ref.get();
        const data = snap.data() || {};
        const comments = data.comments || [];
        comments.push({ name: "Guest", text });
        await ref.update({ comments });
        input.value = "";
      };
    });
  };

  db.collection("news").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
    allNews = snapshot.docs;
    const q = newsSearch.value.toLowerCase().trim();
    const filtered = allNews.filter((doc) => {
      const d = doc.data();
      return [d.title, d.description, d.category, d.author].join(" ").toLowerCase().includes(q);
    });
    renderNews(filtered);
  });

  newsSearch?.addEventListener("input", () => {
    const q = newsSearch.value.toLowerCase().trim();
    const filtered = allNews.filter((doc) => {
      const d = doc.data();
      return [d.title, d.description, d.category, d.author].join(" ").toLowerCase().includes(q);
    });
    renderNews(filtered);
  });

  loadMoreBtn?.addEventListener("click", () => {
    visibleCount += 4;
    const q = newsSearch.value.toLowerCase().trim();
    const filtered = allNews.filter((doc) => {
      const d = doc.data();
      return [d.title, d.description, d.category, d.author].join(" ").toLowerCase().includes(q);
    });
    renderNews(filtered);
  });

  openPostBtn?.addEventListener("click", () => postDialog.showModal());
  closePostBtn?.addEventListener("click", () => postDialog.close());
  cancelPostBtn?.addEventListener("click", () => postDialog.close());

  postForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("postTitle").value.trim();
    const description = document.getElementById("postDescription").value.trim();
    const category = document.getElementById("postCategory").value.trim().toLowerCase();
    const file = document.getElementById("postImage").files[0];

    let imageUrl = "assets/news1.jpg";
    if (file) {
      const ref = storage.ref(`news/${Date.now()}_${file.name}`);
      await ref.put(file);
      imageUrl = await ref.getDownloadURL();
    }

    await db.collection("news").add({
      title,
      description,
      category,
      image: imageUrl,
      author: "Youth Connect",
      authorImage: "assets/profile.jpg",
      likes: 0,
      comments: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      date: new Date().toLocaleDateString()
    });

    postForm.reset();
    postDialog.close();
  });
});
