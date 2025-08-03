import { NextResponse } from "next/server";
import { createUser, createCart, addProductToCart} from "@/lib/actions";
import { cookies } from "next/headers";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        let { user_id } = body;
        const {product_id, seller_id, quantity} = body;

         if (!user_id) {
        user_id = await createUser();}


        const cart_id = await createCart({ user_id });

        await addProductToCart({
            cart_id,
            product_id,
            seller_id,
            quantity: quantity || 1,
        });

        const response =  NextResponse.json({ success: true, user_id, cart_id});

        response.cookies.set("user_id", user_id, { path: "/"});
        console.log("API response:", { success: true, user_id, cart_id })

        return response;
    }catch (error) {
        console.error(error);
        return NextResponse.json({ error: "failed to add item to cart"}, { status: 500});


    }

    }