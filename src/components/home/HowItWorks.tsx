import AnimatedBackgroundLight from '@/components/effects/AnimatedBackgroundLight'

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up in seconds and let our AI analyze your existing resume or create a new one from scratch.',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    number: '02',
    title: 'Set Your Preferences',
    description: 'Tell us about your dream job, preferred locations, and salary expectations.',
    gradient: 'from-cyan-500 to-teal-500'
  },
  {
    number: '03',
    title: 'Let AI Do the Work',
    description: 'Our AI automatically finds and applies to matching positions while optimizing your applications.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    number: '04',
    title: 'Prepare & Succeed',
    description: 'Use our AI interview coach to practice and get ready to ace your interviews.',
    gradient: 'from-amber-500 to-orange-500'
  }
]

export default function HowItWorks() {
  return (
    <div className="py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Four Simple Steps to Success
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Getting started with Enigma Code is easy. Our streamlined process gets you from sign-up to job applications in minutes.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="overflow-hidden rounded-2xl bg-gray-800 p-8 shadow-lg transition-all hover:scale-105">
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${step.gradient}`} />
                <div className="relative">
                  <span className={`bg-gradient-to-r ${step.gradient} bg-clip-text text-4xl font-bold text-transparent`}>
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-gray-300">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href="/auth/signup"
            className="inline-block transform rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </div>
  )
} 