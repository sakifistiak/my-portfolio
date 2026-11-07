'use client';

import React from 'react';
import {
  Server,
  Code2,
  Boxes,
  Briefcase,
  Compass,
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export function About() {
  const pillars = [
    {
      title: 'Business-Driven Engineering',
      icon: Briefcase,
      color: 'text-blue-500',
      description:
        'Combining formal BBA business education with hands-on software development. I look beyond raw syntax to see how features impact revenue, margins, and operational bottlenecks.',
    },
    {
      title: 'Production Laravel & Databases',
      icon: Code2,
      color: 'text-rose-500',
      description:
        'Building maintainable web applications using Laravel, clean database migrations, strict relational schemas in MySQL, and reliable background queuing.',
    },
    {
      title: 'Real-World Server Ops',
      icon: Server,
      color: 'text-emerald-500',
      description:
        'Managing Linux VPS hosts, cPanel & WHM multi-tenant installations, CloudLinux resource governors, and ensuring solid uptime for client operations at Ecare Solution.',
    },
    {
      title: 'Practical Product Mindset',
      icon: Boxes,
      color: 'text-amber-500',
      description:
        'Creating self-directed products like Siusho, PingoLine, and POS systems that turn everyday productivity and retail challenges into automated digital tools.',
    },
  ];

  return (
    <section id="about" className="relative py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
            <Compass className="h-3 w-3 text-blue-500" />
            <span>01 // IDENTITY &amp; PHILOSOPHY</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            Bridging Software Development with Business Reality
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I don&apos;t view software development as abstract code in a silo. Every line of backend logic, database constraint, and server configuration exists to serve people and businesses.
          </p>
        </div>

        {/* Narrative & Profile Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Story Card */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full flex flex-col justify-between">
              <div className="space-y-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  My journey into technology began with an appetite to understand how the internet actually functions under the hood &mdash; starting from configuring Linux VPS environments, web hosting control panels, and DNS routing, to architecting backend applications that drive daily commercial workflows.
                </p>
                <p>
                  As an early-career developer currently working as a <strong className="text-neutral-900 dark:text-neutral-100">Laravel Developer Intern at Ecare Solution</strong> in Rajshahi, I spend my days building business software, working with relational MySQL schemas, and handling hosting and server infrastructure.
                </p>
                <p>
                  At the same time, pursuing my <strong className="text-neutral-900 dark:text-neutral-100">Bachelor of Business Administration (BBA) at Varendra University</strong> gives me a distinct vantage point: I speak both the language of developers (APIs, transactions, database normalization, systemd services) and the language of business owners (cash flows, inventory turnover, operational efficiency, and customer experience).
                </p>
                <p className="pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-500 border-t border-neutral-200/60 dark:border-neutral-800/60">
                  &ldquo;Authenticity note: I do not claim decades of senior leadership. I bring relentless curiosity, foundational discipline, clean engineering habits, and a builder&apos;s drive to solve practical problems.&rdquo;
                </p>
              </div>

              {/* Quick stats / highlight bar */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-neutral-200/60 pt-6 dark:border-neutral-800/60">
                <div className="rounded-xl bg-neutral-100/60 p-3 dark:bg-neutral-800/40">
                  <div className="text-xs font-mono text-neutral-500">Core Stack</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Laravel &amp; MySQL
                  </div>
                </div>
                <div className="rounded-xl bg-neutral-100/60 p-3 dark:bg-neutral-800/40">
                  <div className="text-xs font-mono text-neutral-500">Infrastructure</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Linux VPS &amp; cPanel
                  </div>
                </div>
                <div className="rounded-xl bg-neutral-100/60 p-3 dark:bg-neutral-800/40 col-span-2 sm:col-span-1">
                  <div className="text-xs font-mono text-neutral-500">Academic Focus</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    BBA Management
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:col-span-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <SpotlightCard key={pillar.title} className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div className="rounded-lg bg-neutral-100 p-2.5 dark:bg-neutral-800 shrink-0">
                      <Icon className={`h-5 w-5 ${pillar.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
