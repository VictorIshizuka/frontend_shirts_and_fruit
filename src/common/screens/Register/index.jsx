import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useRegisterMutation } from "../../slices/usersApiSlice";

const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [register] = useRegisterMutation();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 2) {
      errors.username = "Username must be at least 2 characters";
    }
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
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await register(formData).unwrap();
        toast.success("Registration successful");
        navigate("/login");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  }

  return (
    <div>
      <h3 className="text-center">Register</h3>
      <form className="col-6 mx-auto" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Name
          </label>
          <input
            name="username"
            className="form-control"
            id="username"
            aria-describedby="validationServer03Feedback"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            name="email"
            type="email"
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
            name="password"
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={handleChange}
            aria-describedby="validationServer03Feedback"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-describedby="validationServer03Feedback"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
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

export default Register;
