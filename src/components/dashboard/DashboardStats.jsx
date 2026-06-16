import {
  FileText,
  Users,
  Zap,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Job Posts",
    value: "48",
    icon: FileText,
  },
  {
    title: "Total Applicants",
    value: "1,284",
    icon: Users,
  },
  {
    title: "Active Jobs",
    value: "18",
    icon: Zap,
  },
  {
    title: "Jobs Closed",
    value: "32",
    icon: CheckCircle,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-[#141720] p-5 shadow-lg transition-all duration-300 hover:border-white/20 hover:shadow-xl"
          >
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
              <Icon size={18} className="text-gray-300" />
            </div>

            <p className="mb-2 text-sm text-gray-400">
              {item.title}
            </p>

            <h3 className="text-3xl font-semibold text-white">
              {item.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}