import CreateSellerForm from '@/app/ui/create-account';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Seller Account',
};

export default function CreateSellerPage() {
  return (
    <main className='flex items-center justify-center md:h-screen'>
      <Suspense>
        <CreateSellerForm/>
      </Suspense>
    </main>
  );
}