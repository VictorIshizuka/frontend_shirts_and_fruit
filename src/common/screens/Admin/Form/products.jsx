import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JodiEditor from "jodit-react";

import Loader from "../../../components/Loader";
import {
  useAddProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../slices/productsApiSlice";
import { useGetCategoriesQuery } from "../../../slices/categoriesApiSlice";
import MultipleImageLoad from "../../../components/MulltipleImageUpload";

const FormProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(() => {
    if (product) {
      return {
        id: "",
        name: "",
        category: "",
        price: "",
        description: "",
        image: null,
        productImage: "",
      };
    } else {
      return {
        name: "",
        category: "",
        price: "",
        description: "",
        image: null,
      };
    }
  });

  const [preview, setPreview] = useState(null);
  const [selectFile, setSelectFile] = useState(null);

  function handleChange(e) {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
      setSelectFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  }

  function handleFormChange(name, value) {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleJoditChange(content) {
    handleFormChange("description", content);
  }

  async function onSubmit(e) {
    e.preventDefault();

    let errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 4) {
      errors.name = "Name must be at least 4 characters";
    }
    if (!formData.category.trim()) {
      errors.category = "Category is required";
    }
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!priceRegex.test(formData.price.toString())) {
      errors.price = "Please enter a valid price (e.g 10 or 10.99)";
    }

    if (formData.image !== null) {
      const extension = formData.image.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["jpg", "jpeg", "png"];
      if (!allowedExtensions.includes(extension)) {
        errors.image = "Please upload a valid image (jpg, jpeg or png)";
      }
    }
    if (!formData.description.trim()) {
      errors.description = "Product description is required";
    } else if (formData.description.length < 20) {
      errors.description = "Product description must be at least 20 characters";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.image);
      try {
        if (
          !id
          //&&
          // Object.keys(formData).length &&
          // Object.keys(errors).length === 0
        ) {
          const res = await addProduct(formDataToSend).unwrap();
          navigate("/admin/products");
          toast.success(res.message);
          return;
        } else if (
          Object.keys(formData).length &&
          Object.keys(errors).length === 0
        ) {
          formDataToSend.append("id", id);
          formDataToSend.append("productImage", formData.productImage);
          const res = await updateProduct(formDataToSend).unwrap();
          toast.success(res.message);
          navigate("/admin/products");
        }
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  }

  useEffect(() => {
    if (!selectFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectFile]);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name ?? "",
        category: product.category ?? "",
        price: product.price ?? "",
        description: product.description ?? "",
        image: null,
        productImage: product.image ?? "",
      });
    }
  }, [product]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.data?.message}</p>;
  }

  return (
    <>
      <div>
        <h3 className="text-center">{id ? "Edit product" : "Add product"}</h3>
        <form className="col-6 mx-auto" onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              name="name"
              className="form-control"
              id="name"
              aria-describedby="validationServer03Feedback"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control"
                  aria-describedby="validationServer03Feedback"
                >
                  <option>Select a category</option>
                  {categories?.map(category => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  name="price"
                  className="form-control"
                  id="price"
                  aria-describedby="validationServer03Feedback"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <span className="error">{errors.price}</span>}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              name="image"
              className="form-control"
              id="image"
              type="file"
              aria-describedby="validationServer03Feedback"
              onChange={handleChange}
            />
            {(selectFile || product?.image) && (
              <div className="mt-3">
                {product?.image && <label>Current Image: </label>}
                <img
                  src={preview ?? `/images/${product?.image}`}
                  alt="preview"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "10px",
                    marginLeft: "5px",
                  }}
                />
              </div>
            )}
            {errors.image && <span className="error">{errors.image}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Description
            </label>
            <JodiEditor
              ref={editor}
              name="description"
              value={formData.description}
              onChange={newContent => handleJoditChange(newContent)}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>
          <div className="col text-center ">
            <button className="btn btn-primary w-25 me-2" type="submit">
              Register
            </button>
            <button
              type="button"
              className="btn btn-outline-danger w-25"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
        <div className="col-6 mx-auto">
          {id && <MultipleImageLoad id={product._id} />}
        </div>
      </div>
    </>
  );
};

export default FormProduct;
