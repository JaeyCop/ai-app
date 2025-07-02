// app/contexts/AppContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  seoScore: number;
  setSeoScore: (score: number) => void;
  generatedContent: string;
  setGeneratedContent: (content: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('setup');
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoScore, setSeoScore] = useState(72);
  const [generatedContent, setGeneratedContent] = useState('');

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      isGenerating,
      setIsGenerating,
      seoScore,
      setSeoScore,
      generatedContent,
      setGeneratedContent,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;