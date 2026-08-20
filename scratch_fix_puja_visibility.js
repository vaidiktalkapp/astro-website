const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile() && filePath.endsWith('.tsx')) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(dir, function(filePath, stat) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Fix overlay gradient
    const oldOverlay = 'className="absolute inset-0 bg-black/60 md:bg-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent"';
    const newOverlay = 'className="absolute inset-0 bg-black/60 md:bg-transparent md:bg-gradient-to-r md:from-black/95 md:via-black/70 md:to-black/10"';
    if (content.includes(oldOverlay)) {
        content = content.replace(oldOverlay, newOverlay);
        changed = true;
    }

    // 2. Fix h1 text shadow
    const h1Regex = /className="premium-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl"/g;
    const newH1 = 'className="premium-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl drop-shadow-xl"';
    if (content.match(h1Regex)) {
        content = content.replace(h1Regex, newH1);
        changed = true;
    }

    // 3. Fix p text shadow and font weight
    const pRegex = /className="text-gray-200 text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 font-light"/g;
    const newP = 'className="text-gray-200 text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 font-medium drop-shadow-lg"';
    if (content.match(pRegex)) {
        content = content.replace(pRegex, newP);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', filePath);
    }
});
