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
  // try {
  console.log(bounds);
  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/on-map?bllat=${bounds.south}&bllng=${bounds.west}&urlat=${bounds.north}&urlng=${bounds.east}`
  );

  // if (!response.ok) {
  //   throw new Error();
  // }

  const data = await response.json();
  console.log(data);
  return data as Pet[];
  // } catch (error) {
  //   throw new Error('An unexpected error occured!');
  // }
};

export const getPetsNearby = async (coords: Coords) => {
  // try {
  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/nearby?lat=${coords.lat}&lng=${coords.lng}&d=10000&img=true`
  );

  // if (!response.ok) {
  //   throw new Error();
  // }

  const data = await response.json();
  return data as Pet[];
  // } catch (error) {
  //   throw new Error('An unexpected error occured!');
  // }
};

export const getPetById = async (id: string) => {
  // try {
  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/${id}?img=true`
  );

  // if (!response.ok) {
  //   throw new Error();
  // }

  const data = await response.json();
  return data as Pet;
  // } catch (error) {
  //   throw new Error('An unexpected error occured!');
  // }
};

export const getPetOfUser = async (id: string) => {
  // try {
  const response = await fetch(
    `http://localhost:${process.env.PET_API_PORT}/pets/of-user/${id}?img=true`
  );

  // if (!response.ok) {
  //   throw new Error();
  // }

  const data = await response.json();
  return data as Pet[];
  // } catch (error) {
  //   console.log(error);
  //   throw new Error('An unexpected error occured!');
  // }
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

  // if (!response.ok) {
  //   const { message } = await response.json();
  //   const error = new Error(message || 'An error occured while fetching');
  //   error.status = response.status;
  //   throw error;
  // }

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
    }
  );

  // if (!response.ok) {
  //   const { message } = await response.json();
  //   const error = new Error(message || 'An error occured while fetching');
  //   error.status = response.status;
  //   throw error;
  // }

  const data = await response.json();
  return data;
};
