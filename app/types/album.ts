export interface ExternalAlbum {
  id: string
  title: string
  description?: string
  url: string
  createdAt: string
  coverImage?: string
  photoCount?: number
  formattedDate?: string // Added for the edit form
}
