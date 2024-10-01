const CartItem = ({ item }) => {
  return (
    <div className="col-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <img
            className="img-fluid"
            src={`/images/${item.image}`}
            alt={item.name}
            style={{ width: "100px" }}
          />
          <p className="card-text">Quantity: {item.quantity}</p>
          <p className="card-text">Price: ${item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
