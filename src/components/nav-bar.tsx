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
import { useSession, signOut } from 'next-auth/react';

const NavigationBar = () => {
  const session = useSession();

  return (
    <header className="h-screen w-fit p-4 xl:w-[400px] hidden sm:flex flex-col shrink-0 border-r-[1px] border-[#d8d8d8]">
      <Link
        href="/"
        className="hidden h-sm:flex items-center justify-center mt-2 mb-4 h-[70px]"
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
            href="/application/settings"
            label="My account"
            icon={<UserCircleIcon className="size-7" />}
          />
          <li className="mb-3 mt-auto">
            <button
              type="submit"
              className="p-4 text-base flex items-center gap-3 cursor-pointer w-full h-full hover:bg-appHover2 rounded-lg disabled:text-gray-400 disabled:bg-white transition-colors"
              onClick={() => signOut()}
              disabled={session?.status !== 'authenticated'}
            >
              <ArrowRightStartOnRectangleIcon className="size-7" />
              <p className="text-xl hidden xl:block">Logout</p>
            </button>
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

export const NavItem = ({ href, label, icon, className }: NavItemProps) => {
  const pathname = usePathname();
  const isHrefPath = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          `p-4 text-base flex items-center gap-3 rounded-lg transition-colors ${
            isHrefPath ? 'text-white bg-appPrimary' : 'hover:bg-appHover2'
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
