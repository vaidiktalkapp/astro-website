'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, FileText, Loader2, Download } from 'lucide-react';
import Link from 'next/link';

export default function SmartKundaliSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [isGenerating, setIsGenerating] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError('Booking ID is missing. Please contact support.');
      setIsGenerating(false);
      return;
    }

    const generatePdf = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

        // Timeout is long because PDF generation from AstrologyAPI takes 30-60 seconds
        const res = await fetch(`${apiUrl}/report-bookings/${bookingId}/generate-pdf`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setPdfUrl(data.pdfUrl);
        } else {
          setError(data.message || 'Something went wrong while generating the PDF.');
        }
      } catch (err) {
        setError('Failed to generate PDF. Please contact support.');
      } finally {
        setIsGenerating(false);
      }
    };

    generatePdf();
  }, [bookingId]);

  return (
    <div className="min-h-[70vh] bg-[#fdfaf6] flex flex-col items-center justify-start p-4 pt-16">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg border border-[#ebdcc7] p-8 text-center relative overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#f4ece3] rounded-full flex items-center justify-center mb-6 relative">
              <Loader2 className="w-10 h-10 text-[#d68636] animate-spin absolute" />
              <FileText className="w-5 h-5 text-[#5c1a1f]" />
            </div>
            <h2 className="text-[24px] font-bold text-[#5c1a1f] mb-3">Generating Your Kundali</h2>
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
              <p className="text-[12px] text-[#3a1216]/80 leading-relaxed">Don't worry, your payment has been successfully recorded. If your Kundali cannot be generated due to technical reasons, please contact us at<strong> contact@vaidiktalk.com</strong> and a full refund will be initiated to your original payment method.</p>
            </div>

            <Link
              href="/"
              className="flex items-center justify-center bg-[#f4ece3] text-[#5c1a1f] px-8 py-3.5 rounded-xl font-bold hover:bg-[#ebdcc7] transition-all w-full"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-[24px] font-bold text-[#5c1a1f] mb-3">Kundali Ready!</h2>
            <p className="text-[15px] text-[#3a1216]/80 leading-relaxed font-medium mb-8">
              Your Premium Vaidik Smart Kundali has been successfully generated.
            </p>

            <div className="flex flex-col gap-3 w-full">
              {pdfUrl && (
                <a
                  href={`/api/download?url=${encodeURIComponent(pdfUrl)}`}
                  className="flex items-center justify-center gap-2 bg-[#d68636] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#b06126] transition-all shadow-[0_4px_14px_rgba(214,134,54,0.3)] w-full"
                >
                  <Download className="w-5 h-5" />
                  Download Your Kundali
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
  );
}
