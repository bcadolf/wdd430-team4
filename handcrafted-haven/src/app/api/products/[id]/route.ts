import { NextResponse } from 'next/server';
import { getProductByParam } from '@/lib/data';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const product = await getProductByParam({ field: 'id', value: params.id });
  if (!product) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  return NextResponse.json(product);
}
