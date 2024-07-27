'use client';

import { useEffect, useState } from 'react';

import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useDebounce, useCoords } from '@/hooks';

import { Pet } from '@/pets';

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
  const [pets, setPets] = useState<Pet[]>([]);
  const { coords, isLoading } = useCoords();

  useEffect(() => {
    if (!petsBounds) {
      if (coords) {
        const newBounds = createBoundryFromCenter(coords);
        setPetsBounds(newBounds);
      }
      return;
    }
    const fetchPets = async () => {
      const response = await fetch(
        `http://localhost:2000/pets/on-map?bllat=${petsBounds.south}&bllng=${petsBounds.west}&urlat=${petsBounds.north}&urlng=${petsBounds.east}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPets(data);
      }
    };
    fetchPets();
  }, [petsBounds, coords]);

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
      {pets.map(pet => (
        <AdvancedMarker key={pet.id} position={pet.last_seen_location} />
      ))}
    </Map>
  );
}
