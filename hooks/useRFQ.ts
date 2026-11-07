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

export interface StoredRFQRecord extends RFQData {
  id: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Quoted';
}

export const RFQ_STORAGE_KEY = 'samplinghub_rfq_submissions';

export const getStoredRFQs = (): StoredRFQRecord[] => {
  try {
    const raw = localStorage.getItem(RFQ_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveRFQLocally = (data: RFQData): StoredRFQRecord => {
  const record: StoredRFQRecord = {
    ...data,
    id: `RFQ-${Math.floor(1000 + Math.random() * 9000)}`,
    submittedAt: new Date().toISOString(),
    status: 'New',
  };
  try {
    const existing = getStoredRFQs();
    localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify([record, ...existing].slice(0, 100)));
  } catch {
    // Ignore storage quota errors in private browsing
  }
  return record;
};

export const useRFQ = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRFQ = async (data: RFQData) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Track conversion in GA4
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Engagement',
          event_label: data.productType,
          value: parseInt(data.quantity, 10) || 100,
          export_market: data.exportMarket || 'International',
        });
      }

      // 2. Persist locally so no inquiry is ever lost
      const record = saveRFQLocally(data);

      // 3. Dispatch email notification via FormSubmit AJAX endpoint to factory inbox
      const attachmentSummary =
        data.attachments && data.attachments.length > 0
          ? data.attachments.map((a) => `${a.name} (${a.type}, ${a.sizeFormatted})`).join(', ')
          : 'None';

      try {
        await fetch('https://formsubmit.co/ajax/digitex.studio@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `[SamplingHub RFQ ${record.id}] ${data.companyName} — ${data.productType} (${data.quantity})`,
            reference_id: record.id,
            full_name: data.fullName,
            company_name: data.companyName,
            email: data.email,
            phone_whatsapp: data.phone || 'Not provided',
            product_line: data.productType,
            quantity: data.quantity,
            destination_market: data.exportMarket || 'Not specified',
            specifications: data.specifications || 'Standard export specifications',
            attached_media_files: attachmentSummary,
            factory_location: 'Thane Bhiwandi, PIN: 421302, Maharashtra, India',
          }),
        });
      } catch {
        // Network or CORS fallback: local record + WhatsApp handoff remain intact
      }

      setSuccess(true);
    } catch {
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
