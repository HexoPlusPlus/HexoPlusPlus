import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';
import { hexoplusplus } from './kernel'
/*Combined From https://blog.ichr.me/post/cf-workers-site-deploy/*/
addEventListener('fetch', (event) => {
    try {
        const req = event.request
        const urlStr = req.url
        const urlObj = new URL(urlStr)
        const path = urlObj.href.substr(urlObj.origin.length)
        if (path.startsWith('/hpp/')) {
            event.respondWith(hexoplusplus(event.request))
        } else {
            event.respondWith(handleSite(event));
        }
    } catch (e) {
        event.respondWith(new Response('Internal Error', { status: 500 }));
    }
});

async function handleSite(event) {
    const url = new URL(event.request.url);
    const { origin, pathname: path, search } = new URL(event.request.url);
    let options = {};

    try {
        // 将 `/index.html` 结尾的请求重定向至 `/`
        if (path.endsWith('/index.html')) {
            return new Response(null, {
                status: 301,
                headers: {
                    Location: `${origin}${path.substring(0, path.length - 10)}${search}`,
                    'Cache-Control': 'max-age=3600',
                },
            });
        }

        // 手动提高 RSS 页面的缓存 TTL
        if (path === '/atom.xml') {
            return getAssetFromKV(event, {
                cacheControl: {
                    edgeTtl: 6 * 60 * 60,
                    browserTtl: 12 * 60 * 60,
                    cacheEverything: true,
                },
            });
        }

        // CSS 文件超长时间缓存
        if (path.startsWith('/css/')) {
            const response = await getAssetFromKV(event, {
                cacheControl: {
                    edgeTtl: 365 * 24 * 60 * 60,
                    browserTtl: 365 * 24 * 60 * 60,
                    cacheEverything: true,
                },
            });
            response.headers.set('cache-control', `public, max-age=${365 * 24 * 60 * 60}, immutable`);
            return response;
        }

        // 其余默认 4 小时 CDN 缓存、1 小时浏览器缓存
        const response = await getAssetFromKV(event, {
            cacheControl: {
                edgeTtl: 4 * 60 * 60,
                browserTtl: 60 * 60,
                cacheEverything: true,
            },
        });

        response.headers.set('X-XSS-Protection', '1; mode=block');

        // Server Push 样式文件
        if (response.headers.get("Content-Type").includes('text/html')) {
            response.headers.append('Link', '</css/main.css>; rel=preload; as=style');
        }

        return response;
    } catch (e) {
        // 未找到资源，返回 404 页面
        let notFoundResponse = await getAssetFromKV(event, {
            mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/404.html`, req),
        });

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 });
    }
}