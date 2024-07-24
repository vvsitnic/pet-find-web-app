import NavigationBar from '@/components/nav-bar';

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex bg-white">
      <NavigationBar />
      <main className="h-screen flex-grow overflow-auto">{children}</main>
    </div>
  );
}
