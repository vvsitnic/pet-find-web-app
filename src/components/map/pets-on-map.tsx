'use client';

import { useEffect, useState } from 'react';

import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useDebounce, useCoords } from '@/hooks';

import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import { getPetsOnMap } from '@/actions/pets';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import petMarkerStyles from './pet-marker.module.css';
import LoadingCircle from '../loading-sircle';

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

const defaultCenterCoords = {
  lat: 51.5074,
  lng: -0.1278,
};

export default function PetsOnMap() {
  const { coords, isLoading, isError: coordsError } = useCoords();
  const [petsBounds, setPetsBounds] = useState<Bounds | null>(null);

  const { toast } = useToast();

  const router = useRouter();

  const {
    data: pets,
    isFetching,
    isError: queryError,
    refetch,
  } = useQuery({
    queryKey: ['pets', 'on-map', petsBounds],
    queryFn: () => getPetsOnMap(petsBounds!),
    staleTime: 1000 * 60 * 60,
    enabled: !!petsBounds,
  });

  // If coords were, set create boundry
  useEffect(() => {
    if (coords) {
      const newBounds = createBoundryFromCenter(coords);
      setPetsBounds(newBounds);
    }
  }, [coords]);

  // If coords access denied, create default boundry of 'defaultCenterCoords'
  // For everything to work visiaully map component has to have that center as a backup
  useEffect(() => {
    if (coordsError) {
      const newBounds = createBoundryFromCenter(defaultCenterCoords);
      setPetsBounds(newBounds);

      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'Allow geolocation to see most relevant data.',
      });
    }
  }, [coordsError]);

  useEffect(() => {
    if (queryError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'Could not fetch data.',
        // Still unsure if I want for toast to have the retry button
        action: (
          <ToastAction onClick={() => refetch()} altText="Reload to retry">
            Retry
          </ToastAction>
        ),
      });
    }
  }, [queryError]);

  const changeBounds = useDebounce((_, bounds: Bounds) => {
    if (!petsBounds) return;

    const currentBoundsOverflow = boundsOverflow(bounds, petsBounds);
    if (currentBoundsOverflow) {
      const newBounds = createBoundryFromBounds(bounds);
      setPetsBounds(newBounds);
    }
  }, 700);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Map
      style={{ width: '100%', height: '100%' }}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
      defaultZoom={13}
      minZoom={11}
      defaultCenter={coords || defaultCenterCoords}
      disableDefaultUI={true}
      clickableIcons={false}
      onCenterChanged={e => {
        const { center, bounds } = e.detail;
        changeBounds(center, bounds);
      }}
    >
      {pets &&
        pets.map((pet, i) => (
          <AdvancedMarker
            key={pet.id}
            position={pet.last_seen_location}
            onClick={() => router.push(`/application/pet/${pet.id}`)}
            className="relative"
            // className={`relative ${petMarkerStyles.marker}`}
            // style={{ animationDelay: `${i * 40}ms` }}
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
