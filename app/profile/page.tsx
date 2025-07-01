"use client";

import React, { useState, useEffect } from "react";
import { Camera, User, Mail, Check, Edit3, Save, X } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Using state instead of localStorage for Claude.ai compatibility
    const defaultProfile = {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: 'https://i.pravatar.cc/150?u=alex'
    };
    setName(defaultProfile.name);
    setEmail(defaultProfile.email);
    setAvatar(defaultProfile.avatar);
  }, []);

  const saveProfile = () => {
    setIsSaved(true);
    setIsEditing(false);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Profile
          </h1>
          <p className="text-slate-400 text-lg">Manage your personal information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          {/* Success Message */}
          {isSaved && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center space-x-2 animate-in slide-in-from-top-2 duration-300">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Profile updated successfully!</span>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Avatar Section */}
            <div className="text-center space-y-6">
              <div 
                className="relative inline-block group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative">
                  <img
                    src={avatar || 'https://i.pravatar.cc/150?u=default'}
                    alt="Profile Avatar"
                    className="w-40 h-40 rounded-full border-4 border-gradient-to-r from-purple-400 to-pink-400 object-cover shadow-2xl transition-all duration-300 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg">
                  <Edit3 className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">{name || 'Your Name'}</h2>
                <p className="text-slate-400">{email || 'your@email.com'}</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
              
              {/* Edit Toggle Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleEditToggle}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-full transition-all duration-200 text-slate-300 hover:text-white"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-slate-300 font-medium">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-4 rounded-2xl border transition-all duration-200 ${
                    isEditing 
                    ? 'bg-slate-700/50 border-slate-600 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20' 
                    : 'bg-slate-800/30 border-slate-700/50 text-slate-400 cursor-not-allowed'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-slate-300 font-medium">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-4 rounded-2xl border transition-all duration-200 ${
                    isEditing 
                    ? 'bg-slate-700/50 border-slate-600 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20' 
                    : 'bg-slate-800/30 border-slate-700/50 text-slate-400 cursor-not-allowed'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Avatar URL Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-slate-300 font-medium">
                  <Camera className="w-4 h-4" />
                  <span>Avatar URL</span>
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-4 rounded-2xl border transition-all duration-200 ${
                    isEditing 
                    ? 'bg-slate-700/50 border-slate-600 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20' 
                    : 'bg-slate-800/30 border-slate-700/50 text-slate-400 cursor-not-allowed'
                  }`}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {/* Save Button */}
              {isEditing && (
                <button
                  onClick={saveProfile}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 pt-8 border-t border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-800/30 rounded-2xl">
                <div className="text-2xl font-bold text-purple-400">24</div>
                <div className="text-slate-400 text-sm">Projects</div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-2xl">
                <div className="text-2xl font-bold text-pink-400">142</div>
                <div className="text-slate-400 text-sm">Connections</div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-2xl">
                <div className="text-2xl font-bold text-blue-400">98%</div>
                <div className="text-slate-400 text-sm">Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}