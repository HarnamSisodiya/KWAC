import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Contact() {
  const EMAIL_ADDRESS = "KWAOfCanada@Gmail.com"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-xl mb-8 text-center">Contact Us</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="bg-orange-100 p-4 rounded-full">
                <Mail className="h-12 w-12 text-orange-500" />
              </div>

              <div className="space-y-2">
                <h2 className="heading-md">Email Us</h2>
                <p className="text-gray-600 mb-4">
                  For inquiries, event registrations, or any other information, please email us at:
                </p>

                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="text-xl font-medium text-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  {EMAIL_ADDRESS}
                </a>
              </div>

              <Button asChild size="lg" className="button-primary mt-4">
                <a href={`mailto:${EMAIL_ADDRESS}`}>Send Email</a>
              </Button>

              <div className="border-t border-gray-200 w-full pt-6 mt-6">
                <h3 className="heading-sm mb-2">Response Time</h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24-48 hours during business days.
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 w-full">
                <h3 className="heading-sm mb-2">Connect With Us</h3>
                <p className="text-gray-600 mb-4">
                  Follow us on social media to stay updated with our latest events and announcements.
                </p>
                <div className="flex justify-center space-x-4">
                  {/* Social media icons can be added here */}
                  {/* For now, just placeholder buttons */}
                  <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                    <span className="sr-only">Facebook</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                    <span className="sr-only">Instagram</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                    <span className="sr-only">Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
