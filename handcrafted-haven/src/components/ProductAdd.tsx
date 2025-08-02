"use client";
import React, { useState, useEffect } from 'react';

type ProductAddProps = {
    product_id: string;
    seller_id: string;
}

export default function ProductAdd({ product_id, seller_id }: ProductAddProps) {
    const handleAddToCart = async () => {
        
        await fetch('/api/products/cart', {
            method: 'POST',
            body: JSON.stringify({
                product_id,
                seller_id,
                quantity: 1
            }),
            headers: { 'Content-Type': 'application/json'}
        })
    };
    return (
        <button onClick={handleAddToCart}>Add to cart</button>
    )
}
