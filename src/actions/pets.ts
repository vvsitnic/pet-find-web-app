'use server';

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

export const fetchPetsOnMap = async (bounds: Bounds) => {
  try {
    const response = await fetch(
      `http://localhost:2000/pets/on-map?bllat=${bounds.south}&bllng=${bounds.west}&urlat=${bounds.north}&urlng=${bounds.east}`
    );

    if (response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchPetsNearby = async (coords: Coords) => {
  try {
    const response = await fetch(
      `http://localhost:2000/pets/nearby?lat=${coords.lat}&lng=${coords.lng}&d=10000&img=true`
    );

    if (response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const postPet = async () => {
  try {
  } catch (error) {}
};
