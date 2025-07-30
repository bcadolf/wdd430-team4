import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css'
import Image from "next/image";

type Product = {
    id: number;
    name: string;
    image: string;
}






const SearchBar = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchInput, setSearchInput] = useState("");


useEffect(() => {
    async function fetchProducts() {
        const res = await fetch("/api/products");
        const data = await res.json();
        const linked = data.map((product: any) => ({
            id: product.id,
            name: product.item_name,
            image: product.image,
        }));
        setProducts(linked);
        console.log("Fetched product", linked);
    }
    fetchProducts();
}, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);

};

const handleSearchEnter = () => {
    if (!searchInput.trim()) return;
}

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSearchEnter();
    }
}

const filterProducts = searchInput ? products.filter(product => product.name.toLowerCase().includes(searchInput.toLowerCase())) : [];

return (

    <div className={styles.searchBarContainer}>

        <input
            type="search"
            placeholder="Search Here"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            value={searchInput}
            id="product-search"
            className={styles.searchInput}
            autoComplete='off'
        ></input>
        <button
            onClick={handleSearchEnter}
            className={styles.searchButton}>
                <Image className={styles.searchButtonImage} src="/search_image.webp" alt="Search Button" width={50} height={50} />
        </button>
            
    {searchInput && filterProducts.length > 0 && (
        <div className={styles.dropdownContainer}>
            {filterProducts.map((product, index) => (
                <div key={index} className={styles.itemDrop}>
                    <Image src={product.image || "/about.webp"} alt={product.name} width={50} height={50} className={styles.resultImage} />
                    <span className={styles.productName}>{product.name}</span>
                </div>
            ))}
        </div>
    )}
</div>
);
}


export default SearchBar;