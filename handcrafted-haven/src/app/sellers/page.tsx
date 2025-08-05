
import { SellerCard } from "@/components/ui/SellerCard";
import { ProfileCard } from "@/components/ui/ProfileCard";  

export default function Page(){  
    return (
        <>
            <main className="flex min-h-screen flex-col p-6">
                <div className="grid grid-cols-1 grid-rows-[2fr_1fr] gap-3 p-10 mx-auto mt-3.5 w-full max-w-4xl h-140 ">
                    {/* Imported components */}
                    <ProfileCard/>
                    <div className="flex justify-start items-center gap-4">
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                            Add Item
                        </button>
                    </div>
                    <SellerCard/>
                </div>
            </main>    
        </>
    );
}