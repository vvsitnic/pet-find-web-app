import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className="max-w-[1500px] mx-auto px-4 pt-4">
      <ul className="grid md:grid-cols-2 gap-4 w-full">
        <PetCard />
        <PetCard />
        <PetCard />
        <PetCard />
        <PetCard />
      </ul>
    </div>
  );
};

const PetCard = () => {
  return (
    <li className="aspect-[4/3] w-full overflow-hidden">
      <Link
        href="/"
        className="h-full w-full bg-slate-500 rounded-md flex flex-col overflow-hidden"
      >
        <div className="flex-grow bg-orange-300"></div>
        <p className="text-5xl p-2 truncate">AAAAAAAAAAAAAAAAAAAAAAAA</p>
      </Link>
    </li>
  );
};

export default Page;
