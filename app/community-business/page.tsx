"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, MapPin, Phone, Mail, Building, Globe, Filter } from "lucide-react"
import { getBusinesses, sortBusinesses, type Business } from "@/app/services/business-service"
import { toast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// @ts-ignore
import { jsPDF } from "jspdf"
// @ts-ignore
import "jspdf-autotable"

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

  // Get unique cities for the filter
  const cities = [...new Set(businesses.map((b) => b.city))].filter(Boolean)

  // Get unique business types for display in the dropdown
  const businessTypes = [
    "Accounting",
    "AnimalServices",
    "Auto",
    "Banking",
    "Education",
    "Food",
    "Healthcare",
    "Insurance",
    "Legal",
    "Mortagage",
    "Other",
    "Realtor",
    "Retail",
    "Shipping",
    "Technology",
    "Home",
     "Construction",
  ]

  // Filter and sort businesses
  const filteredBusinesses = businesses.filter(
    (business) =>
      (business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === "all" || business.type === filterType) &&
      (filterCity === "all" || business.city === filterCity),
  )

  const handleSort = (field: keyof Business) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }

    // Apply sorting
    const sortedBusinesses = sortBusinesses(
      businesses,
      field,
      field === sortField && sortDirection === "asc" ? "desc" : "asc",
    )
    setBusinesses(sortedBusinesses)
  }

  const handleExport = (format: "excel" | "pdf") => {
    if (filteredBusinesses.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no businesses matching your current filters.",
        variant: "destructive",
      })
      return
    }

    if (format === "excel") {
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

      toast({
        title: "Export successful",
        description: "The data has been exported to Excel format.",
      })
    } else if (format === "pdf") {
      try {
        // Create a new PDF document
        const doc = new jsPDF()

        // Add title
        doc.setFontSize(18)
        doc.setTextColor(230, 88, 0) // Orange color for title
        doc.text("KWAC Community Businesses", 14, 20)

        // Add date
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100) // Gray color for date
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 26)

        // Prepare table data
        const tableData = filteredBusinesses.map((business) => [
          business.name,
          business.owner,
          business.type,
          business.city,
          business.phone,
          business.email,
        ])

        // Add table
        doc.autoTable({
          startY: 30,
          head: [["Business Name", "Owner", "Type", "City", "Phone", "Email"]],
          body: tableData,
          headStyles: {
            fillColor: [230, 88, 0],
            textColor: [255, 255, 255],
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
          margin: { top: 30 },
        })

        // Save the PDF
        doc.save("community_businesses.pdf")

        toast({
          title: "Export successful",
          description: "The data has been exported to PDF format.",
        })
      } catch (error) {
        console.error("PDF generation error:", error)
        toast({
          title: "Export failed",
          description:
            "There was an error generating the PDF file: " + (error instanceof Error ? error.message : "Unknown error"),
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">Community Businesses</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* First row: Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-3/4 lg:w-3/5">
            <Input
              type="text"
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-1/2 lg:w-3/5">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="glass-card w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
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
              <SelectTrigger className="glass-card w-full sm:w-48">
                <SelectValue placeholder="Filter by city" />
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
        </div>

        {/* Second row: Sort and Export buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass-card">
                <Filter className="mr-2 h-4 w-4" />
                Sort By: {sortField.charAt(0).toUpperCase() + sortField.slice(1)} {sortDirection === "asc" ? "↑" : "↓"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort("name")}>
                <span className={sortField === "name" ? "font-medium" : ""}>
                  Business Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("type")}>
                <span className={sortField === "type" ? "font-medium" : ""}>
                  Business Type {sortField === "type" && (sortDirection === "asc" ? "↑" : "↓")}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("city")}>
                <span className={sortField === "city" ? "font-medium" : ""}>
                  City {sortField === "city" && (sortDirection === "asc" ? "↑" : "↓")}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={() => handleExport("excel")} className="button-primary w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> Export to Excel
          </Button>
          <Button onClick={() => handleExport("pdf")} className="button-primary w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> Export to PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((business) => (
          <Card key={business.id} className="glass-card">
            <CardHeader>
              <CardTitle className="text-orange-600">{business.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mb-2">
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

                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-orange-500 flex-shrink-0" />
                  <a href={`mailto:${business.email}`} className="text-orange-600 hover:underline">
                    {business.email}
                  </a>
                </div>

                {business.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-orange-500 flex-shrink-0" />
                    <a
                      href={business.website}
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
