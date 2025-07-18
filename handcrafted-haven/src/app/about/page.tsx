import styles from "./page.module.css";

export default function About() {

    const name ="Handcrafted Haven";


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Page</h1>
      <p className={styles.content}>This is the about page for {name}.</p>
    </div>
  );
}
