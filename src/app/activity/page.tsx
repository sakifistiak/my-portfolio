import { Metadata } from 'next';
import { GitHubActivitySection } from '@/components/GitHubActivitySection';

export const metadata: Metadata = {
  title: 'GitHub & Developer Activity — Sakif Istiak',
  description:
    'Interactive 52-week contribution heatmap, Git activity stream, and engineering standards of Sakif Istiak.',
};

export default function ActivityPage() {
  return (
    <main className="relative z-10 pt-20">
      <GitHubActivitySection />
    </main>
  );
}
