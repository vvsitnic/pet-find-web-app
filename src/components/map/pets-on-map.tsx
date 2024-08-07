'use client';

import { useEffect, useState } from 'react';

import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useDebounce, useCoords } from '@/hooks';

import { Pet } from '@/pets';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import { getPetsOnMap } from '@/actions/pets';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

interface Bounds {
  north: number;
  south: number;
  west: number;
  east: number;
}

const createBoundryFromCenter = (center: {
  lat: number;
  lng: number;
}): Bounds => {
  const DEGRESS = 9;
  const bounds: Bounds = {
    north: center.lat + DEGRESS,
    south: center.lat - DEGRESS,
    west: center.lng - DEGRESS,
    east: center.lng + DEGRESS,
  };
  return bounds;
};

const createBoundryFromBounds = (bounds: Bounds): Bounds => {
  const DEGRESS = 8;
  const newBounds: Bounds = {
    north: bounds.north + DEGRESS,
    south: bounds.south - DEGRESS,
    west: bounds.west - DEGRESS,
    east: bounds.east + DEGRESS,
  };
  return newBounds;
};

const boundsOverflow = (boundsChild: Bounds, boundsParent: Bounds): boolean => {
  if (
    boundsChild.north <= boundsParent.north &&
    boundsChild.south >= boundsParent.south &&
    boundsChild.west >= boundsParent.west &&
    boundsChild.east <= boundsParent.east
  ) {
    return false;
  }

  return true;
};

export default function PetsOnMap() {
  const [petsBounds, setPetsBounds] = useState<Bounds | null>(null);
  // const [pets, setPets] = useState<Pet[]>([]);
  const { coords, isLoading, isError } = useCoords();
  const { toast } = useToast();

  const router = useRouter();

  const {
    data: pets,
    isFetching,
    isError: queryIsError,
    refetch,
  } = useQuery({
    queryKey: ['pets', 'on-map', petsBounds],
    queryFn: () => {
      if (petsBounds) return getPetsOnMap(petsBounds);
    },
    staleTime: Infinity,
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (!petsBounds) {
      const newBounds = createBoundryFromCenter(
        coords || {
          lat: 51.5074,
          lng: -0.1278,
        }
      );
      setPetsBounds(newBounds);
      return;
    }
  }, [petsBounds, coords]);

  useEffect(() => {
    refetch();
  }, [petsBounds]);

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'Allow geolocation to see most relevant data.',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (queryIsError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'Could not fetch data.',
        // action: (
        //   <ToastAction onClick={() => refetch()} altText="Reload to retry">
        //     Retry
        //   </ToastAction>
        // ),
      });
    }
  }, [queryIsError]);

  const changeBounds = useDebounce((_, bounds: Bounds) => {
    if (!petsBounds) return;

    const currentBoundsOverflow = boundsOverflow(bounds, petsBounds);
    if (currentBoundsOverflow) {
      const newBounds = createBoundryFromBounds(bounds);
      setPetsBounds(newBounds);
    }
  }, 700);

  if (isLoading) {
    return <p>Please wait...</p>;
  }

  return (
    <Map
      style={{ width: '100%', height: '100%' }}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
      defaultZoom={13}
      minZoom={11}
      defaultCenter={
        coords || {
          lat: 51.5074,
          lng: -0.1278,
        }
      }
      disableDefaultUI={true}
      clickableIcons={false}
      onCenterChanged={e => {
        const { center, bounds } = e.detail;
        changeBounds(center, bounds);
      }}
    >
      {pets &&
        pets.map(pet => (
          <AdvancedMarker
            key={pet.id}
            position={pet.last_seen_location}
            onClick={() => router.push(`/application/pet/${pet.id}`)}
            className="relative"
          >
            <img
              src="/pet-marker.png"
              className="h-14 absolute z-50 bottom-1/2 right-1/2 translate-x-1/2"
            />
            <div className="h-1 w-4 bg-black/80 blur-[2px] rounded-[100%] absolute z-40 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 pointer-events-none" />
          </AdvancedMarker>
        ))}
    </Map>
  );
}
