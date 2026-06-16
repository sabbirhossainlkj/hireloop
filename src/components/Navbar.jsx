"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Plans", href: "/plans" },
  ];

  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user)

  if (user?.email) {
    navLinks.push({
      name: "Dashboard",
      href: dashboardLinks[user?.role || "seeker"],
    });
  }

  const handleSingOut = async () => {
    await authClient.signOut();
  };
  return (
    <nav className="w-full bg-[#0f1117] py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between rounded-2xl bg-[#141720] px-8 py-4 border border-gray-800 shadow-lg">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-blue-500">hire</span>
            <span className="text-orange-500">loop</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition font-medium ${
                  pathname === link.href
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="text-white font-medium">Hi {user.name}!</span>
                <Button variant="danger" onClick={handleSingOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link
                href="/auth/singin"
                className={`transition ${
                  pathname === "/auth/singin"
                    ? "text-white"
                    : "text-indigo-400 hover:text-indigo-300"
                }`}
              >
                Sign In
              </Link>
            )}

            <Link
              href="/auth/singup"
              className={`px-6 py-3 rounded-xl text-white font-medium transition ${
                pathname === "/auth/singup"
                  ? "bg-blue-400 text-white"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
              }`}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
