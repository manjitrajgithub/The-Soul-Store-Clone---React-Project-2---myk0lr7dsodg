import React, { useState } from "react";
import axios from "axios";
import { projectId } from "../utilities/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
  const userToken = useSelector((state) => state.auth.user);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwordCurrent: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    const response = await axios.patch(
      "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
      formData,
      {
        headers: {
          projectId: projectId,
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (response.status === 200) {
      setMessage("Password updated successfully.");
    }
    // } catch (error) {
    //   setMessage("Password update failed. Please check your credentials.");
    // }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* <Link to="/deleteaccount">
        <button className=" bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none">
          Delete Account
        </button>
      </Link> */}
      <h2 className="text-2xl font-semibold mb-4">Update Password</h2>

      <div onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Current Password:
          </label>
          <input
            type={currentPasswordVisible ? "text" : "password"}
            name="passwordCurrent"
            value={formData.passwordCurrent}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-400"
          />
          <button
            onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
            className="text-slate-500 text-sm"
          >
            {currentPasswordVisible ? "Hide" : "Show"} Password
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            New Password:
          </label>
          <input
            type={newPasswordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-400"
          />
          <button
            onClick={() => setNewPasswordVisible(!newPasswordVisible)}
            className="text-slate-500 text-sm"
          >
            {newPasswordVisible ? "Hide" : "Show"} Password
          </button>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Update Password
        </button>
      </div>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default UpdatePassword;
