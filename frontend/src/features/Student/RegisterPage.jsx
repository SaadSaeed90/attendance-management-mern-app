import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { register } from "../api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const formFilled =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.passwordConfirm;

  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setEmailExists(await checkEmailExists(formData.email));

    // if (emailExists) return;

    try {
      const response = await fetch("/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setEmailExists(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl pb-7 font-bold">Student Registeration Form</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          {emailExists && (
            <p className="text-red-400 py-2">Email already exists</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
            formFilled
              ? "bg-indigo-500 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!formFilled}
        >
          Register
        </button>
        <p className="pt-2">
          Already Registered?{" "}
          <Link to="/" className="text-indigo-500">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
