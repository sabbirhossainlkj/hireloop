"use client";

import { createCompany } from "@/lib/actions/companies";
import { toast } from "@heroui/react";
import { useState } from "react";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    industry: "Technology",
    website: "",
    location: "",
    employeeCount: "1-10 employees",
    description: "",
    logo: "",
  });

  // Open register modal
  const handleRegister = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      industry: "Technology",
      website: "",
      location: "",
      employeeCount: "1-10 employees",
      description: "",
      logo: "",
      recruiterId: recruiter.id,
    });
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleEdit = () => {
    setIsEditMode(true);
    setFormData(company);
    setIsModalOpen(true);
  };

  // Save company (register or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCompany = {
      ...formData,
      status: company && company.status ? company.status : "Pending", // default admin status
    };
    setCompany(newCompany);
    setIsModalOpen(false);

    const payload = await createCompany(newCompany);
    if (payload.insertedId) {
      const savedCompany = { ...company, _id: payload.insertedId };
      setCompany(savedCompany);
      toast.success(
        "company registered successfully! Awaiting admin approval.",
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 text-white">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">My Company</h1>

      {/* NO COMPANY STATE */}
      {!company.name ? (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-2">
            No company registered yet
          </h2>
          <p className="text-gray-400 mb-4">
            Register your company to start hiring on HireLoop.
          </p>

          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Register Company
          </button>
        </div>
      ) : (
        /* COMPANY DETAILS */
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              {company.logo ? (
                <img
                  src={company.logo}
                  className="w-14 h-14 rounded-lg object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-800 rounded-lg" />
              )}

              <div>
                <h2 className="text-xl font-bold">{company.name}</h2>
                <p className="text-gray-400">{company.industry}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  company.status === "Approved"
                    ? "bg-green-600"
                    : company.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                }`}
              >
                {company.status}
              </span>

              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-blue-600 rounded-lg"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="text-gray-400">Website:</span> {company.website}
            </p>
            <p>
              <span className="text-gray-400">Location:</span>{" "}
              {company.location}
            </p>
            <p>
              <span className="text-gray-400">Employees:</span>{" "}
              {company.employeeCount}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-gray-400 mb-1">Description</h3>
            <p className="text-gray-200">{company.description}</p>
          </div>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 w-[600px] p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Update Company" : "Register New Company"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full p-2 bg-gray-800 rounded"
              />

              <input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Industry"
                className="w-full p-2 bg-gray-800 rounded"
              />

              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website URL"
                className="w-full p-2 bg-gray-800 rounded"
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-2 bg-gray-800 rounded"
              />

              <select
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
              >
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>200+ employees</option>
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief Description"
                className="w-full p-2 bg-gray-800 rounded"
              />

              <input
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="Logo URL"
                className="w-full p-2 bg-gray-800 rounded"
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 rounded"
                >
                  Cancel
                </button>

                <button className="px-4 py-2 bg-blue-600 rounded">
                  {isEditMode ? "Update" : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
