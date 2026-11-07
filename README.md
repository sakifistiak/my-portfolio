# Sakif Istiak Fahim — Personal Portfolio Website

A modern, highly interactive personal portfolio website for **Sakif Istiak Fahim** — Laravel Developer, Technology Enthusiast, Entrepreneur, and Product Builder.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Key Features

- **Linear & Vercel-Inspired Aesthetic**: Dark-first design with a fluid light/dark mode toggle, refined typography, subtle glow borders, and mouse-following spotlight cards.
- **GitHub Contribution Matrix (52 Weeks)**:
  - 52 weeks of activity cells with 4 intensity levels
  - Smooth hover tooltips displaying date and commit frequency
  - Interactive **Contribution Snake** animation mode that plays across the contribution matrix
  - Transparent data representation adhering to authentic developer activity
- **Interactive Terminal Intro**:
  - Interactive CLI supporting `whoami`, `skills`, `projects`, `contact`, `experience`, `clear`
  - macOS/Linux style window with traffic light buttons and quick-action chips
- **Raycast / Linear Command Palette (`⌘K` / `Ctrl+K`)**:
  - Global hotkey to jump to any section, trigger theme toggles, inspect projects, or copy contact credentials
- **Architectural Project Showcase**:
  - Deep-dive modals inspecting architectural highlights for all 8 featured projects:
    - **Khan Gadget POS**: Multi-branch gadget retail POS & inventory ERP with serial/IMEI tracking
    - **PingoLine**: Communication-focused technology brand & portal
    - **Siusho**: WhatsApp & Telegram personal productivity bot
    - **ezyPBX**: IP telephony & cloud PBX service architecture
    - **Sakiffo Task Reminder**: Decoupled React + Laravel RESTful API
    - **Digital Khata**: Laravel digital accounting & ledger bookkeeping
    - **VU Resource**: Educational resource hub for university students
    - **Ecare Projects**: Enterprise server administration, Linux VPS & production operations
- **Pragmatic Tech Stack Showcase**: Categorized by responsibility (Backend, Frontend, Database, Infrastructure & DevOps, Tools & Platforms) with daily working status.
- **Interactive Contact & Collaboration**:
  - Contact form with client-side feedback and celebratory confetti
  - One-click copy for primary email with live toast notification
  - Real-time Rajshahi, Bangladesh local time clock (`Asia/Dhaka` GMT+6)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 theme variables, glassmorphism, grid patterns
│   │   ├── layout.tsx          # SEO metadata, OpenGraph tags, Geist font configuration
│   │   └── page.tsx            # Main layout orchestrator
│   ├── components/
│   │   ├── About.tsx           # Identity, philosophy & business-tech bridge
│   │   ├── CommandPalette.tsx  # ⌘K Raycast-style instant search modal
│   │   ├── ContactSection.tsx  # Interactive form, copy email, socials
│   │   ├── ExperienceTimeline.tsx # Ecare Solution internship & Varendra University BBA
│   │   ├── FeaturedProjects.tsx# Project cards with filter pills & deep-dive modal
│   │   ├── Footer.tsx          # Minimal footer with back-to-top & copyright
│   │   ├── GitHubActivitySection.tsx # Commit logs & activity wrappers
│   │   ├── GitHubContributionGraph.tsx # 52-week heatmap with Snake mode
│   │   ├── Hero.tsx            # Hero with live GMT+6 clock & profile intro
│   │   ├── Icons.tsx           # Vector SVG brand icons
│   │   ├── Navbar.tsx          # Floating header with ⌘K badge & theme switcher
│   │   ├── SpotlightCard.tsx   # Mouse-following radial spotlight container
│   │   ├── TechStack.tsx       # Categorized technologies with status badges
│   │   ├── TerminalIntro.tsx   # Interactive terminal emulator
│   │   ├── ThemeProvider.tsx   # Dark/light theme context provider
│   │   └── WhatIDo.tsx         # 5 core pillars of work
│   ├── data/
│   │   └── portfolio-data.ts   # Central authentic data store
│   └── types/
│       └── index.ts            # TypeScript interfaces
```

---

## 👤 Identity & Profile

- **Name**: Sakif Istiak Fahim
- **Location**: Rajshahi, Bangladesh
- **Education**: BBA Student at Varendra University
- **Role**: Laravel Developer Intern at Ecare Solution
