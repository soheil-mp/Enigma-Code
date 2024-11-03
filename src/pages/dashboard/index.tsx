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
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white/90 rounded-2xl p-8 border border-white/20 relative overflow-hidden shadow-xl"
        >
          {/* Enhanced background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-full -mr-48 -mt-48 opacity-70 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-pink-100 via-red-50 to-yellow-100 rounded-full -ml-36 -mb-36 opacity-50 animate-pulse delay-1000" />
          
          <div className="relative">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold space-y-4"
            >
              <span className="text-gray-800 block">Ready to shine,</span>
              <motion.span 
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent block"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% auto' }}
              >
                {session?.user?.name}!
              </motion.span>
            </motion.h2>
            <p className="mt-6 text-gray-600 max-w-xl text-lg leading-relaxed">
              Your journey to success starts here. Let's make your dream job a reality!
            </p>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ToolCard {...tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 rounded-3xl p-8 border border-white/20 relative overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-50" />
          
          {/* Achievement Banner */}
          <div className="relative mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-6 text-white overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 animate-pulse" />
            <h2 className="text-2xl font-bold mb-3">Your Success Journey</h2>
            <p className="text-white/90 text-lg">Unlock achievements and watch your career soar! 🚀</p>
            
            {/* Achievement Progress Bar */}
            <div className="mt-6 h-3 bg-black/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "30%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="mt-3 text-sm font-medium text-white/90">Rising Star - Level 1</div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 relative">
            {[
              { 
                label: 'Applications Launched', 
                value: 0, 
                color: 'blue',
                icon: '🚀',
                nextMilestone: 5
              },
              { 
                label: 'Interview Opportunities', 
                value: 0, 
                color: 'green',
                icon: '⭐',
                nextMilestone: 3
              },
              { 
                label: 'Profile Impact', 
                value: 0, 
                color: 'purple',
                icon: '✨',
                nextMilestone: 10
              }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-6 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/30 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all duration-300`}
              >
                <Tooltip content={`Next milestone: ${item.nextMilestone} ${item.label}`}>
                  {/* Stat Icon */}
                  <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </div>

                  <div className={`text-4xl font-bold text-${item.color}-600 mb-2`}>
                    {item.value}
                  </div>
                  <div className={`text-sm font-medium text-${item.color}-900/70 mb-3`}>
                    {item.label}
                  </div>

                  {/* Progress to next milestone */}
                  <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-${item.color}-500`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${(item.value / item.nextMilestone) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Next milestone: {item.nextMilestone}
                  </div>

                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
} 