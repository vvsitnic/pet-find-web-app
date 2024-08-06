'use server';

import authConfig from '@/auth.config';
import NextAuth from 'next-auth';

// const {  } = NextAuth(authConfig);

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
  try {
    const response = await fetch(
      `http://localhost:${process.env.PET_API_PORT}/pets/on-map?bllat=${bounds.south}&bllng=${bounds.west}&urlat=${bounds.north}&urlng=${bounds.east}`
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data as Pet[];
  } catch (error) {
    return null;
  }
};

export const getPetsNearby = async (coords: Coords) => {
  try {
    const response = await fetch(
      `http://localhost:${process.env.PET_API_PORT}/pets/nearby?lat=${coords.lat}&lng=${coords.lng}&d=10000&img=true`
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data as Pet[];
  } catch (error) {
    return null;
  }
};

export const getPetById = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:${process.env.PET_API_PORT}/pets/${id}?img=true`
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data as Pet;
  } catch (error) {
    return null;
  }
};

export const getPetOfUser = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:${process.env.PET_API_PORT}/pets/of-user/${id}`
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data as Pet[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const postPet = async () => {
  try {
  } catch (error) {}
};
