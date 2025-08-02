import { notFound } from 'next/navigation';
import Image from "next/image";
import styles from './page.module.css';
import { getProductByParam } from '@/lib/data';
import ProductDetails, {ProductDescription}  from '@/components/ui/ProductDetail';
import { Suspense } from 'react';
import SellerProductList from '@/components/SellerProductList';


export default async function ProductPage({params}: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const numberId = Number(id)
    if (isNaN(numberId)) return notFound();

    const products = await getProductByParam({ field: "id", value: numberId});
    console.log(products);
    const product = products?.[0];

  if (!product) return notFound();

    return (

        <div className={styles.productcontainer}>
            <div className={styles.productimage}>
            <Image
                className={styles.image}
                src={product.item_image}
                alt={product.item_name}
                width={400}
                height={400}
                style={{ objectFit: "contain"}}
            />
            </div>
            <div className={styles.description}>
            <ProductDetails name={product.item_name} price={product.item_price} stock={product.item_stock} />
            </div>
             <ProductDescription description={product.item_description}/>
            <div>
                 <Suspense fallback={<div>Loading .... </div>}>
                           <SellerProductList sellerId={product.seller_id}/>
                       </Suspense>
            </div>
        </div>
    )

}
