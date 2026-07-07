import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const container = document.getElementById("galleryContainer");

async function loadGallery() {

    container.innerHTML = '<div class="loading"></div>';

    const snapshot = await getDocs(collection(db, "gallery"));

    container.innerHTML = "";

    snapshot.forEach((doc) => {

        const item = doc.data();

        container.innerHTML += `
            <img src="${item.image}"
                 alt="${item.title}"
                 class="gallery-image">
        `;
    });

}

loadGallery();