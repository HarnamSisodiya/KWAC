"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail } from "lucide-react"

export default function Events() {
  const { toast } = useToast()

  const handleEmailRegister = (eventTitle: string) => {
    toast({
      title: "Registration Information",
      description: (
        <div className="space-y-2">
          <p>Please email us at KWAOfCanada@gmail.com to register for "{eventTitle}"</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 flex items-center gap-2 bg-transparent"
            onClick={() => {
              window.location.href =
                "mailto:KWAOfCanada@gmail.com?subject=Registration for " + encodeURIComponent(eventTitle)
            }}
          >
            <Mail className="h-4 w-4" />
            Send Email
          </Button>
        </div>
      ),
      duration: 10000,
    })
  }

  const handleMaharanaPratapRegistration = () => {
    alert("It is past event")
  }

  const handlePicnicRegistration = () => {
    alert("It is past event")
  }

  const handleVijayDashmiRegistration = () => {
    window.open("https://tinyurl.com/dussehra2025", "_blank")
  }

  const events = [
    {
      title: "Maharana Pratap Jayanti",
      date: "May 31, 2025",
      description:
        "Let's honor the legacy of Maharana Pratap, a symbol of bravery, resilience, and patriotism. Be a part of this special day as we come together to remember his inspiring contributions and embrace the values he stood for. All are welcome to join this joyous occasion!",
      onRegister: handleMaharanaPratapRegistration,
    },
    {
      title: "Annual KWAC Picnic!",
      date: "Jul 26, 2025",
      description:
        "Mark your calendars for a day full of fun, food, and community spirit! It's the perfect opportunity to connect, relax, and celebrate together. Everyone is welcome—do not miss out on this wonderful event!",
      onRegister: handlePicnicRegistration,
    },
    {
      title: "Vijay Dashmi Shastra Pujan with KWAC!",
      date: "Oct 4, 2025",
      description:
        "Join us on October 4th as we come together for the auspicious Shastra Pujan ceremony to honor our traditions and values. Let us celebrate this meaningful occasion with devotion, unity, and pride. All members of the KWAC community are welcome! <B>After registration</b>, please e-Transfer money to KWAFUND@gmail.com mentioning your name, mobile and email ID.",
      onRegister: handleVijayDashmiRegistration,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-xl mb-8">Events</h1>
      <section>
        <h2 className="heading-lg mb-8 text-center">Major Events in 2025</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card key={event.title} className="glass-card h-full flex flex-col">
              <CardHeader>
                <CardTitle className="heading-sm">{event.title}</CardTitle>
                <CardDescription className="text-gray-600 font-medium">{event.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Button className="button-primary w-full" onClick={event.onRegister}>
                  Register for this Event
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
