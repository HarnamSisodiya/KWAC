"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FolderOpen, Calendar, ExternalLink, RefreshCw, Search, SortAsc, SortDesc, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ExternalAlbum } from "@/app/types/album"
import { getAlbums, searchAlbums, searchAlbumsByYear, sortAlbums } from "@/app/services/photo-service"

type SortField = "title" | "createdAt"
type SortDirection = "asc" | "desc"
type SearchType = "title" | "year"

export default function Photos() {
  const [albums, setAlbums] = useState<ExternalAlbum[]>([])
  const [filteredAlbums, setFilteredAlbums] = useState<ExternalAlbum[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<SearchType>("title")
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  useEffect(() => {
    try {
      // Load albums on component mount - directly from the service
      const loadedAlbums = getAlbums()
      setAlbums(loadedAlbums)
      setFilteredAlbums(sortAlbums(loadedAlbums, sortField, sortDirection))
    } catch (error) {
      console.error("Error loading albums:", error)
      setAlbums([])
      setFilteredAlbums([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    filterAndSortAlbums()
  }, [albums, searchQuery, searchType, sortField, sortDirection])

  const filterAndSortAlbums = () => {
    try {
      let result = [...albums]

      // Filter based on search query and type
      if (searchQuery) {
        if (searchType === "title") {
          result = searchAlbums(searchQuery)
        } else if (searchType === "year") {
          result = searchAlbumsByYear(searchQuery.trim())
        }
      }

      // Sort albums
      result = sortAlbums(result, sortField, sortDirection)
      setFilteredAlbums(result)
    } catch (error) {
      console.error("Error filtering albums:", error)
      setFilteredAlbums([])
    }
  }

  const handleOpenAlbum = (url: string) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Error opening album:", error)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid Date"
    }
  }

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
  }

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      toggleSortDirection()
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const refreshAlbums = () => {
    setLoading(true)
    try {
      // Refresh by re-fetching from the service
      const refreshedAlbums = getAlbums()
      setAlbums(refreshedAlbums)
    } catch (error) {
      console.error("Error refreshing albums:", error)
      setAlbums([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-xl mb-8">Photo Albums</h1>
        <div className="flex justify-center items-center py-16">
          <RefreshCw className="animate-spin h-12 w-12 text-orange-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-xl mb-8">Photo Albums</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder={`Search by ${searchType === "title" ? "album name" : "year"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-input"
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                onClick={clearSearch}
                type="button"
              >
                <span className="sr-only">Clear search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <Select value={searchType} onValueChange={(value) => setSearchType(value as SearchType)}>
            <SelectTrigger className="w-[140px] glass-card">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Album Name</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass-card">
                <Filter className="mr-2 h-4 w-4" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortChange("title")}>
                <span className={sortField === "title" ? "font-medium" : ""}>
                  Album Name {sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("createdAt")}>
                <span className={sortField === "createdAt" ? "font-medium" : ""}>
                  Date {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="glass-card"
            onClick={toggleSortDirection}
            title={`Sort ${sortDirection === "asc" ? "Ascending" : "Descending"}`}
          >
            {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>

          <Button onClick={refreshAlbums} variant="outline" disabled={loading} className="glass-card">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {filteredAlbums.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredAlbums.length} {filteredAlbums.length === 1 ? "album" : "albums"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <Card
                key={album.id}
                className="glass-card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleOpenAlbum(album.url)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FolderOpen className="h-6 w-6 text-orange-500" />
                    <h2 className="heading-sm">{album.title}</h2>
                  </div>

                  {album.description && <p className="text-gray-600 mb-4 line-clamp-2">{album.description}</p>}

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(album.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <ExternalLink className="h-4 w-4" />
                      <span>Open Album</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <FolderOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Photo Albums Found</h3>
          <p className="text-gray-600">
            {searchQuery
              ? `No albums match your search for "${searchQuery}".`
              : "There are no photo albums available yet."}
          </p>
          {searchQuery && (
            <Button onClick={clearSearch} variant="outline" className="mt-4">
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
