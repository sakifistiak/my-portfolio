'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Clock, Terminal, Code2, Server, Layers, BriefcaseBusiness, Users, Camera, AtSign, BookOpen, Rocket } from 'lucide-react';
import { personalInfo } from '@/data/portfolio-data';

const socials = [
  { label: 'GitHub', href: personalInfo.socialLinks.github, Icon: Code2 },
  { label: 'LinkedIn', href: personalInfo.socialLinks.linkedin, Icon: BriefcaseBusiness },
  { label: 'Facebook', href: personalInfo.socialLinks.facebook, Icon: Users },
  { label: 'Instagram', href: personalInfo.socialLinks.instagram, Icon: Camera },
  { label: 'X', href: personalInfo.socialLinks.x, Icon: AtSign },
  { label: 'Dev.to', href: personalInfo.socialLinks.devto, Icon: Code2 },
  { label: 'Medium', href: personalInfo.socialLinks.medium, Icon: BookOpen },
  { label: 'Product Hunt', href: personalInfo.socialLinks.producthunt, Icon: Rocket },
];

export function Hero() {
  const [localTime, setLocalTime] = useState('');
  useEffect(() => {
    const update = () => setLocalTime(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date()));
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px] sm:h-[34rem] sm:w-[34rem]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8 flex flex-col gap-3 border-b border-neutral-800/80 pb-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />Available for collaboration</div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400"><MapPin className="h-3.5 w-3.5 text-emerald-400" /><span>Rajshahi, Bangladesh</span>{localTime && <><span className="text-neutral-700">/</span><Clock className="h-3.5 w-3.5" /><span className="font-mono">{localTime} GMT+6</span></>}</div>
        </motion.div>

        <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="min-w-0 lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-neutral-900/80 px-3 py-2 font-mono text-xs text-emerald-400"><Terminal className="h-3.5 w-3.5" />whoami <span className="text-neutral-600">→</span> sakif-istiak</div>
            <p className="mb-3 font-mono text-sm text-neutral-400"><span className="text-emerald-400">const</span> developer = <span className="text-amber-300">&quot;Sakif Istiak&quot;</span>;</p>
            <h1 className="max-w-2xl break-words text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">Building digital <span className="block text-emerald-400">things that work.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-300 sm:text-base sm:leading-8">Software developer and product builder working across Laravel, PHP, modern web technologies, and Linux infrastructure. I turn practical problems into useful digital products.</p>
            <div className="mt-7 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
              {[
                { Icon: Code2, title: 'Web Development', detail: 'Laravel · PHP · Next.js' },
                { Icon: Server, title: 'Infrastructure', detail: 'Linux · VPS · Hosting' },
                { Icon: Layers, title: 'Product Building', detail: 'PingoLine · Siusho' },
                { Icon: Terminal, title: 'Business + Tech', detail: 'BBA · Product thinking' },
              ].map(({ Icon, title, detail }) => <div key={title} className="flex min-w-0 items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-3"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><div className="min-w-0"><div className="text-xs font-semibold text-neutral-200">{title}</div><div className="mt-1 break-words text-[11px] text-neutral-500">{detail}</div></div></div>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <Link href="/projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-emerald-300">View projects <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-200 transition hover:border-emerald-400/60 hover:text-emerald-300">Let&apos;s connect <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-neutral-800 pt-5"><span className="w-full font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 sm:w-auto">Connect //</span>{socials.map(({ label, href, Icon }) => href && <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 transition hover:border-emerald-500/50 hover:text-emerald-400"><Icon className="h-4 w-4" /></a>)}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.12 }} className="min-w-0 lg:col-span-6">
            <div className="overflow-hidden rounded-xl border border-neutral-700/80 bg-[#0b0f0e] shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-4 py-3"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div><div className="font-mono text-[10px] text-neutral-500 sm:text-xs">sakif@portfolio: ~</div><Terminal className="h-4 w-4 text-neutral-500" /></div>
              <div className="space-y-5 p-4 font-mono text-xs sm:p-6 sm:text-sm">
                <div><div className="text-neutral-500"># A quick introduction</div><div className="mt-2 break-all"><span className="text-emerald-400">sakif@portfolio</span><span className="text-neutral-500">:~$ </span><span className="text-neutral-100">cat about.txt</span></div><div className="mt-2 border-l-2 border-emerald-500/50 pl-3 text-sm leading-6 text-neutral-300">Hey! I&apos;m Sakif Istiak Fahim.<br />Developer, product builder &amp; lifelong learner.</div></div>
                <div><div className="text-emerald-400">[ PROFILE ]</div><div className="mt-2 grid grid-cols-[76px_minmax(0,1fr)] gap-x-3 gap-y-2 text-[11px] sm:grid-cols-[100px_minmax(0,1fr)] sm:text-xs"><span className="text-neutral-500">Role</span><span className="break-words text-neutral-200">Software Developer</span><span className="text-neutral-500">Education</span><span className="break-words text-neutral-200">BBA · Varendra University</span><span className="text-neutral-500">Location</span><span className="break-words text-neutral-200">Rajshahi, Bangladesh</span><span className="text-neutral-500">Focus</span><span className="break-words text-neutral-200">Web · Systems · SaaS</span></div></div>
                <div><div className="text-emerald-400">[ TECH STACK ]</div><div className="mt-2 flex flex-wrap gap-2">{['PHP', 'Laravel', 'MySQL', 'React', 'Next.js', 'Linux', 'Docker'].map((tech) => <span key={tech} className="rounded border border-emerald-500/20 bg-emerald-500/5 px-2 py-1 text-[10px] text-emerald-300 sm:text-[11px]">{tech}</span>)}</div></div>
                <div className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 border-t border-neutral-800 pt-4 sm:grid-cols-[88px_minmax(0,1fr)]"><div className="relative h-16 w-16 overflow-hidden rounded-lg border border-neutral-700 sm:h-20 sm:w-20"><Image src="/images/sakif-istiak.jpg" alt="Sakif Istiak Fahim" fill sizes="80px" className="object-cover" /></div><div className="min-w-0"><div className="text-[10px] text-neutral-500">CURRENTLY BUILDING</div><div className="mt-1 break-words text-sm font-semibold text-white sm:text-base">PingoLine &amp; Siusho</div><div className="mt-1 text-[10px] leading-5 text-neutral-500 sm:text-xs">Useful tools for real-world workflows.</div></div></div>
                <div className="break-all text-[11px] sm:text-xs"><span className="text-emerald-400">sakif@portfolio</span><span className="text-neutral-500">:~$ </span><span className="text-neutral-200">ready_to_build</span><span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-emerald-400 align-middle" /></div>
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] text-neutral-600">/* Turning ideas into working products */</p>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-6 sm:mt-20 md:grid-cols-4">{[['01','Web applications','Laravel · PHP · Next.js'],['02','Business systems','Workflow · ERP · SaaS'],['03','Infrastructure','Linux · VPS · Hosting'],['04','Product thinking','Ideas · Strategy · Delivery']].map(([n,title,detail]) => <div key={n} className="min-w-0"><div className="font-mono text-[10px] text-emerald-400">{n} //</div><div className="mt-2 text-xs font-bold text-neutral-200 sm:text-sm">{title}</div><div className="mt-1 break-words text-[10px] text-neutral-500 sm:text-xs">{detail}</div></div>)}</div>
      </div>
    </section>
  );
}
