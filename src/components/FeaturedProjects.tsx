'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  FolderGit2,
  CheckCircle,
  Eye,
  Server,
  Bot,
  Store,
  BookOpen,
  PhoneCall,
  Briefcase,
  X,
  FileCode,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '@/data/portfolio-data';
import { Project, ProjectCategory } from '@/types';
import { SpotlightCard } from './SpotlightCard';

export function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'ERP & Commercial', value: 'erp' },
    { label: 'SaaS & Brands', value: 'saas' },
    { label: 'Bots & Automation', value: 'bot' },
    { label: 'Infrastructure & Ops', value: 'infrastructure' },
    { label: 'Web Applications', value: 'web' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const getStatusBadge = (status: Project['status'], color: Project['statusColor']) => {
    switch (color) {
      case 'emerald':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {status}
          </span>
        );
      case 'blue':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {status}
          </span>
        );
      case 'amber':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            {status}
          </span>
        );
    }
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'khan-gadget-pos':
        return <Store className="h-5 w-5 text-emerald-400" />;
      case 'pingoline':
        return <PhoneCall className="h-5 w-5 text-blue-400" />;
      case 'siusho':
        return <Bot className="h-5 w-5 text-cyan-400" />;
      case 'ezypbx':
        return <Server className="h-5 w-5 text-amber-400" />;
      case 'digital-khata':
        return <Briefcase className="h-5 w-5 text-purple-400" />;
      case 'vu-resource':
        return <BookOpen className="h-5 w-5 text-indigo-400" />;
      case 'xlorin-ecare':
        return <Server className="h-5 w-5 text-emerald-400" />;
      default:
        return <FileCode className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <section id="projects" className="relative py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
              <FolderGit2 className="h-3 w-3 text-emerald-500" />
              <span>04 // FEATURED PRODUCTS &amp; BUILDS</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
              Projects, Systems &amp; Products
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Real initiatives built to address practical workflows: from multi-branch POS tracking and telecom architectures to personal assistant bots.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Showing {filteredProjects.length} of {projects.length} builds
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-neutral-900 text-white shadow-sm dark:bg-neutral-100 dark:text-neutral-900'
                  : 'border border-neutral-200 bg-white/60 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <SpotlightCard className="h-full flex flex-col justify-between group p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
                  <div>
                    {/* Top status bar */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-100/90 dark:border-neutral-800 dark:bg-neutral-800/80">
                          {getProjectIcon(project.id)}
                        </div>
                        <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                          {project.title}
                        </span>
                      </div>
                      {getStatusBadge(project.status, project.statusColor)}
                    </div>

                    {/* Tagline */}
                    <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-2">
                      {project.tagline}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Metrics / Highlights preview */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {project.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-neutral-200/60 bg-neutral-100/50 p-2 dark:border-neutral-800/60 dark:bg-neutral-800/40"
                          >
                            <div className="text-[10px] font-mono text-neutral-500 uppercase">{m.label}</div>
                            <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom: Tech Tags & Inspect Button */}
                  <div className="mt-6 border-t border-neutral-200/60 pt-4 dark:border-neutral-800/60">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-mono font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 dark:bg-neutral-800">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:text-blue-500 dark:hover:text-blue-400 transition"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspect Architecture</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {project.links?.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
                            title="GitHub Repository"
                          >
                            <GithubIcon className="h-4 w-4" />
                          </a>
                        )}
                        {project.links?.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
                            title="Live Demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Deep Dive */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-[#0f1118]"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200/80 pb-4 dark:border-neutral-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        {activeProject.title}
                      </h3>
                      {getStatusBadge(activeProject.status, activeProject.statusColor)}
                    </div>
                    <p className="mt-1 text-xs font-mono text-blue-600 dark:text-blue-400">
                      {activeProject.tagline}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Long description */}
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                      Overview &amp; Purpose
                    </h4>
                    <p className="mt-1.5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {activeProject.longDescription}
                    </p>
                  </div>

                  {/* Architecture Highlights */}
                  {activeProject.architectureHighlights && (
                    <div>
                      <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                        Architectural Engineering Highlights
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {activeProject.architectureHighlights.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed"
                          >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Features */}
                  {activeProject.keyFeatures && (
                    <div>
                      <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                        Functional Capabilities
                      </h4>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeProject.keyFeatures.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2 text-xs text-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-800/50"
                          >
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                      Technology Stack
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {activeProject.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs font-mono font-medium text-neutral-800 dark:border-neutral-800 dark:bg-neutral-850 dark:text-neutral-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer of modal */}
                <div className="mt-6 flex items-center justify-between border-t border-neutral-200/80 pt-4 dark:border-neutral-800/80">
                  <span className="text-xs text-neutral-400">
                    Category: <span className="capitalize">{activeProject.category}</span>
                  </span>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                  >
                    Close Spec
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
