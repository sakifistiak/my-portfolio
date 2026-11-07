'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { WhatIDo } from '@/components/WhatIDo';
import { TechStack } from '@/components/TechStack';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { GitHubActivitySection } from '@/components/GitHubActivitySection';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#fafafa] text-neutral-900 transition-colors duration-300 dark:bg-[#090a0f] dark:text-neutral-100 selection:bg-blue-500/20 selection:text-blue-500">
        {/* Command Palette Modal */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />

        {/* Global Navigation Header */}
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        <main className="relative z-10 flex flex-col">
          {/* Hero with interactive terminal */}
          <Hero />

          {/* About Me & Story */}
          <About />

          {/* What I Do - 5 Pillars */}
          <WhatIDo />

          {/* Tech Stack & Systems */}
          <TechStack />

          {/* Projects Showcase & Architecture Modal */}
          <FeaturedProjects />

          {/* GitHub Activity & 52-Week Contribution Matrix */}
          <GitHubActivitySection />

          {/* Experience & Academic Timeline */}
          <ExperienceTimeline />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
