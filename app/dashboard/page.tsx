"use client";

import React, { useEffect, useState } from "react";
import { FaChartLine, FaKeyboard, FaCalendarAlt, FaClock, FaFileAlt, FaTags, FaTrophy, FaRocket } from "react-icons/fa";

export default function DashboardPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [totalGenerations, setTotalGenerations] = useState(0);
  const [mostUsedKeyword, setMostUsedKeyword] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);
  const [avgWords, setAvgWords] = useState(0);
  const [uniqueKeywords, setUniqueKeywords] = useState(0);
  const [mostProductiveDay, setMostProductiveDay] = useState<string | null>(null);
  const [thisWeekGenerated, setThisWeekGenerated] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
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
        
        // Most productive day
        const perDay: { [date: string]: number } = {};
        stored.forEach((entry: any) => {
          const day = new Date(entry.date).toLocaleDateString();
          perDay[day] = (perDay[day] || 0) + 1;
        });
        const sortedDays = Object.entries(perDay).sort((a, b) => b[1] - a[1]);
        setMostProductiveDay(sortedDays[0]?.[0] || null);
        
        // This week's generations
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const thisWeek = stored.filter((entry: any) => new Date(entry.date) >= oneWeekAgo);
        setThisWeekGenerated(thisWeek.length);
      }
      
      setIsLoading(false);
    }, 800);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getMotivationalMessage = () => {
    if (totalGenerations === 0) return "Ready to create your first AI-generated content?";
    if (totalGenerations < 5) return "You're just getting started! Keep creating!";
    if (totalGenerations < 20) return "Great progress! You're building momentum!";
    return "You're a content creation powerhouse!";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ai-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ai-green mx-auto mb-4"></div>
          <p className="text-ai-gray">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ai-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-ai-green to-ai-blue bg-clip-text text-transparent mb-2">
                {getGreeting()}!
              </h1>
              <p className="text-ai-gray text-lg">{getMotivationalMessage()}</p>
            </div>
            <div className="bg-ai-surface border border-ai-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-ai-gold">{thisWeekGenerated}</div>
              <div className="text-sm text-ai-gray">This Week</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Total Generations" 
            value={totalGenerations} 
            icon={FaRocket}
            color="ai-green"
            trend={totalGenerations > 0 ? "up" : null}
          />
          <StatCard 
            label="Total Words" 
            value={totalWords.toLocaleString()} 
            icon={FaFileAlt}
            color="ai-blue"
            trend={totalWords > 1000 ? "up" : null}
          />
          <StatCard 
            label="Avg. Words/Generation" 
            value={avgWords} 
            icon={FaChartLine}
            color="ai-orange"
          />
          <StatCard 
            label="Unique Keywords" 
            value={uniqueKeywords} 
            icon={FaTags}
            color="ai-gold"
          />
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DetailedStatCard 
            label="Most Used Keyword" 
            value={mostUsedKeyword || "No keywords yet"} 
            icon={FaKeyboard}
            description="Your go-to keyword for content generation"
          />
          <DetailedStatCard 
            label="Most Productive Day" 
            value={mostProductiveDay || "Start creating content!"} 
            icon={FaTrophy}
            description="The day you generated the most content"
          />
          <DetailedStatCard 
            label="Last Generated" 
            value={lastGenerated ? new Date(lastGenerated).toLocaleDateString() : "Never"} 
            icon={FaClock}
            description="When you last created content"
          />
        </div>

        {/* Recent Activity */}
        {history.length > 0 && (
          <div className="bg-ai-surface border border-ai-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <FaCalendarAlt className="mr-3 text-ai-green" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {history.slice(0, 5).map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-ai-black bg-opacity-50 rounded-lg border border-ai-border hover:border-ai-green transition-colors">
                  <div className="flex-1">
                    <div className="font-medium text-white truncate">{entry.keyword || "Content Generated"}</div>
                    <div className="text-sm text-ai-gray">{entry.content?.split(' ').length || 0} words</div>
                  </div>
                  <div className="text-sm text-ai-gray ml-4">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {totalGenerations === 0 && (
          <div className="text-center py-12">
            <div className="bg-ai-surface border border-ai-border rounded-xl p-8 max-w-md mx-auto">
              <FaRocket className="h-16 w-16 text-ai-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Ready to Get Started?</h3>
              <p className="text-ai-gray mb-6">Create your first AI-generated content to see analytics here!</p>
              <button className="bg-gradient-to-r from-ai-green to-ai-blue text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-ai-green/20 transition-all duration-200">
                Start Generating
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-ai-surface border border-ai-border rounded-full">
            <div className="h-2 w-2 bg-ai-green rounded-full mr-2 animate-pulse"></div>
            <span className="text-ai-gray text-sm">Analytics are stored locally. Cloud sync coming soon!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, trend }: { 
  label: string; 
  value: string | number; 
  icon: any;
  color: string;
  trend?: "up" | "down" | null;
}) {
  const getColorClasses = (color: string) => {
    switch(color) {
      case 'ai-green': return 'text-ai-green border-ai-green/20 bg-ai-green/5';
      case 'ai-blue': return 'text-ai-blue border-ai-blue/20 bg-ai-blue/5';
      case 'ai-orange': return 'text-ai-orange border-ai-orange/20 bg-ai-orange/5';
      case 'ai-gold': return 'text-ai-gold border-ai-gold/20 bg-ai-gold/5';
      default: return 'text-ai-green border-ai-green/20 bg-ai-green/5';
    }
  };

  return (
    <div className="bg-ai-surface border border-ai-border rounded-xl p-6 hover:border-ai-green/50 transition-all duration-200 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend === 'up' ? 'text-ai-green' : 'text-ai-red'}`}>
            {trend === 'up' ? '↗' : '↘'}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1 group-hover:text-ai-green transition-colors">
        {value}
      </div>
      <div className="text-ai-gray text-sm">{label}</div>
    </div>
  );
}

function DetailedStatCard({ label, value, icon: Icon, description }: { 
  label: string; 
  value: string; 
  icon: any;
  description: string;
}) {
  return (
    <div className="bg-ai-surface border border-ai-border rounded-xl p-6 hover:border-ai-green/50 transition-all duration-200">
      <div className="flex items-center mb-3">
        <Icon className="h-5 w-5 text-ai-green mr-3" />
        <h3 className="font-semibold text-white">{label}</h3>
      </div>
      <div className="text-2xl font-bold text-ai-orange mb-2 truncate">{value}</div>
      <p className="text-sm text-ai-gray">{description}</p>
    </div>
  );
}