import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

type ResponseData = {
  userExists?: boolean
  user?: {
    id: string
    email: string
    name: string | null
  } | null
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    console.log('Checking user with email:', session.user.email)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    console.log('Found user:', user)

    res.status(200).json({ 
      userExists: !!user,
      user: user ? {
        id: user.id,
        email: user.email,
        name: user.name
      } : null
    })
  } catch (error) {
    console.error('User test error:', error)
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
} 