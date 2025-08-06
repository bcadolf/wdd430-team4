import Image from "next/image";

export function LeftImage(){
    return  <div className="left-container">
                <Image 
                    src='https://images.unsplash.com/photo-1638256049271-5dc96baf7ffe?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    width={400}
                    height={300}
                    alt="This is a handcrafted item"
                    objectFit="cover"
                />
            </div>
}