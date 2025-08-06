import styles from './page.module.css';
export type Review = {
  id: number;
  rating: number;
  product_id: number;
  seller_id: string;
  user_name: string;
  description: string;
};

// Functional component that renders a list of product cards
export function ReviewCard({ reviews }: { reviews: Review[] }) {
  return (

    <div className={styles.reviewCard}>

      {reviews.map((review) => (
        <div key={review.id} className={styles.singleReview}>
            <h3 className='text-primary font-bold mt-3 text-center'>
                {review.user_name}
            </h3>
            <p className={styles.reviewRating}> Rating: {review.rating} / 5</p>
            <p className={styles.reviewDescription}>{review.description}</p>
        </div>))}
    </div>);}
