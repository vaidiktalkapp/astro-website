import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Vaidik Talk',
  description: 'Privacy Policy for Vaidik Talk.',
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-[#fdfaf6] min-h-screen py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto relative px-4 md:px-8">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ShieldCheck className="w-40 h-40 text-[#5c1a1f]" />
        </div>

        <h1 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-6 border-b border-[#e8d8c0] pb-6">
          Privacy Policy
        </h1>
        
        <div className="prose prose-base md:prose-lg text-gray-900 max-w-none prose-headings:text-[#5c1a1f] prose-headings:font-serif prose-p:text-gray-900 prose-p:leading-relaxed prose-li:text-gray-900 prose-a:text-[#ee6c1e] prose-a:font-bold prose-a:underline hover:prose-a:text-[#8a1c2a] prose-strong:text-[#5c1a1f]">
          <p className="lead font-medium text-gray-900">
            Vaidik Talk ("we", "Vaidik Talk", "us", "our", or the "Platform") is committed to protecting the privacy of our users. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal data when you visit our website (https://www.vaidiktalk.com), use our mobile applications (iOS and Android), and access our services.
          </p>
          <p>
            By accessing or using Vaidik Talk, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">1. LEGAL BASIS & COMPLIANCE</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Information Technology Act, 2000</li>
            <li>IT (Intermediaries Guidelines) Rules, 2011</li>
            <li>SPDI Rules, 2011</li>
            <li>Consumer Protection (E-Commerce) Rules, 2020</li>
            <li>Applicable international privacy standards</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">2. AGE RESTRICTION & CHILDREN’S PRIVACY</h3>
          <p>Vaidik Talk is strictly intended for users aged 18 years and above. We do not knowingly collect data from children under 13 years of age.</p>
          <p>If you believe a child has shared data, contact us immediately at <a href="mailto:admin@vaidiktalk.com" className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]">admin@vaidiktalk.com</a>.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">3. INFORMATION WE COLLECT</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Phone number (OTP verification)</li>
            <li>First and last name</li>
            <li>Date, time, and place of birth (for astrology)</li>
            <li>Email address (optional)</li>
            <li>Gender and location (optional)</li>
            <li>Payment and transaction data</li>
            <li>Chat transcripts and call recordings</li>
            <li>Device information and IP address</li>
            <li>Cookies and analytics data</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">4. HOW WE USE YOUR INFORMATION</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Account creation and management</li>
            <li>Astrology consultations (chat, call, video)</li>
            <li>Wallet and payment processing</li>
            <li>Customer support and grievance handling</li>
            <li>Service personalization</li>
            <li>Security, fraud detection, and abuse prevention</li>
            <li>Legal and regulatory compliance</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">5. DATA SHARING & DISCLOSURE</h3>
          <p>We do not sell your personal data. Information may be shared with:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Astrologers for service delivery</li>
            <li>Payment gateways (Razorpay, UPI, Banks)</li>
            <li>Cloud hosting providers (AWS)</li>
            <li>Analytics providers (Google Analytics)</li>
            <li>Law enforcement or government authorities if legally required</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">6. DATA SECURITY</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>SSL/TLS encryption</li>
            <li>Secure cloud infrastructure</li>
            <li>OTP-based authentication</li>
            <li>PCI-DSS compliant payment processing</li>
            <li>Restricted employee access</li>
          </ul>
          <p>While we use industry-standard security measures, no method of transmission over the internet is 100% secure.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">7. COOKIES & TRACKING</h3>
          <p>We use cookies to manage sessions, improve user experience, prevent fraud, and analyze usage. You may disable cookies via your browser, but this may affect functionality.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">8. DATA RETENTION</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account data:</strong> Account lifetime + 3 years</li>
            <li><strong>Transaction data:</strong> 7 years</li>
            <li><strong>Chat/Call logs:</strong> 1 year</li>
            <li><strong>Analytics data:</strong> 24 months</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">9. ACCOUNT DELETION</h3>
          <p>You may delete your account using:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>In-App:</strong> Settings → Delete Account</li>
            <li><strong>Web:</strong> <a href="https://app.vaidiktalk.com/delete-account" className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]">https://app.vaidiktalk.com/delete-account</a></li>
            <li><strong>Email:</strong> <a href="mailto:admin@vaidiktalk.com" className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]">admin@vaidiktalk.com</a></li>
          </ul>
          <p>Account deletion includes a 7-day grace period and permanent anonymization thereafter. Wallet balance is forfeited upon final deletion.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">10. USER RIGHTS</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access your data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account</li>
            <li>Withdraw consent</li>
            <li>Object to marketing communications</li>
            <li>Request data portability</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">11. DISCLAIMER</h3>
          <p>Vaidik Talk does not guarantee astrological accuracy or outcomes. Astrology is subjective and results may vary.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">12. CUSTOMER SUPPORT & GRIEVANCE</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Email:</strong> support@vaidiktalk.com</li>
            <li><strong>Privacy:</strong> admin@vaidiktalk.com</li>
            <li><strong>Response Time:</strong> Within 24 hours</li>
            <li><strong>Resolution:</strong> Within 30 days</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">13. POLICY UPDATES</h3>
          <p>This policy may be updated periodically. Continued use of the Platform constitutes acceptance of changes.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">14. INTERNATIONAL USERS</h3>
          <p>If you access Vaidik Talk from outside India, your data will be stored and processed in India, governed by Indian law.</p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">15. CONTACT DETAILS</h3>
          <div className="bg-[#fcf8f2] p-6 rounded-xl border border-[#f0ddc0] mt-4">
            <p className="font-bold text-[#5c1a1f] mb-2">CATALYST SOURCING PRIVATE LIMITED</p>
            <p className="mb-1"><strong>Registered Address:</strong> 422, 4th Floor, Ashiana Trade Centre, Adityapur, Dist Sariakela Kharsawan Jamshedpur, Jharkhand 831013</p>
            <p className="mb-1"><strong>CIN:</strong> U50500JH2022PTC018567</p>
            <p className="mb-1"><strong>Support Phone:</strong> +919031823276</p>
            <p className="mb-1"><strong>Website:</strong> <a href="https://www.vaidiktalk.com" className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]">https://www.vaidiktalk.com</a></p>
            <p className="mb-0"><strong>Email:</strong> <a href="mailto:support@vaidiktalk.com" className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]">support@vaidiktalk.com</a></p>
          </div>

          <p className="text-sm text-gray-850 mt-10 text-center border-t border-[#e8d8c0] pt-6">
            © 2026 Vaidik Talk. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
