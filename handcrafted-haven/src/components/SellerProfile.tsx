"use client";
import React, { useState, useEffect } from 'react';

type Seller = {
    id: string;
    owner_first: string;
    owner_last: string,
    store_name: string,
    store_email: string,
    store_address: string,
    seller_image: string,
}


  
export default function SellerProfile({ seller_id }: { seller_id: string}) {
    const [seller, setSeller ] = useState<Seller | null>(null);


    useEffect(() => {
        async function fetchSeller() {
           console.log("Fetching reviews for seller_id:", seller_id);
            const res = await fetch(`/api/products/seller/${seller_id}`);
            console.log(res);
            const data = await res.json();
            setSeller(data);
        }
        fetchSeller();
    }, [seller_id]);

    if (!seller) return <div>Loading Seller...</div>;



    return (
        <div>
            <h2>{seller.store_name}</h2>
            <img src={seller.seller_image || "About.webp"} alt={seller.store_name} width={100} />
            <p>Owner: {seller.owner_first} {seller.owner_last}</p>
            <p>Email: {seller.store_email}</p>
            <p>Address:  {seller.store_address}</p>

            
        </div>
    )
    }
