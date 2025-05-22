import { type NextRequest, NextResponse } from "next/server"
import { getExternalAlbums, createExternalAlbum, searchExternalAlbums } from "@/app/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query")

    let albums
    if (query) {
      albums = await searchExternalAlbums(query)
    } else {
      albums = await getExternalAlbums()
    }

    return NextResponse.json({ success: true, albums })
  } catch (error) {
    console.error("Error fetching external albums:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch external albums" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    // Create the album with custom date if provided
    const album = await createExternalAlbum({
      title: data.title,
      description: data.description || "",
      url: data.url,
      createdAt: data.createdAt || new Date().toISOString(), // Use provided date or current date
    })

    return NextResponse.json({ success: true, album })
  } catch (error) {
    console.error("Error creating external album:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create external album",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
