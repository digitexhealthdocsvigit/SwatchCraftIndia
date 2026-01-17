import { useState } from 'react';

export interface RFQData {
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  productType: string;
  quantity: string;
  message?: string;
}

export const useRFQ = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRFQ = async (data: RFQData) => {
    setLoading(true);
    setError(null);

    try {
      // PRO TIP: Replace this block with your actual EmailJS or Vercel API endpoint
      // const response = await fetch('/api/send-rfq', { method: 'POST', body: JSON.stringify(data) });
      
      // Simulated Backend Delay
      await new Promise((resolve) => setTimeout(resolve, 1800));

      console.log('B2B Lead Captured:', data);
      setSuccess(true);
    } catch (err) {
      setError('Connection timeout. Please contact us via WhatsApp: 9004962871');
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setSuccess(false);
    setError(null);
  };

  return { submitRFQ, loading, success, error, resetStatus };
};