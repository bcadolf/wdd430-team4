import { NextResponse } from "next/server";
import { createUser, createCart, addProductToCart,} from "@/lib/actions";
import { cookies } from "next/headers";
import { getCartByParam } from "@/lib/data";


export async function POST(request: Request) {
    try {
        let user_id = (await cookies()).get("user_id")?.value;

        const body = await request.json();
        const {product_id, seller_id, quantity} = body;

        if (!user_id) {
        user_id = await createUser();}
        console.log("test" ,user_id)
        if (!user_id) {
            throw new Error("failed to create user");
        }

        const cart = await getCartByParam({ field: "user_id", value: user_id});
        console.log("test", cart);
        let cart_id = cart?.id;
        console.log(cart_id);

        if (!cart_id) {
            cart_id
             = await createCart({ user_id });

        }
        console.log("cart from getCartByParam:", cart_id);
console.log("cart_id after getCartByParam:", cart_id);

        await addProductToCart({
            cart_id,
            product_id,
            seller_id,
            quantity: quantity || 1,
        });

        const response =  NextResponse.json({ success: true, user_id, cart_id});

        if (!((await cookies()).get("user_id"))) {
            response.cookies.set("user_id", user_id, { path: "/"});
        }
        console.log("API response:", { success: true, user_id, cart_id })

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "failed to add item to cart"}, { status: 500});


    }

    }