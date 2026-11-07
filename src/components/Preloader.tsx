'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing environment...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if already shown in this session (optional, but keep it fluid for first load)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 350);
          return 100;
        }

        // Progression steps with subtle messages
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const bounded = Math.min(100, next);

        if (bounded < 30) {
          setLoadingText('Loading system modules: Laravel & MySQL...');
        } else if (bounded < 65) {
          setLoadingText('Connecting server daemons [Rajshahi: GMT+6]...');
        } else if (bounded < 90) {
          setLoadingText('Mounting developer interface & activity matrix...');
        } else {
          setLoadingText('Environment ready.');
        }

        return bounded;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -24,
            filter: 'blur(8px)',
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090a0f] text-neutral-100 select-none overflow-hidden"
        >
          {/* Ambient subtle backdrop glows */}
          <div className="pointer-events-none absolute h-[350px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute h-[250px] w-[350px] rounded-full bg-emerald-500/10 blur-[100px]" />

          <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6">
            {/* Center Monogram / Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative mb-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-700/80 bg-neutral-900/90 shadow-2xl backdrop-blur-xl">
                <span className="font-mono text-xl font-bold tracking-tight text-white">
                  SIF
                </span>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </motion.div>

            {/* Name & Tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-center"
            >
              <h2 className="text-sm font-semibold tracking-wider text-neutral-200">
                SAKIF ISTIAK FAHIM
              </h2>
              <p className="mt-1 font-mono text-[11px] text-neutral-500">
                Laravel Developer &amp; Product Builder
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="mt-8 w-full">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                <span className="truncate pr-2 text-neutral-400">{loadingText}</span>
                <span className="text-emerald-400 font-semibold">{progress}%</span>
              </div>

              {/* Track */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800/80 p-[1px] ring-1 ring-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-300 shadow-sm shadow-emerald-500/50"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Footer command prompt hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex items-center gap-2 font-mono text-[10px] text-neutral-500"
            >
              <span className="text-emerald-500 font-bold">$</span>
              <span>booting portfolio sequence...</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
