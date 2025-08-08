
import { SellerCard } from "@/components/ui/SellerCard";
import { ProfileCard } from "@/components/ui/ProfileCard";  
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerField } from "next/dist/server/lib/render-server";
import { getServerSession } from "next-auth";

export default async function Page(){  

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }
    console.log(session);

    const userEmail = session.user?.email;
    return (
        <>
            <main className="flex min-h-screen flex-col p-6">
                <div className="grid grid-cols-1 grid-rows-[2fr_1fr] gap-3 p-10 mx-auto mt-3.5 w-full max-w-4xl h-140 ">
                    {/* Imported components */}
                    <ProfileCard userEmail={userEmail}/>
                    <div className="flex justify-start items-center gap-4">
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                            Add Item
                        </button>
                    </div>
                    <SellerCard userEmail={userEmail}/>
                </div>
            </main>    
        </>
    );
}