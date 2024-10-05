import { useState } from "react";
import {
  useDeleteProductImageMutation,
  useGetProductImagesQuery,
  useUploadMultipleImagesMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import Loader from "../Loader";

// eslint-disable-next-line react/prop-types
const MultipleImageLoad = ({ id }) => {
  const [errors, setErrors] = useState([]);

  const [uploadMultipleImages, { isLoading }] =
    useUploadMultipleImagesMutation();
  const { data: images } = useGetProductImagesQuery(id);

  const [deleteImage] = useDeleteProductImageMutation();

  async function handleChange(e) {
    const selectedFiles = Array.from(e.target.files);

    const selectedImages = selectedFiles.filter(
      file => file.type === "image/png" || file.type === "image/jpeg"
    );
    const rejectFiles = selectedFiles.filter(
      file => !(file.type === "image/png" || file.type === "image/jpeg")
    );
    if (rejectFiles.length > 0) {
      const errorsMessages = rejectFiles.map(
        file => `${file.name} is not a image`
      );
      setErrors(errorsMessages);
    }
    try {
      const toUpload = new FormData();
      selectedImages.forEach(image => {
        toUpload.append("images", image);
      });
      toUpload.append("id", id);
      console.log(toUpload.get("id"), toUpload.get("images"));
      await uploadMultipleImages(toUpload);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("Filed to upload images.");
    }
  }
  async function handleDelete(image) {
    console.log(id, image);
    try {
      await deleteImage({ id, image });
      toast.success("Image deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete image");
    }
  }

  return (
    <div className="mt-3 position-relative">
      <h4>Multiple image upload</h4>
      <input type="file" multiple onChange={handleChange} />
      {isLoading && <Loader />}
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <span className="error" key={index}>
              {error}
            </span>
          ))}
        </div>
      )}
      <div className="d-flex flex-md-row flex-column">
        {images?.map(image => (
          <div key={image}>
            <img
              //className="img-fluid"
              src={`/gallery/${id}/${image}`}
              alt={image}
              style={{ width: "100px", margin: "10px" }}
            />
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(image)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {!images?.length && <h5 className="mt-3">No images upload!</h5>}
    </div>
  );
};

export default MultipleImageLoad;
