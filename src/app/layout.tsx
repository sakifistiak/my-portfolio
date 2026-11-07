import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { JsonLd } from '@/components/JsonLd';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sakifistiak.com'),
  title: {
    default: 'Sakif Istiak (Sakif Istiak Fahim) — Laravel Developer & Product Builder',
    template: '%s | Sakif Istiak',
  },
  description:
    'Official portfolio of Sakif Istiak (Sakif Istiak Fahim) — Laravel Developer Intern at Ecare Solution and BBA student at Varendra University in Rajshahi, Bangladesh. Building digital products, SaaS backends, and practical business software.',
  keywords: [
    'Sakif Istiak',
    'Sakif Istiak Fahim',
    'Sakif Istiak Laravel',
    'Sakif Istiak Developer',
    'Sakif Istiak Bangladesh',
    'Sakif Istiak Rajshahi',
    'Sakif Istiak Ecare Solution',
    'Sakif Istiak Portfolio',
    'Laravel Developer Bangladesh',
    'PHP Developer Rajshahi',
    'Varendra University BBA',
    'SaaS Builder',
    'Linux Sysadmin',
    'MySQL Developer',
    'Siusho Bot',
    'PingoLine',
    'Digital Khata',
  ],
  authors: [
    {
      name: 'Sakif Istiak',
      url: 'https://sakifistiak.com',
    },
    {
      name: 'Sakif Istiak Fahim',
      url: 'https://sakifistiak.com',
    },
  ],
  creator: 'Sakif Istiak',
  publisher: 'Sakif Istiak',
  alternates: {
    canonical: 'https://sakifistiak.com',
  },
  openGraph: {
    type: 'profile',
    firstName: 'Sakif',
    lastName: 'Istiak',
    username: 'sakifistiak',
    gender: 'male',
    locale: 'en_US',
    url: 'https://sakifistiak.com',
    title: 'Sakif Istiak (Sakif Istiak Fahim) — Laravel Developer & Product Builder',
    description:
      'Official website of Sakif Istiak. Building digital products, exploring technology, and solving real business problems with Laravel, MySQL, and Linux VPS.',
    siteName: 'Sakif Istiak Portfolio',
    images: [
      {
        url: '/images/sakif-istiak.jpg',
        width: 1000,
        height: 1000,
        alt: 'Sakif Istiak (Sakif Istiak Fahim) - Laravel Developer & Product Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakif Istiak (Sakif Istiak Fahim) — Laravel Developer & Product Builder',
    description:
      'Building Digital Products. Exploring Technology. Solving Real Problems.',
    images: ['/images/sakif-istiak.jpg'],
    creator: '@sakifistiak',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'BD-54',
    'geo.placename': 'Rajshahi, Bangladesh',
    'geo.position': '24.3745;88.6042',
    ICBM: '24.3745, 88.6042',
  },
};

export const viewport: Viewport = {
  themeColor: '#090a0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
