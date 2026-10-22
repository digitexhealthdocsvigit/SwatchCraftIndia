import { useState } from 'react';

export interface RFQData {
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  productType: string;
  quantity: string;
  exportMarket?: string;
  specifications?: string;
  attachments?: Array<{ name: string; type: string; sizeFormatted: string }>;
}

export const useRFQ = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRFQ = async (data: RFQData) => {
    setLoading(true);
    setError(null);

    try {
      // TRACKING: Log conversion for GA4
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Engagement',
          event_label: data.productType,
          value: parseInt(data.quantity) || 100,
          export_market: data.exportMarket || 'International'
        });
      }

      // Simulated Backend Delay & Lead Storage
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('B2B Lead Captured Successfully with Attachments:', data);
      setSuccess(true);
    } catch (err) {
      setError('Connection timeout. Please contact us via WhatsApp: +91 90049 62871');
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
