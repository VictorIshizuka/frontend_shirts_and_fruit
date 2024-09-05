import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  useGetPagesQuery,
  useReorderPagesMutation,
} from "../../../slices/pagesApiSlice";

import Loader from "../../../components/Loader";

const ListPages = () => {
  const { data, isLoading, error } = useGetPagesQuery();
  const [reorderPages] = useReorderPagesMutation();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (data) {
      setPages(data);
    }
  }, [data]);

  function onDragStart(e, index) {
    e.dataTransfer.setData("index", index);
  }

  function onDragOver(e, slug) {
    if (slug !== "home") {
      e.preventDefault();
    }
  }
  async function onDrop(e, index) {
    const draggedIndex = e.dataTransfer.getData("index");
    const updatedItems = [...pages];
    const moveItem = updatedItems.splice(draggedIndex, 1)[0];
    updatedItems.splice(index, 0, moveItem);
    setPages(updatedItems);

    const indexedArray = updatedItems.map(page => page._id);
    try {
      const res = await reorderPages(indexedArray);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  if (error) {
    return <p>{error.data.message}</p>;
  }
  const header = ["ID", "Name", "Actions"];
  return (
    <>
      <h3>Pages</h3>
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
            {pages?.map((item, index) => (
              <tr
                key={item._id}
                draggable={true}
                onDragStart={e => onDragStart(e, index)}
                onDragOver={e => onDragOver(e, item.slug)}
                onDrop={e => onDrop(e, index)}
              >
                <td>{item._id}</td>
                <td>{item.username ?? item.name}</td>
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

export default ListPages;
