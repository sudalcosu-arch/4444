/**
 * CosAtelier Service Worker
 * 오프라인 지원 및 캐싱 전략
 */

const CACHE_NAME = 'cosatelier-v1';
const RUNTIME_CACHE = 'cosatelier-runtime-v1';
const API_CACHE = 'cosatelier-api-v1';

// 캐시할 정적 파일들
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Cache addAll failed:', err);
        // 일부 파일이 없을 수 있으므로 에러 무시
        return Promise.resolve();
      });
    })
  );
  
  // 새 Service Worker를 즉시 활성화
  self.skipWaiting();
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE && name !== API_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  
  // 모든 클라이언트에 즉시 제어권 획득
  self.clients.claim();
});

// 요청 처리 (캐시 우선 전략)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 같은 도메인의 요청만 처리
  if (url.origin !== location.origin) {
    return;
  }

  // GET 요청만 캐시
  if (request.method !== 'GET') {
    return;
  }

  // HTML 파일: 네트워크 우선, 실패 시 캐시
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 성공한 응답 캐시
          if (response.ok) {
            const cache = caches.open(RUNTIME_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          // 네트워크 실패 시 캐시에서 가져오기
          return caches.match(request).then((cached) => {
            if (cached) {
              console.log('[SW] Serving from cache:', request.url);
              return cached;
            }
            // 캐시도 없으면 오프라인 페이지
            return caches.match('/index.html');
          });
        })
    );
    return;
  }

  // 정적 자산 (JS, CSS, 이미지): 캐시 우선
  if (
    request.url.includes('/assets/') ||
    request.url.endsWith('.js') ||
    request.url.endsWith('.css') ||
    request.url.endsWith('.png') ||
    request.url.endsWith('.jpg') ||
    request.url.endsWith('.jpeg') ||
    request.url.endsWith('.svg') ||
    request.url.endsWith('.webp') ||
    request.url.endsWith('.woff') ||
    request.url.endsWith('.woff2') ||
    request.url.endsWith('.ttf')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          console.log('[SW] Serving from cache:', request.url);
          return cached;
        }

        return fetch(request)
          .then((response) => {
            if (response.ok) {
              const cache = caches.open(RUNTIME_CACHE);
              cache.then((c) => c.put(request, response.clone()));
            }
            return response;
          })
          .catch(() => {
            console.warn('[SW] Failed to fetch:', request.url);
            return new Response('Offline - Asset not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            });
          });
      })
    );
    return;
  }

  // API 요청: 네트워크 우선, 캐시 폴백
  if (request.url.includes('/api/') || request.url.includes('firebase')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(API_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          console.log('[SW] API offline, checking cache:', request.url);
          return caches.match(request).then((cached) => {
            if (cached) {
              return cached;
            }
            return new Response(
              JSON.stringify({ error: 'Offline - API not available' }),
              {
                status: 503,
                headers: new Headers({
                  'Content-Type': 'application/json',
                }),
              }
            );
          });
        })
    );
    return;
  }

  // 기타 요청: 네트워크 우선
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && request.method === 'GET') {
          const cache = caches.open(RUNTIME_CACHE);
          cache.then((c) => c.put(request, response.clone()));
        }
        return response;
      })
      .catch(() => {
        console.warn('[SW] Fetch failed:', request.url);
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      })
  );
});

// 백그라운드 동기화 (향후 기능)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // 오프라인 중에 수정한 데이터를 온라인 복구 시 동기화
      Promise.resolve()
    );
  }
});

console.log('[SW] Service Worker loaded');
