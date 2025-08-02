"use client";
import React, { useState, useEffect } from 'react';

import { ReviewCard, Review } from '@/components/ui/ReviewCard';


  
export default function ReviewProduct({ product_id }: { product_id: string}) {
    const [reviews, setReviews ] = useState<Review[]>([]);


    useEffect(() => {
        async function fetchReviews() {
           console.log("Fetching reviews for product_id:", product_id);
            const res = await fetch(`/api/products/reviews?product_id=${product_id}`);
            console.log(res);
            const data = await res.json();
            if (!Array.isArray(data)) {
                setReviews([]);
                return;
            }
            console.log(data);
            const linked = data.map((review: { id: number; rating: number; product_id: number, seller_id: string, user_name: string, description: string}) => ({
                id: review.id,
                rating: review.rating,
                product_id: review.product_id,
                seller_id: review.seller_id,
                user_name: review.user_name,
                description: review.description,
            }));
            setReviews(linked);
            console.log("Fetched product", linked);
        }
        fetchReviews();
    }, [product_id]);



    return (
        <div>
            <h2>Reviews</h2>
            <ReviewCard reviews={reviews}/>
        </div>
    )
    }
