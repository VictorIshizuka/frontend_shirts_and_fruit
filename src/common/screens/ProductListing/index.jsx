import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Rating from "../../components/Rating";
import Pagination from "../../components/Pagination";

const ProductListing = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("p") || 1;

  const { data, isLoading, error } = useGetProductsQuery({ slug, page });

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

      {data.products?.map((product, index) => (
        <div className="col-4 mb-3" key={index}>
          <Link to={`/product/${product._id}`}>
            <img
              className="img-fluid"
              src={`/images/${product.image}`}
              alt={product.name}
            />
          </Link>
          <h2>{product.name}</h2>
          <Rating rating={product.rating} />
          <p>Price: ${product.price.toFixed(2)}</p>
          <Link
            to={`/product/${product._id}`}
            className="btn btn-sm btn-primary"
          >
            View product details
          </Link>
        </div>
      ))}
      {data.totalPages > 1 && (
        <Pagination currentPage={page} totalPages={data.totalPages} />
      )}
    </div>
  );
};

export default ProductListing;
