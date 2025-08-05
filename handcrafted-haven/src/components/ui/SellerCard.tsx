import Image from 'next/image';

import { products } from "@/lib/products";

export function SellerCard() {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {products.map(product => (
                <div key={product.id} className="bg- w-64 h-80 rounded-2xl p-4 flex flex-col items-center">
                    <div className="w-full h-40 relative overflow-hidden rounded-lg">
                        <Image
                            src={product.image}
                            alt={`Image of ${product.name}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h3 className="text-primary font-bold mt-3 text-center">{product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
                </div>
            ))}
        </div>
    );
}

