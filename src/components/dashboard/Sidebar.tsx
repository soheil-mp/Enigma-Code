import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()

  const menuItems = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/resume', label: 'Resume Builder' },
    { href: '/dashboard/applications', label: 'Job Applications' },
    { href: '/dashboard/interviews', label: 'Interview Prep' },
    { href: '/dashboard/insights', label: 'Market Insights' },
  ]

  return (
    <aside className="w-64 bg-white shadow-lg">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              router.pathname === item.href
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
} 