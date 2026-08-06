const fs = require('fs');

let content = fs.readFileSync('d:/server-vaidik/web-vaidik-main/src/components/layout/Header.tsx', 'utf8');

// Fix /astrologers-talk -> /astrologers-call
content = content.replace(/href="\/astrologers-talk"/g, 'href="/astrologers-call"');

// Fix AI astrologer paths to match the directory structure if needed,
// but for now I'll just leave it if it works, or map it to /ai-astrologer-chat
content = content.replace(/href="\/ai-astrologer\/chat"/g, 'href="/ai-astrologer-chat"');
content = content.replace(/href="\/ai-astrologer\/talk"/g, 'href="/ai-astrologer-chat"'); // Talk isn't there, send to chat

fs.writeFileSync('d:/server-vaidik/web-vaidik-main/src/components/layout/Header.tsx', content);
console.log("Header links updated!");
