"use client";

import { Card } from "@heroui/react";
import { Pin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

export default function JobCard({ data }) {
  // Fallback safe assignment to avoid destructuring errors if data is missing
  const job = data || {};

  // Formatting deadline safely
  const formattedDeadline = job.deadline 
    ? new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : "";

  return (
    <Card className="max-w-[420px] bg-[#0d0d0d] text-[#e4e4e7] p-6 rounded-[28px] border border-neutral-900 shadow-xl">
      
      {/* Header Section: Logo, Company Name & Job Title */}
      <Card.Header className="flex flex-col items-start gap-4 p-0 pb-3">
        {job.companyName && (
          <div className="flex items-center gap-3">
            {job.companyLogo && (
              <img 
                src={job.companyLogo} 
                alt={job.companyName} 
                className="w-10 h-10 rounded-xl object-cover border border-neutral-800"
              />
            )}
            <span className="text-sm font-medium text-neutral-400">{job.companyName}</span>
          </div>
        )}
        
        <div className="flex flex-col gap-1.5">
          <Card.Title className="text-2xl font-semibold tracking-tight text-white">
            {job.title || "Untitled Position"}
          </Card.Title>
          {job.responsibilities && (
            <Card.Description className="text-neutral-400 text-sm leading-relaxed">
              {job.responsibilities}
            </Card.Description>
          )}
        </div>
      </Card.Header>

      {/* Content Section: Badges / Pills based on image_ef01e4.png */}
      <Card.Content className="flex flex-wrap gap-2 p-0 py-4">
        {/* Location Pill */}
        {job.location && (
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300">
            <Pin className="w-3.5 h-3.5 text-purple-400" />
            <span>{job.location}</span>
          </div>
        )}

        {/* Job Type / Workplace Pill */}
        {job.jobType && (
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300">
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span>{job.isRemote ? "Remote" : "On-site"} ({job.jobType})</span>
          </div>
        )}

        {/* Salary Pill */}
        {job.minSalary && job.maxSalary && (
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300">
            <CircleDollar className="w-3.5 h-3.5 text-purple-400" />
            <span>
              {job.minSalary}-{job.maxSalary} {job.currency || "USD"}/mo
            </span>
          </div>
        )}
      </Card.Content>

      {/* Footer Section: Link to Apply */}
      <Card.Footer className="p-0 pt-3 flex justify-between items-center">
        <Link 
          href={`/jobs/${job._id?.$oid || job._id || '#'}`}
          className="group flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors"
        >
          Apply Now 
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        
        {formattedDeadline && (
          <span className="text-[11px] text-neutral-500">
            Ends: {formattedDeadline}
          </span>
        )}
      </Card.Footer>

    </Card>
  );
}