const fs = require('fs');
const path = require('path');

// Copy worker.js from .open-next to root for Pages deployment
const source = path.join(__dirname, '../.open-next/worker.js');
const dest = path.join(__dirname, '../_worker.js');

if (fs.existsSync(source)) {
  fs.copyFileSync(source, dest);
  console.log('✓ Copied worker.js to root for Pages deployment');
} else {
  console.error('✗ worker.js not found in .open-next');
}
