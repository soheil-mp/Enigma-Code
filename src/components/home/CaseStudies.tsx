const caseStudies = [
  {
    title: "From Startup to FAANG",
    challenge: "300+ applications with no response",
    solution: "AI-optimized resume and automated applications",
    outcome: "Landed role at Google in 3 weeks",
    metrics: {
      applications: 150,
      interviews: 5,
      timeToOffer: "21 days",
      salaryIncrease: "120%"
    },
    industry: "Software Engineering"
  },
  {
    title: "Career Transition Success",
    challenge: "Switching from marketing to product management",
    solution: "Targeted resume optimization and interview coaching",
    outcome: "Secured PM role at fintech startup",
    metrics: {
      applications: 80,
      interviews: 4,
      timeToOffer: "45 days",
      salaryIncrease: "55%"
    },
    industry: "Product Management"
  },
  {
    title: "Remote Job Search Victory",
    challenge: "Limited local opportunities",
    solution: "Automated global job search and application",
    outcome: "Remote position at international company",
    metrics: {
      applications: 200,
      interviews: 6,
      timeToOffer: "30 days",
      salaryIncrease: "85%"
    },
    industry: "Digital Marketing"
  }
]

export default function CaseStudies() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Real Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how job seekers like you achieved their career goals with Enigma Code
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Industry tag */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                  {study.industry}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900">{study.title}</h3>

              {/* Journey */}
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Challenge</h4>
                  <p className="mt-1 text-gray-900">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Solution</h4>
                  <p className="mt-1 text-gray-900">{study.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Outcome</h4>
                  <p className="mt-1 text-green-600 font-medium">{study.outcome}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {Object.entries(study.metrics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-lg font-bold text-primary-600">{value}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Read more link */}
              <div className="mt-6">
                <a
                  href={`/case-studies/${index}`}
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Read full story
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-primary-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-primary-700 hover:scale-105"
          >
            Experience These Results Yourself
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Join over 50,000 successful job seekers
          </p>
        </div>
      </div>
    </section>
  )
} 