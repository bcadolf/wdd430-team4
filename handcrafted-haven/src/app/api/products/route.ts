import { NextResponse } from "next/server";
import { getAllProducts, getProductByParam } from "@/lib/data";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId');

    let products;
    let productList

    if (sellerId) {
        products = await getProductByParam({ field: "seller_id", value: sellerId});
        productList = products?.slice(0, 5);
    } else {
        products = await getAllProducts();
    }

    return NextResponse.json(productList || products);
}
