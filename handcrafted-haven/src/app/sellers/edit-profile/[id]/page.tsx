'use client';

import { updateSeller } from '@/lib/actions';
import { useActionState } from 'react';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Seller } from '@/lib/definitions';

const initialState = { success: false, message: '' };

export default function EditProfilePage ({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [state, formAction] = useActionState(updateSeller, initialState);
  
  useEffect(() => {
    fetch(`/api/seller/${id}`)
      .then((res) => res.json())
      .then((data) => setSeller(data)) // ← no `.product` here
      .catch(() => setSeller(null));
  }, [id]);

  useEffect(() => {
    if (state.success) {
      const timeout = setTimeout(() => {
        router.push('/sellers');
      }, 1500); // 1.5 seconds

      return () => clearTimeout(timeout);
    }
  }, [state.success, router]);

  if (!seller) return <div>Loading...</div>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <form action={formAction} className='flex flex-col items-center'>
        <h1 className='text-black text-2xl font-bold mb-4'>Edit Profile</h1>
        <input
          type='text'
          name='owner_first'
          placeholder='First Name'
          className='mt-3 bg-primary text-white border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.owner_first}
          required
        />
        <input
          type='text'
          name='owner_last'
          placeholder='Last Name'
          className='mt-3 bg-primary text-white border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.owner_last}
          required
        />
        <input
          type='text'
          name='store_name'
          placeholder='Store Name'
          className='mt-3 bg-primary text-white border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.store_name}
          required
        />
        <input
          type='email'
          name='store_email'
          placeholder='Store Email'
          className='mt-3 bg-primary text-white border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.store_email}
          required
        />
        <input
          type='text'
          name='store_address'
          placeholder='Store Address'
          className='mt-3 bg-primary text-white border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.store_address}
          required
        />
        <input
          type='text'
          name='password'
          placeholder='Password'
          className='mt-3 bg-primary text-white border p-2 mb-4 w-full max-w-md rounded'
        />
        <div>
            <input
              type='file'
              name='item_image'
              accept='image/png, image/jpeg, image/jpg, image/webp'
              className='mt-3 bg-primary text-white mb-4 border rounded bg-gray-300 w-full max-w-md'
            />
            <Image
              src={seller.seller_image}
              alt={`Image of ${seller.owner_first} ${seller.owner_last}`}
              width={200}
              height={200}
              className='object-cover rounded-lg mt-2 px-2'
            />
          </div>
        <input type='hidden' name='seller_id' value={seller.id} />
        {state.message && <p className='text-red-500 mt-2'>{state.message}</p>}
        <button
          type='submit'
          className='mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors'
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}  
        