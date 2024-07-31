'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { SignupSchema } from '@/index';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'Invalid credentials!' };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: 'User created!' };
};
