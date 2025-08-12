"use client";
import React, { useState } from 'react';

type ProductAddProps = {
    product_id: string;
    seller_id: string;
}

export default function ProductAdd({ product_id, seller_id }: ProductAddProps) {
    
    const [loading, setLoading] = useState(false);
    
    const handleAddToCart = async () => {
        setLoading(true);

        try {
            console.log('Adding to cart:', { product_id, seller_id });

            const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                product_id,
                seller_id,
                quantity: 1
            }),
        });
        
        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok) {
            alert('Item added to cart!')
         } else {
                alert(`Failed to add to cart: ${data.error}`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding to cart');
        } finally {
            setLoading(false);
        }
    };
    return (
        <button 
            type="button" 
            className="cursor-pointer text-background bg-secondary w-50 py-1.5 rounded-2xl my-2  hover:bg-secondary/80 hover:shadow-lg transition" 
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }} 
            onClick={handleAddToCart}
            disabled={loading}
        >
            {loading ? 'Adding...': 'Add to cart'}
        </button>
    );
}
