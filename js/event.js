import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const container = document.getElementById("eventsContainer");

async function loadEvents() {

    container.innerHTML = '<div class="loading"></div>';

    const snapshot = await getDocs(collection(db, "events"));

    container.innerHTML = "";

    snapshot.forEach((doc) => {

        const e = doc.data();

        container.innerHTML += `
        <div class="event-card">
            <img src="${e.image}">
            <div class="card-content">
                <span class="badge">${e.date}</span>
                <h3>${e.title}</h3>
                <p>${e.location}</p>
                <p>${e.description}</p>

                <a href="${e.registerLink}" class="join-btn">
                    Register
                </a>
            </div>
        </div>`;
    });

}

loadEvents();