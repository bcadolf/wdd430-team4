"use client";

import React, { useEffect, useState } from 'react';

type ProductAddProps = {
  product_id: string;
  seller_id: string;
};

export default function ProductAdd({ product_id, seller_id }: ProductAddProps) {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Get cart_id from browser cookies
    const match = document.cookie.match(/(?:^|;\s*)cart_id=([^;]*)/);
    if (match) {
      setCartId(match[1]);
    }
  }, []);

  const handleAddToCart = async () => {
    if (!cartId) {
      alert('Cart ID is missing. Please refresh or log in again.');
      return;
    }

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        cart_id: cartId,
        product_id,
        seller_id,
        quantity: 1,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Product added:', data);
    } else {
      console.error('❌ Failed to add to cart');
    }
  };

  return (
    <button
      type="button"
      className="cursor-pointer text-background bg-secondary w-50 py-1.5 rounded-2xl my-2 hover:bg-secondary/80 hover:shadow-lg transition"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
      onClick={handleAddToCart}
    >
      Add to cart
    </button>
  );
}

