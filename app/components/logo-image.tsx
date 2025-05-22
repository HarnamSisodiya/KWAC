"use client"

import Image from "next/image"
import { FALLBACK_LOGO } from "@/app/constants/site"

interface LogoImageProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function LogoImage({ className = "", width = 200, height = 200, priority = false }: LogoImageProps) {
  return (
    <Image
      src={FALLBACK_LOGO || "/placeholder.svg"}
      alt="Kshatriya Welfare Association of Canada Logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
