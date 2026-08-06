'use client';
import React, { useState, useEffect } from 'react';
import { ShieldCheck, 
  Droplet, 
  Flame, 
  Heart, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Calendar,
  ChevronDown, UserCheck, Leaf, Lock } from 'lucide-react';
import Link from 'next/link';
import { usePujaBooking } from '../../../../hooks/usePujaBooking';


const getYoutubeId = (url: string) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

export default function ShaniTelArpanAartiPage() {
  const [dynamicData, setDynamicData] = useState<any>(null);

  const { formData, handleChange, handleSubmit, isProcessing } = usePujaBooking({
    title: 'Shani Tel Arpan Aarti',
    slug: 'shani-tel-arpan-aarti',
    amount: dynamicData?.discountedPrice || dynamicData?.price || 899
  });

  useEffect(() => {
    import('axios').then(axios => {
      const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1') + '/pujas/shani-tel-arpan-aarti';
      axios.default.get(url)
        .then(res => setDynamicData(res.data))
        .catch(err => console.log('Dynamic data not found yet'));
    });
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  

  

  

  return (
    <div className="w-full bg-[#fcf5eb] font-sans">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full min-h-[500px] md:min-h-[600px] py-12 md:py-0 flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/pooja/Shani Tel Arpan and Aarti.webp" 
            alt="Shani Tel Arpan & Aarti" 
            className="w-full h-full object-cover opacity-95 object-center"
          />
          <div className="absolute inset-0 bg-black/60 md:bg-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#d4af37] text-[#f5d08b] text-sm font-bold tracking-wider uppercase bg-black/30 backdrop-blur-sm">
            Premium Vedic Ritual
          </div>
          <h1 className="premium-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
            Shani Tel Arpan <span className="text-[#f5d08b]">&amp; Aarti</span>
          </h1>
          <p className="text-[#3a1216] text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 font-light">
            We follow Traditional Vedic rituals with pure and genuine Practices. Bringing peace, Prosperity and Spiritual harmony to your life.
          </p>

          <a 
            href="#booking-section"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4af37] hover:bg-[#c29f2f] text-[#5c1a1f] rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1"
          >
            <Sparkles className="w-5 h-5" /> Book Now @ ₹899
          </a>
        </div>
      </div>

      {/* 2. ABOUT THE POOJA */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-6">
              Shani Tel Arpan <br/><span className="text-[#d4af37]">&amp; Aarti</span>
            </h2>
            <div className="w-20 h-1 bg-[#d4af37] mb-8" />
            <p className="text-gray-900 text-lg leading-relaxed mb-6">
              Shani Tel Arpan and Shani Aarti is a sacred Vedic Saturn Puja and Shani Dev Ritual performed to appease Shani Dev, the deity of karma, justice, and discipline. Offering mustard oil (sarson ka tel) during this ritual helps purify both mind and body, inviting peace and balance into one’s life.
            </p>
            <p className="text-gray-850 text-lg leading-relaxed mb-6">
              It is especially beneficial for those experiencing the effects of Shani Dosh or Sade Sati, and is believed to Remove Shani Dosh while offering Protection from Saturn. It is also believed to strengthen career, business, and financial stability. With Shani Dev’s blessings, individuals may experience a rise in prosperity, clarity, and overall well-being.
            </p>
            
            <h3 className="font-bold text-[#5c1a1f] text-xl mt-8 mb-4">Benefits of Shani Tel Arpan &amp; Aarti:</h3>
            <ul className="space-y-4 mb-6">
              {[
                "Brings lasting happiness and prosperity",
                "Helps eliminate financial and life obstacles",
                "Offers protection from adversity and karmic setbacks"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-850 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-[#d4af37] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-[#5c1a1f] text-xl mt-8 mb-4">Post-Pooja Recommendations for Maximum Benefits:</h3>
            <ul className="space-y-4">
              {[
                "Continue to practice charity, especially on Saturdays",
                "If facing financial issues, take a ritual bath, meditate, and worship the Shani Yantra",
                "Perform this pooja regularly—weekly for best results"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-850 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-[#d4af37] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col gap-10">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="/pooja/Shani Tel Arpan and Aarti.webp" alt="Shani Tel Arpan & Aarti" className="w-full h-full object-cover object-right-top aspect-square md:aspect-[4/3]" />
              <div className="absolute inset-0 border-4 border-[#d4af37]/30 rounded-2xl pointer-events-none" />
            </div>

            <div className="p-6 md:p-8 bg-white border border-[#f0ddc0] rounded-2xl shadow-sm relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]" />
              <h4 className="text-xl font-bold text-[#5c1a1f] mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" /> About Shani Dev
              </h4>
              <p className="text-gray-850 leading-relaxed text-sm">
                Shani Dev is revered as the divine dispenser of karma, delivering justice based on one’s actions, thoughts, and speech. He teaches discipline, responsibility, and integrity—qualities that pave the way to spiritual and material success. Honoring him through this pooja aligns you with higher karmic balance and divine support.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* 4. HOW IT WORKS & WHY CHOOSE US */}
      <div className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* How it works */}
        <div>
          <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#5c1a1f] mb-10">How It Works</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#d4af37] before:to-transparent">
            {[
              "Book the Pooja through our platform",
              "Submit your personal details, including name and gotra, through the form below to be included in the sacred Sankalp performed by the Pandit.",
              "Attend live via video call and participate from the comfort of your home",
              "Receive blessings and divine protection from Shani Dev"
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#fcf5eb] bg-[#d4af37] text-[#5c1a1f] font-bold text-lg shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-5 rounded-xl shadow-sm border border-[#f0ddc0]">
                  <p className="text-gray-850 font-medium">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why choose us */}
        <div>
          <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#5c1a1f] mb-4">Why Book with Vaidik Talk?</h2>
          
          <ul className="space-y-3 mb-10">
            {[
              "India’s largest and most trusted Devotion Tech platform, with millions of satisfied users.",
              "All poojas are performed authentically with your family’s Sankalp, including Dakshina and live participation.",
              "We provide visually designed Kundalis that are easy to understand—you won’t need another astrologer to decode them.",
              "Each Kundali includes graphical insights, charts, and highlights to simplify life’s ups and downs.",
              "Personalized remedies are included to help you take meaningful action after the pooja.",
              "Backed by over 40 years of combined astrological experience, ensuring wisdom with accuracy.",
              "From booking to blessings, we offer a seamless, sacred, and insightful experience tailored to modern users."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-850 font-medium text-sm md:text-base">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="premium-serif text-2xl md:text-3xl font-bold text-[#5c1a1f] mb-4">Our Unique Approach: Why We're Different</h2>
          <p className="text-gray-850 mb-8 leading-relaxed">
            We are honored to have highly experienced and spiritually enlightened Panditjis from the sacred Char Dham and other renowned pilgrimage sites, including <strong className="text-[#5c1a1f]">Varanasi, Bodh Gaya, Deoghar, Ujjain, Puri, Badrinath, Rameswaram, and Dwarka</strong>.
          </p>

          <div className="space-y-4">
            {[
              { title: "Graphical Kundali Representation", desc: "Understand your life’s ups and downs at a glance with our visual reports." },
              { title: "No Need for an Astrologer", desc: "Our detailed reports are so clear, you can read and understand them yourself." },
              { title: "Powerful Remedies", desc: "We provide actionable, spiritually potent solutions alongside astrological insights." },
              { title: "40+ Years of Combined Expertise", desc: "Our team brings decades of spiritual and astrological knowledge to your service." }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-[#f0ddc0] hover:border-[#d4af37] transition-colors">
                <div className="mt-1"><ShieldCheck className="w-6 h-6 text-[#d4af37]" /></div>
                <div>
                  <h4 className="text-base font-bold text-[#5c1a1f] mb-1">{feature.title}</h4>
                  <p className="text-gray-850 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

            {/* BOOKING FORM SECTION */}
      <div id="booking-section" className="w-full bg-[#fdfaf6] py-20 px-6 border-y border-[#e8d8c0]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-10 md:mb-14">
            <h2 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-4">Complete Your Booking</h2>
            <p className="text-gray-850 text-base md:text-lg max-w-2xl mx-auto">Please provide your details below. This information will be used by our Purohits for your personalized Sankalp.</p>
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
                    <label className="block text-sm font-semibold text-gray-850 mb-1.5">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-850 bg-gray-50/50" placeholder="Enter Full Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-850 mb-1.5">Gotra (Optional)</label>
                    <input type="text" name="gotra" value={formData.gotra} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-850 bg-gray-50/50" placeholder="Enter Gotra" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-850 mb-1.5">Phone No. *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-850 bg-gray-50/50" placeholder="Phone Number" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-850 mb-1.5">Email *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-850 bg-gray-50/50" placeholder="Email Address" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-850 mb-1.5">City / Location *</label>
                    <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-850 bg-gray-50/50" placeholder="Your City" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-850 mb-1.5">Preferred Pooja Date *</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all text-gray-850 bg-gray-50/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-850 mb-1.5">Additional Message / Intentions</label>
                  <textarea rows={3} name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all resize-none text-gray-850 bg-gray-50/50" placeholder="Any specific issues or wishes?"></textarea>
                </div>
                
                {/* Mobile Standard Submit Button (Inside Form) */}
                <div className="lg:hidden pt-4">
                  <button 
                    type="submit" disabled={isProcessing} 
                    className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#f5d08b] text-[#5c1a1f] rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5" /> Proceed to Pay ₹899
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
                    <span className="text-[#3a1216] text-sm">Pooja Name</span>
                    <span className="font-bold text-right text-[15px]">Shani Tel Arpan</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[#3a1216] text-sm">Includes</span>
                    <span className="text-right text-[14px]">Samagri & Dakshina</span>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20 mb-6 backdrop-blur-md relative z-10">
                  <span className="block text-xs md:text-sm text-[#f5d08b] uppercase tracking-wide font-bold mb-2">Total Offering</span>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white">₹899</span>
                  </div>
                </div>

                <button 
                  type="submit" disabled={isProcessing} 
                  form="booking-form"
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#f5d08b] hover:from-[#c29f2f] hover:to-[#e3bd75] text-[#5c1a1f] rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Lock className="w-5 h-5" /> Proceed to Pay
                </button>
                <p className="text-center text-xs text-[#3a1216] mt-4 flex items-center justify-center gap-1 relative z-10">
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
          <span className="text-[10px] text-gray-850 font-bold uppercase tracking-wider mb-0.5">Total Offering</span>
          <div className="flex items-end gap-1.5">
            <span className="text-xl font-black text-[#5c1a1f]">₹899</span>
          </div>
        </div>
        <button 
          form="booking-form"
          type="submit" disabled={isProcessing} 
          className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f5d08b] text-[#5c1a1f] rounded-lg font-bold shadow-md flex items-center gap-2 active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
        >
           Proceed <Lock className="w-4 h-4" />
        </button>
      </div>


      {/* HOW IT WORKS */}
      <div className="w-full bg-[#fdfaf6] py-20 px-6 border-t border-[#e8d8c0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <p className="text-[#d97706] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Simple & Transparent</p>
              <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#1a0a0b] mb-5 leading-tight">Book Your Puja<br/>in Minutes</h2>
              <p className="text-gray-850 text-sm leading-relaxed mb-8">A seamless process from your home to divine blessings — our pandits handle everything.</p>
              <a href="#booking-section" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5c1a1f] text-white rounded-xl font-bold text-sm hover:bg-[#4a1519] transition-all shadow-sm">
                Book Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div className="lg:w-2/3 flex flex-col">
              {[
                { n: '01', label: 'Book Online', desc: 'Choose your puja, fill in your devotee details (name, gotra, intentions), and complete secure online payment in minutes.' },
                { n: '02', label: 'Pandit Assigned', desc: 'Within hours, a verified and experienced Vedic pandit is personally assigned to your booking.' },
                { n: '03', label: 'Muhurat Confirmed', desc: 'Our pandits calculate the most auspicious date and time for your puja and share it with you on WhatsApp.' },
                { n: '04', label: 'Puja Performed Live', desc: 'Join via a live video link and witness every ritual — with the Sankalp read aloud in your name.' },
                { n: '05', label: 'Prasad at Your Door', desc: 'Blessed prasad, HD photos, and a video recording of the puja are sent directly to your home.' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-start gap-5 bg-white border border-[#f0ddc0] rounded-2xl p-6 hover:border-[#d4af37]/60 hover:shadow-md transition-all group">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-[#d97706] flex items-center justify-center shadow-sm group-hover:bg-[#5c1a1f] transition-colors">
                      <span className="text-white font-black text-xs group-hover:text-[#d4af37] transition-colors">{item.n}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a0a0b] text-[15px] mb-1.5">{item.label}</h4>
                      <p className="text-gray-850 text-[13px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {idx < 4 && (
                    <div className="flex items-center justify-center py-1">
                      <div className="flex flex-col items-center">
                        <div className="w-px h-4 bg-[#d97706]/25" />
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                          <path d="M1 1.5l7 7 7-7" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TRUST & GUARANTEE — light theme */}
      <div className="w-full bg-[#fcf5eb] py-16 px-6 border-t border-[#e8d8c0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div className="md:w-1/3">
              <p className="text-[#d97706] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Our Promise</p>
              <h2 className="premium-serif text-2xl md:text-3xl font-bold text-[#5c1a1f] mb-3 leading-tight">Every Booking.<br/>Every Ritual.<br/>Guaranteed.</h2>
              <p className="text-gray-850 text-sm leading-relaxed">We stand by the authenticity, quality, and results of every puja we perform.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: '100% Verified Pandits', desc: 'Every pandit is screened, background-checked, and trained in Vedic scriptures' },
                { label: 'HD Photos & Video', desc: 'Full documentation of your puja ritual — shared within 24 hours' },
                { label: 'Live Streaming', desc: 'Watch your puja in real-time via a dedicated video link' },
                { label: 'Sankalp in Your Name', desc: 'Your name, gotra, and intention are read aloud at the start of every ritual' },
                { label: 'Prasad Delivered', desc: 'Blessed prasad packed and couriered to your address after the puja' },
                { label: 'Money-Back Guarantee', desc: 'Full refund if the puja cannot be performed as booked' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#f0ddc0] hover:border-[#d4af37]/60 hover:shadow-sm transition-all">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-[#d97706] flex items-center justify-center mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <p className="text-[#1a0a0b] text-[13px] font-bold mb-0.5">{item.label}</p>
                    <p className="text-gray-850 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="w-full bg-white py-20 px-6 border-t border-[#e8d8c0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#d97706] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">What They Say</p>
            <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#1a0a0b] mb-4">Trusted by 50,000+ Devotees</h2>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className="text-[#f59e0b] text-lg">★</span>)}</div>
              <span className="text-[#111827] font-bold text-sm">4.9 out of 5</span>
              <span className="text-[#D1D5DB] mx-1">|</span>
              <span className="text-gray-850 text-sm">5,000+ verified reviews</span>
            </div>
          </div>

          <div className="overflow-hidden relative w-full mb-16"><div className="flex w-max animate-marquee gap-6 pb-4 hover:pause">
            {(dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : [
              { name: 'Priya Sharma', city: 'New Delhi', date: 'July 2025', review: 'The puja was absolutely divine. The pandit was deeply knowledgeable and performed every ritual with precision. I joined via live video and felt immense spiritual energy. The prasad arrived beautifully packed within 4 days. Highly recommend Vaidik Talk.', initial: 'P', color: '#5c1a1f' },
              { name: 'Rajesh Gupta', city: 'Mumbai', date: 'June 2025', review: 'Skeptical at first, but this completely changed my view of online pujas. The sankalp was taken in my name and gotra. I received HD photos the same evening. The whole process was seamless and the results were visible within a week. Truly professional.', initial: 'R', color: '#1e3a5f' },
              { name: 'Anita Verma', city: 'Bengaluru', date: 'May 2025', review: "Booked this puja for my mother's health. The muhurat was perfectly auspicious, the pandit spent over 2 hours performing every ritual with dedication. The difference was palpable. Will always trust Vaidik Talk for my spiritual needs.", initial: 'A', color: '#1a4731' },
            , { name: "Priya Sharma", city: "New Delhi", date: "July 2025", review: "The puja was absolutely divine. The pandit was deeply knowledgeable and performed every ritual with precision. I joined via live video and felt immense spiritual energy. The prasad arrived beautifully packed within 4 days. Highly recommend Vaidik Talk.", initial: "P", color: "#5c1a1f" }, { name: "Rajesh Gupta", city: "Mumbai", date: "June 2025", review: "Skeptical at first, but this completely changed my view of online pujas. The sankalp was taken in my name and gotra. I received HD photos the same evening. The whole process was seamless and the results were visible within a week. Truly professional.", initial: "R", color: "#1e3a5f" }, { name: "Anita Verma", city: "Bengaluru", date: "May 2025", review: "Booked this puja for my mother's health. The muhurat was perfectly auspicious, the pandit spent over 2 hours performing every ritual with dedication. The difference was palpable. Will always trust Vaidik Talk for my spiritual needs.", initial: "A", color: "#1a4731" }].filter((item: any) => item)).reduce((acc: any[], _: any, __: number, arr: any[]) => acc.length === 0 ? [...arr, ...arr, ...arr, ...arr] : acc, []).map((t: any, idx: number) => (
              <div key={idx} className="w-[85vw] sm:w-[320px] md:w-[350px] shrink-0 snap-center bg-[#fdfaf6] rounded-2xl p-7 border border-[#f0ddc0] flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <span key={s} className="text-[#f59e0b] text-[15px]">★</span>)}</div>
                  <svg width="22" height="18" viewBox="0 0 32 24" fill="#e8d8c0"><path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.6 6.4 6.4 11.2H12V24H0zm20 0V14.4C20 6.4 24.8 1.6 34.4 0L36 2.4C30.4 3.6 27.6 6.4 26.4 11.2H32V24H20z"/></svg>
                </div>
                <p className="text-gray-850 text-[13.5px] leading-[1.85] flex-grow mb-6">{t.review}</p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#f0ddc0]">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0" style={{backgroundColor: t.color}}>{t.initial}</div>
                  <div className="flex-1">
                    <p className="font-bold text-[#111827] text-[13px] leading-none mb-1">{t.name}</p>
                    <p className="text-[#9CA3AF] text-[11px]">{t.city} · {t.date}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#16a34a] bg-green-50 border border-green-100 rounded-full px-2 py-1">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* Video Testimonials - Shorts style, no bg card */}
          <div className="border-t border-[#e8d8c0] pt-12">
            <div className="text-center mb-10">
              <p className="text-[#d97706] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Video Testimonials</p>
              <h3 className="premium-serif text-3xl md:text-4xl font-bold text-[#1a0a0b] mb-3">Real Devotees. Real Experiences.</h3>
              <p className="text-gray-850 text-base md:text-lg">Watch unscripted reviews from our community of devotees</p>
            </div>
            <div className="overflow-hidden relative w-full mb-8"><div className="flex w-max animate-marquee gap-5 pb-4 hover:pause">
              {(dynamicData?.videoTestimonials?.length > 0 ? dynamicData.videoTestimonials : [
                { id: 'qMmn1uLuNbs', title: 'Devotee Review — Rudrabhishek Experience' },
                { id: 'qMmn1uLuNbs', title: 'Devotee Review — Puja Transformation Story' },
                { id: 'qMmn1uLuNbs', title: 'Devotee Review — Online Puja Experience' },
              , { id: "qMmn1uLuNbs", title: "Devotee Review � Rudrabhishek Experience" }, { id: "qMmn1uLuNbs", title: "Devotee Review � Puja Transformation Story" }, { id: "qMmn1uLuNbs", title: "Devotee Review � Online Puja Experience" }].filter((item: any) => item)).reduce((acc: any[], _: any, __: number, arr: any[]) => acc.length === 0 ? [...arr, ...arr, ...arr, ...arr] : acc, []).map((v: any, idx: number) => (
                <div key={idx} className="w-[85vw] sm:w-[320px] md:w-[350px] shrink-0 snap-center rounded-2xl overflow-hidden shadow-md border border-[#f0ddc0] bg-[#111] aspect-video group">
                                    <div className="relative w-full h-full cursor-pointer group-hover:opacity-90 transition-opacity">
                    <img loading="lazy" src={`https://img.youtube.com/vi/${getYoutubeId(v.youtubeId || v.id || 'aCg32i0vQTo')}/hqdefault.jpg`} onError={(e: any) => { e.currentTarget.src = 'https://img.youtube.com/vi/aCg32i0vQTo/hqdefault.jpg'; }} alt={v.title || 'Testimonial'} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform group-hover:scale-110">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center mt-8">
            <a href="https://www.youtube.com/@VaidikTalk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#5c1a1f] hover:text-[#d97706] transition-colors">
                View all testimonials on YouTube
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </p>
          </div>
        </div>
      </div>

      
      
      
      
      
      
      {/* 6.5 PHOTO GALLERY */}
      <div className="w-full bg-[#fcf5eb] py-20 px-6 border-t border-[#e8d8c0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#d97706] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Puja Glimpses</p>
            <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#1a0a0b] mb-3">Divine Photo Gallery</h2>
            <p className="text-gray-850 text-base md:text-lg max-w-2xl mx-auto">Experience the divine energy through authentic moments captured during our Vedic rituals.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(dynamicData?.gallery?.length > 0 ? dynamicData.gallery : [
              '/pooja/Rudraabhishek.webp',
              '/pooja/Rahu Ketu Grah Shanti Puja.webp',
              '/pooja/Hanuman Sindoor  Boondi Puja.webp',
              '/pooja/Shani Tel Arpan and Aarti.webp',
              '/pooja/Mangal Dosh Nivaran Puja.webp',
              '/pooja/Ganesh Ji Ko Laddoo Arpan.webp'
            ]).map((img: string, idx: number) => (
              <div 
                key={idx} 
                className="relative rounded-2xl overflow-hidden shadow-sm border border-[#e8d8c0] group aspect-[4/3] cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img loading="lazy" src={img} alt={`Gallery Photo ${idx+1}`} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full mx-auto flex items-center justify-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-[#d4af37] transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img src={selectedImage} alt="Enlarged View" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10" />
          </div>
        </div>
      )}

      {/* PEOPLE ALSO BOOKED */}
      <div className="w-full bg-[#fdfaf6] py-20 px-6 border-t border-[#e8d8c0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[#d97706] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Related Pujas</p>
              <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#1a0a0b]">People Also Booked</h2>
            </div>
            <Link href="/book-a-puja" className="text-sm font-bold text-[#5c1a1f] hover:text-[#d97706] transition-colors flex items-center gap-1.5 shrink-0">
              View all pujas
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Rudrabhishek Puja', slug: 'rudrabhishek', price: '₹1,599', img: '/pooja/Rudraabhishek.webp', tag: 'Health & Peace' },
              { title: 'Rahu Ketu Shanti', slug: 'rahu-ketu-grah-shanti-puja', price: '₹1,599', img: '/pooja/Rahu Ketu Grah Shanti Puja.webp', tag: 'Dosh Nivaran' },
              { title: 'Hanuman Puja', slug: 'hanuman-sindoor-boondi-arpan', price: '₹999', img: '/pooja/Hanuman Sindoor  Boondi Puja.webp', tag: 'Strength & Protection' },
              { title: 'Shani Tel Arpan', slug: 'shani-tel-arpan-aarti', price: '₹1,199', img: '/pooja/Shani Tel Arpan and Aarti.webp', tag: 'Remove Shani Dosh' },
            ].map((r, idx) => (
              <Link key={idx} href={`/book-a-puja/${r.slug}`} className="group rounded-2xl overflow-hidden border border-[#f0ddc0] hover:border-[#d4af37]/60 hover:shadow-lg transition-all duration-300 bg-white flex flex-col">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={r.img} alt={r.title} className="w-full h-full object-contain bg-[#0d0505] group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent h-1/2" />
                </div>
                <div className="p-4 flex flex-col gap-1.5 flex-grow">
                  <span className="text-[#d97706] text-[10px] font-bold tracking-wider uppercase">{r.tag}</span>
                  <h4 className="font-bold text-[#1a0a0b] text-[13px] leading-snug group-hover:text-[#5c1a1f] transition-colors">{r.title}</h4>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="font-black text-[#ee6c1e] text-[15px]">{r.price}</span>
                    <span className="text-[11px] font-semibold text-[#5c1a1f] opacity-0 group-hover:opacity-100 transition-opacity">Book →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>



      {/* FAQS */}
      <div className="w-full bg-[#fdfaf7] py-16 md:py-20 px-6 border-t border-[#f0ddc0]/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#5c1a1f] mb-4">
              Frequently Asked <span className="text-[#d97706]">Questions</span>
            </h2>
            <p className="text-gray-850 text-sm md:text-base max-w-xl mx-auto">Everything you need to know about this puja and how we deliver it.</p>
          </div>
          <div className="space-y-3">
            {(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : [
    { q: "What is Shani Tel Arpan?", a: "Offering mustard oil (tel) to Lord Shani on Saturdays is a powerful remedy to pacify the malefic effects of Saturn, reduce Sade Sati troubles, and bring stability." },
    { q: "Who needs to perform Shani Tel Arpan?", a: "Those going through Shani Sade Sati, Shani Dhaiyya, or those with a malefic Saturn in their birth chart should regularly perform this arpan." },
    { q: "How often should this puja be done?", a: "Ideally every Saturday for 11 consecutive weeks during Sade Sati, or as advised by your astrologer based on your chart." },
    { q: "Will I get the prasad and photos?", a: "Yes. After the arpan and aarti, you receive HD photos, a video recording, and the energized prasad shipped to your address." }
            ]).map((faq: any, idx: number) => (
              <details key={idx} className="group bg-white border border-[#f0ddc0]/80 rounded-2xl shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 list-none hover:bg-[#fcf5eb]/50 transition-colors">
                  <h3 className="font-bold text-[#5c1a1f] text-[15px] pr-4">{faq.question || faq.q}</h3>
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-[#f0ddc0] text-[#8a1c2a] group-open:border-[#d97706] group-open:bg-[#d97706] group-open:text-white transition-all duration-300">
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" />
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-850 text-[14.5px] leading-relaxed border-t border-gray-100 pt-4">{faq.answer || faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      
      {/* FINAL CTA BANNER */}
      <div className="w-full bg-gradient-to-br from-[#fff5eb] to-[#fdfaf6] border-y border-[#f0ddc0] py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-6 shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-4 leading-tight">
            Ready to book your <br className="md:hidden" /> Puja?
          </h3>
          <p className="text-gray-850 mb-8 max-w-2xl mx-auto text-[15px] md:text-[17px] leading-relaxed">
            Experience divine blessings with our expert purohits. Secure your slot now to bring peace, prosperity, and success to your life.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('booking-section') || document.getElementById('pricing-plans');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold text-[16px] hover:shadow-xl hover:scale-105 transition-all shadow-md"
          >
            Book This Puja Now
          </button>
        </div>
      </div>

      {/* TRUST BANNER */}
      <div className="w-full bg-[#5c1a1f] py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
           {[
              { icon: <ShieldCheck className="w-8 h-8 text-[#f5d08b]" />, title: 'Authentic Rituals', desc: 'Vedic Scriptures' },
              { icon: <UserCheck className="w-8 h-8 text-[#f5d08b]" />, title: 'Expert Purohits', desc: 'Verified Pandits' },
              { icon: <Leaf className="w-8 h-8 text-[#f5d08b]" />, title: 'Pure Samagri', desc: 'Sattvik items' },
              { icon: <Lock className="w-8 h-8 text-[#f5d08b]" />, title: 'Secure Booking', desc: '100% Safe' },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="font-bold text-white text-lg mb-1">{feature.title}</h4>
                <p className="text-sm text-[#3a1216]">{feature.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
