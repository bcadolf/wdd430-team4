"use client";

import styles from "./page.module.css";

export default function About() {

    // const name ="Handcrafted Haven";

    const handleContact =  async () => {
        const email = "contact@handcraftedhaven.com"

      try {
        await navigator.clipboard.writeText(email);
        alert(`Email address has been copied. Navigate to your email of choice and past in the our address to contact us! Thank you`)
      } catch (err) {
        alert(`There is an issue. Please email us at ${email}`)
        console.log(err);
      }
    };
    const handleShop = () => {
        window.location.href = '/product'

      
      
    };
    const handleCart =  async () => {
        window.location.href = '/checkout'
    };

    const faqs = [
      {
        question: "What is the return policy? ",
        answer: "Items can be return within 30 days of purchasing at full refund, as long as accompanied by receipt or proof of purchase and item similiar shape to purchase time.",
      },
      {
        question: "What is shipping times for items?",
        answer: "Most standard shipping takes 5-7 business days within the US",
      },
      {
        question: "Do you offer international shipping?",
        answer: "Yes, we can ship to any countries accepting shipping from the USA. Rates will be calculated at checkout for additional costs.",
      },
      {
        question: "Can I change or cancel my order after placing it.",
        answer: "Generally if done so within 24 hours orders can be canceled otherwise you will be required to ship the item back in the original condition shipped to you.",
      },
      {
        question: "Who can sell on Hancrafted Haven?",
        answer: "Everyone and Anyone over 18 years of age can sell on this site! See our guide for more information on getting started!",
      }
    ]


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.sectionImage}>
          <h1 className={styles.title}>About Page</h1>
            {// eslint-disable-next-line @next/next/no-img-element}
          <img 
            src="/about.webp"
            alt="About Handcrafted Haven Image"
            className={styles.aboutImg}
          />
                </div>       
        </div>
        
        
        <section className={styles.section}>
          <h3 className={styles.title}>Purpose</h3>
          <div className={styles.sectionContent}>
            <p className={styles.purpose}>Our mission is to connect creative makers and passionate buyers through a marketplace built for originality. Whether you&apos;re shopping for handcrafted goods, vintage treasures, or one-of-a-kind art, we&apos;re here to celebrate individuality and small business. Every purchase supports an independent creator — not a factory — and helps keep craftsmanship and personal expression alive.</p>
          </div>
          <section className={styles.section}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <div className={styles.sectionContent}>
            {faqs.map((faq, index) => (
              <details key={index}>
                <summary className={styles.question}>{faq.question}</summary>
                <p className={styles.answer}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        </section>
      </div>
      <section className={styles.bottomSection}>
        <button className={styles.button} onClick={handleContact}>Contact Us</button>
        <button className={styles.button} onClick={handleShop}>Shop Now</button>
        <button className={styles.button} onClick={handleCart}>Checkout</button>
      </section>
     
    </div>

  );
}
