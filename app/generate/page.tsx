'use client';

import React, { useState, useEffect, useRef } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/context/ToastContext';
import ContentDisplay from '@/components/ContentDisplay';
import { useSearchParams } from 'next/navigation';

function analyzeSEO(content: string, keyword: string) {
  const suggestions: string[] = [];
  let score = 100;

  // Keyword presence
  if (!keyword || !content.toLowerCase().includes(keyword.toLowerCase())) {
    suggestions.push('Include your main keyword in the content.');
    score -= 30;
  }

  // Content length
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  if (wordCount < 300) {
    suggestions.push('Content is too short. Aim for at least 300 words.');
    score -= 20;
  }

  // Headings
  const hasH2 = /##\s/.test(content);
  if (!hasH2) {
    suggestions.push('Add at least one H2 (##) subheading.');
    score -= 15;
  }

  // Meta description (simulate)
  if (content.length < 150) {
    suggestions.push('Add a meta description (at least 150 characters).');
    score -= 10;
  }

  // Readability (simulate)
  if (/\w{15,}/.test(content)) {
    suggestions.push('Break up long words or sentences for better readability.');
    score -= 10;
  }

  if (score < 0) score = 0;
  return { score, suggestions };
}

// Add a progress bar for SEO score
function SeoScoreBar({ score }: { score: number }) {
  let color = 'bg-green-500';
  if (score <= 80 && score > 50) color = 'bg-yellow-400';
  if (score <= 50) color = 'bg-red-500';
  return (
    <div className="w-full bg-gray-700 rounded-full h-2 mt-2 mb-4">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${score}%` }}
      ></div>
    </div>
  );
}

export default function GeneratorPage() {
  const searchParams = useSearchParams();
  const initialContentType = searchParams.get('contentType') || 'BlogPost';
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState('Professional');
  const [audience, setAudience] = useState('General');
  const [contentType, setContentType] = useState(initialContentType);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [seoScore, setSeoScore] = useState(100);
  const [seoSuggestions, setSeoSuggestions] = useState<string[]>([]);
  const [plagiarismStatus, setPlagiarismStatus] = useState<'idle' | 'checking' | 'unique' | 'plagiarized'>('idle');
  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [branding, setBranding] = useState('');
  const { showToast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const type = searchParams.get('contentType') || 'BlogPost';
    setContentType(type);
  }, [searchParams]);

  useEffect(() => {
    if (content) {
      const { score, suggestions } = analyzeSEO(content, keyword);
      setSeoScore(score);
      setSeoSuggestions(suggestions);
    } else {
      setSeoScore(100);
      setSeoSuggestions([]);
    }
  }, [content, keyword]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('customTemplates') || '[]');
    setCustomTemplates(stored);
  }, []);

  useEffect(() => {
    // Load personalization settings
    const saved = JSON.parse(localStorage.getItem('userSettings') || '{}');
    if (saved.defaultTone) setTone(saved.defaultTone);
    if (saved.defaultAudience) setAudience(saved.defaultAudience);
    if (saved.branding) setBranding(saved.branding);
  }, []);

  const applyTemplate = (id: string) => {
    const tpl = customTemplates.find((t) => t.id.toString() === id);
    if (tpl) {
      setKeyword(tpl.prompt);
    }
  };

  const generateContent = () => {
    if (!keyword) {
      showToast('Please enter a keyword.', 'error');
      return;
    }
    setIsLoading(true);
    // Simulate AI content generation API call
    setTimeout(() => {
      let generatedText = `## Unlocking the Power of ${keyword}\n\nThis is an AI-generated article about **${keyword}**, tailored for a **${audience}** audience with a **${tone}** tone. This content is structured as a **${contentType}**.\n\n### Key Benefits\n\nExploring the advantages of ${keyword} reveals several key points. Firstly, it enhances productivity. Secondly, it provides deep market insights.\n\n### Implementation Strategy\n\nA successful strategy involves careful planning and execution. Start by defining your goals, then move to resource allocation.`;
      if (branding) {
        generatedText += `\n\n---\n*Content generated for: ${branding}*`;
      }
      setContent(generatedText);
      setIsLoading(false);
      showToast('Content generated successfully!', 'success');
    }, 1500);
  };

  const saveContent = () => {
    if (!content) {
      showToast('No content to save!', 'info');
      return;
    }
    const history = JSON.parse(localStorage.getItem('generatedContentHistory') || '[]');
    const newEntry = {
      id: Date.now(),
      keyword: keyword || 'Untitled',
      content: content,
      date: new Date().toISOString(),
    };
    localStorage.setItem('generatedContentHistory', JSON.stringify([newEntry, ...history]));
    showToast('Content saved to history!', 'success');
  };

  const checkPlagiarism = () => {
    if (!content) return;
    setPlagiarismStatus('checking');
    // Simulate API call
    setTimeout(() => {
      // For demo: 80% chance unique, 20% chance plagiarized
      const isUnique = Math.random() > 0.2;
      setPlagiarismStatus(isUnique ? 'unique' : 'plagiarized');
    }, 1200);
  };

  const copyToClipboard = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      showToast('Copied to clipboard!', 'success');
    }
  };

  const downloadTxt = () => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${keyword || 'content'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHtml = () => {
    if (!content) return;
    const html = `<html><body>${content.replace(/\n/g, '<br/>')}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${keyword || 'content'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold text-ai-green mb-8 text-center">Generate New Content</h2>
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Custom Template Selector */}
        {customTemplates.length > 0 && (
          <div className="mb-6">
            <label htmlFor="template" className="block text-gray-300 text-sm font-medium mb-1">Use a Saved Template</label>
            <div className="flex gap-2">
              <select
                id="template"
                value={selectedTemplateId}
                onChange={e => {
                  setSelectedTemplateId(e.target.value);
                  applyTemplate(e.target.value);
                }}
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-ai-orange"
              >
                <option value="">Select a template...</option>
                {customTemplates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="keyword" className="block text-gray-300 text-lg font-medium mb-2">Enter Keyword:</label>
          <input type="text" id="keyword" className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-ai-orange" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="tone" className="block text-gray-300 text-sm font-medium mb-1">Tone of Voice</label>
            <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-ai-orange">
              <option>Professional</option>
              <option>Casual</option>
              <option>Witty</option>
              <option>Persuasive</option>
            </select>
          </div>
          <div>
            <label htmlFor="audience" className="block text-gray-300 text-sm font-medium mb-1">Target Audience</label>
            <select id="audience" value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-ai-orange">
              <option>General</option>
              <option>Beginners</option>
              <option>Experts</option>
              <option>Developers</option>
            </select>
          </div>
          <div>
            <label htmlFor="contentType" className="block text-gray-300 text-sm font-medium mb-1">Content Type</label>
            <select id="contentType" value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-ai-orange">
              <option value="BlogPost">Blog Post</option>
              <option value="LandingPage">Landing Page</option>
              <option value="ProductDescription">Product Description</option>
              <option value="SocialMediaPost">Social Media Post</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={generateContent}
            disabled={isLoading || !keyword}
            className="flex-1 bg-ai-orange text-white py-3 rounded-md text-lg font-semibold hover:bg-ai-red transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <LoadingSpinner /> : 'Generate'}
          </button>
          <button
            onClick={saveContent}
            disabled={!content}
            className="flex-1 bg-ai-green text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Save to History
          </button>
        </div>
        <div ref={contentRef}>
          <ContentDisplay content={content} isLoading={isLoading} />
        </div>
        {/* Export Options */}
        {content && !isLoading && (
          <div className="mt-4 flex flex-wrap gap-4">
            <button onClick={copyToClipboard} className="bg-ai-green text-white px-4 py-2 rounded hover:bg-green-700 font-semibold transition-colors">Copy to Clipboard</button>
            <button onClick={downloadTxt} className="bg-ai-orange text-white px-4 py-2 rounded hover:bg-ai-red font-semibold transition-colors">Download as TXT</button>
            <button onClick={downloadHtml} className="bg-ai-orange text-white px-4 py-2 rounded hover:bg-ai-red font-semibold transition-colors">Download as HTML</button>
          </div>
        )}
        {/* SEO Score Panel */}
        {content && (
          <>
            <div className="mt-8 bg-gray-900 border border-ai-green rounded-lg p-6">
              <h3 className="text-lg font-bold text-ai-green mb-2 flex items-center gap-2">
                SEO Score:
                <span className={seoScore > 80 ? 'text-green-400' : seoScore > 50 ? 'text-yellow-400' : 'text-red-400'}>
                  {seoScore}/100
                </span>
              </h3>
              <SeoScoreBar score={seoScore} />
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {seoSuggestions.length === 0 ? (
                  <li>Great job! Your content is well-optimized for SEO.</li>
                ) : (
                  seoSuggestions.map((s, i) => <li key={i}>{s}</li>)
                )}
              </ul>
              <div className="mt-4 text-xs text-gray-500">
                <span>Tips: Use your main keyword in the title, headings, and throughout the content. Aim for clarity and readability.</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <button
                onClick={checkPlagiarism}
                disabled={plagiarismStatus === 'checking'}
                className="bg-ai-orange text-white px-6 py-2 rounded-md font-semibold hover:bg-ai-red transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {plagiarismStatus === 'checking' ? 'Checking Plagiarism...' : 'Check Plagiarism'}
              </button>
              {plagiarismStatus === 'unique' && (
                <div className="mt-4 text-green-400 font-bold">No plagiarism detected. Your content is unique!</div>
              )}
              {plagiarismStatus === 'plagiarized' && (
                <div className="mt-4 text-red-400 font-bold">Potential duplicate content found. Please revise your text.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}