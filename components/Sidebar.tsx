'use client';

import React from 'react';
import { FaHome, FaMagic, FaHistory, FaRegCreditCard, FaThLarge, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FaHome },
    { name: 'Generate', href: '/generate', icon: FaMagic },
    { name: 'Templates', href: '/templates', icon: FaThLarge },
    { name: 'History', href: '/history', icon: FaHistory },
    { name: 'Billing', href: '/billing', icon: FaRegCreditCard },
  ];

  return (
    <React.Fragment>
      {/* Mobile sidebar */}
      <div className={`relative z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-ai-black bg-opacity-75 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-0 flex z-40">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-ai-black border-r border-ai-border shadow-2xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button 
                type="button" 
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-ai-surface border border-ai-border hover:bg-ai-gray hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-ai-green transition-all duration-200" 
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-ai-gray hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 mb-8">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-ai-green to-ai-blue bg-clip-text text-transparent hover:from-ai-blue hover:to-ai-green transition-all duration-300">
                  AI SEO Generator
                </Link>
              </div>
              <nav className="px-3 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-ai-green to-ai-blue text-white shadow-lg shadow-ai-green/20' 
                          : 'text-ai-gray hover:bg-ai-surface hover:text-white hover:shadow-md'
                      }`}
                    >
                      <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-ai-gray group-hover:text-ai-green'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <UserProfile />
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-ai-black border-r border-ai-border shadow-xl">
          <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-ai-green to-ai-blue bg-clip-text text-transparent hover:from-ai-blue hover:to-ai-green transition-all duration-300">
                AI SEO Generator
              </Link>
            </div>
            <nav className="flex-1 px-3 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-ai-green to-ai-blue text-white shadow-lg shadow-ai-green/20' 
                        : 'text-ai-gray hover:bg-ai-surface hover:text-white hover:shadow-md'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-ai-gray group-hover:text-ai-green'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <UserProfile />
        </div>
      </div>
    </React.Fragment>
  );
}

function UserProfile() {
  const [profile, setProfile] = React.useState({ 
    name: 'Jaeyoung', 
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' 
  });
  
  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setProfile({
      name: saved.name || 'JaeyCop',
      avatar: saved.avatar || 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    });
  }, []);
  
  const creditsUsed = 8;
  const creditsTotal = 20;
  const percentage = (creditsUsed / creditsTotal) * 100;

  return (
    <div className="flex-shrink-0 flex flex-col border-t border-ai-border bg-ai-surface p-4">
      <Link href="/profile" className="flex-shrink-0 w-full group block cursor-pointer hover:bg-ai-black hover:bg-opacity-50 rounded-xl p-3 transition-all duration-200">
        <div className="flex items-center">
          <div className="relative">
            <img className="inline-block h-10 w-10 rounded-full border-2 border-ai-border group-hover:border-ai-green transition-colors" src={profile.avatar} alt={profile.name} />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-ai-green rounded-full border-2 border-ai-surface"></div>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{profile.name}</p>
            <p className="text-xs text-ai-gray group-hover:text-ai-green transition-colors">View profile</p>
          </div>
        </div>
      </Link>
      
      <div className="mt-4 bg-ai-black bg-opacity-30 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-ai-gray">Credits Used</p>
          <p className="text-xs font-bold text-white">{creditsUsed} / {creditsTotal}</p>
        </div>
        <div className="w-full bg-ai-border rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-ai-orange to-ai-red h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-ai-gray">{creditsTotal - creditsUsed} remaining</span>
          {percentage > 75 && (
            <span className="text-xs text-ai-orange font-medium">Running low</span>
          )}
        </div>
      </div>
    </div>
  );
}