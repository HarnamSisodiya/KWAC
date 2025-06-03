"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="heading-xl mb-6">Welcome to KWAC!</h2>
            <div className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed space-y-4">
              <p>
                At KWAC, we are dedicated to preserving the rich cultural heritage of the Kshatriya (Rajput) community
                while empowering individuals to thrive both personally and professionally. As a non-profit organization,
                we strive to build a sense of unity, offer unwavering support, and foster growth among our community.
              </p>
              <p>
                Our impact extends beyond the Kshatriya community through meaningful philanthropic initiatives such as
                blood donation drives, food donation campaigns, and community outreach programs that embody the spirit
                of compassion and togetherness as a Canadian.
              </p>
              <p>
                Join us in celebrating our rich traditions, driving positive change, and building a brighter future for
                our next generation. Together, we can make a difference.
              </p>
            </div>
            <Button asChild size="lg" className="button-primary">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="glass-card overflow-hidden p-8 flex items-center justify-center max-w-md">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KWAC_Logo_Transparent_1.PNG-jCnOxuHpqrnvIS91XPI2RgzyPNsl0H.png"
                alt="Kshatriya Welfare Association Logo"
                width={350}
                height={350}
                className="w-auto h-auto max-h-[350px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="heading-lg mb-8 text-center">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Community Support",
              description:
                "Building a strong, supportive network for Kshatriya families across Canada through social events, assistance programs, and community gatherings.",
            },
            {
              title: "Cultural Preservation",
              description:
                "Preserving and celebrating our rich Kshatriya heritage through cultural events, educational programs, and intergenerational knowledge sharing.",
            },
            {
              title: "Education & Growth",
              description:
                "We offer web-based seminars on topics like real estate, banking, IT, and healthcare, connecting Canadians with experts to promote learning and growth.",
            },
          ].map((item) => (
            <Card key={item.title} className="glass-card h-full">
              <CardHeader>
                <CardTitle className="heading-sm">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="heading-lg mb-8 text-center">Major Events in 2025</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: " Maharana Pratap Jayanti",
              date: "May 31, 2025",
              description:
                "Let's honor the legacy of Maharana Pratap, a symbol of bravery, resilience, and patriotism. Be a part of this special day as we come together to remember his inspiring contributions and embrace the values he stood for. All are welcome to join this joyous occasion!",
            },
            {
              title: "Annual KWAC Picnic!",
              date: "Jul 26, 2025",
              description:
                "Mark your calendars for a day full of fun, food, and community spirit! It's the perfect opportunity to connect, relax, and celebrate together. Everyone is welcome—do not miss out on this wonderful event!",
            },
            {
              title: "Vijay Dashmi Shastra Pujan with KWAC!",
              date: "Oct 4, 2025",
              description:
                "Join us on October 4th as we come together for the auspicious Shastra Pujan ceremony to honor our traditions and values. Let us celebrate this meaningful occasion with devotion, unity, and pride. All members of the KWAC community are welcome!",
            },
          ].map((event) => (
            <Card key={event.title} className="glass-card h-full">
              <CardHeader>
                <CardTitle className="heading-sm">{event.title}</CardTitle>
                <CardDescription className="text-gray-600 font-medium">{event.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <p className="mb-6 text-gray-700 leading-relaxed flex-grow">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
