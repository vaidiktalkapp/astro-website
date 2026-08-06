import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Vaidik Talk',
  description: 'Terms and Conditions for using Vaidik Talk services.',
};

export default function TermsAndConditions() {
  return (
    <div className="w-full bg-[#fdfaf6] min-h-screen py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto relative px-4 md:px-8">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ShieldCheck className="w-40 h-40 text-[#5c1a1f]" />
        </div>

        <h1 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-6 border-b border-[#e8d8c0] pb-6">
          Terms & Conditions
        </h1>
        
        <div className="prose prose-base md:prose-lg text-gray-900 max-w-none prose-headings:text-[#5c1a1f] prose-headings:font-serif prose-p:text-gray-900 prose-p:leading-relaxed prose-li:text-gray-900 prose-a:text-[#ee6c1e] prose-a:font-bold prose-a:underline hover:prose-a:text-[#8a1c2a] prose-strong:text-[#5c1a1f]">
          <p className="lead font-medium text-gray-900">
            These comprehensive Terms and Conditions of Use ("Terms", "Agreement") govern the manner in which users access and use the services provided by Vaidik Talk ("Vaidik Talk", "we", "us", "our", or "Company") through its website (www.vaidiktalk.com) and mobile applications (iOS & Android).
          </p>
          <p>
            By accessing or using Vaidik Talk in any manner, you agree to be legally bound by these Terms. If you do not agree, please do not use the Platform.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">1. DEFINITIONS</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Platform:</strong> Website and mobile apps of Vaidik Talk</li>
            <li><strong>User:</strong> Any person accessing or using the Platform</li>
            <li><strong>Services:</strong> All astrology consultations, reports, products</li>
            <li><strong>Consultation:</strong> Real-time interaction with astrologers</li>
            <li><strong>Vaidik Wallet:</strong> Prepaid balance account</li>
            <li><strong>Astrologer:</strong> Registered service provider</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">2. ACCEPTANCE & MODIFICATION</h3>
          <p>By creating an account or using the Platform, you accept these Terms and our Privacy Policy. Vaidik Talk may modify these Terms at any time.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">3. ELIGIBILITY</h3>
          <p>You must be at least 18 years old or have parental consent if between 13–17. Users under 13 are not permitted.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">4. SERVICES</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Chat, call, video consultations</li>
            <li>Astrology reports</li>
            <li>Live stream (free viewing, paid chat)</li>
            <li>Remedies and physical products</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">5. COMMUNICATION CONSENT</h3>
          <p>You consent to receive calls, messages, and notifications from Vaidik Talk even if your number is registered under DND, for service delivery and support.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">6. USER ACCOUNT</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate information</li>
            <li>Maintain login confidentiality</li>
            <li>One account per user</li>
            <li>No account sharing</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">7. VAIDIK WALLET</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Prepaid service wallet</li>
            <li>Non-transferable</li>
            <li>Expires after 3 years</li>
            <li>No interest earned</li>
            <li>May be forfeited on violation</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">8. PAYMENTS</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Processed via Razorpay</li>
            <li>All prices in INR</li>
            <li>Double payments refunded</li>
            <li>Chargebacks may lead to suspension</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">9. REFUNDS & DELIVERY</h3>
          <p>Refunds are governed by our Refund & Replacement Policy.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>No refund once consultation connected</li>
            <li>No refund for wrong user data</li>
            <li>Physical delivery within India</li>
            <li>Damage claims within 72 hours</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">10. USER CONDUCT</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>No abuse or harassment</li>
            <li>No scams or fraud</li>
            <li>No explicit or illegal content</li>
            <li>No black magic or harmful rituals</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">11. ACCOUNT TERMINATION</h3>
          <p>Vaidik Talk may suspend or terminate accounts for policy violations, fraud, abuse, or illegal activity.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">12. PRIVACY POLICY</h3>
          <p>Your use is subject to our Privacy Policy: <a href="/privacy-policy" className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]">https://www.vaidiktalk.com/privacy-policy</a></p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">13. DISCLAIMER & LIABILITY</h3>
          <p>Services are provided "as-is". Vaidik Talk does not guarantee prediction accuracy, outcomes, or uninterrupted service.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">14. INTELLECTUAL PROPERTY</h3>
          <p>All content belongs to Vaidik Talk and may not be reused without permission.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">15. ZERO-TOLERANCE CONTENT POLICY</h3>
          <p>Objectionable, abusive, or illegal content is removed immediately and accounts may be terminated.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">16. JURISDICTION</h3>
          <p>Governed by Indian law. Disputes resolved by arbitration in New Delhi.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">17. CONTACT</h3>
          <div className="bg-[#fcf8f2] p-6 rounded-xl border border-[#f0ddc0] mt-4">
            <p className="font-bold text-[#5c1a1f] mb-2">CATALYST SOURCING PRIVATE LIMITED</p>
            <p className="mb-1"><strong>Registered Address:</strong> 422, 4th Floor, Ashiana Trade Centre, Adityapur, Dist Sariakela Kharsawan Jamshedpur, Jharkhand 831013</p>
            <p className="mb-1"><strong>CIN:</strong> U50500JH2022PTC018567</p>
            <p className="mb-1"><strong>Support Email:</strong> <a href="mailto:support@vaidiktalk.com" className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]">support@vaidiktalk.com</a></p>
            <p className="mb-0"><strong>Support Phone:</strong> +919031823276</p>
          </div>

          <p className="text-sm text-gray-700 mt-10 text-center border-t border-[#e8d8c0] pt-6">
            © 2026 Vaidik Talk. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
