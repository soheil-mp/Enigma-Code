const features = [
  {
    id: 'interview-coach',
    icon: '🎯',
    title: 'AI Interview Coach',
    shortDesc: 'Practice and perfect your interview skills with real-time AI feedback.',
    longDesc: 'Our AI coach adapts to different roles and industries, providing personalized feedback on your responses, body language, and tone.',
    benefits: [
      'Get instant feedback on your answers',
      'Practice with industry-specific questions',
      'Improve your confidence and delivery'
    ],
    testimonial: {
      quote: "The AI coach helped me nail my tech interview at Google. The feedback was incredibly specific and helpful.",
      author: "Sarah Chen",
      role: "Software Engineer"
    },
    gradient: 'from-purple-500 to-indigo-500',
    stats: '93% interview success rate'
  },
  {
    id: 'auto-apply',
    icon: '🚀',
    title: 'Effortlessly Apply to Hundreds of Jobs',
    shortDesc: 'Let our AI handle the application process while you focus on preparing.',
    longDesc: 'Our intelligent system automatically submits applications to matching positions across multiple job platforms, customizing each application.',
    benefits: [
      'Save 40+ hours per month on applications',
      'Apply to jobs even while you sleep',
      'Automatic application tracking'
    ],
    testimonial: {
      quote: "I applied to over 100 relevant positions in my first week. Landed 3 interviews without lifting a finger!",
      author: "Michael Rodriguez",
      role: "Marketing Manager"
    },
    gradient: 'from-cyan-500 to-teal-500',
    stats: '50K+ applications automated'
  },
  {
    id: 'resume-optimizer',
    icon: '✨',
    title: 'Smart Resume Optimization',
    shortDesc: 'Create ATS-friendly resumes tailored to each job posting.',
    longDesc: 'Our AI analyzes job descriptions and optimizes your resume to match the requirements, ensuring you pass applicant tracking systems.',
    benefits: [
      'Beat applicant tracking systems',
      'Match job requirements perfectly',
      'Stand out to hiring managers'
    ],
    testimonial: {
      quote: "My application success rate tripled after using the AI resume optimizer. It's like having an insider's advantage.",
      author: "Emily Watson",
      role: "Product Manager"
    },
    gradient: 'from-pink-500 to-rose-500',
    stats: '85% ATS pass rate'
  },
  {
    id: 'market-insights',
    icon: '📊',
    title: 'Real-Time Market Intelligence',
    shortDesc: 'Make data-driven decisions with up-to-date market insights.',
    longDesc: 'Access real-time salary data, skill trends, and market demand analysis to optimize your job search strategy.',
    benefits: [
      'Track industry salary trends',
      'Identify high-demand skills',
      'Discover growing opportunities'
    ],
    testimonial: {
      quote: "The market insights helped me negotiate a 25% higher salary than initially offered. Knowledge is power!",
      author: "David Park",
      role: "Data Analyst"
    },
    gradient: 'from-amber-500 to-orange-500',
    stats: '20K+ market data points'
  }
]

export default function DetailedFeatures() {
  return (
    <div className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Powerful Features for Your Success
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Every tool you need to streamline your job search and increase your chances of landing your dream role.
          </p>
        </div>

        <div className="mt-20 space-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative rounded-2xl bg-gray-800/50 p-8 transition-all hover:bg-gray-800/70 ${
                index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'
              }`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-10 transition-opacity group-hover:opacity-20`} />

              <div className="relative">
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  
                  {/* Title and short description */}
                  <div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    <p className="mt-1 text-gray-400">{feature.shortDesc}</p>
                  </div>
                </div>

                {/* Expandable content */}
                <div className="mt-8 overflow-hidden transition-all duration-300 group-hover:max-h-[500px] max-h-0">
                  <div className="space-y-6">
                    {/* Detailed description */}
                    <p className="text-gray-300">{feature.longDesc}</p>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-gray-400">
                            <span className="mr-2">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stats */}
                    <div className="inline-flex items-center rounded-full bg-gray-700/50 px-4 py-1">
                      <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text font-bold text-transparent`}>
                        {feature.stats}
                      </span>
                    </div>

                    {/* Testimonial */}
                    <blockquote className="border-l-2 border-gray-700 pl-4">
                      <p className="italic text-gray-400">"{feature.testimonial.quote}"</p>
                      <footer className="mt-2">
                        <div className="text-sm font-medium text-white">{feature.testimonial.author}</div>
                        <div className="text-sm text-gray-500">{feature.testimonial.role}</div>
                      </footer>
                    </blockquote>
                  </div>
                </div>

                {/* Learn More link */}
                <div className="mt-6">
                  <a
                    href={`/features/${feature.id}`}
                    className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent transition-all group-hover:translate-x-1`}
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
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <span>Try All Features Free</span>
            <span className="text-sm">(No Credit Card Required)</span>
          </a>
        </div>
      </div>
    </div>
  )
} 