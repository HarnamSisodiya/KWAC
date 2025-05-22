import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const userCookie = request.cookies.get("kwac_user")

    // If no user cookie is found, redirect to login
    if (!userCookie) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("from", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Verify the user is an admin
      const user = JSON.parse(userCookie.value)
      if (!user.isAdmin) {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    } catch (error) {
      // If parsing fails, redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
