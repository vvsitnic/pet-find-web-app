'use client';

import { Button } from '../ui/button';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { DEFAULT_REDIRECT } from '../../routes';

export default function Social() {
  const onClick = (provider: 'google' | 'facebook') => {
    signIn(provider, { callbackUrl: DEFAULT_REDIRECT });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      {/* <Button size="lg" className="w-full" variant="outline">
        <FaFacebook className="h-5 w-5" />
      </Button> */}
    </div>
  );
}
