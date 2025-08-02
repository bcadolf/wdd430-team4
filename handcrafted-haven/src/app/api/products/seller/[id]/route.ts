import { NextResponse } from "next/server";
import { getSellerByParam } from "@/lib/data";
export const runtime = "nodejs";

export async function GET(request: Request, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;

    const seller = await getSellerByParam({ field: "id", value: params.id });

    if (!seller) {
        return NextResponse.json({ error: "Seller not Valid"}, { status: 404});
    }

    return NextResponse.json(seller);
}
