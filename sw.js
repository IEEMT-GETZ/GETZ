const VERSION = "v0.0.1";
const CACHE_NAME = `getz-${VERSION}`;

const PRECACHE_ASSETS =
    [
        "fonts/",
        "images/"
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
        let reqURL;
        switch (new URL(evt.request.url).pathname)
        {
            case "/GETZ/":
                reqURL = evt.request.url + "index.html";
                break;
            case "/GETZ/sobre":
                reqURL = evt.request.url + ".html";
                break;
            case "/GETZ/membros":
                reqURL = evt.request.url + ".html";
                break;
            case "/GETZ/ferramentas":
                reqURL = evt.request.url + ".html";
                break;
            case "/":
                reqURL = evt.request.url + "index.html";
                break;
            case "/sobre":
                reqURL = evt.request.url + ".html";
                break;
            case "/membros":
                reqURL = evt.request.url + ".html";
                break;
            case "/ferramentas":
                reqURL = evt.request.url + ".html";
                break;
            default:
                reqURL = null;
                break;
        }

        if (reqURL) CACHED_RESPONSE = await CACHE.match(reqURL);
        else CACHED_RESPONSE = await CACHE.match(evt.request);

        if (CACHED_RESPONSE !== undefined)
        {

            fetch(reqURL ?? evt.request).then(res => 
            {
                CACHE.put(reqURL ?? evt.request, res.clone());
            });

            return CACHED_RESPONSE;
        }

        let req = evt.request.url;
        switch (new URL(req).pathname)
        {
            case "/":
                req += "index.html";
                break;
            case "/sobre":
                req += ".html";
                break;
            case "/membros":
                req += ".html";
                break;
            case "/ferramentas":
                req += ".html";
                break;
            default:
                req = evt.request;
                break;
        }

        const NETWORK_RESPONSE = await fetch(req);
        CACHE.put(evt.request, NETWORK_RESPONSE.clone());

        return NETWORK_RESPONSE;
    })());
});