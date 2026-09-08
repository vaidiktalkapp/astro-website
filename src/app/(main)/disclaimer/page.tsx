import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer | Astro Solution',
  description: 'Disclaimer for Astro Solution.',
};

export default function Disclaimer() {
  return (
    <div className="w-full bg-[#fdfaf6] min-h-screen py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto relative px-4 md:px-8">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ShieldCheck className="w-40 h-40 text-[#5c1a1f]" />
        </div>

        <h1 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-6 border-b border-[#e8d8c0] pb-6">
          Disclaimer
        </h1>
        
        <div className="prose prose-base md:prose-lg text-gray-900 max-w-none prose-headings:text-[#5c1a1f] prose-headings:font-serif prose-p:text-gray-900 prose-p:leading-relaxed prose-li:text-gray-900 prose-a:text-[#ee6c1e] prose-a:font-bold prose-a:underline hover:prose-a:text-[#8a1c2a] prose-strong:text-[#5c1a1f]">
          <p className="lead font-medium text-gray-900">
            All information, content, interpretations, guidance, predictions, and data made available on the Astro Solution website and associated platforms are provided strictly for informational and entertainment purposes only. The content offered through this platform, including but not limited to astrological predictions, consultations, reports, remedies, or opinions, is not intended to replace, substitute, or be relied upon as professional advice of any nature.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">NO PROFESSIONAL ADVICE</h3>
          <p>Users are expressly advised that the services and content provided by Astro Solution do not constitute legal advice, medical advice, psychological counselling, financial planning, or any other form of professional consultation. Any decisions taken by the User based on the information or guidance received through the Website shall be made entirely at their own discretion and risk.</p>
          <p>For matters requiring professional expertise, Users are strongly encouraged to seek guidance from appropriately qualified and licensed professionals such as doctors, lawyers, psychiatrists, psychologists, financial advisors, or other certified experts.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">NO GUARANTEES</h3>
          <p>Astro Solution makes no representations, warranties, guarantees, or assurances, whether express or implied, regarding the accuracy, completeness, reliability, suitability, or outcomes of any information, astrological interpretations, remedies, or services provided on the platform.</p>
          <p>Astrology is a belief-based and subjective discipline, and interpretations may vary from one astrologer to another. Results, outcomes, and experiences may differ for each individual user.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">LIMITATION OF LIABILITY</h3>
          <p>Astro Solution shall not be responsible or liable for any loss, damage, injury, emotional distress, financial loss, or other harm arising from:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Reliance on astrological predictions or guidance</li>
            <li>Decisions made based on Website content</li>
            <li>Consultations or advice provided by astrologers or service providers</li>
            <li>Technical errors, interruptions, or data inaccuracies</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">THIRD-PARTY SERVICE PROVIDERS</h3>
          <p>Astro Solution may display or facilitate consultations, content, or services provided by independent astrologers and experts. These service providers are not employees of Astro Solution, and the platform does not assume responsibility for their opinions, advice, accuracy, or conduct.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">DATA & PRIVACY</h3>
          <p>All personal and usage data collected through the Website is processed, stored, and used in accordance with applicable laws and the Privacy Policy of Astro Solution. By using the platform, the User consents to such data collection and processing for operational, service, and transaction purposes.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">USER ACCEPTANCE</h3>
          <p>By accessing or using the Astro Solution Website or its services, the User confirms that they have read, understood, and agreed to this Disclaimer in full. Continued use of the Website constitutes acceptance of these terms and limitations.</p>

          <p className="text-sm text-gray-850 mt-10 text-center border-t border-[#e8d8c0] pt-6">
            © 2026 Astro Solution. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
