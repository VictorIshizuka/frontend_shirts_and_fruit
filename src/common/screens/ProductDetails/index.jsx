import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useGetProductQuery } from "../../slices/productsApiSlice";
import { addToCart } from "../../slices/cartSlice";

import Loader from "../../components/Loader";
import ProductGallery from "../Admin/ProductGallery";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetProductQuery(id);

  function handleAddToCart() {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Product added to cart");
  }

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error.data.message}</p>;
  }

  return (
    <div className="row">
      <div className="col-4">
        <img className="img-fluid" src={`/images/${product.image}`} />
      </div>
      <div className="col-8">
        <h2>{product.name}</h2>
        <div>{product.description}</div>
        <p>Price: ${product.price.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
      <ProductGallery id={id} />
    </div>
  );
};

export default ProductDetails;
