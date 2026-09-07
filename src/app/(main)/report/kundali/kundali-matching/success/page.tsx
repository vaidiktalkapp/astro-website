'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, FileText, Loader2, Download } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [isGenerating, setIsGenerating] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    fetch(`${apiUrl}/smart-kundali-settings/kundali-matching`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!bookingId) {
      setError('Booking ID is missing. Please contact support.');
      setIsGenerating(false);
      return;
    }

    const generatePdf = async () => {
      let shouldStopLoading = true;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

        const res = await fetch(`${apiUrl}/report-bookings/${bookingId}/generate-pdf`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          if (data.status === 'generating') {
            shouldStopLoading = false;
            setTimeout(generatePdf, 5000);
            return;
          }
          setPdfUrl(data.pdfUrl);
        } else {
          setError(data.message || 'Something went wrong while generating the PDF.');
        }
      } catch (err) {
        setError('Failed to generate PDF. Please contact support.');
      } finally {
        if (shouldStopLoading) {
          setIsGenerating(false);
        }
      }
    };

    generatePdf();
  }, [bookingId]);

  return (
    <div className="bg-[#fdfaf6] flex justify-center p-4 py-8 md:py-12 min-h-screen">
      <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-sm border border-[#ebdcc7]/60 overflow-hidden self-start">
        
        {/* Left Side: Promo Image (Visible on Mobile) */}
        <div className="flex bg-[#f4ece3] justify-center relative">
          <img 
            src={settings?.mockups?.pdf || "/images/kundali-matching.webp"} 
            alt={settings?.productHeading || "Premium Kundali Matching"} 
            className="w-full h-auto max-h-[250px] md:max-h-[550px] object-contain mix-blend-multiply scale-110 mt-4 md:mt-0"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x550/fdfaf6/5c1a1f?text=Report' }}
          />
        </div>

        {/* Right Side: Status/Download Area */}
        <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center relative w-full h-full min-h-[400px]">
          {isGenerating ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#f4ece3] rounded-full flex items-center justify-center mb-6 relative">
                <Loader2 className="w-10 h-10 text-[#d68636] animate-spin absolute" />
                <FileText className="w-5 h-5 text-[#5c1a1f]" />
              </div>
              <h2 className="text-[24px] font-bold text-[#5c1a1f] mb-3">Generating Your {settings?.productHeading || "Kundali Matching Report"}</h2>
              <p className="text-[15px] text-[#3a1216]/80 leading-relaxed font-medium mb-2">
                Please wait while we consult the stars.
              </p>
              <div className="bg-[#fdfaf6] border border-[#ebdcc7] rounded-lg p-3 w-full mt-4">
                <p className="text-[13px] text-[#b06126] font-bold">
                  ⚠️ This process can take 15 to 30 seconds. Please do not close or refresh this page.
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-[32px]">⚠️</span>
              </div>
              <h2 className="text-[24px] font-bold text-red-600 mb-3">Generation Failed</h2>
              <p className="text-[15px] text-[#3a1216]/80 leading-relaxed font-medium mb-4">
                {error}
              </p>
              <div className="bg-[#fcf8f2] border border-[#ebdcc7] p-4 rounded-lg mb-6 w-full text-left">
                <p className="text-[13px] text-[#5c1a1f] font-semibold mb-1">✅ If Payment Successful</p>
                <p className="text-[12px] text-[#3a1216]/80 leading-relaxed">Don't worry, your payment has been successfully recorded. If your {settings?.productHeading || "Kundali Matching Report"} cannot be generated due to technical reasons, please contact us at<strong> contact@vaidiktalk.com</strong> and a full refund will be initiated to your original payment method.</p>
              </div>

              <Link
                href="/"
                className="flex items-center justify-center bg-[#f4ece3] text-[#5c1a1f] px-8 py-3.5 rounded-xl font-bold hover:bg-[#ebdcc7] transition-all w-full"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-[24px] font-bold text-[#5c1a1f] mb-3">{settings?.productHeading ? settings.productHeading + " Ready!" : "Kundali Matching Ready!"}</h2>
              <p className="text-[15px] text-[#3a1216]/80 leading-relaxed font-medium mb-8">
                Your {settings?.productHeading || "Premium Kundali Matching Report"} has been successfully generated.
              </p>

              <div className="flex flex-col gap-3 w-full max-w-[300px]">
                {pdfUrl && (
                  <a
                    href={`/api/download?url=${encodeURIComponent(pdfUrl)}`}
                    className="flex items-center justify-center gap-2 bg-[#d68636] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#b06126] transition-all shadow-[0_4px_14px_rgba(214,134,54,0.3)] w-full"
                  >
                    <Download className="w-5 h-5" />
                    Download Your Report
                  </a>
                )}

                <Link
                  href="/"
                  className="flex items-center justify-center bg-[#f4ece3] text-[#5c1a1f] px-8 py-3.5 rounded-xl font-bold hover:bg-[#ebdcc7] transition-all w-full"
                >
                  Back to Home
                </Link>
              </div>
              <p className="text-[12px] text-gray-500 mt-6">
                A copy of this report has also been saved to your account.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SmartKundaliSuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin text-[#d68636]" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
