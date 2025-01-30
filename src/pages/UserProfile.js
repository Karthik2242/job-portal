import React, { useState } from "react";
import { useUser } from "../utils/UserContext";

const UserProfile = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({ username: user.username, email: user.email });
  const [isEditing, setIsEditing] = useState(false); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false); 
    alert("Profile updated successfully!");
  };

  const toggleEdit = () => {
    setIsEditing(true);
  };

  const toggleSave = () => {
    setIsEditing(false);
    updateUser(formData); 
    alert("Profile updated successfully!"); 
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">{isEditing ? "Edit Profile" : "Profile"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            readOnly={!isEditing} 
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            readOnly={!isEditing}
          />
        </div>

      
        {!isEditing ? (
          <button
            type="button"
            onClick={toggleEdit}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleSave}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
