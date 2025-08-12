<<<<<<< HEAD
'use client';

import React, { useEffect, useState } from 'react';

export default function CartPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch('/api/cart');
        if (!res.ok) {
          throw new Error('Failed to fetch cart');
        }

        const data = await res.json();
        setItems(data.items || []);
      } catch (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err: any
      ) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  if (loading) return <div>Loading your cart...</div>;
  if (error) return <div>Error: {error}</div>;

  const total = items.reduce(
    (sum, item) => sum + item.item_price * item.quantity,
=======
import React from 'react';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getCartItems } from '@/lib/data';
import RemoveFromCartButton from '@/components/RemoveFromCartButton';

export default async function CartPage() {
  const cookieStore = await cookies();
  const cart_id = cookieStore.get('cart_id')?.value;

  const cartItems = cart_id
    ? await getCartItems({ cart_id: parseInt(cart_id) })
    : [];

  const safeCartItems = cartItems || [];

  const total = safeCartItems.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, item: any) => {
      const price = item.item_price_cents / 100; // Convert cents to dollars
      return sum + price * item.quantity;
    },
>>>>>>> ba49970f503293f864bca5ac9bb36baeabf709fd
    0
  );

  return (
<<<<<<< HEAD
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className='space-y-4'>
            {items.map((item) => (
              <li
                key={item.cart_detail_id}
                className='flex justify-between border-b py-4'
              >
                <div>
                  <h2 className='font-semibold'>{item.item_name}</h2>
                  <p>
                    ₦{item.item_price} × {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className='text-right mt-6 text-xl font-bold'>
            Total: ₦{total.toFixed(2)}
          </div>
        </>
      )}
=======
    <div className='p-4'>
      <div
        style={{
          background: '#0c2c47',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          padding: '40px',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h2
          className='text-2xl font-playfair mb-4'
          style={{ fontWeight: 'bold' }}
        >
          Your Cart
        </h2>

        {safeCartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          safeCartItems.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any) => (
              <div
                key={item.cart_detail_id}
                className='flex items-center gap-4 mb-4 border p-2 rounded'
              >
                <Image
                  src={item.item_image || '/about.webp'}
                  alt={`Image of ${item.item_name}`}
                  width={60}
                  height={60}
                  className='object-cover rounded'
                />
                <div className='flex-1'>
                  <p className='font-bold'>{item.item_name}</p>
                  <p>
                    ${(item.item_price_cents / 100).toFixed(2)} x{' '}
                    {item.quantity}
                  </p>
                </div>
                <RemoveFromCartButton product_id={item.product_id} />
              </div>
            )
          )
        )}

        {safeCartItems.length > 0 && (
          <div
            className='mt-6 text-lg font-bold'
            style={{ fontWeight: 'bold' }}
          >
            Total: ${total.toFixed(2)}
          </div>
        )}
      </div>
>>>>>>> ba49970f503293f864bca5ac9bb36baeabf709fd
    </div>
  );
}
