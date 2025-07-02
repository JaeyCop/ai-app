'use client';

import React, { useState, useEffect } from 'react';
import { Search, Target, Zap, Eye, TrendingUp, Users, Globe, Lightbulb, CheckCircle, AlertCircle, Wand2, RefreshCw, Copy, Download, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GeneratorProvider, useGenerator } from '@/context/GeneratorContext';
import { useToast } from '@/context/ToastContext';
import { tabs, competitorData, seoMetrics, initialKeywords, Tab, SeoMetric } from './data';

const SEOContentGeneratorInternal = () => {
  const {
    activeTab, setActiveTab,
    seoScore, setSeoScore,
    isGenerating, setIsGenerating,
    generatedContent, setGeneratedContent
  } = useGenerator();

  const [isProUser, setIsProUser] = useState(false);
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [keywords, setKeywords] = useState(initialKeywords);
  const [formData, setFormData] = useState({
    primaryKeyword: 'digital marketing strategy',
    contentType: 'blog-post',
    targetAudience: 'marketing-professionals',
    tone: 'professional',
    wordCount: '1500-2000',
    language: 'en',
    industry: 'marketing'
  });

  useEffect(() => {
    // Check for successful payment on component mount
    if (searchParams.get('payment') === 'success') {
      localStorage.setItem('isProUser', 'true');
      addToast('Upgrade successful! Welcome to the Pro plan.', 'success');
      setIsProUser(true);
      // Clean the URL
      window.history.replaceState(null, '', '/generate');
    }

    // Check user plan from storage
    const checkUserPlan = () => {
        const proStatus = localStorage.getItem('isProUser');
        setIsProUser(proStatus === 'true');
    };
    checkUserPlan();
  }, [searchParams, addToast]);

  const generateContent = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`# The Ultimate Digital Marketing Strategy Guide for 2025

## Introduction

In today's competitive digital landscape, developing a comprehensive digital marketing strategy is crucial for business success. This guide will walk you through the essential components of creating a winning strategy that drives results.

## Understanding Your Target Audience

Before diving into tactics, it's essential to understand who you're trying to reach. Your target audience forms the foundation of every marketing decision you'll make.

### Key Audience Research Methods:
- Demographic analysis
- Behavioral tracking
- Survey data collection
- Social media insights

## Core Digital Marketing Channels

### 1. Search Engine Optimization (SEO)
SEO remains one of the most cost-effective digital marketing strategies. Focus on:
- Keyword research and optimization
- Technical SEO improvements
- Content quality and relevance
- Link building strategies

### 2. Content Marketing
Quality content drives engagement and builds trust with your audience:
- Blog posts and articles
- Video content
- Infographics and visual content
- Email newsletters

### 3. Social Media Marketing
Leverage social platforms to connect with your audience:
- Platform-specific strategies
- Community building
- Influencer partnerships
- Paid social advertising

## Measuring Success

Track these key metrics to measure your digital marketing success:
- Website traffic and conversions
- Social media engagement
- Email open and click rates
- ROI and customer acquisition cost

## Conclusion

A successful digital marketing strategy requires careful planning, consistent execution, and continuous optimization. Start with a solid foundation and build upon it as you learn what works best for your audience.`);
      setIsGenerating(false);
      setSeoScore(Math.floor(Math.random() * 20) + 75);
    }, 3000);
  };

  const TabButton = ({ tab, isActive, onClick }: { tab: Tab; isActive: boolean; onClick: () => void; }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={onClick}
        className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all w-full text-left ${
          isActive 
            ? 'bg-ai-green text-ai-black shadow-lg shadow-ai-green/20' 
            : 'text-ai-gray hover:bg-ai-surface hover:text-white'
        }`}
      >
        <Icon size={20} className="flex-shrink-0" />
        <span>{tab.label}</span>
      </button>
    );
  };

  const MetricCard = ({ metric }: { metric: SeoMetric }) => {
    const getStatusColor = (status: string) => {
      switch(status) {
        case 'excellent': return 'text-ai-green bg-ai-green/10';
        case 'good': return 'text-ai-blue bg-ai-blue/10';
        case 'warning': return 'text-ai-orange bg-ai-orange/10';
        case 'poor': return 'text-ai-red bg-ai-red/10';
        default: return 'text-ai-gray bg-ai-gray/10';
      }
    };

    return (
      <div className="bg-ai-surface p-4 rounded-xl border border-ai-border">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-white">{metric.label}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
            {metric.score}%
          </span>
        </div>
        <div className="w-full bg-ai-black rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              metric.status === 'excellent' ? 'bg-ai-green' :
              metric.status === 'good' ? 'bg-ai-blue' :
              metric.status === 'warning' ? 'bg-ai-orange' : 'bg-ai-red'
            }`}
            style={{ width: `${metric.score}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'setup':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ai-gray mb-2">
                  Primary Keyword
                </label>
                <input
                  type="text"
                  value={formData.primaryKeyword}
                  onChange={(e) => setFormData({...formData, primaryKeyword: e.target.value})}
                  className="w-full px-3 py-2 bg-ai-surface border border-ai-border rounded-lg text-white placeholder-ai-gray focus:ring-2 focus:ring-offset-2 focus:ring-offset-ai-black focus:ring-ai-green focus:border-ai-green transition"
                  placeholder="Enter your target keyword"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ai-gray mb-2">
                  Content Type
                </label>
                <select
                  value={formData.contentType}
                  onChange={(e) => setFormData({...formData, contentType: e.target.value})}
                  className="w-full px-3 py-2 bg-ai-surface border border-ai-border rounded-lg text-white placeholder-ai-gray focus:ring-2 focus:ring-offset-2 focus:ring-offset-ai-black focus:ring-ai-green focus:border-ai-green transition"
                >
                  <option value="blog-post">Blog Post</option>
                  <option value="landing-page">Landing Page</option>
                  <option value="product-page">Product Page</option>
                  <option value="guide">Comprehensive Guide</option>
                  <option value="listicle">Listicle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ai-gray mb-2">
                  Target Audience
                </label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  className="w-full px-3 py-2 bg-ai-surface border border-ai-border rounded-lg text-white placeholder-ai-gray focus:ring-2 focus:ring-offset-2 focus:ring-offset-ai-black focus:ring-ai-green focus:border-ai-green transition"
                >
                  <option value="beginners">Beginners</option>
                  <option value="professionals">Professionals</option>
                  <option value="marketing-professionals">Marketing Professionals</option>
                  <option value="business-owners">Business Owners</option>
                  <option value="developers">Developers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ai-gray mb-2">
                  Tone & Style
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                  className="w-full px-3 py-2 bg-ai-surface border border-ai-border rounded-lg text-white placeholder-ai-gray focus:ring-2 focus:ring-offset-2 focus:ring-offset-ai-black focus:ring-ai-green focus:border-ai-green transition"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="authoritative">Authoritative</option>
                  <option value="conversational">Conversational</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ai-gray mb-2">
                  Word Count
                </label>
                <select
                  value={formData.wordCount}
                  onChange={(e) => setFormData({...formData, wordCount: e.target.value})}
                  className="w-full px-3 py-2 bg-ai-surface border border-ai-border rounded-lg text-white placeholder-ai-gray focus:ring-2 focus:ring-offset-2 focus:ring-offset-ai-black focus:ring-ai-green focus:border-ai-green transition"
                >
                  <option value="500-800">500-800 words</option>
                  <option value="800-1200">800-1,200 words</option>
                  <option value="1500-2000">1,500-2,000 words</option>
                  <option value="2000-3000">2,000-3,000 words</option>
                  <option value="3000+">3,000+ words</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ai-gray mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full px-3 py-2 bg-ai-surface border border-ai-border rounded-lg text-white placeholder-ai-gray focus:ring-2 focus:ring-offset-2 focus:ring-offset-ai-black focus:ring-ai-green focus:border-ai-green transition"
                >
                  <option value="marketing">Marketing</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
              </div>
            </div>

            <div className="bg-ai-blue/10 p-4 rounded-xl border border-ai-blue/20">
              <h3 className="font-semibold text-white mb-2 flex items-center"><Lightbulb size={16} className="mr-2 text-ai-blue"/>Quick Setup Tips</h3>
              <ul className="text-sm text-ai-gray space-y-1 pl-5">
                <li className="list-disc">Use specific, long-tail keywords for better targeting</li>
                <li>• Choose content type based on search intent</li>
                <li>• Consider your audience's expertise level</li>
                <li>• Longer content typically ranks better for competitive keywords</li>
              </ul>
            </div>
          </div>
        );

      case 'research':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200/80">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <Search className="mr-2" size={20} />
                  Keyword Research
                </h3>
                <div className="space-y-3">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-800">{keyword}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-500">Vol: 2.1K</span>
                        <span className="text-sm text-emerald-600 font-medium">Diff: Easy</span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                    + Add Related Keywords
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200/80 relative">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  SERP Analysis
                </h3>
                {!isProUser && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-10 p-4 text-center">
                      <Lock className="text-slate-500 mb-4" size={40} />
                      <h4 className="text-lg font-bold text-slate-800">Unlock SERP Analysis</h4>
                      <p className="text-slate-600 mb-4">Upgrade to Pro to analyze top competitors.</p>
                      <Link href="/#pricing" passHref>
                          <a className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                            Upgrade Now
                          </a>
                      </Link>
                  </div>
                )}
                <div className="space-y-3">
                  {competitorData.map((comp, index) => (
                    <div key={index} className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm text-slate-700">{comp.url}</span>
                        <span className="text-sm font-semibold text-indigo-600">Score: {comp.score}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
                        <span>{comp.words} words</span>
                        <span>{comp.keywords} keywords</span>
                        <span>{comp.backlinks} backlinks</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Lightbulb className="mr-2" size={20} />
                Content Opportunities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50/60 rounded-lg border border-emerald-200/60">
                  <h4 className="font-medium text-green-900 mb-2">Missing Topics</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• ROI calculation methods</li>
                    <li>• Tool comparisons</li>
                    <li>• Case studies</li>
                  </ul>
                </div>
                <div className="p-4 bg-sky-50/60 rounded-lg border border-sky-200/60">
                  <h4 className="font-medium text-blue-900 mb-2">Question Gaps</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• How to measure success?</li>
                    <li>• Best practices for beginners?</li>
                    <li>• Common mistakes to avoid?</li>
                  </ul>
                </div>
                <div className="p-4 bg-violet-50/60 rounded-lg border border-violet-200/60">
                  <h4 className="font-medium text-purple-900 mb-2">Content Formats</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Step-by-step guides</li>
                    <li>• Checklist templates</li>
                    <li>• Interactive tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'generate':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 flex items-center">
                  <Wand2 className="mr-2" size={20} />
                  AI Content Generation
                </h3>
                <button
                  onClick={generateContent}
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-md shadow-indigo-500/30 transition-all hover:shadow-lg hover:shadow-indigo-500/40"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      <span>Generate Content</span>
                    </>
                  )}
                </button>
              </div>

              {generatedContent ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-emerald-50/80 rounded-lg border border-emerald-200/80">
                    <CheckCircle className="text-emerald-600" size={20} />
                    <span className="text-emerald-800 font-medium">Content generated successfully!</span>
                    <div className="ml-auto flex space-x-2">
                      <button className="p-2 text-slate-500 hover:bg-slate-200/60 hover:text-slate-800 rounded-md transition-colors">
                        <Copy size={16} />
                      </button>
                      <button className="p-2 text-slate-500 hover:bg-slate-200/60 hover:text-slate-800 rounded-md transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg">
                    <div className="p-4 bg-slate-50/70 border-b border-slate-200">
                      <h4 className="font-medium text-slate-800">Generated Content</h4>
                    </div>
                    <div className="p-4 max-h-96 overflow-y-auto prose prose-sm max-w-none prose-slate">
                      <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">
                        {generatedContent}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
                  <Wand2 className="mx-auto text-slate-400 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Ready to Generate Content</h3>
                  <p className="text-slate-500 mb-4">Click the generate button to create SEO-optimized content based on your settings.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-sky-50/60 p-4 rounded-lg border border-sky-200/60">
                <h4 className="font-medium text-blue-900 mb-2">Generation Settings</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Keyword: {formData.primaryKeyword}</li>
                  <li>• Type: {formData.contentType}</li>
                  <li>• Length: {formData.wordCount}</li>
                  <li>• Tone: {formData.tone}</li>
                </ul>
              </div>
              <div className="bg-emerald-50/60 p-4 rounded-lg border border-emerald-200/60">
                <h4 className="font-medium text-green-900 mb-2">AI Features</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• ✓ SEO optimization</li>
                  <li>• ✓ Competitor analysis</li>
                  <li>• ✓ Semantic keywords</li>
                  <li>• ✓ Structure optimization</li>
                </ul>
              </div>
              <div className="bg-violet-50/60 p-4 rounded-lg border border-violet-200/60">
                <h4 className="font-medium text-purple-900 mb-2">Next Steps</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Review generated content</li>
                  <li>• Optimize SEO score</li>
                  <li>• Add custom sections</li>
                  <li>• Export final version</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'optimize':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-900 flex items-center">
                  <Target className="mr-2" size={20} />
                  SEO Optimization Score
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="text-3xl font-bold text-blue-600">{seoScore}</div>
                  <div className="text-sm text-gray-600">/100</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${seoScore}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seoMetrics.map((metric, index) => (
                  <MetricCard key={index} metric={metric} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="mr-2 text-yellow-600" size={20} />
                  Optimization Suggestions
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-yellow-400 bg-yellow-50">
                    <h4 className="font-medium text-yellow-800">Content Length</h4>
                    <p className="text-sm text-yellow-700">Add 300-500 more words to match top competitors</p>
                  </div>
                  <div className="p-3 border-l-4 border-red-400 bg-red-50">
                    <h4 className="font-medium text-red-800">Internal Links</h4>
                    <p className="text-sm text-red-700">Add 3-5 internal links to improve site architecture</p>
                  </div>
                  <div className="p-3 border-l-4 border-blue-400 bg-blue-50">
                    <h4 className="font-medium text-blue-800">Meta Description</h4>
                    <p className="text-sm text-blue-700">Optimize meta description with target keyword</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="mr-2 text-green-600" size={20} />
                  Optimization Wins
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-green-400 bg-green-50">
                    <h4 className="font-medium text-green-800">Keyword Usage ✓</h4>
                    <p className="text-sm text-green-700">Perfect keyword density and placement</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-400 bg-green-50">
                    <h4 className="font-medium text-green-800">Semantic Keywords ✓</h4>
                    <p className="text-sm text-green-700">Excellent use of related terms and LSI keywords</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-400 bg-green-50">
                    <h4 className="font-medium text-green-800">Content Structure ✓</h4>
                    <p className="text-sm text-green-700">Well-organized headings and subheadings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Eye className="mr-2" size={20} />
                  Content Preview
                </h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">Desktop</button>
                  <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">Mobile</button>
                </div>
              </div>

              {generatedContent ? (
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="ml-4 text-sm text-gray-600">yoursite.com/blog/digital-marketing-strategy</div>
                    </div>
                  </div>
                  <div className="p-6 bg-white max-h-96 overflow-y-auto">
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: generatedContent.replace(/\n/g, '<br>').replace(/^#\s(.+)/gm, '<h1>$1</h1>').replace(/^##\s(.+)/gm, '<h2>$1</h2>').replace(/^###\s(.+)/gm, '<h3>$1</h3>')
                      }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <Eye className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Content to Preview</h3>
                  <p className="text-gray-600">Generate content first to see the preview.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">SERP Preview</h4>
                <div className="text-sm">
                  <div className="text-blue-600 hover:underline cursor-pointer">The Ultimate Digital Marketing Strategy Guide</div>
                  <div className="text-green-600">yoursite.com › blog › marketing</div>
                  <div className="text-gray-600 mt-1">Comprehensive guide to digital marketing strategy for 2025. Learn essential tactics, tools, and best practices...</div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Social Preview</h4>
                <div className="text-sm">
                  <div className="bg-gray-200 h-20 rounded mb-2"></div>
                  <div className="font-medium">Digital Marketing Strategy Guide</div>
                  <div className="text-gray-600">The complete guide to building a winning digital marketing strategy in 2025.</div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Export Options</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">📄 Export as Markdown</button>
                  <button className="w-full text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">📝 Export as Word Doc</button>
                  <button className="w-full text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">🌐 Export as HTML</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Wand2 className="text-blue-600" size={28} />
              <h1 className="text-xl font-bold text-gray-800">AI SEO Content Suite</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <Users size={20} />
              </button>
               <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <Globe size={20} />
              </button>
              <img className="h-9 w-9 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Tabs Navigation */}
          <aside className="lg:w-1/4 mb-8 lg:mb-0">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </nav>
            <div className="mt-8 bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">Overall SEO Score</h3>
                <div className="flex items-baseline justify-center text-center my-4">
                    <span className="text-5xl font-bold text-blue-600">{seoScore}</span>
                    <span className="text-xl text-gray-500">/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{width: `${seoScore}%`}}></div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">Based on current settings and content.</p>
            </div>
          </aside>
          
          {/* Tab Content */}
          <div className="lg:w-3/4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SEOContentGeneratorPage = () => (
  <GeneratorProvider>
    <SEOContentGeneratorInternal />
  </GeneratorProvider>
);

export default SEOContentGeneratorPage;