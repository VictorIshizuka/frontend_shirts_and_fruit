import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const { useInfo } = useSelector(state => state.auth);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const userData = await login(formData).unwrap();
        dispatch(setCredentials({ ...userData }));
        navigate("/");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  }

  useEffect(() => {
    if (useInfo) {
      navigate("/");
    }
  }, [useInfo, navigate]);

  return (
    <div>
      <h3 className="text-center">Login</h3>
      <form className="col-6 mx-auto" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="validationServer03Feedback"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={handleChange}
            aria-describedby="validationServer03Feedback"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="col">
          <button className="btn btn-primary w-25" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
