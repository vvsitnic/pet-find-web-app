'use client';

import { Button } from '../ui/button';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function Social() {
  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <Button size="lg" className="w-full" variant="outline">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline">
        <FaFacebook className="h-5 w-5" />
      </Button>
    </div>
  );
}
