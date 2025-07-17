'use server';

import postgres from 'postgres';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { forbidden } from 'next/navigation';

const sql = await postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const SellerSchema = z.object({
  id: z.uuid(),
  owner_first: z.string(),
  owner_last: z.string(),
  store_name: z.string(),
  store_email: z.string(),
  store_address: z.string(),
  password: z.string(),
});

const CreateSeller = SellerSchema.omit({ id: true });

export async function createSeller(formData: FormData) {
  const validatedData = CreateSeller.safeParse({
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

const ProductSchema = z.object({
  id: z.coerce.number().int(),
  item_name: z.string(),
  item_price_cents: z.number().transform((val) => Math.round(val * 100)),
  item_stock: z.number().int().min(0),
  item_description: z.string(),
  seller_id: z.uuid(),
});

const CreateProduct = ProductSchema.omit({ id: true });

export async function createProduct(formData: FormData) {
  const validatedData = CreateProduct.safeParse({
    item_name: formData.get('item_name'),
    item_price_cents: formData.get('item_price'),
    item_stock: formData.get('item_stock'),
    item_description: formData.get('item_description'),
    seller_id: formData.get('seller_id'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Create Product.',
    };
  }

  const {
    item_name,
    item_price_cents,
    item_stock,
    item_description,
    seller_id,
  } = validatedData.data;

  try {
    await sql`
        INSERT INTO products (item_name, item_price, item_stock, item_description, seller_id)
        VALUES (${item_name}, ${item_price_cents}, ${item_stock}, ${item_description}, ${seller_id})
    `;
  } catch (error) {
    console.log(error);
  }
}

const UserSchema = z.object({
  id: z.uuid(),
  user_first: z.string(),
  user_last: z.string(),
  user_email: z.string(),
  user_address: z.string(),
  is_guest: z.boolean(),
});

export async function createUser() {
  try {
    const result = await sql`
        INSERT INTO users DEFAULT VALUES RETURNING id
    `;
    const user_id = result[0]?.id;
    return user_id;
  } catch (error) {
    console.log(error);
  }
}
