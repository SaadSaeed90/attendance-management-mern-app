import React, { useState } from "react";
// import { updateGradingCriteria } from '../api'; // Make sure this API function is defined

const GradingSystem = () => {
  const [formData, setFormData] = useState({
    gradeA: "",
    gradeB: "",
    gradeC: "",
    gradeD: "",
    gradeF: "",
  });
  const [updated, setUpdated] = useState(false);

  const gradeList = {};
  const gradesArr = ["gradeA", "gradeB", "gradeC", "gradeD", "gradeF"];

  gradesArr.forEach((gradeVal) => {
    if (formData[gradeVal]) {
      gradeList[gradeVal] = Number(formData[gradeVal]);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ID = ""; // Paste the id of the grading object when you do create request once on /api/v1/grading. You can do no body if you want to.

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/grading/${ID}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(gradeList),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      const success = data.status === "success";
      setUpdated(success);
    } catch (error) {
      setUpdated(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Grading System</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Grade A (Percentage)
          </label>
          <input
            type="number"
            name="gradeA"
            value={formData.gradeA}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Grade B (Percentage)
          </label>
          <input
            type="number"
            name="gradeB"
            value={formData.gradeB}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Grade C (Percentage)
          </label>
          <input
            type="number"
            name="gradeC"
            value={formData.gradeC}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Grade D (Percentage)
          </label>
          <input
            type="number"
            name="gradeD"
            value={formData.gradeD}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Grade F (Percentage)
          </label>
          <input
            type="number"
            name="gradeF"
            value={formData.gradeF}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        {updated && (
          <p className="text-green-500 pb-2">The gradings have been updated</p>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Update Criteria
        </button>
      </form>
    </div>
  );
};

export default GradingSystem;
