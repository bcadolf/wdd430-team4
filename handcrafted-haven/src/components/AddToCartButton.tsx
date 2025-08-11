'use client';

import { useTransition } from 'react';
import { addProductToCart } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddToCartButton({
  productId,
  sellerId,
}: {
  productId: number;
  sellerId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [cartId, setCartId] = useState<number | null>(null);

  // Read cart_id from cookies on the client
  useEffect(() => {
    const getCartIdFromCookie = () => {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('cart_id='));

      if (cookie) {
        const value = cookie.split('=')[1];
        const parsed = parseInt(value, 10);
        if (!isNaN(parsed)) {
          setCartId(parsed);
        }
      }
    };

    getCartIdFromCookie();
  }, []);

  const handleClick = () => {
    if (!cartId) {
      alert('No cart found. Please refresh or try again.');
      return;
    }

    startTransition(async () => {
      const res = await addProductToCart({
  cart_id: String(cartId),
  product_id: String(productId),
  seller_id: String(sellerId),
  quantity: 1,
});

    if (res && 'success' in res && res.success === true) {
      router.refresh();
    } else {
      console.error('Failed to add product:', res);
      alert(res?.message || 'Failed to add product to cart.');
    }
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending || !cartId}>
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
