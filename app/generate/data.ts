import { Settings, Search, Wand2, Target, Eye, LucideIcon } from 'lucide-react';

// It's good practice to define types for our data structures.
export interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Competitor {
  url: string;
  score: number;
  words: number;
  keywords: number;
  backlinks: number;
}

export interface SeoMetric {
  label: string;
  score: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
}

export const initialKeywords: string[] = [
  'digital marketing', 
  'SEO strategy', 
  'content optimization'
];

export const tabs: Tab[] = [
  { id: 'setup', label: 'Setup', icon: Settings },
  { id: 'research', label: 'Research', icon: Search },
  { id: 'generate', label: 'Generate', icon: Wand2 },
  { id: 'optimize', label: 'Optimize', icon: Target },
  { id: 'preview', label: 'Preview', icon: Eye }
];

export const competitorData: Competitor[] = [
  { url: 'competitor1.com', score: 85, words: 2100, keywords: 15, backlinks: 45 },
  { url: 'competitor2.com', score: 78, words: 1800, keywords: 12, backlinks: 32 },
  { url: 'competitor3.com', score: 82, words: 2300, keywords: 18, backlinks: 58 }
];

export const seoMetrics: SeoMetric[] = [
  { label: 'Keyword Density', score: 85, status: 'good' },
  { label: 'Readability', score: 78, status: 'good' },
  { label: 'Content Length', score: 65, status: 'warning' },
  { label: 'Semantic Keywords', score: 92, status: 'excellent' },
  { label: 'Content Structure', score: 88, status: 'excellent' },
  { label: 'Internal Links', score: 45, status: 'poor' }
];