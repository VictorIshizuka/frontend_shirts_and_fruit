import { useGetCategoriesQuery } from "../../../slices/categoriesApiSlice";

import Loader from "../../../components/Loader";

const ListCategories = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (error) {
    return <p>{error.data?.message}</p>;
  }
  const headers = ["ID", "Name", "Actions"];
  return (
    <>
      <h3>Categories</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="table table-bordered sortable">
          <thead>
            <tr className="text-center">
              {headers.map((header, index) => (
                <th key={index} className="w-25">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {categories?.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.name}</td>
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

export default ListCategories;
