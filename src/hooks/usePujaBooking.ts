import { useState } from 'react';

export const usePujaBooking = (pujaDetails: { title: string; slug: string; amount: number; onSuccess?: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    gotra: '',
    phone: '',
    email: '',
    location: '',
    date: '',
    message: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent, customData?: any) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const dataToSubmit = customData || formData;
    
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setIsProcessing(false);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const orderResponse = await fetch(`${apiUrl}/puja-bookings/create-order`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          pujaName: pujaDetails.title,
          pujaSlug: pujaDetails.slug,
          customerName: dataToSubmit.name,
          gotra: dataToSubmit.gotra || '',
          phone: dataToSubmit.phone,
          email: dataToSubmit.email,
          location: dataToSubmit.location,
          preferredDate: dataToSubmit.date,
          message: dataToSubmit.message || '',
          amount: pujaDetails.amount
        })
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
        name: 'Astro Solution',
        description: `Booking for ${pujaDetails.title}`,
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${apiUrl}/puja-bookings/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              setFormData({ name: '', gotra: '', phone: '', email: '', location: '', date: '', message: '' });
              if (pujaDetails.onSuccess) {
                pujaDetails.onSuccess();
              } else {
                alert('Payment successful! Your booking is confirmed.');
              }
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            alert('Error verifying payment. Please contact support if money was deducted.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: dataToSubmit.name,
          email: dataToSubmit.email,
          contact: dataToSubmit.phone
        },
        theme: {
          color: '#d4af37'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert(response.error.description);
        setIsProcessing(false);
      });
      rzp1.open();

    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    isProcessing
  };
};
