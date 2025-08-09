'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState, useState } from 'react';
import { createSeller } from '@/lib/actions';

export default function CreateSellerForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(
    createSeller,
    undefined
  );

  const [formData, setFormData] = useState({
    owner_first: '',
    owner_last: '',
    store_name: '',
    store_email: '',
    store_address: '',
    password: '',
  });

  const [sellerImage, setSellerImage] = useState<File | null>(null);

  return (
    <form action={formAction}>
      <h1>Create Seller&apos;s Account</h1>

      <label htmlFor='owner_first'>Owner&apos;s First Name</label>
      <input
        id='owner_first'
        type='text'
        name='owner_first'
        placeholder="Enter store owner's first name"
        required
      />

      <label htmlFor='owner_last'>Owner&apos;s Last Name</label>
      <input
        id='owner_last'
        type='text'
        name='owner_last'
        placeholder="Enter store owner's last name"
        required
      />

      <label htmlFor='store_name'>Store Name</label>
      <input
        id='store_name'
        type='text'
        name='store_name'
        placeholder='Enter store name'
        required
      />

      <label htmlFor='store_email'>Store Email</label>
      <input
        id='store_email'
        type='email'
        name='store_email'
        placeholder='Enter store email'
        required
      />

      <label htmlFor='store_address'>Store Address</label>
      <input
        id='store_address'
        type='text'
        name='store_address'
        placeholder='Enter store address'
        required
      />

      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        name='password'
        placeholder='Set account password'
        required
      />

      <label htmlFor='seller_image'>Upload seller&apos;s Image</label>
      <input
        id='seller_image'
        type='file'
        name='seller_image'
        placeholder="Upload seller's image"
        required
      />

      <button type='submit' disabled={isPending}>
        {isPending ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}
