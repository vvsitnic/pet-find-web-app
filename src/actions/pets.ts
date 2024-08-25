'use server';

import { auth } from '@/auth';

export interface Bounds {
  north: number;
  south: number;
  west: number;
  east: number;
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface Pet {
  id: string;
  name: string;
  description: string;
  last_seen_location: Coords;
  date_lost: number;
  user_phone_num: string;
  image_url?: string;
}

export const getPetsOnMap = async (bounds: Bounds) => {
  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/on-map?bllat=${bounds.south}&bllng=${bounds.west}&urlat=${bounds.north}&urlng=${bounds.east}`
  );

  const data = await response.json();
  return data as Pet[];
};

export const getPetsNearby = async (coords: Coords, inputText: string) => {
  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/nearby?lat=${coords.lat}&lng=${coords.lng}&d=12000&inputText=${inputText}&img=true`
  );

  const data = await response.json();
  return data as Pet[];
};

export const getPetById = async (id: string) => {
  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/${id}?img=true`
  );

  const data = await response.json();
  return data as Pet;
};

export const getPetOfUser = async (id: string) => {
  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/of-user/${id}?img=true`
  );

  const data = await response.json();
  return data as Pet[];
};

export const postPet = async (petData: any) => {
  const session = await auth();

  if (!session) return;

  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/create/${session.user.id}`,
    {
      method: 'POST',
      body: petData,
    }
  );

  const data = await response.json();
  return data.id as string;
};

export const deletePet = async (id: string) => {
  const session = await auth();

  if (!session) return;

  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/${id}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id }),
    }
  );

  const data = await response.json();
  return data;
};
