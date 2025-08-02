import Image from 'next/image';
import Link from 'next/link';

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
};

// Functional component that renders a list of product cards
export function ProductCard({ products }: { products: Product[] }) {
  return (
    // Grid layout for product cards: 5 columns with spacing and padding
    <div className='grid grid-cols-5 gap-5 overflow-hidden p-5'>
      {/* Loop through each product in the products array */}
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          {/* Unique key for each product and styling for the card */}
          <div className='bg-white w-64 h-80 rounded-2xl p-4 flex flex-col items-center'>
            {/* Container for the product image */}
            <div className='w-full h-40 relative overflow-hidden rounded-lg'>
              <Image
                src={product.image || '/about.webp'} // Image source from the product data
                alt={`Image of ${product.name}`} // Accessible alt text
                fill // Fill the parent container
                className='object-cover' // Ensure the image covers the container
              />
            </div>

            {/* Product name displayed in bold and centered */}
            <h3 className='text-primary font-bold mt-3 text-center'>
              {product.name}
            </h3>

            {/* Product price displayed in bold */}
            <p className='text-primary font-bold'>${product.price}</p>

            {/* Conditional rendering based on stock status */}
            {product.inStock ? (
              <p className='text-primary font-bold'>In stock</p>
            ) : (
              <p className='text-red-600 font-bold'>Out of Stock</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
