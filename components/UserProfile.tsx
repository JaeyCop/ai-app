
'use client';

import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock user data. In a real app, this would come from an auth context.
const getMockUser = () => {
  if (typeof window !== 'undefined') {
    const proStatus = localStorage.getItem('isProUser');
    if (proStatus === 'true') {
      return { plan: 'Pro', credits: 'Unlimited' as const };
    }
  }
  return { plan: 'Free', credits: 4500 }; // Default free user
};

const UserProfile = () => {
  const [user, setUser] = useState<{ plan: string; credits: number | 'Unlimited' }>({ plan: 'Free', credits: 4500 });

  useEffect(() => {
    const updateUserState = () => setUser(getMockUser());
    updateUserState();
    window.addEventListener('storage', updateUserState);
    return () => window.removeEventListener('storage', updateUserState);
  }, []);

  const creditsUsed = 500;
  const creditsTotal = user.plan === 'Pro' ? Infinity : 5000;
  const percentageRemaining = user.plan === 'Pro' ? 100 : ((creditsTotal - creditsUsed) / creditsTotal) * 100;

  return (
    <div className="mt-auto bg-slate-800/50 p-4 rounded-2xl border border-slate-700 space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1 text-sm">
          <span className="text-slate-300 flex items-center"><Zap size={14} className="mr-1.5 text-yellow-400"/> Word Credits</span>
          <span className="font-semibold text-white">{user.plan === 'Pro' ? 'Unlimited' : `${user.credits} / 5,000`}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full" 
            style={{ width: `${percentageRemaining}%` }}
          ></div>
        </div>
      </div>

      {user.plan !== 'Pro' && (
        <Link 
          href="/#pricing" 
          className="group w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg px-4 py-2 flex items-center justify-center"
        >
          Upgrade to Pro
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
        </Link>
      )}
    </div>
  );
};

export default UserProfile;
