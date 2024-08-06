import type { Metadata } from 'next';

import PetsNearby from '@/components/pets-nearby';
import { Pet } from '@/pets';

export const metadata: Metadata = {
  title: 'Pets Nearby - PetFind',
};

const PetsNearbyPage = () => {
  return <PetsNearby />;
};

export default PetsNearbyPage;
