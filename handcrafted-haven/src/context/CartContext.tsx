// 'use client';
// import React, { createContext, useContext, useState } from 'react';

// // Define the structure of a Cart Item
// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// // Define the types for the Context
// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   clearCart: () => void;
// }

// // Create the Context
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // Create the Provider component
// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Add item to cart
//   const addToCart = (item: CartItem) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((i) => i.id === item.id);
//       if (existingItem) {
//         // Increase quantity if item exists
//         return prevCart.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
//         );
//       }
//       return [...prevCart, item];
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (id: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // Clear the entire cart
//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use Cart Context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error('useCart must be used within a CartProvider');
//   return context;
// };
