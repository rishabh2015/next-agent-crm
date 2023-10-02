"use client";

import { Separator } from "@/components/shadcn/ui/separator";

import { SidebarNav } from "@/components/views/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Profile",
    link: "/settings/profile",
  },
  {
    title: "Account",
    link: "/settings/account",
  },
  {
    title: "Employees",
    link: "/settings/employees",
  },
  {
    title: "Roles & Permissions",
    link: "/settings/roles",
  },
  {
    title: "Appearance",
    link: "/settings/appearance",
  },
  {
    title: "Notifications",
    link: "/settings/notifications",
  },
  {
    title: "Display",
    link: "/settings/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="block space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav routes={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
