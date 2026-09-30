import type { Metadata } from 'next';
import './globals.css';
import { CleanNestProvider } from '@/context/CleanNestContext';
import { RoleSwitcherBanner } from '@/components/RoleSwitcherBanner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import ScrollAnimationProvider from '@/components/ScrollAnimationProvider';

export const metadata: Metadata = {
  title: 'CleanNest – On-Demand Cleaning Service Booking Platform',
  description: 'Like Uber for cleaning services. Book trusted, vetted, and background-checked home, sofa, carpet, and window cleaners in minutes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CleanNestProvider>
          <ScrollAnimationProvider />
          <RoleSwitcherBanner />
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
            {children}
          </main>
          <Footer />
        </CleanNestProvider>
      </body>
    </html>
  );
}
