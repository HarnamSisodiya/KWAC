"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, MapPin, Phone, Mail, Building, Globe, ArrowUp, ArrowDown } from "lucide-react"
import { getBusinesses, sortBusinesses, type Business } from "@/app/services/business-service"
import { toast } from "@/hooks/use-toast"

export default function CommunityBusiness() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCity, setFilterCity] = useState("all")
  const [sortField, setSortField] = useState<keyof Business>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Load businesses on component mount directly from the service
  useEffect(() => {
    const loadedBusinesses = getBusinesses()
    // Apply default sorting by name
    const sortedBusinesses = sortBusinesses(loadedBusinesses, "name", "asc")
    setBusinesses(sortedBusinesses)
  }, [])

  // Get unique business types for the filter, sorted alphabetically
  const businessTypes = [...new Set(businesses.map((b) => b.type))].sort()

  // Get unique cities for the filter
  const cities = [...new Set(businesses.map((b) => b.city))].filter(Boolean)

  // Filter businesses
  const filteredBusinesses = businesses.filter(
    (business) =>
      ((business.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (business.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())) &&
      (filterType === "all" || business.type === filterType) &&
      (filterCity === "all" || business.city === filterCity),
  )

  const handleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc"
    setSortDirection(newDirection)
    const sortedBusinesses = sortBusinesses(businesses, sortField, newDirection)
    setBusinesses(sortedBusinesses)
  }

  const handleExport = (format: "excel") => {
    if (filteredBusinesses.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no businesses matching your current filters.",
        variant: "destructive",
      })
      return
    }

    if (format === "excel") {
      try {
        // Create CSV content
        const headers = [
          "Name",
          "Owner",
          "Type",
          "Description",
          "Address",
          "City",
          "Province",
          "Postal Code",
          "Phone",
          "Email",
          "Website",
        ]
        const csvContent = [
          headers.join(","),
          ...filteredBusinesses.map((business) =>
            [
              `"${business.name.replace(/"/g, '""')}"`,
              `"${business.owner.replace(/"/g, '""')}"`,
              `"${business.type.replace(/"/g, '""')}"`,
              `"${business.description.replace(/"/g, '""')}"`,
              `"${business.address.replace(/"/g, '""')}"`,
              `"${business.city.replace(/"/g, '""')}"`,
              `"${business.province.replace(/"/g, '""')}"`,
              `"${business.postalCode.replace(/"/g, '""')}"`,
              `"${business.phone.replace(/"/g, '""')}"`,
              `"${business.email.replace(/"/g, '""')}"`,
              `"${business.website ? business.website.replace(/"/g, '""') : ""}"`,
            ].join(","),
          ),
        ].join("\n")

        // Create a blob and download link
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", "community_businesses.csv")
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url) // Clean up the blob URL

        toast({
          title: "Export successful",
          description: "The data has been exported to Excel format.",
        })
      } catch (error) {
        toast({
          title: "Export failed",
          description: "There was an error exporting the data.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">Community Businesses</h1>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search and filters - First row */}
        <div className="flex flex-col md:flex-row gap-4 flex-grow">
          <Input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input w-full md:w-3/5 lg:w-3/5"
          />

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="glass-card w-full md:w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="glass-card w-full md:w-48">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort and Export buttons - Second row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleSort} variant="outline" className="glass-card">
            Sort By: Name{" "}
            {sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />}
          </Button>

          <Button onClick={() => handleExport("excel")} className="button-primary">
            <Download className="mr-2 h-4 w-4" /> Export to Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((business) => (
          <Card
            key={business.id}
            className="bg-orange-100/90 backdrop-blur-sm border border-orange-200/30 shadow-lg rounded-lg"
          >
            <CardHeader>
              <CardTitle className="text-orange-600">{business.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1 mb-2">
                <p className="text-sm text-gray-600">Type: {business.type}</p>
                <p className="text-sm font-medium text-gray-700">Owner: {business.owner}</p>
              </div>
              <p className="text-gray-700 mb-4">{business.description}</p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                  <span>
                    {business.address}, {business.city}, {business.province} {business.postalCode}
                  </span>
                </div>

                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-orange-500 flex-shrink-0" />
                  <span>{business.city}</span>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-orange-500 flex-shrink-0" />
                  <span>{business.phone}</span>
                </div>

                {business.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-orange-500 flex-shrink-0" />
                    <a href={`mailto:${business.email}`} className="text-orange-600 hover:underline">
                      {business.email}
                    </a>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-orange-500 flex-shrink-0" />
                    <a
                      href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline"
                    >
                      {business.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
