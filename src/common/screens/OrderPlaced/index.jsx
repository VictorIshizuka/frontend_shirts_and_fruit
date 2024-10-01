import { Link } from "react-router-dom";

const OrderPlaced = () => {
  return (
    <div className="text-center">
      <h2 className="bg-success text-light py-1">Order placed successfully</h2>
      <h4>You can the details and the status of your order in your</h4>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default OrderPlaced;
