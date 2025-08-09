import { NextResponse } from "next/server";
import { createUser, createCart, addProductToCart } from "@/lib/actions";
import { cookies } from "next/headers";
import { getCartByParam } from "@/lib/data";

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