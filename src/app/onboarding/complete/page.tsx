"use client";

import Link from "next/link"
import { useSearchParams, useRouter } from 'next/navigation'

import { UserCompleteForm } from "../_components/user-complete-form"


export default function AuthenticationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token');
  const email = searchParams.get('email');
  if (!email || !token) return router.push('/');

  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Signup Onboarding
        </h1>
      </div>
      <UserCompleteForm emailx={email} token={token} />
    </>
  )
}