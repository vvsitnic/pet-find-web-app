'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  MapIcon,
  QueueListIcon,
  PlusCircleIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { cn } from '@/lib/utils';

const NavigationBar = () => {
  return (
    <header className="h-screen w-fit p-4 xl:w-[400px] flex flex-col shrink-0 border-r-[1px] border-[#d8d8d8]">
      <Link
        href="/"
        className="flex items-center justify-center mt-2 mb-4 h-[70px]"
      >
        <Image
          height={70}
          width={335}
          src="/petfind-logo.png"
          alt="PetFind Logo"
          className="hidden xl:block"
          priority
        />
        <Image
          height={60}
          width={60}
          src="/petfind-icon-small.png"
          alt="PetFind Logo"
          className="block xl:hidden"
          priority
        />
      </Link>
      <nav className="grow">
        <ul className="list-none h-full flex flex-col gap-2">
          <NavItem
            href="/application/pets-nearby"
            label="Pets nearby"
            icon={<QueueListIcon className="size-7" />}
          />{' '}
          <NavItem
            href="/application/pets-on-map"
            label="Pets on map"
            icon={<MapIcon className="size-7" />}
          />{' '}
          <NavItem
            href="/application/post-pet"
            label="Post pet"
            icon={<PlusCircleIcon className="size-7" />}
          />
          <NavItem
            href="/account"
            label="My account"
            icon={<UserCircleIcon className="size-7" />}
          />
          <li className="mb-3 rounded-lg hover:bg-[#d1c4e9] transition-colors mt-auto">
            <Link href="/" className="p-4 text-base flex items-center gap-3">
              <ArrowRightStartOnRectangleIcon className="size-7" />
              <p className="text-xl hidden xl:block">Logout</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NavItem = ({ href, label, icon, className }: NavItemProps) => {
  const pathname = usePathname();
  const isHrefPath = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          `p-4 text-base flex items-center gap-3 rounded-lg transition-colors ${
            isHrefPath ? 'text-white bg-[#8a2be2]' : 'hover:bg-[#d1c4e9]'
          }`,
          className
        )}
      >
        {icon}
        <p className="text-xl hidden xl:block">{label}</p>
      </Link>
    </li>
  );
};

export default NavigationBar;
