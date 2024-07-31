import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const getDate = (dateString) => {
  let date;

  if (dateString) {
    date = new Date(dateString);
  } else {
    date = new Date();
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const MarkAttendance = () => {
  const [date, setDate] = useState();
  const [marked, setMarked] = useState(false);
  const { _id } = useSelector((store) => store.student);

  useEffect(() => {
    setDate(getDate());

    const confirmMarked = async () => {
      try {
        const response = await fetch(`/api/v1/attendance?user=${_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const data = await response.json();

        const dateNew = data.data.data.find(
          (el) => el.attendanceDate.substring(0, 10) === date
        );
        if (dateNew) setMarked(true);
        else setMarked(false);
      } catch (error) {
        setMarked(false);
      }
    };
    confirmMarked();
  }, [_id, date]);

  const addAttendance = async () => {
    try {
      const response = await fetch(`/api/v1/attendance/create`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ user: _id, attendanceType: "present" }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      const success = data.status === "success";

      setMarked(success);
    } catch (error) {
      setMarked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAttendance();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Mark Attendance</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        {marked && <p className="text-green-500 p-2">Attendance marked</p>}
        <button
          type="submit"
          className={`w-full  text-white py-2 rounded-lg font-semibold ${
            marked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-700"
          }`}
          disabled={marked}
        >
          Mark Attendance
        </button>
      </form>
    </div>
  );
};

export default MarkAttendance;
