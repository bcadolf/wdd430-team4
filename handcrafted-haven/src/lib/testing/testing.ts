/* eslint-disable @typescript-eslint/no-unused-vars */
// lint disabled for file since it is only for testing and the functions are commented out to allow for picking which to run.

import {
  createCart,
  createCartDetail,
  createOrder,
  createOrderItem,
  createProduct,
  createReview,
  createSeller,
  createUser,
  updateSeller,
} from '../actions';
import {
  getFullCartById,
  getProductByParam,
  getReviewByParam,
  getSellerByParam,
  getUserById,
} from '../data';

/** tests run before seeding to ensure everything worked */

async function testCreateSeller() {
  const formData = new FormData();
  formData.set('owner_first', 'Nick');
  formData.set('owner_last', 'Fury');
  formData.set('store_name', 'Nick Nacks');
  formData.set('store_email', 'nicky@handcraftedhaven.com');
  formData.set('store_address', '1234 Superhero Lane, New York, NY');
  formData.set('password', 'password123!');

  const result = await createSeller(formData);

  console.log(result);
}

// testCreateSeller();

async function testUpdateSeller() {
  const formData = new FormData();
  formData.set('seller_id', '343832af-b69b-4164-87e5-b230429f4ff1');
  formData.set('owner_last', 'Strongleg');
  formData.set('store_address', '27 Iron Way, Steele VA');
  await updateSeller(formData);
}

// testUpdateSeller(); SUCCESS

async function testCreateProduct() {
  const formData = new FormData();
  formData.set('item_name', 'Hand Painted Mug');
  formData.set('item_price', '33.82');
  formData.set('item_stock', '15');
  formData.set(
    'item_description',
    'Hand-painted Mug crafted with care using traditional techniques.'
  );
  formData.set('seller_id', '0f8fad10-6c29-40d2-8d02-581851eff936');
  formData.set('item_image', '/public/products/hand-painted-mug.webp');

  await createProduct(formData);
}

// testCreateProduct();

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
  formData.set('product_id', '2');
  formData.set('quantity', '1');

  await createCartDetail(formData);
}

// testCreateCartDetail(); SUCCESS

async function testCreateOrder() {
  const formData = new FormData();
  formData.set('user_id', '97d43122-81b9-433c-a231-77fea4cb30bf');
  formData.set('user_name', 'Joe Smoe');
  formData.set('user_email', 'coolguy@haven.com');
  formData.set('user_address', '2345 Friend Way');
  formData.set('total_price', '35.96');

  await createOrder(formData);
}

// testCreateOrder(); SUCCESS

async function testCreateOrderItem() {
  const formData = new FormData();
  formData.set('order_id', 'c589994c-4c97-438f-8880-44bae5ca01ad');
  formData.set('seller_id', '343832af-b69b-4164-87e5-b230429f4ff1');
  formData.set('store_name', 'Fine Iron');
  formData.set('product_id', '1');
  formData.set('item_name', '6" Knife Blank');
  formData.set('item_price', '8.99');
  formData.set('quantity', '4');

  await createOrderItem(formData);
}

// testCreateOrderItem(); SUCCESS

async function testCreateReview() {
  const formData = new FormData();
  formData.set('rating', '4');
  formData.set('product_id', '3');
  formData.set('seller_id', '343832af-b69b-4164-87e5-b230429f4ff1');
  formData.set('user_name', 'Happy Buyer 2');
  formData.set(
    'description',
    'good blade missing handle... should have read the description'
  );

  await createReview(formData);
  console.log("review created")
}

//estCreateReview();

async function testGetCartById() {
  const result = await getFullCartById({ cart_id: 1 });

  console.log(result);
}

// testGetCartById(); SUCCESS

async function testGetSellerByParam() {
  const result = await getSellerByParam({
    field: 'store_name',
    value: 'Fine Iron',
  });
  // test with getting password as well.
  const resultPass = await getSellerByParam({
    field: 'store_email',
    value: 'fineiron@handcraftedhaven.com',
  });

  console.log(result, { 'With Pass': resultPass });
}

// testGetSellerByParam();

async function testGetProductByParam() {
  const result = await getProductByParam({
    field: 'seller_id',
    value: '343832af-b69b-4164-87e5-b230429f4ff1',
  });

  console.log(result);
}

// testGetProductByParam();

async function testGetUserById() {
  const result = await getUserById({
    user_id: '97d43122-81b9-433c-a231-77fea4cb30bf',
  });

  console.log(result);
}

// testGetUserById(); SUCCESS

async function testGetReviewByParam() {
  const result = await getReviewByParam({ field: 'product_id', value: 4 });

  console.log(result);
}

testGetReviewByParam();

/* eslint-enable @typescript-eslint/no-unused-vars */

