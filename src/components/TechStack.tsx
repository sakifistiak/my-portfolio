'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { techStack } from '@/data/portfolio-data';
import { SpotlightCard } from './SpotlightCard';

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Backend',
    'Frontend',
    'Database',
    'Infrastructure & DevOps',
    'Tools & Platforms',
  ];

  const filteredTech =
    activeCategory === 'All'
      ? techStack
      : techStack.filter((item) => item.category === activeCategory);

  const getProficiencyBadge = (proficiency: string) => {
    switch (proficiency) {
      case 'Working Daily':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Working Daily
          </span>
        );
      case 'Proficient':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-400 border border-blue-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Proficient
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-700 dark:text-purple-400 border border-purple-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Active Exploration
          </span>
        );
    }
  };

  return (
    <section id="stack" className="relative py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
              <Terminal className="h-3 w-3 text-sky-500" />
              <span>03 // ARCHITECTURAL TOOLING</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
              Technologies &amp; Systems
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Curated stack focused on high stability, practical execution, and business continuity. Grouped by architectural responsibility.
            </p>
          </div>

          {/* Authentic footnote */}
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 rounded-lg border border-neutral-200/70 bg-neutral-50/70 p-3 dark:border-neutral-800/70 dark:bg-neutral-900/50">
            <span className="text-emerald-500 font-bold">✓</span> Pragmatic proficiency without inflated arbitrary percentages.
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-neutral-900 text-white shadow-sm dark:bg-neutral-100 dark:text-neutral-900'
                  : 'border border-neutral-200 bg-white/60 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filteredTech.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard className="h-full p-4 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {item.name}
                      </span>
                      {getProficiencyBadge(item.proficiency)}
                    </div>

                    <div className="mt-1 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      {item.category}
                    </div>

                    <p className="mt-2.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
