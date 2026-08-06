const fs = require('fs');
const path = require('path');

const baseDir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

const folders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory() && f !== '[slug]');

folders.forEach(folder => {
  const filePath = path.join(baseDir, folder, 'page.tsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find markers (some might use '5. BOOKING FORM SECTION' or similar)
  const startRegex = /\{\/\*\s*\d*\.?\s*BOOKING FORM SECTION\s*\*\/\}/i;
  const endRegex = /\{\/\*\s*\d*\.?\s*FAQS?\s*\*\/\}/i;
  
  const startMatch = content.match(startRegex);
  const endMatch = content.match(endRegex);
  
  if (!startMatch || !endMatch) {
    console.log(`Markers not found in ${folder}`);
    return;
  }
  
  const startIndex = startMatch.index;
  const endIndex = endMatch.index;

  // Extract the original form string to preserve the state binding
  const originalSection = content.substring(startIndex, endIndex);
  
  // Try to find the price
  let priceStr = "₹1599";
  const priceMatch = originalSection.match(/₹\s*(\d+)/);
  if (priceMatch) {
      priceStr = "₹" + priceMatch[1];
  }

  // Try to extract the title from the page content (e.g. "Rudrabhishek Pooja")
  let titleStr = "Pooja";
  if (folder.includes("rudrabhishek")) titleStr = "Rudrabhishek Pooja";
  if (folder.includes("mangal-dosh")) titleStr = "Mangal Dosh Nivaran";
  if (folder.includes("dhan-laxmi")) titleStr = "Dhan Laxmi Pooja";
  if (folder.includes("ganesh-ji")) titleStr = "Laddoo Arpan";
  if (folder.includes("hanuman")) titleStr = "Sindoor Boondi Arpan";
  if (folder.includes("job-attract")) titleStr = "Job Attract Pooja";
  if (folder.includes("love-marriage")) titleStr = "Love Marriage Healing";
  if (folder.includes("rahu-ketu")) titleStr = "Rahu Ketu Shanti";
  if (folder.includes("shani-tel")) titleStr = "Shani Tel Arpan";
  if (folder.includes("vishnu-sahasranamam")) titleStr = "Vishnu Sahasranamam";
  if (folder.includes("attract-your-love")) titleStr = "Attract Your Love Spell";
  if (folder.includes("commitment")) titleStr = "Commitment Spell";
  

  const newSection = `      {/* BOOKING FORM SECTION */}
      <div id="booking-section" className="w-full bg-[#fdfaf6] py-20 px-6 border-y border-[#e8d8c0]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-10 md:mb-14">
            <h2 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-4">Complete Your Booking</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">Please provide your details below. This information will be used by our Purohits for your personalized Sankalp.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start relative pb-24 lg:pb-0">
            
            {/* Left Form (Devotee Details) */}
            <div className="w-full lg:w-2/3 bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-[#e8d8c0]/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Sparkles className="w-40 h-40 text-[#5c1a1f]" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#5c1a1f] mb-6 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-[#d4af37]" /> Devotee Information
              </h3>
              
              <form id="booking-form" onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Enter Full Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gotra (Optional)</label>
                    <input type="text" name="gotra" value={formData.gotra} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Enter Gotra" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone No. *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Phone Number" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Email Address" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">City / Location *</label>
                    <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Your City" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Pooja Date *</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-700 bg-gray-50/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Message / Intentions</label>
                  <textarea rows={3} name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all resize-none text-gray-800 bg-gray-50/50" placeholder="Any specific issues or wishes?"></textarea>
                </div>
                
                {/* Mobile Standard Submit Button (Inside Form) */}
                <div className="lg:hidden pt-4">
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#f5d08b] text-[#5c1a1f] rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" /> Proceed to Pay ${priceStr}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Sidebar (Order Summary) - Hidden on Mobile to avoid scroll fatigue */}
            <div className="hidden lg:block w-full lg:w-1/3 lg:sticky lg:top-24">
              <div className="bg-[#5c1a1f] p-6 md:p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <ShieldCheck className="w-32 h-32" />
                </div>
                
                <h3 className="premium-serif text-2xl font-bold mb-6 border-b border-white/20 pb-4 flex items-center gap-2">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6 relative z-10">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-gray-300 text-sm">Pooja Name</span>
                    <span className="font-bold text-right text-[15px]">${titleStr}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-gray-300 text-sm">Includes</span>
                    <span className="text-right text-[14px]">Samagri & Dakshina</span>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20 mb-6 backdrop-blur-md relative z-10">
                  <span className="block text-xs md:text-sm text-[#f5d08b] uppercase tracking-wide font-bold mb-2">Total Offering</span>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white">${priceStr}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  form="booking-form"
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#f5d08b] hover:from-[#c29f2f] hover:to-[#e3bd75] text-[#5c1a1f] rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative z-10"
                >
                  <Lock className="w-5 h-5" /> Proceed to Pay
                </button>
                <p className="text-center text-xs text-gray-300 mt-4 flex items-center justify-center gap-1 relative z-10">
                  <ShieldCheck className="w-4 h-4 text-[#f5d08b]" /> 100% Secure & Authentic
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Mobile Sticky Bottom Pay Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] z-[100] flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Total Offering</span>
          <div className="flex items-end gap-1.5">
            <span className="text-xl font-black text-[#5c1a1f]">${priceStr}</span>
          </div>
        </div>
        <button 
          form="booking-form"
          type="submit" 
          className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f5d08b] text-[#5c1a1f] rounded-lg font-bold shadow-md flex items-center gap-2 active:scale-95 transition-transform"
        >
           Proceed <Lock className="w-4 h-4" />
        </button>
      </div>
\n      `;
  
  // Need to replace ${titleStr} and ${priceStr} since we used a template literal for JS file, 
  // wait, in my script, I wrote ` ${priceStr} ` which WILL evaluate in Node JS when creating `newSection`! 
  // So the generated code will correctly have the strings embedded!

  content = content.substring(0, startIndex) + newSection + content.substring(endIndex);
  
  fs.writeFileSync(filePath, content);
  console.log("Updated Layout for: " + folder);
});
