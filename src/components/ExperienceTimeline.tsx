'use client';

import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { experienceTimeline } from '@/data/portfolio-data';
import { SpotlightCard } from './SpotlightCard';

export function ExperienceTimeline() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Work Experience':
        return <Briefcase className="h-4 w-4 text-emerald-500" />;
      case 'Education':
        return <GraduationCap className="h-4 w-4 text-blue-500" />;
      default:
        return <Award className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <section id="experience" className="relative py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
            <GraduationCap className="h-3 w-3 text-purple-500" />
            <span>05 // CAREER &amp; EDUCATION</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            Experience &amp; Academic Timeline
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A chronological timeline documenting my professional software internship at Ecare Solution and formal business administration studies at Varendra University.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative mt-12 pl-4 sm:pl-8 border-l border-neutral-200/80 dark:border-neutral-800/80 space-y-10">
          {experienceTimeline.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Node dot */}
              <div className="absolute -left-[25px] sm:-left-[41px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-xs dark:border-neutral-700 dark:bg-neutral-900">
                {getIcon(item.type)}
              </div>

              {/* Card Container */}
              <SpotlightCard className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/60 pb-3 dark:border-neutral-800/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {item.role}
                      </h3>
                      {item.current && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {item.organization}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights */}
                {item.highlights && (
                  <div className="mt-4 space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech / Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-neutral-200/40 dark:border-neutral-800/40">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-mono text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
