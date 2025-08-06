"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";

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
            const res = await fetch(`/api/seller/${seller_id}`);
            console.log(res);
            const data = await res.json();
            setSeller(data);
        }
        fetchSeller();
    }, [seller_id]);

    if (!seller) return <div>Loading Seller...</div>;



    return (
        <div className='text-center flex flex-col items-center justify-center pt-8 '>
            <h2 className='font-bold text-xl mb-3'>{seller.store_name}</h2>
            <Image
                src={seller.seller_image || "/About.webp"}
                alt={seller.store_name}
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
            />
            <p>
                <span className='font-bold'>Owner:</span> {seller.owner_first} {seller.owner_last}</p>
            <p><span className='font-bold'>Email:</span> {seller.store_email}</p>
            <p><span className='font-bold'>Address:</span>  {seller.store_address}</p>

            
        </div>
    )
    }
