'use client';


import React from "react";
import { NavLink, SocialLink } from "./types";

import Link from "next/link";
import styles from './Footer.module.css';



import {
    FaFacebookF, FaInstagram, FaTwitter, FaEnvelope,
} from "react-icons/fa";
const navlinks: NavLink[] = [
    { label: "Home", href: "/"},
    { label: "About", href: "/about"},
    { label: "Products", href: "/products"},
    { label: "Login", href: "/login"},
]

const socialLinks: SocialLink[] = [
    { label: "Facebook", href: "https://facebook.com", icon: <FaFacebookF size={25}/>},
    { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram size={25}/>},
    { label: "Twitter", href: "https://twitter.com", icon: <FaTwitter size={25}/>},
    { label: "Email", href: "https://mailto:info@handcraftedhaven.com", icon: <FaEnvelope size={25}/>},
]

export default function Footer() {


    return (
        <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <Link href="/">
            <span className={styles.footerName}>Handcrafted Haven</span>
            </Link>
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
            <div className={styles.socials}>
                {socialLinks.map((social) => (
                    <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}>
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>
            
        <div><p className={styles.copyright}>&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p></div>      
        </footer>

    );
}
