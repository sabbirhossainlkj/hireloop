"use client";

import React from "react";
import { Table, Button, Avatar } from "@heroui/react";
import { updateCompany } from "@/lib/actions/companies";

const formatDate = (dateObj) => {
  if (!dateObj?.$date) return "N/A";
  return new Date(dateObj.$date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const STATUS_THEMES = {
  approved: { dot: "bg-emerald-500", text: "text-emerald-500" },
  rejected: { dot: "bg-rose-500", text: "text-rose-500" },
  pending: { dot: "bg-amber-500", text: "text-amber-500" },
};

const renderStatus = (status = "") => {
  const normStatus = status.toLowerCase();
  const theme = STATUS_THEMES[normStatus] || STATUS_THEMES.pending;

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
      <span className={`text-sm font-medium capitalize ${theme.text}`}>
        {status}
      </span>
    </div>
  );
};

export default function CompanyTable({ companies = [] }) {
  const handleAction = async (actionType, id) => {
    const result = await updateCompany(id, { status: "approved" });
    if (result.modifiedCount) {
      console.log(`${actionType} company with ID:${id}`, result);
    }
  };

  const handleRejected = async (actionType, id) => {
    const result = await updateCompany(id, { status: "rejected" });
    if (result.modifiedCount) {
      console.log(`${actionType} company with ID:${id}`, result);
    }
  };

  return (
    <div className="w-full bg-[#121212] rounded-xl border border-zinc-800 p-6">
      <Table className="bg-transparent">
        <Table.ScrollContainer>
          <Table.Content aria-label="Company Approval Dashboard">
            <Table.Header>
              {/* FIX: Added isRowHeader here to resolve the accessibility error */}
              <Table.Column
                isRowHeader
                className="bg-transparent text-zinc-400 font-semibold border-b border-zinc-800 pb-4"
              >
                Company Name
              </Table.Column>
              <Table.Column className="bg-transparent text-zinc-400 font-semibold border-b border-zinc-800 pb-4">
                Recruiter Email
              </Table.Column>
              <Table.Column className="bg-transparent text-zinc-400 font-semibold border-b border-zinc-800 pb-4">
                Industry
              </Table.Column>
              <Table.Column className="bg-transparent text-zinc-400 font-semibold border-b border-zinc-800 pb-4">
                jobs count
              </Table.Column>
              <Table.Column className="bg-transparent text-zinc-400 font-semibold border-b border-zinc-800 pb-4">
                Status
              </Table.Column>
              <Table.Column className="bg-transparent text-zinc-400 font-semibold border-b border-zinc-800 pb-4">
                Date Submitted
              </Table.Column>
              <Table.Column className="bg-transparent text-zinc-400 font-semibold border-b border-zinc-800 pb-4 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body emptyContent={"No companies pending review."}>
              {companies.map((company) => {
                const companyId = company._id?.$oid || Math.random().toString();
                const status = company.status?.toLowerCase() || "pending";

                return (
                  <Table.Row
                    key={companyId}
                    className="border-b border-zinc-900 last:border-0 hover:bg-zinc-900/40 transition-colors"
                  >
                    <Table.Cell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={company.logo}
                          name={company.name}
                          size="md"
                          className="w-10 h-10 rounded-lg border border-zinc-800"
                        />
                        <span className="font-medium text-zinc-200">
                          {company.name}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="text-zinc-400 py-4">
                      {company.recruiterEmail || "N/A"}
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      <span className="px-3 py-1 bg-zinc-800/60 rounded-full text-xs text-zinc-300 border border-zinc-700/50">
                        {company.industry}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="py-4">
                      <span className="px-3 py-1 bg-zinc-800/60 rounded-full text-xs text-zinc-300 border border-zinc-700/50">
                        {company.jobCount}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      {renderStatus(company.status)}
                    </Table.Cell>

                    <Table.Cell className="text-zinc-400 py-4">
                      {formatDate(company.createdAt)}
                    </Table.Cell>

                    <Table.Cell className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {status !== "approved" && (
                          <Button
                            size="sm"
                            variant="bordered"
                            className="border-emerald-900/60 text-emerald-500 bg-emerald-950/20 hover:bg-emerald-900/40 font-medium px-4"
                            onClick={() => handleAction("Approve", company._id)}
                          >
                            Approve
                          </Button>
                        )}
                        {status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="bordered"
                            className="border-rose-900/60 text-rose-500 bg-rose-950/20 hover:bg-rose-900/40 font-medium px-4"
                            onClick={() => handleRejected("Reject", company._id)}
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
