// Type definition for an album
import type { ExternalAlbum } from "@/app/types/album"

// Initial data
const initialAlbums: ExternalAlbum[] = [
  {
    id: "1",
    title: "Maharana Pratap Jayanti 2023",
    description: "Photos from our celebration of Maharana Pratap Jayanti in May 2023.",
    url: "https://photos.app.goo.gl/HmyNFbXZb9PJy49F8",
    createdAt: "2023-05-31T12:00:00Z",
  },
  {
    id: "2",
    title: "Annual KWAC Picnic 2023",
    description: "A wonderful day of fun, food, and community at our annual summer picnic.",
    url: "https://photos.app.goo.gl/u7pH9cKA4thAkMkG6",
    createdAt: "2023-07-26T12:00:00Z",
  },
  {
    id: "3",
    title: "Vijay Dashmi Celebration 2023",
    description: "Photos from our Vijay Dashmi celebration and Shastra Pujan ceremony.",
    url: "https://photos.app.goo.gl/yenDJfMvAQfr2oKK8",
    createdAt: "2023-10-24T12:00:00Z",
  },
  {
    id: "4",
    title: "Maharana Pratap Jayanti 2024",
    description: "Photos from our celebration of Maharana Pratap Jayanti in May 2024.",
    url: "https://photos.app.goo.gl/LH43Fikxuq4VoTLK9",
    createdAt: "2024-05-31T12:00:00Z",
  },
  {
    id: "5",
    title: "Annual KWAC Picnic 2024",
    description: "A wonderful day of fun, food, and community at our annual summer picnic.",
    url: "https://photos.app.goo.gl/pUqJfQGGyrECJ58r8",
    createdAt: "2024-07-26T12:00:00Z",
  },
  {
    id: "6",
    title: "Vijay Dashmi Celebration 2024",
    description: "Photos from our Vijay Dashmi celebration and Shastra Pujan ceremony.",
    url: "https://photos.app.goo.gl/TtzfkXNzjWSRQqMd8",
    createdAt: "2024-10-24T12:00:00Z",
  },
]

// Get all albums - always returns the static data defined in the file
export function getAlbums(): ExternalAlbum[] {
  return initialAlbums
}

// Search albums by title or description
export function searchAlbums(query: string): ExternalAlbum[] {
  const lowerQuery = query.toLowerCase()

  return initialAlbums.filter(
    (album) =>
      album.title.toLowerCase().includes(lowerQuery) ||
      (album.description && album.description.toLowerCase().includes(lowerQuery)),
  )
}

// Search albums by year
export function searchAlbumsByYear(year: string): ExternalAlbum[] {
  return initialAlbums.filter((album) => {
    const albumYear = new Date(album.createdAt).getFullYear().toString()
    return albumYear.includes(year)
  })
}

// Sort albums by field and direction
export function sortAlbums(
  albums: ExternalAlbum[],
  field: "title" | "createdAt",
  direction: "asc" | "desc",
): ExternalAlbum[] {
  return [...albums].sort((a, b) => {
    if (field === "title") {
      return direction === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else {
      return direction === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
}
