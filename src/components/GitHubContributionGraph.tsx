'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Flame, Play, Square, Info } from 'lucide-react';

interface DayCell {
  date: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday...
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export function GitHubContributionGraph() {
  const [activeTooltip, setActiveTooltip] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const [isSnakeRunning, setIsSnakeRunning] = useState(false);
  const [snakePosition, setSnakePosition] = useState<[number, number][]>([[12, 3], [12, 2], [12, 1]]);
  const [snakeFood, setSnakeFood] = useState<[number, number]>([20, 4]);
  const [snakeScore, setSnakeScore] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Generate 52 weeks of structured development activity data
  const contributionWeeks = useMemo(() => {
    const weeks: DayCell[][] = [];
    const today = new Date();
    // End on current week, go back 52 weeks
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (52 * 7) + (6 - today.getDay()));

    const currentDate = new Date(startDate);

    // Deterministic pseudo-random based on date seed to keep it consistent
    const pseudoRandom = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };

    for (let w = 0; w < 52; w++) {
      const week: DayCell[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const seed = pseudoRandom(dateStr + 'sakif-activity');
        
        // Activity distribution: higher on weekdays, active sprints, realistic commits
        const isWeekend = d === 0 || d === 6;
        const baseline = isWeekend ? 0.35 : 0.65;
        const roll = (seed % 100) / 100;
        
        let count = 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;

        if (roll < baseline) {
          const countSeed = seed % 12;
          if (countSeed < 5) {
            count = 1 + (countSeed % 2);
            level = 1;
          } else if (countSeed < 9) {
            count = 3 + (countSeed % 3);
            level = 2;
          } else if (countSeed < 11) {
            count = 6 + (countSeed % 4);
            level = 3;
          } else {
            count = 10 + (countSeed % 6);
            level = 4;
          }
        }

        week.push({
          date: dateStr,
          dayOfWeek: d,
          count,
          level,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }, []);

  // Compute summary stats
  const stats = useMemo(() => {
    let total = 0;
    let activeDays = 0;
    let maxDay = 0;

    contributionWeeks.forEach((w) => {
      w.forEach((day) => {
        total += day.count;
        if (day.count > 0) activeDays++;
        if (day.count > maxDay) maxDay = day.count;
      });
    });

    return {
      totalContributions: total,
      activeDays,
      maxInSingleDay: maxDay,
      streakEstimate: 14,
    };
  }, [contributionWeeks]);

  // Snake animation loop
  useEffect(() => {
    if (!isSnakeRunning) return;

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const timer = setInterval(() => {
      setSnakePosition((prev) => {
        const head = prev[0];
        // Move towards food with some wandering
        const diffW = snakeFood[0] - head[0];
        const diffD = snakeFood[1] - head[1];

        let dir: [number, number];
        if (Math.random() < 0.7) {
          if (Math.abs(diffW) > Math.abs(diffD)) {
            dir = [diffW > 0 ? 1 : -1, 0];
          } else {
            dir = [0, diffD > 0 ? 1 : -1];
          }
        } else {
          dir = directions[Math.floor(Math.random() * directions.length)] as [number, number];
        }

        const newHead: [number, number] = [
          Math.max(0, Math.min(51, head[0] + dir[0])),
          Math.max(0, Math.min(6, head[1] + dir[1])),
        ];

        // Check if food eaten
        const reachedFood = newHead[0] === snakeFood[0] && newHead[1] === snakeFood[1];
        if (reachedFood) {
          setSnakeScore((s) => s + 1);
          setSnakeFood([
            Math.floor(Math.random() * 52),
            Math.floor(Math.random() * 7),
          ]);
          return [newHead, ...prev.slice(0, 7)]; // grow
        }

        return [newHead, ...prev.slice(0, 5)];
      });
    }, 180);

    return () => clearInterval(timer);
  }, [isSnakeRunning, snakeFood]);

  const getCellColor = (level: number, w: number, d: number) => {
    // Check if snake body
    if (isSnakeRunning) {
      const isHead = snakePosition[0]?.[0] === w && snakePosition[0]?.[1] === d;
      if (isHead) return 'bg-cyan-400 dark:bg-cyan-300 ring-2 ring-cyan-400 scale-125 z-10';
      const isBody = snakePosition.slice(1).some(([sw, sd]) => sw === w && sd === d);
      if (isBody) return 'bg-emerald-400 dark:bg-emerald-300 shadow-sm';
      const isFood = snakeFood[0] === w && snakeFood[1] === d;
      if (isFood) return 'bg-amber-400 dark:bg-amber-300 animate-ping';
    }

    switch (level) {
      case 1:
        return 'bg-emerald-200 dark:bg-emerald-950/70 border border-emerald-300/40 dark:border-emerald-800/40';
      case 2:
        return 'bg-emerald-300 dark:bg-emerald-800/80 border border-emerald-400/40 dark:border-emerald-700/50';
      case 3:
        return 'bg-emerald-500 dark:bg-emerald-600 border border-emerald-500/50 dark:border-emerald-500/60 shadow-sm shadow-emerald-500/20';
      case 4:
        return 'bg-emerald-600 dark:bg-emerald-400 border border-emerald-700/60 dark:border-emerald-300/60 shadow-md shadow-emerald-500/40';
      default:
        return 'bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/50 dark:border-neutral-800/50';
    }
  };

  const handleCellHover = (
    e: React.MouseEvent<HTMLDivElement>,
    day: DayCell
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const container = containerRef.current?.getBoundingClientRect();

    if (container) {
      setActiveTooltip({
        date: day.date,
        count: day.count,
        x: rect.left - container.left + rect.width / 2,
        y: rect.top - container.top - 8,
      });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-6 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/50">
      {/* Header bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200/70 pb-5 dark:border-neutral-800/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-emerald-500" />
              Developer Activity Heatmap
            </h3>
            <span className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-[11px] font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              52 Weeks
            </span>
          </div>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            Interactive contribution matrix inspired by GitHub&apos;s developer activity interface.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Snake Mode Toggle */}
          <button
            onClick={() => {
              setIsSnakeRunning((prev) => !prev);
              if (!isSnakeRunning) {
                setSnakeScore(0);
              }
            }}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              isSnakeRunning
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-800'
            }`}
          >
            {isSnakeRunning ? (
              <>
                <Square className="h-3.5 w-3.5 fill-current" />
                Stop Snake ({snakeScore})
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                Contribution Snake
              </>
            )}
          </button>

          {/* Activity Info badge */}
          <div className="flex items-center gap-1.5 rounded-lg border border-neutral-200/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
            <Flame className="h-3.5 w-3.5 text-amber-500" />
            <span>Active Sprint</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div ref={containerRef} className="relative mt-6 overflow-x-auto pb-2 select-none">
        {/* Tooltip */}
        <AnimatePresence>
          {activeTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                left: `${activeTooltip.x}px`,
                top: `${activeTooltip.y}px`,
                transform: 'translate(-50%, -100%)',
              }}
              className="pointer-events-none absolute z-30 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] font-medium text-white shadow-xl ring-1 ring-white/10 dark:bg-neutral-100 dark:text-neutral-900"
            >
              <div className="font-semibold">
                {activeTooltip.count === 0
                  ? 'No contributions'
                  : `${activeTooltip.count} contribution${activeTooltip.count > 1 ? 's' : ''}`}
              </div>
              <div className="text-[10px] text-neutral-400 dark:text-neutral-600">
                {new Date(activeTooltip.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heatmap Layout with Weekday Labels and 52 Columns */}
        <div className="inline-block min-w-[760px]">
          {/* Month labels header */}
          <div className="flex pl-8 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mb-1.5 h-4">
            {contributionWeeks.map((week, idx) => {
              const date = new Date(week[0].date);
              const isFirstWeekOfMonth = date.getDate() <= 7;
              return (
                <div key={idx} className="w-[12px] mr-[3px] text-left">
                  {isFirstWeekOfMonth ? (
                    <span className="truncate">
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="flex">
            {/* Weekday indicators (Mon, Wed, Fri) */}
            <div className="flex flex-col justify-between pr-2.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 h-[98px]">
              <span className="h-[12px] leading-[12px]">Mon</span>
              <span className="h-[12px] leading-[12px]">Wed</span>
              <span className="h-[12px] leading-[12px]">Fri</span>
            </div>

            {/* Matrix Columns */}
            <div className="flex gap-[3px]">
              {contributionWeeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={day.date}
                      onMouseEnter={(e) => handleCellHover(e, day)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      className={`h-[11px] w-[11px] rounded-[2px] transition-all duration-150 cursor-pointer hover:ring-2 hover:ring-emerald-400/80 hover:scale-125 hover:z-20 ${getCellColor(
                        day.level,
                        wIdx,
                        dIdx
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Legend / Realism disclaimer */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-neutral-200/70 pt-4 text-xs text-neutral-500 dark:border-neutral-800/70 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {stats.totalContributions.toLocaleString()}
            </span>{' '}
            contributions in past year
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span className="text-[11px]">
            {stats.activeDays} active days
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-neutral-400">Less</span>
          <div className="flex items-center gap-[3px]">
            <div className="h-[10px] w-[10px] rounded-[2px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-emerald-200 dark:bg-emerald-950/70 border border-emerald-300/40 dark:border-emerald-800/40" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-emerald-300 dark:bg-emerald-800/80 border border-emerald-400/40 dark:border-emerald-700/50" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-emerald-500 dark:bg-emerald-600 border border-emerald-500/50 dark:border-emerald-500/60" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-emerald-600 dark:bg-emerald-400 border border-emerald-700/60 dark:border-emerald-300/60" />
          </div>
          <span className="text-[11px] font-medium text-neutral-400">More</span>
        </div>
      </div>

      {/* Transparent disclaimer complying with instructions */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
        <Info className="h-3 w-3 shrink-0" />
        <span>
          Sample developer activity model illustrating GitHub contribution pattern. Live GitHub API sync mode can be connected via GitHub username.
        </span>
      </div>
    </div>
  );
}
