'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, Clock, HelpCircle, Target, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Your message has been sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message.');
      }
    } catch (error) {
      toast.error('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full flex flex-col overflow-hidden text-[#2f1718]">

      {/* Hero Section */}
      <section className="relative w-full min-h-[450px] lg:min-h-[500px] flex flex-col md:flex-row md:items-center overflow-hidden pt-12 md:py-20 z-10 bg-gradient-to-br from-[#fffaf4] via-[#fcf3e6] to-[#f4dfc4]">

        {/* Desktop-only absolute background image (Fades left-to-right) */}
        <div className="absolute inset-0 z-0 hidden md:flex justify-end pointer-events-none">
          <img
            src="/spiritual-banner-light.webp"
            alt="Vaidik Astrology Contact"
            className="h-full md:w-[60%] lg:w-[50%] object-cover object-center lg:object-right mix-blend-multiply opacity-95 translate-x-8 lg:translate-x-12"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)' }}
          />
        </div>

        <div className="relative z-20 w-full px-6 md:px-10 mx-auto max-w-[1600px]">
          <div className="max-w-[650px] lg:max-w-[700px]">
            <h1 className="font-serif font-bold text-[#5c1420] text-[40px] md:text-[54px] xl:text-[58px] leading-[1.1] mb-6">
              Contact Us
            </h1>
            <p className="text-[16px] md:text-[17px] text-[#412a1e] font-medium leading-[1.6] mb-8 pr-4">
              At Vaidik Talk, we believe in guiding you through every step of your spiritual journey. Whether you want to book a personalized puja, get a Kundali report, or seek astrological guidance, our team of experienced astrologers and Vedic experts is here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact-form" className="inline-flex justify-center items-center gap-2 bg-[#8a1c2a] text-white font-semibold text-[15.5px] px-8 py-3.5 rounded-xl shadow-md hover:bg-[#721522] transition-colors">
                Contact Us
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile-only image rendered below the text in the document flow */}
        <div className="w-full relative mt-10 md:hidden flex justify-center pb-0 pointer-events-none z-0">
          <img
            src="/spiritual-banner-light.webp"
            alt="Vaidik Astrology Contact"
            className="w-full max-w-[500px] h-auto object-cover object-top mix-blend-multiply opacity-95"
            style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)' }}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 px-6 md:px-10 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Content and Form */}
          <div className="lg:col-span-8 space-y-10">

            <div className="space-y-6 text-[16px] text-[#412a1e] leading-[1.8]">
              <p>
                You can use this page to connect with us directly. Simply fill out the form with your details and our support team will get back to you at the earliest. We value your time and ensure a quick response to all inquiries.
              </p>
              <p>
                Our mission is to make authentic Vedic knowledge accessible to everyone. Whether you are seeking blessings for a new beginning, resolving life’s challenges, or simply looking for peace of mind, we are here to help.
              </p>
              <p className="font-serif font-semibold text-[#8a1c2a] text-[18px]">
                Get in touch today and let us be a part of your spiritual growth and happiness.
              </p>
            </div>

            <div className="bg-[#fff8ed] rounded-2xl p-8 md:p-10 border border-[#eedcbd] shadow-sm flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-[#f6e2c8] border-2 border-white flex items-center justify-center shrink-0 shadow-sm text-[#8a1c2a]">
                <Target size={28} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#5c1420] text-[24px] mb-3">Why Contact Vaidik Talk?</h3>
                <p className="text-[15px] text-[#5e4339] leading-[1.8]">
                  You can easily book pujas and rituals online from anywhere in the world. We also provide detailed Kundali, Vastu, Numerology, and Astrology reports tailored to your needs. Our expert astrologers are here to guide you in important areas of life such as marriage, career, finance, and health. With Vaidik Talk, you receive personalized solutions based on the wisdom of ancient Vedic knowledge.
                </p>
              </div>
            </div>

            {/* Form */}
            <div id="contact-form" className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-[#f0ddc0]/50 relative z-10 scroll-mt-32">
              <h3 className="font-serif font-bold text-[#5c1420] text-[28px] mb-8">Send Us a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#5c1420] mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#fdfaf5] border border-[#e8d1b3] rounded-xl px-4 py-3 outline-none focus:border-[#d97706] transition-colors" 
                      placeholder="Enter your name" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#5c1420] mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#fdfaf5] border border-[#e8d1b3] rounded-xl px-4 py-3 outline-none focus:border-[#d97706] transition-colors" 
                      placeholder="Enter your email" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#5c1420] mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#fdfaf5] border border-[#e8d1b3] rounded-xl px-4 py-3 outline-none focus:border-[#d97706] transition-colors" 
                    placeholder="How can we help you?" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#5c1420] mb-2">Message</label>
                  <textarea 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#fdfaf5] border border-[#e8d1b3] rounded-xl px-4 py-3 outline-none focus:border-[#d97706] transition-colors" 
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#8a1c2a] hover:bg-[#721522] disabled:opacity-70 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-md w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-8">

            {/* Image & Main Contact Box */}
            <div className="bg-[#5c1420] rounded-2xl relative overflow-hidden shadow-lg flex flex-col">

              <div className="w-full h-48 bg-[#4d131e] relative">
                <img
                  src="/hero-banner.webp"
                  alt="Contact Vaidik Talk"
                  className="w-full h-full object-cover opacity-80 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5c1420] to-transparent"></div>
              </div>

              <div className="p-8 relative z-10 -mt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-sm">
                    <MessageCircle size={24} className="text-[#f4ddbf]" />
                  </div>
                  <h3 className="font-serif font-bold text-[22px] text-white">Want to Know More?</h3>
                </div>
                <p className="text-[15px] text-[#fdfaf5] leading-relaxed mb-8 opacity-90">
                  Reach out anytime! Stay updated with special offers, new collections, and more.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="text-[#d97706] mt-1 shrink-0" size={20} />
                    <div>
                      <div className="text-[12px] font-semibold text-[#f4ddbf] uppercase tracking-wider mb-1">Email Us</div>
                      <div className="font-medium text-[15px] text-white">contact@vaidiktalk.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="text-[#d97706] mt-1 shrink-0" size={20} />
                    <div>
                      <div className="text-[12px] font-semibold text-[#f4ddbf] uppercase tracking-wider mb-1">Our Response Time</div>
                      <div className="font-medium text-[14px] leading-relaxed text-[#fdfaf5] opacity-90">
                        We aim to respond to all queries within 24 hours. If your message is urgent, you can mention it in the subject line or contact us through our social media handles for faster assistance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Stars */}
              <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mt-48" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20l2-8 2 8 8 2-8 2-2 8-2-8-8-2z' fill='%23ffffff' fill-opacity='0.5'/%3E%3Ccircle cx='70' cy='40' r='1.5' fill='%23ffffff' fill-opacity='0.7'/%3E%3Ccircle cx='110' cy='100' r='2.5' fill='%23ffffff' fill-opacity='0.5'/%3E%3Cpath d='M90 110l1.5-5 1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '140px 140px' }}></div>
            </div>

            {/* Need Immediate Support Box */}
            <div className="bg-[#fff8ed] border border-[#eedcbd] rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="text-[#d97706]" size={24} />
                <h3 className="font-serif font-bold text-[#5c1420] text-[20px]">Need Immediate Support?</h3>
              </div>
              <p className="text-[14.5px] text-[#5e4339] leading-relaxed mb-4">
                If you need urgent guidance regarding a puja, gemstone order, or consultation, you can directly email us at <strong className="text-[#8a1c2a]">contact@vaidiktalk.com</strong>.
              </p>
              <p className="font-medium text-[#5c1420] italic text-sm">
                We are always ready to help you in your spiritual journey.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-[#fffaf4] to-[#fdfaf5] py-16 md:py-24 px-6 md:px-10 border-t border-[#f0ddc0]/30">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-[#5c1420] text-[32px] md:text-[40px] mb-2">
              Frequently Asked Questions
            </h2>
            <div className="flex justify-center items-center gap-3">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d97706]/40"></div>
              <div className="w-2 h-2 rotate-45 bg-[#d97706]"></div>
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#d97706]/40 to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8d1b3] hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-[#fdf0e0] text-[#d97706] flex items-center justify-center font-bold mb-4 font-serif">1</div>
              <h4 className="font-serif font-bold text-[#8a1c2a] text-[18px] mb-3">How do I book a puja online?</h4>
              <p className="text-[#5e4339] text-[14.5px] leading-relaxed">
                Simply visit the Book a Puja section, choose your preferred ritual, enter your details, and complete the booking. A priest will contact you with further instructions.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8d1b3] hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-[#fdf0e0] text-[#d97706] flex items-center justify-center font-bold mb-4 font-serif">2</div>
              <h4 className="font-serif font-bold text-[#8a1c2a] text-[18px] mb-3">How can I get a detailed Kundali or Astrology report?</h4>
              <p className="text-[#5e4339] text-[14.5px] leading-relaxed">
                You can request a personalized report by filling out the form on our Astrology Services page. Our experts prepare each report manually based on your birth details.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8d1b3] hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-[#fdf0e0] text-[#d97706] flex items-center justify-center font-bold mb-4 font-serif">3</div>
              <h4 className="font-serif font-bold text-[#8a1c2a] text-[18px] mb-3">What payment methods do you accept?</h4>
              <p className="text-[#5e4339] text-[14.5px] leading-relaxed">
                We accept UPI, Net Banking, Debit/Credit Cards, and Wallet payments for a smooth and hassle-free experience.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8d1b3] hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-[#fdf0e0] text-[#d97706] flex items-center justify-center font-bold mb-4 font-serif">4</div>
              <h4 className="font-serif font-bold text-[#8a1c2a] text-[18px] mb-3">Can Vaidik Talk help with Vastu or Numerology?</h4>
              <p className="text-[#5e4339] text-[14.5px] leading-relaxed">
                Yes, our certified experts offer Vastu and Numerology consultations for home, business, and personal solutions.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
