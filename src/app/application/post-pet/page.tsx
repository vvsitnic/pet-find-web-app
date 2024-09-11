'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { getQueryClient } from '@/components/provider';
import { postPet } from '@/actions/pets';
import ImageSelector from '@/components/image-selector';
import SelectPlaceMap from '@/components/map/select-place-map';

import { z, ZodError } from 'zod';

import { useToast } from '@/components/ui/use-toast';
import FormError from '@/components/form-error';
import { TriangleAlertIcon } from 'lucide-react';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const petSchema = z.object({
  name: z
    .string()
    .max(50, 'Name can`t exceed 50 characters')
    .min(1, 'Name is required'),
  description: z
    .string()
    .max(3500, 'Description can`t exceed 3500 character')
    .min(1, 'Description is required'),
  image: z
    .any()
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg and .png formats are supported.'
    ),
  coords_lat: z.coerce.number().min(-90).max(90),
  coords_lng: z.coerce.number().min(-180).max(180),
  date_lost: z.string().date(),
  // .refine(date => {
  //   return new Date(date) < new Date(Date.now());
  // }, 'The date must be before today'),
  user_phone_num: z.string().min(1, 'Phone number is required'),
});

const PostPetPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [issues, setIssues] = useState<ZodError | null>(null);
  const queryClient = getQueryClient();
  const { toast } = useToast();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const formDataObject = Object.fromEntries(formData.entries()) as {
        name: string;
        description: string;
        image: any;
        date_lost: string;
        coords_lat: string;
        coords_lng: string;
        user_phone_num: string;
      };

      const parsedData = petSchema.safeParse(formDataObject);

      if (!parsedData.success) {
        setIssues(parsedData.error);
        return;
      }
      setIssues(null);

      const {
        name,
        description,
        date_lost,
        coords_lat,
        coords_lng,
        image,
        user_phone_num,
      } = parsedData.data;

      const dateInMilliseconds = new Date(date_lost).getTime();
      const petData = {
        name,
        description,
        coords: {
          lat: +coords_lat,
          lng: +coords_lng,
        },
        date_lost: dateInMilliseconds,
        user_phone_num,
      };

      const petDataJSON = JSON.stringify(petData);
      const petPostData = new FormData();
      petPostData.append('petImg', image);
      petPostData.append('petData', petDataJSON);

      try {
        const petId = await postPet(petPostData);

        if (petId) {
          await queryClient.invalidateQueries({
            queryKey: ['pets'],
          });
          router.push(`/application/pet/${petId}`);
        }
      } catch (error) {
        // console.error('ERROR: ', error);
        toast({
          variant: 'destructive',
          title: 'Oops!',
          description: `An unexpected error occured while posting!`,
        });
      }
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-10 mb-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Post a Lost Pet
        </h1>
        <p className="text-gray-500 text-sm">
          Help others find your pet by filling out the form below
        </p>
      </div>
      <form className="px-4 w-full" onSubmit={submitForm}>
        <div className="mb-12">
          <label
            htmlFor="name"
            className="text-2xl font-semibold text-gray-700 mb-4 block"
          >
            Pet name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter the pet's name"
            className="border rounded-xl block p-4 text-2xl w-full mb-2"
            maxLength={50}
            required
          />
        </div>
        <div className="mb-12">
          <label
            htmlFor="description"
            className="text-2xl font-semibold text-gray-700 mb-4 block"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the pet (color, size, etc.)"
            className="border rounded-xl block p-4 text-2xl w-full h-96"
            maxLength={3500}
            required
          />
        </div>
        <div className="mb-12">
          <label
            htmlFor="image"
            className="text-2xl font-semibold text-gray-700 mb-4 block"
          >
            Pet image
          </label>
          <ImageSelector />
        </div>
        <div className="mb-12">
          <label
            htmlFor="date_lost"
            className="text-2xl font-semibold text-gray-700 mb-4 block"
          >
            Pet last seen date
          </label>
          <input
            id="date_lost"
            name="date_lost"
            type="date"
            className="border rounded-xl block p-4 text-2xl w-full"
            required
          />
        </div>
        <div className="mb-12">
          <label
            htmlFor="last-seen-location"
            className="text-2xl font-semibold text-gray-700 mb-4 block"
          >
            Last seen location
          </label>
          <div className="h-fit w-full rounded-b-xl overflow-hidden">
            <SelectPlaceMap mapWidth="100%" mapHeight="450px" />
          </div>
        </div>
        <div className="mb-12">
          <label
            htmlFor="user_phone_num"
            className="text-2xl font-semibold text-gray-700 mb-4 block"
          >
            Phone number
          </label>
          <input
            id="user_phone_num"
            name="user_phone_num"
            type="text"
            placeholder="Enter your phone number"
            className="border rounded-xl block p-4 text-2xl w-full mb-2"
            required
          />
        </div>
        {issues && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-3 text-sm text-destructive mb-3">
            <TriangleAlertIcon className="size-5" />
            <ul className="space-y-2">
              {issues.issues.map(issue => (
                <li className="text-destructive" key={issue.message}>
                  {issue.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="w-full text-white p-3 rounded-md bg-appPrimary hover:bg-appHover1 disabled:bg-appHover1 transition-colors text-xl"
          disabled={isPending}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostPetPage;
