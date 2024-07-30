import { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);

  async function getUserName(userId) {
    try {
      const response = await fetch(`/api/v1/user/${userId}`);
      const data = await response.json();
      return data.data.data.name;
    } catch (error) {
      console.error("Error fetching user name:", userId);
      return "Unknown";
    }
  }

  async function getAttendanceSummary(attendanceRecords) {
    const summary = {};

    attendanceRecords.forEach((record) => {
      const { user, attendanceType } = record;

      if (!summary[user]) {
        summary[user] = { present: 0, absent: 0 };
      }

      if (attendanceType === "present" || attendanceType === "leave") {
        summary[user].present += 1;
      } else if (attendanceType === "absent") {
        summary[user].absent += 1;
      }
    });

    const result = [];

    for (const userId in summary) {
      const userSummary = summary[userId];
      const totalPresents = userSummary.present;
      const totalAbsents = userSummary.absent;
      const percentage = (totalPresents / (totalPresents + totalAbsents)) * 100;
      const name = await getUserName(userId);

      result.push({
        name,
        totalPresents,
        totalAbsents,
        percentage: percentage.toFixed(2), // rounding to 2 decimal places
      });
    }

    return result;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/attendance`, {
          headers: {
            Accept: "application/json",
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
        setReports(await getAttendanceSummary(data.data.data));
        // setReports(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4 w-1/4">User</th>
              <th className="py-2 px-4 w-1/4">Total Present</th>
              <th className="py-2 px-4 w-1/4">Total Absent</th>
              <th className="py-2 px-4 w-1/4">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.name}>
                <td className="border px-4 py-2 w-1/4 text-center">
                  {report.name}
                </td>
                <td className="border px-4 py-2 w-1/4 text-center">
                  {report.totalPresents}
                </td>
                <td className="border px-4 py-2 w-1/4 text-center">
                  {report.totalAbsents}
                </td>
                <td className="border px-4 py-2 w-1/4 text-center">
                  {report.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
