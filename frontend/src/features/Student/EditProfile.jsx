import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail, updateName } from "./StudentSlice";

const EditProfile = () => {
  const { name, email } = useSelector((store) => store.student);

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    passwordCurrent: "",
    password: "",
  });

  const formFilled =
    formData.email &&
    formData.password &&
    formData.name &&
    formData.passwordCurrent;

  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateNameEmail = async () => {
    try {
      const response = await fetch(`/api/v1/user/updateMe`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      const success = data.status === "success";
      return success;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const updatePassword = async () => {
    setUpdated(false);
    setError("");
    try {
      const response = await fetch(`/api/v1/user/updateMyPassword`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          password: formData.password,
          passwordCurrent: formData.passwordCurrent,
          passwordConfirm: formData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      const success = data.status === "success";
      return success;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordUpdated = await updatePassword();
    if (!passwordUpdated) return;
    const nameEmailUpdated = await updateNameEmail();
    if (!nameEmailUpdated) return;
    setUpdated(true);
    dispatch(updateName(formData.name));
    dispatch(updateEmail(formData.email));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Updated name
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
            Updated email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Current password
          </label>
          <input
            type="password"
            name="passwordCurrent"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            New password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        {updated && <p className="text-green-500 pb-2">Profile Updated</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
            formFilled
              ? "bg-indigo-500 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!formFilled}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
