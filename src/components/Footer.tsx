'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '@/data/portfolio-data';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200/60 bg-white/40 py-12 backdrop-blur-md dark:border-neutral-800/60 dark:bg-[#090a0f]/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {personalInfo.name}
              </span>
              <span className="text-neutral-400 text-xs">•</span>
              <span className="text-xs text-neutral-500">Rajshahi, Bangladesh</span>
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Building digital products • Exploring technology • Solving real problems.
            </p>
          </div>

          {/* Quick links & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-neutral-400">
              Built with Next.js &amp; Tailwind
            </div>

            <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200/40 dark:border-neutral-800/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} Sakif Istiak Fahim. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Laravel</span>
            <span>•</span>
            <span>MySQL</span>
            <span>•</span>
            <span>Linux VPS</span>
            <span>•</span>
            <span>BBA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
