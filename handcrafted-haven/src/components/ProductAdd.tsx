"use client";
import React, { useState, useEffect } from 'react';

type ProductAddProps = {
    product_id: string;
    seller_id: string;
}

export default function ProductAdd({ product_id, seller_id }: ProductAddProps) {
    const handleAddToCart = async () => {
        console.log("add to cart clicked", { product_id, seller_id})
        
        await fetch('/api/products/cart', {
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
        <button 
        type="button" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }} onClick={handleAddToCart}>Add to cart</button>
    )
}
