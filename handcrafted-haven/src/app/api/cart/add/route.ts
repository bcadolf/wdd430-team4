import { NextResponse } from 'next/server';
import { createUser, createCart, addProductToCart } from '@/lib/actions';
import { cookies } from 'next/headers';
import { getCartByParam } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    let user_id = cookieStore.get('user_id')?.value;
    let setUserCookie = false;

    const { product_id, seller_id, quantity } = await request.json();

    // Create user if not found in cookie
    if (!user_id) {
      user_id = await createUser();
      if (!user_id) throw new Error('Failed to create user');
      setUserCookie = true; // flag to set cookie later
    }

    // Get or create cart
    const cart = await getCartByParam({ field: 'user_id', value: user_id });
    let cart_id = cart?.id;

    if (!cart_id) {
      cart_id = await createCart({ user_id });
    }

    // Add item to cart
    await addProductToCart({
      cart_id,
      product_id,
      seller_id,
      quantity: quantity || 1,
    });

    // ✅ Now build response first
    const response = NextResponse.json({ success: true, user_id, cart_id });

    // ✅ Set cookies BEFORE returning response
    if (setUserCookie) {
      response.cookies.set('user_id', user_id, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    // Set or update cart_id cookie
    response.cookies.set('cart_id', cart_id, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('❌ Error in /api/cart POST:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}
