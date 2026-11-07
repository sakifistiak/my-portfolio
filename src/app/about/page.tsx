import { Metadata } from 'next';
import { About } from '@/components/About';
import { WhatIDo } from '@/components/WhatIDo';
import { TechStack } from '@/components/TechStack';

export const metadata: Metadata = {
  title: 'About Sakif Istiak — Background, Experience & Systems',
  description:
    'Discover the journey of Sakif Istiak (Sakif Istiak Fahim) — former Development Team Lead at Ecare Solution, BBA student at Varendra University, and backend developer.',
};

export default function AboutPage() {
  return (
    <main className="relative z-10 pt-20">
      <About />
      <WhatIDo />
      <TechStack />
    </main>
  );
}
