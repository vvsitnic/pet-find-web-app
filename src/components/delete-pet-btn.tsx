'use client';

import { deletePet } from '@/actions/pets';
import React from 'react';

const DeletePetButton = ({ petId }: { petId: string }) => {
  return (
    <button onClick={() => deletePet(petId)} className="text-destructive">
      Delete
    </button>
  );
};

export default DeletePetButton;
