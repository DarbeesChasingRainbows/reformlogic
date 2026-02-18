const fs = require('fs');
const path = require('path');

// Read the generated worker
const workerPath = path.join(__dirname, '../.open-next/worker.js');
let workerCode = fs.readFileSync(workerPath, 'utf8');

// Add static asset handling if not present
if (!workerCode.includes('staticAssets')) {
  // Insert asset handling at the beginning of the fetch handler
  const assetHandler = `
  // Handle static assets
  const url = new URL(request.url);
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/static/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.ico') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.svg')) {
    return env.ASSETS.fetch(request);
  }
`;
  
  // Find the fetch handler and insert asset handling
  workerCode = workerCode.replace(
    /async fetch\(request, env, ctx\) {/,
    `async fetch(request, env, ctx) {${assetHandler}`
  );
}

// Write the modified worker
const outputPath = path.join(__dirname, '../.open-next/_worker.js');
fs.writeFileSync(outputPath, workerCode);
console.log('✓ Fixed worker to handle static assets');
