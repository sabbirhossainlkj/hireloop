"use client";

import { useState } from "react";
import JobCard from "./JobCard";

export default function JobsList({ jobs }) {
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) =>
    [
      job.title,
      job.companyName,
      job.location,
      job.category,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 rounded-xl bg-[#111] border border-neutral-800 outline-none"
        />
      </div>

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
          No jobs found.
        </div>
      )}
    </>
  );
}