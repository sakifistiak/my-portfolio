'use client';

import React from 'react';
import {
  Code2,
  Briefcase,
  Server,
  Layers,
  Cpu,
} from 'lucide-react';
import { whatIDo } from '@/data/portfolio-data';
import { SpotlightCard } from './SpotlightCard';

export function WhatIDo() {
  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Briefcase,
    Server,
    Layers,
    Cpu,
  };

  return (
    <section id="what-i-do" className="relative py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
            <Layers className="h-3 w-3 text-emerald-500" />
            <span>02 // CAPABILITIES &amp; PRACTICES</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            What I Do &amp; How I Build
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            From backend application code and relational schemas to server deployments and automated communication bots, here are the technical domains where I actively work and create value.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatIDo.map((item, index) => {
            const Icon = iconMap[item.icon] || Code2;
            const isWide = index === 0 || index === 1;

            return (
              <SpotlightCard
                key={item.id}
                className={`flex flex-col justify-between ${isWide ? 'lg:col-span-1' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-800 dark:border-neutral-850 dark:bg-neutral-800 dark:text-neutral-200">
                      <Icon className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="font-mono text-xs text-neutral-400">0{index + 1}</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                    {item.subtitle}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="mt-6 border-t border-neutral-200/60 pt-4 dark:border-neutral-800/60">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
