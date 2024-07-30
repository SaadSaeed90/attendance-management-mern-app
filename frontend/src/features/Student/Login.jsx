import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateEmail, updateId, updateName } from "./StudentSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const formFilled = formData.email && formData.password;

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkUser = async (email, password) => {
    try {
      const response = await fetch(`/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      const user = JSON.stringify(data.data.user);

      localStorage.setItem("user", user);
      localStorage.setItem("token", data.token);
      dispatch(updateName(data.data.user.name));
      dispatch(updateId(data.data.user._id));
      dispatch(updateEmail(formData.email));

      return data.status === "success";
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const userExists = await checkUser(formData.email, formData.password);
      if (userExists) navigate("/dashboard");
    } catch (error) {
      throw new Error("Couldn't log in :(");
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center flex-col justify-center bg-gray-100">
        <h1 className="text-2xl pb-7 font-bold">Student Registeration Form</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6">Login</h2>
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
          {error && (
            <p className="text-red-400 py-2">Incorrect user credentials</p>
          )}
          <button
            type="submit"
            className={`w-full p-2 text-white rounded ${
              formFilled
                ? "bg-indigo-500 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!formFilled}
          >
            Login
          </button>
          <p className="pt-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-indigo-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
