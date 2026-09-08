import { useState } from 'react';
import { apiClient } from '../lib/api';

export interface ReportFormData {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  country: string;
  state: string;
  language: string;
  chartStyle: string;
  email: string;
  phone: string;
  partnerDetails?: any;
}

const initialFormData: ReportFormData = {
  name: '',
  gender: '',
  dob: '',
  tob: '',
  pob: '',
  country: '',
  state: '',
  language: 'en',
  chartStyle: 'NORTH_INDIAN',
  email: '',
  phone: '',
};

export const useReportBooking = (reportDetails: {
  name: string;
  slug: string;
  amount: number;
  onSuccess?: (bookingId: string) => void;
}) => {
  const [formData, setFormData] = useState<ReportFormData>(initialFormData);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e?: React.FormEvent, overrideData?: Partial<ReportFormData>) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        setIsProcessing(false);
        return;
      }

      const finalData = { ...formData, ...overrideData };

      const orderResponse = await apiClient.post('/report-bookings/create-order', {
        reportName: reportDetails.name,
        reportSlug: reportDetails.slug,
        customerName: finalData.name,
        gender: finalData.gender,
        dob: finalData.dob,
        tob: finalData.tob,
        pob: finalData.pob,
        country: finalData.country || '',
        state: finalData.state || '',
        language: finalData.language || 'English',
        chartStyle: finalData.chartStyle || 'NORTH_INDIAN',
        phone: finalData.phone,
        email: finalData.email,
        amount: reportDetails.amount,
        partnerDetails: finalData.partnerDetails,
      });

      const orderData = orderResponse.data;

      if (!orderData.success) {
        alert(orderData.message || 'Failed to create order. Please try again.');
        setIsProcessing(false);
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Astro Solution',
        description: `Order for ${reportDetails.name}`,
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await apiClient.post('/report-bookings/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            const verifyData = verifyRes.data;
            if (verifyData.success) {
              setFormData(initialFormData);
              if (reportDetails.onSuccess) {
                reportDetails.onSuccess(verifyData.bookingId || orderData.bookingId);
              } else {
                window.location.href = '/';
              }
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch {
            alert('Error verifying payment. Please contact support if money was deducted.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: finalData.name,
          email: finalData.email,
          contact: finalData.phone,
        },
        theme: { color: '#761e27' },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        alert(response.error.description);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return { formData, setFormData, handleChange, handleSubmit, isProcessing };
};
