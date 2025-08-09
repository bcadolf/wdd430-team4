import { getSellerByParam } from '@/lib/data';
import Image from 'next/image';
export async function ProfileCard({ sellerId }: { sellerId: string }) {
  if (!sellerId) {
    throw new Error('Seller ID is required to fetch profile data.');
  }
  // Fetch seller profile data based on seller_id
  const sellerProfile = await getSellerByParam({
    field: 'id',
    value: sellerId,
  });
  if (!sellerProfile || sellerProfile.length === 0) {
    throw new Error('Seller profile not found.');
  }
  const profile = sellerProfile;
  //   console.log('Seller Profile:', profile);
  return (
    <>
      <div className='bg-white w-full h-80 rounded-2xlcenter p-4 flex flex-col items-center'>
        {/* Profile Icon */}
        <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-primary -mt-10 shadow-lg'>
          <Image
            src={profile.seller_image}
            alt='Sellers profile image'
            className='object-cover w-full h-full'
            width={100}
            height={150}
          ></Image>
        </div>
        <div className='flex flex-col items-center mt-4'>
          {/*
          <h1 className='text-primary font-bold mt-3 text'>Seller Profile</h1>
          <p className='text-gray-600 text-sm'>
            I create unique handcrafted jewelry.
          </p>*/}
          <h3 className='text-primary font-bold mt-3 text-'>
            {profile.owner_first} {profile.owner_last}
          </h3>
          <p className='text-gray-600 text-sm mt-1 text-center'>
            Handcrafted Jewelry Artisan
          </p>
          {/* Additional Info */}
          <div className='flex flex-col items-center mt-2'>
            <span className='text-gray-500 text-xs'>
              ✉️ {profile.store_email}
            </span>
            <span className='text-gray-500 text-xs'>
              {profile.store_address}
            </span>
            <button className='mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors'>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
