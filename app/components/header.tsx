"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { SITE_LOGO, FALLBACK_LOGO } from "@/app/constants/site"

const Header = () => {
  const [imgSrc, setImgSrc] = useState(SITE_LOGO)
  const [logoLoaded, setLogoLoaded] = useState(false)

  useEffect(() => {
    // Check if the image exists by creating a new Image object
    const img = new Image()
    img.onload = () => {
      setLogoLoaded(true)
    }
    img.onerror = () => {
      setImgSrc(FALLBACK_LOGO)
      setLogoLoaded(true)
    }
    img.src = SITE_LOGO
  }, [])

  const handleImageError = () => {
    // Fallback to direct URL if local file fails to load
    setImgSrc(FALLBACK_LOGO)
  }

  return (
    <header className="bg-orange-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left-aligned logo */}
          <Link href="/" className="flex-shrink-0 mb-4 md:mb-0">
            <div className="glass-card p-2">
              <img
                src={imgSrc || "/placeholder.svg"}
                alt="KWAC Logo"
                width={100}
                height={100}
                className="rounded-full"
                onError={handleImageError}
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
