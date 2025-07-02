// app/contexts/GeneratorContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface GeneratorContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  seoScore: number;
  setSeoScore: (score: number) => void;
  generatedContent: string;
  setGeneratedContent: (content: string) => void;
}

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined);

export function GeneratorProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('setup');
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoScore, setSeoScore] = useState(72);
  const [generatedContent, setGeneratedContent] = useState('');

  return (
    <GeneratorContext.Provider value={{
      activeTab, setActiveTab,
      isGenerating, setIsGenerating,
      seoScore, setSeoScore,
      generatedContent, setGeneratedContent,
    }}>
      {children}
    </GeneratorContext.Provider>
  );
}

export function useGenerator() {
  const context = useContext(GeneratorContext);
  if (context === undefined) {
    throw new Error('useGenerator must be used within a GeneratorProvider');
  }
  return context;
}

export default GeneratorContext;