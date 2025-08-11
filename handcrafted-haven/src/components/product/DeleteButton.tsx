'use client';

import { deleteProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export function DeleteButton({ product_id }: { product_id: number }) {
  const router = useRouter();
  return (
    <button
      className='mt-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-red-700'
      onClick={async () => {
        await deleteProduct(product_id);
        router.refresh();
      }}
    >
      Delete Item
    </button>
  );
}
