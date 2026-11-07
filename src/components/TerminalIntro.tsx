'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { personalInfo } from '@/data/portfolio-data';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export function TerminalIntro() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'whoami',
      output: (
        <div className="space-y-1 text-neutral-300">
          <p className="text-emerald-400 font-semibold">Sakif Istiak Fahim</p>
          <p className="text-neutral-400">Laravel Developer & Product Builder • BBA Student at Varendra University</p>
          <p className="text-neutral-400">Location: Rajshahi, Bangladesh • Intern at Ecare Solution</p>
        </div>
      ),
    },
    {
      command: 'cat status.json',
      output: (
        <pre className="font-mono text-xs text-sky-300/90 leading-relaxed overflow-x-auto">
{`{
  "status": "Available for collaboration",
  "focus": ["Laravel", "MySQL", "Linux VPS", "SaaS & ERP"],
  "mindset": "Engineering practical solutions for business needs"
}`}
        </pre>
      ),
    },
  ]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickCommands = ['whoami', 'skills', 'projects', 'contact', 'clear'];

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let result: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        result = (
          <div className="space-y-1 text-xs">
            <p className="text-amber-300 font-semibold">Available commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-neutral-300">
              <span><strong className="text-emerald-400">whoami</strong> - Identity & background</span>
              <span><strong className="text-emerald-400">skills</strong> - Primary tech stack</span>
              <span><strong className="text-emerald-400">projects</strong> - Major software builds</span>
              <span><strong className="text-emerald-400">contact</strong> - Reach out info</span>
              <span><strong className="text-emerald-400">experience</strong> - Career & study path</span>
              <span><strong className="text-emerald-400">clear</strong> - Clear console window</span>
            </div>
          </div>
        );
        break;

      case 'whoami':
        result = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p className="text-emerald-400 font-semibold">{personalInfo.name}</p>
            <p className="text-neutral-300">{personalInfo.headline}</p>
            <p className="text-neutral-400">Role: {personalInfo.currentPosition}</p>
            <p className="text-neutral-400">Education: {personalInfo.education}</p>
            <p className="text-neutral-400">Location: {personalInfo.location}</p>
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="space-y-1.5 text-xs text-neutral-300">
            <p className="text-sky-400 font-semibold">Core Stack & Exploration:</p>
            <p><span className="text-emerald-400">• Backend:</span> Laravel, Modern PHP 8.x, REST APIs, Blade</p>
            <p><span className="text-emerald-400">• Database:</span> MySQL, Relational schema, Transactions, Indexing</p>
            <p><span className="text-emerald-400">• Infrastructure:</span> Linux VPS (Ubuntu/Debian), cPanel & WHM, CloudLinux, Nginx</p>
            <p><span className="text-emerald-400">• Frontend:</span> React fundamentals, Tailwind CSS, JavaScript ES6+</p>
            <p><span className="text-emerald-400">• Automation:</span> WhatsApp & Telegram Bot APIs, Webhooks, Cron</p>
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="space-y-1.5 text-xs text-neutral-300">
            <p className="text-sky-400 font-semibold">Featured Projects:</p>
            <p><span className="text-amber-400">1. PingoLine (ezyPBX):</span> Unified business communications & cloud PBX platform</p>
            <p><span className="text-amber-400">2. Siusho:</span> WhatsApp & Telegram personal assistant bot</p>
            <p><span className="text-amber-400">3. Digital Khata:</span> Laravel digital accounting & ledger bookkeeping</p>
            <p><span className="text-amber-400">4. Sakiffo Task Reminder:</span> React + Laravel + MySQL task system</p>
            <p><span className="text-amber-400">5. VU Resource:</span> University student academic resource hub concept</p>
            <p className="text-neutral-400 italic">Scroll down to the Projects section to inspect architectural specs.</p>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p className="text-emerald-400 font-semibold">Contact & Coordinates:</p>
            <p>• Phone / WhatsApp: {personalInfo.socialLinks.phone}</p>
            <p>• Email: {personalInfo.socialLinks.email}</p>
            <p>• Location: {personalInfo.location} (GMT+6)</p>
            <p>• GitHub: {personalInfo.socialLinks.github}</p>
            <p>• LinkedIn: {personalInfo.socialLinks.linkedin}</p>
            <p>• Facebook: {personalInfo.socialLinks.facebook}</p>
          </div>
        );
        break;

      case 'experience':
        result = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p className="text-purple-400 font-semibold">Career & Academic Path:</p>
            <p>• <strong className="text-neutral-100">Ecare Solution</strong> — Development Team Lead (2024 — Jan 2027)</p>
            <p>• <strong className="text-neutral-100">Hostnin</strong> — Technical Support Specialist (6 Months)</p>
            <p>• <strong className="text-neutral-100">Varendra University</strong> — BBA in Business Administration (2022 — Present)</p>
            <p>• Independent technology building & SaaS products</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case '':
        return;

      default:
        result = (
          <p className="text-xs text-rose-400">
            zsh: command not found: {cmdStr}. Type <span className="underline font-semibold cursor-pointer text-neutral-200" onClick={() => executeCommand('help')}>help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: result }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-neutral-800 bg-[#0c0d14]/95 shadow-2xl backdrop-blur-xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800/80 bg-neutral-900/60 px-4 py-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/40" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/40" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/40" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-neutral-400">
            sakif@rajshahi: ~/portfolio-terminal
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText('npx sakif-fahim');
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-1 rounded bg-neutral-800/70 px-2 py-0.5 text-[10px] text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-200"
            title="Copy CLI snippet"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? 'Copied' : 'npx sakif'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-neutral-200 scrollbar-thin"
      >
        <div className="mb-3 text-[11px] text-neutral-500">
          Last login: Today on ttys004. Type <span className="text-emerald-400 font-semibold cursor-pointer" onClick={() => executeCommand('help')}>help</span> for list of commands.
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="mb-3 space-y-1.5">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-emerald-400 font-semibold">sakif@dev</span>
              <span className="text-neutral-600">:</span>
              <span className="text-sky-400">~</span>
              <span className="text-neutral-500">$</span>
              <span className="text-neutral-100">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}

        {/* Input Form Prompt */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-emerald-400 font-semibold">sakif@dev</span>
          <span className="text-neutral-600">:</span>
          <span className="text-sky-400">~</span>
          <span className="text-neutral-500">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-neutral-100 outline-none caret-emerald-400"
            placeholder="type a command (e.g. 'help', 'skills', 'projects')..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>

        <div ref={bottomRef} />
      </div>

      {/* Quick Action Suggestion Bar */}
      <div className="flex items-center gap-1.5 border-t border-neutral-800/80 bg-neutral-900/40 px-3 py-2 text-[11px] text-neutral-400">
        <span className="text-neutral-500">Quick:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            className="rounded bg-neutral-800/60 px-2 py-0.5 font-mono text-[10px] text-neutral-300 transition hover:bg-neutral-700/80 hover:text-emerald-400"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
