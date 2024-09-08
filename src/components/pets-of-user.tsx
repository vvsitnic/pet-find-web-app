'use client';

import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getQueryClient } from './provider';
import { deletePet, getPetOfUser } from '@/actions/pets';

import { Button } from './ui/button';

import { useToast } from './ui/use-toast';

import LoadingCircle from './loading-sircle';
import Link from 'next/link';

import { Trash2Icon, ExternalLinkIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const PetsOfUser = ({ userId }: { userId: string }) => {
  const queryClient = getQueryClient();
  const { toast } = useToast();

  const {
    data: pets,
    isLoading,
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
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: `An aunexpected error occured while deleting.`,
      });
    },
  });

  if (isLoading) {
    return (
      <div className="h-1/2">
        <LoadingCircle />
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="h-1/2 flex flex-col items-center justify-center text-center gap-3">
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
      <div className="h-1/2 flex flex-col items-center justify-center text-center gap-3">
        <h2 className="text-3xl">No pets yet</h2>
      </div>
    );
  }

  const postBtn =
    pets!.length < 10 ? (
      <Link
        href="/application/post-pet"
        className="h-16 text-lg mb-8 bg-[#8a2be2] hover:bg-[#a155e8] text-white rounded-lg flex items-center justify-center transition-colors"
      >
        Post pet
      </Link>
    ) : (
      <p>Limit reached!</p>
    );

  return (
    <>
      {pets && postBtn}
      <div className="grid gap-10 w-full overflow-auto no-scrollbar pb-4">
        {pets?.map(pet => (
          <div key={pet.id} className="relative flex gap-4">
            <img
              src={pet.image_url}
              alt={`Photo of ${pet.name}`}
              className="h-32 rounded-sm"
            />
            <div>
              <h2 className="text-4xl mb-3">{pet.name}</h2>
              <p className="text-slate-600 line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae quibusdam distinctio ipsa dolorum incidunt sed hic
                iure aspernatur temporibus? Ab impedit excepturi natus adipisci
                unde, illo quos perferendis quo in.Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Repudiandae quibusdam distinctio
                ipsa dolorum incidunt sed hic iure aspernatur temporibus? Ab
                impedit excepturi natus adipisci unde, illo quos perferendis quo
                in.Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae quibusdam distinctio ipsa dolorum incidunt sed hic
                iure aspernatur temporibus? Ab impedit excepturi natus adipisci
                unde, illo quos perferendis quo in.
              </p>
            </div>

            <div className="absolute right-0 top-0 flex">
              <Link
                className="block w-fit h-fit m-1 p-2 rounded-md bg-slate-200 hover:bg-slate-300 transition-colors"
                href={`/application/pet/${pet.id}`}
              >
                <ExternalLinkIcon className="size-8" />
              </Link>
              <AlertDialog>
                <AlertDialogTrigger className="p-2 m-1 rounded-md bg-slate-200 hover:bg-slate-300 transition-colors">
                  <Trash2Icon className="size-8" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This pet will permanently be
                      deleted permanently.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutate(pet.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PetsOfUser;
