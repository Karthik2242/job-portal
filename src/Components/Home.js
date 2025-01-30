import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetails } from "../utils/JobSlice";
import Loader from "./Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { job, status, error } = useSelector((state) => state.job);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchJobDetails()); 
  }, [dispatch]);

  const handleViewDetails = (jobItem) => {
    navigate("/job-details", { state: { job: jobItem } });
  };

 
  const toggleDescription = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  if (status === "loading") return <Loader />; 
  if (status === "failed") return <p className="text-center text-red-500">{error}</p>; 

  return job && job.length > 0 ? (
    <div className="flex flex-col bg-slate-600 items-center  space-y-6 px-0 py-8 sm:px-8 md:px-16 lg:px-24">
      {job.map((jobItem) => {
        const isDescriptionExpanded = expandedJobId === jobItem.id;
        const shortDescription = jobItem.description.slice(0, 200);

        return (
          <div
            key={jobItem.id}
            className="w-full bg-white max-w-[700px]  rounded-md p-4 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
              <h2 className="text-2xl font-bold mb-2 sm:mb-0">
                {jobItem.website_name || "Unknown Company"} -{" "}
                <span className="font-medium text-lg text-gray-600">{jobItem.title}</span>
              </h2>
            </div>

            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Location: {jobItem.city}, {jobItem.country}
            </h3>

            <p className="text-md font-normal mb-4 text-gray-800">
              {isDescriptionExpanded ? jobItem.description : `${shortDescription}...`}
            </p>

            <button
              onClick={() => toggleDescription(jobItem.id)}
              className="text-blue-500 hover:underline mb-4 transition-colors duration-300"
            >
              {isDescriptionExpanded ? "Read Less" : "Read More"}
            </button>

            {/* View Details Button moved to the end */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleViewDetails(jobItem)}
                className="bg-blue-500 text-lg font-semibold text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                View Details
              </button>
            </div>

            {/* Apply Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate('/application-form')} 
                className="bg-green-500 text-lg font-semibold text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Apply to this Job
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-center text-lg mt-10">No job details available.</p>
  );
};

export default Home;
