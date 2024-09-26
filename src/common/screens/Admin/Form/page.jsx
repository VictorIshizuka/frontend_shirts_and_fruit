import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JodiEditor from "jodit-react";

import {
  useAddPageMutation,
  useGetPageQuery,
  useUpdatePageMutation,
} from "../../../slices/pagesApiSlice";
import Loader from "../../../components/Loader";

const FormPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [addPage] = useAddPageMutation();
  const [updatePage] = useUpdatePageMutation();
  const { data: page, isLoading, error } = useGetPageQuery(slug);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: "", body: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleFormChange(name, value) {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleJoditChange(content) {
    handleFormChange("body", content);
  }

  async function onSubmit(e) {
    e.preventDefault();

    let errors = {};
    if (!formData.name.trim()) {
      errors.name = "Title is required";
    } else if (formData.name.length < 4) {
      errors.name = " Title must be at least 4 characters";
    }
    if (!formData.body.trim()) {
      errors.body = "Page body is required";
    } else if (formData.body.length < 20) {
      errors.body = "Page body must be at least 20 characters";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        if (!slug) {
          const res = await addPage(formData).unwrap();
          navigate("/admin/pages");
          toast.success(res.message);
        } else if (Object.keys(formData).length) {
          //console.log(formData);
          const res = await updatePage({
            id: page._id,
            body: formData,
          }).unwrap();
          toast.success(res.message);
          navigate("/admin/pages");
        }
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  }

  useEffect(() => {
    if (page) {
      setFormData({ name: page.name ?? "", body: page.body ?? "" });
    }
  }, [page]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    <p>{error.data.message}</p>;
  }

  return (
    <>
      <div>
        <h3 className="text-center"> {slug ? "Edit page" : "Add page"}</h3>
        <form className="col-10 mx-auto" onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Title
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
          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Body
            </label>
            <JodiEditor
              ref={editor}
              name="body"
              value={formData.body}
              onChange={newContent => handleJoditChange(newContent)}
            />
            {errors.body && <span className="error">{errors.body}</span>}
          </div>
          <div className="col text-center ">
            <button className="btn btn-primary w-25 me-2" type="submit">
              Register
            </button>
            <button
              className="btn btn-outline-danger w-25 "
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormPage;
