const fs = require('fs');
const path = require('path');

const files = [
  'name-mobile-number-numerology/page.tsx',
  'fortune-numerology/page.tsx'
];

const basePathNum = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology';

for (const file of files) {
  const filePath = path.join(basePathNum, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace the img tag
    content = content.replace(
      /<img src=\{video\.thumbnail\} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" onError=\{\(e\) => \{ e\.currentTarget\.src = 'https:\/\/placehold\.co\/800x450\/1a1a1a\/ffffff\?text=Video\+Thumbnail' \}\} \/>/g,
      `<img src={video.thumbnail && video.thumbnail !== '/images/kundali-video-thumb.jpg' ? video.thumbnail : (getYoutubeVideoId(video.url) ? \`https://img.youtube.com/vi/\${getYoutubeVideoId(video.url)}/hqdefault.jpg\` : video.thumbnail)} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450/1a1a1a/ffffff?text=Video+Thumbnail' }} />`
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated ' + file);
  } else {
    console.log('File not found ' + file);
  }
}
