'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";

import ProductAdd from './ProductAdd';

type ProductDetailsProps = {
    product_id: string;
    seller_id: string;
    name: string;
    price: number | string;
    stock: number | string;
    description?: string;

}

export default function ProductDetails({ product_id, seller_id, name, price, stock}: ProductDetailsProps){
        const [average, setAverage] = useState<number>(0);
        const [reviewCount, setReviewCount] = useState("");

    
    
        useEffect(() => {
            async function fetchReviews() {
               console.log("Fetching reviews for product_id:", product_id);
                const res = await fetch(`/api/reviews?product_id=${product_id}`);
                const data = await res.json();
                if (!Array.isArray(data)) {
                    setAverage(0);
                    setReviewCount("0");
                    return;
                }

                setReviewCount(data.length.toString());
    
                if (data.length > 0) {
                    const total = data.reduce((acc, cur) => acc + cur.rating, 0);
                    setAverage(total / data.length);
                } else {
                    setAverage(0);
                }
            }
            fetchReviews();
        }, [product_id]);
    

    return  <div className="px-5 flex flex-col gap-5">
                <h2 className="text-primary text-4xl font-bold">{name}</h2>
                <div className="flex flex-row gap-2 align-bottom items-center">
                    <div className="flex items-center h-3 "> {/* Reduced container height */}
                        {/* This array method is creating fontAwesome stars */}
                        {[...Array(5)].map((_, i) => {
                            const index = i + 1; 
                            return (
                            <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={` cursor-pointer transition-colors duration-200 ${average >= index ? 'text-secondary' : 'text-gray-300' }`}
                            style={{ 
                                width: '15px',  // Direct width cotrol
                                height: '15px', // Direct height control
                                marginRight: '-1px' // Adjusted overlap
                            }}
                            />)
                        })}
                    </div>
                    <p className="font-semibold text-secondary">{reviewCount} Reviews</p>
                </div>

                <p className="text-primary text-6x2 font-bold">Product Price - ${price}</p>
                <form action="" className="flex flex-col gap-2">
                    <p className="text-primary text-xl font-bold" >Quantity: Available - {stock}</p>
                    <div>
                         <ProductAdd product_id={product_id.toString()} seller_id={seller_id}/>
                    </div>
                    <button className="cursor-pointer text-background  bg-primary w-65 py-1.5 rounded-2xl my-2  hover:bg-secondary/80 hover:shadow-lg transition " style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>Buy Now</button>
                </form>
            </div>
}

export function ProductDescription({ description }: {description: string}){
    return  <div className="col-span-2 ">
                <h3 className="text-primary text-4xl font-bolder text-center">Product Info</h3>
                <p className="font-bold text-primary text-center">{description}</p>
            </div>
}