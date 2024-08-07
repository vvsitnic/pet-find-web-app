import type { Metadata } from 'next';

import PetsNearby from '@/components/pets-nearby';

export const metadata: Metadata = {
  title: 'Pets Nearby - PetFind',
};

const PetsNearbyPage = () => {
  return <PetsNearby />;
};

export default PetsNearbyPage;
