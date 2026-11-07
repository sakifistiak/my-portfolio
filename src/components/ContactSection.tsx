'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MapPin,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
  Phone,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '@/data/portfolio-data';
import { SpotlightCard } from './SpotlightCard';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Collaboration',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.socialLinks.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#3b82f6', '#6366f1', '#f59e0b'],
      });
    }, 700);
  };

  return (
    <section id="contact" className="relative py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
            <MessageSquare className="h-3 w-3 text-emerald-500" />
            <span>07 // REACH OUT &amp; CONNECT</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            Let&apos;s Discuss Projects, Software &amp; Ideas
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Whether you have an upcoming web project, business workflow to automate, or want to explore collaboration opportunities in Laravel and SaaS development, my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct contact info & cards */}
          <div className="lg:col-span-5 space-y-4">
            <SpotlightCard className="p-6">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Direct Communication
              </h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Drop an email directly or connect on professional networks.
              </p>

              {/* Email with copy button */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-3 dark:border-neutral-800 dark:bg-neutral-800/60">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="rounded-lg bg-white p-2 text-neutral-700 shadow-2xs dark:bg-neutral-700 dark:text-neutral-200 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Primary Email</div>
                    <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {personalInfo.socialLinks.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="rounded-lg border border-neutral-200 bg-white p-2 text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="mt-3 flex items-center justify-between rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-3 dark:border-neutral-800 dark:bg-neutral-800/60">
                <a
                  href={`tel:${personalInfo.socialLinks.phone}`}
                  className="flex items-center gap-2.5 overflow-hidden transition hover:opacity-80"
                >
                  <div className="rounded-lg bg-white p-2 text-emerald-600 shadow-2xs dark:bg-neutral-700 dark:text-emerald-400 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Direct Phone / WhatsApp</div>
                    <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {personalInfo.socialLinks.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={personalInfo.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-[10px] font-mono text-emerald-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-emerald-400"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="rounded-lg border border-neutral-200 bg-white p-2 text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                    title="Copy phone number"
                  >
                    {copiedPhone ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-3 dark:border-neutral-800 dark:bg-neutral-800/60">
                <div className="rounded-lg bg-white p-2 text-neutral-700 shadow-2xs dark:bg-neutral-700 dark:text-neutral-200">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Operating Base</div>
                  <div className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                    {personalInfo.location} • Asia/Dhaka (GMT+6)
                  </div>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="mt-6 pt-5 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Online Presence
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-neutral-200/80 bg-white/60 p-2.5 text-xs text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon className="h-4 w-4" />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-neutral-400" />
                  </a>

                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-neutral-200/80 bg-white/60 p-2.5 text-xs text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon className="h-4 w-4 text-blue-500" />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-neutral-400" />
                  </a>

                  <a
                    href={personalInfo.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-neutral-200/80 bg-white/60 p-2.5 text-xs text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    <span className="flex items-center gap-2">
                      <FacebookIcon className="h-4 w-4 text-blue-600" />
                      <span>Facebook</span>
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-neutral-400" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out, {formData.name}. I usually respond within 24 hours during working days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'Project Collaboration',
                        message: '',
                      });
                    }}
                    className="mt-6 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 shadow-2xs hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Arif Rahman"
                        className="w-full rounded-xl border border-neutral-200 bg-white/70 px-3.5 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. arif@company.com"
                        className="w-full rounded-xl border border-neutral-200 bg-white/70 px-3.5 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Subject / Project Context
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-white/70 px-3.5 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100"
                    >
                      <option value="Project Collaboration">Project Collaboration</option>
                      <option value="Laravel / Backend Development">Laravel / Backend Development</option>
                      <option value="POS / Business Software ERP">POS / Business Software ERP</option>
                      <option value="Server / Hosting Assistance">Server / Hosting Assistance</option>
                      <option value="General Inquiries & Coffee">General Inquiries &amp; Coffee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Briefly describe what you are looking to build or discuss..."
                      className="w-full rounded-xl border border-neutral-200 bg-white/70 px-3.5 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Transmitting...
                      </span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
