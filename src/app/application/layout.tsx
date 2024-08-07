import NavigationBar from '@/components/nav-bar';
import { SessionProvider } from 'next-auth/react';
import Providers from '@/components/provider';

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex bg-white">
      <SessionProvider>
        <NavigationBar />
      </SessionProvider>
      <main className="h-screen flex-grow overflow-auto">
        <Providers>{children}</Providers>
      </main>
    </div>
  );
}
