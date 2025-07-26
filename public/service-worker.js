/* eslint-env serviceworker */
/* eslint no-restricted-globals: 0 */
// public/service-worker.js

self.addEventListener("install", (e) => {
  console.log("✅ Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("🔁 Service Worker activated");
  self.clients.claim();
});

// Placeholder for potential future use (e.g., push notifications)
self.addEventListener("message", (event) => {
  console.log("📩 Message received in Service Worker", event.data);
});
