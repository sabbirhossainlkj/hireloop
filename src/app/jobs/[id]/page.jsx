import { getJobById } from "@/lib/api/jobs";
import { Card, Button } from "@heroui/react";
import { Pin, Briefcase, CircleDollar, Calendar, ShieldCheck, Eye, Layers } from "@gravity-ui/icons";
import Link from "next/link";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-neutral-400">
        <p className="text-base font-medium">Job position not found</p>
      </div>
    );
  }

  const formattedDeadline = job.deadline
    ? new Date(job.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : "N/A";

  return (
    <main className="min-h-screen bg-[#050505] text-[#e4e4e7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* All-in-One Massive Detail Card */}
        <Card className="bg-[#0d0d0d] border border-neutral-900 rounded-[28px] p-6 sm:p-10 shadow-2xl flex flex-col gap-8">
          
          {/* 1. Profile Header Block */}
          <Card.Header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-0">
            <div className="flex items-center gap-4">
              {job.companyLogo && (
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-16 h-16 rounded-2xl object-cover border border-neutral-800"
                />
              )}
              <div className="flex flex-col gap-1">
                <Card.Title className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {job.title}
                </Card.Title>
                <span className="text-neutral-400 font-medium text-sm">{job.companyName}</span>
              </div>
            </div>
            
            <Link href={`/jobs/${id}/apply`}
             className="bg-purple-600 hover:bg-purple-700 text-white text-center font-semibold px-8 h-12 rounded-xl transition-colors w-full sm:w-auto shrink-0">
              Apply Now Jobs
            </Link>
          </Card.Header>

          {/* 2. Primary Pill Specifications */}
          <div className="flex flex-wrap gap-2.5 pb-2 border-b border-neutral-900/60">
            <div className="flex items-center gap-2 bg-[#161616] border border-neutral-800/80 px-4 py-2 rounded-full text-xs font-medium text-neutral-300">
              <Pin className="w-4 h-4 text-purple-400" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#161616] border border-neutral-800/80 px-4 py-2 rounded-full text-xs font-medium text-neutral-300">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span>{job.isRemote ? "Remote" : "On-site"} ({job.jobType})</span>
            </div>

            <div className="flex items-center gap-2 bg-[#161616] border border-neutral-800/80 px-4 py-2 rounded-full text-xs font-medium text-neutral-300">
              <CircleDollar className="w-4 h-4 text-purple-400" />
              <span>{job.minSalary} - {job.maxSalary} {job.currency || "USD"} /mo</span>
            </div>

            <div className="flex items-center gap-2 bg-[#161616] border border-neutral-800/80 px-4 py-2 rounded-full text-xs font-medium text-neutral-300">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Deadline: {formattedDeadline}</span>
            </div>
          </div>

          {/* 3. Core Text Information Section */}
          <Card.Content className="p-0 flex flex-col gap-8">
            
            {/* Responsibilities */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Responsibilities</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{job.responsibilities}</p>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Requirements</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{job.requirements}</p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Benefits</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{job.benefits}</p>
            </div>

          </Card.Content>

          {/* 4. Structural Horizontal Table Footer */}
          <Card.Footer className="p-0 pt-6 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-neutral-400">
            
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-neutral-600" />
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Category</p>
                <p className="text-neutral-200 capitalize font-medium mt-0.5">{job.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-neutral-600" />
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Listing Status</p>
                <p className="text-neutral-200 capitalize font-medium mt-0.5">{job.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <Eye className="w-4 h-4 text-neutral-600" />
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Visibility</p>
                <p className="text-neutral-200 font-medium mt-0.5">
                  {job.isPublic ? "Publicly Displayed" : "Private Listing"}
                </p>
              </div>
            </div>

          </Card.Footer>

        </Card>
        
      </div>
    </main>
  );
};

export default JobDetailsPage;