import { useSession } from 'next-auth/react'

export default function DashboardHeader() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center">
            {loading ? (
              <div className="animate-pulse h-6 w-32 bg-gray-200 rounded"></div>
            ) : (
              <span className="text-gray-700">Welcome, {session?.user?.name}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 