import { useEffect, useState } from "react";
// import { getLeaveRequests, approveLeaveRequest } from "../api"; // Make sure these API functions are defined

const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/leave`, {
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
        setLeaveRequests(data.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const getDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const getDatesInRange = (fromDate, toDate) => {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const dates = [];

    while (startDate <= endDate) {
      dates.push(startDate.toISOString().split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };

  const updateAttendance = async (userId, date) => {
    try {
      const response = await fetch(`/api/v1/attendance/create`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user: userId,
          attendanceType: "leave",
          attendanceDate: date,
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
      return false;
    }
  };

  const deleteLeave = async (_id) => {
    try {
      const response = await fetch(`/api/v1/leave/${_id}`, {
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

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleApprove = async (userId, _id, fromDate, toDate) => {
    const datesArray = getDatesInRange(fromDate, toDate);

    const updated = datesArray.map(
      async (date) => await updateAttendance(userId, date)
    );
    const deleted = await deleteLeave(_id);

    if (updated && deleted)
      setLeaveRequests(leaveRequests.filter((request) => request._id !== _id));
  };

  const handleReject = async (email, fromDate, toDate, name, reason) => {
    const deleted = await deleteLeave(fromDate, toDate, name, reason);
    if (deleted)
      setLeaveRequests(
        leaveRequests.filter((request) => request.email !== email)
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Leave Approval</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4 w-1/5">Name</th>
              <th className="py-2 px-4 w-1/5">From Date</th>
              <th className="py-2 px-4 w-1/5">To Date</th>
              <th className="py-2 px-4 w-1/5">Reason</th>
              <th className="py-2 px-4 w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request._id}>
                <td className="border px-4 py-2 text-center w-1/5">
                  {request.user.name}
                </td>
                <td className="border px-4 py-2 text-center w-1/5">
                  {getDate(request.fromDate)}
                </td>
                <td className="border px-4 py-2 text-center w-1/5">
                  {getDate(request.toDate)}
                </td>
                <td className="border px-4 py-2 text-center w-1/5">
                  {request.reason}
                </td>
                <td className="border px-4 py-2 text-center w-1/5">
                  <button
                    onClick={() =>
                      handleApprove(
                        request.user._id,
                        request._id,
                        request.fromDate,
                        request.toDate
                      )
                    }
                    className="bg-green-500 text-white py-1 px-2 mx-2 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleReject(
                        request.email,
                        request.fromDate,
                        request.toDate,
                        request.name,
                        request.reason
                      )
                    }
                    className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                  >
                    Reject
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

export default LeaveApproval;
