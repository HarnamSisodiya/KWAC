// Type definition for a business
export interface Business {
  id: number
  name: string
  type: string
  description: string
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  email: string
  website?: string
  owner: string
}

// Initial data - all fields normalized to lowercase
const initialBusinesses: Business[] = [
  {
    id: 1,
    name: "Allstate Insurance",
    type: "Insurance",
    description: "Allstate Insurance for auto and home",
    address: "570 Kingston Rd, #9, Pickering",
    city: "Pickering",
    province: "ON",
    postalCode: "L1V 1A6",
    phone: "(647) 656-2810",
    email: "dGuleria@allstate.ca",
    website: "",
    owner: "Deeksha Guleria",
  },
  {
    id: 2,
    name: "Approved Towing",
    type: "Auto",
    description: "24 x 7 road side assistance.",
    address: "0 Glidden Rd, Brampton",
    city: "Brampton",
    province: "ON",
    postalCode: "L6W 1H9",
    phone: "(647) 287-6200",
    email: "ApprovedTowingAssist@gmail.com",
    website: "",
    owner: "Gaurav Rana",
  },
  {
    id: 3,
    name: "Arman Constructions",
    type: "Construction",
    description: "Construction, renovation etc.",
    address: ", , ON",
    city: "",
    province: "ON",
    postalCode: "",
    phone: "(647) 450-5762",
    email: "ASingh2505@gmail.com",
    website: "",
    owner: "Arbind Singh",
  },
  {
    id: 4,
    name: "Cornwall Animal Hospital",
    type: "AnimalServices",
    description: "Pet Examination, Spay, Neuter, Vaccination and Treatment.",
    address: "1495 Cornwall road Unit#36",
    city: "Oakville",
    province: "ON",
    postalCode: "",
    phone: "(905) 842-6800",
    email: "",
    website: "www.cornwallvet.com",
    owner: "Dr. Pawan Singh Kutlehria",
  },
  {
    id: 5,
    name: "Damas Skincare and Laser Inc.",
    type: "Healthcare",
    description: "Skin care ( Acne, chemical peel, dermaplaning, facials) and Laser treatment service (hair removal).",
    address: "250 Dundas Street W , Unit# 205, Mississauga",
    city: "Mississauga",
    province: "ON",
    postalCode: "L6Y 4R9",
    phone: "(647) 886-0444",
    email: "",
    website: "",
    owner: "Shashi Singh Bhadauria",
  },
  {
    id: 6,
    name: "Dinesh CPA Professional Corp",
    type: "Accounting",
    description: "Personal, Corp Tax filing, Payroll, Book keeping, Business Accounting.",
    address: "216-2985 Drew Rd , Mississauga",
    city: "Mississauga",
    province: "ON",
    postalCode: "",
    phone: "416-879-7023",
    email: "dineshcpa1975@gmail.com",
    website: "",
    owner: "Dinesh Singh",
  },
  {
    id: 7,
    name: "Dynamite Auto Collision",
    type: "Auto",
    description: "Auto Body Repair and Painting.",
    address: "16 Stafford Dr",
    city: "Brampton",
    province: "ON",
    postalCode: "L6W 1L4",
    phone: "(905) 872-5500",
    email: "info@dynamiteAutoCollison.ca",
    website: "https://dynamiteAutoCollison.ca",
    owner: "Gaurav Rana, Vishal Rana",
  },
  {
    id: 8,
    name: "Finance Solutions",
    type: "Mortgage",
    description: "Small business, Business Loans, Startup Govt loans, Franchise Financing.",
    address: "",
    city: "Brampton",
    province: "ON",
    postalCode: "",
    phone: "(647) 338-2577",
    email: "GajRathore@gmail.com",
    website: "",
    owner: "Gajendra Singh Rathore",
  },
  {
    id: 9,
    name: "Garland Immigration",
    type: "Legal",
    description: "RCIC-IRB & Commissioner of Oath. Immigration Services.",
    address: "5200 Dixie Road, #201",
    city: "Mississauga",
    province: "ON",
    postalCode: "L4W 1E4",
    phone: "(647) 522-6610",
    email: "Sultan@GarlandInternationalImmigration.ca",
    website: "http://GarlandInternationalImmigration.ca/",
    owner: "Sultan Singh",
  },
  {
    id: 10,
    name: "Go4Canada",
    type: "Legal",
    description: "Immigration, Study, Work and Visitor Visas.",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "(647) 336-2227",
    email: "",
    website: "https://Go4Canada.com",
    owner: "Raghvendra Singh Shekhawat",
  },
  {
    id: 11,
    name: "HURLIIS LAW",
    type: "Legal",
    description: "Notary, Legal advice, Immigration services, Real Estate.",
    address: "7045 Edwards Blvd #402",
    city: "Mississauga",
    province: "ON",
    postalCode: "L4K 2T7",
    phone: "(416) 575-3536",
    email: "info@hurliislaw.ca",
    website: "http://hurliislaw.ca/",
    owner: "Abhisek Singh Tanwar",
  },
  {
    id: 12,
    name: "Insurance & Financial Advisor",
    type: "Insurance",
    description: "Life, Critical Illness, Disability, Mortgage & Visitor Insurance, RRSP, RESP.",
    address: "7003 Steel Ave West, #10",
    city: "Brampton",
    province: "ON",
    postalCode: "M9W 0A2",
    phone: "(647) 273-2161",
    email: "meetKiran28@Hotmail.com",
    website: "",
    owner: "Kiran Singh Rajput",
  },
  {
    id: 13,
    name: "Mom Spreneurs Events & Decor",
    type: "Home",
    description: "Events & Home Decor.",
    address: "",
    city: "Brampton",
    province: "ON",
    postalCode: "",
    phone: "(647) 806-7783",
    email: "MomSpreneurs@gmail.com",
    website: "",
    owner: "Vashudha Rathore Chauhan",
  },
  {
    id: 14,
    name: "Mortgage Services",
    type: "Mortgage",
    description: "Mortgage Service, First-time buyers, Investors, refinance.",
    address: "100 Allstate Parkway, #703",
    city: "Markham",
    province: "ON",
    postalCode: "L3R 6H3",
    phone: "(416) 735-4728",
    email: "RaghuJasMortgages@gmail.com",
    website: "",
    owner: "Raghu Raj Jaswal",
  },
  {
    id: 15,
    name: "Mr Tile & Hardwood Flooring",
    type: "Home",
    description: "Laminate, Hardwood flooring, Tiles & staircase sales and service.",
    address: "7025 Tomken Road #7",
    city: "Mississauga",
    province: "ON",
    postalCode: "L5S 1R6",
    phone: "(905) 795-8800",
    email: "mrtiles@outlook.com",
    website: "www.pacifictiles.ca",
    owner: "Amar Singh Rathore",
  },
  {
    id: 16,
    name: "Rathore Homes",
    type: "Realtor",
    description: "Buying, Selling, Invest in Real Estate.",
    address: "",
    city: "Mississauga",
    province: "ON",
    postalCode: "",
    phone: "(647) 895-0386",
    email: "RajenderSingh_Rathore@yahoo.com",
    website: "www.RathoreHomes.ca",
    owner: "Paritosh Bhada",
  },
  {
    id: 17,
    name: "The UPS Store",
    type: "Shipping",
    description: "Mail, courier, office supplies, packaging services.",
    address: "6 - 295 Queen Street East",
    city: "Brampton",
    province: "ON",
    postalCode: "L6W 4S6",
    phone: "(905) 453-4789",
    email: "Store167@theUpsStore.CA",
    website: "www.theUpsStore.ca/167",
    owner: "Rajdeep Rana",
  },
]

// Get all businesses - always returns the static data defined in the file
export function getBusinesses(): Business[] {
  return initialBusinesses
}

// Sort businesses by field and direction
export function sortBusinesses(businesses: Business[], field: keyof Business, direction: "asc" | "desc"): Business[] {
  return [...businesses].sort((a, b) => {
    const valueA = a[field] || ""
    const valueB = b[field] || ""

    if (typeof valueA === "string" && typeof valueB === "string") {
      return direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })
}
