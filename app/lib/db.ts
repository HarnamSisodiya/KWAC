import { promises as fs } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import type { ExternalAlbum } from "@/app/types/album"

// Define paths for our JSON files
const DATA_DIR = path.join(process.cwd(), "data")
const EXTERNAL_ALBUMS_FILE = path.join(DATA_DIR, "external-albums.json")

// Ensure the data directory exists
async function ensureDataDir() {
  try {
    console.log("Creating data directory at:", DATA_DIR)
    await fs.mkdir(DATA_DIR, { recursive: true })
    console.log("Data directory created or already exists")
  } catch (error) {
    console.error("Error creating data directory:", error)
  }
}

// Initialize empty JSON files if they don't exist
async function initializeFiles() {
  await ensureDataDir()

  try {
    await fs.access(EXTERNAL_ALBUMS_FILE)
    console.log("External albums file exists")
  } catch {
    console.log("Creating external albums file")
    await fs.writeFile(EXTERNAL_ALBUMS_FILE, JSON.stringify([]))
    console.log("External albums file created")
  }
}

// Export the initialization function for use in other parts of the app
export { initializeFiles }

// Generate a unique ID
export function generateId(): string {
  return uuidv4()
}

// External Album operations
export async function getExternalAlbums(): Promise<ExternalAlbum[]> {
  await initializeFiles()
  try {
    const data = await fs.readFile(EXTERNAL_ALBUMS_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading external albums file:", error)
    return []
  }
}

export async function getExternalAlbum(id: string): Promise<ExternalAlbum | null> {
  const albums = await getExternalAlbums()
  return albums.find((album) => album.id === id) || null
}

// Update the createExternalAlbum function to accept a custom date
export async function createExternalAlbum(album: Omit<ExternalAlbum, "id">): Promise<ExternalAlbum> {
  const albums = await getExternalAlbums()

  const newAlbum: ExternalAlbum = {
    ...album,
    id: uuidv4(),
    createdAt: album.createdAt || new Date().toISOString(), // Use provided date or current date
  }

  albums.push(newAlbum)
  await fs.writeFile(EXTERNAL_ALBUMS_FILE, JSON.stringify(albums, null, 2))

  return newAlbum
}

export async function updateExternalAlbum(id: string, updates: Partial<ExternalAlbum>): Promise<ExternalAlbum | null> {
  const albums = await getExternalAlbums()
  const index = albums.findIndex((album) => album.id === id)

  if (index === -1) return null

  const updatedAlbum = {
    ...albums[index],
    ...updates,
  }

  albums[index] = updatedAlbum
  await fs.writeFile(EXTERNAL_ALBUMS_FILE, JSON.stringify(albums, null, 2))

  return updatedAlbum
}

export async function deleteExternalAlbum(id: string): Promise<boolean> {
  const albums = await getExternalAlbums()
  const filteredAlbums = albums.filter((album) => album.id !== id)

  if (filteredAlbums.length === albums.length) return false

  await fs.writeFile(EXTERNAL_ALBUMS_FILE, JSON.stringify(filteredAlbums, null, 2))

  return true
}

export async function searchExternalAlbums(query: string): Promise<ExternalAlbum[]> {
  const albums = await getExternalAlbums()
  const lowerQuery = query.toLowerCase()

  return albums.filter(
    (album) =>
      album.title.toLowerCase().includes(lowerQuery) ||
      (album.description && album.description.toLowerCase().includes(lowerQuery)),
  )
}
