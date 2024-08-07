import React from 'react';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const AuthErrorPage = () => {
  return (
    <div className="w-[400px]">
      <Image
        height={35}
        width={168}
        src="/petfind-logo.png"
        alt="PetFind Logo"
        className="mx-auto mb-6"
        priority
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-destructive">
            Oops! Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" w-full flex items-center justify-center">
            <ExclamationTriangleIcon className="size-10 text-destructive" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full" asChild>
            <Link href="/auth/login">Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthErrorPage;
