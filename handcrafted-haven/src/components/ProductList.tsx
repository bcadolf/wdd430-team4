"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard, Product} from '@/components/ui/ProductCard';
  
  
  
  
export default function ProductList() {
    const [products, setProducts ] = useState<Product[]>([]);
    const searchParams = useSearchParams();
    const search = searchParams.get("search")?.toLowerCase() || "";

            
    // const name ="Handcrafted Haven";
    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/products");
            const data = await res.json();
            console.log(data);
            const linked = data.map((product: { id: number; item_name: string; item_image: string, item_price: string, item_stock: string}) => ({
                id: product.id,
                name: product.item_name,
                image: product.item_image,
                price: product.item_price,
                inStock: Number(product.item_stock) > 0,
            }));
            setProducts(linked);
            console.log("Fetched product", linked);
        }
        fetchProducts();
    }, []);

    const filteredProducts = search ? products.filter(product => product.name.toLowerCase().includes(search)) : products;


    return (
        <div>
            <h2>Products for Sale</h2>
            <ProductCard products={filteredProducts}/>
        </div>
    )
    }
