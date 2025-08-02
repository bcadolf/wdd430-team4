import Image from "next/image"
import { ProductCard } from "@/components/ui/ProductCard";

export default function Home(){
  return <>
    <div className="relative h-[500px] w-full ">
        <div className="w-full h-10 overflow-hidden">
          <Image
          src='https://images.unsplash.com/photo-1496769843785-93aa0be525dc?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFuZGNyYWZ0ZWR8ZW58MHx8MHx8fDI%3D'
          alt="Hero image of a handcrafted item"
          fill
          className="object-cover"
          priority
          />
        </div>
        <div className="absolute inset-0 bg-opacity-30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Handcrafted Treasures</h1>
          <p className="text-white text-lg md:text-xl max-w-xl">Unique pieces made with love and intention.</p>
        </div>
      </div>
      <div>
        <ProductCard/>
      </div>
    </>

}