"use client"
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentApplicationsTable from "@/components/dashboard/RecentApplicationsTable";
import { useSession } from "@/lib/auth-client";
import React from "react";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = session?.user;
  console.log(session);

  return (
    <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <DashboardStats></DashboardStats>
        <RecentApplicationsTable></RecentApplicationsTable>
    </div>
  ) 
};

export default RecruiterDashboardHomePage;
