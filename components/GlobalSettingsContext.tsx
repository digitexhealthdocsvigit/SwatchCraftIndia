import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'INR' | 'USD' | 'EUR' | 'AED';
export type Language = 'EN' | 'IT' | 'FR' | 'AR';

interface GlobalSettings {
  currency: Currency;
  language: Language;
  setCurrency: (c: Currency) => void;
  setLanguage: (l: Language) => void;
  formatPrice: (inrAmount: number) => string;
}

const GlobalSettingsContext = createContext<GlobalSettings | undefined>(undefined);

export const GlobalSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [language, setLanguage] = useState<Language>('EN');

  const rates = { INR: 1, USD: 0.012, EUR: 0.011, AED: 0.044 };
  const symbols = { INR: '₹', USD: '$', EUR: '€', AED: 'د.إ' };

  const formatPrice = (inrAmount: number) => {
    const converted = inrAmount * rates[currency];
    const symbol = symbols[currency];
    return currency === 'AED' 
      ? `${converted.toFixed(2)} ${symbol}` 
      : `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  return (
    <GlobalSettingsContext.Provider value={{ currency, language, setCurrency, setLanguage, formatPrice }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);
  if (!context) throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
  return context;
};