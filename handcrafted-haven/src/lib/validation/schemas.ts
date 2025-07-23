import { z } from 'zod';

export const SellerSchema = z.object({
  id: z.uuid(),
  owner_first: z.string(),
  owner_last: z.string(),
  store_name: z.string(),
  store_email: z.string(),
  store_address: z.string(),
  password: z.string(),
});

export const ProductSchema = z.object({
  id: z.coerce.number().int(),
  item_name: z.string(),
  // price in cents will need to convert from dollars to cents when getting from db and back before entering into db.
  item_price_cents: z.coerce.number().transform((val) => Math.round(val * 100)),
  item_stock: z.coerce.number().int().min(0),
  item_description: z.string(),
  seller_id: z.uuid(),
});

export const UserSchema = z.object({
  id: z.uuid(),
  user_first: z.string(),
  user_last: z.string(),
  user_email: z.string(),
  user_address: z.string(),
  is_guest: z.boolean(),
});

export const CartDetailSchema = z.object({
  id: z.coerce.number(),
  cart_id: z.coerce.number(),
  seller_id: z.uuid(),
  product_id: z.coerce.number(),
  quantity: z.coerce.number(),
});

export const OrderSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  user_name: z.string(),
  user_email: z.string(),
  user_address: z.string(),
  // price in cents will need to convert from dollars to cents when getting from db and back before entering into db.
  total_price_cents: z.coerce
    .number()
    .transform((val) => Math.round(val * 100)),
});

export const OrderItemSchema = z.object({
  id: z.coerce.number(),
  order_id: z.uuid(),
  seller_id: z.uuid(),
  store_name: z.string(),
  product_id: z.coerce.number(),
  item_name: z.string(),
  // price in cents will need to convert from dollars to cents when getting from db and back before entering into db.
  item_price_cents: z.coerce.number().transform((val) => Math.round(val * 100)),
  quantity: z.coerce.number(),
});

export const ReviewSchema = z.object({
  id: z.coerce.number(),
  rating: z.coerce.number(),
  product_id: z.coerce.number(),
  seller_id: z.uuid(),
  user_name: z.string(),
  description: z.string(),
});
