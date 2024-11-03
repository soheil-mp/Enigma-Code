import { motion } from 'framer-motion'

const stories = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    image: "/testimonials/sarah.jpg",
    quote: "Within a week of using Enigma Code, I landed 3 interviews at top tech companies.",
    metric: "3 weeks to land dream job",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Michael Rodriguez",
    role: "Marketing Director",
    image: "/testimonials/michael.jpg",
    quote: "The automated application system saved me countless hours. I could focus on interview prep.",
    metric: "40+ hours saved/month",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    image: "/testimonials/emily.jpg",
    quote: "The interview co-pilot feature helped me ace my dream job interview. Game changer!",
    metric: "93% interview success rate",
    gradient: "from-indigo-500 to-violet-500"
  }
]

export default function SuccessStories() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of professionals who've transformed their careers with Enigma Code
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative rounded-2xl bg-white/5 backdrop-blur-sm p-8 shadow-lg hover:bg-white/10 transition-all duration-300"
            >
              {/* Profile */}
              <div className="flex items-center space-x-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.role}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-6">
                <p className="text-gray-600 italic">"{story.quote}"</p>
              </blockquote>

              {/* Metric */}
              <div className="mt-6">
                <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${story.gradient} px-4 py-1`}>
                  <span className="text-sm font-semibold text-white">{story.metric}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            Start Your Success Story
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Join over 50,000 successful job seekers
          </p>
        </div>
      </div>
    </div>
  )
} 