import { useMemo } from 'react';
import { HistoryEntry } from '@/app/types';

export interface DashboardStats {
  totalWords: number;
  totalGenerations: number;
  mostUsedKeyword: string | null;
  lastGeneratedDate: string | null;
  avgWords: number;
  uniqueKeywords: number;
  mostProductiveDay: string | null;
  thisWeekGenerated: number;
}

export const useDashboardStats = (history: HistoryEntry[]): DashboardStats => {
  return useMemo(() => {
    if (history.length === 0) {
      return {
        totalWords: 0,
        totalGenerations: 0,
        mostUsedKeyword: null,
        lastGeneratedDate: null,
        avgWords: 0,
        uniqueKeywords: 0,
        mostProductiveDay: null,
        thisWeekGenerated: 0,
      };
    }

    const totalGenerations = history.length;
    const lastGeneratedDate = history[0].date;

    const totalWords = history.reduce((sum, entry) => sum + (entry.wordCount || 0), 0);
    const avgWords = totalGenerations > 0 ? Math.round(totalWords / totalGenerations) : 0;

    const keywordCounts: Record<string, number> = {};
    history.forEach((entry) => {
      if (entry.keyword) keywordCounts[entry.keyword] = (keywordCounts[entry.keyword] || 0) + 1;
    });
    const sortedKeywords = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
    const mostUsedKeyword = sortedKeywords[0]?.[0] || null;
    const uniqueKeywords = Object.keys(keywordCounts).length;

    const perDay: { [date: string]: number } = {};
    history.forEach((entry) => {
      const day = new Date(entry.date).toLocaleDateString();
      perDay[day] = (perDay[day] || 0) + 1;
    });
    const sortedDays = Object.entries(perDay).sort((a, b) => b[1] - a[1]);
    const mostProductiveDay = sortedDays[0]?.[0] || null;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekGenerated = history.filter((entry) => new Date(entry.date) >= oneWeekAgo).length;

    return {
      totalGenerations, lastGeneratedDate, totalWords, avgWords,
      mostUsedKeyword, uniqueKeywords, mostProductiveDay, thisWeekGenerated,
    };
  }, [history]);
};