// ==========================
// service-worker.js
// Youth Connect Tamil Nadu
// ==========================

const CACHE_NAME = "youth-connect-v1";

const FILES_TO_CACHE = [

    "/",
    "/index.html",

    "/css/style.css",
    "/css/responsive.css",

    "/js/app.js",
    "/js/firebase.js",
    "/js/search.js",
    "/js/notification.js",

    "/manifest.json",

    "/assets/logo.png"

];

// Install

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});

// Activate

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

// Fetch

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request).then(response => {

            return response || fetch(event.request);

        })

    );

});