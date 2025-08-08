import HeroImage from '@/components/ui/HeroImage';
import { getDistinctCategories } from '@/lib/data';
import CategoryButtons from '@/components/ui/CategoryButtons';

export default async function Home(){
  const categories = await getDistinctCategories();
  return <>
    <HeroImage/>
    <CategoryButtons categories={categories}/>
  </>
}