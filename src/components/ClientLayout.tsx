'use client';

import React, { useState } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CommandPalette } from './CommandPalette';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#fafafa] text-neutral-900 transition-colors duration-300 dark:bg-[#090a0f] dark:text-neutral-100 selection:bg-blue-500/20 selection:text-blue-500 flex flex-col justify-between">
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />

        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        <div className="flex-1 w-full">{children}</div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
