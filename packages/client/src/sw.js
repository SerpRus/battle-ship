import { precacheAndRoute, getCacheKeyForURL } from 'workbox-precaching';
import { cacheNames } from 'workbox-core';
/* eslint-disable no-restricted-globals */
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', async event => {
  event.respondWith(
    caches.match(getCacheKeyForURL(event.request)).then(response => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(cacheNames.precache).then(cache => {
          cache.put(getCacheKeyForURL(event.request), responseToCache);
        });

        return response;
      });
    })
  );
});
/* eslint-enable no-restricted-globals */
