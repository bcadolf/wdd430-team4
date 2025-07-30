
import { LeftImage } from "@/components/ui/LeftImageOverview";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductDetails, ProductDescription } from "@/components/ui/ProductDetail";

export default function Page(){  
    return <>
        <div className="grid grid-cols-2 grid-rows-[2fr_1fr] gap-3 p-10 mx-auto mt-3.5 w-full max-w-4xl h-140 ">
            {/* Imported components */}
            <LeftImage/>
            <ProductDetails/>
            <ProductDescription/>
        </div>
        
        <h2 className="text-primary text-2xl font-bold ml-2">Related Products</h2>
        
    </>
}
