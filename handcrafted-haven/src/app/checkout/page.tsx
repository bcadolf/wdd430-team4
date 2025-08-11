'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (!form.name || !form.email || !form.address) {
      alert('Please fill in all fields.');
      return;
    }

    alert('🎉 Order placed successfully!');
    clearCart(); // Clear the cart after successful checkout
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-playfair mb-6 text-primary">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Checkout Form */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Billing Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition"
            >
              Place Order
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-2">
                  <Image src={item.image} alt={item.name} width={60} height={60} className="rounded" />
                  <div className="flex-1">
                    <p className="font-bold">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary">₦{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between mt-6 text-lg font-bold border-t pt-4">
              <span>Total:</span>
              <span className="text-primary">₦{total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
