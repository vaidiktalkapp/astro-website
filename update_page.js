const fs = require('fs');
const filePath = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/page.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');

// Find where section 2 starts
const startLineIdx = lines.findIndex(l => l.includes('{/* ============ SECTION 2: BOOK MOCKUP ============ */}'));

if (startLineIdx === -1) {
    console.error("Could not find start index");
    process.exit(1);
}

const newContent = `      {/* ============ PRODUCT INTRODUCTION ============ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c3a21] mb-6 text-center">Vaidik Smart Kundali (10 Years)</h2>
          <div className="text-gray-700 text-[15px] leading-relaxed space-y-4 max-w-4xl mx-auto text-center md:text-left">
            <p>People who search for information about their life events and want to understand which planets may impact upcoming events during a specific time period often use online Kundli astrology reports. A 10 year Kundali can help individuals explore important life phases, planetary influences, and potential events over an extended period.</p>
            <p>The Vedic Smart Kundali report offers ten years of astrological insights for clients who want a detailed timeline analysis based on traditional astrological methods. Unlike a conventional handwritten Kundli, the report provides an extensive ten-year astrological analysis using traditional Vedic calculation techniques to determine astrological outcomes and offer structured insights into different stages of life.</p>
          </div>
          <div className="mt-10 flex justify-center">
            <a href="#order-form" className="inline-flex items-center gap-2 bg-[#996033] text-white font-bold text-[18px] px-10 py-4 rounded-xl shadow-lg hover:bg-[#74452a] hover:scale-105 transition-all">
              Book Now @ <span className="line-through text-white/60 ml-2 text-[15px]">₹1799</span> <span>₹649</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============ HIGHLIGHTS & SPECIFICATIONS ============ */}
      <section className="py-12 md:py-16 bg-[#fdfaf6] border-y border-[#ebdcc7]">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-[22px] font-bold text-[#b06126] mb-4">Product Highlights</h3>
            <div className="text-gray-700 text-[14.5px] space-y-4 leading-relaxed">
              <p>The astrological report establishes its precise results through its mathematical computations and its capability to show information in an understandable format. The kundali system uses planetary positions which are determined by a person's birth date to create a structured approach for forecasting future developments across all aspects of life.</p>
              <p>Online astrology investigators assess reports by studying their actual content instead of using report length and design elements as their assessment method. The study establishes its core elements through its interpretation framework and its capacity to produce precise timeline forecasts. The report presents its findings through a user-friendly design which the authors created to achieve equilibrium without providing unnecessary information.</p>
            </div>
          </div>
          <div>
            <h3 className="text-[22px] font-bold text-[#b06126] mb-4">Specifications</h3>
            <ul className="space-y-3 bg-white p-6 rounded-xl border border-[#ebdcc7] shadow-sm">
              <li className="flex gap-2 text-[14px]"><strong className="text-[#5c3a21] min-w-[140px]">Product Name:</strong> Vaidik Smart Kundali 10 Years Report</li>
              <li className="flex gap-2 text-[14px]"><strong className="text-[#5c3a21] min-w-[140px]">Report Type:</strong> Digital Astrological Forecast</li>
              <li className="flex gap-2 text-[14px]"><strong className="text-[#5c3a21] min-w-[140px]">Astrology Method:</strong> Traditional Vedic System</li>
              <li className="flex gap-2 text-[14px]"><strong className="text-[#5c3a21] min-w-[140px]">Coverage Period:</strong> Ten years</li>
              <li className="flex gap-2 text-[14px]"><strong className="text-[#5c3a21] min-w-[140px]">Format:</strong> Structured interpretative sections</li>
              <li className="flex gap-2 text-[14px]"><strong className="text-[#5c3a21] min-w-[140px]">Delivery:</strong> Online accessible format</li>
              <li className="flex gap-2 text-[14px]"><strong className="text-[#5c3a21] min-w-[140px]">Usage:</strong> Personal reference and planning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ REPORT COMPOSITION & FRAMEWORK ============ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-[22px] font-bold text-[#5c3a21] mb-3 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#d68636]"/> Report Composition</h3>
            <p className="text-gray-700 text-[14.5px] leading-relaxed">The Vaidik Smart Kundali price assessment process involves examining both the coverage period and the analysis results which can be studied by researchers. The report explains how planets influence people during specific yearly periods to assist users in identifying the patterns which affect different points of their life progression.</p>
          </div>
          <div>
            <h3 className="text-[22px] font-bold text-[#5c3a21] mb-3 flex items-center gap-2"><Activity className="w-5 h-5 text-[#d68636]"/> Interpretation Framework</h3>
            <div className="text-gray-700 text-[14.5px] space-y-4 leading-relaxed">
              <p>The report shows upcoming planetary periods and their sub-periods which will occur during the next decade. The sections show which changes will connect with human behavior and current environmental patterns.</p>
              <p>Traditional methods of interpretation are used to read the text with ease. The report displays its contents through separate sections which present professional, financial, relationship, and personal development information for quick access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VISUAL STRUCTURE & PREDICTIVE SCOPE ============ */}
      <section className="py-12 md:py-16 bg-[#fdfaf6] border-y border-[#ebdcc7]">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-[22px] font-bold text-[#b06126] mb-3 flex items-center gap-2"><Monitor className="w-5 h-5 text-[#d68636]"/> Visual Structure</h3>
            <div className="text-gray-700 text-[14.5px] space-y-4 leading-relaxed">
              <p>The report layout keeps its basic design which prevents decorative elements from making the text harder to read. The forecast period includes specific times through which people can find particular times using tables and timeline markers.</p>
              <p>The design enables users to return to the document at their preferred time without encountering obstacles. The document delivers straightforward information to readers who require help in understanding its content.</p>
            </div>
          </div>
          <div>
            <h3 className="text-[22px] font-bold text-[#b06126] mb-3 flex items-center gap-2"><Search className="w-5 h-5 text-[#d68636]"/> Predictive Scope</h3>
            <p className="text-gray-700 text-[14.5px] mb-4">The ten-year kundali report presents a customary analysis of six specific areas, which include:</p>
            <ul className="space-y-2 mb-4">
              {[
                'Career mobility path forecasting',
                'Financial acumen predictions',
                'Educational milestones',
                'Social relationship links',
                'Health development patterns',
                'Travel opportunities',
                'Decision-making times'
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-center text-[14px] text-[#3a1216] font-medium bg-white px-3 py-1.5 rounded-md border border-[#ebdcc7]">
                  <CheckCircle2 className="w-4 h-4 text-[#d68636] shrink-0"/> {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 text-[14px] italic">The movements of all the planets during a given time are the standards on which a prognostic system is based.</p>
          </div>
        </div>
      </section>

      {/* ============ IDEAL FOR ============ */}
      <section className="py-12 md:py-16 bg-white text-center">
        <div className="max-w-[800px] mx-auto px-4">
          <h3 className="text-[28px] font-serif font-bold text-[#5c3a21] mb-6">Ideal For</h3>
          <p className="text-gray-700 text-[15px] mb-8">The report is appropriate for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
             <div className="bg-[#fdfaf6] p-4 rounded-xl border border-[#ebdcc7] shadow-sm flex items-start gap-3 hover:bg-[#f4ece3] transition-colors">
               <CheckCircle2 className="w-5 h-5 text-[#d68636] shrink-0 mt-0.5"/>
               <span className="text-[14px] text-[#3a1216] font-medium">Students assessing their academic schedule</span>
             </div>
             <div className="bg-[#fdfaf6] p-4 rounded-xl border border-[#ebdcc7] shadow-sm flex items-start gap-3 hover:bg-[#f4ece3] transition-colors">
               <CheckCircle2 className="w-5 h-5 text-[#d68636] shrink-0 mt-0.5"/>
               <span className="text-[14px] text-[#3a1216] font-medium">Professionals who need to understand career paths</span>
             </div>
             <div className="bg-[#fdfaf6] p-4 rounded-xl border border-[#ebdcc7] shadow-sm flex items-start gap-3 hover:bg-[#f4ece3] transition-colors">
               <CheckCircle2 className="w-5 h-5 text-[#d68636] shrink-0 mt-0.5"/>
               <span className="text-[14px] text-[#3a1216] font-medium">Business owners who want to develop their upcoming business plans</span>
             </div>
             <div className="bg-[#fdfaf6] p-4 rounded-xl border border-[#ebdcc7] shadow-sm flex items-start gap-3 hover:bg-[#f4ece3] transition-colors">
               <CheckCircle2 className="w-5 h-5 text-[#d68636] shrink-0 mt-0.5"/>
               <span className="text-[14px] text-[#3a1216] font-medium">People who need to evaluate their everlasting obligations</span>
             </div>
             <div className="bg-[#fdfaf6] p-4 rounded-xl border border-[#ebdcc7] shadow-sm flex items-start gap-3 sm:col-span-2 sm:max-w-[80%] sm:mx-auto hover:bg-[#f4ece3] transition-colors">
               <CheckCircle2 className="w-5 h-5 text-[#d68636] shrink-0 mt-0.5"/>
               <span className="text-[14px] text-[#3a1216] font-medium">People who want to receive regular astrological forecasts</span>
             </div>
          </div>
          <p className="text-gray-700 text-[15px] max-w-2xl mx-auto">The kundali operates as an astrological instrument which users can utilize to monitor their significant life events according to traditional astrological methods.</p>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-20 bg-[#1a110d] text-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-center mb-12 text-[#fdfaf6]">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-white/20 z-0"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#f26522] flex items-center justify-center text-[22px] font-bold mb-5 border-4 border-[#1a110d] shadow-xl text-white">01</div>
              <h4 className="font-bold text-[17px] mb-2 uppercase tracking-wide text-[#fdfaf6]">Fill the form</h4>
              <p className="text-white/70 text-[13.5px]">Submit all the required details carefully through the online form.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#f26522] flex items-center justify-center text-[22px] font-bold mb-5 border-4 border-[#1a110d] shadow-xl text-white">02</div>
              <h4 className="font-bold text-[17px] mb-2 uppercase tracking-wide text-[#fdfaf6]">Make Payment</h4>
              <p className="text-white/70 text-[13.5px]">Complete payment securely using our trusted payment gateway.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#f26522] flex items-center justify-center text-[22px] font-bold mb-5 border-4 border-[#1a110d] shadow-xl text-white">03</div>
              <h4 className="font-bold text-[17px] mb-2 uppercase tracking-wide text-[#fdfaf6]">Receive Report</h4>
              <p className="text-white/70 text-[13.5px]">Your handwritten Kundali is prepared and delivered to you.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#f26522] flex items-center justify-center text-[22px] font-bold mb-5 border-4 border-[#1a110d] shadow-xl text-white">04</div>
              <h4 className="font-bold text-[17px] mb-2 uppercase tracking-wide text-[#fdfaf6]">Implement Remedies</h4>
              <p className="text-white/70 text-[13.5px]">Follow the suggested remedies for positive life transformation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIFFERENCE TABLE ============ */}
      <section className="py-16 md:py-24 bg-[#fdfaf6]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-[26px] md:text-[34px] font-serif font-bold text-[#5c3a21] mb-12 text-center max-w-2xl mx-auto leading-tight">Difference in Basic Kundali and Vaidik Smart Kundali (10 Years)?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-[850px] mx-auto">
            
            {/* Basic Kundali */}
            <div className="bg-white border-2 border-[#ffe4e6] rounded-2xl p-6 md:p-8 shadow-sm transition-transform hover:-translate-y-1">
              <h3 className="text-[22px] font-bold text-[#be123c] mb-1 text-center">Basic Kundali</h3>
              <p className="text-[#9f1239] text-[13px] text-center mb-8 font-medium">Limitations of Free / Basic Kundali Reports</p>
              <ul className="space-y-5">
                {[
                  'Limited to Planet Positions Only',
                  'No Year-Wise Prediction',
                  'No Transit or Dasha Analysis',
                  'Generic Remedies Without Personal Context',
                  'Not Verified by Experts'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#ffe4e6] flex items-center justify-center shrink-0"><X className="w-4 h-4 text-[#e11d48]" strokeWidth={3}/></div>
                    <span className="text-[#4c0519] text-[15px] font-medium pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Smart Kundali */}
            <div className="bg-white border-2 border-[#bbf7d0] rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(34,197,94,0.15)] relative transition-transform hover:-translate-y-1">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#16a34a] text-white px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-current"/> RECOMMENDED</div>
              <h3 className="text-[22px] font-bold text-[#15803d] mb-1 text-center mt-2">Vaidik Smart Kundali</h3>
              <p className="text-[#166534] text-[13px] text-center mb-8 font-medium">VaidikTalk’s Smart Kundali (10 Years)</p>
              <ul className="space-y-5">
                {[
                  'Detailed Predictions for 10 Years',
                  'Dasha, Transit & Planet Strength Analysis',
                  'Personalized Remedies for Each Year',
                  'Guidance on Career, Marriage, Health & Finance',
                  'Verified by Experienced Astrologers'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-[#16a34a]" strokeWidth={3}/></div>
                    <span className="text-[#14532d] text-[15px] font-bold pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ============ USAGE GUIDELINES & WHY ============ */}
      <section className="py-16 md:py-20 bg-white border-y border-[#ebdcc7]">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[24px] font-bold text-[#5c3a21] mb-4">Usage Guidelines</h3>
            <div className="text-gray-700 text-[14.5px] leading-relaxed space-y-4">
              <p>Users from the organization may access the digital report at any time to use as they need. Use it to review during crucial decision-making moments which involve their assessment of future possibilities. The document serves as a time-based reference point which enables users to track permanent changes that occur through planetary movements.</p>
              <p>Store the digital copy in a secure location which enables future access. The report needs ongoing accessibility because it covers an extensive time frame. The online system operates without needing any physical maintenance work. The system maintains full operational capabilities without requiring any on-site maintenance.</p>
            </div>
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-[#5c3a21] mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#d68636]"/> Why Use This Report?
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start bg-[#fdfaf6] p-4 rounded-lg border border-[#ebdcc7]">
                <div className="w-2 h-2 rounded-full bg-[#d68636] mt-1.5 shrink-0"></div>
                <p className="text-[14px] text-gray-700">Astrology services require users to evaluate their available options through a report duration and presentation style selection process which users should choose.</p>
              </li>
              <li className="flex gap-3 items-start bg-[#fdfaf6] p-4 rounded-lg border border-[#ebdcc7]">
                <div className="w-2 h-2 rounded-full bg-[#d68636] mt-1.5 shrink-0"></div>
                <p className="text-[14px] text-gray-700">Users can only use the service for extended periods through the system, which requires them to understand both the interpretable results and the complete calculation process.</p>
              </li>
              <li className="flex gap-3 items-start bg-[#fdfaf6] p-4 rounded-lg border border-[#ebdcc7]">
                <div className="w-2 h-2 rounded-full bg-[#d68636] mt-1.5 shrink-0"></div>
                <p className="text-[14px] text-gray-700">Our report maintains classical calculation methods through its analysis presentation, which enables readers to understand the results.</p>
              </li>
              <li className="flex gap-3 items-start bg-[#fdfaf6] p-4 rounded-lg border border-[#ebdcc7]">
                <div className="w-2 h-2 rounded-full bg-[#d68636] mt-1.5 shrink-0"></div>
                <p className="text-[14px] text-gray-700">Users who buy Vaidik Smart Kundali online can track planetary patterns for ten years because the system provides all necessary information about upcoming celestial events, which would normally require them to read multiple brief reports.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ GIFTING SUITABILITY ============ */}
      <section className="py-12 bg-[#fdfaf6] text-center">
        <div className="max-w-[800px] mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#ebdcc7] shadow-sm mb-4">
            <Gift className="w-8 h-8 text-[#d68636]"/>
          </div>
          <h3 className="text-[26px] md:text-[32px] font-serif font-bold text-[#5c3a21] mb-4">🌟 Gifting Suitability</h3>
          <p className="text-gray-700 text-[15.5px] leading-relaxed mb-6 max-w-3xl mx-auto">This kundali report can be a good digital gift to those who have an interest in astrology-based planning tools. The study of personal timelines needs to be taught through conventional methods because it benefits students, workers, and family members who want to understand their personal histories.</p>
          <p className="text-[18px] font-bold text-[#b06126]">Visit our website to buy an authentic Vaidik Smart kundali or contact us today.</p>
        </div>
      </section>

      {/* ============ ORDER FORM SHELL ============ */}
      <section className="py-16 md:py-24 bg-white border-t border-[#ebdcc7]" id="order-form">
        <div className="max-w-[1140px] mx-auto px-4 md:px-6">
          <div className="bg-[#fdfaf6] max-w-[900px] mx-auto p-6 md:p-12 border border-[#ebdcc7] border-t-[4px] border-t-[#d68636] shadow-xl rounded-2xl">
            <h2 className="font-serif text-center text-[28px] md:text-[34px] font-bold text-[#5c3a21] mb-2 md:mb-3 leading-tight">Fill the Form Below</h2>
            <p className="text-center text-gray-600 text-[14px] md:text-[15px] mb-8 md:mb-12">Kindly provide accurate information for more precise calculations</p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors" placeholder="Full Name" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Gender *</label>
                  <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors appearance-none cursor-pointer">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Date of Birth *</label>
                  <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Time of Birth *</label>
                  <input required type="time" name="tob" value={formData.tob} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Place of Birth *</label>
                  <input required type="text" name="pob" value={formData.pob} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors" placeholder="Place Of Birth" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Country of Birth *</label>
                  <input required type="text" name="country" value={(formData as any).country || ''} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors" placeholder="Country Of Birth" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">State of Birth *</label>
                  <input required type="text" name="state" value={(formData as any).state || ''} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors" placeholder="State Of Birth" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Report Language *</label>
                  <select required name="language" value={(formData as any).language || ''} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors appearance-none cursor-pointer">
                    <option value="">Report Language</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors" placeholder="Email" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#5c3a21] tracking-[0.5px] uppercase">Phone No. *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#d68636] text-[15px] transition-colors" placeholder="Phone No." />
                </div>

              </div>

              <div className="mt-12 flex flex-col items-center">
                <button type="submit" disabled={isProcessing} className="w-full sm:w-[300px] bg-[#996033] text-white font-bold text-[18px] px-12 py-4 rounded-xl shadow-lg hover:bg-[#74452a] hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {isProcessing ? 'Processing...' : \`Book Now @ ₹649\`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
\`;

const finalLines = [...lines.slice(0, startLineIdx), newContent];
fs.writeFileSync(filePath, finalLines.join('\\n'));
