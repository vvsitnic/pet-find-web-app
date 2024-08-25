'use client';

import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCoords } from '@/hooks';

import PaginatedPetList from './paginated-pet-list';
import { getPetsNearby } from '@/actions/pets';

import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { SearchIcon, TriangleAlert } from 'lucide-react';
import { Button } from './ui/button';

import LoadingCircle from './loading-sircle';

const PetsNearby = () => {
  const inputRef = useRef<HTMLInputElement>(null);

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
    queryFn: () => getPetsNearby(coords!, inputRef.current?.value || ''),
    staleTime: 1000 * 60 * 60,
    enabled: !!coords,
  });

  if (coordsLoading) {
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

  let component;

  if (queryError) {
    component = (
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

  if (isFetching) {
    component = <LoadingCircle />;
  }

  if (data && data.length === 0) {
    component = (
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        <FaceFrownIcon className="text-appPrimary size-12" />
        <h2 className="text-3xl">Pets not found!</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[1450px] mx-auto px-4 pt-3 h-full">
      <div className="flex mb-8">
        <input
          ref={inputRef}
          type="text"
          className="text-3xl p-3 border rounded-l-xl grow min-w-0"
          onKeyDown={e => {
            if (e.key === 'Enter') refetch();
          }}
        />
        <button
          className="w-20 flex items-center justify-center rounded-r-xl bg-appPrimary hover:bg-[#a155e8] transition-colors"
          onClick={() => refetch()}
        >
          <SearchIcon className="text-white size-8" />
        </button>
      </div>
      {component ? (
        <div className="h-1/2">{component}</div>
      ) : (
        <PaginatedPetList pets={data} />
      )}
    </div>
  );
};

export default PetsNearby;
