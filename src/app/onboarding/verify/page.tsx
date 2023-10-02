"use client";

import Link from "next/link"
import { useSearchParams, useRouter } from 'next/navigation'

import { UserVerifyForm } from "../_components/user-verify-form"


export default function AuthenticationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const email = searchParams.get('email');
  if (!email) return router.push('/');

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the verification code we sent to your email{" "}
          <b>{email}</b>
        </p>
      </div>
      <UserVerifyForm emailx={email} />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Didn&apos;t get the email?{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Resend
        </Link>
      </p>
    </>
  )
}