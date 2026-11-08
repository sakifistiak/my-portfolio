'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Clock, Camera, Sparkles, Code2, Layers, Server, Briefcase } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './Icons';
import { personalInfo } from '@/data/portfolio-data';

const socialItems = [
  { key: 'github', label: 'GitHub', icon: GithubIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { key: 'instagram', label: 'Instagram', icon: Camera },
  { key: 'x', label: 'X', icon: null },
  { key: 'devto', label: 'Dev.to', icon: Code2 },
  { key: 'medium', label: 'Medium', icon: null },
  { key: 'producthunt', label: 'Product Hunt', icon: Sparkles },
] as const;

export function Hero() {
  const [rajshahiTime, setRajshahiTime] = useState('');

  useEffect(() => {
    const updateTime = () => setRajshahiTime(new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: true,
    }).format(new Date()));
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-15" />
      <div className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-orange-400/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[130px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/70 pb-5 dark:border-neutral-800">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>
            Open to meaningful collaborations
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            <MapPin className="h-3.5 w-3.5" /><span>Rajshahi, Bangladesh</span>
            {rajshahiTime && <><span className="text-neutral-300 dark:text-neutral-700">·</span><Clock className="h-3.5 w-3.5" /><span className="font-mono">{rajshahiTime} GMT+6</span></>}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }} className="z-10 lg:col-span-7">
            <div className="mb-6 inline-flex -rotate-2 items-center gap-2 rounded-md bg-amber-300 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-neutral-950 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> A little about me
            </div>
            <p className="mb-3 text-sm font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">Hey, I&apos;m Sakif <span className="text-amber-500">✳</span></p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-neutral-950 dark:text-white sm:text-6xl lg:text-7xl">
              I build things <span className="relative inline-block">that matter.<span className="absolute -bottom-1 left-0 -z-10 h-3 w-full -rotate-1 bg-amber-300/80 dark:bg-amber-400/70" /></span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
              {personalInfo.headline} I work across web development, Linux infrastructure, and product ideas — connecting technology with real business needs.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                { icon: Code2, label: 'Web Developer' },
                { icon: Server, label: 'Linux & VPS' },
                { icon: Layers, label: 'Product Builder' },
                { icon: Briefcase, label: 'BBA Student' },
              ].map(({ icon: Icon, label }) => <span key={label} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300"><Icon className="h-3.5 w-3.5 text-amber-500" />{label}</span>)}
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-neutral-950/10 transition hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">Explore my work <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white/70 px-5 py-3.5 text-sm font-bold text-neutral-800 transition hover:-translate-y-0.5 hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-100 dark:hover:bg-neutral-800">Say hello <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Find me around</span>
              {socialItems.map(({ key, label }) => {
                const href = personalInfo.socialLinks[key];
                if (!href) return null;
                return <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="text-xs font-semibold text-neutral-500 transition hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400">{label}</a>;
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20, rotate: 1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto w-full max-w-[460px] lg:col-span-5">
            <div className="absolute -left-5 top-8 z-20 hidden -rotate-6 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 sm:block">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Currently exploring</div><div className="mt-1 text-sm font-black text-neutral-900 dark:text-white">Ideas → Products</div>
            </div>
            <div className="relative rotate-2 rounded-[2rem] bg-neutral-950 p-3 shadow-2xl shadow-neutral-950/20 dark:bg-neutral-800">
              <div className="overflow-hidden rounded-[1.45rem] bg-[#e9e3d8]">
                <div className="relative aspect-[4/5]">
                  <Image src="/images/sakif-istiak.jpg" alt="Sakif Istiak Fahim" fill priority sizes="(max-width: 1024px) 90vw, 420px" className="object-cover object-center" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-24 text-white">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">The person behind the builds</div>
                    <div className="mt-1 text-2xl font-black tracking-tight">Sakif Istiak Fahim</div><div className="mt-1 text-sm text-white/80">Developer · Builder · Learner</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-7 -left-3 z-20 max-w-[210px] -rotate-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Building</div>
              <div className="mt-2 text-sm font-black text-neutral-900 dark:text-white">PingoLine &amp; Siusho</div><p className="mt-1 text-xs leading-5 text-neutral-500 dark:text-neutral-400">Turning everyday problems into useful digital products.</p>
            </div>
            <div className="absolute -right-2 -top-5 z-20 rotate-6 rounded-xl bg-amber-300 px-4 py-3 text-neutral-950 shadow-lg sm:-right-5"><div className="text-[10px] font-black uppercase tracking-widest">Based in</div><div className="text-sm font-black">Rajshahi, BD ↗</div></div>
            <div className="pointer-events-none absolute -bottom-12 right-8 -z-10 h-36 w-36 rounded-full border-[22px] border-violet-400/20" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="mt-24 grid grid-cols-2 gap-3 border-t border-neutral-200 pt-7 dark:border-neutral-800 md:grid-cols-4 md:gap-5">
          {[
            ['01', 'Web applications', 'Laravel · PHP · Next.js'],
            ['02', 'Business systems', 'Workflow · ERP · SaaS'],
            ['03', 'Infrastructure', 'Linux · VPS · Hosting'],
            ['04', 'Product thinking', 'Ideas · Strategy · Delivery'],
          ].map(([number, title, detail]) => <div key={number} className="group"><div className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">{number}</div><div className="mt-2 text-sm font-black text-neutral-900 dark:text-white">{title}</div><div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{detail}</div></div>)}
        </motion.div>
      </div>
    </section>
  );
}
