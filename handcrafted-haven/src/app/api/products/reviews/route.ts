import { NextResponse } from "next/server";
import { getReviewByParam } from "@/lib/data";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await context.params;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const products = (await getReviewByParam({ field: "product_id", value: numericId })) || [];
  const product = products[0];

  if (!product) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

