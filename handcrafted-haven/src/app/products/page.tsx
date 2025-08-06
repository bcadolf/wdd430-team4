import ProductList from '@/components/product/ProductList';
import { Suspense } from 'react';
import styles from './page.module.css';

export default function ProductsPage() {
  return (
    <div className={styles.containerGrid}>
      <Suspense fallback={<div>Loading .... </div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
