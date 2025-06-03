// Type definition for an album
import type { ExternalAlbum } from "@/app/types/album"

// Initial data
const initialAlbums: ExternalAlbum[] = [

  {
    id: "1",
    title: "Maharana Pratap Jayanti 2024",
    description: "Photos from our celebration of Maharana Pratap Jayanti in May 2024.",
    url: "https://photos.google.com/share/AF1QipP-i_GrSiOzDbrzBFxVeNR5quTgyY_2EPfoDIfrVtRl59oqhXzrkcXYaph9n7sqdA?key=UlUxQXd5VFBNRnlUQnRLdmhPeTcyaXl4MjFwQkJ3",
    createdAt: "2024-05-09T12:00:00Z",
  },
  {
    id: "2",
    title: "Annual KWAC Picnic 2023",
    description: "A wonderful day of fun, food, and community at our annual summer picnic.",
    url: "https://photos.google.com/share/AF1QipP8dXpet0XbgtHlrezIkyU_v3hSx8vv2ZjnJ0OWHHdWXuXl6Z-SDIiQ1Ql98LXcDw?key=YU5tLVA4X05ib1FpME9nM1pmTTBPazRETmRlZFpB",
    createdAt: "2023-07-26T12:00:00Z",
  },
  {
    id: "3",
    title: "Vijay Dashmi Celebration 2023",
    description: "Photos from our Vijay Dashmi celebration and Shastra Pujan ceremony.",
    url: "https://photos.google.com/share/AF1QipNc-v5yiZR8YrsqF7GkL092-HDDe6MRdMmCkMGB2poSfF76J33AZuyfpbhd_MDaOw?key=UFFGdXZROHh6dk56VkpFNWYzeVFwai0wdXJkd0ln",
    createdAt: "2023-10-24T12:00:00Z",
  },
  {
    id: "4",
    title: "Annual KWAC Picnic 2024",
    description: "A wonderful day of fun, food, and community at our annual summer picnic.",
    url: "https://photos.google.com/share/AF1QipOWds3RLJomsmP3aXx6MT0vkIIePZnLhCraj4T1K9N1sSy4Asxe2dvoSghHgEs4Og?key=bS1ocUVnMzk1Ty1pTHg1b0RXeHpTT1hfdjdad1l3",
    createdAt: "2024-07-26T12:00:00Z",
  },
  {
    id: "5",
    title: "Vijay Dashmi Celebration 2024",
    description: "Photos from our Vijay Dashmi celebration and Shastra Pujan ceremony.",
    url: "https://photos.google.com/share/AF1QipMZIgNynO7WCqlFEyzgGDGYDjo91dGXcZpBpqjD-Jei5KHlTnboIPbSdQSlQeeigw?key=RDhjME9uVWRWdmpXMGF6REYwOEFWdEJhOUJQS01R",
    createdAt: "2024-10-24T12:00:00Z",
  },
  {
    id: "6",
    title: "Maharana Pratap Jayanti 2023",
    description: "Photos from our celebration of Maharana Pratap Jayanti in May 2023.",
    url: "https://photos.google.com/share/AF1QipOQwAJ6L8rk3oD2cUPhOYF50jdXbQNnyvuRsfaYf23eGtxmt_5gVpTQcRgYSQubIA?key=WGxoS3dEejdXUTZrc0lnRXhENkJBUHI3XzFxeTVB",
    createdAt: "2024-05-11T12:00:00Z",
  },
 {
    id: "7",
    title: "Maharana Pratap Jayanti 2025",
    description: "Photos from our celebration of Maharana Pratap Jayanti in May 2025.",
    url: "https://photos.app.goo.gl/uxJAQ44P98d3YcjA6",
    createdAt: "2025-05-31T12:00:00Z",
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
