import { toast } from "react-toastify";

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../slices/productsApiSlice";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
//import { useGetCategoriesQuery } from "../../../slices/categoriesApiSlice";

const ListProducts = () => {
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: products, isLoading, error } = useGetProductsQuery("all");
  //  const { data: categoryItem } = useGetCategoriesQuery();

  async function onDeleteProduct(id) {
    if (window.confirm("Are you sure?")) {
      try {
        if (id) {
          const res = await deleteProduct(id);
          toast.success(res.message);
          return;
        }
        toast.success("Internal error, please contact an administrator");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  }

  if (error) {
    return <p>{error.data.message}</p>;
  }

  const header = ["ID", "Name", "Price", "Category", "Image", "Actions"];
  return (
    <>
      <div className="d-flex mb-3">
        <h3 className="me-3">Products</h3>
        <button
          className="btn btn-success "
          onClick={() => {
            navigate("/admin/products/form");
          }}
        >
          Add product
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="table table-bordered sortable">
          <thead>
            <tr className="text-center">
              {header.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr key={index}>
                <td className="align-middle">{item._id}</td>
                <td className="align-middle">{item.name}</td>
                <td
                  className="align-middle text-center"
                  style={{ maxWidth: "100px" }}
                >
                  ${item.price.toFixed(2)}
                </td>
                <td className="align-middle text-center">{item.category}</td>
                <td className="text-center">
                  <img
                    className="img-fluid"
                    style={{ maxWidth: "100px" }}
                    src={`/images/${item.image}`}
                    alt={item.name}
                  />
                </td>
                <td className="align-middle text-center">
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => {
                      navigate(`/admin/products/form/${item._id}`);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      onDeleteProduct(item._id);
                    }}
                  >
                    Delete
                  </button>
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
