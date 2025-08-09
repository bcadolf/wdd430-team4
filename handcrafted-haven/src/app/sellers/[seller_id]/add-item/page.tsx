'use client';

import { createProduct } from '@/lib/actions';
import { CategorySchema } from '@/lib/validation/schemas';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

const initialState = { success: false, message: '' };

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seller_id = searchParams.get('seller_id');
  const categories = CategorySchema.shape.category.options;
  const [state, formAction] = useFormState(createProduct, initialState);

  if (!seller_id) {
    throw new Error('Missing seller_id in query params');
  }

  useEffect(() => {
    if (state.success) {
      const timeout = setTimeout(() => {
        router.push('/sellers');
      }, 1500); // 1.5 seconds

      return () => clearTimeout(timeout);
    }
  }, [state.success, router]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <form
        action={formAction}
        encType='multipart/form-data'
        className='flex flex-col items-center'
      >
        <h1 className='text-2xl font-bold mb-4'>Add New Item</h1>
        <input
          type='text'
          name='item_name'
          placeholder='Item Name'
          className='border p-2 mb-4 w-full max-w-md rounded'
          required
        />
        <textarea
          name='item_description'
          placeholder='Item Description'
          className='border p-2 mb-4 w-full max-w-md rounded'
          required
        />
        <input
          type='number'
          step='0.01'
          min='0'
          name='item_price'
          placeholder='Item Price'
          className='border p-2 mb-4 w-full max-w-md rounded'
          required
        />
        <input
          type='file'
          name='item_image'
          accept='image/png, image/jpeg, image/jpg, image/webp'
          className='mb-4 border rounded bg-gray-300 w-full max-w-md'
        />
        <input
          type='number'
          name='item_stock'
          placeholder='Item Stock'
          className='border p-2 mb-4 w-full max-w-md rounded'
          required
        />
        <select
          name='category'
          className='border p-2 mb-4 w-full max-w-md rounded'
          required
        >
          <option value=''>Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <input type='hidden' name='seller_id' value={seller_id} />
        {state.message && <p className='text-red-500 mt-2'>{state.message}</p>}
        <button
          type='submit'
          className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors'
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
