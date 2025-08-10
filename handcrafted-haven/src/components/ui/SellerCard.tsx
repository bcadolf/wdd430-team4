import Image from 'next/image';

import { getProductByParam } from '@/lib/data';
import Link from 'next/link';

export async function SellerCard({ seller_id }: { seller_id: string }) {
  const products = await getProductByParam({
    field: 'seller_id',
    value: seller_id,
  }); // Replace with actual seller ID logic

  if (!products || products.length === 0) {
    return (
      <div className='text-center text-gray-500'>
        No products found for this seller.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 grid-rows-none auto-rows-auto gap-4 overflow-auto'>
      {products.map((product) => (
        <div
          key={product.id}
          className='bg- w-64 h-80 rounded-2xl p-4 flex flex-col items-center'
        >
          <div className='w-full h-40 relative overflow-hidden rounded-lg'>
            <Image
              src={product.item_image}
              alt={`Image of ${product.item_name}`}
              fill
              className='object-cover'
            />
          </div>
          <h3 className='text-primary font-bold mt-3 text-center'>
            {product.item_name}
          </h3>
          <p>Price: {product.item_price}</p>
          <p className='text-gray-600 text-sm mt-1 text-center'>
            {product.item_description}
          </p>
          <Link href={`sellers/edit-item/${product.id}`}>
            <button className='mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors'>
              Edit Item
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
