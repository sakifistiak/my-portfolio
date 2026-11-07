import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sakif Istiak Fahim — Laravel Developer & Product Builder',
  description:
    'Personal portfolio of Sakif Istiak Fahim. Laravel Developer Intern at Ecare Solution, BBA student at Varendra University. Building digital products, exploring technology, and solving real-world business problems.',
  keywords: [
    'Sakif Istiak Fahim',
    'Sakif Istiak',
    'Laravel Developer',
    'PHP Developer Bangladesh',
    'Rajshahi Web Developer',
    'Ecare Solution',
    'Varendra University',
    'SaaS Builder',
    'Linux Sysadmin',
    'MySQL Developer',
    'Khan Gadget POS',
    'Siusho Bot',
    'PingoLine',
  ],
  authors: [{ name: 'Sakif Istiak Fahim' }],
  creator: 'Sakif Istiak Fahim',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sakifistiak.com',
    title: 'Sakif Istiak Fahim — Laravel Developer & Product Builder',
    description:
      'Building Digital Products. Exploring Technology. Solving Real Problems. Portfolio of Sakif Istiak Fahim, Laravel developer and BBA student in Rajshahi, Bangladesh.',
    siteName: 'Sakif Istiak Fahim Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakif Istiak Fahim — Laravel Developer & Product Builder',
    description:
      'Building Digital Products. Exploring Technology. Solving Real Problems.',
  },
  robots: {
    index: true,
    follow: true,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
