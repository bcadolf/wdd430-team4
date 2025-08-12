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
    0
  );

  return (
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
    </div>
  );
}
