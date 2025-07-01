'use client';

import { Remarkable } from 'remarkable';
import LoadingSpinner from './LoadingSpinner';

interface ContentDisplayProps {
  content: string;
  isLoading: boolean;
}

const md = new Remarkable({ html: true });

function SEOAnalysis({ score, text }: { score: number; text: string }) {
  const getScoreColor = (s: number) => {
    if (s > 80) return 'text-ai-green';
    if (s > 50) return 'text-ai-orange';
    return 'text-ai-red';
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700">
      <p className="text-sm text-gray-300">{text}</p>
      <p className={`text-sm font-bold ${getScoreColor(score)}`}>{score} / 100</p>
    </div>
  );
}

function CircularProgress({ score }: { score: number }) {
  const getStrokeColor = (s: number) => {
    if (s > 80) return '#10B981'; // ai-green
    if (s > 50) return '#F97316'; // ai-orange
    return '#EF4444'; // ai-red
  };

  const strokeColor = getStrokeColor(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
        <circle
          className="transition-all duration-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // Corrected
          stroke={strokeColor}
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold" style={{ color: strokeColor }}>
        {score}
      </span>
    </div>
  );
}

export default function ContentDisplay({ content, isLoading }: ContentDisplayProps) {
  if (isLoading) {
    return <div className="mt-8 flex justify-center items-center min-h-[300px]"><LoadingSpinner /></div>;
  }

  if (!content) {
    return <div className="mt-8 text-center text-gray-500 min-h-[300px] flex items-center justify-center">Your generated content will appear here.</div>;
  }

  const htmlContent = md.render(content);

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-gray-700 p-6 rounded-lg prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <div className="lg:col-span-1 bg-gray-900 p-6 rounded-lg h-fit">
        <h3 className="text-xl font-bold text-ai-green mb-4 text-center">SEO Score</h3>
        <div className="flex justify-center mb-4"><CircularProgress score={87} /></div>
        <SEOAnalysis score={92} text="Readability" />
        <SEOAnalysis score={85} text="Keyword Density" />
        <SEOAnalysis score={78} text="Uniqueness" />
      </div>
    </div>
  );
}