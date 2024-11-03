import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications] = useState([
    { id: 1, title: 'New Achievement!', message: 'You\'re making great progress!' },
    { id: 2, title: 'Interview Tip', message: 'Practice makes perfect! Try our AI interview prep.' },
  ])

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl">🔔</span>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
              <div className="mt-2 space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 