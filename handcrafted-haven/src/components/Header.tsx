'use client';


import React from "react";
import { NavLink } from "./types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from './Header.module.css';
import SearchBar from "./SearchBar";
const navlinks: NavLink[] = [
    { label: "Home", href: "/"},
    { label: "About", href: "/about"},
    { label: "Products", href: "/products"},
    { label: "Login", href: "/login"},
]


export default function Header() {

    const pathname = usePathname();

    let title = "Handcrafted Haven";
    if (pathname === "/about") title = "About Us";
    return (
        <header className={styles.header}>
        <Link href="/">
         <img
                src="/handcrafted-haven-logo.webp" width="150" height="50"
                alt="Handcrafted Haven Logo"
                />
        </Link>

            <h1>{title}</h1>
                <div className="search">
                    <SearchBar/>
                </div>
             <nav className={styles.navigation}>
                <ul className={styles.navList}>
                    {navlinks.map((link) => (
                        <li key={link.href}>
                            <Link 
                            href={link.href}>
                            {link.label}</Link>
                        </li>
                        ))}

                </ul>
             </nav>
        </header>
    );
}