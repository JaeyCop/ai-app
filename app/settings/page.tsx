"use client";

import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const [defaultTone, setDefaultTone] = useState('Professional');
  const [defaultAudience, setDefaultAudience] = useState('General');
  const [branding, setBranding] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userSettings') || '{}');
    if (saved.defaultTone) setDefaultTone(saved.defaultTone);
    if (saved.defaultAudience) setDefaultAudience(saved.defaultAudience);
    if (saved.branding) setBranding(saved.branding);
  }, []);

  const saveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify({ defaultTone, defaultAudience, branding }));
    alert('Settings saved!');
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-ai-black via-gray-900 to-ai-black">
      <h1 className="text-3xl font-bold mb-6 text-ai-green">Profile & Personalization</h1>
      <div className="bg-ai-black border border-ai-green rounded-lg p-6 max-w-xl mx-auto">
        <div className="mb-4">
          <label className="block text-gray-300 mb-1 font-semibold">Default Tone</label>
          <select
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={defaultTone}
            onChange={e => setDefaultTone(e.target.value)}
          >
            <option>Professional</option>
            <option>Casual</option>
            <option>Witty</option>
            <option>Persuasive</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1 font-semibold">Default Audience</label>
          <select
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={defaultAudience}
            onChange={e => setDefaultAudience(e.target.value)}
          >
            <option>General</option>
            <option>Beginners</option>
            <option>Experts</option>
            <option>Developers</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1 font-semibold">Company Branding (optional)</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="e.g. Acme Corp, www.acme.com"
            value={branding}
            onChange={e => setBranding(e.target.value)}
          />
        </div>
        <button onClick={saveSettings} className="bg-ai-green text-white px-4 py-2 rounded hover:bg-green-700 font-semibold transition-colors">Save Settings</button>
      </div>
    </div>
  );
}
