import { type NextRequest, NextResponse } from "next/server"
import { getExternalAlbum, updateExternalAlbum, deleteExternalAlbum } from "@/app/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const album = await getExternalAlbum(params.id)

    if (!album) {
      return NextResponse.json({ success: false, error: "Album not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, album })
  } catch (error) {
    console.error(`Error fetching external album ${params.id}:`, error)
    return NextResponse.json({ success: false, error: "Failed to fetch album" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    if (!data.title || !data.url) {
      return NextResponse.json(
        {
          success: false,
          error: "Album title and URL are required",
        },
        { status: 400 },
      )
    }

    // Get the existing album to preserve the original date if not provided
    const existingAlbum = await getExternalAlbum(params.id)
    if (!existingAlbum) {
      return NextResponse.json({ success: false, error: "Album not found" }, { status: 404 })
    }

    const updatedAlbum = await updateExternalAlbum(params.id, {
      title: data.title,
      description: data.description,
      url: data.url,
      // Use provided date, or keep the original date
      createdAt: data.createdAt || existingAlbum.createdAt,
    })

    if (!updatedAlbum) {
      return NextResponse.json({ success: false, error: "Album not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, album: updatedAlbum })
  } catch (error) {
    console.error(`Error updating external album ${params.id}:`, error)
    return NextResponse.json({ success: false, error: "Failed to update album" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteExternalAlbum(params.id)

    if (!success) {
      return NextResponse.json({ success: false, error: "Album not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting external album ${params.id}:`, error)
    return NextResponse.json({ success: false, error: "Failed to delete album" }, { status: 500 })
  }
}
