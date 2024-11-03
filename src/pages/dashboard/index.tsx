import DashboardLayout from '@/layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ToolCard from '@/components/dashboard/ToolCard'
import { motion, AnimatePresence } from 'framer-motion'
import Tooltip from '@/components/common/Tooltip'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Protect dashboard route
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  const tools = [
    {
      title: 'AI Resume Builder',
      description: 'Craft a stunning resume that stands out with AI-powered optimization',
      icon: '📝',
      href: '/dashboard/resume',
    },
    {
      title: 'Application Tracker',
      description: 'Supercharge your job hunt with smart application management',
      icon: '📊',
      href: '/dashboard/applications',
    },
    {
      title: 'Interview Master',
      description: 'Ace every interview with AI-powered practice and real-time coaching',
      icon: '🎯',
      href: '/dashboard/interviews',
    },
    {
      title: 'Career Insights',
      description: 'Unlock powerful market insights to make strategic career moves',
      icon: '📈',
      href: '/dashboard/insights',
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6">
        {/* Welcome Section */}
        <div className="mt-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white rounded-[24px] p-8 shadow-sm"
          >
            <div className="relative">
              {/* Welcome Text */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-[#EEF2FF] rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
                <div>
                  <h2 className="text-[28px] font-semibold">
                    <span className="text-[#1F2937] block">Ready to shine,</span>
                    <span className="text-[#6366F1] block mt-1">
                      {session?.user?.name}!
                    </span>
                  </h2>
                  <p className="mt-2 text-[#4B5563] text-base">
                    Your journey to success starts here. Let's make your dream job a reality!
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#EEF2FF] rounded-2xl px-5 py-4">
                  <div className="text-sm text-[#4B5563]">Weekly Progress</div>
                  <div className="mt-1 text-xl font-semibold text-[#1F2937]">+25%</div>
                </div>
                <div className="bg-[#F5F3FF] rounded-2xl px-5 py-4">
                  <div className="text-sm text-[#4B5563]">Active Applications</div>
                  <div className="mt-1 text-xl font-semibold text-[#1F2937]">12</div>
                </div>
                <div className="bg-[#ECFDF5] rounded-2xl px-5 py-4">
                  <div className="text-sm text-[#4B5563]">Interview Success</div>
                  <div className="mt-1 text-xl font-semibold text-[#1F2937]">85%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <motion.div 
              key={tool.title}
              whileHover={{ y: -2 }}
              className="bg-white rounded-[24px] p-6 shadow-sm"
            >
              <div className="w-10 h-10 mb-4">
                <span className="text-2xl">{tool.icon}</span>
              </div>
              <h3 className="text-[#1F2937] text-lg font-semibold mb-2">{tool.title}</h3>
              <p className="text-[#4B5563] text-sm mb-6">
                {tool.description}
              </p>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center"
              >
                Get Started
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Success Journey Section */}
        <div className="bg-[#6366F1] rounded-[24px] p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">Your Success Journey</h3>
              <p className="text-white/80 text-sm">
                Unlock achievements and watch your career soar!
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-sm">✨</span>
              </div>
              <div>
                <div className="text-white font-medium">Rising Star</div>
                <div className="text-white/70 text-sm">Level 1</div>
              </div>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '25%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: 'Applications Launched', value: '0', milestone: '5' },
            { title: 'Interview Opportunities', value: '0', milestone: '3' },
            { title: 'Profile Impact', value: '0', milestone: '10' }
          ].map((stat) => (
            <div key={stat.title} className="bg-white rounded-[24px] px-6 py-5">
              <h4 className="text-[#4B5563] text-sm">{stat.title}</h4>
              <div className="mt-2 text-[28px] font-semibold text-[#1F2937]">{stat.value}</div>
              <div className="mt-1 text-sm text-[#6B7280]">Next milestone: {stat.milestone}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 