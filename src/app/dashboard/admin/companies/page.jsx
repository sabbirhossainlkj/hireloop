import CompanyTable from "@/components/dashboard/CompanyTable";
import { getCompanies } from "@/lib/api/companies";
import React from "react";


const adminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            companies for review ({companies.length})
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Manage incoming verification and vetting pipelines.
          </p>
        </div>

        {companies && companies.length > 0 ? (
          <CompanyTable companies={companies} />
        ) : (
          <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center text-zinc-500">
            No companies are awaiting approval actions right now.
          </div>
        )}
      </div>
    </div>
  );
};

export default adminCompaniesPage;