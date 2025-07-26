import styles from './page.module.css';
import LandingSkeleton from '../ui/skeletons';

export default function About() {
  const name = 'Handcrafted Haven';

  const faqs = [
    {
      question: 'What is the return policy? ',
      answer:
        'Items can be return within 30 days of purchasing at full refund, as long as accompanied by receipt or proof of purchase and item similiar shape to purchase time.',
    },
    {
      question: 'What is shipping times for items?',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Page</h1>
      <p className={styles.content}>This is the about page for {name}.</p>

      <section className={styles.section}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <details key={index}>
            <summary className={styles.question}>{faq.question}</summary>
            <p className={styles.answer}>{faq.answer}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
