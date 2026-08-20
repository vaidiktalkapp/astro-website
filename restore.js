const fs = require('fs');
const execSync = require('child_process').execSync;
const dirs = fs.readdirSync('src/app/(main)/book-a-puja', { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== '[slug]' && d.name !== 'rudrabhishek')
  .map(d => d.name);

for (const dir of dirs) {
  try {
    execSync(`git checkout HEAD -- src/app/(main)/book-a-puja/${dir}/page.tsx`);
    console.log('Restored ' + dir);
  } catch (e) {
    console.error(e.message);
  }
}
