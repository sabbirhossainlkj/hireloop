import JobsList from "@/components/jobs/JobsList";
import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="min-h-screen bg-[#050505] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Available Positions
          </h1>
          <p className="text-neutral-400 text-sm mt-2">
            Explore active frontend job openings.
          </p>
        </header>

        <JobsList jobs={jobs || []} />

      </div>
    </main>
  );
}