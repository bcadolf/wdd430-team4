export function ProfileCard() {
    return (
        <>
            <div className="bg-white w-full h-80 rounded-2xlcenter p-4 flex flex-col items-center">
                {/* Profile Icon */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary -mt-10 shadow-lg">
                    {/*<img
                        src=""
                        className="object-cover w-full h-full"
                    />}*/}
                </div>
                <div className="flex flex-col items-center mt-4">
                    <h1 className="text-primary font-bold mt-3 text">Seller Profile</h1>
                    <p className="text-gray-600 text-sm">I create unique handcrafted jewelry.</p>
                    <h3 className="text-primary font-bold mt-3 text-">Jane Doe</h3>
                    <p className="text-gray-600 text-sm mt-1 text-center">Handcrafted Jewelry Artisan</p>
                    {/* Additional Info */}
                    <div className="flex flex-col items-center mt-2">
                        <span className="text-gray-500 text-xs">✉️ jane.doe@email.com</span>
                        <span className="text-gray-500 text-xs">📞 (123) 456-7890</span>
                        <button className="mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}