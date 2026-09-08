import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Refund & Replacement Policy | Astro Solution',
  description: 'Refund and Replacement Policy for Astro Solution.',
};

export default function RefundPolicy() {
  return (
    <div className="w-full bg-[#fdfaf6] min-h-screen py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto relative px-4 md:px-8">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ShieldCheck className="w-40 h-40 text-[#5c1a1f]" />
        </div>

        <h1 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-6 border-b border-[#e8d8c0] pb-6">
          Refund & Replacement Policy
        </h1>
        
        <div className="prose prose-base md:prose-lg text-gray-900 max-w-none prose-headings:text-[#5c1a1f] prose-headings:font-serif prose-p:text-gray-900 prose-p:leading-relaxed prose-li:text-gray-900 prose-a:text-[#ee6c1e] prose-a:font-bold prose-a:underline hover:prose-a:text-[#8a1c2a] prose-strong:text-[#5c1a1f]">
          <p className="lead font-medium text-gray-900">
            Astro Solution ("we", "Astro Solution", "us", or the "Platform") provides this comprehensive Refund & Replacement Policy governing all purchases of digital services, wallet recharges, and physical products made through our website and mobile applications.
          </p>
          <p>
            By placing an order or purchasing any service on Astro Solution, you agree to the terms outlined below. Please read this policy carefully before making any purchase.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">1. OVERVIEW</h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-[#e8d8c0] text-sm md:text-base">
              <thead>
                <tr className="bg-[#fcf8f2] text-[#5c1a1f]">
                  <th className="border border-[#e8d8c0] px-4 py-3 text-left font-bold">Category</th>
                  <th className="border border-[#e8d8c0] px-4 py-3 text-left font-bold">Examples</th>
                  <th className="border border-[#e8d8c0] px-4 py-3 text-left font-bold">Refund Method</th>
                  <th className="border border-[#e8d8c0] px-4 py-3 text-left font-bold">Eligibility Window</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#e8d8c0] px-4 py-3 font-semibold text-gray-900">Digital Services</td>
                  <td className="border border-[#e8d8c0] px-4 py-3">Consultations, Astro Reports</td>
                  <td className="border border-[#e8d8c0] px-4 py-3 text-[#d4af37] font-medium">Vaidik Wallet Credit</td>
                  <td className="border border-[#e8d8c0] px-4 py-3">If service fails</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="border border-[#e8d8c0] px-4 py-3 font-semibold text-gray-900">Wallet Recharge</td>
                  <td className="border border-[#e8d8c0] px-4 py-3">Money top-up</td>
                  <td className="border border-[#e8d8c0] px-4 py-3 text-[#d4af37] font-medium">Original Payment Method</td>
                  <td className="border border-[#e8d8c0] px-4 py-3">1–2 days (unused only)</td>
                </tr>
                <tr>
                  <td className="border border-[#e8d8c0] px-4 py-3 font-semibold text-gray-900">Physical Products</td>
                  <td className="border border-[#e8d8c0] px-4 py-3">Gemstones, Remedies</td>
                  <td className="border border-[#e8d8c0] px-4 py-3 text-[#d4af37] font-medium">Store Credit</td>
                  <td className="border border-[#e8d8c0] px-4 py-3">7 days from delivery</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#fdfaf6] border-l-4 border-[#5c1a1f] p-5 my-8 rounded-r-xl">
            <h2 className="text-2xl font-bold text-[#5c1a1f] mt-0 mb-2">SECTION A: DIGITAL SERVICES</h2>
            <p className="text-sm text-gray-900 m-0">Policy for all online consultations and digital reports.</p>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">2. ELIGIBLE DIGITAL SERVICES</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Chat, call, video consultations</li>
            <li>Astrology reports</li>
            <li>Paid services</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">3. DIGITAL SERVICE REFUND RULES</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white p-5 rounded-xl border border-green-200 shadow-sm">
              <h4 className="font-bold text-green-700 mt-0 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Eligible for Refund (Service Failure Only)
              </h4>
              <ul className="space-y-1 mb-4 text-sm">
                <li>• Call/chat failed to connect</li>
                <li>• Astrologer no-show</li>
                <li>• System or transaction error</li>
              </ul>
              <div className="text-sm bg-green-50 p-3 rounded-lg">
                <p className="m-0"><strong>Refund Method:</strong> Vaidik Wallet Credit only</p>
                <p className="m-0"><strong>Timeline:</strong> 1–2 business days</p>
                <p className="m-0"><strong>Amount:</strong> 100% of service cost</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-red-200 shadow-sm">
              <h4 className="font-bold text-red-700 mt-0 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Not Eligible
              </h4>
              <ul className="space-y-1 text-sm text-gray-900">
                <li>• Consultation successfully connected</li>
                <li>• User disconnected voluntarily</li>
                <li>• Dissatisfied with astrologer</li>
                <li>• Request after 7 days</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#fdfaf6] border-l-4 border-[#5c1a1f] p-5 mt-10 mb-6 rounded-r-xl">
            <h2 className="text-2xl font-bold text-[#5c1a1f] mt-0 mb-2">SECTION B: WALLET RECHARGE</h2>
          </div>
          
          <p>Wallet recharge refunds are allowed only if the amount is unused and requested within 1–2 days.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Refund Method:</strong> Original payment method (via Razorpay)</li>
            <li><strong>Processing Time:</strong> 5–9 business days</li>
            <li><strong>Amount:</strong> 100% (no deductions)</li>
          </ul>

          <p className="font-bold text-red-700 mt-6 mb-2">No Refund if:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-900">
            <li>Any amount used</li>
            <li>Request after 2 days</li>
          </ul>

          <div className="bg-[#fdfaf6] border-l-4 border-[#5c1a1f] p-5 mt-10 mb-6 rounded-r-xl">
            <h2 className="text-2xl font-bold text-[#5c1a1f] mt-0 mb-2">SECTION C: PHYSICAL PRODUCTS</h2>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">9. RETURN ELIGIBILITY</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Return within 7 days</li>
            <li>Unused and original packaging</li>
            <li>Proof (photos/videos + invoice)</li>
            <li>Missing items within 72 hours</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">10. RETURN PROCESS</h3>
          <p>Contact support with Order ID, issue details, and photos. Approved returns receive a prepaid shipping label.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Refund Method:</strong> Store Credit to Vaidik Wallet</li>
            <li><strong>Timeline:</strong> 3–5 business days after product received</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4 text-[#5c1a1f]">11. NON-RETURNABLE ITEMS</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Used or worn items</li>
            <li>Customized products</li>
            <li>Clearance/final sale</li>
            <li>Gift cards or credits</li>
          </ul>

          <h3 className="text-xl font-bold mt-10 mb-4 text-[#5c1a1f]">CONTACT & SUPPORT</h3>
          <p>For any refund or return issues:</p>
          <div className="bg-[#fcf8f2] p-6 rounded-xl border border-[#f0ddc0] mt-4">
            <p className="mb-1"><strong>Email:</strong> <a href="mailto:contact@AstroSolution.com" className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]">contact@AstroSolution.com</a></p>
            <p className="mb-1"><strong>In-App:</strong> Help & Support Section</p>
            <p className="mb-0"><strong>Phone:</strong> +919031823276</p>
          </div>

          <p className="text-sm text-gray-850 mt-10 text-center border-t border-[#e8d8c0] pt-6">
            © 2026 Astro Solution. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
