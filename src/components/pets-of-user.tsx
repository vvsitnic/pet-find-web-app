'use client';

import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getQueryClient } from './provider';
import { deletePet, getPetOfUser } from '@/actions/pets';

import { TriangleAlert } from 'lucide-react';
import { Button } from './ui/button';

import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

import LoadingCircle from './loading-sircle';
import Link from 'next/link';

const PetsOfUser = ({ userId }: { userId: string }) => {
  const queryClient = getQueryClient();
  const { toast } = useToast();

  const {
    data: pets,
    isFetching,
    isError: queryError,
    refetch,
  } = useQuery({
    queryKey: ['pets', 'of-user', userId],
    queryFn: () => getPetOfUser(userId),
    staleTime: 1000 * 60 * 60,
  });

  const { mutate } = useMutation({
    mutationFn: (petId: string) => deletePet(petId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['pets'],
      });
    },
    onError: () => {},
  });

  if (isFetching) {
    return <LoadingCircle />;
  }

  if (queryError) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        <TriangleAlert className="text-appPrimary size-12" />
        <h2 className="text-3xl">Oops!</h2>
        <p>An unexpected error occured!</p>
        <Button
          className="bg-[#8a2be2] hover:bg-[#a155e8]"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (pets && pets.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
        {/* <FaceFrownIcon className="text-appPrimary size-12" /> */}
        <h2 className="text-3xl">No pets yet</h2>
      </div>
    );
  }

  const postBtn =
    pets!.length < 10 ? (
      <Link
        href="/application/post-pet"
        className="h-16 text-lg mb-4 bg-[#8a2be2] hover:bg-[#a155e8] text-white rounded-lg flex items-center justify-center transition-colors"
      >
        Post pet
      </Link>
    ) : (
      <p>Limit reached!</p>
    );

  return (
    <>
      {pets && postBtn}
      <div className="grid gap-4 w-full overflow-auto no-scrollbar pb-4">
        {pets?.map(pet => (
          <div key={pet.id}>
            <img
              src={pet.image_url}
              alt={`Photo of ${pet.name}`}
              className="size-20"
            />
            <span>
              <Link href={`/application/pet/${pet.id}`} className="mr-3">
                {pet.name}
              </Link>
            </span>
            <span>
              <button
                onClick={() =>
                  toast({
                    variant: 'destructive',
                    title: 'Are you sure?',
                    description: `Pet ${pet.name} will be deleted permanently.`,
                    action: (
                      <ToastAction
                        onClick={() => mutate(pet.id)}
                        altText="Delete"
                      >
                        Delete
                      </ToastAction>
                    ),
                  })
                }
                className="text-destructive"
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default PetsOfUser;
