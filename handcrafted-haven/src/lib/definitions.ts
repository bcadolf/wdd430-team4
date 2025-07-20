// Setting type for all tables in the db

import { UUID } from 'crypto';

export type Seller = {
  id: UUID;
  owner_first: string;
  owner_last: string;
  store_name: string;
  store_email: string;
  store_address: string;
  password: string;
};

export type Product = {
  id: number;
  item_name: string;
  // price in cents will need to convert from dollars to cents when getting from db and back before entering into db.
  item_price_cents: number;
  item_stock: number;
  item_description: string;
  seller_id: UUID;
};

export type User = {
  id: UUID;
  user_first: string;
  user_last: string;
  user_email: string;
  user_address: string;
  is_guest: boolean;
};

export type Cart = {
  id: number;
  user_id: UUID;
};

export type CartDetail = {
  id: number;
  cart_id: number;
  seller_id: UUID;
  product_id: number;
  quantity: number;
};

export type Order = {
  id: UUID;
  user_id: UUID;
  user_name: string;
  user_email: string;
  user_address: string;
  // price in cents will need to convert from dollars to cents when getting from db and back before entering into db.
  total_price_cents: number;
};

export type OrderItem = {
  id: number;
  order_id: UUID;
  seller_id: UUID;
  store_name: string;
  product_id: number;
  item_name: string;
  // price in cents will need to convert from dollars to cents when getting from db and back before entering into db.
  item_price_cents: number;
  quantity: number;
};

export type Reviews = {
  id: number;
  rating: number;
  product_id: number;
  seller_id: UUID;
  user_name: string;
  description: string;
};
