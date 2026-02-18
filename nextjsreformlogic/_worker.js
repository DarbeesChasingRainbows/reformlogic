import { fetch as openNextFetch } from './.open-next/worker.js';

export default {
  async fetch(request, env, ctx) {
    try {
      // For Cloudflare Pages, we need to handle static assets differently
      const url = new URL(request.url);
      
      // Let Cloudflare handle static assets directly
      if (url.pathname.startsWith('/_next/static/') || 
          url.pathname.startsWith('/static/') ||
          url.pathname.match(/\.(css|js|ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)) {
        // Return null to let Cloudflare's static asset handling take over
        return null;
      }
      
      // For everything else, use the OpenNext worker
      return await openNextFetch(request, env, ctx);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};
