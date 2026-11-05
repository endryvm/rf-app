// RF App · trabajador en segundo plano: abre sin internet y recibe las notificaciones
const C = 'rf-app-v2';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'index.html', 'manifest.webmanifest', 'icon-192.png']))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./')))); });
self.addEventListener('push', e => { let d = {}; try { d = e.data.json(); } catch (_) { d = { title: 'RF App', body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'RF App', { body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', data: { url: d.url || './' } })); });
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(clients.matchAll({ type: 'window' }).then(ws => { const w = ws.find(x => 'focus' in x); return w ? w.focus() : clients.openWindow(e.notification.data.url || './'); })); });
