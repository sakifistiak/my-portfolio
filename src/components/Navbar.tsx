'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, ArrowUpRight, Command } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'What I Do', href: '#what-i-do' },
    { name: 'Tech Stack', href: '#stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Activity', href: '#activity' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-neutral-200/60 bg-white/80 py-3.5 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-[#090a0f]/80 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Monogram */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100 font-mono text-xs font-bold text-neutral-900 shadow-xs transition-transform group-hover:scale-105 dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-100">
            SIF
          </div>
          <span className="hidden sm:inline-block">Sakif Istiak Fahim</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-neutral-200/80 bg-neutral-100/70 p-1 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/60">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right Actions: Command Palette, Theme, Contact CTA, Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-neutral-200/80 bg-neutral-100/70 px-2.5 py-1.5 text-xs text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-neutral-100"
            title="Open Command Palette (⌘K)"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-500 dark:text-neutral-400">
              ⌘K
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-600 transition-transform -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Direct CTA */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-sm"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 md:hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-neutral-200 bg-white/95 px-4 py-4 md:hidden backdrop-blur-xl dark:border-neutral-800 dark:bg-[#0c0d14]/95"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex items-center justify-between rounded-lg bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  <span className="flex items-center gap-2">
                    <Command className="h-3.5 w-3.5" /> Command Palette
                  </span>
                  <span className="font-mono text-[10px]">⌘K</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
