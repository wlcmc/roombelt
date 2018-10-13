importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

if (workbox) {
  console.log("Installing service worker");

  workbox.routing.registerRoute(/\/static\//, workbox.strategies.networkFirst());
  workbox.routing.registerRoute('/device', workbox.strategies.networkFirst());
}
