"use client";
import React from 'react';

type ProductAddProps = {
    product_id: string;
    seller_id: string;
}

export default function ProductAdd({ product_id, seller_id }: ProductAddProps) {
    const handleAddToCart = async () => {
        
        await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                product_id,
                seller_id,
                quantity: 1
            }),
        })
    };
    return (
        <button type="button" className="cursor-pointer text-background bg-secondary w-50 py-1.5 rounded-2xl my-2  hover:bg-secondary/80 hover:shadow-lg transition" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }} onClick={handleAddToCart}>Add to cart</button>
    )
}