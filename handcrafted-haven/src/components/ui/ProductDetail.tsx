'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Product } from './ProductCard';

type ProductDetailsProps = {
    name: string;
    price: number | string;
    stock: number | string;
    description?: string;

}

export default function ProductDetails({ name, price, stock}: ProductDetailsProps){
    const [rating, setRating] = useState(0); 
    const [hoverRating, setHoverRating] = useState(0);

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
                            className={` cursor-pointer transition-colors duration-200 ${(hoverRating || rating) >= index ? 'text-secondary' : 'text-gray-300' }`}
                            style={{ 
                                width: '15px',  // Direct width cotrol
                                height: '15px', // Direct height control
                                marginRight: '-1px' // Adjusted overlap
                            }}
                            onClick={()=> (setRating(index))} 
                            onMouseEnter={()=> (setHoverRating(index))}
                            onMouseLeave={()=> (setHoverRating(0))}
                            />)
                        })}
                    </div>
                    <p className="font-semibold text-secondary">12 reviews</p>
                </div>

                <p className="text-primary text-6x2 font-bold">Product Price - ${price}</p>
                <form action="" className="flex flex-col gap-2">
                    <label htmlFor="quantity" className="text-primary text-6x2 font-bold" >Quantity: Available - {stock}</label>
                    <input type="number" min={0} id="quantity" className="border border-amber-600 rounded-2xl p-1 w-65 focus:outline-none focus:ring-2 focus:border-primary text-cyan-950  hover:bg-secondary/80 hover:shadow-lg transition"style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }} />
                    <div>
                        <button className="cursor-pointer text-background bg-secondary w-50 py-1.5 rounded-2xl my-2  hover:bg-secondary/80 hover:shadow-lg transition" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>Add to Cart</button>
                    </div>
                    <button className="cursor-pointer text-background  bg-primary w-65 py-1.5 rounded-2xl my-2  hover:bg-secondary/80 hover:shadow-lg transition " style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>Buy Now</button>
                </form>
            </div>
}

export function ProductDescription({ description }: {description: string}){
    return  <div className="col-span-2 ">
                <h3 className="text-primary text-4xl font-bolder">Product Info</h3>
                <p className="font-bold text-primary">{description}</p>
            </div>
}