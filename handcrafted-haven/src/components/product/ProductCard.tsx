import Image from 'next/image';
import Link from 'next/link';

import styles from './page.module.css';

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
  seller_id: string;
};

// Functional component that renders a list of product cards
export function ProductCard({ products }: { products: Product[] }) {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <Link href={`/products/${product.id}`}>
            <div className={styles.productImageContainer}>
              <Image
                src={product.image || '/about.webp'}
                alt={`Image of ${product.name}`}

                priority
                fill
  sizes="(max-width: 800px) 100vw, 300px"
                className='object-cover'
                />
            </div>
            <h3 className={styles.productName}>
              {product.name}
            </h3>
          </Link>
          <p className={styles.productPrice}>${product.price}</p>
          {product.inStock ? (
            <p className={styles.inStock}>In Stock</p>
          ) : (
            <p className={styles.outOfStock}>Out of Stock</p>
          )}
    </div>
      ))}
</div>
  );


  
}
