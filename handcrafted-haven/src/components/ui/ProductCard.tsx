import Image from "next/image";
import { products } from "@/lib/products";

export function ProductCard(){
    return <div className="grid grid-cols-5 gap-5 overflow-hidden p-5">
                {products.map(product => (
                    <div key={product.id} className="bg-white w-64 h-80 rounded-2xl p-4 flex flex-col items-center">
                    <div className="w-full h-40 relative overflow-hidden rounded-lg">
                        <Image
                        src={product.image}
                        alt={`Image of ${product.name}`}
                        fill
                        className="object-cover"
                        />
                    </div>
                    <h3 className="text-primary font-bold mt-3 text-center">{product.name}</h3>
                    <p className="text-primary font-bold">${product.price}</p>
                    {product.inStock ? <p className="text-primary font-bold">In stock</p> : <p className="text-red-600 font-bold">Out of Stock</p>}
                    </div>
                ))}
            </div>
            }