
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, PortfolioItem, Inquiry, SiteConfig } from './types';
import { INITIAL_STATE } from './constants';

interface AppContextType {
  state: AppState;
  updateConfig: (config: Partial<SiteConfig>) => void;
  addPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  removePortfolio: (id: string) => void;
  addInquiry: (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  markInquiryRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, ...newConfig }
    }));
  };

  const addPortfolio = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = { ...item, id: Date.now().toString() };
    setState(prev => ({ ...prev, portfolios: [newItem, ...prev.portfolios] }));
  };

  const removePortfolio = (id: string) => {
    setState(prev => ({ ...prev, portfolios: prev.portfolios.filter(p => p.id !== id) }));
  };

  const addInquiry = (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInq: Inquiry = {
      ...inq,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setState(prev => ({ ...prev, inquiries: [newInq, ...prev.inquiries] }));
  };

  const markInquiryRead = (id: string) => {
    setState(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(i => i.id === id ? { ...i, status: 'read' as const } : i)
    }));
  };

  return (
    <AppContext.Provider value={{ state, updateConfig, addPortfolio, removePortfolio, addInquiry, markInquiryRead }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
