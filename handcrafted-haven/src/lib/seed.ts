import postgres from 'postgres';
import {
  createCart,
  createCartDetail,
  createProduct,
  createSeller,
  createUser,
} from './actions';

// const sql = postgres(
//   'postgres://neondb_owner:npg_L8vtqVpZbf5a@ep-fragrant-cloud-adzljuux-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
//   { ssl: 'require' }
// );

async function seedSellers() {
  // add a const with json format of all sellers
}

//  hash the passwords maping through the seeddata

// try catch to send query

// call seedSellers();

/** tests run before seeding to ensure everything worked */

async function testCreateSeller() {
  const formData = new FormData();
  formData.set('owner_first', 'Jackson');
  formData.set('owner_last', 'Strongman');
  formData.set('store_name', 'Fine Iron');
  formData.set('store_email', 'fineiron@handcraftedhaven.com');
  formData.set('store_address', '26 Iron Way, Steele VA');
  formData.set('password', '1R0N1sh0t$');

  await createSeller(formData);
}

// testCreateSeller(); SUCCESS

async function testCreateProduct() {
  const formData = new FormData();
  formData.set('item_name', '6" Knife Blank');
  formData.set('item_price', '8.99');
  formData.set('item_stock', '16');
  formData.set(
    'item_description',
    'These are polished high carbon steel blades. Hand forged and 6 inches tip to tang.'
  );
  formData.set('seller_id', '343832af-b69b-4164-87e5-b230429f4ff1');

  await createProduct(formData);
}

// testCreateProduct(); SUCCESS

async function testCreateUser() {
  const result = await createUser();
  console.log(result);
}

// testCreateUser(); SUCCESS

async function testCreateCart() {
  const user_id = { user_id: '97d43122-81b9-433c-a231-77fea4cb30bf' };

  const result = await createCart(user_id);

  console.log(result);
}

// testCreateCart(); SUCCESS

async function testCreateCartDetail() {
  const formData = new FormData();
  formData.set('cart_id', '1');
  formData.set('seller_id', '343832af-b69b-4164-87e5-b230429f4ff1');
  formData.set('product_id', '1');
  formData.set('quantity', '4');

  await createCartDetail(formData);
}

// testCreateCartDetail(); SUCCESS
