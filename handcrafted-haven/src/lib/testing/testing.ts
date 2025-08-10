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
  updateCartDetail,
  updateProduct,
  updateSeller,
  updateUser,
} from '../actions';
import {
  getFullCartById,
  getProductByParam,
  getReviewByParam,
  getSellerByParam,
  getUserById,
  getProductsByCategory,
  getAllCarts,
} from '../data';

/** tests run before seeding to ensure everything worked */

async function testCreateSeller() {
  const formData = new FormData();
  formData.set('owner_first', 'Nick');
  formData.set('owner_last', 'Fury');
  formData.set('store_name', 'Logans ');
  formData.set('store_email', 'loganhartshorn@gmail.com');
  formData.set('store_address', '1234 Superhero Lane, New York, NY');
  formData.set('password', 'password123!');

  const result = await createSeller({ success: false, message: '' }, formData);

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
  formData.set('seller_id', 'c2cd79fa-74bf-42bd-a7d4-233992f42f4c');
  formData.set('item_image', '/products/hand-painted-mug.webp');

  formData.set('category', 'clothes');
  const result = await createProduct({ success: false, message: '' }, formData);
  console.log(result);
}

testCreateProduct();

async function testUpdateProduct() {
  const formData = new FormData();
  formData.set('product_id', '1');
  formData.set('item_price', '6.99');
  formData.set(
    'item_description',
    'High-quality steel knife blank, perfect for custom knife making, no handle.'
  );
  formData.set('category', 'cutlery');

  const result = await updateProduct({ success: false, message: '' }, formData);
  console.log(result);
}

// testUpdateProduct();

async function testCreateUser() {
  const result = await createUser();
  console.log(result);
}

// testCreateUser(); SUCCESS

async function testGetAllCarts() {
  const result = await getAllCarts();
  console.log(result);
}

// testGetAllCarts();

async function testUpdateUser() {
  const formData = new FormData();
  formData.set('user_id', '2306b65d-ef7d-4ef4-93de-b3f88dfc9304');
  formData.set('user_first', 'John');
  formData.set('user_last', 'Wick');
  formData.set('user_email', 'lovedogs@illkill.com');
  formData.set('user_address', '1234 Dog Lane, New York, NY');

  await updateUser(formData);
}

// testUpdateUser(); SUCCESS

async function testCreateCart() {
  const user_id = { user_id: '97d43122-81b9-433c-a231-77fea4cb30bf' };

  const result = await createCart(user_id);

  console.log(result);
}

//testCreateCart();

async function testCreateCartDetail() {
  const formData = new FormData();
  formData.set('cart_id', '1');
  formData.set('seller_id', '343832af-b69b-4164-87e5-b230429f4ff1');
  formData.set('product_id', '2');
  formData.set('quantity', '1');

  await createCartDetail(formData);
}

async function testUpdateCartDetail() {
  const formData = new FormData();
  formData.set('cart_detail_id', '3');
  formData.set('quantity', '2');

  await updateCartDetail(formData);
}

// testUpdateCartDetail(); SUCCESS

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

//testCreateReview();

// testGetSellerByParam();

// testGetProductByParam();

async function testGetProductsByCategory() {
  const result = await getProductsByCategory('cutlery');
  console.log(result);
}

// testGetProductsByCategory();

// testGetUserById(); SUCCESS

// testGetReviewByParam();

async function testGetCartById() {
  const result = await getFullCartById({ cart_id: 1 });

  console.log(result);
}

// testGetCartById(); SUCCESS

async function testGetSellerByParam() {
  const result = await getSellerByParam({
    field: 'store_email',
    value: 'loganhartshorn@gmail.com',
  });
  // test with getting password as well.
  const resultPass = await getSellerByParam({
    field: 'store_email',
    value: 'fineiron@handcraftedhaven.com',
  });

  console.log(result, { 'With Pass': resultPass });
}

//testGetSellerByParam();

async function testGetProductByParam() {
  const result = await getProductByParam({
    field: 'item_price_cents',
    value: 899,
  });

  console.log(result);
}

// testGetProductByParam(); SUCCESS

async function testGetUserById() {
  const result = await getUserById({
    user_id: '97d43122-81b9-433c-a231-77fea4cb30bf',
  });

  console.log(result);
}

// testGetUserById(); SUCCESS

async function testGetReviewByParam() {
  const result = await getReviewByParam({ field: 'product_id', value: 1 });

  console.log(result);
}

// testGetReviewByParam(); SUCCESS

/* eslint-enable @typescript-eslint/no-unused-vars */
