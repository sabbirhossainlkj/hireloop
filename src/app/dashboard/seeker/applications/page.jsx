import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getSessionUser } from '@/lib/core/session';
import { Table } from '@heroui/react';
import { ArrowUpRightFromSquare, Calendar } from '@gravity-ui/icons';
import React from 'react';

const ApplicationsPage = async () => {
  const user = await getSessionUser();
  const jobs = await getApplicationsByApplicant(user.id);

  // Helper function to cleanly format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Your Applications</h2>
        <p className="text-sm text-default-500">
          You have submitted {jobs.length} application{jobs.length === 1 ? '' : 's'}.
        </p>
      </div>

      <Table aria-label="Job applications status table" className="w-full">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column className="font-semibold text-default-700">JOB TITLE & COMPANY</Table.Column>
              <Table.Column className="font-semibold text-default-700">APPLICANT DETAILS</Table.Column>
              <Table.Column className="font-semibold text-default-700">COVER LETTER</Table.Column>
              <Table.Column className="font-semibold text-default-700">SUBMITTED DATE</Table.Column>
              <Table.Column className="font-semibold text-default-700 text-right">LINKS</Table.Column>
            </Table.Header>

            <Table.Body emptyContent={"No applications found."}>
              {jobs.map((job) => (
                <Table.Row key={job._id?.$oid || job.jobId} className="border-b border-divider hover:bg-default-50 transition-colors">
                  {/* Job and Company Title */}
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="font-medium text-default-900">{job.jobTitle}</span>
                      <span className="text-xs text-default-500">{job.companyName}</span>
                    </div>
                  </Table.Cell>

                  {/* Applicant Details */}
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-default-800 capitalize">{job.applicantName}</span>
                      <span className="text-xs text-default-400">{job.applicantEmail}</span>
                    </div>
                  </Table.Cell>

                  {/* Truncated Cover Letter snippet */}
                  <Table.Cell>
                    <p className="text-sm text-default-600 max-w-[200px] truncate" title={job.coverLetter}>
                      {job.coverLetter || "No cover letter provided."}
                    </p>
                  </Table.Cell>

                  {/* Submission Date */}
                  <Table.Cell>
                    <div className="flex items-center gap-1.5 text-sm text-default-600">
                      <Calendar className="w-3.5 h-3.5 text-default-400" />
                      <span>{formatDate(job.createdAt?.$date)}</span>
                    </div>
                  </Table.Cell>

                  {/* External Links */}
                  <Table.Cell>
                    <div className="flex items-center justify-end gap-3">
                      {job.resumeLink && (
                        <a
                          href={job.resumeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                        >
                          Resume
                          <ArrowUpRightFromSquare className="w-3 h-3" />
                        </a>
                      )}
                      {job.portfolioLink && (
                        <a
                          href={job.portfolioLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-success hover:underline font-medium"
                        >
                          Portfolio
                          <ArrowUpRightFromSquare className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>
    </div>
  );
};

export default ApplicationsPage;