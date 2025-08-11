'use client';

import React, { useEffect, useState } from 'react';

export default function CartPage() {
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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  if (loading) return <div>Loading your cart...</div>;
  if (error) return <div>Error: {error}</div>;

  const total = items.reduce((sum, item) => sum + (item.item_price * item.quantity), 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.cart_detail_id} className="flex justify-between border-b py-4">
                <div>
                  <h2 className="font-semibold">{item.item_name}</h2>
                  <p>₦{item.item_price} × {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-6 text-xl font-bold">
            Total: ₦{total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}
