import postgres from 'postgres';
import {
  CartWithItems,
  SellerSQLParam,
  SellerFields,
  ProductSQLParam,
  ProductFields,
  ReviewSQLParams,
  ReviewFields,
} from './definitions';

// call the db
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// used to get all the data needed for the cart ui display. will be returned as an array.
export async function getFullCartById({ cart_id }: { cart_id: number }) {
  try {
    const data = await sql<CartWithItems[]>`
        SELECT
        c.id AS cart_id,
        c.user_id,
        cd.id AS cart_detail_id,
        cd.seller_id,
        cd.product_id,
        cd.quantity,
        ROUND(p.item_price * 100)::INT AS item_price_cents,
        p.item_stock,
        p.item_name
        FROM carts c
        JOIN cart_details cd ON cd.cart_id = c.id
        JOIN products p ON p.id = cd.product_id
        WHERE c.id = ${cart_id};
    `;

    return data;
  } catch (error) {
    console.log(error);
  }
}

// one size fits all... kinda its set so the params set in definitions can be used to pull the seller data. Using this reduces having to call a function for each new key/field search.
export async function getSellerByParam(params: SellerSQLParam) {
  try {
    const { field, value } = params;

    const validField: SellerFields[] = ['id', 'store_name', 'store_email'];

    if (!validField.includes(field)) {
      throw new Error(`Invlaid field: ${field}`);
    }

    const returnedFields = [
      'id',
      'owner_first',
      'owner_last',
      'store_name',
      'store_email',
      'store_address',
    ];

    if (field === 'store_email') {
      returnedFields.push('password');
    }

    const query = `
        SELECT ${returnedFields.join(', ')} FROM sellers WHERE ${field} = $1
        `;

    const result = await sql.unsafe(query, [value]);

    return result[0];
  } catch (error) {
    console.log(error);
  }
}

// same multiple params just for the products
export async function getProductByParam(params: ProductSQLParam) {
  try {
    const { field, value } = params;

    const validField: ProductFields[] = [
      'id',
      'item_name',
      'item_price_cents',
      'seller_id',
    ];

    if (!validField.includes(field)) {
      throw new Error(`Invalid field: ${field}`);
    }

    let dbField = field;
    let dbValue = value;

    if (dbField === 'item_price_cents') {
      dbField = 'item_price';
      if (typeof value === 'number') {
        dbValue = value / 100;
      } else {
        throw new Error('item_price_cents must be a number');
      }
    }

    const query = `
        SELECT *, ROUND(item_price * 100)::INT AS item_price_cents FROM products WHERE ${dbField} = $1
    `;

    const result = await sql.unsafe(query, [dbValue]);

    // could be one or many so returning all rows as an array.
    return result;
  } catch (error) {
    console.log(error);
  }
}

//  basic get the user by the id
export async function getUserById({ user_id }: { user_id: string }) {
  const result = await sql`
        SELECT * FROM users WHERE id = ${user_id}
    `;

  return result[0];
}

// same as the other params but for reviews so you can get the seller or product reviews.
export async function getReviewByParam(params: ReviewSQLParams) {
  const { field, value } = params;

  const validField: ReviewFields[] = ['product_id', 'seller_id'];

  if (!validField.includes(field)) {
    throw new Error(`Invalid field: ${field}`);
  }

  const query = `
  SELECT * FROM reviews WHERE ${field} = $1
  `;

  const result = await sql.unsafe(query, [value]);
  //   returned as an array.
  return result;
}

/**
 * login credentials - done
 * seller info - done
 * get seller by filter - done
 * product info by id-done
 * product by filters including seller id  -done
 * (add new category to product table for categories?)
 * get user by id - done
 * get reviews by product or seller id (review filter by any?) - done
 *
 *
 */
