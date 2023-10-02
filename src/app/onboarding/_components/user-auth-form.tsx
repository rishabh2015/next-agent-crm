"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/shadcn/ui/button"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"
import { Api } from "@/lib/api"
import { useToast } from "@/components/shadcn/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type RecordElements = Record<string, HTMLInputElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter();
  const { toast } = useToast()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const email = (event.target as unknown as RecordElements).email.value;
    const response = await Api.initiateSignup(email);
    console.log('response', response)
    setIsLoading(false)
    if (response.ok) {
      router.push(`/onboarding/verify?email=${email}`)
      toast({ description: response.body?.message })
    } else {
      toast({
        variant: "destructive",
        description: response.body?.message || response.body?.error || "Unknown error"
      })
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}