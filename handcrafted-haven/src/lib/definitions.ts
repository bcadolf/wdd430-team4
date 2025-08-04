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
  seller_image: string;
};

export type SellerFields = 'id' | 'store_name' | 'store_email';

export type SellerSQLParam = {
  field: SellerFields;
  value: string | number | UUID;
};

export type Product = {
  id: number;
  item_name: string;
  // price in cents will need to convert from dollars to cents when getting from db and back before entering into db.
  item_price_cents: number;
  item_stock: number;
  item_description: string;
  seller_id: UUID;
  item_image: string;
  category:
    | 'electronics'
    | 'kitchen'
    | 'decor'
    | 'furniture'
    | 'jewelry'
    | 'clothes'
    | 'outdoor'
    | 'tools'
    | 'shoes'
    | 'tableware'
    | 'cutlery'
    | 'accessories'
    | 'art';
};

export type ProductFields =
  | 'id'
  | 'item_name'
  | 'item_price_cents'
  | 'item_price'
  | 'seller_id'
  | 'item_image';

export type ProductSQLParam = {
  field: ProductFields;
  value: string | number | UUID;
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

export type CartWithItems = {
  cart_id: number;
  user_id: UUID;
  items: {
    cart_detail_id: number;
    seller_id: UUID;
    product_id: number;
    quantity: number;
    item_price_cents: number;
    item_stock: number;
    item_name: string;
  }[];
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

export type ReviewFields = 'seller_id' | 'product_id';

export type ReviewSQLParams = {
  field: ReviewFields;
  value: string | number;
};
