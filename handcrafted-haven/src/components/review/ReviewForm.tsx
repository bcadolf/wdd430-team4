"use client";

import { useState } from "react";

type ReviewAddProps = {
    product_id: string;
    seller_id: string;

}


export default function ReviewAdd({ product_id, seller_id }: ReviewAddProps) {

    const [user_name, setUserName] = useState("");
    const [rating, setRating] = useState(5);
    const [description, setDescription] = useState("");

    const handleAddReview = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                product_id,
                seller_id,
                user_name,
                rating,
                description,

            }),
            
        })
        setUserName("");
        setRating(5);
        setDescription("");
    };

    return (
    <div className="flex justify-center items-center">
        <form onSubmit={handleAddReview} className="flex flex-col m-6 gap-4 p-6 bg-white text-black  rounded-lg shadow-lg w-96">
            <h2 className="font-bold text-4x1 mb-2">Leave a review!</h2>
            
            <label htmlFor="user_name" className="font-semibold">Name</label>
            <input id="user_name" className="bg-white text-black border rounded px-3 py-2"
                type="text"
                placeholder="Your Name Here"
                value={user_name}
                onChange={e => setUserName(e.target.value)
                }

            />
            <label htmlFor="rating" className="font-semibold">Rating (1-5)</label>
            <input id="rating" className="bg-white text-black border rounded px-3 py-2"
            type="number" 
                min={1}
                max={5}
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
            />
            <label htmlFor="description" className="font-semibold">Description</label>
            <input id="description" className="bg-white text-black border rounded px-3 py-2"
            type="textarea"
                placeholder="Your Review Here"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button  className="bg-blue-400 cursor-pointer text-white hover:bg-blue-700 transition border rounded px-3 py-2" type="submit">Submit Review</button>

        </form>
    </div>
    )
}