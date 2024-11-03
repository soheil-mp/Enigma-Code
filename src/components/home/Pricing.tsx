import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for getting started',
    features: [
      '1 Resume Template',
      '10 Job Applications/month',
      'Basic AI Interview Practice',
      'Email Support'
    ],
    gradient: 'from-gray-500 to-gray-600',
    popular: false,
    buttonText: 'Get Started'
  },
  {
    name: 'Pro',
    price: '29',
    description: 'Best for active job seekers',
    features: [
      'Unlimited Resume Templates',
      'Unlimited Job Applications',
      'Advanced AI Interview Coach',
      'Real-time Interview Support',
      'Priority Support',
      'Market Insights Access'
    ],
    gradient: 'from-indigo-500 to-purple-500',
    popular: true,
    buttonText: 'Start Free Trial'
  },
  {
    name: 'Enterprise',
    price: '99',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team Management',
      'Custom Integration',
      'Dedicated Account Manager',
      'Custom Analytics',
      'API Access'
    ],
    gradient: 'from-purple-500 to-pink-500',
    popular: false,
    buttonText: 'Start Free Trial'
  }
]

export default function Pricing() {
  return (
    <div className="py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that best fits your needs. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 transition-all hover:shadow-2xl ${
                plan.popular ? 'scale-105 lg:scale-110' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">${plan.price}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>
                </div>
              </div>

              {/* Features list */}
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.a
                href="/auth/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`block w-full rounded-xl bg-gradient-to-r ${plan.gradient} px-6 py-4 text-center font-semibold text-white shadow-md transition-all hover:shadow-lg`}
              >
                {plan.buttonText}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center space-y-4"
        >
          <p className="text-gray-500">
            All plans include a 14-day free trial • No credit card required
          </p>
          <div className="flex justify-center space-x-6 opacity-50">
            <img src="/logos/google.svg" alt="Google" className="h-8 grayscale" />
            <img src="/logos/microsoft.svg" alt="Microsoft" className="h-8 grayscale" />
            <img src="/logos/amazon.svg" alt="Amazon" className="h-8 grayscale" />
          </div>
        </motion.div>
      </div>
    </div>
  )
} 