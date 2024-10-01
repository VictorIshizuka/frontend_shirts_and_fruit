import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartProducts = () => {
  const { cartItems } = useSelector(state => state.cart);

  const getTotalQuantityAndPrice = items => {
    let totalQuantity = 0;
    let totalPrice = 0;
    items.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalQuantity, totalPrice };
  };

  const { totalQuantity, totalPrice } = getTotalQuantityAndPrice(cartItems);

  return (
    <div className="mt-5">
      {cartItems?.length > 0 ? (
        <>
          <p>You have {totalQuantity} item(s) in your cart</p>
          <p>Total price: ${totalPrice.toFixed(2)}</p>
          <p>
            <Link className="btn btn-info" to="/cart">
              View cart
            </Link>
          </p>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartProducts;
