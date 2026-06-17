import { getUsersList } from "@/lib/api/users";
import React from "react";
import { User as UserIcon, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const adminUsersPage = async () => {
  const data = await getUsersList();
  const users = data.users || [];

  return (
    <div className="bg-[#0f1115] min-h-screen p-6 flex flex-col items-center justify-center font-sans antialiased">
      
      <div className="w-full max-w-6xl mb-4 flex justify-between items-center px-2">
        <h2 className="text-xl font-semibold text-white">
          All Users <span className="text-sm font-normal text-gray-400">({users.length} total)</span>
        </h2>
      </div>

      <div className="w-full max-w-6xl bg-[#181a1f] rounded-xl border border-[#262930] shadow-xl overflow-hidden">
        
        <div className="overflow-x-auto max-h-[70vh] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="text-gray-400 text-sm font-medium border-b border-[#262930] bg-[#1c1e24]">
                <th className="py-3 px-6">User Name</th>
                <th className="py-3 px-6">Email Address</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Join Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262930] text-gray-300 text-sm">
              {users.map((user) => {
                const isActive = user.status?.toLowerCase() === "active";
                const isRecruiter = user.role?.toLowerCase() === "recruiter";

                return (
                  <tr key={user.id || user.email} className="hover:bg-[#1f222a] transition-colors">
                    {/* User Name & Avatar */}
                    <td className="py-3 px-6 flex items-center gap-3">
                      {user.image ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#262930]">
                          <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[11px] ${
                          !isActive ? "bg-red-950 text-red-400 border border-red-900" : "bg-gray-700 text-gray-300"
                        }`}>
                          {getInitials(user.name)}
                        </div>
                      )}
                      <span className="font-medium text-white whitespace-nowrap">{user.name}</span>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-6 text-gray-400 whitespace-nowrap">{user.email}</td>

                    {/* Role Badge */}
                    <td className="py-3 px-6">
                      {isRecruiter ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-gray-900 text-xs font-semibold">
                          <Briefcase size={10} /> Recruiter
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#24272e] border border-[#31353f] ${!isActive ? "text-gray-500" : "text-gray-400"}`}>
                          <UserIcon size={10} /> Seeker
                        </span>
                      )}
                    </td>

                    {/* Join Date */}
                    <td className="py-3 px-6 text-gray-400 whitespace-nowrap">{user.joinDate || "N/A"}</td>

                    {/* Status Badge */}
                    <td className="py-3 px-6">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#142921] text-[#4ade80] text-xs font-medium border border-[#1b3d2f]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2d191e] text-[#f87171] text-xs font-medium border border-[#44232b]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]"></span> Suspended
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-6 text-right space-x-3 text-xs font-medium whitespace-nowrap">
                      {!isActive ? (
                        <>
                          <button className="text-emerald-500 hover:text-emerald-400 transition-colors">Activate</button>
                          <button className="text-gray-400 hover:text-white transition-colors">Delete</button>
                        </>
                      ) : (
                        <>
                          <button className="text-gray-400 hover:text-white transition-colors">
                            {isRecruiter ? "Make Seeker" : "Make Recruiter"}
                          </button>
                          <button className="text-red-500 hover:text-red-400 transition-colors">Suspend</button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="py-4 px-6 bg-[#15171c] border-t border-[#262930] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            Showing <span className="text-gray-200 font-medium">1 to {users.length}</span> of <span className="text-gray-200 font-medium">{users.length}</span> users
          </div>
          
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#24272e] text-gray-500 hover:text-white transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-white text-gray-900 font-semibold shadow">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#24272e] hover:text-white transition-colors">2</button>
            <span className="px-1 text-gray-600">...</span>
            <button className="w-9 h-7 flex items-center justify-center rounded hover:bg-[#24272e] hover:text-white transition-colors">1285</button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#24272e] text-gray-500 hover:text-white transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default adminUsersPage;