import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'PetFind - Platform for Reuniting Lost Pets with Their Owners',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          {children}
          <Toaster />
        </>
      </body>
    </html>
  );
}
