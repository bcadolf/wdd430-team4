export default function LandingSkeleton() {
    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 ">
            <div className="flex justify-center md:w-1/3">
                <div className="h-64 w-64 rounded-md bg-gray-200" />
            </div>

            <div className="flex flex-col justify-start md:2/3 gap-4">
                <div className="h-6 w-2/3 rounded bg-gray-200" />

                <div className="border-2 border-orange-300 rounded p-4">
                    <div className="h-20 w-full rounded bg-gray-100" />
                </div>

                <div className="flex flex col sm flex-row gap-4">
                    <div className="h-10 w-32 rounded-full bg-gray-300" />
                    <div className="h-10 w-40 rounded-full bg-gray-300" />
                </div>
            </div>
        </div>
    );
}
// Featured seller (image, name, blurb, link to shop)
// Shop here(featured item image, shop here button, )