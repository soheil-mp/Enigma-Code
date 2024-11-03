import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    quote: "Within a week of using Enigma Code, I landed 3 interviews at top tech companies. The AI-powered resume optimization made all the difference.",
    author: "Sarah Chen",
    role: "Software Engineer at Google",
    company: "Previously at startup",
    image: "/testimonials/sarah.jpg",
    metrics: {
      interviews: 3,
      timeToLand: "2 weeks",
      salaryIncrease: "45%"
    }
  },
  {
    id: 2,
    quote: "The automated application system saved me countless hours. I was able to apply to over 100 relevant positions while focusing on interview prep.",
    author: "Michael Rodriguez",
    role: "Marketing Director at Meta",
    company: "Previously at agency",
    image: "/testimonials/michael.jpg",
    metrics: {
      applications: 100,
      timeSaved: "40hrs/week",
      interviews: 5
    }
  },
  {
    id: 3,
    quote: "The interview co-pilot feature helped me ace my dream job interview. It's like having an expert coach right there with you.",
    author: "Emily Watson",
    role: "Product Manager at Amazon",
    company: "Career switcher",
    image: "/testimonials/emily.jpg",
    metrics: {
      practiceInterviews: 12,
      successRate: "100%",
      salaryIncrease: "35%"
    }
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Join thousands of professionals who've transformed their careers with Enigma Code
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="mt-20">
          <div className="relative">
            {/* Main testimonial */}
            <div className="relative bg-gray-800/50 rounded-2xl p-8 md:p-12">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Profile section */}
                <div className="relative lg:col-span-1">
                  <div className="aspect-w-3 aspect-h-3 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-500">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].author}
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-white">
                      {testimonials[activeIndex].author}
                    </h3>
                    <p className="text-primary-400">{testimonials[activeIndex].role}</p>
                    <p className="text-sm text-gray-400">{testimonials[activeIndex].company}</p>
                  </div>
                </div>

                {/* Quote and metrics */}
                <div className="mt-8 lg:mt-0 lg:col-span-2">
                  <blockquote>
                    <p className="text-xl text-gray-300 italic">
                      "{testimonials[activeIndex].quote}"
                    </p>
                  </blockquote>

                  {/* Metrics */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {Object.entries(testimonials[activeIndex].metrics).map(([key, value]) => (
                      <div key={key} className="bg-gray-700/30 rounded-lg p-4">
                        <p className="text-2xl font-bold text-primary-400">{value}</p>
                        <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary-500' : 'bg-gray-600'
                  }`}
                >
                  <span className="sr-only">Testimonial {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <span>Join Our Success Stories</span>
            <span className="text-sm">(Start Free)</span>
          </a>
        </div>
      </div>
    </section>
  )
} 