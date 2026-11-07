import { Metadata } from 'next';
import { ContactSection } from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact & Collaboration — Sakif Istiak',
  description:
    'Get in touch with Sakif Istiak (Sakif Istiak Fahim) for software collaborations, Laravel projects, SaaS consultation, or direct inquiries.',
};

export default function ContactPage() {
  return (
    <main className="relative z-10 pt-20">
      <ContactSection />
    </main>
  );
}
