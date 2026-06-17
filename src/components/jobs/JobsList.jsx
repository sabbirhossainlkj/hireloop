"use client";

import { useState } from "react";
import JobCard from "./JobCard";

export default function JobsList({ jobs }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = [
      job.title,
      job.companyName,
      job.location,
      job.category,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = selectedType ? job.jobType === selectedType : true;

    const matchesCategory = selectedCategory ? job.category === selectedCategory : true;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 max-w-md px-4 py-3 rounded-xl bg-[#111] text-white border border-neutral-800 outline-none focus:border-neutral-700 transition-colors"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-56 px-4 py-3 rounded-xl bg-[#111] text-neutral-300 border border-neutral-800 outline-none cursor-pointer focus:border-neutral-700 transition-colors"
        >
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="management">Management</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full md:w-48 px-4 py-3 rounded-xl bg-[#111] text-neutral-300 border border-neutral-800 outline-none cursor-pointer focus:border-neutral-700 transition-colors"
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {(search || selectedType || selectedCategory) && (
        <div className="mb-4 text-sm text-neutral-400">
          Found {filteredJobs.length} jobs.{" "}
          <button
            onClick={() => {
              setSearch("");
              setSelectedType("");
              setSelectedCategory("");
            }}
            className="text-red-400 underline hover:text-red-300 ml-1"
          >
            Clear all filters
          </button>
        </div>
      )}

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id?.$oid ?? job._id}
              data={job}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-500">
          No jobs found matching your criteria.
        </div>
      )}
    </>
  );
}