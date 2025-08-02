
import { notFound } from "next/navigation";
import Image from "next/image";

import { getProductByParam } from "@/lib/data";

export default async function ProductPage({params}: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const numberId = Number(id)
    if (isNaN(numberId)) return notFound();

    const products = await getProductByParam({ field: "id", value: numberId});
    console.log(products);
    const product = products?.[0];

    if (!product)
         return notFound();

    return (

        <div>
            <h1>{product.item_name}</h1>
            <Image
                src={product.item_image}
                alt={product.item_name}
                width={400}
                height={400}
                style={{ objectFit: "contain"}}
            />
            <p>{product.item_description}</p>
            <p>Price: ${product.item_price}</p>
            <p>Stock: {product.item_stock}</p>
        </div>
    )

}
