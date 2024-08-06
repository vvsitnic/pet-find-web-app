'use client';

import React, { useEffect, useState } from 'react';

import { useCoords } from '@/hooks';

import PaginatedPetList from './paginated-pet-list';
import { Pet } from '@/pets';
import { getPetsNearby } from '@/actions/pets';

import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { TriangleAlert } from 'lucide-react';

const PetsNearby = () => {
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

  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        <TriangleAlert className="text-appPrimary size-12" />
        <h2 className="text-3xl">
          Allow geolocation to view pets{' '}
          <label className="font-bold underline">nearby</label>
        </h2>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        <FaceFrownIcon className="text-appPrimary size-12" />
        <h2 className="text-3xl">Pets not found!</h2>
      </div>
    );
  }

  return <PaginatedPetList pets={pets} />;
};

export default PetsNearby;
