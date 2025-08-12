import Link from 'next/link';
import { cookies } from 'next/headers';
import { getCartCount } from '@/lib/data';

export default async function CartCounter() {
  const cookieStore = await cookies();
  const cart_id = cookieStore.get("cart_id")?.value;
  
  const itemCount = await getCartCount(cart_id);

  return (
    <Link href="/cart" className="relative">
        Cart ({itemCount})
    </Link>
  );
}