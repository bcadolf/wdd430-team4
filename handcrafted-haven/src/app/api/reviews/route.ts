import { NextResponse } from "next/server";
import { getReviewByParam } from "@/lib/data";
import { createReview } from "@/lib/actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product_id =  searchParams.get("product_id");



const reviews = await getReviewByParam({ field: "product_id", value: Number(product_id) });

  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const body = await request.json();

  const review = await createReview(body);
  return NextResponse.json(review, { status: 201 });
}