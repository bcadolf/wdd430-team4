
import HeroImage from '@/components/ui/HeroImage';
import { getDistinctCategories } from '@/lib/data';
import CategoryProductList from '@/components/product/CategoryProductList';

export default async function Home(){
      const categories = await getDistinctCategories();

  return <>
    <HeroImage/>
    <CategoryProductList categories={categories}/>
  </>
}