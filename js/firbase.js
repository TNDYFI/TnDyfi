// ==========================
// firebase.js
// Youth Connect Tamil Nadu
// ==========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// ======================================
// Firebase Config
// ======================================

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID"

};

// ======================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// ======================================
// Load News
// ======================================

const newsContainer = document.getElementById("newsContainer");

async function loadNews() {

    if (!newsContainer) return;

    newsContainer.innerHTML = `
        <div class="loading"></div>
    `;

    try {

        const q = query(
            collection(db, "news"),
            orderBy("date", "desc")
        );

        const snapshot = await getDocs(q);

        newsContainer.innerHTML = "";

        snapshot.forEach((doc) => {

            const data = doc.data();

            newsContainer.innerHTML += `

            <div class="news-card fade-up">

                <img src="${data.image}" alt="">

                <div class="news-content">

                    <span class="news-category">
                        ${data.category}
                    </span>

                    <h3 class="news-title">
                        ${data.title}
                    </h3>

                    <p class="news-desc">
                        ${data.description}
                    </p>

                    <div class="news-footer">

                        <button class="read-btn">
                            Read More
                        </button>

                        <div class="news-actions">

                            <button>
                                <i class="fas fa-share"></i>
                            </button>

                            <button>
                                <i class="fas fa-heart"></i>
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            `;

        });

        if (snapshot.empty) {

            newsContainer.innerHTML = `
                <h3 class="text-center">
                    No News Available
                </h3>
            `;

        }

    } catch (error) {

        console.error(error);

        newsContainer.innerHTML = `
            <h3 class="text-center">
                Failed to Load News
            </h3>
        `;

    }

}

loadNews();

export { db };