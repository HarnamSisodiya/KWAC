import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild size="lg" className="button-primary">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
