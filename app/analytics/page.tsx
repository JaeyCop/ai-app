"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function AnalyticsPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [totalGenerations, setTotalGenerations] = useState(0);
  const [mostUsedKeyword, setMostUsedKeyword] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);
  const [generationsPerDay, setGenerationsPerDay] = useState<{ [date: string]: number }>({});
  const [avgWords, setAvgWords] = useState(0);
  const [uniqueKeywords, setUniqueKeywords] = useState(0);
  const [mostProductiveDay, setMostProductiveDay] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("generatedContentHistory") || "[]");
    setHistory(stored);
    setTotalGenerations(stored.length);
    if (stored.length > 0) {
      setLastGenerated(new Date(stored[0].date).toLocaleString());
      // Calculate total words
      const totalWords = stored.reduce((sum: number, entry: any) => sum + (entry.content?.split(/\s+/).length || 0), 0);
      setTotalWords(totalWords);
      setAvgWords(Math.round(totalWords / stored.length));
      // Find most used keyword
      const keywordCounts: Record<string, number> = {};
      stored.forEach((entry: any) => {
        if (entry.keyword) keywordCounts[entry.keyword] = (keywordCounts[entry.keyword] || 0) + 1;
      });
      const sorted = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
      setMostUsedKeyword(sorted[0]?.[0] || null);
      setUniqueKeywords(Object.keys(keywordCounts).length);
      // Generations per day
      const perDay: { [date: string]: number } = {};
      stored.forEach((entry: any) => {
        const day = new Date(entry.date).toLocaleDateString();
        perDay[day] = (perDay[day] || 0) + 1;
      });
      setGenerationsPerDay(perDay);
      // Most productive day
      const sortedDays = Object.entries(perDay).sort((a, b) => b[1] - a[1]);
      setMostProductiveDay(sortedDays[0]?.[0] || null);
    }
  }, []);

  // Simple bar chart for generations per day
  const barChart = useMemo(() => {
    const days = Object.keys(generationsPerDay);
    if (days.length === 0) return null;
    const max = Math.max(...Object.values(generationsPerDay));
    return (
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-ai-green mb-2">Generations Per Day</h2>
        <div className="space-y-2">
          {days.map((day) => (
            <div key={day} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-24">{day}</span>
              <div className="bg-ai-orange h-3 rounded" style={{ width: `${(generationsPerDay[day] / max) * 200}px` }}></div>
              <span className="text-xs text-gray-300">{generationsPerDay[day]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, [generationsPerDay]);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-ai-black via-gray-900 to-ai-black">
      <h1 className="text-3xl font-bold mb-6 text-ai-green">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-ai-black border border-ai-green rounded-lg p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-ai-orange mb-2">{totalGenerations}</span>
          <span className="text-gray-300">Total Generations</span>
        </div>
        <div className="bg-ai-black border border-ai-green rounded-lg p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-ai-orange mb-2">{totalWords}</span>
          <span className="text-gray-300">Total Words Generated</span>
        </div>
        <div className="bg-ai-black border border-ai-green rounded-lg p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-ai-orange mb-2">{mostUsedKeyword || "-"}</span>
          <span className="text-gray-300">Most Used Keyword</span>
        </div>
        <div className="bg-ai-black border border-ai-green rounded-lg p-6 flex flex-col items-center">
          <span className="text-lg font-bold text-ai-orange mb-2">{lastGenerated || "-"}</span>
          <span className="text-gray-300">Last Generation</span>
        </div>
        <div className="bg-ai-black border border-ai-green rounded-lg p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-ai-orange mb-2">{avgWords}</span>
          <span className="text-gray-300">Average Words per Generation</span>
        </div>
        <div className="bg-ai-black border border-ai-green rounded-lg p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-ai-orange mb-2">{uniqueKeywords}</span>
          <span className="text-gray-300">Unique Keywords Used</span>
        </div>
        <div className="bg-ai-black border border-ai-green rounded-lg p-6 flex flex-col items-center">
          <span className="text-lg font-bold text-ai-orange mb-2">{mostProductiveDay || '-'}</span>
          <span className="text-gray-300">Most Productive Day</span>
        </div>
      </div>
      {barChart}
    </div>
  );
}
