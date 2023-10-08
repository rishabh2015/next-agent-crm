"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";
import kbIcon from "../../public/konnectbox-icon.svg";
import { RedirectLoginOptions, useAuth0 } from "@auth0/auth0-react";

export default function AuthenticationLayout(props: React.PropsWithChildren) {
  const { loginWithRedirect } = useAuth0();

  // const options: RedirectLoginOptions = {
  //   authorizationParams: {
  //   }
  // }

  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
          onClick={() => loginWithRedirect()}
        >
          Login
        </Link> */}
      <Button
        variant="ghost"
        onClick={() => loginWithRedirect()}
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        Login
      </Button>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src={kbIcon} alt="logo" />
          KonnectBox
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Seamlessly connect your data, teams, and customers on one CRM platform that grows with your business.
            </p>
            <footer className="text-sm">Konnectbox</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">{props.children}</div>
      </div>
    </div>
  );
}
