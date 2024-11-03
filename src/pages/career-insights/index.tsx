import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'

export default function CareerInsights() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] p-8 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Career Insights</h1>
              <p className="text-gray-600">Explore job market trends and insights</p>
            </div>
          </div>

          {/* Career insights content will go here */}
          <div className="text-center py-12">
            <p className="text-gray-600">Career insights coming soon...</p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
} 