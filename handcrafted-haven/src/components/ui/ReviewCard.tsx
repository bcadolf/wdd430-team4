
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

    <div className='grid grid-cols-5 gap-5 overflow-hidden p-5'>

      {reviews.map((review) => (
        <div key={review.id} className='bg white w-64 h-48 rounded-2x1 p-4 flex flex-col items-center shadow'>
            <h3 className='text-primary font-bold mt-3 text-center'>
                {review.user_name}
            </h3>
            <p className='text-yellow-500 font-bold'> Rating: {review.rating} / 5</p>
            <p className='text-primary mt-2 text-center'>{review.description}</p>
        </div>))}
    </div>);}
