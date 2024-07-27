import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { forwardRef, useImperativeHandle } from 'react';

// async function getPetMarkers({ map, signal }) {
//   if (!map) return [];

//   const ne = map.getBounds().getNorthEast();
//   const sw = map.getBounds().getSouthWest();
//   const bllat = sw.lat();
//   const bllng = sw.lng();
//   const urlat = ne.lat();
//   const urlng = ne.lng();

//   const response = await fetch(
//     `http://localhost:3000/pets/on-map?bllat=${bllat}&bllng=${bllng}&urlat=${urlat}&urlng=${urlng}&f=petName+id+location+petImage`,
//     { signal: signal }
//   );

//   if (!response.ok) throw new Error('Failed to fetch');

//   const resData = await response.json();
//   return resData;
// }

export interface PetMarkersHandle {
  handleLocationChange: () => void;
}

const PetsMarkers = forwardRef<PetMarkersHandle>((_, ref) => {
  useImperativeHandle(ref, () => ({
    handleLocationChange: () => {
      console.log('Location changed');
    },
  }));

  //   const map = useMap();

  //   const {
  //     data: pets,
  //     isFetching,
  //     isError,
  //     error,
  //     refetch,
  //   } = useQuery({
  //     queryKey: ['pets', 'on-map'],
  //     queryFn: ({ signal }) => {
  //       return getPetMarkers({ signal, map });
  //     },
  //     initialData: [],
  //     enabled: false,
  //     retry: false,
  //   });

  //   useEffect(() => {
  //     refetch();
  //   }, [coords]);

  //   return pets.map((pet: { id: number }) => {
  //     return <AdvancedMarker key={pet.id} />;
  //   });
  return null;
});

export default PetsMarkers;
