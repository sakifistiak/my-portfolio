import { Metadata } from 'next';
import { FeaturedProjects } from '@/components/FeaturedProjects';

export const metadata: Metadata = {
  title: 'Projects & Products — Sakif Istiak',
  description:
    'Explore featured digital products built by Sakif Istiak, including PingoLine (ezyPBX), Siusho Assistant Bot, Digital Khata, and Sakiffo Task Reminder.',
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 pt-20">
      <FeaturedProjects />
    </main>
  );
}
