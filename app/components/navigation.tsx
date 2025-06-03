"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import type React from "react"
import { useAuth } from "@/app/context/auth-context"
import { usePathname, useRouter } from "next/navigation"

const Navigation = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    if (pathname.startsWith("/admin")) {
      router.push("/")
    }
  }

  return (
    <nav className="sticky top-4 z-10 mx-auto max-w-7xl px-4">
      <div className="glass-card">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <ul className="hidden md:flex items-center space-x-6">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/about">About Us</NavItem>
              <NavItem href="/events">Events</NavItem>
              <NavItem href="/photos">Photos</NavItem>
              <NavItem href="/community-business">Community Business</NavItem>
              <NavItem href="/contact">Contact Us</NavItem>
            </ul>
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex button-primary">
              <Link href="/donate">Donate</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden glass-card">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="nav-item">
                    Home
                  </Link>
                  <Link href="/about" className="nav-item">
                    About Us
                  </Link>
                  <Link href="/events" className="nav-item">
                    Events
                  </Link>
                  <Link href="/photos" className="nav-item">
                    Photos
                  </Link>
                  <Link href="/community-business" className="nav-item">
                    Community Business
                  </Link>
                  <Link href="/contact" className="nav-item">
                    Contact Us
                  </Link>
                  <Link href="/donate" className="nav-item">
                    Donate
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="nav-item">
      {children}
    </Link>
  </li>
)

export default Navigation
