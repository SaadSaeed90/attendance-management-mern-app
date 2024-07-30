import { useState } from "react";
import { useSelector } from "react-redux";

const MarkLeave = () => {
  const [formData, setFormData] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
  });
  const formFilled = formData.reason && formData.fromDate && formData.toDate;

  const [submitted, setSubmitted] = useState(false);

  const { name, _id } = useSelector((store) => store.student);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendLeave = async () => {
    try {
      const response = await fetch(`/api/v1/leave/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, name, user: _id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.status === "success";
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(await sendLeave());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Mark Leave</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            From Date
          </label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            To Date
          </label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Reason
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          ></textarea>
        </div>
        {submitted && (
          <p className="text-green-400 py-2">Your leave has been submitted</p>
        )}
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
            submitted || formFilled
              ? "bg-indigo-500 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!formFilled || submitted}
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default MarkLeave;
