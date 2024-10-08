import { useDispatch, useSelector } from "react-redux";
import { addOne, clearCart, deleteItem, remove } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "../../slices/ordersApiSlice";

const Cart = () => {
  const [addOrder] = useAddOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleAdd(id) {
    dispatch(addOne(id));
    toast.success("Item added to cart");
  }

  function handleRemoveOne(id) {
    dispatch(remove(id));
    toast.success("Item remove to cart");
  }

  function handleRemoveItem(id) {
    dispatch(deleteItem(id));
    toast.success("Item deleted from cart");
  }

  async function handleCheckout() {
    try {
      await addOrder({
        items: cartItems,
        user: userInfo._id,
        grandTotal,
      }).unwrap();
      dispatch(clearCart());
      navigate("/order-placed");
      toast.success("Order created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  }

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <h3 className="text-center">Your cart is empty</h3>
      ) : (
        <table className="table">
          <thead>
            <tr>
              {/* <th>id</th> */}
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                {/* <td className="align-middle">{item._id}</td> */}
                <td className="align-middle">{item.name}</td>
                <td>
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td className="align-middle">{item.price}</td>
                <td className="align-middle">{item.quantity}</td>
                <td className="align-middle">
                  {(item.price * item.quantity).toFixed(2)}
                </td>

                <td className="align-middle text-center">
                  <button
                    className="btn btn-danger btn-sm  mx-1 "
                    onClick={() => handleAdd(item._id)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-primary btn-sm  mx-1"
                    onClick={() => handleRemoveOne(item._id)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-info btn-sm mx-1"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Clear
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="8" className="text-end ">
                <b>Grand Total </b>: ${grandTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="8" className="text-end  ">
                {userInfo ? (
                  <button
                    className="btn btn-primary mx-1"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                ) : (
                  <>
                    <Link
                      className="btn btn-info mx-1"
                      to="/login?redirect=/cart"
                    >
                      Log in to checkout
                    </Link>
                  </>
                )}
                <button className="btn btn-danger " onClick={handleClearCart}>
                  Clear cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default Cart;
