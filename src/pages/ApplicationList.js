import React from "react";
import { useApplications } from "../utils/ApplicationContext";

const ApplicationList = () => {
  const { applications } = useApplications();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Submitted Applications</h2>
      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app, index) => (
            <li key={index} className="border p-4 rounded-lg shadow bg-gray-50">
              <h3 className="font-semibold text-lg">{app.name}</h3>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Experience:</strong> {app.experience} years</p>
              <p><strong>Skills:</strong> {app.skills.join(", ")}</p>
              <p><strong>Start Date:</strong> {app.startDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationList;
