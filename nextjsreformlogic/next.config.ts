import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Disable image optimization to avoid resvg.wasm dependency on Windows
	images: {
		unoptimized: true,
	},
	// Ensure assets are served correctly on Cloudflare Pages
	assetPrefix: undefined,
	basePath: ''
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
