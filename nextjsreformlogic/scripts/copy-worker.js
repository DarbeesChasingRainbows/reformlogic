const fs = require('fs');
const path = require('path');

// Copy worker.js for Pages Functions
const source = path.join(__dirname, '../.open-next/worker.js');
const dest = path.join(__dirname, '../.open-next/_worker.js');

if (fs.existsSync(source)) {
  fs.copyFileSync(source, dest);
  console.log('✓ Copied worker.js to .open-next for Pages deployment');
} else {
  console.error('✗ worker.js not found in .open-next');
}
