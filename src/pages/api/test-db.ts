import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type ResponseData = {
  status: string
  version?: any
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Get database version
    const result = await prisma.$queryRaw`SELECT version()`
    
    res.status(200).json({ 
      status: 'Connected',
      version: result
    })
  } catch (error) {
    console.error('Database connection error:', error)
    res.status(500).json({ 
      status: 'Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
} 