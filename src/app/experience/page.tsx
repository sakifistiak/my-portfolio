import { Metadata } from 'next';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';

export const metadata: Metadata = {
  title: 'Experience & Education Timeline — Sakif Istiak',
  description:
    'Career and academic milestones of Sakif Istiak: Development Team Lead at Ecare Solution, Technical Support Specialist at Hostnin, and BBA student at Varendra University.',
};

export default function ExperiencePage() {
  return (
    <main className="relative z-10 pt-20">
      <ExperienceTimeline />
    </main>
  );
}
