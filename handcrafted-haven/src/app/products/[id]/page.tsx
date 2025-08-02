import { notFound } from 'next/navigation';
import Image from "next/image";
import styles from './page.module.css';
import { getProductByParam } from '@/lib/data';
import ProductDetails, {ProductDescription}  from '@/components/ui/ProductDetail';
import { Suspense } from 'react';
import SellerProductList from '@/components/SellerProductList';
import ReviewProduct from '@/components/ReviewProduct';
import ProductAdd from '@/components/ProductAdd';
import SellerProfile from '@/components/SellerProfile';


export default async function ProductPage({params}: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const numberId = Number(id)
    if (isNaN(numberId)) return notFound();

    const products = await getProductByParam({ field: "id", value: numberId});
    console.log(products);
    const product = products?.[0];

  if (!product) return notFound();

  console.log("product object", product);

    return (

        <div className={styles.main}>
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
            </div>
                <ProductAdd seller_id={product.seller_id} product_id={product.id}></ProductAdd>
             <ProductDescription description={product.item_description}/>
            <div>
                 <Suspense fallback={<div>Loading .... </div>}>
                           <SellerProductList sellerId={product.seller_id}/>
                       </Suspense>
            </div>
            <div>
           
                    <ReviewProduct product_id={product.id}/>
            </div>
            <div>
                <SellerProfile seller_id={product.seller_id}/>
            </div>
        </div>
    )

}
