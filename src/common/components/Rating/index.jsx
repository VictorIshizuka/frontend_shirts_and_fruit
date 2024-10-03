import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";

const Rating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i}>
        {rating >= i ? (
          <FaStar />
        ) : rating >= parseInt(i - 1) + 0.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  }
  return stars;
};

export default Rating;
