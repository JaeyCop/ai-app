'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Zap, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaMagic, FaThLarge, FaHistory, FaRegCreditCard } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import UserProfile from './UserProfile';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const navigation = useMemo<NavigationItem[]>(
    () => [
      { name: 'Dashboard', href: '/dashboard', icon: FaHome },
      { name: 'Generate', href: '/generate', icon: FaMagic },
      { name: 'Templates', href: '/templates', icon: FaThLarge },
      { name: 'History', href: '/history', icon: FaHistory },
      { name: 'Billing', href: '/billing', icon: FaRegCreditCard },
    ],
    []
  );

  const handleClose = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen, handleClose]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="relative z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {/* Backdrop */}
            <motion.div
              className={`fixed inset-0 backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-black/75' 
                  : 'bg-black/50'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            
            {/* Sidebar panel */}
            <div className="fixed inset-0 flex z-50">
              <motion.div
                className="relative flex-1 flex flex-col max-w-xs w-full bg-ai-black border-r border-ai-border shadow-2xl"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Close button */}
                <div className="absolute top-0 right-0 -mr-12 pt-4">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-ai-surface/80 border border-ai-border hover:bg-ai-surface hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ai-green transition-all duration-200"
                    onClick={handleClose}
                    aria-label="Close sidebar"
                  >
                    <X className="h-5 w-5 text-ai-gray hover:text-white transition-colors" />
                  </button>
                </div>
                
                <SidebarContent 
                  pathname={pathname} 
                  navigation={navigation} 
                  onItemClick={handleClose}
                />
              </motion.div>
              
              {/* Spacer div */}
              <div className="flex-shrink-0 w-14" aria-hidden="true" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:z-30">
        <div className="flex-1 flex flex-col min-h-0 bg-ai-black border-r border-ai-border shadow-xl">
          <SidebarContent pathname={pathname} navigation={navigation} />
        </div>
      </div>
    </>
  );
};

interface SidebarContentProps {
  pathname: string;
  navigation: NavigationItem[];
  onItemClick?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  pathname, 
  navigation, 
  onItemClick 
}) => {
  const { theme } = useTheme();
  
  const handleItemClick = useCallback(() => {
    // Close mobile sidebar when navigation item is clicked
    if (onItemClick) {
      onItemClick();
    }
  }, [onItemClick]);
  
  return (
    <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
      {/* Logo/Brand */}
      <div className="flex items-center flex-shrink-0 px-4 mb-8">
        <Link
          href="/"
          className="group text-2xl font-bold bg-gradient-to-r from-ai-green to-ai-blue bg-clip-text text-transparent hover:from-ai-blue hover:to-ai-green transition-all duration-300"
          onClick={handleItemClick}
        >
          <span className="flex items-center">
            <Zap className="h-6 w-6 mr-2 text-ai-green group-hover:text-ai-blue transition-colors" />
            AI SEO Generator
          </span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1" role="navigation" aria-label="Main navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleItemClick}
              className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-ai-green to-ai-blue text-white shadow-lg shadow-ai-green/20 transform scale-[1.02]'
                  : `text-ai-gray hover:bg-ai-surface hover:text-white hover:shadow-md hover:transform hover:scale-[1.01] ${
                      theme === 'dark'
                        ? 'hover:bg-white/10'
                        : 'hover:bg-white/5'
                    }`
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon 
                className={`h-5 w-5 mr-3 flex-shrink-0 transition-colors ${
                  isActive 
                    ? 'text-white' 
                    : 'text-ai-gray group-hover:text-ai-green'
                }`} 
              />
              <span className="truncate">{item.name}</span>
              {isActive && (
                <ArrowRight className="h-4 w-4 ml-auto text-white/70" />
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* User Profile */}
      <div className="mt-auto">
        <UserProfile />
      </div>
    </div>
  );
};

export default Sidebar;