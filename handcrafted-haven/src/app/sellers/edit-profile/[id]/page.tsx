'use client';

import { updateSeller } from '@/lib/actions';
import { CategorySchema } from '@/lib/validation/schemas';
import { useActionState } from 'react';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Seller } from '@/lib/definitions';

export default function EditProfilePage ({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [seller, setSeller] = useState<Seller | null>(null);
  const categories = CategorySchema.shape.category.options;
  
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
        <h1 className='text-2xl font-bold mb-4'>Edit Profile</h1>
        <input
          type='text'
          name='user_name'
          placeholder='User Name'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.user_name}
          required
        />
        <input
          type='text'
          name='store_name'
          placeholder='Store Name'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.store_name}
          required
        />
        <input
          type='email'
          name='store_email'
          placeholder='Store Email'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.store_email}
          required
        />
        <input
          type='text'
          name='store_address'
          placeholder='Store Address'
          className='border p-2 mb-4 w-full max-w-md rounded'
          defaultValue={seller.store_address}
          required
        />
        <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-primary -mt-10 shadow-lg'>
          <Image
            src={seller.seller_image}
            alt='Seller profile image'
            className='object-cover w-full h-full'
            width={100}
            height={150}
          />
        </div>
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
        