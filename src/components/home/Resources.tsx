const blogPosts = [
  {
    title: "2024 Job Market Trends You Need to Know",
    excerpt: "Discover the most in-demand skills, growing industries, and salary trends for 2024.",
    image: "/blog/market-trends.jpg",
    category: "Market Insights",
    readTime: "5 min read",
    date: "Mar 15, 2024"
  },
  {
    title: "How to Perfect Your LinkedIn Profile",
    excerpt: "Learn the secrets to creating a LinkedIn profile that attracts recruiters and opportunities.",
    image: "/blog/linkedin-tips.jpg",
    category: "Career Tips",
    readTime: "8 min read",
    date: "Mar 12, 2024"
  },
  {
    title: "Master the Modern Technical Interview",
    excerpt: "Essential strategies for acing technical interviews at top tech companies.",
    image: "/blog/tech-interview.jpg",
    category: "Interview Prep",
    readTime: "10 min read",
    date: "Mar 10, 2024"
  }
]

export default function Resources() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Latest Career Resources
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Expert insights and tips to help you navigate your career journey
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-48"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <a
                    href={`/blog/${index}`}
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                  >
                    Read more
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
            </article>
          ))}
        </div>

        {/* View all posts */}
        <div className="mt-16 text-center">
          <a
            href="/blog"
            className="inline-flex items-center justify-center space-x-2 rounded-xl border-2 border-primary-600 px-8 py-4 font-bold text-primary-600 transition-all hover:bg-primary-600 hover:text-white"
          >
            View All Resources
          </a>
        </div>
      </div>
    </section>
  )
} 