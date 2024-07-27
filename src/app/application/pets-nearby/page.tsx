'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useCoords } from '@/hooks';

import { Pet } from '@/pets';

const PetsNearbyPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const { coords, isLoading, isError } = useCoords();

  useEffect(() => {
    if (!coords) return;

    const fetchPets = async () => {
      const response = await fetch(
        `http://localhost:2000/pets/nearby?lat=${coords.lat}&lng=${coords.lng}&d=10000&img=true`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPets(data);
      }
    };
    fetchPets();
  }, [coords]);

  if (isLoading) {
    return <p>Please wait...</p>;
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 pt-4">
      <ul className="grid md:grid-cols-2 gap-4 w-full">
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </ul>
    </div>
  );
};

//  overflow-hidden !!!!!
const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <li className="aspect-[4/3] w-full">
      <Link
        href={`/pet/${pet.id}`}
        className="h-full w-full rounded-md flex flex-col overflow-hidden border"
      >
        <div className="flex-grow overflow-hidden border-b">
          <img src={pet.image_url} className="w-full h-full object-cover" />
        </div>
        <p className="text-5xl p-3 truncate shrink-0">{pet.name}</p>
      </Link>
    </li>
  );
};

export default PetsNearbyPage;
