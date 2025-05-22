"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Cookies from "js-cookie"

type User = {
  username: string
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = Cookies.get("kwac_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        Cookies.remove("kwac_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Case insensitive username check
    if (username.toLowerCase() === "kwacadmin" && password === "JaiMataDi@1008") {
      const user = { username: "kwacadmin", isAdmin: true }
      setUser(user)

      // Set cookie with 7 day expiration
      Cookies.set("kwac_user", JSON.stringify(user), { expires: 7, path: "/" })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    Cookies.remove("kwac_user", { path: "/" })
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
