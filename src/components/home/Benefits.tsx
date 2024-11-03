const benefits = [
  {
    icon: '⚡',
    title: 'Save Precious Time',
    description: 'Reduce your job search time by 60%. Our AI handles applications while you focus on preparing for interviews.',
    stat: '40+ hours saved per month',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: '🎯',
    title: 'Stand Out to Recruiters',
    description: 'Get noticed with AI-optimized resumes that are perfectly tailored to each job description.',
    stat: '3x higher response rate',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    icon: '🚀',
    title: 'Apply with Confidence',
    description: 'Our AI ensures your applications match exactly what employers are looking for.',
    stat: '85% application match rate',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    icon: '💪',
    title: 'Ace Your Interviews',
    description: 'Practice with our AI interviewer and get real-time coaching during actual interviews.',
    stat: '93% interview success rate',
    gradient: 'from-rose-500 to-pink-500'
  }
]

export default function Benefits() {
  return (
    <div className="relative overflow-hidden bg-white py-24">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div className="h-96 w-96 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 opacity-50 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
        <div className="h-96 w-96 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 opacity-50 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Enigma Code?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Join thousands of successful job seekers who've transformed their job search with our AI-powered platform.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105"
            >
              {/* Gradient border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-10 transition-opacity group-hover:opacity-20`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient}`}>
                  <span className="text-3xl">{benefit.icon}</span>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {benefit.description}
                </p>

                {/* Stat */}
                <div className="mt-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-1">
                  <span className={`bg-gradient-to-r ${benefit.gradient} bg-clip-text font-bold text-transparent`}>
                    {benefit.stat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <span>Start Optimizing Your Job Search</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <p className="mt-4 text-sm text-gray-600">
            Join over 50,000 successful job seekers
          </p>
        </div>
      </div>
    </div>
  )
} 