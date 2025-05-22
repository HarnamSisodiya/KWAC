import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "./components/header"
import Navigation from "./components/navigation"
import { AuthProvider } from "./context/auth-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Kshatriya Welfare Association of Canada",
  description: "Supporting the Kshatriya community in Canada",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter bg-orange-50">
        <AuthProvider>
          <Header />
          <Navigation />
          <main className="min-h-screen pt-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
