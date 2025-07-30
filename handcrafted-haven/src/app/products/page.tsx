'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

import Image from "next/image";

import { ProductCard, Product } from '@/components/ui/ProductCard';




export default function Products() {
  const [products, setProducts ] = useState<Product[]>([]);
  // const name ="Handcrafted Haven";
  useEffect(() => {
      async function fetchProducts() {
          const res = await fetch("/api/products");
          const data = await res.json();
          console.log(data);
          const linked = data.map((product: { id: number; item_name: string; image: string, item_price: string, item_stock: string}) => ({
              id: product.id,
              name: product.item_name,
              image: product.image,
              price: product.item_price,
              inStock: Number(product.item_stock) > 0,
          }));
          setProducts(linked);
          console.log("Fetched product", linked);
      }
      fetchProducts();
  }, []);


  return (
    <div>
     <h2 className="text-primary text-2xl font-bold ml-2">Related Products</h2>
            <ProductCard products={products}/>

        </div>
  );
}
