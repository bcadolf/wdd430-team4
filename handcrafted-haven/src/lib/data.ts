import postgres from 'postgres';
import {
  Seller,
  Cart,
  CartDetail,
  CartWithItems,
  SellerSQLParam,
  SellerFields,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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

    return data[0];
  } catch (error) {
    console.log(error);
  }
}

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

/**
 * login credentials - done
 * seller info - done
 * get seller by filter - done
 * product info by id
 * product by filters including seller id (add new category to product table for categories)
 * get user by id
 * get reviews by product or seller id (review filter by any?)
 *
 *
 */
