import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { RouteItem } from "@/lib/types";

const routes: Array<RouteItem> = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "Agents",
    link: "/agents",
  },
  {
    title: "Agent Tracker",
    link: "/agent-tracker",
  },
  {
    title: "Reports",
    link: "/reports",
  },
  {
    title: "Contacts",
    link: "/contacts",
  },
  {
    title: "Settings",
    link: "/settings",
  },
];

function isActive(link: string, current: string) {
  return link === current ? "" : cn("text-muted-foreground");
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.link}
          href={route.link}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive(route.link, pathname)
          )}
        >
          {route.title}
        </Link>
      ))}
    </nav>
  );
}
