import { NextResponse } from "next/server";
import { getSellerByParam } from "@/lib/data";
export const runtime = "nodejs";

export async function GET(request: Request, { params}: { params: { id: string }}) {

const seller = await getSellerByParam({ field: "id", value: params.id });

    if (!seller) {
        return NextResponse.json({ error: "Seller not Valid"}, { status: 404});
    }

  return NextResponse.json(seller);
}
