"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HistoryEntry } from "@/app/types";
import { FaChartLine, FaKeyboard, FaCalendarAlt, FaClock, FaFileAlt, FaTags, FaTrophy, FaRocket } from "react-icons/fa";
import StatCard from "@/components/dashboard/StatCard";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DetailedStatCard from "@/components/dashboard/DetailedStatCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function DashboardPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    totalGenerations,
    totalWords,
    avgWords,
    lastGeneratedDate,
    mostUsedKeyword,
    mostProductiveDay,
    thisWeekGenerated,
    uniqueKeywords,
  } = useDashboardStats(history);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const stored: HistoryEntry[] = JSON.parse(localStorage.getItem("generatedContentHistory") || "[]");
      setHistory(stored);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
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
    return <DashboardSkeleton />;
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
            value={lastGeneratedDate ? new Date(lastGeneratedDate).toLocaleDateString() : "Never"} 
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
              {history.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-ai-black bg-opacity-50 rounded-lg border border-ai-border hover:border-ai-green transition-colors">
                  <div className="flex-1">
                    <div className="font-medium text-white truncate">{entry.keyword || "Content Generated"}</div>
                    <div className="text-sm text-ai-gray">{entry.wordCount || 0} words</div>
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
              <Link href="/generate" className="bg-gradient-to-r from-ai-green to-ai-blue text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-ai-green/20 transition-all duration-200">
                Start Generating
              </Link>
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