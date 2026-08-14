import { useState } from 'react';

export interface ReportFormData {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  country: string;
  state: string;
  language: string;
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
  language: '',
  email: '',
  phone: '',
};

export const useReportBooking = (reportDetails: {
  name: string;
  slug: string;
  amount: number;
  onSuccess?: () => void;
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

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

      const finalData = { ...formData, ...overrideData };

      const orderResponse = await fetch(`${apiUrl}/report-bookings/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          phone: finalData.phone,
          email: finalData.email,
          amount: reportDetails.amount,
          partnerDetails: finalData.partnerDetails,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert(orderData.message || 'Failed to create order. Please try again.');
        setIsProcessing(false);
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Vaidik Talk',
        description: `Order for ${reportDetails.name}`,
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${apiUrl}/report-bookings/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert(`Payment successful! Your ${reportDetails.name} order is confirmed. You will receive your report shortly.`);
              setFormData(initialFormData);
              if (reportDetails.onSuccess) {
                reportDetails.onSuccess();
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
