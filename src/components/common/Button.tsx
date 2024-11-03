import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function Button({ children, onClick, href, variant = 'primary', className = '' }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-8 py-4 font-bold transition-all duration-300"
  const variants = {
    primary: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
  }

  const Component = motion(href ? 'a' : 'button')
  
  return (
    <Component
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  )
} 