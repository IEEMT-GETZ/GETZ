const VERSION = "v0.0.1";
const CACHE_NAME = `getz-${VERSION}`;

const PRECACHE_ASSETS =
[
    "/css/",
    "/fonts/",
    "/js/",
    "/images/",
    "/pages/"
];

self.addEventListener("install", evt => 
{
    evt.waitUntil((async () => 
    {
        const CACHE = await caches.open(CACHE_NAME);
        CACHE.addAll(PRECACHE_ASSETS);
    })());
});

self.addEventListener("fetch", async evt => 
{
    evt.respondWith((async () => 
        {
            const CACHE = await caches.open(CACHE_NAME);
            
            let CACHED_RESPONSE;
            switch (new URL(evt.request.url).pathname)
            {
                case "/getz/":
                    CACHED_RESPONSE = await CACHE.match(evt.request.url + "pages/inicio.html");
                    break;
                case "/getz/sobre":
                    CACHED_RESPONSE = await CACHE.match(evt.request.url + "pages/sobre.html");
                    break;
                case "/getz/membros":
                    CACHED_RESPONSE = await CACHE.match(evt.request.url + "pages/membros.html");
                    break;
                case "/getz/ferramentas":
                    CACHED_RESPONSE = await CACHE.match(evt.request.url + "pages/ferramentas.html");
                    break;
                default:
                    CACHED_RESPONSE = await CACHE.match(evt.request);
                    break;
            }
            
            if (CACHED_RESPONSE !== undefined)
            {
                fetch(evt.request).then( res => 
                {
                    CACHE.put(evt.request, res.clone());
                });
                
                return CACHED_RESPONSE;
            }
            
            const NETWORK_RESPONSE = await fetch(evt.request);
            CACHE.put(evt.request, NETWORK_RESPONSE.clone());
            
            return NETWORK_RESPONSE;
        })());
});