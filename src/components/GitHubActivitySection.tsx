'use client';

import React from 'react';
import { GitBranch, GitCommit, ExternalLink, Terminal } from 'lucide-react';
import { GitHubContributionGraph } from './GitHubContributionGraph';
import { SpotlightCard } from './SpotlightCard';

export function GitHubActivitySection() {
  const recentActivities = [
    {
      type: 'commit',
      repo: 'sakifistiak/khan-gadget-pos',
      message: 'feat: add inter-branch stock requisition approval protocol',
      time: 'Yesterday',
      branch: 'main',
    },
    {
      type: 'commit',
      repo: 'sakifistiak/siusho-bot',
      message: 'refactor: decouple whatsapp webhook queue from telegram scheduler',
      time: '3 days ago',
      branch: 'v1.2-scheduler',
    },
    {
      type: 'commit',
      repo: 'sakifistiak/pingoline-platform',
      message: 'style: finalize dark modern layout tokens & portal auth flow',
      time: '5 days ago',
      branch: 'main',
    },
    {
      type: 'commit',
      repo: 'sakifistiak/digital-khata',
      message: 'fix: ensure atomic transactions across customer ledger debit records',
      time: 'Last week',
      branch: 'master',
    },
  ];

  return (
    <section id="activity" className="relative py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
            <GitCommit className="h-3 w-3 text-emerald-500" />
            <span>06 // DEVELOPER ACTIVITY &amp; HEATMAP</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            GitHub Contribution Matrix
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Consistent coding discipline and git commit cadence across personal builds, business software, and server automation experiments.
          </p>
        </div>

        {/* 52-Week Contribution Heatmap Component */}
        <GitHubContributionGraph />

        {/* Recent Git Activity Stream */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3 dark:border-neutral-800/60">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                  Recent Commit Log
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">git log --oneline</span>
            </div>

            <div className="mt-3 space-y-3 font-mono text-xs">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex flex-col gap-1 rounded-lg bg-neutral-100/50 p-2.5 dark:bg-neutral-800/40">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-blue-500 dark:text-blue-400 truncate max-w-[220px]">
                      {act.repo}
                    </span>
                    <span className="text-neutral-400 text-[10px]">{act.time}</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-xs">
                    {act.message}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                    <span className="rounded bg-neutral-200/80 px-1 dark:bg-neutral-700/60 text-neutral-600 dark:text-neutral-300">
                      {act.branch}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3 dark:border-neutral-800/60">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-sky-500" />
                  <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                    Repository Workflow Principles
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">vcs-standards</span>
              </div>

              <div className="mt-4 space-y-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-emerald-500 font-bold">01</span>
                  <p>
                    <strong className="text-neutral-900 dark:text-neutral-100">Conventional Commits:</strong> Atomic commits utilizing <code className="text-blue-500 font-mono text-[11px]">feat:</code>, <code className="text-emerald-500 font-mono text-[11px]">fix:</code>, and <code className="text-purple-500 font-mono text-[11px]">refactor:</code> prefixes for clear changelogs.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-emerald-500 font-bold">02</span>
                  <p>
                    <strong className="text-neutral-900 dark:text-neutral-100">Isolated Feature Branches:</strong> Keeping staging and production branches clean through structured pull requests.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-emerald-500 font-bold">03</span>
                  <p>
                    <strong className="text-neutral-900 dark:text-neutral-100">Safe Deployment Routines:</strong> Running database migrations in transactions with rollback test coverage prior to live promotion.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>Environment: Linux / Git</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white transition"
              >
                <span>Visit GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
