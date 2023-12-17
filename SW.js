const staticCacheName = "site-static";

const assets = [
  "/",
  "/contact",
  "/css/style.css",
  "/index.html",
  "/contact.html",
  "/manifest.json",
  "/favicon.ico",
  "/images/guitar-icon.jpg",
  "/images/guitar-icon(1).jpg",
  "/images/guitar-icon(2).jpg",
  "/images/guitar-icon(3).jpg",
  "/images/guitar-icon(4).jpg",
  "/images/guitar-icon(5).jpg",
  "/images/guitar-icon(7).jpg",
  "/images/guitar-icon(8).jpg",
  "/images/sweetHomeAlabama.png",
  "/images/guitar.jpg",
  "/images/sweetChildTab.jpg",
  "/images/standbyme.JPG",
];

self.addEventListener("install", (event) => {
  console.log("service worker has been installed");
  const filesUpdate = (cache) => {
    const stack = [];
    assets.forEach((file) =>
      stack.push(
        cache
          .add(file)
          .catch((_) => console.error(`can't load ${file} to cache`))
      )
    );
    return Promise.all(stack);
  };

  event.waitUntil(caches.open(staticCacheName).then(filesUpdate));
});
//activate event
self.addEventListener("activate", (event) => {
  //console.log("service worker has been activated");
});

//fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request);
    })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync") {
    event.waitUntil(pushNotify());
  }
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-two") {
    event.waitUntil(pushNotifyTwo());
  }
});
function pushNotify() {
  self.registration.showNotification(`Message sent!`);
}
function pushNotifyTwo() {
  self.registration.showNotification(`You are online`);
}
