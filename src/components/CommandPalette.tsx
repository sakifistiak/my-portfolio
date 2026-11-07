'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Sun,
  Moon,
  Copy,
  FolderGit2,
  Terminal,
  User,
  Briefcase,
  GitCommit,
  Mail,
  Check,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { personalInfo, projects } from '@/data/portfolio-data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Handle global shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    // Navigation
    {
      id: 'nav-about',
      title: 'About Sakif Istiak Fahim',
      category: 'Navigation',
      icon: User,
      action: () => {
        window.location.hash = '#about';
        onClose();
      },
    },
    {
      id: 'nav-what-i-do',
      title: 'What I Do & Capabilities',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        window.location.hash = '#what-i-do';
        onClose();
      },
    },
    {
      id: 'nav-stack',
      title: 'Tech Stack & Systems',
      category: 'Navigation',
      icon: Terminal,
      action: () => {
        window.location.hash = '#stack';
        onClose();
      },
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects & Products',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      },
    },
    {
      id: 'nav-activity',
      title: 'GitHub Heatmap & Activity',
      category: 'Navigation',
      icon: GitCommit,
      action: () => {
        window.location.hash = '#activity';
        onClose();
      },
    },
    {
      id: 'nav-contact',
      title: 'Contact & Collaboration',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      },
    },

    // Actions
    {
      id: 'act-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      title: `Copy Email (${personalInfo.socialLinks.email})`,
      category: 'Actions',
      icon: copiedEmail ? Check : Copy,
      action: () => {
        navigator.clipboard.writeText(personalInfo.socialLinks.email);
        setCopiedEmail(true);
        setTimeout(() => {
          setCopiedEmail(false);
          onClose();
        }, 1000);
      },
    },

    // Major Projects
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `${p.title} (${p.category.toUpperCase()})`,
      category: 'Projects',
      icon: FolderGit2,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      },
    })),
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-[#0c0d14]/95"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-neutral-200/80 px-4 py-3.5 dark:border-neutral-800/80">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search sections, projects, actions..."
                className="flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
              />
              <span className="font-mono text-[10px] bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-500">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-400">
                  No commands or results found for &ldquo;{query}&rdquo;.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = idx === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition ${
                          isSelected
                            ? 'bg-blue-500 text-white shadow-xs'
                            : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-neutral-400'}`} />
                          <span className="font-medium">{item.title}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono uppercase ${
                              isSelected ? 'text-blue-100' : 'text-neutral-400'
                            }`}
                          >
                            {item.category}
                          </span>
                          {isSelected && <ArrowRight className="h-3 w-3 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Palette Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200/80 bg-neutral-50/80 px-4 py-2 text-[10px] text-neutral-500 dark:border-neutral-800/80 dark:bg-neutral-900/50 dark:text-neutral-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="font-mono">Raycast / Linear Style</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
