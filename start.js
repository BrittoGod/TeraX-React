
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building React app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
  
  // Check if build directory exists
  const buildDir = path.join(__dirname, 'build');
  if (fs.existsSync(buildDir)) {
    console.log('Build directory exists, contents:');
    const files = fs.readdirSync(buildDir);
    console.log(files);
  } else {
    console.error('Build directory does not exist!');
  }
  
  console.log('Starting server...');
  require('./index');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
