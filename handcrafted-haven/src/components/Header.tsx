'use client';

import { usePathname } from "next/navigation";


export default function Header() {

    const pathname = usePathname();

    let title = "Handcrafted Haven";
    if (pathname === "/about") title = "About Us";
    return (
        <header className="site-header">
            <h1>{title}</h1>
        </header>
    );
}