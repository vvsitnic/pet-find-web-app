import { FaceFrownIcon } from '@heroicons/react/24/outline';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center gap-3">
      <FaceFrownIcon className="text-appPrimary size-12" />
      <h2 className="text-3xl">User not found!</h2>
    </div>
  );
};

export default NotFoundPage;
