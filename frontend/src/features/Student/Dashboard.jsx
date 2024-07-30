import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Reusable/Button";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { name, email } = useSelector((store) => store.student);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <h2 className="text-1xl font-semibold mb-6 underline decoration-orange-400">{`Hello! ${name} (${email})`}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Button type="headLink" to="/mark-attendance">
            Mark Attendance
          </Button>
          <p>Mark your today&apos;s attendance.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Button type="headLink" to="/mark-leave">
            Leave Requests
          </Button>
          <p>Submit and approve leave requests.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Button type="headLink" to="/view-attendance">
            View Attendance
          </Button>
          <p>View your attendance records.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Button type="headLink" to="/edit-profile">
            Profile
          </Button>
          <p>Update your profile and view details.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
