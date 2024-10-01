import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";

const ProductListing = () => {
  const { slug } = useParams();

  const { data: products, isLoading, error } = useGetProductsQuery(slug);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.data.message}</p>;
  }

  return (
    <div className="row">
      <h1 className="mb-5">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} Products
      </h1>

      {products?.map((product, index) => (
        <div className="col-4 mb-3" key={index}>
          <Link to={`/product/${product._id}`}>
            <img
              className="img-fluid"
              src={`/images/${product.image}`}
              alt={product.name}
            />
            <p>{product.name}</p>
          </Link>
          <p>Price: ${product.price.toFixed(2)}</p>
          <Link to={`/product/${product._id}`} className="btn btn-primary">
            View product details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
