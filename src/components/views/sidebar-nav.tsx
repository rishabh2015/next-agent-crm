"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/shadcn/ui/button";
import { RouteItem } from "@/lib/types";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  routes: RouteItem[];
}

function isActive(link: string, current: string) {
  return link === current
    ? cn("bg-muted hover:bg-muted")
    : cn("hover:bg-transparent hover:underline");
}

export function SidebarNav({ className, routes, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.link}
          href={route.link}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            isActive(route.link, pathname),
            "justify-start"
          )}
        >
          {route.title}
        </Link>
      ))}
    </nav>
  );
}
