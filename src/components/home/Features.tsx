const features = [
  {
    icon: '📄',
    title: 'Craft Winning Resumes',
    description: 'Our AI helps you create ATS-optimized resumes that get you noticed by hiring managers.',
    gradient: 'from-purple-500 to-indigo-500',
    learnMore: '/features/resume-builder'
  },
  {
    icon: '🚀',
    title: 'Apply at Scale',
    description: 'Save hours by automating your job applications across multiple platforms simultaneously.',
    gradient: 'from-cyan-500 to-teal-500',
    learnMore: '/features/auto-apply'
  },
  {
    icon: '🎯',
    title: 'Perfect Match Technology',
    description: 'Our AI tailors each application to match job requirements, increasing your interview chances.',
    gradient: 'from-pink-500 to-rose-500',
    learnMore: '/features/matching'
  },
  {
    icon: '🎤',
    title: 'Master Your Interviews',
    description: 'Practice with our AI coach and get real-time feedback to ace your interviews.',
    gradient: 'from-amber-500 to-orange-500',
    learnMore: '/features/interview-prep'
  },
  {
    icon: '💡',
    title: 'Real-Time Interview Support',
    description: 'Get instant suggestions during live interviews to answer questions confidently.',
    gradient: 'from-green-500 to-emerald-500',
    learnMore: '/features/interview-copilot'
  },
  {
    icon: '📊',
    title: 'Data-Driven Insights',
    description: 'Make informed decisions with real-time salary data and market trend analysis.',
    gradient: 'from-blue-500 to-violet-500',
    learnMore: '/features/insights'
  }
]

export default function Features() {
  return (
    <div id="features" className="relative overflow-hidden bg-gray-900 py-24">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 hidden lg:block">
        <div className="h-96 w-96 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 opacity-10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
            Supercharge Your Job Search
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Our AI-powered tools work together to maximize your chances of landing your dream job.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative transform overflow-hidden rounded-2xl bg-gray-800/50 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${feature.gradient} transition-opacity duration-300 group-hover:opacity-20`} />
              
              <div className="relative">
                {/* Icon with gradient background */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-400">
                  {feature.description}
                </p>

                {/* Learn More link */}
                <a
                  href={feature.learnMore}
                  className={`mt-4 inline-flex items-center text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent transition-transform duration-300 group-hover:translate-x-1`}
                >
                  Learn More
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

        {/* Call to action */}
        <div className="mt-16 text-center">
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            Get Started with All Features
            <svg
              className="ml-2 h-5 w-5"
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
        </div>
      </div>
    </div>
  )
} 