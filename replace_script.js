const fs = require('fs');
const filePath = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja/[slug]/page.tsx';

let content = fs.readFileSync(filePath, 'utf8');

const startMarker = '{/* 3. BOOKING FORM SECTION */}';
const endMarker = '{/* FAQs */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found");
  process.exit(1);
}

const newSection = `      {/* 3. BOOKING FORM SECTION */}
      <div id="booking-section" className="w-full bg-[#fdfaf6] py-20 px-6 border-y border-[#e8d8c0]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-10 md:mb-14">
            <h2 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-4">Complete Your Booking</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">Please provide your details below. This information will be used by our Purohits for your personalized Sankalp.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Form (Devotee Details) */}
            <div className="w-full lg:w-2/3 bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-[#e8d8c0]/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Sparkles className="w-40 h-40 text-[#5c1a1f]" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#5c1a1f] mb-6 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-[#d4af37]" /> Devotee Information
              </h3>
              
              <form id="booking-form" onSubmit={(e) => { e.preventDefault(); alert('Booking request received!'); }} className="space-y-5 md:space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input required type="text" name="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Enter Full Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gotra (Optional)</label>
                    <input type="text" name="gotra" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Enter Gotra" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone No. *</label>
                    <input required type="tel" name="phone" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Phone Number" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input required type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Email Address" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">City / Location *</label>
                    <input required type="text" name="location" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-800 bg-gray-50/50" placeholder="Your City" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Pooja Date *</label>
                    <input required type="date" name="date" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-700 bg-gray-50/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Message / Intentions</label>
                  <textarea rows={3} name="message" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all resize-none text-gray-800 bg-gray-50/50" placeholder="Any specific issues or wishes?"></textarea>
                </div>
              </form>
            </div>

            {/* Right Sidebar (Order Summary) */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
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
                    <span className="font-bold text-right text-[15px]">{puja.title}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-gray-300 text-sm">Includes</span>
                    <span className="text-right text-[14px]">Samagri & Dakshina</span>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20 mb-6 backdrop-blur-md relative z-10">
                  <span className="block text-xs md:text-sm text-[#f5d08b] uppercase tracking-wide font-bold mb-2">Total Offering</span>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white">₹{puja.discountedPrice || puja.price}</span>
                    {puja.discountedPrice && <span className="text-lg text-gray-400 line-through mb-1">₹{puja.price}</span>}
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

`;

content = content.substring(0, startIndex) + newSection + content.substring(endIndex);

fs.writeFileSync(filePath, content);
console.log("Updated Layout successfully");
