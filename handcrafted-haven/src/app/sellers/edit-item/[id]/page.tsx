'use client';

import { updateProduct } from '@/lib/actions';
import { CategorySchema } from '@/lib/validation/schemas';
import { useActionState } from 'react';
import { use, useEffect, useState } from 'react';
import { Product } from '@/lib/definitions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const initialState = { success: false, message: '' };

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const categories = CategorySchema.shape.category.options;
  const [state, formAction] = useActionState(updateProduct, initialState);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data)) // ← no `.product` here
      .catch(() => setProduct(null));
  }, [id]);
  useEffect(() => {
    if (state.success) {
      const timeout = setTimeout(() => {
        router.push('/sellers');
      }, 1500); // 1.5 seconds

      return () => clearTimeout(timeout);
    }
  }, [state.success, router]);
  if (!product) return <div>Loading...</div>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <form action={formAction} className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold mb-4'>Edit Item</h1>
        <input
          type='text'
          name='item_name'
          placeholder='Item Name'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={product.item_name}
          required
        />
        <textarea
          name='item_description'
          placeholder='Item Description'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={product.item_description}
          required
        />
        <input
          type='number'
          step='0.01'
          min='0'
          name='item_price'
          placeholder='Item Price'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={product.item_price_cents / 100}
          required
        />
        <div>
          <input
            type='file'
            name='item_image'
            accept='image/png, image/jpeg, image/jpg, image/webp'
            className='mb-4 border rounded bg-gray-300 w-full max-w-md'
          />
          <Image
            src={product.item_image}
            alt={`Image of ${product.item_name}`}
            width={200}
            height={200}
            className='object-cover rounded-lg mt-2 px-2'
          />
        </div>

        <input
          type='number'
          name='item_stock'
          placeholder='Item Stock'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={product.item_stock}
          required
        />
        <select
          name='category'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={product.category?.toLowerCase() || ''}
          required
        >
          <option value=''>Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <input type='hidden' name='seller_id' value={product.seller_id} />
        <input type='hidden' name='product_id' value={product.id} />
        {state.message && <p className='text-red-500 mt-2'>{state.message}</p>}
        <button
          type='submit'
          className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors'
        >
          Update Item
        </button>
      </form>
    </div>
  );
}
