import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const { _id } = useSelector((store) => store.student);

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
    const fetchAttendanceRecords = async () => {
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
          attendanceData.map(({ attendanceDate, attendanceType }) => ({
            date: attendanceDate,
            status: attendanceType,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Attendance Records</h1>
      <div className="overflow-x-auto">
        <div className="max-h-[85vh] overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.date}>
                  <td className="border px-4 py-2 text-center">
                    {getDate(record.date)}
                  </td>
                  <td
                    className={`border px-4 py-2 text-center ${
                      record.status === "present"
                        ? "text-green-600"
                        : record.status === "absent"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {capitalizeFirstLetter(record.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
