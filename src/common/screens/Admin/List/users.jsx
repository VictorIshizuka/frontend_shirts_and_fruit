import { useGetUsersQuery } from "../../../slices/usersApiSlice";
import Loader from "../../../components/Loader";

const ListUsers = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (error) {
    return <p>{error.data.message}</p>;
  }
  const header = ["ID", "Name", "E-mail", "Actions"];
  return (
    <>
      <h3>Users</h3>
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
            {users?.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.username ?? item.name}</td>
                <td>{item.email}</td>
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

export default ListUsers;
