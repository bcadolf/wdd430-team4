import { NextResponse } from "next/server";
import { createUser, createCart, addProductToCart} from "@/lib/actions";
import { success } from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let { user_id, product_id, seller_id, quantity} = body;

         if (!user_id) {
        user_id = await createUser();

        const cart_id = await createCart({ user_id });

        await addProductToCart({
            cart_id,
            product_id,
            seller_id,
            quantity: quantity || 1,
        });

        return NextResponse.json({ success: true, user_id, cart_id});
    }

    }catch (error) {
        console.error(error);
        return NextResponse.json({ error: "failed to add itemt o cart"}, { status: 500});



    }}