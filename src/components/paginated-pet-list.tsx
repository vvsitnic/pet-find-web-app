'use client';

import { useState } from 'react';

import Link from 'next/link';
import { Pet } from '@/pets';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const PaginatedPetList = ({
  pets = [],
  maxPetsOnPage = 8,
}: {
  pets?: Pet[];
  maxPetsOnPage?: number;
}) => {
  const [currentPage, setCurrentPages] = useState(0);

  function goToPrevPage() {
    setCurrentPages(prevPage => prevPage - 1);
  }

  function goToNextPage() {
    setCurrentPages(prevPage => prevPage + 1);
  }

  const petsOnPage = pets.slice(
    currentPage * maxPetsOnPage,
    (currentPage + 1) * maxPetsOnPage
  );

  const maxPages = Math.ceil(pets.length / maxPetsOnPage);

  return (
    <div className="max-w-[1450px] mx-auto px-4 pt-4">
      <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 w-full mb-10">
        {petsOnPage.map(pet => (
          <li key={pet.id}>
            <PetCard pet={pet} />
          </li>
        ))}
      </ul>
      {maxPages > 1 && (
        <div className="flex items-center w-fit gap-4 mx-auto ">
          <Button
            onClick={goToPrevPage}
            disabled={currentPage <= 0}
            className="bg-appPrimary hover:bg-[#a155e8]"
          >
            <ArrowLeft className="text-white" />
          </Button>
          <span className="font-bold text-2xl">{currentPage + 1}</span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage >= maxPages - 1}
            className="bg-appPrimary hover:bg-[#a155e8]"
          >
            <ArrowRight className="text-white" />
          </Button>
        </div>
      )}
    </div>
  );
};

const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <li className="w-full">
      <Link
        href={`/application/pet/${pet.id}`}
        className="h-full w-full rounded-lg flex flex-col overflow-hidden border group hover:bg-[#f5f0ff] transition-colors"
      >
        <div className="flex-grow overflow-hidden border-b aspect-[4/3] ">
          <img
            src={pet.image_url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <p className="text-4xl p-4 truncate shrink-0 font-medium">{pet.name}</p>
      </Link>
    </li>
  );
};

export default PaginatedPetList;
