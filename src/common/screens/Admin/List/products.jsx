import { useGetProductsQuery } from "../../../slices/productsApiSlice";
import Loader from "../../../components/Loader";

const ListProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery("all");

  if (error) {
    return <p>{error.data.message}</p>;
  }
  const header = ["ID", "Name", "Price", "Actions"];
  return (
    <>
      <h3>Products</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="table table-bordered sortable">
          <thead>
            <tr className="text-center">
              {header.map((header, index) => (
                <th key={index} className="w-25">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products?.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td className="d-flex justify-content-center">
                  <button className="btn btn-warning me-2">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ListProducts;
