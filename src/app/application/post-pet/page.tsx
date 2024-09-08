'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { getQueryClient } from '@/components/provider';
import { postPet } from '@/actions/pets';
import ImageSelector from '@/components/image-selector';
import SelectPlaceMap from '@/components/map/select-place-map';

import { z, ZodError } from 'zod';

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

  const [issues, setIssues] = useState<ZodError | null>(null);

  const queryClient = getQueryClient();

  return (
    <form
      className="px-4 py-10 mx-auto max-w-[1200px]"
      onSubmit={async e => {
        e.preventDefault();
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

        // const resp = postPet(petPostData);
        // console.log(resp);

        try {
          const petId = await postPet(petPostData);

          if (petId) {
            await queryClient.invalidateQueries({
              queryKey: ['pets'],
            });
            router.push(`/application/pet/${petId}`);
          }
        } catch (error) {
          console.error('ERROR: ', error);
        }
      }}
    >
      <div className="mb-8">
        <label htmlFor="name" className="text-2xl block mb-2 font-bold">
          Pet name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="border rounded-lg block p-2 text-2xl w-full mb-2"
          maxLength={50}
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="description" className="text-2xl block mb-2 font-bold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded-lg block p-2 text-2xl w-full h-96"
          maxLength={3500}
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="image" className="text-2xl block mb-2 font-bold">
          Pet image
        </label>
        <ImageSelector />
      </div>
      <div className="mb-8">
        <label htmlFor="date_lost" className="text-2xl block mb-2 font-bold">
          Pet last seen date
        </label>
        <input
          id="date_lost"
          name="date_lost"
          type="date"
          className="border rounded-lg block p-2 text-2xl w-full"
          required
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="last-seen-location"
          className="text-2xl block mb-2 font-bold"
        >
          Last seen location
        </label>
        <SelectPlaceMap mapWidth="100%" mapHeight="450px" />
      </div>
      <div className="mb-8">
        <label
          htmlFor="user_phone_num"
          className="text-2xl block mb-2 font-bold"
        >
          Phone number
        </label>
        <input
          id="user_phone_num"
          name="user_phone_num"
          type="text"
          className="border rounded-lg block p-2 text-2xl w-full mb-2"
          required
        />
      </div>
      {issues &&
        issues.issues.map(issue => (
          <p className="text-destructive mb-2" key={issue.message}>
            {issue.message}
          </p>
        ))}
      <button
        type="submit"
        className="w-full text-white p-3 rounded-md bg-[#8a2be2] hover:bg-[#a155e8] transition-colors text-xl"
      >
        Submit
      </button>
    </form>
  );
};

export default PostPetPage;
