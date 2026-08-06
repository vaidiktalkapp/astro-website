const fs = require('fs');
let content = fs.readFileSync('src/app/(main)/career-job/page.tsx', 'utf8');

const problemsReplacement = `  const problems = [
    {
      title: 'Job Delay or Unemployment',
      content: 'If you are struggling to find a job, the 10th house and Saturn (Karma karaka) often hold the reason. We analyze planetary transits to identify when a job offer is likely.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#059669]" />,
      report: { name: 'Talk to Expert', link: '/astrologers-chat' }
    },
    {
      title: 'Promotion & Increment',
      content: 'Awaiting a promotion? The 11th house of gains and the sun (authority) dictate your professional rise. We decode when your next big career jump will happen.',
      icon: <Sparkles className="w-6 h-6 text-[#d97706]" />,
      tool: { name: 'Free Kundli', link: '/kundli' },
    },
    {
      title: 'Business vs Job',
      content: 'Confused whether to do business or a job? The strength of the 7th house (business) vs 6th house (service) reveals the most profitable path for you.',
      icon: <ShieldCheck className="w-6 h-6 text-[#4f46e5]" />,
      report: { name: 'Full Report', link: '/report/career-business/career-report' }
    },
    {
      title: 'Workplace Politics',
      content: 'Facing issues with bosses or colleagues? Afflictions to the 6th house (enemies/competition) can cause this. We suggest simple remedies to calm the environment.',
      icon: <ShieldAlert className="w-6 h-6 text-[#e11d48]" />
    },
    {
      title: 'Government Job Yoga',
      content: 'The Sun, Moon, and Jupiter must form specific yogas for a government job. Find out if your Kundali promises success in competitive exams and government services.',
      icon: <Star className="w-6 h-6 text-[#059669]" />
    },
    {
      title: 'Changing Profession',
      content: 'Thinking of a completely new career path? Transitions are guided by the Dasha system. We identify the best sector for your long-term success.',
      icon: <HeartHandshake className="w-6 h-6 text-[#ea580c]" />
    }
  ];

  const faqs = [
    { q: 'Government job lagne ke yog hain ya nahi, kaise pata chalega?', a: 'Government job ke liye Sun (Surya), Moon (Chandra), aur Jupiter (Guru) ka 10th ya 6th house ke sath connection strong hona chahiye. Astrologers in yogas ko analyze karke apko batate hain.' },
    { q: 'Mujhe job karni chahiye ya business?', a: 'Ye 6th house (job/service) aur 7th house (business/partnership) ki strength par depend karta hai. Agar 7th house strong hai to business successful hota hai, otherwise job better rehti hai.' },
    { q: 'Mera promotion kab hoga?', a: 'Promotion ka time aapki current Mahadasha, Antardasha aur transiting Jupiter aur Saturn ki 10th/11th house par drishti se accurately predict kiya ja sakta hai.' },
    { q: 'Career growth ke liye konsa gemstone pehnna chahiye?', a: 'Career ke liye generally Ruby (Sun), Emerald (Mercury), ya Blue Sapphire (Saturn) pehna jata hai, lekin ye purely aapke lagna aur chart par depend karta hai. Bina consultation ke na pehne.' },
    { q: 'Workplace politics se kaise bachein?', a: '6th house enemies aur competition ka hota hai. Isko pacify karne ke liye specific mantras aur remedies (jaise Surya Dev ko jal chadhana) bahut madadgar hote hain.' }
  ];`;
content = content.replace(/const problems = \[[\s\S]*?];\s*const faqs = \[[\s\S]*?];/, problemsReplacement);

const toolsReplacement = `            {[
              { title: 'Free Janam Kundali', desc: 'Detailed 100+ page life blueprint', icon: <Heart className="w-7 h-7" />, link: '/kundli', color: 'bg-orange-50', text: 'text-[#ee6c1e]' },
              { title: 'Numerology Report', desc: 'Discover your lucky numbers', icon: <ShieldCheck className="w-7 h-7" />, link: '/numerology', color: 'bg-rose-50', text: 'text-[#e11d48]' },
              { title: 'Daily Horoscope', desc: 'Read today\\'s career predictions', icon: <Sparkles className="w-7 h-7" />, link: '/daily-horoscope', color: 'bg-indigo-50', text: 'text-[#4f46e5]' }
            ].map((tool, i) => (`
content = content.replace(/\{\[\s*\{\s*title:\s*'Kundali Matching'[\s\S]*?\].map\(\(tool, i\) => \(/, toolsReplacement);

const reportsReplacement = `                {[
                  { title: 'Career & Business Report', link: '/report/career-business/career-report' },
                  { title: 'Vaidik Smart Kundali (10 Years)', link: '/report/kundali/vaidik-smart-kundali-10-years' },
                  { title: 'Wealth & Finance Prediction', link: '/report/career-business/wealth-finance-report' }
                ].map((rep, i) => (`
content = content.replace(/\{\[\s*\{\s*title:\s*'Vaidik Smart Kundali \(10 Years\)'[\s\S]*?\].map\(\(rep, i\) => \(/, reportsReplacement);

const pujasReplacement = `                {[
                  { title: 'Job Attract Confirm Puja', link: '/book-a-puja/job-attract-puja' },
                  { title: 'Navgraha Shanti Puja', link: '/book-a-puja/navgraha-shanti-puja' },
                  { title: 'Business Success Puja', link: '/book-a-puja/business-success-puja' }
                ].map((rep, i) => (`
content = content.replace(/\{\[\s*\{\s*title:\s*'Mangal Dosh Nivaran Puja'[\s\S]*?\].map\(\(rep, i\) => \(/, pujasReplacement);

const seoTopReplacement = `          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-12 md:mb-16">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf3e7] text-[#d97706] text-sm font-semibold mb-4 border border-[#f0ddc0]/50">
                <Star className="w-4 h-4" /> Why Astrology for Career?
              </div>
              <h2 className="premium-serif font-bold text-[28px] md:text-[42px] text-[#3a1216] leading-tight md:leading-[1.2] mb-5 md:mb-6">
                Decoding Your Professional Success <br className="hidden md:block" />With <span className="text-[#d97706]">Vedic Astrology</span>
              </h2>
              <p className="text-[#5e4339] text-[15.5px] md:text-[17px] leading-relaxed mb-4">
                Your career path, financial success, and professional fulfillment are deeply intertwined with the planetary alignments at your time of birth. Vedic astrology provides a razor-sharp blueprint of your strengths, hidden talents, and the specific industries where you are destined to shine. By understanding your Kundali, you can stop guessing and start building a successful future.
              </p>
              <p className="text-[#5e4339] text-[16px] md:text-[17px] leading-relaxed">
                The <strong className="text-[#3a1216]">10th House</strong> (Karma Bhava) in your birth chart represents your career, ambition, and public reputation. Along with the 2nd and 11th houses of wealth and gains, these elements hold the key to answering when you'll get a job, whether business suits you better, and when you can expect financial breakthroughs.
              </p>
            </div>

            <div className="flex-1 w-full relative mt-4 lg:mt-0">
              <div className="absolute inset-0 bg-[#f8e2c9] rounded-[2.5rem] blur-[60px] opacity-40 -z-10"></div>
              <div className="bg-[#fdfaf7] border border-[#f0ddc0]/80 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_10px_40px_rgba(138,28,42,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#fdf3e7] rounded-bl-[80px] md:rounded-bl-[100px] -z-10"></div>
                <h3 className="premium-serif font-bold text-[24px] md:text-[28px] text-[#3a1216] mb-6 md:mb-8">How Our Astrologers Help</h3>
                <ul className="space-y-6">
                  {[
                    { title: 'Job Timing Prediction', desc: 'Identify the exact months when you are most likely to land a high-paying job.' },
                    { title: 'Business vs Job Guidance', desc: 'Clear the confusion with data-driven astrological analysis of your 6th and 7th houses.' },
                    { title: 'Overcome Workplace Politics', desc: 'Practical remedies to defeat enemies and gain favor with superiors.' },
                    { title: 'Wealth & Success Remedies', desc: 'Powerful pujas, gemstones, and rituals to attract prosperity and promotions.' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 md:gap-5 items-start">
                      <div className="shrink-0 w-7 h-7 mt-0.5 rounded-full bg-[#8a1c2a]/10 text-[#8a1c2a] flex items-center justify-center text-[13px] font-bold">{idx + 1}</div>
                      <div>
                        <h4 className="font-bold text-[#3a1216] text-[15.5px] md:text-[16px] mb-1 leading-snug">{item.title}</h4>
                        <p className="text-[#5e4339] text-[13.5px] md:text-[14px] leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 md:mt-10">
                  <Link href="/astrologers-chat" className="w-full inline-flex justify-center items-center bg-white border-2 border-[#8a1c2a] text-[#8a1c2a] font-bold px-5 py-3.5 md:py-4 rounded-xl hover:bg-[#8a1c2a] hover:text-white transition-all shadow-sm text-[15px] md:text-[15.5px]">
                    Talk to a Career Expert
                  </Link>
                </div>
              </div>
            </div>
          </div>`;
content = content.replace(/<div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-12 md:mb-16">[\s\S]*?Talk to a Relationship Expert\s*<\/Link>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, seoTopReplacement);

const seoBottomReplacement = `          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {/* Card 1: Job vs Business */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.08)] hover:border-[#d97706]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#d97706] group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">Job vs Business Analysis</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                A recurring dilemma for many professionals is choosing between a steady job and entrepreneurship. In Vedic Astrology, the <strong className="text-[#3a1216] font-semibold">6th House</strong> governs service and employment, while the <strong className="text-[#3a1216] font-semibold">7th House</strong> represents independent business and trade. Our astrologers evaluate the strength of these houses and their lords to give you a definitive answer on where your financial fortune lies.
              </p>
            </div>

            {/* Card 2: Government Job */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.08)] hover:border-[#22c55e]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#22c55e] group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">Yogas for Government Jobs</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                Securing a government job (Sarkari Naukri) is a common dream. For this, strong <strong className="text-[#3a1216] font-semibold">Sun (Surya)</strong> and <strong className="text-[#3a1216] font-semibold">Jupiter (Guru)</strong> connections with the 10th house are essential. Specific alignments like the "Amatyakarka" planet and its Navamsha position provide deep insights into your chances of clearing competitive exams and securing authoritative state roles.
              </p>
            </div>

            {/* Card 3: Promotion & Growth */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.08)] hover:border-[#e11d48]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#e11d48] group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">Timings for Promotion & Growth</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                Feeling stuck in your current role? Career progression heavily depends on planetary transits (Gochar) and Dasha sequences. When favorable planets transit over your natal 10th or 11th house, promotions and salary increments naturally manifest. We pinpoint these exact time frames so you can time your career moves perfectly.
              </p>
            </div>
          </div>`;
content = content.replace(/<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, seoBottomReplacement + '\n        </div>\n      </section>');

const deepDiveIntroReplacement = `            <h2 className="premium-serif font-bold text-[32px] md:text-[40px] text-[#3a1216] mb-4 leading-tight">
              Planets, Houses & <span className="text-[#d97706]">Remedies</span>
            </h2>
            <p className="text-[#5e4339] text-[16.5px] max-w-3xl mx-auto leading-relaxed">
              Vedic Astrology provides a surgical analysis of your career potential. Our experts decode the precise geometric alignments of the Navagrahas (nine planets) and specific Bhavas (houses) in your Kundali to reveal the absolute truth about your professional destiny.
            </p>
          </div>`;
content = content.replace(/<h2 className="premium-serif font-bold text-\[32px\] md:text-\[40px\] text-\[#3a1216\] mb-4 leading-tight">[\s\S]*?<\/div>/, deepDiveIntroReplacement);

const deepDiveContentReplacement = `          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Planets */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#fff8f0] rounded-2xl flex items-center justify-center mb-6 border border-[#f0ddc0]/50">
                <Sun className="w-7 h-7 text-[#d97706]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Role of Key Planets</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Saturn (Shani):</strong> The supreme planet of karma and profession. It demands hard work, discipline, and defines your core career structure.</p>
                </li>
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Sun (Surya):</strong> Represents authority, leadership, and success in government jobs or higher management roles.</p>
                </li>
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Mercury (Buddh):</strong> The planet of intelligence, communication, and commerce. A strong Mercury is essential for business success.</p>
                </li>
              </ul>
            </div>

            {/* Houses */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#f0f9ff] rounded-2xl flex items-center justify-center mb-6 border border-[#bae6fd]/50">
                <Moon className="w-7 h-7 text-[#0284c7]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Crucial Astrology Houses</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">10th House:</strong> The 'Karma Bhava', representing your status, profession, fame, and public achievements.</p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">11th House:</strong> The house of gains, income, and fulfillment of desires. Connected to salary hikes and business profits.</p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">2nd House:</strong> Represents accumulated wealth and bank balance. Indicates how well you retain the money you earn.</p>
                </li>
              </ul>
            </div>

            {/* Remedies */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#fdf4ff] rounded-2xl flex items-center justify-center mb-6 border border-[#fbcfe8]/50">
                <Sparkles className="w-7 h-7 text-[#c026d3]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Powerful Vedic Remedies</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Job Attract Puja:</strong> Specialized Vedic rituals and Homas that clear blockages in your professional path and invite new opportunities.</p>
                </li>
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed">
                    <strong className="text-[#3a1216]">Authentic Gemstones:</strong> Wearing Ruby for authority, or Blue Sapphire for rapid career growth (if prescribed).{' '}
                    <a href="https://vaidiktalk.store/" target="_blank" rel="noopener noreferrer" className="text-[#d97706] font-semibold hover:underline inline-flex items-center gap-1 mt-1">
                      Buy 100% Original Gemstones <ArrowRight className="w-3 h-3" />
                    </a>
                  </p>
                </li>
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Surya Arghya:</strong> Offering water to the Sun God daily is a simple yet extremely potent remedy for job stability and promotions.</p>
                </li>
              </ul>
            </div>
          </div>`;
content = content.replace(/<div className="grid lg:grid-cols-3 gap-6 md:gap-8">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, deepDiveContentReplacement + '\n        </div>\n      </section>');

const ctaReplacement = `          <h2 className="premium-serif font-bold text-[#3a1216] text-[36px] md:text-[46px] mb-6 leading-tight">
            Take Control of Your <br /> Professional Destiny
          </h2>
          <p className="text-[#5e4339] text-[17px] mb-10 max-w-xl mx-auto font-medium">
            Connect with a verified career astrologer today or start by generating your free detailed Kundali.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/astrologers-chat" className="w-full sm:w-auto inline-flex justify-center items-center bg-[#8a1c2a] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#721522] hover:-translate-y-1 transition-all shadow-[0_8px_20px_rgba(138,28,42,0.15)] text-[16px]">
              Talk to a Career Astrologer
            </Link>
            <Link href="/kundli" className="w-full sm:w-auto inline-flex justify-center items-center bg-white border-2 border-[#f0ddc0] text-[#5c1420] font-bold px-8 py-4 rounded-xl hover:bg-[#fdf8f0] hover:border-[#d97706] transition-all shadow-sm text-[16px]">
              Generate Free Kundali
            </Link>
          </div>`;
content = content.replace(/<h2 className="premium-serif font-bold text-\[#3a1216\] text-\[36px\] md:text-\[46px\] mb-6 leading-tight">[\s\S]*?<\/div>/, ctaReplacement);

fs.writeFileSync('src/app/(main)/career-job/page.tsx', content);
console.log('Update Complete');
