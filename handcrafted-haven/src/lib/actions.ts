'use server';

import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import {
  SellerSchema,
  ProductSchema,
  CartDetailSchema,
  OrderSchema,
  OrderItemSchema,
  ReviewSchema,
} from './validation/schemas';
import 'dotenv/config';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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
        VALUES (${item_name}, ${
      item_price_cents / 100
    }, ${item_stock}, ${item_description}, ${seller_id})
    `;
  } catch (error) {
    console.log(error);
  }
}

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

export async function createCart({ user_id }: { user_id: string }) {
  try {
    const result = await sql`
            INSERT INTO carts (user_id) VALUES (${user_id}) RETURNING id
        `;

    return result[0]?.id;
  } catch (error) {
    console.log(error);
  }
}

const CreateCartDetail = CartDetailSchema.omit({ id: true });

export async function createCartDetail(formData: FormData) {
  const validatedData = CreateCartDetail.safeParse({
    cart_id: formData.get('cart_id'),
    seller_id: formData.get('seller_id'),
    product_id: formData.get('product_id'),
    quantity: formData.get('quantity'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Add to Cart Detail.',
    };
  }

  const { cart_id, seller_id, product_id, quantity } = validatedData.data;

  try {
    await sql`
    INSERT INTO cart_details (cart_id, seller_id, product_id, quantity) VALUES (${cart_id}, ${seller_id}, ${product_id}, ${quantity})
  `;
  } catch (error) {
    console.log(error);
  }
}

const CreateOrder = OrderSchema.omit({ id: true });

export async function createOrder(formData: FormData) {
  const validatedData = CreateOrder.safeParse({
    user_id: formData.get('user_id'),
    user_name: formData.get('user_name'),
    user_email: formData.get('user_email'),
    user_address: formData.get('user_address'),
    total_price_cents: formData.get('total_price'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Create Order.',
    };
  }

  const { user_id, user_name, user_email, user_address, total_price_cents } =
    validatedData.data;

  try {
    await sql`
        INSERT INTO orders (user_id, user_name, user_email, user_address, total_price) VALUES (${user_id}, ${user_name}, ${user_email}, ${user_address}, ${
      total_price_cents / 100
    })
    `;
  } catch (error) {
    console.log(error);
  }
}

const CreateOrderItem = OrderItemSchema.omit({ id: true });

export async function createOrderItem(formData: FormData) {
  const validatedData = CreateOrderItem.safeParse({
    order_id: formData.get('order_id'),
    seller_id: formData.get('seller_id'),
    store_name: formData.get('store_name'),
    product_id: formData.get('product_id'),
    item_name: formData.get('item_name'),
    item_price_cents: formData.get('item_price'),
    quantity: formData.get('quantity'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Create Order.',
    };
  }

  const {
    order_id,
    seller_id,
    store_name,
    product_id,
    item_name,
    item_price_cents,
    quantity,
  } = validatedData.data;

  try {
    await sql`
        INSERT INTO order_items (order_id, seller_id, store_name, product_id, item_name, item_price, quantity) VALUES (${order_id}, ${seller_id}, ${store_name}, ${product_id}, ${item_name}, ${
      item_price_cents / 100
    }, ${quantity})
    `;
  } catch (error) {
    console.log(error);
  }
}

const CreateReview = ReviewSchema.omit({ id: true });

export async function createReview(formData: FormData) {
  const validatedData = CreateReview.safeParse({
    rating: formData.get('rating'),
    product_id: formData.get('product_id'),
    seller_id: formData.get('seller_id'),
    user_name: formData.get('user_name'),
    description: formData.get('description'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Create Order.',
    };
  }

  const { rating, product_id, seller_id, user_name, description } =
    validatedData.data;

  try {
    await sql`
     INSERT INTO reviews (rating, product_id, seller_id, user_name, description) VALUES (${rating}, ${product_id}, ${seller_id}, ${user_name}, ${description})
    `;
  } catch (error) {
    console.log(error);
  }
}
