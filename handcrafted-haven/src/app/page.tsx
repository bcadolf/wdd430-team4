'use client'

import Image from "next/image"
import { ProductCard } from "@/components/ui/ProductCard";
import { images } from '@/lib/hero';
import { useState, useEffect} from 'react';

export default function Home(){
  const [currentImage, setCurrentImage] = useState(0)

  const nextSlide = ()=> {
    setCurrentImage((prevIndex)=>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1)
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      nextSlide()
    }, 15000)

    return ()=> clearInterval(interval);
  }, [currentImage])

  return <>
    <div className="relative h-[500px] w-full ">
        <div className="w-full h-10 overflow-hidden">
          <Image
          src={images[currentImage].url}
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