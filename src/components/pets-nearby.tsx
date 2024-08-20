'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCoords } from '@/hooks';

import PaginatedPetList from './paginated-pet-list';
import { getPetsNearby } from '@/actions/pets';

import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { TriangleAlert } from 'lucide-react';
import { Button } from './ui/button';

import LoadingCircle from './loading-sircle';

const PetsNearby = () => {
  const {
    coords,
    isLoading: coordsLoading,
    isError: coordsError,
  } = useCoords();

  const {
    data,
    isFetching,
    isError: queryError,
    refetch,
  } = useQuery({
    queryKey: ['pets', 'nearby', coords],
    queryFn: () => getPetsNearby(coords!),
    staleTime: 1000 * 60 * 60,
    enabled: !!coords,
  });

  if (coordsLoading || isFetching) {
    return <LoadingCircle />;
  }

  if (coordsError) {
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

  if (queryError) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        <TriangleAlert className="text-appPrimary size-12" />
        <h2 className="text-3xl">Oops!</h2>
        <p>An unexpected error occured!</p>
        <Button
          className="bg-[#8a2be2] hover:bg-[#a155e8]"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        <FaceFrownIcon className="text-appPrimary size-12" />
        <h2 className="text-3xl">Pets not found!</h2>
      </div>
    );
  }

  return <PaginatedPetList pets={data} />;
};

export default PetsNearby;
