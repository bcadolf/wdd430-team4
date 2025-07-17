'use server';

import postgres from 'postgres';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const sql = await postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const SellerSchema = z.object({
  owner_first: z.string(),
  owner_last: z.string(),
  store_name: z.string(),
  store_email: z.string(),
  store_address: z.string(),
  password: z.string(),
});

export async function createSeller(formData: FormData) {
  const validatedData = SellerSchema.safeParse({
    owner_first: formData.get('owner_first'),
    owner_last: formData.get('owner_last'),
    store_name: formData.get('store_name'),
    store_email: formData.get('store_email'),
    store_address: formData.get('store_address'),
    password: formData.get('password'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Create Seller.',
    };
  }

  const {
    owner_first,
    owner_last,
    store_name,
    store_email,
    store_address,
    password,
  } = validatedData.data;

  const hashedpassword = await bcrypt.hash(password, 12);

  try {
    await sql`
        INSERT INTO sellers (owner_first,owner_last, store_name, store_email, store_address, password)
        VALUES (${owner_first}, ${owner_last}, ${store_name}, ${store_email}, ${store_address}, ${hashedpassword})
    `;
  } catch (error) {
    console.log(error);
  }
}
