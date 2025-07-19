import Image from "next/image"

export default function Page(){
    return <>
        <div className="grid grid-cols-2 grid-rows-[2fr_1fr] gap-3 p-10 mx-auto mt-3.5 w-full max-w-4xl h-140 ">
            <div className="left-container">
                <Image 
                    src='https://images.unsplash.com/photo-1638256049271-5dc96baf7ffe?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    width={400}
                    height={300}
                    alt="This is a handcrafted item"
                    objectFit="cover"
                />
            </div>
            <div className="px-5 flex flex-col gap-5">
                <h2 className="text-primary text-2xl font-bold">Wrist Beads</h2>
                <p className="font-semibold text-secondary">12 reviews</p>
                <p className="text-primary">$12.99</p>
                <form action="" className="flex flex-col gap-2">
                    <label htmlFor="quantity" className="text-primary">Quantity</label>
                    <input type="number" min={0} id="quantity" className="border border-amber-600 rounded-2xl p-1 w-65 focus:outline-none focus:ring-2 focus:border-primary text-cyan-950" />
                    <div>
                        <button className="text-background bg-secondary w-50 py-1.5 rounded-2xl my-2">Add to Cart</button>
                    </div>
                    <button className="text-background  bg-primary w-65 py-1.5 rounded-2xl my-2">Buy Now</button>
                </form>
            </div>
            <div className="col-span-2 ">
                <h3 className="text-xl text-primary">Product Info</h3>
                <p className="font-bold text-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, porro qui! Quis tempora, quod velit fugiat, quibusdam nesciunt molestias optio non nisi laudantium iure cupiditate unde autem quos nam eum. Lor</p>
            </div>
        </div>
    </>
}