const CACHE_NAME = 'cache-v1';
const URLS_TO_CACHE = [
  // "/index.html",
  // "https://unpkg.com/dexie/dist/dexie.js",
  // "/js/loadedEventSupport.js",
  // "/js/material-design/material-design-3.js",
  // "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
  // "https://unpkg.com/dexie/dist/dexie.js",
  // "/css/material-design-3/light.css",
  // "/css/material-design-3/light-hc.css",
  // "/css/material-design-3/light-mc.css",
  // "/css/material-design-3/dark.css",
  // "/css/material-design-3/dark-hc.css",
  // "/css/material-design-3/dark-mc.css",
  // "https://esm.run/@material/web/all.js",
  // "https://esm.run/@material/web/typography/md-typescale-styles.js",
  // "https://cdn.jsdelivr.net/npm/@material/web/typography/md-typescale-styles.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@material/web/all.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-html/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-element/lit-element.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-html/is-server.js/+esm",
  // "https://cdn.jsdelivr.net/npm/tslib/+esm",
  // "https://cdn.jsdelivr.net/npm/lit/decorators.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit/static-html.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit/directives/class-map.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit/directives/style-map.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit/directives/when.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit/directives/live.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/custom-element.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/property.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/state.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/event-options.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/query.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/query-all.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/query-async.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/query-assigned-elements.js/+esm",
  // "https://cdn.jsdelivr.net/npm/@lit/reactive-element/decorators/query-assigned-nodes.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-html/directives/when.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-html/directives/class-map.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-html/directives/style-map.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-html/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-html/static.js/+esm",
  // "https://cdn.jsdelivr.net/npm/lit-html/directives/live.js/+esm",
  // "https://fonts.gstatic.com/s/roboto/v47/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにレスポンスがあればそれを返す
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }

        console.log('Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(response => {
            console.log(response)
            // レスポンスが有効であればキャッシュに保存する
            if (!response || !response.ok) {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Cached new response:', event.request.url);
              });

            return response;
          });
      })
  );
});

// self.addEventListener('activate', event => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });