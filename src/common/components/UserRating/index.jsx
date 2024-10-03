import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";

import {
  useCreateRatingMutation,
  useGetRatingByUserAndProductQuery,
} from "../../slices/ratingApiSlice";

const UserRating = ({ productId }) => {
  const { data: userRating, refetch } =
    useGetRatingByUserAndProductQuery(productId);
  const [createRating] = useCreateRatingMutation();
  const { userInfo } = useSelector(state => state.auth);
  const stars = [];

  async function handleClick(value) {
    try {
      await createRating({
        value,
        product: productId,
        user: userInfo._id,
      }).unwrap();
      refetch();
      toast.success("Rating created successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  }

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span onClick={() => handleClick(i)} key={i}>
        {userRating >= i ? (
          <FaStar />
        ) : userRating >= parseInt(i - 1) + 0.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  }
  return stars;
};

export default UserRating;
