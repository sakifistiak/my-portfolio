import { Metadata } from 'next';
import { BookingForm } from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Book a Meeting — Sakif Istiak',
  description: 'Schedule a one-to-one meeting with Sakif Istiak for project discussions, technical consultation, business ideas, or collaboration.',
  alternates: { canonical: 'https://sakif.pro.bd/book-meeting' },
};

export default function BookMeetingPage() {
  return <main className="relative z-10 min-h-screen px-4 pb-24 pt-28 sm:px-6"><BookingForm /></main>;
}
