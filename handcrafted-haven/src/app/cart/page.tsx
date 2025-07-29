'use client';
import React from "react";
import Image from "next/image";
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-playfair mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4 border p-2 rounded">
            <Image src={item.image} alt={item.name} width={60} height={60} />
            <div className="flex-1">
              <p className="font-bold">{item.name}</p>
              <p>₦{item.price} x {item.quantity}</p>
            </div>
            <button
              className="text-red-500"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <div className="mt-6 text-lg font-bold">
        Total: ₦{total}
      </div>
    </div>
  );
}