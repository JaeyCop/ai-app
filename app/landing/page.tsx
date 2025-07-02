'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Shield, TrendingUp, ArrowRight, Star, Check, Globe, Users, Clock } from 'lucide-react';

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckout = async (priceId: string) => {
    setIsCheckingOut(true);
    const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId }) });
    const { url, error } = await response.json();
    if (url) window.location.href = url;
    else { console.error(error); setIsCheckingOut(false); }
  };

  const features = [
    { icon: Zap, text: "Lightning-fast content generation" },
    { icon: Shield, text: "100% plagiarism-free guarantee" },
    { icon: TrendingUp, text: "SEO-optimized for maximum reach" },
    { icon: Globe, text: "Multi-language support available" }
  ];

  const stats = [
    { number: "50K+", label: "Content Pieces Generated" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "AI-Powered Support" },
    { number: "150+", label: "Happy Customers" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="px-6 py-6">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ContentAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-400/30 rounded-full px-4 py-2 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">Rated #1 AI Content Generator</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              <span className="text-white">Content Creation</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Transform your ideas into <span className="text-teal-400 font-semibold">SEO-optimized</span>, <span className="text-blue-400 font-semibold">plagiarism-free</span> content in seconds. 
              Perfect for blogs, websites, and marketing campaigns.
            </p>

            {/* Dynamic Feature Display */}
            <div className={`mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-center space-x-3 text-lg text-gray-300">
                {React.createElement(features[currentFeature].icon, { 
                  className: "w-6 h-6 text-teal-400 transition-all duration-500" 
                })}
                <span className="transition-all duration-500">{features[currentFeature].text}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className="group bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                <span>Start Creating Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-slate-800/50 backdrop-blur-sm border-2 border-gray-600 hover:border-teal-400 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                <span>Watch Demo</span>
                <div className="w-5 h-5 border-2 border-current border-l-transparent rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-gray-400 text-sm mb-6">✨ No credit card required • 7-day free trial • Cancel anytime</p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1 group-hover:scale-110 transition-transform">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Feature Highlights */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Speed",
                  description: "Generate high-quality content in under 30 seconds with our advanced AI engine.",
                  color: "from-yellow-400 to-orange-500"
                },
                {
                  icon: Shield,
                  title: "100% Original",
                  description: "Every piece of content is unique and passes all plagiarism detection tools.",
                  color: "from-green-400 to-teal-500"
                },
                {
                  icon: TrendingUp,
                  title: "SEO Optimized",
                  description: "Built-in SEO optimization helps your content rank higher on search engines.",
                  color: "from-blue-400 to-purple-500"
                }
              ].map((feature, index) => (
                <div key={index} className="group p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-teal-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Pricing</span> That Scales
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From personal projects to enterprise solutions, we have a plan that fits your content creation needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Plan 1: Starter */}
              <div className="p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl h-full flex flex-col hover:border-slate-500 transition-all">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-gray-400 mb-6">For individuals and hobbyists getting started.</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold">$0</span>
                  <span className="text-gray-400">/ forever</span>
                </div>
                <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> 5,000 words/month</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> Basic SEO analysis</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> 20+ content templates</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> Standard support</li>
                </ul>
                <button className="w-full mt-auto bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                  Get Started
                </button>
              </div>

              {/* Plan 2: Pro (Highlighted) */}
              <div className="p-8 bg-gradient-to-br from-teal-900/50 to-blue-900/50 backdrop-blur-sm border-2 border-teal-400 rounded-3xl shadow-2xl shadow-teal-500/20 transform lg:scale-105 h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <span className="bg-teal-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
                </div>
                <p className="text-gray-300 mb-6">For professionals and teams creating content at scale.</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold">$49</span>
                  <span className="text-gray-400">/ month</span>
                </div>
                <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> 100,000 words/month</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> Advanced SEO analysis</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> All content templates</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> SERP & Competitor Analysis</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> Priority support</li>
                </ul>
                <button
                  className="w-full mt-auto group bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isCheckingOut}
                  onClick={() => handleCheckout('price_1PKgA2Rx1L3gHqYqZAbCdEbE')} // IMPORTANT: Replace with your actual Stripe Price ID
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <span>Choose Pro</span>
                      <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Plan 3: Enterprise */}
              <div className="p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl h-full flex flex-col hover:border-slate-500 transition-all">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-400 mb-6">For large organizations with custom needs.</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold">Custom</span>
                </div>
                <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> Unlimited words & API Access</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> Team collaboration tools</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> Dedicated account manager</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /> Custom integrations</li>
                </ul>
                <button className="w-full mt-auto bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-slate-800">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>&copy; 2025 ContentAI. Transform your content creation process.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}