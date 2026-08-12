/**
 * Service worker de l'application « Devis Fondations ».
 *
 * Objectif : rendre l'outil de métré utilisable sur chantier, sans réseau.
 * Principes de prudence :
 *   — jamais de cache pour /api et /admin (données et sessions) ;
 *   — réseau d'abord pour les pages, cache d'abord pour les fichiers versionnés.
 */

const CACHE = 'azes-devis-fondations-v1'

const COQUILLE = [
  '/devis-fondations',
  '/devis-fondations.webmanifest',
  '/icons/devis-192.png',
  '/icons/devis-512.png',
  '/logo.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        Promise.allSettled(COQUILLE.map((url) => cache.add(new Request(url, { cache: 'reload' }))))
      )
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cles) => Promise.all(cles.filter((c) => c !== CACHE).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  )
})

function cacheable(response) {
  return response && response.status === 200 && response.type === 'basic'
}

async function reseauDAbord(request, secours) {
  try {
    const reponse = await fetch(request)
    if (cacheable(reponse)) {
      const copie = reponse.clone()
      caches.open(CACHE).then((cache) => cache.put(request, copie))
    }
    return reponse
  } catch (erreur) {
    const enCache = await caches.match(request)
    if (enCache) return enCache
    if (secours) {
      const page = await caches.match(secours)
      if (page) return page
    }
    throw erreur
  }
}

async function cacheDAbord(request) {
  const enCache = await caches.match(request)
  if (enCache) return enCache
  const reponse = await fetch(request)
  if (cacheable(reponse)) {
    const copie = reponse.clone()
    caches.open(CACHE).then((cache) => cache.put(request, copie))
  }
  return reponse
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin')) return
  // Les charges utiles React Server Components ne sont pas mises en cache.
  if (url.searchParams.has('_rsc')) return

  if (request.mode === 'navigate') {
    event.respondWith(reseauDAbord(request, '/devis-fondations'))
    return
  }

  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    /\.(?:css|js|png|jpg|jpeg|svg|webp|woff2?)$/.test(url.pathname)
  ) {
    event.respondWith(cacheDAbord(request))
    return
  }

  event.respondWith(reseauDAbord(request))
})
