import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [translatedDescription, setTranslatedDescription] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (job?.description && job?.language !== "english") {
      translateText(job.description);
    } else {
      setTranslatedDescription(job?.description);
    }
  }, [job]);

  const translateText = async (text) => {
    setIsTranslating(true);
    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: "auto",
          target: "en",
          format: "text",
        }),
      });

      const data = await response.json();
      setTranslatedDescription(data.translatedText);
    } catch (err) {
      console.error("Translation Error:", err);
      setTranslatedDescription("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  if (!job) {
    return <p className="text-center mt-10 text-lg">No job details available.</p>;
  }

  return (
    <div className="flex flex-col items-center p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mt-8">{job.website_name || "Unknown Company"}</h1>
      <h2 className="text-2xl font-medium mt-4 text-center">
        {job.title || "Unknown Title"}
      </h2>
      <h3 className="text-lg text-gray-500 mt-2">{`Location: ${job.city || "Unknown City"}, ${job.country || "Unknown Country"}`}</h3>
      
      <p className="mt-8 px-8 font-serif text-gray-600 text-center">
        {isTranslating ? (
          <span>Translating description...</span>
        ) : (
          translatedDescription || job.description
        )}
      </p>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/application-form')}
          className="bg-blue-500 px-6 py-3 font-bold text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Apply to this Job
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 px-4 py-2 text-white rounded-md hover:bg-gray-600 transition duration-300"
        >
          Back to Job Listings
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
