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
  UserSchema,
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
    seller_image: formData.get('seller_image') ?? '',
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
    seller_image = '',
  } = validatedData.data;

  const hashedpassword = await bcrypt.hash(password, 12);

  try {
    const result = await sql`
        INSERT INTO sellers (owner_first,owner_last, store_name, store_email, store_address, password, seller_image)
        VALUES (${owner_first}, ${owner_last}, ${store_name}, ${store_email}, ${store_address}, ${hashedpassword}, ${seller_image}) RETURNING id
    `;

    const seller_id = result[0]?.id;
    return seller_id;
  } catch (error) {
    console.log(error);
  }
}

const UpdateSeller = SellerSchema.partial();

export async function updateSeller(formData: FormData) {
  const rawData = {
    id: formData.get('seller_id'),
    owner_first: formData.get('owner_first') ?? undefined,
    owner_last: formData.get('owner_last') ?? undefined,
    store_name: formData.get('store_name') ?? undefined,
    store_email: formData.get('store_email') ?? undefined,
    store_address: formData.get('store_address') ?? undefined,
    password: formData.get('password') ?? undefined,
  };

  const validatedData = UpdateSeller.safeParse(rawData);

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Update Seller.',
    };
  }

  const { id } = validatedData.data;
  console.log(id);
  if (typeof id !== 'string') {
    throw new Error('Invalid ID type');
  }
  const updatedFields = Object.entries(validatedData.data)
    .filter(([key, value]) => key !== 'id' && value !== undefined)
    .map(([key, value]) => {
      if (value === null) return `${key} = NULL`;
      if (typeof value === 'string') {
        const escaped = value.replace(/'/g, "''"); // Escape single quotes
        return `${key} = '${escaped}'`;
      }
      return `${key} = ${value}`;
    })
    .join(', ');

  try {
    await sql`
      UPDATE sellers
      SET ${sql.unsafe(updatedFields)}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSeller(seller_id: string) {
  if (typeof seller_id !== 'string') {
    throw new Error('Invalid ID type');
  }
  try {
    await sql`
      DELETE FROM sellers
      WHERE id = ${seller_id}
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
    item_image: formData.get('item_image'),
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
    item_image,
  } = validatedData.data;

  try {
    await sql`
        INSERT INTO products (item_name, item_price, item_stock, item_description, seller_id, item_image)
        VALUES (${item_name}, ${
      item_price_cents / 100
    }, ${item_stock}, ${item_description}, ${seller_id}, ${item_image})
    `;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(formData: FormData) {
  const validatedData = ProductSchema.partial().safeParse({
    id: formData.get('product_id'),
    item_name: formData.get('item_name') ?? undefined,
    item_price_cents: formData.get('item_price') ?? undefined,
    item_stock: formData.get('item_stock') ?? undefined,
    item_description: formData.get('item_description') ?? undefined,
    seller_id: formData.get('seller_id') ?? undefined,
    item_image: formData.get('item_image') ?? undefined,
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Update Product.',
    };
  }
  const { id } = validatedData.data;
  if (typeof id !== 'number') {
    throw new Error('Invalid ID type');
  }
  const updatedFields = Object.entries(validatedData.data)
    .filter(([key, value]) => key !== 'id' && value !== undefined)
    .map(([key, value]) => {
      if (value === null) return `${key} = NULL`;

      if (key === 'item_price_cents') {
        if (typeof value !== 'number') {
          throw new Error('item_price_cents must be a number');
        }
        return `item_price = ${value / 100}`;
      }
      if (typeof value === 'string') {
        const escaped = value.replace(/'/g, "''"); // Escape single quotes
        return `${key} = '${escaped}'`;
      }

      return `${key} = ${value}`;
    })
    .join(', ');

  try {
    await sql`
      UPDATE products
      SET ${sql.unsafe(updatedFields)}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(product_id: number) {
  if (typeof product_id !== 'number') {
    throw new Error('Invalid ID type');
  }
  try {
    await sql`
      DELETE FROM products
      WHERE id = ${product_id}
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

export async function updateUser(formData: FormData) {
  const validatedData = UserSchema.partial().safeParse({
    id: formData.get('user_id'),
    user_first: formData.get('user_first'),
    user_last: formData.get('user_last'),
    user_email: formData.get('user_email'),
    user_address: formData.get('user_address'),
    is_guest: formData.get('is_guest') === 'true',
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Update User.',
    };
  }

  const { id } = validatedData.data;
  if (typeof id !== 'string') {
    throw new Error('Invalid ID type');
  }

  validatedData.data.is_guest = false; // Ensure is_guest is always false for updates

  const updatedFields = Object.entries(validatedData.data)
    .filter(([key, value]) => key !== 'id' && value !== undefined)
    .map(([key, value]) => {
      if (value === null) return `${key} = NULL`;
      if (typeof value === 'string') {
        const escaped = value.replace(/'/g, "''"); // Escape single quotes
        return `${key} = '${escaped}'`;
      }
      return `${key} = ${value}`;
    })
    .join(', ');

  try {
    await sql`
      UPDATE users
      SET ${sql.unsafe(updatedFields)}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(user_id: string) {
  if (typeof user_id !== 'string') {
    throw new Error('Invalid ID type');
  }
  try {
    await sql`
      DELETE FROM users
      WHERE id = ${user_id}
    `;
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

export async function deleteCart(cart_id: number) {
  if (typeof cart_id !== 'number') {
    throw new Error('Invalid ID type');
  }
  try {
    await sql`
      DELETE FROM carts
      WHERE id = ${cart_id}
    `;
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
    INSERT INTO cart_details (cart_id, seller_id, product_id, quantity) VALUES (${cart_id}, ${seller_id}, ${product_id}, ${quantity}) ON CONFLICT (cart_id, product_id) DO UPDATE SET quantity = cart_details.quantity + ${quantity}
  `;
  } catch (error) {
    console.log(error);
  }
}

const UpdateCartDetail = CartDetailSchema.partial();

// for this function to work optimally the form must submit the cart_detail_id and only the fields that need to be updated.
export async function updateCartDetail(formData: FormData) {
  const validatedData = UpdateCartDetail.safeParse({
    id: formData.get('cart_detail_id'),
    cart_id: formData.get('cart_id') ?? undefined,
    seller_id: formData.get('seller_id') ?? undefined,
    product_id: formData.get('product_id') ?? undefined,
    quantity: formData.get('quantity') ?? undefined,
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Update Cart Detail.',
    };
  }

  const { id } = validatedData.data;
  if (typeof id !== 'number') {
    throw new Error('Invalid ID type');
  }
  const updatedFields = Object.entries(validatedData.data)
    .filter(([key, value]) => key !== 'id' && value !== undefined)
    .map(([key, value]) => {
      if (value === null) return `${key} = NULL`;
      if (typeof value === 'string') {
        const escaped = value.replace(/'/g, "''"); // Escape single quotes
        return `${key} = '${escaped}'`;
      }
      return `${key} = ${value}`;
    })
    .join(', ');

  try {
    await sql`
      UPDATE cart_details
      SET ${sql.unsafe(updatedFields)}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCartDetail(cart_detail_id: number) {
  if (typeof cart_detail_id !== 'number') {
    throw new Error('Invalid ID type');
  }
  try {
    await sql`
      DELETE FROM cart_details
      WHERE id = ${cart_detail_id}
    `;
  } catch (error) {
    console.log(error);
  }
}

export async function addProductToCart({
  cart_id,
  product_id,
  seller_id,
  quantity,
}: {
  cart_id: string;
  product_id: string;
  seller_id: string;
  quantity: number;
}) {
  const validatedData = CreateCartDetail.safeParse({
    cart_id: cart_id,
    seller_id: seller_id,
    product_id: product_id,
    quantity: quantity,
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error,
      message: 'Missing or Invalid Information. Failed to Add to Cart Detail.',
    };
  }
  try {
    await sql`
      INSERT INTO cart_details (cart_id, product_id, seller_id, quantity)
      VALUES (${cart_id}, ${product_id}, ${seller_id}, ${quantity}) ON CONFLICT (cart_id, product_id) DO UPDATE SET quantity = cart_details.quantity + ${quantity}
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

export async function createReview(data: any) {
  const validatedData = CreateReview.safeParse({
    rating: data.rating,
    product_id: data.product_id,
    seller_id: data.seller_id,
    user_name: data.user_name,
    description: data.description,
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.format(),
      message: 'Missing or Invalid Information. Failed to Create Order.',
    };
  }

  const { rating, product_id, seller_id, user_name, description } =
    validatedData.data;

  try {
    await sql`
     INSERT INTO reviews (rating, product_id, seller_id, user_name, description) VALUES (${rating}, ${product_id}, ${seller_id}, ${user_name}, ${description})
    `;
    return { success: true};
  } catch (error) {
    console.log(error);
    return { succes: false, error: error instanceof Error ? error.message: String(error)}
  }
}

export async function deleteReview(review_id: number) {
  if (typeof review_id !== 'number') {
    throw new Error('Invalid ID type');
  }
  try {
    await sql`
      DELETE FROM reviews
      WHERE id = ${review_id}
    `;
  } catch (error) {
    console.log(error);
  }
}
