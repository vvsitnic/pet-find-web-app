import React from 'react';
import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPetOfUser } from '@/actions/pets';
import { notFound } from 'next/navigation';
import { PhoneIcon } from 'lucide-react';

const SettingsPage = async () => {
  const session = await auth();

  if (!session) return notFound();

  const pets = await getPetOfUser(session.user.id!);
  console.log(pets);

  return (
    <div className="max-w-[1400px] px-4 pt-6 mx-auto flex flex-col h-screen">
      <h1 className="text-5xl mb-1">{session.user.name}</h1>
      <p className="text-gray-600 mb-8">signed as {session.user.email}</p>
      <Link
        href="/application/post-pet"
        className="h-16 text-lg mb-4 bg-[#8a2be2] hover:bg-[#a155e8] text-white rounded-lg flex items-center justify-center transition-colors"
      >
        Post pet
      </Link>
      <div className="grid gap-4 w-full overflow-auto no-scrollbar pb-4">
        {/* {pets?.map(pet => (
          <div className="bg-gray-200 rounded-lg h-52 p-4 flex">
            <div className="h-full aspect-square rounded-full bg-gray-400 shrink-0"></div>
            <div className="ml-auto w-32 flex flex-col gap-3">
              <div className="bg-gray-400 h-full rounded-md"></div>
              <div className="bg-gray-400 h-full rounded-md"></div>
            </div>
          </div>
        ))} */}
        <div className="bg-gray-200 rounded-lg p-4 flex gap-3 flex-col sm:flex-row">
          <div className="flex-grow flex gap-3">
            <img
              className="h-44 w-44 rounded-full object-cover shrink-0"
              src="/petfind-icon-small.png"
              alt="Photo of __"
            />
            <div className="flex-grow flex flex-col gap-2">
              <h1 className="text-5xl">Oscar</h1>
              {/* <p className="flex-grow overflow-hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                accusamus magnam atque facere consectetur deserunt esse tempore,
                cum, asperiores quam veritatis in repellendus accusantium libero
                iusto dolorem rem! Aliquam, obcaecati!
              </p> */}
              <div className="flex gap-2">
                <PhoneIcon />
                <p className="text-lg self-end">87871239</p>
              </div>
            </div>
          </div>
          <Button
            variant="destructive"
            className="h-full text-xl justify-self-end"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
