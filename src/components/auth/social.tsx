'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Button } from '../ui/button';
// import { getGoogleOAuthConsentUrl } from '@/actions/auth';

export default function Social() {
  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        // onClick={async () => {
        //   const res = await getGoogleOAuthConsentUrl();

        //   if (res.url) {
        //     window.location.href = res.url;
        //   }
        // }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaFacebook className="h-5 w-5" />
      </Button>
    </div>
  );
}
