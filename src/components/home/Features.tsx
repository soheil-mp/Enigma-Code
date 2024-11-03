import { motion } from 'framer-motion'

const features = [
  {
    icon: {
      type: 'document',
      color: 'from-purple-500 to-indigo-500'
    },
    title: 'AI Resume Builder',
    description: 'Create ATS-optimized resumes that get you noticed by hiring managers.',
    gradient: 'from-purple-500 to-indigo-500',
    stat: '85% higher response rate'
  },
  {
    icon: {
      type: 'rocket',
      color: 'from-cyan-500 to-teal-500'
    },
    title: 'Smart Job Matching',
    description: 'Our AI finds and applies to jobs that perfectly match your skills and preferences.',
    gradient: 'from-cyan-500 to-teal-500',
    stat: '2x faster hiring'
  },
  {
    icon: {
      type: 'target',
      color: 'from-pink-500 to-rose-500'
    },
    title: 'Interview AI Coach',
    description: 'Practice with our AI interviewer and get real-time feedback to improve.',
    gradient: 'from-pink-500 to-rose-500',
    stat: '93% interview success'
  },
  {
    icon: {
      type: 'microphone',
      color: 'from-amber-500 to-orange-500'
    },
    title: 'Live Interview Support',
    description: 'Get real-time suggestions during interviews to answer confidently.',
    gradient: 'from-amber-500 to-orange-500',
    stat: '40+ hours saved/month'
  },
  {
    icon: {
      type: 'lightbulb',
      color: 'from-emerald-500 to-teal-500'
    },
    title: 'Career Insights',
    description: 'Access real-time salary data and market trends for informed decisions.',
    gradient: 'from-emerald-500 to-teal-500',
    stat: '25% higher offers'
  },
  {
    icon: {
      type: 'chart',
      color: 'from-blue-500 to-indigo-500'
    },
    title: 'Progress Tracking',
    description: 'Monitor your job search progress with detailed analytics and insights.',
    gradient: 'from-blue-500 to-indigo-500',
    stat: '100% application tracking'
  }
]

const FeatureIcon = ({ type, className = "" }: { type: string, className?: string }) => {
  const icons = {
    document: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    rocket: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    target: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    microphone: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    lightbulb: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }

  return icons[type as keyof typeof icons] || null
}

export default function Features() {
  return (
    <div className="py-24" id="features">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Supercharge Your Job Search
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Our AI-powered tools work together to maximize your chances of landing your dream job.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm hover:bg-gray-800/70"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
              
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.icon.color} group-hover:scale-110 transition-transform`}>
                  <FeatureIcon type={feature.icon.type} className="h-6 w-6 text-white" />
                </div>

                {/* Title and Description */}
                <h3 className="mt-4 text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="mt-4 inline-flex items-center rounded-full bg-gray-700/50 px-3 py-1">
                  <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-sm font-semibold text-transparent`}>
                    {feature.stat}
                  </span>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute -bottom-2 -right-2 h-16 w-16 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-10 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Get Started Free
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
        </motion.div>
      </div>
    </div>
  )
} 