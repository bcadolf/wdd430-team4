import { NextResponse } from "next/server";
import { getReviewByParam } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product_id =  searchParams.get("product_id");



const reviews = await getReviewByParam({ field: "product_id", value: Number(product_id) });

  return NextResponse.json(reviews);
}
