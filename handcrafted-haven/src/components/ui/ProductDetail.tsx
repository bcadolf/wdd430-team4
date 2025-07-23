'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export function ProductDetails(){
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    return  <div className="px-5 flex flex-col gap-5">
                <h2 className="text-primary text-2xl font-bold">Wrist Beads</h2>
                <div className="flex flex-row gap-2 align-bottom items-center">
                    <div className="flex items-center h-3 "> {/* Reduced container height */}
                        
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

                <p className="text-primary">$12.99</p>
                <form action="" className="flex flex-col gap-2">
                    <label htmlFor="quantity" className="text-primary">Quantity</label>
                    <input type="number" min={0} id="quantity" className="border border-amber-600 rounded-2xl p-1 w-65 focus:outline-none focus:ring-2 focus:border-primary text-cyan-950" />
                    <div>
                        <button className="text-background bg-secondary w-50 py-1.5 rounded-2xl my-2">Add to Cart</button>
                    </div>
                    <button className="text-background  bg-primary w-65 py-1.5 rounded-2xl my-2">Buy Now</button>
                </form>
            </div>
}

export function ProductDescription(){
    return  <div className="col-span-2 ">
                <h3 className="text-xl text-primary">Product Info</h3>
                <p className="font-bold text-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, porro qui! Quis tempora, quod velit fugiat, quibusdam nesciunt molestias optio non nisi laudantium iure cupiditate unde autem quos nam eum. Lor</p>
            </div>
}