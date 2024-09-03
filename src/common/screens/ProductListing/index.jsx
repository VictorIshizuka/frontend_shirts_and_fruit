import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";

const ProductListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

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
        {slug.charAt(0).toLocaleLowerCase() + slug.slice(1)} Products
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
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            View product details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
