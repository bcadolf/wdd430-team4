import Image from 'next/image';
import Link from 'next/link';
import ProductAdd from '../ProductAdd';

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
    <div className='grid grid-cols-5 gap-10 overflow-hidden p-5'>
      {products.map((product) => (
        <div key={product.id} className='bg-white w-64 mx-auto h-80 shadow-lg rounded-2x1 p-4 transition-transform duration-300 hover:scale-125 flex flex-col items-center rounded '>
          <Link href={`/products/${product.id}`}>
            <div className='w-full h-40 relative overflow-hidden rounded-lg'>
              <Image
                src={product.image || '/about.webp'}
                alt={`Image of ${product.name}`}
                fill
                className='object-cover'
                />
            </div>
            <h3 className='text primary font-bold mt-3 text-center'>
              {product.name}
            </h3>
          </Link>
          <p className='text-primary font-bold'>${product.price}</p>
          {product.inStock ? (
            <p className='text-primary font-bold'>In Stock</p>
          ) : (
            <p className='text-primary font-bold'>Out of Stock</p>
          )}
    </div>
      ))}
</div>
  );
}
