"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/shadcn/ui/button"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"
import { Api } from "@/lib/api"
import { OTPInput } from "@/components/ui/otp-input"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/shadcn/ui/use-toast"

interface UserVerifyFormProps extends React.HTMLAttributes<HTMLDivElement> {
  emailx: string;
}

const OTP_LENGTH = 4;

export function UserVerifyForm({ className, emailx, ...props }: UserVerifyFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [otp, setOtp] = React.useState('');
  
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    if(otp.length !== OTP_LENGTH) {
      toast({
        variant: "destructive",
        description: "Please enter OTP"
      })
      return;
    }

    setIsLoading(true)
    const response = await Api.verifySignup(emailx, otp);
    setIsLoading(false)
    if (response.ok) {
      const token = response.body.verificationToken;
      router.push(`/onboarding/complete?email=${emailx}&token=${token}`);
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
            <OTPInput length={OTP_LENGTH} onChange={setOtp} />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Verify
          </Button>
        </div>
      </form>
    </div>
  )
}