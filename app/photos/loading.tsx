import { RefreshCw } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">Photo Albums</h1>
      <div className="flex justify-center items-center py-16">
        <RefreshCw className="animate-spin h-12 w-12 text-orange-500" />
      </div>
    </div>
  )
}
