let cacheNavn = "elprisen-v1";

let filer = [
    "./",
    "index.html",
    "offline.html",
    "manifest.json",
    "assets/css/reset.css",
    "assets/css/style.css",
    "assets/js/model.js",
    "assets/js/view.js",
    "assets/js/controller.js",
    "assets/img/logo.svg",
    "assets/img/gear.svg",
    "assets/img/xmark.svg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheNavn).then(function (cache) {
            return cache.addAll(filer);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        fetch(event.request)
            .then(function (svar) {
                let kopi = svar.clone();
                caches.open(cacheNavn).then(function (cache) {
                    cache.put(event.request, kopi);
                });
                return svar;
            })
            .catch(function () {
                return caches.match(event.request).then(function (fundet) {
                    if (fundet) {
                        return fundet;
                    }
                    return caches.match("offline.html");
                });
            })
    );
});