import { NextResponse } from 'next/server';
import { getCartByUserId } from '@/lib/data';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userIdParam = url.pathname.split('/').pop(); // or use regex if needed

  const userId = parseInt(userIdParam ?? '', 10);
  try {
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const items = await getCartByUserId(userId);

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}
