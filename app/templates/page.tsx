'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBlog, 
  FaShoppingCart, 
  FaBullhorn, 
  FaRocket, 
  FaShare, 
  FaNewspaper,
  FaEnvelope,
  FaVideo,
  FaSearch,
  FaStar,
  FaClock,
  FaFire
} from 'react-icons/fa';

const templates = [
  {
    label: 'Blog Post',
    description: 'Generate comprehensive SEO-optimized blog posts with structured outlines, engaging introductions, and compelling conclusions.',
    value: 'BlogPost',
    icon: FaBlog,
    category: 'Content',
    estimatedTime: '5-10 min',
    popularity: 95,
    features: ['SEO Optimized', 'Structured Outline', 'Meta Description'],
    color: 'ai-green'
  },
  {
    label: 'Product Description',
    description: 'Create compelling product descriptions that convert browsers into buyers with persuasive copy and key benefit highlights.',
    value: 'ProductDescription',
    icon: FaShoppingCart,
    category: 'E-commerce',
    estimatedTime: '2-5 min',
    popularity: 88,
    features: ['Conversion Focused', 'Benefit Highlighting', 'Feature Lists'],
    color: 'ai-blue'
  },
  {
    label: 'Ad Copy',
    description: 'Craft high-converting ad copy for social media, Google Ads, and display advertising with attention-grabbing headlines.',
    value: 'AdCopy',
    icon: FaBullhorn,
    category: 'Marketing',
    estimatedTime: '1-3 min',
    popularity: 92,
    features: ['High Converting', 'Multiple Variants', 'A/B Test Ready'],
    color: 'ai-orange'
  },
  {
    label: 'Landing Page',
    description: 'Build complete landing page content with compelling headlines, benefit sections, and strong calls-to-action.',
    value: 'LandingPage',
    icon: FaRocket,
    category: 'Marketing',
    estimatedTime: '8-15 min',
    popularity: 85,
    features: ['CTA Optimized', 'Conversion Focused', 'Mobile Ready'],
    color: 'ai-gold'
  },
  {
    label: 'Social Media Post',
    description: 'Create engaging social media content optimized for different platforms with hashtags and engagement hooks.',
    value: 'SocialMediaPost',
    icon: FaShare,
    category: 'Social Media',
    estimatedTime: '1-2 min',
    popularity: 90,
    features: ['Platform Optimized', 'Hashtag Suggestions', 'Engagement Hooks'],
    color: 'ai-green'
  },
  {
    label: 'Email Newsletter',
    description: 'Design compelling email newsletters with subject lines, body content, and clear call-to-actions for maximum engagement.',
    value: 'EmailNewsletter',
    icon: FaEnvelope,
    category: 'Email Marketing',
    estimatedTime: '5-8 min',
    popularity: 78,
    features: ['Subject Line Variants', 'Personalization', 'CTA Optimization'],
    color: 'ai-blue'
  },
  {
    label: 'Press Release',
    description: 'Generate professional press releases with proper formatting, newsworthy angles, and media-ready content.',
    value: 'PressRelease',
    icon: FaNewspaper,
    category: 'PR & Media',
    estimatedTime: '6-12 min',
    popularity: 65,
    features: ['Professional Format', 'Media Ready', 'SEO Optimized'],
    color: 'ai-orange'
  },
  {
    label: 'Video Script',
    description: 'Create engaging video scripts for YouTube, TikTok, or promotional videos with hooks, content flow, and CTAs.',
    value: 'VideoScript',
    icon: FaVideo,
    category: 'Video Content',
    estimatedTime: '4-8 min',
    popularity: 82,
    features: ['Hook Templates', 'Scene Breakdown', 'CTA Integration'],
    color: 'ai-gold'
  }
];

const categories = ['All', 'Content', 'Marketing', 'E-commerce', 'Social Media', 'Email Marketing', 'PR & Media', 'Video Content'];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (value: string) => {
    router.push(`/generate?contentType=${value}`);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'ai-green': return 'from-ai-green/20 to-ai-green/5 border-ai-green/30 hover:border-ai-green';
      case 'ai-blue': return 'from-ai-blue/20 to-ai-blue/5 border-ai-blue/30 hover:border-ai-blue';
      case 'ai-orange': return 'from-ai-orange/20 to-ai-orange/5 border-ai-orange/30 hover:border-ai-orange';
      case 'ai-gold': return 'from-ai-gold/20 to-ai-gold/5 border-ai-gold/30 hover:border-ai-gold';
      default: return 'from-ai-green/20 to-ai-green/5 border-ai-green/30 hover:border-ai-green';
    }
  };

  const getIconColor = (color: string) => {
    switch(color) {
      case 'ai-green': return 'text-ai-green';
      case 'ai-blue': return 'text-ai-blue';
      case 'ai-orange': return 'text-ai-orange';
      case 'ai-gold': return 'text-ai-gold';
      default: return 'text-ai-green';
    }
  };

  return (
    <div className="min-h-screen bg-ai-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ai-green to-ai-blue bg-clip-text text-transparent mb-4">
            Content Templates
          </h1>
          <p className="text-ai-gray text-lg max-w-3xl leading-relaxed">
            Choose from our professionally crafted templates to generate high-quality content quickly. 
            Each template is optimized for specific use cases and includes best practices for maximum impact.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ai-gray h-4 w-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-ai-surface border border-ai-border rounded-xl text-white placeholder-ai-gray focus:border-ai-green focus:ring-1 focus:ring-ai-green focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-ai-green text-white shadow-lg shadow-ai-green/20'
                    : 'bg-ai-surface text-ai-gray border border-ai-border hover:border-ai-green hover:text-ai-green'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.value}
                onClick={() => handleSelect(template.value)}
                className={`relative group bg-gradient-to-br ${getColorClasses(template.color)} bg-ai-surface border rounded-xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-ai-green overflow-hidden`}
                aria-label={`Select ${template.label} template`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-ai-surface border border-ai-border group-hover:border-opacity-50 transition-all`}>
                      <Icon className={`h-6 w-6 ${getIconColor(template.color)}`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaStar className="h-3 w-3 text-ai-gold" />
                      <span className="text-xs text-ai-gray">{template.popularity}%</span>
                    </div>
                  </div>

                  {/* Title and Category */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-ai-green transition-colors mb-1">
                      {template.label}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getIconColor(template.color)} bg-opacity-20 border border-current border-opacity-30`}>
                      {template.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-ai-gray text-sm leading-relaxed mb-4 line-clamp-3">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-ai-black bg-opacity-50 text-ai-gray rounded border border-ai-border">
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-ai-black bg-opacity-50 text-ai-gray rounded border border-ai-border">
                          +{template.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-ai-border border-opacity-30">
                    <div className="flex items-center text-ai-gray text-xs">
                      <FaClock className="h-3 w-3 mr-1" />
                      {template.estimatedTime}
                    </div>
                    <div className="flex items-center text-ai-green text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                      Use Template
                      <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Popular Badge */}
                {template.popularity >= 90 && (
                  <div className="absolute top-4 right-4 bg-ai-red text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <FaFire className="h-3 w-3 mr-1" />
                    Popular
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-ai-surface border border-ai-border rounded-xl p-8 max-w-md mx-auto">
              <FaSearch className="h-16 w-16 text-ai-gray mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">No Templates Found</h3>
              <p className="text-ai-gray mb-4">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="bg-ai-green text-white px-4 py-2 rounded-lg font-medium hover:bg-ai-green/80 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-ai-surface border border-ai-border rounded-xl">
            <div className="text-2xl font-bold text-ai-green mb-1">{templates.length}</div>
            <div className="text-ai-gray text-sm">Templates Available</div>
          </div>
          <div className="text-center p-6 bg-ai-surface border border-ai-border rounded-xl">
            <div className="text-2xl font-bold text-ai-blue mb-1">{categories.length - 1}</div>
            <div className="text-ai-gray text-sm">Content Categories</div>
          </div>
          <div className="text-center p-6 bg-ai-surface border border-ai-border rounded-xl">
            <div className="text-2xl font-bold text-ai-orange mb-1">1-15</div>
            <div className="text-ai-gray text-sm">Minutes to Generate</div>
          </div>
        </div>
      </div>
    </div>
  );
}