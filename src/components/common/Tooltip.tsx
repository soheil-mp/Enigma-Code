import { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
}

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <div className="group relative">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:block">
        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {content}
        </div>
      </div>
    </div>
  )
} 