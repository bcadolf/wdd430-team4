import { NextResponse } from "next/server";
import { getCartByUserId } from "@/lib/data";

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const userId = parseInt(params.user_id, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const items = await getCartByUserId(userId);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

