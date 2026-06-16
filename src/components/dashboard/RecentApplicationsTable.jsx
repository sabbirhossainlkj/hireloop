"use client";

const applications = [
  {
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

const statusStyles = {
  Interviewing:
    "bg-green-500/10 text-green-400 border border-green-500/20",
  New: "bg-gray-500/10 text-gray-300 border border-gray-500/20",
  Reviewing:
    "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Rejected:
    "bg-red-500/10 text-red-400 border border-red-500/20",
};

export default function RecentApplicationsTable() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#141720]">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h2 className="text-xl font-semibold text-white">
          Recent Applications
        </h2>

        <button className="text-sm text-gray-400 transition hover:text-white">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Candidate Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Date Applied
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Experience
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((candidate) => (
              <tr
                key={candidate.name}
                className="border-b border-white/5 hover:bg-white/[0.02] transition"
              >
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/10" />

                    <span className="font-medium text-white">
                      {candidate.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-6 text-gray-300">
                  {candidate.role}
                </td>

                <td className="px-6 py-6 text-gray-300">
                  {candidate.date}
                </td>

                <td className="px-6 py-6 text-gray-300">
                  {candidate.experience}
                </td>

                <td className="px-6 py-6">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[candidate.status]
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}