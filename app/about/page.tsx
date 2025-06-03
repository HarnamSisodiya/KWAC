export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-xl mb-8 text-center">About Us</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          The Kshatriya Welfare Association of Canada (KWAC) is a non-profit organization dedicated to celebrate and
          preserve the rich culture and also helping across all communities in Canada through its philanthropic events.
        </p>

        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h2 className="heading-md mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To create a united, inclusive community that cherishes cultural heritage, empowers individuals with
            knowledge and opportunity, and extends a helping hand to foster the well-being of all Canadians through acts
            of compassion and collaboration.
          </p>
        </div>

        <div>
          <h2 className="heading-md mb-4">Our Mission</h2>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-orange-500 mb-1">Preserve and Promote Heritage</h3>
              <p className="text-gray-700">
                To safeguard the rich cultural legacy of the Kshatriya community and pass it on to future generations
                with pride.
              </p>
            </li>

            <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-orange-500 mb-1">Empower Through Knowledge and Education</h3>
              <p className="text-gray-700">
                To host accessible, informative seminars on topics like real estate, banking, IT, and
                entrepreneurship—open to all Canadians—to inspire personal and professional growth.
              </p>
            </li>

            <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-orange-500 mb-1">Strengthen Community Bonds</h3>
              <p className="text-gray-700">
                To cultivate meaningful connections through cultural events, networking programs, and celebrations that
                unite our community and beyond.
              </p>
            </li>

            <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-orange-500 mb-1">Serve All Communities with Compassion</h3>
              <p className="text-gray-700">
                To go beyond boundaries by organizing impactful philanthropic initiatives, such as blood donation
                drives, food donation campaigns, and outreach projects, uplifting people across Canada.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
