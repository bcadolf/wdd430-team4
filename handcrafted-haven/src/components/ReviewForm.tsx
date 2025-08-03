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
        await fetch('/api/products/reviews', {
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
        <form onSubmit={handleAddReview}>
            <input
                type="text"
                placeholder="Your Name Here"
                value={user_name}
                onChange={e => setUserName(e.target.value)}

            />
            <input
            type="number"
                min={1}
                max={5}
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
            />
            <input
            type="textarea"
                placeholder="Your Review Here"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Submit Review</button>

        </form>
    )
}