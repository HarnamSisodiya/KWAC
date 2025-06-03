"use client"

import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-orange-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left-aligned logo */}
          <Link href="/" className="flex-shrink-0 mb-4 md:mb-0">
            <div className="glass-card p-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KWAC_Logo_Transparent_1.PNG-jCnOxuHpqrnvIS91XPI2RgzyPNsl0H.png"
                alt="KWAC Logo"
                width={100}
                height={100}
                className="rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=100&width=100&text=KWAC"
                }}
              />
            </div>
          </Link>

          {/* Center-aligned text */}
          <div className="flex-grow text-center md:ml-6">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 tracking-tight leading-tight">
              Kshatriya Welfare Association of Canada
            </h1>
            <p className="text-lg text-orange-500 mt-1">(KWAC)</p>
          </div>

          {/* Empty div to balance the layout on desktop */}
          <div className="hidden md:block flex-shrink-0 w-[100px]"></div>
        </div>
      </div>
    </header>
  )
}

export default Header
