import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 12)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        subscriptionPlan: 'Free',
      },
    })

    // Don't send the password back
    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json(userWithoutPassword)
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
} 