// ==========================
// search.js
// Youth Connect Tamil Nadu
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const globalSearch = document.getElementById("globalSearch");

    function filterNews(keyword) {

        const cards = document.querySelectorAll(".news-card");

        keyword = keyword.toLowerCase();

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(keyword)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }

    if (searchInput) {

        searchInput.addEventListener("keyup", e => {

            filterNews(e.target.value);

        });

    }

    if (globalSearch) {

        globalSearch.addEventListener("keyup", e => {

            filterNews(e.target.value);

        });

    }

});