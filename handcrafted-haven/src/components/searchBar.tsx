import React, { useState } from 'react';
import { products } from "@/lib/products";
import styles from './searchBar.module.css'

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);

};

const filterProducts = searchInput ? products.filter(product => product.name.toLowerCase().includes(searchInput.toLowerCase())) : [];

return (<div className={styles.searchBarContainer}>

    <input
    type="search"
    placeholder="Search Here"
    onChange={handleChange}
    value={searchInput}
    id="product-search"
    ></input>

    <table className={styles.resultTable}>
        <tbody>
         {filterProducts.map((product, index) =>
    
        <tr key={index}>
            <td>{product.name}</td>
            <td><img src={product.image} alt={product.name} width="50" height="auto" sizes="{max-width: 100px) 20vw, 100px"/></td>
        </tr>
        
    )}
    </tbody>

    </table>

    
</div>)}

export default SearchBar;