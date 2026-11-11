import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';
import { JsonLd } from '@/components/JsonLd';
import { ClientLayout } from '@/components/ClientLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: '--font-noto-serif-bengali',
  subsets: ['bengali', 'latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sakif.pro.bd'),
  title: {
    default: 'Sakif Istiak — Developer, Builder & Entrepreneur',
    template: '%s | Sakif Istiak',
  },
  description:
    'Sakif Istiak (Sakif Istiak Fahim) is a developer, builder, and entrepreneur from Rajshahi, Bangladesh, creating modern websites, web applications, and digital products using Laravel, Next.js, React, and modern technologies.',
  keywords: [
    'Sakif Istiak',
    'Sakif Istiak Fahim',
    'Sakif Istiak Developer',
    'Sakif Istiak Bangladesh',
    'Sakif Istiak Rajshahi',
    'Sakif Istiak Portfolio',
    'Web Developer in Rajshahi',
    'Website Developer in Rajshahi',
    'Software Developer in Rajshahi',
    'Web Developer Bangladesh',
    'Website Development Bangladesh',
    'Web Application Development',
    'Laravel Developer',
    'Next.js Developer',
    'React Developer',
    'Varendra University',
  ],
  authors: [
    {
      name: 'Sakif Istiak',
      url: 'https://sakif.pro.bd',
    },
    {
      name: 'Sakif Istiak Fahim',
      url: 'https://sakif.pro.bd',
    },
  ],
  creator: 'Sakif Istiak',
  publisher: 'Sakif Istiak',
  alternates: {
    canonical: 'https://sakif.pro.bd',
  },
  openGraph: {
    type: 'profile',
    firstName: 'Sakif',
    lastName: 'Istiak',
    username: 'sakifistiak',
    gender: 'male',
    locale: 'en_US',
    url: 'https://sakif.pro.bd',
    title: 'Sakif Istiak — Developer, Builder & Entrepreneur',
    description:
      'Sakif Istiak is a developer, builder, and entrepreneur from Rajshahi, Bangladesh, creating websites, web applications, and digital products.',
    siteName: 'Sakif Istiak',
    images: [
      {
        url: '/images/sakif-istiak.jpg',
        width: 1000,
        height: 1000,
        alt: 'Sakif Istiak — Developer, Builder & Entrepreneur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakif Istiak — Developer, Builder & Entrepreneur',
    description:
      'Creating modern websites, web applications, and digital products from Rajshahi, Bangladesh.',
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifBengali.variable} font-sans antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
