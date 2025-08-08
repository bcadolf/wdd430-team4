'use client';

import React, { useState } from 'react';
import { NavLink } from '../types';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import Image from 'next/image';
const navlinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Login', href: '/sellers/login' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  let title = 'Handcrafted Haven';
  if (pathname === '/about') title = 'About Us';
  return (
    <header className={styles.header}>
      <Link href='/'>
        <Image
          src='/handcrafted-haven-logo.webp'
          width='150'
          height={100}
          alt='Handcrafted Haven Logo'
          sizes='(max-width: 800px) 50vw, 20vw'
        />
      </Link>

      <h1 className={styles.title}>{title}</h1>
      <div className='search'>
        <SearchBar />
      </div>
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <nav className={`${styles.navigation} ${menuOpen ? styles.show : ''}`}>
        <ul className={styles.navList}>
          {navlinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link href='/checkout'>
        <Image
          src='/checkout.webp'
          width='50'
          height='50'
          alt='Handcrafted Haven Checkout'
        />
      </Link>
    </header>
  );
}
