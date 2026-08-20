const fs = require('fs');
const txt = fs.readFileSync('C:/Users/visha/.gemini/antigravity/brain/b8c54cb4-a58b-4f87-bff0-f307905d5459/.system_generated/logs/overview.txt', 'utf8');
const lines = txt.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":2988,')) {
    fs.writeFileSync('temp_step_2988.json', lines[i]);
    break;
  }
}
