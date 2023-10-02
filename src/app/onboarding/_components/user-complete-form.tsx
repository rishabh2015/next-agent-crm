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
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group"
import { RecordElements } from "@/lib/types"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  emailx: string;
  token: string;
}

const referralMediumValues = {
  "google": "Google",
  "social_media": "Social Media",
  "friends": "Friends",
  "direct": "Direct",
  "others": "Others",
}

export function UserCompleteForm({ className, emailx, token, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter();
  const { toast } = useToast()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const form = (event.target as unknown as RecordElements);
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const referralMedium = form.referralMedium?.value;
    const designation = form.designation?.value;

    const orgName = form.orgName.value;
    const industry = form.industry.value;
    const companySize = form.companySize.value;

    const email = emailx;

    const payload = {
      organization: {
        name: orgName,
        industry,
        companySize,
      },
      user: {
        firstName,
        lastName,
        email,
        designation,
        referralMedium
      },
      verificationToken: token
    };

    const response = await Api.completeSignup(payload);
    console.log('response', response)
    setIsLoading(false)
    if (response.ok) {
      toast({
        description: response.body?.message || "Account created",
      })
      router.push(`/`)
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
            <Label htmlFor="firstName" className="mt-2">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="Start typing here .."
              type="text"
              name="firstName"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            <Label htmlFor="lastName" className="mt-2">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Start typing here .."
              type="text"
              name="lastName"
              autoCapitalize="none"
              autoComplete="lastName"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            <Label htmlFor="referralMedium" className="my-2">
              How did you come to know out product?
            </Label>
            <RadioGroup id="referralMedium" name="referralMedium" defaultValue="others">
              {Object.entries(referralMediumValues).map(([k, label]) => (
                <div key={k} className="flex items-center space-x-2">
                  <RadioGroupItem value={k} id={k} />
                  <Label htmlFor={k}>{label}</Label>
                </div>
              ))}
            </RadioGroup>
            <Label htmlFor="designation" className="mt-2">
              What is your current designation or role within the organization?
            </Label>
            <Input
              id="designation"
              placeholder="Start typing here .."
              type="text"
              name="designation"
              autoCapitalize="none"
              autoComplete="designation"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            <Label htmlFor="orgName" className="mt-2">
              Organization Name
            </Label>
            <Input
              id="orgName"
              placeholder="Start typing here .."
              type="text"
              name="orgName"
              autoCapitalize="none"
              autoComplete="organization"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            <Label htmlFor="industry" className="mt-2">
              Organization Industry
            </Label>
            <Input
              id="industry"
              placeholder="Start typing here .."
              type="text"
              name="industry"
              autoCapitalize="none"
              autoComplete="industry"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            <Label htmlFor="companySize" className="mt-2">
              How many employees are there in your organization?
            </Label>
            <Input
              id="companySize"
              placeholder="Start typing here .."
              type="text"
              name="companySize"
              autoCapitalize="none"
              autoComplete="companySize"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading} className="mt-4">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
}