import { hexoplusplus } from './kernel'
addEventListener("fetch", event => {
  event.respondWith(hexoplusplus(event.request))
})
