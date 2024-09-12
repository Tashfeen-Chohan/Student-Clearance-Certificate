import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const UserData = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    const fetchStudentApplications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/applications/${UserData.id}`
        );
        console.log(res);
        setApplications(res.data.stdApplications);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchStudentApplications();
  }, []);

  const tableRows = applications?.map((value, index) => {
    const status = value.status;
    const statusClass =
      status === "Approved"
        ? "bg-[#3AC430] text-white"
        : status === "Pending"
        ? "bg-[#FE9705] text-slate-50"
        : status === "Rejected"
        ? "bg-[#D11313] bg-red-100"
        : "text-gray-600 bg-gray-100";

    return (
      <tr key={index} className="bg-white border-b hover:bg-gray-50">
        <th
          scope="row"
          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
        >
          {value.name}
        </th>
        <td className="px-6 py-3">{value.roll_no}</td>
        <td className="px-6 py-3">{value.semester}</td>
        <td className="px-6 py-3">{value.dept}</td>
        <td className="px-6 py-3">{value.purpose}</td>
        <td className="px-6 py-3">
          <span className={`${statusClass} py-1 px-2.5 rounded text-xs`}>{status}</span>
        </td>
      </tr>
    );
  });

  console.log(applications);

  return (
    <div className=" flex justify-center items-center flex-col mt-10">
      <h2 className="text-3xl font-bold text-purple-500">My Applications</h2>

      <div class="relative overflow-x-auto shadow-md sm:rounded mt-10 max-w-5xl w-full">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-slate-100 uppercase bg-purple-600 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                NAME
              </th>
              <th scope="col" class="px-6 py-3">
                ROLL NO
              </th>
              <th scope="col" class="px-6 py-3">
                SEMESTER
              </th>
              <th scope="col" class="px-6 py-3">
                DEPARTMENT
              </th>
              <th scope="col" class="px-6 py-3">
                PURPOSE
              </th>
              <th scope="col" class="px-6 py-3">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
