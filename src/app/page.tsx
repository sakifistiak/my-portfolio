'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { WhatIDo } from '@/components/WhatIDo';
import { TechStack } from '@/components/TechStack';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { GitHubActivitySection } from '@/components/GitHubActivitySection';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="relative z-10 flex flex-col">
      {/* Expanded Grand Hero Section */}
      <Hero />

      {/* About Me & Identity */}
      <About />

      {/* What I Do - 5 Architectural Pillars */}
      <WhatIDo />

      {/* Curated Tech Stack & Systems */}
      <TechStack />

      {/* Featured Projects Showcase with Architecture Modals */}
      <FeaturedProjects />

      {/* 52-Week GitHub Contribution Matrix & Developer Activity */}
      <GitHubActivitySection />

      {/* Career & Academic Timeline */}
      <ExperienceTimeline />

      {/* Direct Contact & Collaboration Hub */}
      <ContactSection />
    </main>
  );
}
