export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      {/* Animated orbs */}
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] opacity-20 blur-3xl animate-float" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#7C3AED] to-[#DB2777] opacity-20 blur-3xl animate-float-delayed" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center py-20 text-center">
          {/* Main headline with gradient text */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Transform Your</span>
            <span className="mt-2 block animate-gradient-x bg-gradient-to-r from-[#4F46E5] via-[#06B6D4] to-[#4F46E5] bg-300% bg-clip-text text-transparent">
              Job Search Journey
            </span>
          </h1>
          
          {/* Enhanced subheadline */}
          <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-300/90">
            Let AI power your career move. From crafting the perfect resume to 
            <span className="mx-1 text-[#06B6D4]">automating applications</span> and
            <span className="mx-1 text-[#4F46E5]">acing interviews</span>.
          </p>

          {/* CTA Section with enhanced design */}
          <div className="mt-12 flex flex-col items-center space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              {/* Primary CTA with animated gradient */}
              <a
                href="/auth/signup"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#06B6D4] to-[#4F46E5] transition-transform duration-300 group-hover:translate-x-0"></div>
              </a>
              
              {/* Secondary CTA with glassmorphism */}
              <a
                href="#features"
                className="group flex items-center rounded-xl bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                Watch Demo
                <svg
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            {/* Trust indicators */}
            <p className="text-sm font-medium text-gray-400">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Enhanced stats section with glassmorphism */}
          <div className="mt-20">
            <p className="text-sm font-medium tracking-wider text-gray-400">
              TRUSTED BY INDUSTRY LEADERS
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { value: '93%', label: 'Success Rate' },
                { value: '150K+', label: 'Applications Sent' },
                { value: '2.5x', label: 'Faster Hiring' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/10 to-[#06B6D4]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="text-4xl font-bold text-white">{stat.value}</div>
                    <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0F172A] to-transparent" />
    </div>
  )
} 