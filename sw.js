importScripts('./node_modules/workbox-sw/build/workbox-sw.js')

const staticAssets = [
    './',
    './styles.css',
    './app.js',
    './fallback.json',
    './images/cat-fetch.jpg'
];

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  }

  workbox.routing.registerRoute(
    new RegExp('/(.*)'),
    workbox.strategies.staleWhileRevalidate(),
  );

    workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'static-resources',
    }),
  );
  
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );