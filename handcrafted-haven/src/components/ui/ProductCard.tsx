import Image from "next/image";
// Importing the list of products from the local module
import { products } from "@/lib/products";

// Functional component that renders a list of product cards
export function ProductCard() {
    return (
        // Grid layout for product cards: 5 columns with spacing and padding
        <div className="grid grid-cols-5 gap-5 overflow-hidden p-5">
            {/* Loop through each product in the products array */}
            {products.map(product => (
                // Unique key for each product and styling for the card
                <div key={product.id} className="bg-white w-64 h-80 rounded-2xl p-4 flex flex-col items-center">
                    
                    {/* Container for the product image */}
                    <div className="w-full h-40 relative overflow-hidden rounded-lg">
                        <Image
                            src={product.image} // Image source from the product data
                            alt={`Image of ${product.name}`} // Accessible alt text
                            fill // Fill the parent container
                            className="object-cover" // Ensure the image covers the container
                        />
                    </div>

                    {/* Product name displayed in bold and centered */}
                    <h3 className="text-primary font-bold mt-3 text-center">{product.name}</h3>

                    {/* Product price displayed in bold */}
                    <p className="text-primary font-bold">${product.price}</p>

                    {/* Conditional rendering based on stock status */}
                    {product.inStock ? (
                        <p className="text-primary font-bold">In stock</p>
                    ) : (
                        <p className="text-red-600 font-bold">Out of Stock</p>
                    )}
                </div>
            ))}
        </div>
    );
}
