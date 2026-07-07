// ==========================
// notification.js
// Youth Connect Tamil Nadu
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    const panel = document.getElementById("notificationPanel");
    const closeBtn = document.getElementById("closeNotification");
    const moreBtn = document.getElementById("moreBtn");

    if (moreBtn) {

        moreBtn.addEventListener("click", () => {

            panel.classList.add("active");

        });

    }

    if (closeBtn) {

        closeBtn.addEventListener("click", () => {

            panel.classList.remove("active");

        });

    }

    // Auto notification after 5 seconds
    setTimeout(() => {

        const list = document.querySelector(".notification-list");

        if (list) {

            const item = document.createElement("div");

            item.className = "notification-item";

            item.innerHTML = `
                <i class="fas fa-bell"></i>
                <div>
                    <h4>Latest Update</h4>
                    <p>New events and news have been added.</p>
                </div>
            `;

            list.prepend(item);

        }

    }, 5000);

});