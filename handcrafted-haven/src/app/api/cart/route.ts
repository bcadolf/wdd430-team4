import { NextResponse } from "next/server";
import { createUser, createCart, addProductToCart, removeProductFromCart } from "@/lib/actions";
import { cookies } from "next/headers";
import { getCartByParam, getCartItems } from "@/lib/data";
import postgres from 'postgres';

export async function GET() {
  try{
    const cookieStore = await cookies();
    const cart_id = cookieStore.get("cart_id")?.value;

    if (!cart_id) {
      return NextResponse.json([]);
    }

     const cartItems = await getCartItems({ cart_id: parseInt(cart_id) });
    return NextResponse.json(cartItems);

  } catch (error) {
    console.error('Error fetching cart:',error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore =  await cookies();
    let user_id = cookieStore.get("user_id")?.value;

    const body = await request.json();
    const { product_id, seller_id, quantity } = body;

    if (!user_id) {
      user_id = await createUser();
      if (!user_id) {
        throw new Error("Failed to create user");
      }
    }

    const cart = await getCartByParam({ field: "user_id", value: user_id });
    let cart_id = cart?.id;

    if (!cart_id) {
      cart_id = await createCart({ user_id });
    }

    await addProductToCart({
      cart_id,
      product_id,
      seller_id,
      quantity: quantity || 1,
    });

    const response = NextResponse.json({ success: true, user_id, cart_id });

    if (!cookieStore.get("user_id")) {
      response.cookies.set("user_id", user_id, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
    }

    response.cookies.set("cart_id", cart_id, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

// Delete item from cart
export async function DELETE(request: Request) {
  try{ 
    console.log(' DELETE /api/cart - Starting...');

    const cookieStore = await cookies();
    const cart_id = cookieStore.get("cart_id")?.value;

    console.log(' Cart ID from cookies:', cart_id)

    if(!cart_id) {
      console.log('❌ No cart_id found');
      return NextResponse.json({ error: "No cart found"}, { status: 404 });
    }

    const body = await request.json();
    const { product_id } = body;

    console.log('🗑️ Removing product:', { cart_id, product_id });

    await removeProductFromCart({ cart_id, product_id });


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ DELETE /api/cart - Error:', error);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}