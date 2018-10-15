importScripts("/workbox/workbox-sw.js");

workbox.setConfig({ modulePathPrefix: "/workbox" });

if (workbox) {
  console.log("Installing service worker");

  workbox.routing.registerRoute(/\/static\//, workbox.strategies.networkFirst());
  workbox.routing.registerRoute("/device", workbox.strategies.networkFirst());
  workbox.routing.registerRoute("/", workbox.strategies.networkFirst());

  workbox.skipWaiting();
  workbox.clientsClaim();
}
