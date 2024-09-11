import React from 'react';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import PetsOfUser from '@/components/pets-of-user';

const SettingsPage = async () => {
  const session = await auth();

  if (!session) return notFound();

  return (
    <div className="max-w-[1400px] px-4 pt-6 mx-auto flex flex-col h-full">
      <h1 className="text-5xl mb-1">{session.user.name}</h1>
      <p className="text-gray-600 mb-8">signed as {session.user.email}</p>
      <PetsOfUser userId={session.user.id!} />
    </div>
  );
};

export default SettingsPage;

/*
<div className="bg-gray-200 rounded-lg p-4 flex gap-3 flex-col sm:flex-row">
          <div className="flex-grow flex gap-3">
            <img
              className="h-44 w-44 rounded-full object-cover shrink-0"
              src="/petfind-icon-small.png"
              alt="Photo of __"
            />
            <div className="flex-grow flex flex-col gap-2">
              <h1 className="text-5xl">Oscar</h1>
              <p className="flex-grow overflow-hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                accusamus magnam atque facere consectetur deserunt esse tempore,
                cum, asperiores quam veritatis in repellendus accusantium libero
                iusto dolorem rem! Aliquam, obcaecati!
              </p>
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
*/
