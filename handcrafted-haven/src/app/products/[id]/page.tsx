import { notFound } from 'next/navigation';

import { getProductByParam } from '@/lib/data';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const products = await getProductByParam({ field: 'id', value: id });
  console.log(products);
  const product = products?.[0];

  if (!product) return notFound();

  return (
    <div>
      <h1>{product.item_name}</h1>
      <img src={product.item_image} alt={product.item_name} />
      <p>{product.item_description}</p>
      <p>Price: ${product.item_price}</p>
      <p>Stock: {product.item_stock}</p>
    </div>
  );
}
