import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, DollarSign, Calendar, Heart } from "lucide-react"

export default function Donate() {
  const ETRANSFER_EMAIL = "KWAFund@gmail.com"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-xl mb-4 text-center">Donate</h1>

      <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Your generous donations help us continue our mission of supporting the Kshatriya community in Canada and
        organizing cultural and educational events. Every contribution makes a difference.
      </p>

      <div className="max-w-3xl mx-auto">
        <Card className="glass-card overflow-hidden mb-8">
          <CardHeader className="bg-orange-100 border-b border-orange-200">
            <CardTitle className="heading-md flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Donate via e-Transfer
            </CardTitle>
            <CardDescription>The simplest way to support our community initiatives</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 w-full">
                <h3 className="heading-sm mb-4">e-Transfer Information</h3>

                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Please send your e-Transfer to:</p>
                  <a
                    href={`mailto:${ETRANSFER_EMAIL}`}
                    className="text-xl font-medium text-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    {ETRANSFER_EMAIL}
                  </a>
                </div>

                <Button asChild size="lg" className="button-primary mt-2">
                  <a href={`mailto:${ETRANSFER_EMAIL}`}>Send e-Transfer</a>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Community Support</h3>
                  </div>
                  <p className="text-gray-600">
                    Your donations help us organize community events, support programs, and cultural celebrations.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Event Tickets</h3>
                  </div>
                  <p className="text-gray-600">
                    You can also use e-Transfer to pay for tickets to our paid events. Please include the event name in
                    the message.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 w-full pt-6 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Notes:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Please include your full name and mobile number in the e-Transfer message.</li>
                  <li>For event ticket payments, include the event name and number of tickets.</li>
                  <li>
                    For donations, you may specify if you'd like your contribution to support a particular initiative.
                  </li>
                  <li>All donations are used to support our community programs and events.</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 w-full text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tax Receipts</h3>
                <p className="text-gray-600">
                  For information about tax receipts for your donation, please contact us at {ETRANSFER_EMAIL}.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-gray-600 italic">
          Thank you for your generosity and support of the Kshatriya Welfare Association of Canada.
        </div>
      </div>
    </div>
  )
}
