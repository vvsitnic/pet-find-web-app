import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="h-screen relative">
      <Image
        height={35}
        width={168}
        src="/petfind-logo.png"
        alt="PetFind Logo"
        className="absolute right-1/2 translate-x-1/2 mt-10"
        priority
      />
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-3xl mb-5">Page not found!</h2>
        <Link href="/" className="hover:underline hover:text-appPrimary">
          Return to main
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
