import { getProductByParam } from '@/lib/data';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductByParam({
    field: 'id',
    value: id,
  });
  if (!product || product.length === 0) {
    throw new Error('Product not found.');
  }

  const item = product[0];
  return `edit item page ${id}  ${item.item_name} `;
}
