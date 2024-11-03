import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up in seconds and let our AI analyze your existing resume or create a new one from scratch.',
    gradient: 'text-blue-500',
    bgColor: 'bg-blue-50/5'
  },
  {
    number: '02',
    title: 'Set Your Preferences',
    description: 'Tell us about your dream job, preferred locations, and salary expectations.',
    gradient: 'text-purple-500',
    bgColor: 'bg-purple-50/5',
    stat: 'Personalized matching'
  },
  {
    number: '03',
    title: 'Let AI Do the Work',
    description: 'Our AI automatically finds and applies to matching positions while optimizing your applications.',
    gradient: 'text-orange-500',
    bgColor: 'bg-orange-50/5',
    stat: '100+ applications/day'
  },
  {
    number: '04',
    title: 'Prepare & Succeed',
    description: 'Use our AI interview coach to practice and get ready to ace your interviews.',
    gradient: 'text-green-500',
    bgColor: 'bg-green-50/5',
    stat: '93% success rate'
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
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Four Simple Steps to Success
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Getting started with Enigma Code is easy. Our streamlined process gets you from sign-up to job applications in minutes.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className={`relative rounded-2xl ${step.bgColor} p-8 shadow-lg transition-all duration-300`}>
                {/* Content */}
                <div className="relative">
                  {/* Step number */}
                  <div className={`${step.gradient} text-2xl font-bold`}>
                    {step.number}
                  </div>

                  {/* Title and description */}
                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {step.description}
                  </p>

                  {/* Stat */}
                  {step.stat && (
                    <div className="mt-4 inline-flex items-center rounded-full bg-white/50 px-3 py-1">
                      <span className={`text-sm font-semibold ${step.gradient}`}>
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
            className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Start Your Journey Today
          </a>
        </motion.div>
      </div>
    </div>
  )
} 