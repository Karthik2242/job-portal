import React, { useState } from "react";
import { useApplications } from "../utils/ApplicationContext";

const ApplicationForm = () => {
  const { addApplication } = useApplications();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: [],
    skillInput: "",
    coverLetter: "",
    startDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "experience" && e.target.value < 0) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (formData.skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.skillInput.trim()],
        skillInput: "",
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    }
    if (step === 2) {
      if (!formData.experience) newErrors.experience = "Experience is required";
      if (formData.skills.length === 0) newErrors.skills = "Add at least one skill";
    }
    if (step === 3) {
      if (!formData.coverLetter) newErrors.coverLetter = "Cover letter is required";
      if (!formData.startDate) newErrors.startDate = "Start date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    addApplication({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      experience: formData.experience,
      skills: formData.skills,
      coverLetter: formData.coverLetter,
      startDate: formData.startDate,
    });

    alert("Application submitted!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      skills: [],
      skillInput: "",
      coverLetter: "",
      startDate: "",
    });
    setStep(1);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Job Application</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Step 1: Personal Information</h3>
            <input 
              type="text" name="name" placeholder="Name" value={formData.name} 
              onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <input 
              type="email" name="email" placeholder="Email" value={formData.email} 
              onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <input 
              type="tel" name="phone" placeholder="Phone Number" value={formData.phone} 
              onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}

            <div className="flex justify-end gap-2">
              <button 
                type="button" onClick={handleNext} 
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Step 2: Experience</h3>
            <input 
              type="number" name="experience" placeholder="Years of Experience" value={formData.experience} 
              onChange={handleChange} required min="0"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            {errors.experience && <p className="text-red-500">{errors.experience}</p>}

            <div className="flex items-center gap-2">
              <input 
                type="text" name="skillInput" placeholder="Add Skill" value={formData.skillInput} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button 
                type="button" onClick={addSkill} 
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
            {errors.skills && <p className="text-red-500">{errors.skills}</p>}

            <ul className="mt-2">
              {formData.skills.map((skill, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-md mt-1 text-gray-700">{skill}</li>
              ))}
            </ul>

            <div className="flex justify-between mt-4">
              <button 
                type="button" onClick={handlePrev} 
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Previous
              </button>
              <button 
                type="button" onClick={handleNext} 
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Step 3: Additional Information</h3>
            <textarea
              name="coverLetter"
              placeholder="Cover Letter"
              value={formData.coverLetter}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            {errors.coverLetter && <p className="text-red-500">{errors.coverLetter}</p>}

            <input 
              type="date" name="startDate" value={formData.startDate} 
              onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}

            <div className="flex justify-between">
              <button 
                type="button" onClick={handlePrev} 
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Previous
              </button>
              <button 
                type="submit" 
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ApplicationForm;
