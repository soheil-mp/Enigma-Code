import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up in seconds and let our AI analyze your existing resume or create a new one from scratch.',
    color: 'bg-blue-500',
    icon: (props: any) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Set Your Preferences',
    description: 'Tell us about your dream job, preferred locations, and salary expectations.',
    color: 'bg-purple-500',
    stat: 'Personalized matching',
    icon: (props: any) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Let AI Do the Work',
    description: 'Our AI automatically finds and applies to matching positions while optimizing your applications.',
    color: 'bg-orange-500',
    stat: '100+ applications/day',
    icon: (props: any) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Prepare & Succeed',
    description: 'Use our AI interview coach to practice and get ready to ace your interviews.',
    color: 'bg-green-500',
    stat: '93% success rate',
    icon: (props: any) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
]

export default function HowItWorks() {
  return (
    <div className="py-24" id="how-it-works">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Four Simple Steps to Success
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Getting started with Enigma Code is easy. Our streamlined process gets you from sign-up to job applications in minutes.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="relative group">
                {/* Card content */}
                <div className="relative rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                  {/* Step number */}
                  <div className={`absolute -top-4 -left-4 h-10 w-10 rounded-lg ${step.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`h-12 w-12 rounded-xl ${step.color} bg-opacity-10 flex items-center justify-center mb-6`}>
                    <step.icon className="h-6 w-6 text-current" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>

                  {/* Stats badge */}
                  {step.stat && (
                    <div className="mt-4">
                      <span className={`inline-flex items-center rounded-full ${step.color} bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                        {step.stat}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Start Your Journey Today
          </a>
        </motion.div>
      </div>
    </div>
  )
} 