"use client";

import "./globals.css";
import "./app.css";
// import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import { Toaster } from "@/components/shadcn/ui/toaster";
import KBAuth0Provider from "@/components/providers/kb-auth0-provider";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardLayout from "@/layouts/dashboard";
import AuthenticationLayout from "@/layouts/authentication";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'Konnectbox CRM',
//   description: 'Konnectbox CRM Application',
// }

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KBAuth0Provider>
          <AutoLayoutByPath>{props.children}</AutoLayoutByPath>
          <Toaster />
        </KBAuth0Provider>
      </body>
    </html>
  );
}

export function AutoLayoutByPath(props: React.PropsWithChildren) {
  const pathname = usePathname();

  const isPublicPage = () => {
    return pathname === "/" || pathname.startsWith("/onboarding");
  };

  return isPublicPage() ? (
    <AuthenticationLayout>{props.children}</AuthenticationLayout>
  ) : (
    <DashboardLayout>{props.children}</DashboardLayout>
  );
}

export function AutoLayoutByAuth(props: React.PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <DashboardLayout>{props.children}</DashboardLayout>
  ) : (
    <AuthenticationLayout>{props.children}</AuthenticationLayout>
  );
}
