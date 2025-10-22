import BasicCard from './FeedCard';
import StarCard from '../realcard/RealListrCard'; // your final card

const useStar = process.env.NEXT_PUBLIC_FEED_CARD === 'real';
export default useStar ? StarCard : BasicCard;
