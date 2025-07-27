import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css'

const HamburgerMenu = () => {
    const [Open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!Open);

    return (
        <div className={styles.container}>
            <button 
                className={`${styles.hamburger} ${Open ? styles.Open : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle Hamburger Menu"
            />
        </div>
    );
}