'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  MapPin,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '@/data/portfolio-data';
import { TerminalIntro } from './TerminalIntro';

export function Hero() {
  const [rajshahiTime, setRajshahiTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // Rajshahi is Asia/Dhaka (GMT+6)
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setRajshahiTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background ambient lighting and subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-500/15" />
      <div className="pointer-events-none absolute top-40 right-10 h-[300px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Badges: Available status & Live timezone */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-3"
        >
          {/* Availability pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>Available for Collaboration &amp; Projects</span>
          </div>

          {/* Location & Live Time */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/60 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-neutral-400" />
            <span>Rajshahi, Bangladesh</span>
            {rajshahiTime && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                <span className="font-mono text-[11px]">{rajshahiTime} (GMT+6)</span>
              </>
            )}
          </div>
        </motion.div>

        {/* Hero Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Heading, Introduction, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {/* Profile Avatar & Author Badge */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="relative group shrink-0">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-400 opacity-50 blur-xs group-hover:opacity-100 transition duration-300" />
                <Image
                  src="/images/sakif-istiak.jpg"
                  alt="Sakif Istiak (Sakif Istiak Fahim) — Laravel Developer & Product Builder"
                  width={68}
                  height={68}
                  priority
                  className="relative h-[68px] w-[68px] rounded-2xl object-cover ring-2 ring-neutral-900 shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-neutral-950 bg-emerald-500" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Sakif Istiak
                  </span>
                  <span className="text-neutral-400 text-xs">•</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    সাকিফ ইশতিয়াক
                  </span>
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Laravel Developer Intern @ Ecare Solution
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
              <span>Laravel Developer</span>
              <span>•</span>
              <span>Product Builder</span>
              <span>•</span>
              <span>BBA Student</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl dark:text-white leading-[1.08]">
              {personalInfo.name}
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-medium tracking-tight text-neutral-800 dark:text-neutral-200">
              &ldquo;{personalInfo.headline}&rdquo;
            </p>

            <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
              Early-career developer and technology entrepreneur blending robust PHP &amp; Laravel backend development, MySQL databases, and Linux server management with business strategy. Focused on building practical digital products that solve genuine commercial problems.
            </p>

            {/* Quick credentials pill row */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <span className="rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-1 dark:border-neutral-800 dark:bg-neutral-800/60">
                Intern @ Ecare Solution
              </span>
              <span className="rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-1 dark:border-neutral-800 dark:bg-neutral-800/60">
                BBA @ Varendra University
              </span>
              <span className="rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-1 dark:border-neutral-800 dark:bg-neutral-800/60">
                Linux &amp; VPS Sysadmin
              </span>
            </div>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
              >
                <span>View Projects</span>
                <ChevronRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white/80 px-5 py-3 text-sm font-semibold text-neutral-800 backdrop-blur-md transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {/* Social links */}
              <div className="ml-1 flex items-center gap-2">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white/80 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                  aria-label="Sakif Istiak GitHub Profile"
                  title="Sakif Istiak on GitHub"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>

                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white/80 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                  aria-label="Sakif Istiak LinkedIn Profile"
                  title="Sakif Istiak on LinkedIn"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Professional Profile Frame & Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            {/* Interactive Terminal Window */}
            <TerminalIntro />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
