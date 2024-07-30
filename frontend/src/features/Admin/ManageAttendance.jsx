import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ManageAttendance = () => {
  const { _id } = useParams();
  console.log(useParams());
  const [attendanceRecords, setAttendanceRecords] = useState([
    { date: "2024-07-29", status: "Present" },
  ]);

  const getDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  function capitalizeFirstLetter(string) {
    if (!string) return string; // Check for empty string or null
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const fetchData = async () => {
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
        const attendanceData = data.data.data;
        setAttendanceRecords(
          attendanceData.map(({ attendanceDate, attendanceType, _id }) => ({
            date: attendanceDate,
            status: attendanceType,
            _id,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [_id]);

  const handleUpdate = async (_id, attendanceType) => {
    try {
      const response = await fetch(`/api/v1/attendance/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          attendanceType: attendanceType,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      const data = await response.json();
      const date = data.data.data.attendanceDate;
      if (data.status === "success")
        setAttendanceRecords(
          attendanceRecords.map((record) =>
            record.date === date
              ? { ...record, status: attendanceType }
              : record
          )
        );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (date, _id) => {
    try {
      const response = await fetch(`/api/v1/attendance/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      setAttendanceRecords(
        attendanceRecords.filter((record) => record.date !== date)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Attendance</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4 w-1/3">Date</th>
              <th className="py-2 px-4 w-1/3">Status</th>
              <th className="py-2 px-4 w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td className="border px-4 py-2 text-center w-1/3">
                  {getDate(record.date)}
                </td>
                <td
                  className={`border px-4 py-2 w-1/3 text-center ${
                    record.status === "present"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {capitalizeFirstLetter(record.status)}
                </td>
                <td className="border px-4 py-2 w-1/3 text-center">
                  <button
                    onClick={() => handleUpdate(record._id, "present")}
                    className="bg-green-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-green-600"
                  >
                    Mark Present
                  </button>
                  <button
                    onClick={() => handleUpdate(record._id, "absent")}
                    className="bg-red-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-red-600"
                  >
                    Mark Absent
                  </button>
                  <button
                    onClick={() => handleDelete(record.date, record._id)}
                    className="bg-gray-500 text-white py-1 px-2 rounded-lg hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAttendance;
