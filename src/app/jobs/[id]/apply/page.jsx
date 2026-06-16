import { getJobById } from "@/lib/api/jobs";
import { getSessionUser } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";
// Importing Gravity UI Icons for a polished dashboard feel
import {
  ShieldExclamation,
  CircleInfo,
  ArrowRight,
  TriangleExclamation,
} from "@gravity-ui/icons";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getSessionUser();

  if (!user) {
    redirect(`/auth/singin?redirect=/jobs/${id}/apply`);
  }

  // --- 1. Role Authorization Error State ---
  if (user.role !== "seeker") {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-md w-full p-8 text-center bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-950/50 shadow-xl rounded-2xl flex flex-col items-center">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-full text-red-600 dark:text-red-400 mb-4">
            <ShieldExclamation width={32} height={32} />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Access Restricted
          </h3>
          <p className="leading-relaxed text-sm text-zinc-600 dark:text-zinc-400">
            This page is available only for registered job seekers. Please sign
            in with a Job Seeker account to view and apply for job positions.
          </p>
        </div>
      </div>
    );
  }

  
  const applications = await getApplicationsByApplicant(user.id);
  const plan = await getPlanById(user?.plan || "seeker_free")
 
  const job = await getJobById(id);

  const hasRemainingApplications =
    applications.length < plan.maxApplicationsPerMonth;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* --- 2. Application Usage / Subscription Counter Card --- */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1">
                <CircleInfo width={16} height={16} className="text-primary" />
                <span>Monthly Application Allowance</span>
              </div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                You have applied so far:{" "}
                <span
                  className={`font-bold text-xl ${hasRemainingApplications ? "text-primary" : "text-amber-500"}`}
                >
                  {applications.length}
                </span>{" "}
                out of{" "}
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {plan.maxApplicationsPerMonth}
                </span>{" "}
                this month
              </h2>
            </div>

            {/* Display plan badge and dynamic action button */}
            <div className="flex items-center sm:self-center">
              <span className="text-xs font-semibold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-md">
                Current Plan: {plan.name}
              </span>
            </div>
          </div>

          {/* Progress Bar Visualizer */}
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${hasRemainingApplications ? "bg-primary" : "bg-amber-500"}`}
              style={{
                width: `${Math.min((applications.length / plan.maxApplicationsPerMonth) * 100, 100)}%`,
              }}
            />
          </div>

          {/* Upgrade Prompt Banner */}
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <p className="text-zinc-500 dark:text-zinc-400">
              Need to submit more applications this cycle?
            </p>
            <Link
              href="/plans"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-600 transition-colors"
            >
              Purchase a premium plan
              <ArrowRight width={14} height={14} />
            </Link>
          </div>
        </div>

        {/* --- 3. Dynamic Rendering: Form vs Limit Reached Alert --- */}
        {hasRemainingApplications ? (
          <div className="animate-fade-in">
            <JobApply applicant={user} job={job} />
          </div>
        ) : (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6 flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
              <TriangleExclamation width={20} height={20} />
            </div>
            <div>
              <h4 className="text-base font-bold text-amber-900 dark:text-amber-300">
                Application Limit Reached
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-400 mt-1 leading-relaxed">
                You have completely used up your allotted{" "}
                {plan.maxApplicationsPerMonth} free applications for this
                monthly cycle. Upgrade your current subscription tiers to keep
                submitting credentials to active open positions instantly.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
