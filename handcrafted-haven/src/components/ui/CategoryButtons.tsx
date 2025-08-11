'use client'

type Prop = {
    categories: string[],
    onCategoryClick: (category: string)=> void
}

export default function CategoryButtons({categories, onCategoryClick}: Prop){
    return <>
        <div className='flex p-5 gap-1 justify-center flex-wrap'>
            {categories.map((category, index) => (
                
                    <div key={index} 
                        onClick={()=> onCategoryClick(category)}
                        className='text-accent border px-1.5 py-1 w-[110px] rounded-2xl text-center cursor-pointer hover:bg-accent hover:text-white'>
                            {category}
                    </div>
                
            ))}
        </div>

    </>
}