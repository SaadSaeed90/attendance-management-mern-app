import React from "react";
import Button from "../../Reusable/Button";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Button to="/admin/students-list" type="headLink">
            Student Records
          </Button>
          <p>View and manage all student records.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Button to="/admin/leave-approval" type="headLink">
            Leave Requests
          </Button>
          <p>Manage and approve leave requests.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Button to="/admin/grading" type="headLink">
            Grading System
          </Button>
          <p>Set and manage grading criteria based on attendance.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Button to="/admin/reports" type="headLink">
            Reports
          </Button>
          <p>Generate user-specific and system-wide attendance reports.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
