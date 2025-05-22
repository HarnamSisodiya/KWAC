import { cookies } from "next/headers"

export type User = {
  username: string
  isAdmin: boolean
}

export function getUserFromCookie(): User | null {
  const cookieStore = cookies()
  const userCookie = cookieStore.get("kwac_user")

  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value) as User
  } catch (error) {
    console.error("Failed to parse user cookie:", error)
    return null
  }
}

export function isAdmin(): boolean {
  const user = getUserFromCookie()
  return user?.isAdmin === true
}
