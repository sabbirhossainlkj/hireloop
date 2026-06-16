import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";
import { Chip, Table, Button } from "@heroui/react";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

// Inline functional SVG wrappers for clean Gravity Icons footprint
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const RecruiterJobs = async () => {
    console.log('sabbir')
  const company = await getLoggedInRecruiterCompany();
  console.log(company, 'company data');
  const jobs = (await getCompanyJobs(company._id)) || [];
  console.log(jobs, 'jobs data');

  return (
    <div className="w-full p-6 max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          Recruiter/company Manage All Jobs
        </h2>
        <p className="text-xs text-neutral-500">
          Review and modify active job listings and pipeline positions.
        </p>
      </div>

      <Table aria-label="Company job posts management table">
        <Table.ResizableContainer>
          <Table.Content className="min-w-[800px]">
            <Table.Header>
              <Table.Column
                isRowHeader
                defaultWidth="2fr"
                id="title"
                minWidth={180}
              >
                Job Title
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="location" minWidth={120}>
                Location
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.5fr" id="salary" minWidth={150}>
                Salary Range
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="deadline" minWidth={120}>
                Deadline
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="actions" minWidth={130}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body
              emptyContent={"No job openings posted for this company."}
            >
              {jobs.map((job) => {
                // Dynamic safety check extraction for MongoDB identifier string
                const jobId = job._id?.$oid || job._id;

                return (
                  <Table.Row key={jobId}>
                    {/* Job Title Stacked with Category & Type */}
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral-900 text-sm capitalize">
                          {job.title}
                        </span>
                        <span className="text-xs text-neutral-400 capitalize">
                          {job.category} • {job.jobType}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Location & Workspace Type */}
                    <Table.Cell>
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm text-neutral-700 capitalize">
                          {job.location}
                        </span>
                        {job.isRemote && (
                          <span className="text-[10px] bg-sky-50 text-sky-600 font-bold px-1.5 py-0.5 rounded">
                            Remote
                          </span>
                        )}
                      </div>
                    </Table.Cell>

                    {/* Localized Salary Field */}
                    <Table.Cell>
                      <span className="text-sm font-medium text-neutral-800">
                        {Number(job.minSalary).toLocaleString()} -{" "}
                        {Number(job.maxSalary).toLocaleString()}
                        <span className="text-xs text-neutral-400 font-normal ml-1">
                          {job.currency}
                        </span>
                      </span>
                    </Table.Cell>

                    {/* Application Deadline */}
                    <Table.Cell>
                      <span className="text-sm text-neutral-600">
                        {new Date(job.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </Table.Cell>

                    {/* Status Tag */}
                    <Table.Cell>
                      <Chip
                        color={job.status === "active" ? "success" : "danger"}
                        size="sm"
                        variant="soft"
                        className="capitalize font-medium text-xs"
                      >
                        {job.status}
                      </Chip>
                    </Table.Cell>

                    {/* Row Actions */}
                    <Table.Cell>
                      <div className="flex items-center gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          title="Video Details"
                          className="text-neutral-500 hover:text-neutral-900"
                        >
                          <EyeIcon />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          title="Edit Post"
                          className="text-blue-500 hover:bg-blue-50/50"
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          title="Delete Post"
                          className="text-danger hover:bg-danger-50/50"
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default RecruiterJobs;
