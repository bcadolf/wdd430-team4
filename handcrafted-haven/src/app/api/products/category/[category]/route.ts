import { NextResponse } from "next/server";
import { getProductsByCategory, getAllProducts } from '@/lib/data';

export async function GET(request: Request){
    const url = new URL(request.url);
    const category = url.pathname.split('/').pop()
    let categorizedProducts;
    let allProducts

    if(category){
        categorizedProducts = await getProductsByCategory(category);
    }else{
        allProducts = await getAllProducts();
    }

    return NextResponse.json(categorizedProducts || allProducts )
}