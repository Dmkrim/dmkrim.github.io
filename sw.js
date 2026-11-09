const C="pp-v38";
const F=["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","anim/followup.webp","anim/goals.webp","anim/legal.webp","anim/step01.webp","anim/step02.webp","anim/step03.webp","anim/step04.webp","anim/step05.webp","anim/step06.webp","anim/step07.webp","anim/step08.webp","anim/step09.webp","anim/step10.webp","anim/step11.webp","anim/step12.webp","anim/step13.webp","anim/step14.webp","anim/welcome.webp"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
const u=new URL(e.request.url);if(u.pathname.indexOf("assetlinks")>-1||u.pathname.indexOf(".well-known")>-1)return;
e.respondWith(fetch(e.request).then(res=>{if(res.ok&&u.origin===location.origin){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
