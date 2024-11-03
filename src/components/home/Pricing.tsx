import AnimatedBackgroundLight from '@/components/effects/AnimatedBackgroundLight'

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
    popular: false
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
    popular: true
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
    popular: false
  }
]

export default function Pricing() {
  return (
    <div className="py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 transition-all hover:scale-105 ${
                plan.popular ? 'scale-105 md:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-2 text-center text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/auth/signup"
                className={`block w-full rounded-xl bg-gradient-to-r ${plan.gradient} px-6 py-3 text-center font-semibold text-white shadow-md transition-all hover:shadow-lg`}
              >
                {plan.price === '0' ? 'Get Started' : 'Start Free Trial'}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500">
            All plans include a 14-day free trial • No credit card required
          </p>
        </div>
      </div>
    </div>
  )
} 