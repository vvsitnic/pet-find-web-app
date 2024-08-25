import { SessionProvider } from 'next-auth/react';
import Providers from '@/components/provider';

import NavigationBar from '@/components/nav-bar';
import NavigationBarMobile from '@/components/nav-bar-mobile';

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex flex-col sm:flex-row bg-white relative">
      <SessionProvider>
        <NavigationBar />
        <NavigationBarMobile />
      </SessionProvider>
      <main className="h-screen flex-grow overflow-auto">
        <Providers>{children}</Providers>
      </main>
    </div>
  );
}
