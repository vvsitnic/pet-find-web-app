'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useCoords } from '@/hooks';

import { Pet } from '@/pets';
import { getPetsNearby } from '@/actions/pets';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

const PetsNearbyPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const { coords, isLoading, isError } = useCoords();

  useEffect(() => {
    if (!coords) return;

    const fetchPets = async () => {
      const data = await getPetsNearby(coords);
      console.log(data);
      if (data) {
        setPets(data);
      }
    };
    fetchPets();
  }, [coords]);

  if (isLoading) {
    return <p>Please wait...</p>;
  }

  if (pets.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        <FaceFrownIcon className="text-appPrimary size-12" />
        <h2 className="text-3xl">Pets not found!</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[1450px] mx-auto px-4 pt-4">
      <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4  w-full">
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </ul>
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

export default PetsNearbyPage;
