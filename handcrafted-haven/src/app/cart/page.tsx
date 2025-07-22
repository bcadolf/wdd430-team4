'use client';
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

export default function CartPage() {
  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.pageTitle}>Cart</h1>

      <div className={styles.cartItems}>
        {[1, 2, 3].map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <Image
              src="/placeholder-image.jpg"
              alt="Item"
              width={60}
              height={60}
              className={styles.itemImage}
            />
            <div className={styles.itemInfo}>
              <strong>Item name</strong>
              <p>Short Description</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.totalRow}>
        <span>Total:</span>
        <span className={styles.totalAmount}>₦0.00</span>
      </div>
    </div>
  );
}
