import { getSessionUser } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Briefcase,
  Bookmark,
  CreditCard,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
export async function DashboardSidebar() {
  const user = await getSessionUser();

  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "post a job" },
    {
      icon: Bell,
      href: "/dashboard/recruiter/company",
      label: "company profile",
    },
    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
    { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: Magnifier, href: "/jobs", label: "Jobs" },
    { icon: Bookmark, href: "/saved-jobs", label: "Saved Jobs" },
    {
      icon: Briefcase,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const adminNavLinks = [
  { 
    icon: LayoutDashboard, // Or Grid, depending on your icon library
    href: "/dashboard/admin", 
    label: "Dashboard" 
  },
  { 
    icon: Users, 
    href: "/dashboard/admin/users", 
    label: "Users" 
  },
  { 
    icon: Building, // Often used for "Companies"
    href: "/dashboard/admin/companies", 
    label: "Companies" 
  },
  { 
    icon: Briefcase, // Matches the briefcase/job bag style icon
    href: "/dashboard/admin/jobs", 
    label: "Jobs" 
  },
  { 
    icon: CreditCard, // Or Banknote/Wallet for the cash stack icon
    href: "/dashboard/admin/payments", 
    label: "Payments" 
  },
  { 
    icon: Gear, // To match your seeker settings icon
    href: "/dashboard/admin/settings", 
    label: "Settings" 
  },
];

  const navLinkMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinkMap[user?.role || "seeker"];

  const nevContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-0 lg:flex lg:w-64 flex-col gap-4 p-4 border-r">
        {nevContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{nevContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
