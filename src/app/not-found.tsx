"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RootLayout from "./layout";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col items-center p-24">
        <h2 className="text-2xl mb-4">Not Found</h2>
        <p>
          <span>Could not find requested resource</span>
          <code className="rounded bg-slate-400/10 mx-2 py-1 px-2 text-sm">
            {pathname}
          </code>
        </p>
        <p>
          <span>Return </span>
          <Link
            href="/"
            className="underline underline-offset-4 text-muted-foreground hover:text-primary"
          >
            Home
          </Link>
        </p>
      </div>
    </RootLayout>
  );
}
