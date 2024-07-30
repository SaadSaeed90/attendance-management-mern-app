import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  // { email: "saad@example.com", name: "Muhammad Saad Saeed" }

  const navigate = useNavigate();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch(`/api/v1/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const data = await response.json();
        const studentsData = data.data.data;
        setStudents(
          studentsData.map(({ email, name, _id, role }) => ({
            email,
            name,
            _id,
            role,
          }))
        );

        return data.status === "success";
      } catch (error) {
        console.log(error.message);
        return false;
      }
    };
    getStudents();
  }, []);

  const handleClick = (_id) => {
    navigate(`/admin/manage-attendance/${_id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map(
              (student) =>
                student.role === "user" && (
                  <tr
                    key={student._id}
                    className="cursor-pointer hover:bg-indigo-400 hover:text-white"
                    onClick={() => handleClick(student._id)}
                  >
                    <td className=" px-4 py-2 text-center">{student.name}</td>
                    <td className={` px-4 py-2 text-center `}>
                      {student.email}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
