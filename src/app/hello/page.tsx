import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">Konnectbox CRM</h1>

      <p className="m-8 text-center text-sm text-muted-foreground">
        Ready to get started?{" "}
        <Link
          href="/onboarding"
          className="underline underline-offset-4 hover:text-primary"
        >
          Signup
        </Link>
      </p>
    </main>
  )
}
