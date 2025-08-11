'use client'

import { useEffect, useState } from 'react';
import CategoryButtons from '@/components/ui/CategoryButtons';
import { ProductCard } from '@/components/product/ProductCard';


export type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    inStock: boolean;
    seller_id: string;
};

type RawProductRow = {
  id: number;
  item_name: string;
  item_image: string;
  item_price: string;
  item_stock: number;
  item_description: string;
  seller_id: string;
};

function mapToProduct(row: RawProductRow){
    return {
        id: row.id,
        name: row.item_name, 
        image: row.item_image, 
        price: parseFloat(row.item_price), 
        inStock: row.item_stock > 0,
        seller_id: row.seller_id
    }
}

export default function CategoryProductList({categories}: {categories: string[]}){
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=>{
        async function fetchProducts(){
            if(selectedCategory){
                const response =  await fetch(`/api/products/category/${selectedCategory}`);
                const result = await response.json()
                const productList: Product[] = result.map(mapToProduct)
                console.log(productList)
                setProducts(productList)
            }else{
                const defaultResponse = await fetch('/api/products');
                const defaultResult = await defaultResponse.json()
                const productList: Product[] = defaultResult.map(mapToProduct)
                setProducts(productList)
            }
        }
            fetchProducts()
    }, [selectedCategory]);
    return <>
            <CategoryButtons categories={categories} onCategoryClick={setSelectedCategory}/>
            <ProductCard products={products}/>
        </>
}
