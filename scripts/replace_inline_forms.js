const fs = require('fs');
const path = require('path');
const dirs = fs.readdirSync('d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== '[slug]' && dirent.name !== 'rudrabhishek')
  .map(dirent => dirent.name);

for (const dir of dirs) {
  const p = path.join('d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja', dir, 'page.tsx');
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // extract price
    let price = 1599;
    const priceMatch = content.match(/₹([0-9,]+)/) || content.match(/price:\s*([0-9]+)/) || content.match(/amount:\s*.*?([0-9]+)/);
    if (priceMatch) {
      price = parseInt(priceMatch[1].replace(/,/g, ''));
    }

    let title = dir.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const customTitles = {
      'attract-your-love-spell': 'Attract Your Love Spell',
      'commitment-spell': 'Commitment Spell',
      'dhan-laxmi-puja': 'Dhan Laxmi Puja',
      'ganesh-ji-ko-laddoo-arpan': 'Ganesh Ji Ko Laddoo Arpan',
      'hanuman-sindoor-boondi-arpan': 'Hanuman Sindoor Boondi Arpan',
      'job-attract-confirm-puja': 'Job Attract Confirm Puja',
      'love-marriage-healing': 'Love Marriage Healing',
      'mangal-dosh-nivaran-puja': 'Mangal Dosh Nivaran Puja',
      'rahu-ketu-grah-shanti-puja': 'Rahu Ketu Grah Shanti Puja',
      'shani-tel-arpan-aarti': 'Shani Tel Arpan Aarti',
      'vishnu-sahasranamam-puja': 'Vishnu Sahasranamam Puja'
    };
    if (customTitles[dir]) title = customTitles[dir];

    const startIndex = content.indexOf('{/* BOOKING FORM SECTION */}');
    const endIndex = content.indexOf('{/* HOW IT WORKS */}');

    if (startIndex !== -1 && endIndex !== -1) {
      const newSection = `{/* BOOKING SECTION */}
      <div id="booking-section" className="w-full bg-[#fdfaf6] py-20 px-6 border-y border-[#e8d8c0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-6">Complete Your Booking</h2>
          <p className="text-gray-850 text-base md:text-lg mb-10">Proceed to our secure checkout to provide your Sankalp details and complete the booking.</p>
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[#e8d8c0]/50 relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Sparkles className="w-40 h-40 text-[#5c1a1f]" />
            </div>
            <h3 className="text-2xl font-bold text-[#3a1216] mb-2">${title}</h3>
            <p className="text-[#888] mb-8">Includes Samagri & Dakshina</p>
            <div className="text-[32px] font-black text-[#d97706] mb-8">₹${price}</div>
            <Link href={\`/book-a-puja/${dir}/checkout\`} className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all w-full md:w-auto z-10">
              <Lock className="w-5 h-5" /> Proceed to Secure Checkout
            </Link>
          </div>
        </div>
      </div>\n\n      `;

      content = content.substring(0, startIndex) + newSection + content.substring(endIndex);
      
      // We also need to fix the sticky bottom pay bar that is used on mobile, which might still be present if it's AFTER the form section, wait no, the sticky bottom bar is usually just before HOW IT WORKS. If it was between BOOKING FORM SECTION and HOW IT WORKS, it is gone!
      fs.writeFileSync(p, content);
      console.log('Updated page.tsx for', dir);
    } else {
      console.log('Could not find boundaries for', dir);
    }
  }
}
